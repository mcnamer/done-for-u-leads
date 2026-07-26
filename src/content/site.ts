/**
 * Single source of truth for identity, contact details, navigation and socials.
 * Every component reads from here — nothing is hard-coded in markup.
 */

export const site = {
  name: 'Done For You Leads',
  person: 'Jody McNamer',
  role: 'Real estate lead generation, done for you',
  tagline: 'Predictable pipeline for agents who would rather list than chase.',
  description:
    'Buyer and seller campaigns built, launched and managed for you — so your calendar fills with real conversations instead of cold calls. Built and tested inside a working brokerage by an operator who still lists and sells, not a vendor guessing at what agents need.',
  locale: 'en_US',
} as const;

export const contact = {
  email: 'jody@doneforuleads.com',
  phone: '+1 (206) 910-6880',
  phoneHref: 'tel:+12069106880',
  city: 'Port Orchard',
  region: 'WA',
  regionName: 'Washington',
  country: 'US',
  serviceArea: ['United States', 'Canada'],
  hours: 'Monday – Saturday, 8am – 6pm PT',
} as const;

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jodymcnamer/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@JodyMcNamer' },
  { label: 'Facebook', href: 'https://www.facebook.com/jody.mcnamer/' },
  { label: 'Instagram', href: 'https://www.instagram.com/jmcnamer/' },
] as const;

/** Primary navigation. */
export const nav = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'About', href: '/about-us' },
  { label: 'Insights', href: '/blogs' },
  { label: 'Contact', href: '/contact-us' },
] as const;

export const legalNav = [
  { label: 'Privacy policy', href: '/privacy-policies' },
  { label: 'Terms & conditions', href: '/terms-and-conditions' },
] as const;

/** The one conversion that matters. */
export const primaryCta = {
  label: 'Book a strategy call',
  href: '/book',
} as const;

export const proofPoints = [
  { value: '23', suffix: '+', label: 'Years operating inside real estate' },
  { value: '500', suffix: '+', label: 'Properties personally bought and sold' },
  { value: '1000', prefix: '', suffix: 's', label: 'Agents coached and equipped' },
  { value: '1', label: 'Team running your pipeline for you' },
] as const;
