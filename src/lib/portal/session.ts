import 'server-only';
import { cookies } from 'next/headers';
import type { Session } from './types';

export const SESSION_COOKIE = 'dfy_portal';

/**
 * MVP session store: a base64-encoded JSON session in an httpOnly cookie.
 * NOTE for production hardening: sign this (JWT/HMAC) or store only the
 * WordPress token and re-validate it against WP on each request.
 */
export function encodeSession(session: Session): string {
  return Buffer.from(JSON.stringify(session), 'utf8').toString('base64url');
}

export function decodeSession(raw: string | undefined): Session | null {
  if (!raw) return null;
  try {
    const json = Buffer.from(raw, 'base64url').toString('utf8');
    const parsed = JSON.parse(json) as Session;
    if (parsed?.user?.email) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Read the current session in a Server Component / route handler. */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}
