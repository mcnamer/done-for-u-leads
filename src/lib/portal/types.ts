/**
 * Portal data models. These mirror the Jody Analytics plugin schema so the
 * WordPress REST API can map onto them 1:1 (see wordpress/jdy-portal-rest.php).
 */

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'appointment'
  | 'approved'
  | 'closed'
  | 'lost';

export const LEAD_STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'appointment',
  'approved',
  'closed',
  'lost',
];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  appointment: 'Appointment',
  approved: 'Approved',
  closed: 'Closed',
  lost: 'Lost',
};

export type Lead = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  source: string;
  sourceForm?: string;
  campaignId?: number;
  campaignName?: string;
  cost: number;
  status: LeadStatus;
  city?: string;
  region?: string;
  platform?: string;
  notes?: string;
  createdAt: string; // ISO
};

export type Campaign = {
  id: number;
  name: string;
  channel: string;
  status: 'active' | 'paused' | 'ended';
  spend: number;
  leads: number;
  appointments: number;
  closed: number;
  startedAt: string;
};

export type Metrics = {
  leads: number;
  leadsDelta: number; // % vs previous period
  appointments: number;
  costPerLead: number;
  callToClose: number; // %
  spend: number;
  revenueInfluenced: number;
  pipeline: Record<LeadStatus, number>;
  /** Last 14 days of lead counts for the sparkline. */
  trend: number[];
};

export type PortalUser = {
  name: string;
  email: string;
  company?: string;
  plan: 'Bronze' | 'Silver' | 'Platinum' | 'Custom';
  role: 'agent' | 'team' | 'manager' | 'admin';
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'open' | 'failed';
};

export type Session = {
  user: PortalUser;
  /** WordPress auth token, when connected to a live backend. */
  token?: string;
};
