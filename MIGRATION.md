# Migration plan & content audit

Prepared before any code was written, by crawling the live site at `mcnamer.com`.

---

## 1. What the crawl actually found

The brief said *"clone and improve the current WordPress website"* and *"this is not a redesign."* That instruction could not be followed literally, and here is why.

**mcnamer.com is currently an unfinished Elementor demo.** It is running the **Coachio** life-coaching template (`elementorkits-1.nextdin.com/coachio` is still linked from the logo on several pages) with roughly 20% of the demo content replaced.

| Page                     | State                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                      | **Part real.** Hero, About paragraph, five businesses, four-step mission and "Why choose us" are genuinely Jody's. Everything else is demo.                        |
| `/about-us`              | **100% demo.** Titled "About Coachio". Lists CBT, EFT and Motivational Interviewing as methods. Four fictional coaches with stock photos. A "Cosmic Odyssey" space slider. |
| `/contact-us`            | **100% demo.** "123 Wellness Street, New York." `hello@coach.io`. A Google Map centred on **Jakarta, Indonesia**.                                                  |
| `/coaching`, `/blogs`    | Demo / empty.                                                                                                                                                     |
| Footer (every page)      | Phone `+1 (234) 567 890`. Address `2118 Thornridge Cir. Syracuse`. Service links to "Relationship Counseling" and "Stress & Anxiety Support".                      |

Other live problems:

- **A Dubai real-estate slider in Spanish** on the homepage — six slides for *Meydan Horizon*, *Dubai Maritime City*, *Ras Al Khaimah* — all linking out to `nvlivingproperties.com`. This is another company's inventory, on Jody's homepage, in a language none of his clients read.
- **Five fabricated testimonials** ("Kathryn Murphy, Marketing Director") with lorem ipsum quotes and stock-photo faces.
- **A fake pricing table** — $100 / $200 / $300 per session, features listed as "Lorem ipsum" ×5.
- Lorem ipsum in the Mission, Testimonials, Why Choose Us, Team, Pricing and Articles section headers.

**Cloning this faithfully would have shipped every one of those problems into a faster, more maintainable stack.** So the migration preserved what is real, discarded what is not, and rebuilt the rest from Jody's own brand assets.

---

## 2. What was preserved

| Preserved                                                                                       | Source                     |
| ----------------------------------------------------------------------------------------------- | -------------------------- |
| Hero positioning — "One family. Five businesses. 23 years of helping people win."                | Live homepage              |
| The About paragraph (500+ properties, $50M+ short sales, The Real Brokerage, One Real Mortgage) | Live homepage              |
| The five businesses, their descriptions and their outbound links                                 | Live homepage              |
| The four-step process — Connect → Plan → Execute → Grow                                          | Live homepage              |
| The three "Why choose us" points                                                                 | Live homepage              |
| `jody@mcnamer.com`                                                                               | Live footer                |
| Navy `#16304D` + brass `#E0A93B`                                                                 | `brand.json`               |
| URL structure — `/about-us`, `/coaching`, `/blogs`, `/contact-us`, `/privacy-policies`, `/terms-and-conditions` | Live nav |
| All Motion booking links                                                                         | `booking-links.md`         |
| All five social profiles                                                                         | `social.md`                |

## 3. What was discarded

The Coachio demo slider · the Dubai/Spanish slides · the five fake testimonials · the fake pricing tiers · the four fictional coaches · CBT/EFT/therapy methodology · "Relationship Counseling" and "Stress & Anxiety Support" service links · the Syracuse address · `+1 (234) 567 890` · `hello@coach.io` · the Jakarta map · every instance of lorem ipsum · the `elementorkits-1.nextdin.com` outbound link on the logo.

## 4. What was corrected

- **Phone** → `+1 (206) 910-6880`
- **Location** → Port Orchard, WA (service area: Kitsap, King, Pierce, Thurston)
- **Footer service links** → the five real businesses
- **Testimonials** → removed entirely rather than invented. See below.

---

## 5. New: the consultation hub

The goals document asked for booking to feel like a premium experience — *"Do not use a basic popup"* — with the flow **Choose business → Choose consultation → Open Motion**, and for it to become a signature moment.

`/book` implements exactly that. Five doors, phrased as the question in the visitor's head ("I want to buy, sell or invest"), each washing the panel in that business's wavelength. Choosing the door reveals only the consultations that belong to it, with the length and what actually happens on the call. Every one of the eleven Motion links is wired and verified.

---

## 6. Two things still needed from you

**1. Google Reviews export.** `src/content/testimonials.ts` is deliberately an empty array. Paste real, attributable reviews into it and the Proof section appears on the homepage automatically. This was the single largest content gap — the old site papered over it with fiction, and that is not something to migrate.

**2. Resend API key** (or another mail provider). Until it is set, the contact form returns an honest error telling people to email directly, rather than silently swallowing enquiries.

---

## 7. Pre-launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://mcnamer.com` in Vercel.
- [ ] Set `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`; send yourself a test message.
- [ ] Paste Google Reviews into `src/content/testimonials.ts`.
- [ ] Export the WordPress URL list (Screaming Frog or the sitemap) and diff it against `app/sitemap.ts`. Anything live that is not in the new build needs a 301 in `next.config.ts` — the common cases are already there.
- [ ] Verify Search Console still points at the property; resubmit `sitemap.xml` on launch day.
- [ ] Keep the WordPress install online for 48 hours after DNS cutover so nothing goes dark mid-propagation.
- [ ] Run Lighthouse against the deployed URL, not localhost — the numbers only mean something on real infrastructure.
