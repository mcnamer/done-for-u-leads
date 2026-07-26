/**
 * Minimal in-memory limiter for the contact endpoint. It survives a warm
 * serverless instance, which is enough to blunt casual form spam on top of the
 * honeypot. For hard guarantees across instances, swap the Map for Upstash
 * Redis — the call signature stays the same.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, retryAfter: 0 };
}
