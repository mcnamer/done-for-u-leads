import { Calculator, Fingerprint, MessageSquareText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type KitPart = { icon: LucideIcon; title: string; body: string };
export type FreeResource = { title: string; body: string; href: string };

/**
 * The giveaway behind the popup and the /free-resources form. The PDF's source
 * and rebuild command are in scripts/close-more-leads-kit.html.
 * shortcut: the PDF is a public file, so the form is a soft gate, use a signed link if that ever matters.
 */
export const leadKit = {
  name: 'The Close More Leads Kit',
  file: '/resources/close-more-leads-kit.pdf',
  parts: [
    {
      icon: Fingerprint,
      title: 'Find Your Edge worksheet',
      body: 'Pin down the one clear reason a client should pick you over everyone else in your market.',
    },
    {
      icon: MessageSquareText,
      title: 'First-contact scripts',
      body: 'A text, a call, a voicemail and an email for when a new lead comes in, plus a simple follow-up rhythm.',
    },
    {
      icon: Calculator,
      title: 'Cost-per-closing worksheet',
      body: 'See what you pay in advertising for each closed transaction, and where your leads are getting stuck.',
    },
  ] as KitPart[],
};

/** Free downloads and training that already live on Agent Broker Coach. */
export const coachResources: FreeResource[] = [
  {
    title: 'Top agent Facebook ads',
    body: 'Download the Facebook ads top agents use to generate buyer and seller leads.',
    href: 'https://www.agentbrokercoach.com/download-your-free-facebook-ad-templates',
  },
  {
    title: 'Free call scripts',
    body: 'Scripts to help you attract more high-quality buyers and sellers.',
    href: 'https://www.agentbrokercoach.com/download-freecallscripts',
  },
  {
    title: 'Daily success schedule',
    body: 'A free daily schedule for structuring your working day.',
    href: 'https://www.agentbrokercoach.com/downloadyourfreedailysuccessschedule',
  },
  {
    title: '10 best practices',
    body: 'The ten practices successful agents use to build a business they love.',
    href: 'https://www.agentbrokercoach.com/download-10BestPracticesofthemostSuccessfulAgents/Brokers',
  },
  {
    title: 'Webinar replays',
    body: 'On-demand training on writing offers, managing your time and building a team.',
    href: 'https://www.agentbrokercoach.com/abc-webinar-replays',
  },
];
