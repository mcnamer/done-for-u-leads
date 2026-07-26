import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { Home, Tag, Repeat, BarChart3 } from 'lucide-react';
import { IconChip } from '@/components/ui/icon-chip';

export const metadata: Metadata = buildMetadata({
  title: 'How it works',
  description:
    'Buyer and seller campaigns built, launched and managed for you. Ad creative, landing pages, automated follow-up and clear reporting — so your calendar fills with conversations instead of cold calls.',
  path: '/how-it-works',
});

const included = [
  {
    name: 'Seller campaigns',
    icon: Tag,
    body: 'Home-value and market-update offers that surface homeowners thinking about selling in your area — before they call the agent on the sign down the street.',
    outcome: 'Listing conversations, not just clicks.',
  },
  {
    name: 'Buyer campaigns',
    icon: Home,
    body: 'Targeted ads and search-ready landing pages that capture buyers by price band and neighborhood, then route them straight to you, already qualified.',
    outcome: 'Buyers who are actually in the market.',
  },
  {
    name: 'Automated follow-up',
    icon: Repeat,
    body: 'Speed-to-lead texts and email sequences that fire the moment a lead comes in and keep nudging for months — so a lead that is not ready today does not go cold.',
    outcome: 'Nothing slips through the cracks.',
  },
  {
    name: 'Reporting you can read',
    icon: BarChart3,
    body: 'A plain-English view of what came in, what it cost, and what turned into a conversation. No vanity dashboards — the numbers that tell you it is working.',
    outcome: 'Know your cost per conversation.',
  },
];

export default function HowItWorksPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'How it works', path: '/how-it-works' },
    ]),
    {
      '@type': 'Service',
      name: 'Done For You Leads',
      serviceType: 'Real estate lead generation',
      provider: { '@type': 'Person', name: 'Jody McNamer' },
      areaServed: { '@type': 'Country', name: 'United States' },
      url: 'https://doneforuleads.com/',
    },
  );

  return (
    <>
      <PageHeader
        eyebrow="How it works"
        image="/images/businesses/done-for-you-leads.webp"
        imageAlt="A live marketing training session for agents"
        imagePos="50% 40%"
        title="Your pipeline, built and run for you"
        lede="You do not touch a dashboard, write a follow-up text, or babysit an ad account. We build it, launch it, manage it — and the conversations land on your calendar."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'How it works', path: '/how-it-works' },
        ]}
      />

      <Section shapes>
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Image
                src="/images/jody/jody-coaching-1200.webp"
                alt="Jody McNamer"
                width={1200}
                height={1841}
                sizes="(max-width: 1024px) 100vw, 26rem"
                className="rounded-3xl border border-white/10 object-cover"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>The premise</Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl">
                You did not get licensed to run ads
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed">
                <p>
                  Most agents lose more deals to an empty calendar than to a bad showing. But the fix
                  — ad creative, landing pages, follow-up automation, daily optimization — is a
                  full-time job that has nothing to do with listing and selling.
                </p>
                <p>
                  So we do it for you. The same campaigns were built and proven inside a working
                  brokerage — not theorized by a marketing agency that has never sat at a closing
                  table.
                </p>
                <p className="text-white">
                  You take the appointments. We keep the pipeline full behind you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="navy" className="grain">
        <div className="shell">
          <Reveal>
            <Eyebrow>What is included</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Everything that fills a calendar, handled
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {included.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.06} className="h-full">
                <article className="border-wave-violet/60 flex h-full flex-col rounded-2xl border border-l-[3px] border-white/10 bg-white/[0.02] p-8">
                  <IconChip icon={item.icon} hue="#A46BE8" className="mb-6" />
                  <h3 className="font-display text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-4 flex-1 leading-relaxed">{item.body}</p>
                  <p className="text-brass mt-6 border-t border-white/10 pt-5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                    {item.outcome}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="See if it fits your market"
        body="Thirty minutes. Tell me your area, your price band and your goals, and I’ll show you exactly which campaigns would fill your pipeline — or tell you straight if it is not the right fit."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
