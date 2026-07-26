'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { nav, primaryCta, site } from '@/content/site';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchDialog } from '@/components/layout/search-dialog';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // A frosted white bar (dark in dark mode) that follows the site theme.
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-white/12 transition-all duration-500',
        scrolled
          ? 'bg-[var(--header-bg)]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_38px_-14px_rgba(22,48,77,0.5)] backdrop-blur-xl'
          : 'bg-[var(--header-bg)] shadow-[0_8px_30px_-16px_rgba(22,48,77,0.2)]',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <span
            className="grid place-items-center rounded-full p-[3px]"
            style={{ background: 'var(--logo-bg)' }}
          >
            <Image
              src="/logo/jm-mark-256.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </span>
          <span className="font-display text-xs leading-none font-semibold tracking-[0.1em] text-white uppercase sm:text-sm sm:tracking-[0.12em]">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {[{ label: 'Home', href: '/' }, ...nav].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="hover:text-brass relative py-1 text-sm text-white transition-colors"
              >
                {item.label}
                {active && (
                  <span aria-hidden className="bg-brass absolute -bottom-0.5 left-0 h-px w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden bg-[#a46be8] text-[#0a1626] hover:bg-[#c4a0f0] sm:inline-flex"
          >
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="hover:text-brass p-2 text-white lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="bg-midnight/95 border-t border-white/10 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Primary (mobile)" className="shell flex flex-col py-6">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className="font-display hover:text-brass border-b border-white/5 py-4 text-xl text-white transition-colors"
          >
            Home
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display hover:text-brass border-b border-white/5 py-4 text-xl text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            size="lg"
            className="mt-6 bg-[#a46be8] text-[#0a1626] hover:bg-[#c4a0f0]"
          >
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
