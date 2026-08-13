/**
 * Single source of truth for identity, contact details, navigation and socials.
 * Every component reads from here — nothing is hard-coded in markup.
 */

export const site = {
  name: 'Done For You Leads',
  person: 'Jody McNamer',
  role: 'Real estate lead generation',
  tagline: 'A simple way for agents to close more leads — and build a business they love.',
  description:
    'Done For You Leads finds what makes you different, then puts it in front of the exact people looking for it — proprietary targeting, micro-audiences and individualized messaging that turn strangers into meaningful conversations with buyers and sellers. Not a one-size-fits-all lead vendor: every campaign is customized and optimized for the individual agent.',
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
  { label: 'Services', href: '/services' },
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
  { value: '6', suffix: '%', label: 'Average lead call-to-close ratio' },
  { value: '20', suffix: '+', label: 'Years marketing real estate' },
  { value: '10', suffix: '+', label: 'Years generating agent leads' },
  { value: '100', suffix: '%', label: 'Done for you, start to finish' },
] as const;
