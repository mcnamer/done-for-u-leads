'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { nav, primaryCta, site } from '@/content/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all',
        scrolled
          ? 'border-hair bg-paper/85 shadow-soft-sm backdrop-blur-md'
          : 'border-transparent bg-paper',
      )}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <span className="grid size-9 place-items-center rounded-xl bg-brand-strong font-display text-sm font-extrabold text-white">
            DL
          </span>
          <span className="font-display text-[1.0625rem] leading-none font-extrabold tracking-[-0.02em] text-ink">
            Done For You <span className="text-brand-strong">Leads</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'font-display text-[0.95rem] font-medium transition-colors',
                  active ? 'text-brand-strong' : 'text-ink hover:text-brand-strong',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-xl border border-hair text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div id="mobile-nav" hidden={!open} className="border-t border-hair bg-paper lg:hidden">
        <nav aria-label="Primary (mobile)" className="wrap flex flex-col py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display border-b border-hair py-4 text-xl font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="lg" className="mt-5">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
