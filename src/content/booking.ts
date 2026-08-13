import type { Wavelength } from './businesses';

export type Consultation = {
  id: string;
  title: string;
  /** What actually happens on the call. Written for the person booking it. */
  detail: string;
  minutes: number;
  url: string;
};

export type BookingTrack = {
  id: string;
  name: string;
  /** The question in the visitor's head that this track answers. */
  question: string;
  wavelength: Wavelength;
  hex: string;
  consultations: Consultation[];
};

/** Motion scheduling links. Verified against the McNamer booking sheet. */
const MOTION = 'https://app.usemotion.com/meet/jodymcnamer';

export const quickCall: Consultation = {
  id: 'strategy-30',
  title: '30-minute strategy call',
  detail:
    'Tell me your market, your price band and your goals. I’ll show you exactly which campaigns would fill your pipeline — or tell you straight if it is not the right fit.',
  minutes: 30,
  url: `${MOTION}/30minutemeeting`,
};

export const bookingTracks: BookingTrack[] = [
  {
    id: 'leads',
    name: 'For agents',
    question: 'I need a pipeline I can count on.',
    wavelength: 'violet',
    hex: '#6FA1CC',
    consultations: [
      {
        id: 'agent-exploration-leads',
        title: 'Agent exploration call',
        detail: 'What a done-for-you campaign would look like for your market and your budget.',
        minutes: 30,
        url: `${MOTION}/agentexploration-call`,
      },
    ],
  },
  {
    id: 'loan-officers',
    name: 'For loan officers',
    question: 'I originate, and I want more agent partnerships.',
    wavelength: 'azure',
    hex: '#3F8FD1',
    consultations: [
      {
        id: 'lo-consulting-leads',
        title: 'Loan officer consulting',
        detail: 'Lead flow and agent partnerships for loan officers.',
        minutes: 30,
        url: `${MOTION}/loconsultingcall`,
      },
    ],
  },
];
