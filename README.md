# McNamer.com

The flagship personal brand site for **Jody McNamer** — broker, mortgage professional, coach and autism advocate. Rebuilt from WordPress/Elementor as a static-first Next.js application.

- **Framework:** Next.js 15 (App Router) · React 19 · TypeScript (strict)
- **Styling:** Tailwind CSS v4 (`@theme` tokens, no config file)
- **Components:** shadcn-style primitives on Radix (`Button`, `Accordion`, form fields)
- **Motion:** Framer Motion, gated behind `prefers-reduced-motion`
- **Forms:** React Hook Form + Zod, honeypot + rate limiting
- **Deploy:** Vercel

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in the values below
npm run dev                    # http://localhost:3000
```

```bash
npm run build                  # production build
npm run typecheck              # tsc --noEmit
npm run lint                   # eslint
npm run format                 # prettier
```

The build currently produces **zero TypeScript errors and zero ESLint errors**, and every page except the contact API renders as static HTML.

---

## Environment variables

| Variable               | Required | What it does                                                          |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Canonical origin. Drives canonical tags, sitemap, OG URLs.             |
| `RESEND_API_KEY`       | For mail | Delivers contact-form messages. Get one at resend.com.                 |
| `CONTACT_FROM_EMAIL`   | For mail | A verified sender on your domain, e.g. `McNamer <website@mcnamer.com>` |
| `CONTACT_TO_EMAIL`     | No       | Inbox for enquiries. Defaults to `jody@mcnamer.com`.                   |
| `NEXT_PUBLIC_GA_ID`    | No       | Reserved for analytics.                                                |

Until `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set, `/api/contact` returns a clear 503 telling the visitor to email directly. It never pretends to have sent a message it did not send.

Any other mail provider works — swap the `fetch` in `src/app/api/contact/route.ts`. Nothing else needs to change.

---

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo in Vercel. Framework preset is detected automatically; no build overrides needed.
3. Add the environment variables above under **Settings → Environment Variables**.
4. Point `mcnamer.com` and `www.mcnamer.com` at the project; set `www` to redirect to the apex.
5. Deploy. Every push to `main` ships.

**Before you cut DNS over,** run the redirect check in `MIGRATION.md` so no live URL 404s.

---

## Where the content lives

Nothing is hard-coded in markup. Everything editable sits in `src/content/`:

| File              | Controls                                                             |
| ----------------- | -------------------------------------------------------------------- |
| `site.ts`         | Name, contact details, service area, nav, socials, headline numbers   |
| `businesses.ts`   | The five businesses, their colour, copy, offers and outbound links    |
| `booking.ts`      | The consultation hub — tracks and Motion links                        |
| `faqs.ts`         | Homepage FAQ (also feeds FAQPage structured data)                     |
| `testimonials.ts` | **Empty by design — see below**                                       |
| `posts.ts`        | Articles index                                                        |

### Two deliberate empty slots

**`testimonials.ts` is an empty array.** The old WordPress build shipped five fabricated testimonials attached to stock photos of people who are not clients. That is a liability, so nothing was carried over and nothing was invented. Paste your Google Reviews export into this file and the Proof section appears on the homepage automatically. Leave it empty and the section removes itself — no gap, no placeholder.

**`posts.ts` is an empty array.** `/blogs` shows a real empty state that points at the YouTube channel and the booking page, rather than a dead "Coming soon". Add entries and the page, and the sitemap, populate. Swap it for MDX or a CMS later without touching the page component.

---

## Design system

The palette is carried forward from the McNamer brand: **navy `#16304D`** and **brass `#E0A93B`**, extended with a deeper midnight ground and five *wavelength* hues — one per business.

The JM mark is a prism, so refraction is the organising idea: one source of light entering, five wavelengths leaving. The hero animates that literally; the same five colours then act as the structural rule on each business row, the tint on the booking hub, and the bar that closes the footer. It is a system, not an ornament — the colour tells you which business you are looking at.

Type is **Space Grotesk** (display), **Inter** (body), **IBM Plex Mono** (labels, eyebrows, data).

Tokens live in `src/app/globals.css` under `@theme`. Change a hex there and it propagates everywhere.

A note on the numbering: the four process steps are numbered `01–04` because they genuinely are a sequence. The five businesses are **not** numbered — the old site numbered them `01–05`, which implied an order that does not exist. They are keyed by colour instead.

---

## Accessibility

- Skip link is the first tab stop on every page.
- One `<h1>` per page; no heading-level skips (verified).
- Every image has an `alt`, or `alt=""` with `aria-hidden` where decorative.
- Visible brass focus ring on every interactive element.
- `prefers-reduced-motion` collapses every animation to a no-op.
- No horizontal overflow at 360px on any route (verified).
- Form errors are `role="alert"` and wired to their inputs with `aria-describedby`.

---

## SEO

- Per-page `Metadata` via `src/lib/seo.ts` — canonicals, Open Graph, Twitter cards.
- Dynamic OG image at `/opengraph-image` (edge-rendered, 1200×630).
- JSON-LD in `src/lib/schema.ts`: `Person`, `RealEstateAgent`, `WebSite`, `BreadcrumbList`, `FAQPage`, `ItemList`, `Service`.
- `sitemap.xml` and `robots.txt` generated from the route list.
- Legacy WordPress URLs preserved (`/about-us`, `/coaching`, `/blogs`, `/contact-us`, `/privacy-policies`, `/terms-and-conditions`), with 301s for common variants in `next.config.ts`.
- Legal pages are `noindex` so they do not compete for attention.

---

## Structure

```
src/
├── app/                 routes, sitemap, robots, OG image, contact API
├── components/
│   ├── layout/          header, footer
│   ├── sections/        hero, businesses, process, why, testimonials, faq, cta
│   ├── booking/         the consultation hub
│   ├── forms/           contact form
│   ├── ui/              button, accordion, fields
│   ├── prism.tsx        the refraction — the site's signature element
│   ├── reveal.tsx       scroll animation wrapper
│   └── section.tsx      section shell + eyebrow
├── content/             all editable copy and data
└── lib/                 utils, seo, schema, validation, rate limiting
```

---

## Assets

Portraits are cropped and converted to WebP at two widths in `public/images/jody/`. The JM mark in `public/logo/` has had its white background keyed out, so it sits cleanly on the dark header.

Source photography (52 headshots) is not in the repo — only the selected, optimised set. Keep the originals somewhere safe.
