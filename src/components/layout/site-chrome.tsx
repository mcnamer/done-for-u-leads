'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { BookingModal } from '@/components/booking/booking-modal';

/**
 * Wraps the marketing chrome (header, footer, booking modal) around normal
 * pages, but drops it entirely for the authenticated /portal app, which has its
 * own shell.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/portal')) {
    return <>{children}</>;
  }

  return (
    <>
      <Link
        href="#main"
        className="focus:bg-brand-strong sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white focus:shadow-soft"
      >
        Skip to content
      </Link>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <BookingModal />
    </>
  );
}
