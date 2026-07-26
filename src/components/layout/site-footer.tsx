import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { contact, legalNav, nav, site, socials } from '@/content/site';
import { businesses } from '@/content/businesses';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="night bg-midnight relative border-t border-white/10">
      {/* The five wavelengths close the page the way they opened it. */}
      <div aria-hidden className="flex h-1">
        {businesses.map((b) => (
          <span key={b.slug} className="flex-1" style={{ background: b.hex }} />
        ))}
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/logo/jm-mark-256.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              {site.name}
            </span>
          </Link>
          <p className="text-slate mt-6 max-w-xs leading-relaxed">
            Done-for-you real estate lead generation — buyer and seller campaigns built, launched
            and managed by an operator who still lists and sells.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate hover:text-brass font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-slate font-mono text-[0.6875rem] tracking-[0.2em] uppercase">Site</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brass text-white/80 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="hover:text-brass text-white/80 transition-colors">
                Book a strategy call
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-slate font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
            The ecosystem
          </h2>
          <ul className="mt-5 space-y-3">
            {businesses.map((b) => (
              <li key={b.slug}>
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
                >
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full"
                    style={{ background: b.hex }}
                  />
                  {b.name}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-60"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-slate font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-white/80">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-brass transition-colors">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="hover:text-brass transition-colors">
                {contact.phone}
              </a>
            </li>
            <li className="text-slate">
              {contact.city}, {contact.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate text-xs">
            © {year} {site.name}. All rights reserved. A McNamer company.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate hover:text-brass text-xs transition-colors"
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
