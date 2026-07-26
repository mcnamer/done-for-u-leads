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

      <Section className="grain" shapes>
        <div className="shell grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <h2 className="font-display text-xl font-semibold text-white">Direct lines</h2>

                <dl className="mt-7 space-y-6">
                  {details.map((detail) => (
                    <div key={detail.label} className="flex gap-4">
                      <detail.icon aria-hidden className="text-brass mt-0.5 size-5 shrink-0" />
                      <div>
                        <dt className="text-slate font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                          {detail.label}
                        </dt>
                        <dd className="mt-1 text-white">
                          {detail.href ? (
                            <a href={detail.href} className="hover:text-brass transition-colors">
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

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="text-slate font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                    Serving
                  </p>
                  <p className="mt-2 leading-relaxed text-white/85">
                    {contact.serviceArea.join(' · ')}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="text-slate font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                    Elsewhere
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brass text-white/80 transition-colors"
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
                className="border-brass/30 hover:bg-brass/5 mt-6 flex items-center justify-between gap-4 rounded-2xl border p-6 transition-colors"
              >
                <span>
                  <span className="font-display block font-semibold text-white">Skip the form</span>
                  <span className="text-slate mt-1 block text-sm">
                    Book straight into the calendar instead.
                  </span>
                </span>
                <CalendarCheck aria-hidden className="text-brass size-6 shrink-0" />
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
