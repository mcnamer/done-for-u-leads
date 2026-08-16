import type { Campaign, Invoice, Lead, Metrics, PortalUser } from './types';

/**
 * Demo data used until a live WordPress backend is configured (WP_API_URL).
 * Deterministic — no random/date-at-import so it renders identically on server
 * and client.
 */

export const mockUser: PortalUser = {
  name: 'Demo Agent',
  email: 'agent@example.com',
  company: 'Cascade Realty Group',
  plan: 'Silver',
  role: 'agent',
};

const names = [
  'Marcus Reyes', 'Priya Nair', 'Tom Halloran', 'Danielle Ford', 'Wes Okafor',
  'Sofia Marin', 'Jared Boone', 'Amina Yusuf', 'Grant Whitley', 'Chloe Vance',
  'Diego Salas', 'Bethany Cole', 'Ravi Kapoor', 'Nina Petrova', 'Cole Barnett',
  'Hannah Reid', 'Victor Nguyen', 'Leah Stern', 'Owen Marsh', 'Tara Quinn',
];
const cities = ['Port Orchard', 'Bremerton', 'Gig Harbor', 'Tacoma', 'Silverdale', 'Poulsbo'];
const sources = ['Facebook', 'Google', 'Instagram', 'YouTube', 'Landing page'];
const statuses = ['new', 'new', 'contacted', 'contacted', 'qualified', 'appointment', 'approved', 'closed', 'lost'] as const;
const campaignsByName = ['Seller Spring 24', 'Buyer Reach', 'Just Listed Retarget', 'FSBO Outreach'];

export const mockLeads: Lead[] = names.map((n, i) => {
  const day = String((i % 27) + 1).padStart(2, '0');
  return {
    id: 1000 + i,
    fullName: n,
    email: n.toLowerCase().replace(/[^a-z]+/g, '.') + '@email.com',
    phone: `(206) 555-${String(1000 + i).slice(-4)}`,
    source: sources[i % sources.length]!,
    sourceForm: 'Home value request',
    campaignId: (i % 4) + 1,
    campaignName: campaignsByName[i % 4]!,
    cost: [18, 22, 27, 31, 25][i % 5]!,
    status: statuses[i % statuses.length]!,
    city: cities[i % cities.length]!,
    region: 'WA',
    platform: sources[i % sources.length]!,
    createdAt: `2026-08-${day}T${String((i % 12) + 8).padStart(2, '0')}:15:00Z`,
  };
});

export const mockCampaigns: Campaign[] = campaignsByName.map((name, i) => ({
  id: i + 1,
  name,
  channel: ['Meta Ads', 'Google Ads', 'Meta Ads', 'Meta Ads'][i]!,
  status: (['active', 'active', 'paused', 'active'] as const)[i]!,
  spend: [2450, 1980, 1120, 860][i]!,
  leads: [58, 44, 21, 14][i]!,
  appointments: [12, 9, 4, 3][i]!,
  closed: [3, 2, 1, 1][i]!,
  startedAt: ['2026-06-01', '2026-06-15', '2026-07-02', '2026-07-20'][i]!,
}));

export const mockMetrics: Metrics = {
  leads: 137,
  leadsDelta: 18,
  appointments: 28,
  costPerLead: 24,
  callToClose: 6,
  spend: 6410,
  revenueInfluenced: 92000,
  pipeline: { new: 22, contacted: 34, qualified: 19, appointment: 12, approved: 5, closed: 7, lost: 38 },
  trend: [6, 9, 7, 11, 8, 12, 10, 14, 9, 13, 15, 11, 16, 12],
};

export const mockInvoices: Invoice[] = [
  { id: 'INV-1043', date: '2026-08-01', amount: 97, status: 'paid' },
  { id: 'INV-1021', date: '2026-07-01', amount: 97, status: 'paid' },
  { id: 'INV-0999', date: '2026-06-01', amount: 97, status: 'paid' },
];
