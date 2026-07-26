/**
 * Home-page content blocks. Everything here is derived from Jody's real
 * positioning as the operator behind Done For You Leads — no invented
 * statistics or testimonials. Edit copy here; the sections read from it.
 */

/** Real proof points, shown as count-up figures with a decorative fill. */
export const impact = [
  { value: 23, suffix: '+', label: 'Years operating inside real estate', fill: 0.92 },
  { value: 500, suffix: '+', label: 'Properties personally bought and sold', fill: 0.8 },
  { value: 1000, suffix: 's', label: 'Agents coached and equipped', fill: 0.7 },
  { value: 1, suffix: '', label: 'Team running your pipeline for you', fill: 1 },
] as const;

/** Media & video. Links point at real, existing channels — no embedded fakes. */
export const media = {
  youtube: 'https://www.youtube.com/@JodyMcNamer',
  series: {
    title: 'Straight talk for agents',
    body: 'Jody breaks down what actually fills a real-estate pipeline — lead gen, follow-up and conversion — from inside a working brokerage.',
    href: 'https://www.youtube.com/@JodyMcNamer',
  },
} as const;
