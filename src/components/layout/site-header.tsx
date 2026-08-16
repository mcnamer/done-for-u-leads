'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Mail,
  LogIn,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { headerNav, headerNavSplit, primaryCta, site, contact, socials } from '@/content/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const socialIcons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Facebook: Facebook,
  Instagram: Instagram,
};

const leftNav = headerNav.slice(0, headerNavSplit);
const rightNav = headerNav.slice(headerNavSplit);

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'font-display text-[0.95rem] font-medium transition-colors',
        active ? 'text-brand-strong' : 'text-ink hover:text-brand-strong',
      )}
    >
      {label}
    </Link>
  );
}

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

  const Logo = (
    <Link
      href="/"
      className="font-script inline-flex items-end leading-none text-brand-strong transition-colors hover:text-brand-ink"
      aria-label={`${site.name} — home`}
    >
      <span className="text-[2.35rem] leading-[0.8] lg:text-[2.7rem]">doneforuleads</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-dark text-white/70 lg:block">
        <div className="wrap flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href={contact.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone className="size-3.5" aria-hidden />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="size-3.5" aria-hidden />
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Live status — signals a running platform, not a brochure site */}
            <span className="flex items-center gap-2 font-medium text-white/90">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-[#34d399]" />
              </span>
              Platform online
            </span>
            <span aria-hidden className="hidden h-3.5 w-px bg-white/20 xl:block" />
            <span className="hidden xl:inline">Serving agents across the US &amp; Canada</span>
            <span aria-hidden className="h-3.5 w-px bg-white/20" />
            <ul className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="block transition-colors hover:text-white"
                    >
                      {Icon ? <Icon className="size-4" aria-hidden /> : s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <span aria-hidden className="h-3.5 w-px bg-white/20" />
            {/* Client login — account entry point, top-right platform convention */}
            <Link
              href="/portal"
              className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-tint-2"
            >
              <LogIn className="size-3.5" aria-hidden />
              Client login
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar — centered logo, split nav */}
      <div
        className={cn(
          'border-b transition-all',
          scrolled ? 'border-hair bg-paper/90 shadow-soft-sm backdrop-blur-md' : 'border-hair bg-paper',
        )}
      >
        <div className="wrap relative flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Left nav (desktop) */}
          <nav aria-label="Primary left" className="hidden items-center gap-x-5 lg:flex xl:gap-x-7">
            {leftNav.map((item) => (
              <NavLink key={item.href} {...item} active={pathname === item.href} />
            ))}
          </nav>

          {/* Logo — left on mobile, exact-centered on desktop (absolute so the
              wider action cluster can't nudge it off centre) */}
          <div className="flex justify-start lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            {Logo}
          </div>

          {/* Right nav + auth/CTA (desktop) / hamburger (mobile) */}
          <div className="flex items-center justify-end gap-3 xl:gap-5">
            <nav aria-label="Primary right" className="hidden items-center gap-x-4 lg:flex xl:gap-x-7">
              {rightNav.map((item) => (
                <NavLink key={item.href} {...item} active={pathname === item.href} />
              ))}
            </nav>
            <span aria-hidden className="hidden h-6 w-px bg-hair lg:block" />
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <Link href={primaryCta.href}>
                <span className="hidden xl:inline">{primaryCta.label}</span>
                <span className="xl:hidden">Book a call</span>
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
      </div>

      {/* Mobile sheet */}
      <div id="mobile-nav" hidden={!open} className="border-b border-hair bg-paper lg:hidden">
        <nav aria-label="Primary (mobile)" className="wrap flex flex-col py-4">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display border-b border-hair py-3.5 text-lg font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/portal"
            className="font-display flex items-center gap-2 border-b border-hair py-3.5 text-lg font-semibold text-brand-strong"
          >
            <LogIn className="size-5" aria-hidden />
            Client login
          </Link>
          <Button asChild size="lg" className="mt-5">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <div className="mt-5 flex items-center gap-4 text-ink-2">
            {socials.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors hover:text-brand-strong"
                >
                  {Icon ? <Icon className="size-5" aria-hidden /> : s.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
