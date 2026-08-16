# Done For You Leads — Client Portal backend

The customer portal lives in the Next.js app under `/portal` (deployed on Vercel).
It reads/writes to WordPress through a small, per‑client REST API. Until that API
is connected the portal runs on realistic **demo data**, so it deploys and demos
immediately.

## How the two sides connect

```
Vercel (Next.js /portal)  ──Authorization: Bearer <token>──►  WordPress /wp-json/jdy/v1
        │                                                              │
   session cookie (httpOnly)                              Jody Analytics data (leads…)
```

## Go live in 3 steps

1. **Install the REST companion.** Copy `jdy-portal-rest.php` into
   `wp-content/plugins/jody-portal-rest/` on a **clean, hardened** WordPress
   (not the currently compromised site) and activate it. It requires the
   Jody Analytics plugin.

2. **Add lead ownership.** Customer data must be scoped per client. Run once:

   ```sql
   ALTER TABLE wp_jdy_leads
     ADD COLUMN owner_user_id BIGINT UNSIGNED NULL AFTER brand_id,
     ADD KEY idx_owner (owner_user_id);
   ```

   Then set `owner_user_id` whenever a lead is captured/assigned to a client,
   and store each client's plan/company as user meta (`jdy_plan`, `jdy_company`).

3. **Point the portal at WordPress.** In Vercel → Project → Settings →
   Environment Variables, add:

   | Key          | Value                                            |
   | ------------ | ------------------------------------------------ |
   | `WP_API_URL` | `https://YOUR-WP-SITE.com/wp-json/jdy/v1`         |

   Redeploy. The portal automatically switches from demo data to live data.

## Endpoints (implemented in `jdy-portal-rest.php`)

| Method | Path            | Returns                                  |
| ------ | --------------- | ---------------------------------------- |
| POST   | `/auth`         | `{ token, user }` (validates WP login)   |
| GET    | `/me`           | current client profile                   |
| GET    | `/metrics`      | KPIs + pipeline + 14‑day trend           |
| GET    | `/leads`        | this client's leads (max 500, newest)    |
| PATCH  | `/leads/:id`    | update a lead's status (owner‑checked)   |
| GET    | `/campaigns`    | campaigns that produced this client's leads |
| GET    | `/invoices`     | Stripe invoices (stub — wire to Stripe)  |

## Before real customers (production hardening)

- Add a **2FA step** in `/auth` before issuing the token (the analytics plugin
  already ships 2FA — reuse it).
- **Rate‑limit** `/auth`; rotate the signing secret; shorten the token TTL.
- Serve only over **HTTPS**; keep the WordPress install patched and behind a WAF.
- Wire **Stripe** for `/invoices` and plan management.
- Add per‑client **audit logging** and GDPR export/delete.
