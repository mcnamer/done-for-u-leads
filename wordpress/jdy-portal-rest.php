<?php
/**
 * Plugin Name: Jody Portal REST API
 * Description: Customer-facing, per-client REST endpoints that power the Done For You Leads client portal (Next.js on Vercel). Companion to the Jody Analytics plugin.
 * Version:     0.1.0
 * Requires PHP: 7.4
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHAT THIS DOES
 *   Exposes a small, authenticated REST surface under /wp-json/jdy/v1 that the
 *   Vercel portal reads. Every request is scoped to the logged-in client, so an
 *   agent can only ever see their own leads.
 *
 * PREREQUISITE (one-time schema change in the Jody Analytics plugin)
 *   Leads are currently scoped by brand_id. For a customer portal each lead also
 *   needs an OWNER. Add an owner column to wp_jdy_leads:
 *
 *     ALTER TABLE wp_jdy_leads
 *       ADD COLUMN owner_user_id BIGINT UNSIGNED NULL AFTER brand_id,
 *       ADD KEY idx_owner (owner_user_id);
 *
 *   Then set owner_user_id when a lead is captured/assigned to a client account.
 *
 * AUTH
 *   POST /auth {email,password} validates the WP user and returns a short-lived
 *   HMAC bearer token (same idea as the plugin's SSO tokens). The portal stores
 *   it in an httpOnly cookie and sends it as `Authorization: Bearer <token>`.
 *   TODO for production: rotate the signing secret, shorten TTL, add 2FA step,
 *   and rate-limit /auth.
 * ─────────────────────────────────────────────────────────────────────────
 */

defined('ABSPATH') || exit;

define('JDY_PORTAL_NS', 'jdy/v1');
define('JDY_PORTAL_TTL', 60 * 60 * 8); // 8h

/* ── Token helpers ─────────────────────────────────────────────────────── */

function jdy_portal_secret(): string {
    return wp_salt('auth');
}

function jdy_portal_issue_token(int $uid): string {
    $payload = ['uid' => $uid, 'exp' => time() + JDY_PORTAL_TTL];
    $b64 = rtrim(strtr(base64_encode(wp_json_encode($payload)), '+/', '-_'), '=');
    $sig = hash_hmac('sha256', $b64, jdy_portal_secret());
    return $b64 . '.' . $sig;
}

function jdy_portal_verify_token(string $token): ?int {
    $parts = explode('.', $token);
    if (count($parts) !== 2) return null;
    [$b64, $sig] = $parts;
    $expected = hash_hmac('sha256', $b64, jdy_portal_secret());
    if (!hash_equals($expected, $sig)) return null;
    $json = base64_decode(strtr($b64, '-_', '+/'));
    $data = json_decode($json, true);
    if (!is_array($data) || empty($data['uid']) || empty($data['exp'])) return null;
    if ($data['exp'] < time()) return null;
    return (int) $data['uid'];
}

/** Resolve the caller from the Authorization: Bearer header. */
function jdy_portal_current_uid(WP_REST_Request $req): int {
    $auth = $req->get_header('authorization');
    if (!$auth || stripos($auth, 'Bearer ') !== 0) return 0;
    return (int) jdy_portal_verify_token(trim(substr($auth, 7)));
}

function jdy_portal_auth_guard(WP_REST_Request $req) {
    $uid = jdy_portal_current_uid($req);
    if (!$uid) {
        return new WP_Error('jdy_unauthorized', 'Not signed in.', ['status' => 401]);
    }
    wp_set_current_user($uid);
    return true;
}

/* ── Routes ────────────────────────────────────────────────────────────── */

add_action('rest_api_init', function () {
    $ns = JDY_PORTAL_NS;

    register_rest_route($ns, '/auth', [
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => 'jdy_portal_auth',
        'args'                => [
            'email'    => ['required' => true],
            'password' => ['required' => true],
        ],
    ]);

    $guarded = ['permission_callback' => 'jdy_portal_auth_guard'];

    register_rest_route($ns, '/me',        array_merge($guarded, ['methods' => 'GET', 'callback' => 'jdy_portal_me']));
    register_rest_route($ns, '/metrics',   array_merge($guarded, ['methods' => 'GET', 'callback' => 'jdy_portal_metrics']));
    register_rest_route($ns, '/leads',     array_merge($guarded, ['methods' => 'GET', 'callback' => 'jdy_portal_leads']));
    register_rest_route($ns, '/leads/(?P<id>\d+)', array_merge($guarded, [
        'methods'  => 'PATCH',
        'callback' => 'jdy_portal_update_lead',
    ]));
    register_rest_route($ns, '/campaigns', array_merge($guarded, ['methods' => 'GET', 'callback' => 'jdy_portal_campaigns']));
    register_rest_route($ns, '/invoices',  array_merge($guarded, ['methods' => 'GET', 'callback' => 'jdy_portal_invoices']));
});

/* ── Handlers ──────────────────────────────────────────────────────────── */

function jdy_portal_user_payload(WP_User $u): array {
    return [
        'name'    => $u->display_name ?: $u->user_login,
        'email'   => $u->user_email,
        'company' => get_user_meta($u->ID, 'jdy_company', true) ?: '',
        'plan'    => get_user_meta($u->ID, 'jdy_plan', true) ?: 'Silver',
        'role'    => in_array('administrator', (array) $u->roles, true) ? 'admin' : 'agent',
    ];
}

function jdy_portal_auth(WP_REST_Request $req) {
    $email = sanitize_email($req['email']);
    $user  = get_user_by('email', $email);
    if (!$user) {
        return new WP_Error('jdy_bad_login', 'Those credentials did not work.', ['status' => 401]);
    }
    $auth = wp_authenticate($user->user_login, (string) $req['password']);
    if (is_wp_error($auth)) {
        return new WP_Error('jdy_bad_login', 'Those credentials did not work.', ['status' => 401]);
    }
    // TODO: enforce a 2FA step here before issuing the token.
    return [
        'token' => jdy_portal_issue_token($auth->ID),
        'user'  => jdy_portal_user_payload($auth),
    ];
}

function jdy_portal_me(WP_REST_Request $req) {
    return jdy_portal_user_payload(wp_get_current_user());
}

/** All leads owned by the current client, newest first. */
function jdy_portal_leads(WP_REST_Request $req) {
    global $wpdb;
    $uid = get_current_user_id();
    $t   = $wpdb->prefix . 'jdy_leads';
    $rows = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM {$t} WHERE owner_user_id = %d ORDER BY created_at DESC LIMIT 500", $uid),
        ARRAY_A
    );
    return array_map('jdy_portal_map_lead', $rows ?: []);
}

function jdy_portal_map_lead(array $r): array {
    return [
        'id'           => (int) $r['id'],
        'fullName'     => $r['full_name'],
        'email'        => $r['email'],
        'phone'        => $r['phone'],
        'source'       => $r['source'],
        'sourceForm'   => $r['source_form'] ?? '',
        'campaignId'   => isset($r['campaign_id']) ? (int) $r['campaign_id'] : null,
        'cost'         => (float) $r['cost'],
        'status'       => $r['status'],
        'city'         => $r['city'] ?? '',
        'region'       => $r['region'] ?? '',
        'platform'     => $r['platform'] ?? '',
        'notes'        => $r['notes'] ?? '',
        'createdAt'    => gmdate('c', strtotime($r['created_at'])),
    ];
}

/** Update a lead's status — only if it belongs to the caller. */
function jdy_portal_update_lead(WP_REST_Request $req) {
    global $wpdb;
    $uid = get_current_user_id();
    $id  = (int) $req['id'];
    $t   = $wpdb->prefix . 'jdy_leads';
    $owner = (int) $wpdb->get_var($wpdb->prepare("SELECT owner_user_id FROM {$t} WHERE id = %d", $id));
    if ($owner !== $uid) {
        return new WP_Error('jdy_forbidden', 'Not your lead.', ['status' => 403]);
    }
    $allowed = ['new','contacted','qualified','appointment','approved','closed','lost'];
    $status  = sanitize_text_field((string) $req['status']);
    if (!in_array($status, $allowed, true)) {
        return new WP_Error('jdy_bad_status', 'Unknown status.', ['status' => 400]);
    }
    $wpdb->update($t, ['status' => $status], ['id' => $id]);
    return ['ok' => true];
}

function jdy_portal_metrics(WP_REST_Request $req) {
    global $wpdb;
    $uid = get_current_user_id();
    $t   = $wpdb->prefix . 'jdy_leads';

    $pipeline = [];
    foreach (['new','contacted','qualified','appointment','approved','closed','lost'] as $s) {
        $pipeline[$s] = (int) $wpdb->get_var(
            $wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE owner_user_id = %d AND status = %s", $uid, $s)
        );
    }
    $leads = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE owner_user_id = %d", $uid));
    $spend = (float) $wpdb->get_var($wpdb->prepare("SELECT COALESCE(SUM(cost),0) FROM {$t} WHERE owner_user_id = %d", $uid));

    // 14-day trend
    $trend = [];
    for ($d = 13; $d >= 0; $d--) {
        $day = gmdate('Y-m-d', strtotime("-{$d} days"));
        $trend[] = (int) $wpdb->get_var(
            $wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE owner_user_id = %d AND DATE(created_at) = %s", $uid, $day)
        );
    }

    $closed = $pipeline['closed'];
    return [
        'leads'             => $leads,
        'leadsDelta'        => 0, // compute vs previous period as needed
        'appointments'      => $pipeline['appointment'] + $pipeline['approved'] + $pipeline['closed'],
        'costPerLead'       => $leads ? round($spend / $leads) : 0,
        'callToClose'       => $leads ? round(($closed / $leads) * 100, 1) : 0,
        'spend'             => round($spend),
        'revenueInfluenced' => 0, // join wp_jdy_loans for real revenue
        'pipeline'          => $pipeline,
        'trend'             => $trend,
    ];
}

function jdy_portal_campaigns(WP_REST_Request $req) {
    global $wpdb;
    $uid = get_current_user_id();
    $c   = $wpdb->prefix . 'jdy_campaigns';
    $l   = $wpdb->prefix . 'jdy_leads';
    // Campaigns that produced at least one of this client's leads.
    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT c.*,
                COUNT(l.id) AS lead_count,
                SUM(l.status='appointment' OR l.status='approved' OR l.status='closed') AS appt_count,
                SUM(l.status='closed') AS closed_count
         FROM {$c} c
         JOIN {$l} l ON l.campaign_id = c.id AND l.owner_user_id = %d
         GROUP BY c.id",
        $uid
    ), ARRAY_A);

    return array_map(function ($r) {
        return [
            'id'           => (int) $r['id'],
            'name'         => $r['name'] ?? ('Campaign #' . $r['id']),
            'channel'      => $r['channel'] ?? $r['platform'] ?? '—',
            'status'       => $r['status'] ?? 'active',
            'spend'        => (float) ($r['spend'] ?? 0),
            'leads'        => (int) $r['lead_count'],
            'appointments' => (int) $r['appt_count'],
            'closed'       => (int) $r['closed_count'],
            'startedAt'    => isset($r['created_at']) ? gmdate('Y-m-d', strtotime($r['created_at'])) : '',
        ];
    }, $rows ?: []);
}

function jdy_portal_invoices(WP_REST_Request $req) {
    // Wire to Stripe (customer invoices) once billing is connected.
    return [];
}
