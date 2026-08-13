import Link from 'next/link';
import { ArrowUpRight, Phone, Mail, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { contact, legalNav, nav, utilityNav, site, socials } from '@/content/site';
import { Button } from '@/components/ui/button';

const socialIcons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Facebook: Facebook,
  Instagram: Instagram,
};

const gettingStarted = [
  {
    n: '01',
    title: 'Book a free call',
    body: 'Tell us your market, your price band and your goals — 30 minutes, no obligation.',
  },
  {
    n: '02',
    title: 'We build your edge',
    body: 'Your USP, campaigns, targeting, messaging and follow-up — all built and run for you.',
  },
  {
    n: '03',
    title: 'Leads land on your calendar',
    body: 'You take the appointments. We keep the pipeline full behind you, month after month.',
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/70">
      {/* Getting started — 3 steps */}
      <div className="border-b border-white/10">
        <div className="wrap py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kicker bg-white/10 text-brand-tint-2">Getting started</p>
            <h2 className="mt-5 text-3xl leading-[1.05] text-white sm:text-4xl">
              Three steps to a fuller calendar
            </h2>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {gettingStarted.map((s) => (
              <li key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                <span className="font-display text-3xl font-extrabold text-brand">{s.n}</span>
                <h3 className="mt-3 text-xl text-white">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/book">
                Book a strategy call
                <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="wrap grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-strong font-display text-sm font-extrabold text-white">
              DL
            </span>
            <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-white">
              Done For You <span className="text-brand">Leads</span>
            </span>
          </span>
          <p className="mt-5 max-w-sm leading-relaxed text-white/55">
            We find what makes you different and put it in front of the exact people looking for it.
            Individualized real-estate lead generation — done for you.
          </p>
          <ul className="mt-7 space-y-2 text-white/70">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="size-4" aria-hidden />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4" aria-hidden />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
            Explore
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {[...nav, ...utilityNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 transition-colors hover:text-brand-tint-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="text-white/75 transition-colors hover:text-brand-tint-2">
                Book a call
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
            Follow
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {Icon ? <Icon className="size-[1.15rem]" aria-hidden /> : s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-white/45">Serving agents across the US &amp; Canada.</p>
        </div>
      </div>

      {/* Bottom bar — copyright · socials · legal */}
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/40">
            © {year} {site.name}. All rights reserved. A McNamer company.
          </p>
          <ul className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="block text-white/40 transition-colors hover:text-white"
                  >
                    {Icon ? <Icon className="size-4" aria-hidden /> : s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-white/40 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
