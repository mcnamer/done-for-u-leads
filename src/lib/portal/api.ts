import 'server-only';
import type { Campaign, Invoice, Lead, Metrics, PortalUser, Session } from './types';
import { mockCampaigns, mockInvoices, mockLeads, mockMetrics, mockUser } from './mock';

/**
 * Portal data access. When WP_API_URL is set, every call proxies to the Jody
 * Analytics REST API (per-user scoped, authenticated with the session token).
 * Otherwise it returns deterministic demo data so the portal runs and deploys
 * before the backend is wired.
 *
 * Endpoints expected on the WordPress side (see wordpress/jdy-portal-rest.php):
 *   POST {WP_API_URL}/auth        { email, password } -> { token, user }
 *   GET  {WP_API_URL}/me
 *   GET  {WP_API_URL}/metrics
 *   GET  {WP_API_URL}/leads
 *   PATCH {WP_API_URL}/leads/:id  { status }
 *   GET  {WP_API_URL}/campaigns
 *   GET  {WP_API_URL}/invoices
 */

const WP = process.env.WP_API_URL?.replace(/\/$/, '');
export const isLive = Boolean(WP);

async function wp<T>(path: string, token: string | undefined, init?: RequestInit): Promise<T> {
  const res = await fetch(`${WP}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? `Backend error (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function authenticate(
  email: string,
  password: string,
): Promise<Session | null> {
  if (!WP) {
    // Demo mode: accept any email + a password of 4+ chars.
    if (!email.includes('@') || password.length < 4) return null;
    return { user: { ...mockUser, email } };
  }
  try {
    const data = await wp<{ token: string; user: PortalUser }>('/auth', undefined, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return { user: data.user, token: data.token };
  } catch {
    return null;
  }
}

export async function getMetrics(session: Session): Promise<Metrics> {
  if (!WP) return mockMetrics;
  return wp<Metrics>('/metrics', session.token);
}

export async function getLeads(session: Session): Promise<Lead[]> {
  if (!WP) return mockLeads;
  return wp<Lead[]>('/leads', session.token);
}

export async function getCampaigns(session: Session): Promise<Campaign[]> {
  if (!WP) return mockCampaigns;
  return wp<Campaign[]>('/campaigns', session.token);
}

export async function getInvoices(session: Session): Promise<Invoice[]> {
  if (!WP) return mockInvoices;
  return wp<Invoice[]>('/invoices', session.token);
}
