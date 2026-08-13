import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Fingerprint,
  Crosshair,
  MessageSquareText,
  LayoutGrid,
  Repeat,
  BarChart3,
  Plus,
  Star,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { VideoEmbed } from '@/components/video-embed';
import { Button } from '@/components/ui/button';
import { proofPoints } from '@/content/site';
import { faqs } from '@/content/faqs';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Done For You Leads — Real Estate Leads That Actually Convert',
  description:
    'We find what makes you different and put it in front of the exact people looking for it. Proprietary targeting, micro-audiences and individualized messaging — done for you.',
  path: '/',
});

const ticker = [
  'Your unique selling proposition',
  'Micro-audiences',
  'Individualized messaging',
  'Exclusive to you',
  'Done for you',
  'Steady pipeline',
];

const steps = [
  {
    n: '01',
    icon: Fingerprint,
    title: 'Find your edge',
    body: 'Most agents look identical online. We pin down your unique selling proposition — the one clear reason a client should pick you over everyone else in your market.',
  },
  {
    n: '02',
    icon: Crosshair,
    title: 'Reach the right people',
    body: 'Proprietary targeting and micro-audiences put you in front of the exact buyers and sellers most likely to say yes — not a list shared with every other agent in town.',
  },
  {
    n: '03',
    icon: MessageSquareText,
    title: 'Speak to them directly',
    body: 'Individualized messaging that sounds like you. Strangers become conversations, conversations become appointments, appointments become clients.',
  },
];

const deliverables = [
  { icon: Fingerprint, title: 'Your USP, defined', body: 'The positioning every campaign is built on.' },
  { icon: LayoutGrid, title: 'Ad creative + landing pages', body: 'Built, tested and pointed at you.' },
  { icon: Crosshair, title: 'Micro-audience targeting', body: 'The right people, not the whole zip code.' },
  {
    icon: MessageSquareText,
    title: 'Individualized messaging',
    body: 'Copy that resonates, in your voice.',
  },
  { icon: Repeat, title: 'Automated follow-up', body: 'Speed-to-lead texts and sequences that never sleep.' },
  { icon: BarChart3, title: 'Plain-English reporting', body: 'What came in, what it cost, what converted.' },
];

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-brand-strong" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-hair bg-gradient-to-b from-brand-tint via-paper to-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="wrap relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="kicker">Real estate lead generation</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.0] text-ink">
                Be the <span className="mark">obvious</span> agent to call.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
                We find what makes you different, then put it in front of the exact people looking
                for it — with proprietary targeting, micro-audiences and messaging that sounds like
                you. All done for you.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/book">
                    Book a strategy call
                    <ArrowUpRight aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/how-it-works">See how it works</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="flex items-center gap-2">
                  <Stars />
                  <span className="text-sm font-medium text-ink">
                    Built by a 20-year operator
                  </span>
                </span>
                <span className="hidden h-4 w-px bg-hair sm:block" />
                <span className="flex items-center gap-2 text-sm text-ink-2">
                  <ShieldCheck aria-hidden className="size-4 text-brand-strong" />
                  First call’s free — no contracts
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="slab overflow-hidden rounded-[1.5rem] p-0">
                  <Image
                    src="/images/jody/jody-coaching-1200.webp"
                    alt="Jody McNamer, founder of Done For You Leads"
                    width={1200}
                    height={1200}
                    priority
                    sizes="(max-width: 1024px) 100vw, 34rem"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
                {/* Floating stat badge */}
                <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-hair bg-paper px-5 py-4 shadow-soft sm:-left-6">
                  <span className="font-display text-3xl font-extrabold text-brand-strong">20+</span>
                  <span className="text-sm leading-tight text-ink-2">
                    years marketing
                    <br />
                    real estate
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== TICKER ===================== */}
      <div className="overflow-hidden border-b border-hair bg-paper-2 py-4">
        <div className="marquee">
          {[0, 1].map((rep) => (
            <ul key={rep} className="flex shrink-0" aria-hidden={rep === 1}>
              {ticker.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 pr-8 font-display text-sm font-semibold tracking-tight text-ink-2"
                >
                  {t}
                  <Plus className="size-3.5 text-brand" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ===================== VIDEO ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <span className="kicker">Watch</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                See it for yourself.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
                Press play for a quick look at how Done For You Leads finds what makes you different
                and turns it into real conversations with buyers and sellers.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/book">
                    Book a strategy call
                    <ArrowUpRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <VideoEmbed id="-h-lXL3KoE0" title="Done For You Leads" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== POSITIONING ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="kicker">The problem</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Every agent online looks the same.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <p className="text-xl leading-relaxed text-ink-2 sm:text-2xl">
                Same headshot, same “top producer” badge, same stock photo of a sold sign. When you
                blend in, you compete on price and luck.{' '}
                <span className="font-semibold text-ink">
                  We do the opposite: we make you impossible to confuse with anyone else
                </span>{' '}
                — and aim that difference at the people most likely to hire it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="border-b border-hair bg-paper-2">
        <div className="wrap py-20 lg:py-28">
          <Reveal>
            <span className="kicker">How it works</span>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Three moves. We make all three.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="slab slab-hover flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand-strong">
                      <s.icon className="size-6" aria-hidden />
                    </span>
                    <span className="font-display text-4xl font-extrabold text-brand/15">{s.n}</span>
                  </div>
                  <h3 className="mt-6 text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABLES ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <span className="kicker">What you get</span>
              <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                A whole marketing team, without hiring one.
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-4">
              <p className="leading-relaxed text-ink-2">
                Everything that fills a calendar — handled end to end, so you can stay in front of
                clients instead of dashboards.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.06}>
                <div className="slab slab-hover h-full p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand-strong">
                    <d.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl text-ink">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NUMBERS (inversion) ===================== */}
      <section className="border-b border-hair bg-dark text-white/70">
        <div className="wrap py-20 lg:py-28">
          <Reveal>
            <span className="kicker bg-white/10 text-brand-tint-2">Why agents trust it</span>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[1.05] text-white sm:text-5xl">
              Built by someone who has done the reps.
            </h2>
          </Reveal>
          <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((p) => (
              <Reveal key={p.label}>
                <div className="border-t border-white/15 pt-5">
                  <dd className="font-display text-6xl font-extrabold text-white">
                    {p.value}
                    <span className="text-brand">{'suffix' in p ? p.suffix : ''}</span>
                  </dd>
                  <dt className="mt-3 leading-snug text-white/55">{p.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ===================== OPERATOR ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-5">
            <div className="slab overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/jody/jody-standing-1200.webp"
                alt="Jody McNamer"
                width={1200}
                height={1500}
                sizes="(max-width: 1024px) 100vw, 30rem"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <span className="kicker">Who runs it</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Jody McNamer — 20+ years, still in the arena.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
                Founder of the McNamer group of companies and a nationally ranked real-estate
                trainer, Jody has spent two decades teaching agents how to stand out and get found.
                Done For You Leads is that playbook, run for you — by someone who has actually done
                the job it is built for.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Built inside a working brokerage',
                  'Exclusive to you — never shared',
                  'Positioning first, ads second',
                  'Straight talk, no lock-in',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-ink">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-[0.95rem]">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/about-us">
                    Meet the operator
                    <ArrowUpRight aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/how-it-works">How it works</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="bg-paper-2">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="kicker">Questions</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">Before you book.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-hair bg-paper shadow-soft">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group border-b border-hair last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 transition-colors hover:bg-brand-tint/50">
                    <span className="font-display text-lg font-semibold text-ink">{f.question}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong transition-transform duration-300 group-open:rotate-45">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 leading-relaxed text-ink-2">{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(faqSchema)) }}
      />
    </>
  );
}
