import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Target, Share2, Mail } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { Button } from '@/components/ui/button';
import { IconChip } from '@/components/ui/icon-chip';
import { socialTiers, socialGoals, digitalPostcards } from '@/content/services';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'How Done For You Leads is priced: custom-quoted done-for-you lead generation, fixed Social Media Management tiers ($59/$97/$247) and flat-rate Digital Postcards.',
  path: '/pricing',
});

const models = [
  {
    icon: Target,
    title: 'Done-for-you lead generation',
    price: 'Custom quote',
    body: 'Priced to your market, price band and goals. Built for agents already investing — or ready to invest — at least $2,500/month in advertising. Book a call and we’ll scope it with you.',
  },
  {
    icon: Share2,
    title: 'Social media management',
    price: 'From $59/mo',
    body: 'Fixed monthly tiers so you show up consistently without lifting a finger — posts, infographics, reporting and strategy, handled.',
  },
  {
    icon: Mail,
    title: 'Digital postcards',
    price: `${digitalPostcards.price} flat`,
    body: `Get noticed by ${digitalPostcards.reach} in your specific area with geofenced digital postcards — no printing, no mailing.`,
  },
];

export default function PricingPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
  );

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Straightforward pricing, no lock-in"
        lede="Some of what we do is custom-quoted to your market; some has simple, published pricing. Here is how all of it works — and the first call is always free."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ]}
      />

      {/* How pricing works */}
      <Section>
        <div className="wrap">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {models.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <div className="slab flex h-full flex-col items-center p-8 text-center">
                  <IconChip icon={m.icon} />
                  <h2 className="mt-5 text-xl text-ink">{m.title}</h2>
                  <p className="mt-2 font-display text-lg font-bold text-brand-strong">{m.price}</p>
                  <p className="mt-3 leading-relaxed text-ink-2">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Social media management tiers */}
      <Section tone="bone">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="kicker">Social media management</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Pick a plan and show up consistently
              </h2>
            </Reveal>
          </div>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {socialGoals.map((g) => (
              <li
                key={g}
                className="rounded-full border border-hair bg-paper px-3.5 py-1.5 text-sm text-ink-2"
              >
                {g}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
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
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-strong px-3 py-1 font-display text-[0.6875rem] font-bold tracking-wide text-white uppercase">
                      Most popular
                    </span>
                  )}
                  <p className="text-center font-display text-sm font-bold tracking-wide text-brand-ink uppercase">
                    {tier.name}
                  </p>
                  <p className="mt-3 flex items-baseline justify-center gap-1">
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
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink-2">
            Prices carried over from the original doneforuleads.com and may be updated — book a call
            to confirm what fits your market.
          </p>
        </div>
      </Section>

      {/* Digital postcards */}
      <Section>
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="kicker">Digital postcards</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                {digitalPostcards.price} flat — {digitalPostcards.reach}
              </h2>
              <p className="mt-6 leading-relaxed text-ink-2">{digitalPostcards.blurb}</p>
            </Reveal>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            {digitalPostcards.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="slab h-full p-7 text-center">
                  <p className="font-display text-sm font-bold text-brand-strong">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Not sure which fits?"
        body="Tell us your market, goals and budget on a free 30-minute call, and we’ll point you at exactly what would move your numbers — or tell you straight if it isn’t a fit."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
