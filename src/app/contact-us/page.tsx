import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Phone, CalendarCheck } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/forms/contact-form';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { contact, socials } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Done For You Leads',
  description:
    'Email jody@doneforuleads.com, call +1 (206) 910-6880, or send a message. Done-for-you real estate lead generation for agents across the US and Canada.',
  path: '/contact-us',
});

export default function ContactPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact-us' },
    ]),
  );

  const details = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: contact.phoneHref,
    },
    {
      icon: MapPin,
      label: 'Based in',
      value: `${contact.city}, ${contact.regionName}`,
    },
    {
      icon: CalendarCheck,
      label: 'Hours',
      value: contact.hours,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        image="/images/businesses/one-real-mortgage.webp"
        imageAlt="A couple reviewing paperwork with their advisor"
        imagePos="center"
        title="Tell me about your market and your goals"
        lede="Messages reach Jody directly. If you would rather skip the form and just pick a time, the calendar is one click away."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact-us' },
        ]}
      />

      <Section tone="bone">
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="slab rounded-xl bg-paper p-8">
                <h2 className="text-2xl text-ink">Direct lines</h2>

                <dl className="mt-7 space-y-6">
                  {details.map((detail) => (
                    <div key={detail.label} className="flex gap-4">
                      <detail.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-ink" />
                      <div>
                        <dt className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-2 uppercase">
                          {detail.label}
                        </dt>
                        <dd className="mt-1 text-ink">
                          {detail.href ? (
                            <a href={detail.href} className="transition-colors hover:text-lime-600">
                              {detail.value}
                            </a>
                          ) : (
                            detail.value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 border-t-2 border-ink pt-8">
                  <p className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-2 uppercase">
                    Serving
                  </p>
                  <p className="mt-2 leading-relaxed text-ink">{contact.serviceArea.join(' · ')}</p>
                </div>

                <div className="mt-8 border-t-2 border-ink pt-8">
                  <p className="font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-2 uppercase">
                    Elsewhere
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-2 transition-colors hover:text-lime-600"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/book"
                className="mt-6 flex items-center justify-between gap-4 rounded-xl border-2 border-ink bg-lime p-6 transition-transform hover:-translate-y-0.5"
              >
                <span>
                  <span className="font-display block font-bold text-ink">Skip the form</span>
                  <span className="mt-1 block text-sm text-ink/70">
                    Book straight into the calendar instead.
                  </span>
                </span>
                <CalendarCheck aria-hidden className="size-6 shrink-0 text-ink" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
