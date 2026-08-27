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

/**
 * Live backend URL. Prefer the WP_API_URL env var (set in Vercel); fall back to
 * the current WordPress install so the portal is live without a dashboard step.
 * NOTE: this is Bluehost's *temporary* URL — once the real domain is attached,
 * set WP_API_URL in Vercel and it overrides this default.
 */
const DEFAULT_WP = 'https://yhr.jon.mybluehost.me/website_9ccbd311/wp-json/jdy/v1';
const WP = (process.env.WP_API_URL || DEFAULT_WP).replace(/\/$/, '');
export const isLive = Boolean(WP);

class WpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function wp<T>(path: string, token: string | undefined, init?: RequestInit): Promise<T> {
  const res = await fetch(`${WP}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      // X-JDY-Token is a fallback for hosts that strip the Authorization header.
      ...(token ? { Authorization: `Bearer ${token}`, 'X-JDY-Token': token } : {}),
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new WpError(res.status, body?.message ?? `Backend error (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function authenticate(
  email: string,
  password: string,
): Promise<Session | null> {
  const demo = (): Session | null => {
    // Accept any email + a password of 4+ chars.
    if (!email.includes('@') || password.length < 4) return null;
    return { user: { ...mockUser, email } };
  };

  if (!WP) return demo();

  try {
    const data = await wp<{ token: string; user: PortalUser }>('/auth', undefined, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return { user: data.user, token: data.token };
  } catch (err) {
    // A real rejection (bad credentials / no portal access) fails the login.
    const status = err instanceof WpError ? err.status : 0;
    if (status === 400 || status === 401 || status === 403) return null;
    // Backend unreachable / 5xx: don't lock everyone out — fall back to demo.
    return demo();
  }
}

async function live<T>(path: string, token: string | undefined, fallback: T): Promise<T> {
  if (!WP) return fallback;
  try {
    return await wp<T>(path, token);
  } catch {
    // Never crash the portal on a backend hiccup — show demo data instead.
    return fallback;
  }
}

export async function getMetrics(session: Session): Promise<Metrics> {
  return live<Metrics>('/metrics', session.token, mockMetrics);
}

export async function getLeads(session: Session): Promise<Lead[]> {
  return live<Lead[]>('/leads', session.token, mockLeads);
}

export async function getCampaigns(session: Session): Promise<Campaign[]> {
  return live<Campaign[]>('/campaigns', session.token, mockCampaigns);
}

export async function getInvoices(session: Session): Promise<Invoice[]> {
  return live<Invoice[]>('/invoices', session.token, mockInvoices);
}
