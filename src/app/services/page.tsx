import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowUpRight, Mail, MapPin, Send } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { Button } from '@/components/ui/button';
import { IconChip } from '@/components/ui/icon-chip';
import {
  coreServices,
  socialTiers,
  socialGoals,
  digitalPostcards,
} from '@/content/services';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Done-for-you lead generation, coaching from creation to close, lead tracking and nurturing, integrated social media, CRM consulting, social media management and digital postcards — for real estate agents.',
  path: '/services',
});

const postcardIcons = [Mail, MapPin, Send];

export default function ServicesPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  );

  return (
    <>
      <PageHeader
        eyebrow="Services"
        image="/images/businesses/done-for-you-leads.webp"
        imageAlt="A live marketing training session for agents"
        imagePos="center"
        title="Everything that fills a calendar — handled"
        lede="From the campaigns that generate the conversations to the coaching that closes them, here is what a done-for-you partnership covers."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      {/* Core services */}
      <Section>
        <div className="wrap">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] text-ink sm:text-5xl">
              The whole engine, run for you
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {coreServices.map((s, i) => (
              <Reveal key={s.name} delay={(i % 2) * 0.06}>
                <div className="slab slab-hover h-full p-8">
                  <IconChip icon={s.icon} />
                  <h3 className="mt-5 text-2xl text-ink">{s.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.95rem] text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong">
                          <Check className="size-3" aria-hidden />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Social media management + pricing */}
      <Section tone="bone">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Social media management</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Show up consistently — without lifting a finger
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-5">
              <p className="leading-relaxed text-ink-2">
                Clear goals, handled for you: more traffic, more visibility, more engagement, and
                more property inquiries — posted, reported and optimized every month.
              </p>
            </Reveal>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {socialGoals.map((g) => (
              <li
                key={g}
                className="rounded-full border border-hair bg-paper px-3.5 py-1.5 text-sm text-ink-2"
              >
                {g}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {socialTiers.map((tier) => (
              <Reveal key={tier.name}>
                <div
                  className={
                    tier.featured
                      ? 'slab relative h-full border-brand-strong p-8 shadow-soft-lg ring-1 ring-brand-strong/30'
                      : 'slab h-full p-8'
                  }
                >
                  {tier.featured && (
                    <span className="absolute -top-3 right-6 rounded-full bg-brand-strong px-3 py-1 font-display text-[0.6875rem] font-bold tracking-wide text-white uppercase">
                      Most popular
                    </span>
                  )}
                  <p className="font-display text-sm font-bold tracking-wide text-brand-ink uppercase">
                    {tier.name}
                  </p>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold text-ink">
                      {tier.price}
                    </span>
                    <span className="text-ink-2">{tier.cadence}</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[0.95rem] text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong">
                          <Check className="size-3" aria-hidden />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={tier.featured ? 'primary' : 'outline'}
                    className="mt-8 w-full"
                  >
                    <Link href="/book">Get started</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-2">
            Prices carried over from the original doneforuleads.com and may be updated — book a call
            to confirm what fits your market.
          </p>
        </div>
      </Section>

      {/* Digital postcards */}
      <Section>
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Digital postcards</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Get noticed in your area — {digitalPostcards.reach}
              </h2>
              <p className="mt-6 leading-relaxed text-ink-2">{digitalPostcards.blurb}</p>
              <div className="mt-8 inline-flex items-baseline gap-2 rounded-2xl bg-brand-tint px-6 py-4">
                <span className="font-display text-4xl font-extrabold text-brand-strong">
                  {digitalPostcards.price}
                </span>
                <span className="text-ink-2">flat — {digitalPostcards.reach}</span>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/book">
                    Ask about digital postcards
                    <ArrowUpRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="grid gap-5">
                {digitalPostcards.steps.map((step, i) => {
                  const Icon = postcardIcons[i] ?? Mail;
                  return (
                    <Reveal key={step.title} delay={i * 0.06}>
                      <div className="slab flex items-start gap-5 p-7">
                        <IconChip icon={Icon} />
                        <div>
                          <h3 className="text-xl text-ink">{step.title}</h3>
                          <p className="mt-2 leading-relaxed text-ink-2">{step.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Not sure which fits?"
        body="Tell us your market, your goals and your budget on a free 30-minute call, and we’ll point you at the services that would actually move your numbers."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
