import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'About — the operator behind Done For You Leads',
  description:
    'Done For You Leads is run by Jody McNamer — a broker of 23 years who has bought and sold 500+ properties and coached thousands of agents. The story behind the lead engine.',
  path: '/about-us',
});

const chapters = [
  {
    year: '2002',
    title: 'The licence',
    body: 'Jody got his real estate licence in Washington and started doing what he has done ever since — sitting across a kitchen table from someone making the biggest financial decision of their life and telling them the truth about it.',
  },
  {
    year: '2008',
    title: 'The crash',
    body: 'When the market broke, most agents left. Jody stayed and closed more than $50 million in short sales. It is where he learned that the agents who survive are the ones who never let their pipeline run dry — in any market.',
  },
  {
    year: '2014',
    title: 'The coaching years',
    body: 'He founded his own brokerage and spent years coaching thousands of agents and loan officers. The same problem came up in nearly every session: great agents, empty calendars. Lead generation was the leak — and almost nobody had a system for it.',
  },
  {
    year: 'The build',
    title: 'Done For You Leads',
    body: 'So Jody built the system inside his own brokerage — buyer and seller campaigns, follow-up automation, reporting — and ran it against real markets until it consistently produced booked conversations, not just clicks.',
  },
  {
    year: 'Today',
    title: 'Done for you',
    body: 'Now that same machine runs for agents everywhere. You keep listing and selling; the campaigns, the follow-up and the optimization happen on our side. Built by an operator who still does the job it is built for.',
  },
];

export default function AboutPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about-us' },
    ]),
  );

  return (
    <>
      <PageHeader
        eyebrow="About"
        image="/images/jody/jody-about-hero-1600.webp"
        imageAlt="Jody McNamer"
        imagePos="60% 8%"
        title="The operator behind Done For You Leads"
        lede="Jody McNamer is a broker of 23 years who has bought and sold 500+ properties and coached thousands of agents — and built the lead engine that now runs for you."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about-us' },
        ]}
      />

      <Section shapes>
        <div className="shell grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>The short version</Eyebrow>
              <div className="mt-8 space-y-6 text-lg leading-relaxed">
                <p>
                  Jody McNamer has bought and sold more than 500 properties, worked every market this
                  state has thrown at him — including both sides of the 2008 crash — and coached
                  thousands of agents and loan officers across the country.
                </p>
                <p>
                  That coaching is where Done For You Leads came from. Session after session, the
                  same story: talented agents with the skills to close, sitting on an empty calendar
                  because nobody had ever handed them a lead system that actually worked.
                </p>
                <p>
                  So he built one — inside his own brokerage, against real listings and real buyers —
                  and refined it until it reliably produced booked conversations. Not lead-count
                  vanity. Appointments.
                </p>
                <p className="text-white">
                  Done For You Leads is that machine, run for you. You keep doing what you do best.
                  The pipeline is our job.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative">
                <div
                  aria-hidden
                  className="from-brass/20 absolute -inset-2 rounded-[1.75rem] bg-gradient-to-bl to-transparent blur-2xl"
                />
                <Image
                  src="/images/jody/jody-about-1200.webp"
                  alt="Jody McNamer, seated"
                  width={1200}
                  height={1841}
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="relative rounded-3xl border border-white/10 object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="navy" className="grain">
        <div className="shell">
          <Reveal>
            <Eyebrow>The long version</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              How a lead engine came out of a real career
            </h2>
          </Reveal>

          {/* A real chronology, so it earns its dates. */}
          <ol className="mt-16 space-y-px overflow-hidden rounded-2xl">
            {chapters.map((chapter, i) => (
              <li key={chapter.year}>
                <Reveal delay={i * 0.06}>
                  <article className="grid gap-6 border-b border-white/10 py-8 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-2">
                      <span className="text-brass font-mono text-sm tracking-[0.14em]">
                        {chapter.year}
                      </span>
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="font-display text-xl font-semibold text-white">
                        {chapter.title}
                      </h3>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="leading-relaxed">{chapter.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section shapes>
        <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Image
                src="/images/jody/jody-outdoors-1200.webp"
                alt="Jody McNamer outdoors in Washington"
                width={1200}
                height={1500}
                sizes="(max-width: 1024px) 100vw, 26rem"
                className="rounded-3xl border border-white/10 object-cover"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Why it is different</Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl">
                Still in the arena, not just selling from it
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                Most lead vendors have never carried a listing or sat through a deal falling apart at
                9pm on a Friday. Jody still lists, still sells, and still coaches — so the campaigns
                are tuned to what actually books appointments, and updated the moment the market
                shifts.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed">
                When you hire Done For You Leads, you are not renting software. You are borrowing the
                judgment of someone who does your job for a living.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Put the operator to work for you"
        body="Book thirty minutes. Tell Jody your market and your goals, and he’ll show you exactly what a done-for-you pipeline would look like for your business."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
