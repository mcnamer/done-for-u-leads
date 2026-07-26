export type Wavelength = 'amber' | 'azure' | 'indigo' | 'violet' | 'teal';

export type Business = {
  slug: string;
  name: string;
  /** What this business does, said the way a client would say it. */
  promise: string;
  summary: string;
  /** Concrete things you get. No adjectives. */
  offers: string[];
  who: string;
  wavelength: Wavelength;
  hex: string;
  /** External business website (opened from the card photo + name). */
  href: string;
  /** Motion scheduling link for this business's primary consultation. */
  book: string;
  image: string;
  imageAlt: string;
  /** 'contain' for designed graphics that must show whole; defaults to cover. */
  imageFit?: 'cover' | 'contain';
  /** Backdrop behind a 'contain' image so the letterbox blends in. */
  imageBg?: string;
};

/**
 * Order is the refraction order of the prism in the JM mark: warm to cool.
 * These are five businesses, not five steps — so they carry colour, not numbers.
 */
export const businesses: Business[] = [
  {
    slug: 'mcnamer-real-estate',
    name: 'McNamer Real Estate',
    promise: 'Buy or sell with a broker who has worked every market.',
    summary:
      'Twenty-three years, 500+ transactions, and both sides of the 2008 crash. Jody works with VA and military households, first-time buyers, sellers, seniors downsizing, distressed and FSBO situations, and investors across Kitsap, King, Pierce and Thurston Counties.',
    offers: [
      'Listing strategy and pricing built on comparable evidence, not hope',
      'VA-fluent representation for military households',
      'Buyer strategy for first-time, move-up and downsizing moves',
      'Distressed, short-sale and FSBO situations handled directly',
    ],
    who: 'Buyers, sellers and investors in Western Washington',
    wavelength: 'amber',
    hex: '#1F4E79',
    href: 'https://jodymcnamer.com/',
    book: 'https://app.usemotion.com/meet/jodymcnamer/seller-consultation',
    image: '/images/businesses/mcnamer-real-estate.webp',
    imageAlt: 'A stone-clad custom home at dusk with a sweeping driveway',
  },
  {
    slug: 'one-real-mortgage',
    name: 'One Real Mortgage',
    promise: 'Financing without the runaround.',
    summary:
      'Get pre-approved, understand what your payment actually is, and put your VA benefits to work. Because the loan and the listing sit under one roof, there are fewer handoffs between the offer and the keys — and fewer surprises three days before closing.',
    offers: [
      'Pre-approval that a listing agent will take seriously',
      'VA loan guidance from a Navy veteran',
      'Straight answers on rate, payment and cash to close',
      'Your loan and your home handled by one team',
    ],
    who: 'Buyers who want the loan and the house handled together',
    wavelength: 'azure',
    hex: '#3F8FD1',
    href: 'https://onerealmortgage.com/',
    book: 'https://app.usemotion.com/meet/jodymcnamer/loconsultingcall',
    image: '/images/businesses/one-real-mortgage.webp',
    imageAlt: 'A couple reviewing mortgage paperwork with their advisor',
  },
  {
    slug: 'agent-broker-coach',
    name: 'Agent Broker Coach',
    promise: 'Coaching that builds a business, not just a busy month.',
    summary:
      'Tools, scripts and weekly guidance for agents and loan officers who want a business that still stands when the market turns. Includes the Certified Investor Agent program and the Go/No-Go deal calculator.',
    offers: [
      'Certified Investor Agent program',
      'The Go/No-Go calculator for sizing a deal in minutes',
      'Weekly coaching and accountability',
      'Scripts and systems for lead conversion',
    ],
    who: 'Agents, loan officers and team leaders',
    wavelength: 'indigo',
    hex: '#6B7BE8',
    href: 'https://www.agentbrokercoach.com/',
    book: 'https://app.usemotion.com/meet/jodymcnamer/abcconsulting',
    image: '/images/businesses/agent-broker-coach.webp',
    imageAlt: 'Jody McNamer, real estate coach, before a wall of screens',
  },
  {
    slug: 'done-for-you-leads',
    name: 'Done For You Leads',
    promise: 'Predictable pipeline for agents who would rather list than chase.',
    summary:
      'Campaigns built, launched and managed for you, so the calendar fills with conversations instead of cold calls. Built by an operator who still lists and sells — not by a vendor guessing at what agents need.',
    offers: [
      'Buyer and seller campaigns built and run for you',
      'Follow-up sequences that keep leads warm',
      'Reporting you can actually read',
      'Built and tested inside a working brokerage',
    ],
    who: 'Producing agents who need consistent lead flow',
    wavelength: 'violet',
    hex: '#A46BE8',
    href: 'https://doneforuleads.com/',
    book: 'https://app.usemotion.com/meet/jodymcnamer/agentexploration-call',
    image: '/images/businesses/done-for-you-leads.webp',
    imageAlt: 'A live marketing training session for agents',
  },
  {
    slug: 'autismworks',
    name: 'AutismWorks',
    promise: 'Lived experience turned into a plan families can use.',
    summary:
      'Co-founded with his son Tyler McNamer — published author of Population: ONE and Becoming ONE — AutismWorks makes the day-to-day more manageable for individuals with autism and the people who love them. Have fun, be nice, do good.',
    offers: [
      'Autism, Answered — a video series with Tyler and Jody',
      'Books and speaking from a published author with autism',
      'Practical resources for parents and caregivers',
      'A community, not a waiting list',
    ],
    who: 'Individuals with autism, their families and their advocates',
    wavelength: 'teal',
    hex: '#A46BE8',
    href: 'https://www.autismworks.com/',
    book: 'https://app.usemotion.com/meet/jodymcnamer/autism-discussion',
    image: '/images/businesses/autismworks.webp',
    imageAlt: 'AutismWorks — Tyler McNamer speaking on transforming lives',
    imageFit: 'contain',
    imageBg: '#14315c',
  },
];

export const wavelengthHex: Record<Wavelength, string> = {
  amber: '#1F4E79',
  azure: '#3F8FD1',
  indigo: '#6B7BE8',
  violet: '#A46BE8',
  teal: '#A46BE8',
};
