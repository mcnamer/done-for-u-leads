import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contact, legalNav, nav, utilityNav, site, socials } from '@/content/site';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/70">
      {/* Big closing CTA */}
      <div className="wrap border-b border-white/10 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="kicker bg-white/10 text-brand-tint-2">Ready when you are</p>
            <h2 className="mt-5 max-w-2xl text-[2.5rem] leading-[1.03] text-white sm:text-5xl">
              Let&rsquo;s make you the <span className="text-brand">obvious</span> choice.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button asChild size="lg">
              <Link href="/book">
                Book a strategy call
                <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>

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
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs font-medium tracking-wider text-white/55 uppercase transition-colors hover:text-brand-tint-2"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
            Site
          </h2>
          <ul className="mt-5 space-y-3">
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
              <Link
                href="/book"
                className="text-white/75 transition-colors hover:text-brand-tint-2"
              >
                Book a strategy call
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-white/75">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-brand-tint-2"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-brand-tint-2">
                {contact.phone}
              </a>
            </li>
            <li className="text-white/45">Serving agents across the US &amp; Canada</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {year} {site.name}. All rights reserved. A McNamer company.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-white/40 transition-colors hover:text-brand-tint-2"
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
