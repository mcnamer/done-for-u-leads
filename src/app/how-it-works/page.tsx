import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { Fingerprint, Crosshair, MessageSquareText, Repeat, BarChart3, LayoutGrid } from 'lucide-react';
import { IconChip } from '@/components/ui/icon-chip';

export const metadata: Metadata = buildMetadata({
  title: 'How it works',
  description:
    'We define your unique selling proposition, target the right micro-audiences, and write individualized messaging that sounds like you — then build, launch and manage the whole thing for you.',
  path: '/how-it-works',
});

const included = [
  {
    name: 'Your USP, defined',
    icon: Fingerprint,
    body: 'We start by finding the one clear reason a client should pick you. Everything else is built on it — because a campaign built on “just another agent” converts like one.',
  },
  {
    name: 'Ad creative + landing pages',
    icon: LayoutGrid,
    body: 'We design the ads and build the search-ready landing pages that carry your positioning and turn attention into a captured lead.',
  },
  {
    name: 'Micro-audience targeting',
    icon: Crosshair,
    body: 'Proprietary targeting puts you in front of the exact buyers and sellers most likely to say yes — not a list shared with every agent in your zip code.',
  },
  {
    name: 'Individualized messaging',
    icon: MessageSquareText,
    body: 'Copy tuned to each audience and written in your voice, so the people who reach out already resonate with what makes you different.',
  },
  {
    name: 'Automated follow-up',
    icon: Repeat,
    body: 'Speed-to-lead texts and email sequences fire the moment a lead comes in and keep nudging for months, so nothing goes cold.',
  },
  {
    name: 'Reporting you can read',
    icon: BarChart3,
    body: 'A plain-English view of what came in, what it cost, and what turned into a conversation. No vanity dashboards.',
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
        title="We build your edge — and run it for you"
        lede="You do not touch a dashboard, write a follow-up text, or babysit an ad account. We find what makes you different, aim it at the right people, and the conversations land on your calendar."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'How it works', path: '/how-it-works' },
        ]}
      />

      <Section>
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The premise</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[0.95] text-ink sm:text-5xl">
                You did not get licensed to run ads
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="space-y-5 text-lg leading-relaxed text-ink-2">
                <p>
                  Most agents lose more deals to an empty calendar than to a bad showing. But the fix
                  — positioning, ad creative, landing pages, targeting, follow-up automation, daily
                  optimization — is a full-time job that has nothing to do with listing and selling.
                </p>
                <p>
                  So we do it for you. The system was built and proven with working agents, starting
                  from the one thing most lead vendors skip:{' '}
                  <span className="mark text-ink">what actually makes you different.</span>
                </p>
                <p className="font-semibold text-ink">
                  You take the appointments. We keep the pipeline full behind you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="bone">
        <div className="wrap">
          <Reveal>
            <Eyebrow>What is included</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              Everything that fills a calendar, handled
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border-2 border-ink bg-ink md:grid-cols-2">
            {included.map((item) => (
              <article key={item.name} className="group bg-paper p-8 transition-colors hover:bg-lime">
                <IconChip icon={item.icon} />
                <h3 className="mt-5 text-xl text-ink">{item.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-2 group-hover:text-ink">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="See if it fits your market."
        body="Thirty minutes. Tell us your area, your price band and your goals, and we’ll show you exactly what a done-for-you program would look like — or tell you straight if it isn’t the right fit."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
