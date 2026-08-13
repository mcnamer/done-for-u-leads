import { Crosshair, GraduationCap, LineChart, Share2, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Service = {
  name: string;
  icon: LucideIcon;
  body: string;
  points: string[];
};

/** Core done-for-you services, carried over from the original site. */
export const coreServices: Service[] = [
  {
    name: 'Done-for-you lead generation',
    icon: Crosshair,
    body: 'Innovative direct-response advertising across every social channel, built on your unique selling proposition. Not a one-size-fits-all lead vendor — every campaign is customized and optimized for the individual agent.',
    points: [
      'Proprietary targeting and micro-audiences',
      'Individualized messaging in your voice',
      'Integrated brand marketing for real estate agents',
      'Leads that average a 6% call-to-close ratio',
    ],
  },
  {
    name: 'Coaching from creation to close',
    icon: GraduationCap,
    body: 'Two decades of private coaching behind every campaign. We know when to call a lead, what to say, how to say it, and how to get the appointment — then help you communicate the USP that turns prospects into clients.',
    points: [
      'When to call, what to say, how to get the appointment',
      'Coaching that has grown top agents and teams nationwide',
      'A long-term partnership with predictable results',
    ],
  },
  {
    name: 'Lead tracking & nurturing',
    icon: LineChart,
    body: 'We track every lead from generation to close, so you know exactly what you are paying in advertising for each closed transaction — and we nurture each one across every channel.',
    points: [
      'Every lead tracked from generation to close',
      'Phone, Messenger, text, video and email follow-up',
      'The right message to the right person at the right time',
    ],
  },
  {
    name: 'Integrated social media solutions',
    icon: Share2,
    body: 'We use social and display platforms — YouTube, Pinterest, X, Facebook and Instagram — to find the buyers and sellers most likely to recognize the value you bring, then build lookalike audiences from your best clients.',
    points: [
      'Highly targeted audience selection tied to your USP',
      'Lookalike audiences built from your best clients',
      'Reach where 98% of buyers start — online',
    ],
  },
  {
    name: 'CRM consulting',
    icon: Database,
    body: 'Our lead systems interface directly with all major CRMs. We help you work your current system more effectively, manage new set-ups, and recommend the best fit for your business.',
    points: [
      'Works with all major CRMs',
      'New CRM set-up and migration handled for you',
      'We take the mystery out of CRM',
    ],
  },
];

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  featured?: boolean;
};

/** Social Media Management tiers — original pricing from doneforuleads.com. */
export const socialTiers: PricingTier[] = [
  {
    name: 'Bronze',
    price: '$59',
    cadence: '/month',
    features: [
      'Social media analysis and strategy',
      'Monthly report',
      '3 social media posts a week',
      '1 infographic / month',
      'Quote, listing / sold & open-house posts',
    ],
  },
  {
    name: 'Silver',
    price: '$97',
    cadence: '/month',
    featured: true,
    features: [
      'Social media analysis and strategy',
      'Monthly report',
      '5 social media posts a week',
      '1 blog post / month',
      '1 infographic / month',
      '1 monthly newsletter',
      'Quote, listing / sold & open-house posts',
    ],
  },
  {
    name: 'Platinum',
    price: '$247',
    cadence: '/month',
    features: [
      'Social media analysis and strategy',
      'Monthly report',
      '5 social media posts a week',
      '1 blog post every 2 weeks',
      '1 infographic every 2 weeks',
      '1 monthly newsletter',
      'Quote, listing / sold & open-house posts',
    ],
  },
];

export const socialGoals = [
  'Increase website traffic',
  'Grow online visibility',
  'Raise your follower count',
  'Improve engagement rates',
  'Generate more contact-form submissions',
  'Produce more property inquiries and sales',
];

/** Digital Postcards offer — original from doneforuleads.com. */
export const digitalPostcards = {
  price: '$1,199',
  reach: 'up to 30,000 people',
  blurb:
    'Reach a wider audience at a fraction of the cost of traditional postcard marketing. Everything is digital — no printing, no mailing — so you get noticed in your specific area for one flat price.',
  steps: [
    {
      title: 'Done-for-you postcards',
      body: 'Pre-made templates customized with your branding, messaging and images.',
    },
    {
      title: 'Distribution & targeting',
      body: 'You choose the audience by location; we distribute using geofencing.',
    },
    {
      title: 'Follow-up',
      body: 'The people you reach flow into follow-up so interest turns into conversations.',
    },
  ],
};
