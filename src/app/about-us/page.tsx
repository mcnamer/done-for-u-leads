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
    'Done For You Leads is run by Jody McNamer — a 20+ year real estate veteran and nationally ranked trainer who has taught thousands of agents how to stand out and get found.',
  path: '/about-us',
});

const chapters = [
  {
    year: '20+ yrs',
    title: 'In the business',
    body: 'Jody has spent more than two decades inside real estate — selling, marketing, and figuring out what actually makes a phone ring, in every kind of market.',
  },
  {
    year: 'National',
    title: 'On the stage',
    body: 'He became a nationally ranked trainer, teaching agents and loan officers how to accelerate the “Know, Like, Trust” factor and stand out instead of blending in.',
  },
  {
    year: 'The gap',
    title: 'The same problem',
    body: 'Session after session, the same story: talented agents who looked identical to everyone else online, competing on price and luck because nobody had helped them define their edge.',
  },
  {
    year: 'The build',
    title: 'Done For You Leads',
    body: 'So Jody built a system that starts with your unique selling proposition, then targets micro-audiences with individualized messaging — and runs the whole thing for you.',
  },
  {
    year: 'Today',
    title: 'Done for you',
    body: 'That machine now runs for agents everywhere. You stay in front of clients; the positioning, targeting, messaging and follow-up happen on our side.',
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
        imagePos="60% 12%"
        title="The operator behind Done For You Leads"
        lede="Jody McNamer — a 20+ year real estate veteran and nationally ranked trainer who has taught thousands of agents how to stand out and get found."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about-us' },
        ]}
      />

      <Section>
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>The short version</Eyebrow>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-2">
                <p>
                  Jody McNamer has spent 20+ years marketing real estate and is the founder of the
                  McNamer group of companies. As a nationally ranked trainer, he has taught thousands
                  of agents one thing above all: stop looking like everyone else.
                </p>
                <p>
                  That’s where Done For You Leads came from. In coaching session after session, the
                  same problem showed up — great agents with no clear reason for a client to pick
                  them, buying the same shared leads as their competition.
                </p>
                <p>
                  So he built a system that starts with{' '}
                  <span className="mark text-ink">what makes you different</span>, then puts that
                  difference in front of the exact people looking for it.
                </p>
                <p className="font-semibold text-ink">
                  Done For You Leads is that system, run for you. You keep doing what you do best.
                  Standing out is our job.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="slab overflow-hidden rounded-xl">
                <Image
                  src="/images/jody/jody-about-1200.webp"
                  alt="Jody McNamer"
                  width={1200}
                  height={1841}
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="bone">
        <div className="wrap">
          <Reveal>
            <Eyebrow>The long version</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              How a lead engine came out of a real career
            </h2>
          </Reveal>

          <ol className="mt-14 border-t border-hair">
            {chapters.map((chapter, i) => (
              <li key={chapter.title}>
                <Reveal delay={i * 0.05}>
                  <article className="grid gap-4 border-b border-hair py-8 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-2">
                      <span className="font-display text-sm font-bold tracking-[0.06em] text-lime-600 uppercase">
                        {chapter.year}
                      </span>
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="text-2xl text-ink">{chapter.title}</h3>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="leading-relaxed text-ink-2">{chapter.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="slab overflow-hidden rounded-xl">
                <Image
                  src="/images/jody/jody-media-1200.webp"
                  alt="Jody McNamer on camera"
                  width={1200}
                  height={1200}
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Why it’s different</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[0.95] text-ink sm:text-5xl">
                Still in the arena, not just selling from it
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
                Most lead vendors have never had to make a phone ring for themselves. Jody has spent
                two decades doing exactly that, and teaching others to do it — so the campaigns are
                built on what actually converts, and tuned the moment the market shifts.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-2">
                When you hire Done For You Leads, you are not renting software. You are borrowing the
                judgment of someone who has stood out in this business for twenty years.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Put the operator to work for you."
        body="Book thirty minutes. Tell Jody your market and your goals, and he’ll show you exactly what a done-for-you program would look like for your business."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
