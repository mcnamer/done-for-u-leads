import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Kept as a literal (not imported) so the edge middleware bundle stays free of
// server-only modules. Must match SESSION_COOKIE in lib/portal/session.ts.
const SESSION_COOKIE = 'dfy_portal';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page and portal API routes are always reachable.
  if (pathname.startsWith('/portal/login') || pathname.startsWith('/portal/api')) {
    return NextResponse.next();
  }

  if (!req.cookies.has(SESSION_COOKIE)) {
    const url = req.nextUrl.clone();
    url.pathname = '/portal/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
