# Done For You Leads — Client Portal backend

The customer portal lives in the Next.js app under `/portal` (deployed on Vercel).
It reads/writes to WordPress through a per‑brand REST API that now ships **inside
the OS Analytics plugin** — one plugin powers both the admin dashboard and the
client portal. Until `WP_API_URL` is set the portal runs on realistic **demo
data**, so it deploys and demos immediately.

> The old standalone `jdy-portal-rest.php` has been folded into OS Analytics
> (`includes/class-jdy-portal-api.php`, v1.1.0). Install **only** the OS
> Analytics plugin — there is no separate portal plugin to install.

## How the two sides connect

```
Vercel (Next.js /portal)  ──Authorization: Bearer <token>──►  WordPress /wp-json/jdy/v1
        │                    (X-JDY-Token fallback header)               │
   session cookie (httpOnly)                              OS Analytics data (leads…)
```

Each portal user is a WordPress user scoped to **one brand** via the
`jdy_allowed_brands` user meta the plugin already uses — so "per client" = "per
brand". No extra schema, no `owner_user_id` column.

## Go live in 3 steps

1. **Install OS Analytics.** Upload `os-analytics.zip` on a **clean, hardened**
   WordPress (not the compromised old site) and activate it. The portal API
   registers automatically at `/wp-json/jdy/v1`.

2. **Create the client user + scope it to a brand.** Add a WordPress user for
   the agent, then set user meta:

   - `jdy_allowed_brands` → the brand id(s) they should see (e.g. `[3]`)
   - `jdy_portal_plan` → `Bronze` | `Silver` | `Platinum` | `Custom` (optional)

   (Site admins can log in too and default to the Done For You Leads brand.)

3. **Point the portal at WordPress.** In Vercel → Project → Settings →
   Environment Variables, add:

   | Key          | Value                                            |
   | ------------ | ------------------------------------------------ |
   | `WP_API_URL` | `https://YOUR-WP-SITE.com/wp-json/jdy/v1`         |

   Redeploy. The portal automatically switches from demo data to live data.

## Endpoints (in `os-analytics/includes/class-jdy-portal-api.php`)

| Method | Path            | Returns                                     |
| ------ | --------------- | ------------------------------------------- |
| POST   | `/auth`         | `{ token, user }` (validates WP login)      |
| GET    | `/me`           | current client profile                      |
| GET    | `/metrics`      | KPIs + pipeline + 14‑day trend (brand)      |
| GET    | `/leads`        | this brand's leads (max 200, newest)        |
| PATCH  | `/leads/:id`    | update a lead's status (brand‑checked)      |
| GET    | `/campaigns`    | this brand's campaigns                      |
| GET    | `/invoices`     | billing ledger (empty until Stripe wired)   |

## Before real customers (production hardening)

- Add a **2FA step** in `/auth` before issuing the token (OS Analytics already
  ships `JDY_2FA` — reuse it).
- **Rate‑limit** `/auth`; rotate the signing secret; shorten the token TTL.
- Serve only over **HTTPS**; keep the WordPress install patched and behind a WAF.
- Wire **Stripe** for `/invoices` and plan management.
- Add per‑client **audit logging** and GDPR export/delete.
