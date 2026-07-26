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
} from 'lucide-react';
import { Reveal } from '@/components/reveal';
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

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker">
                <span className="inline-block h-2 w-2 bg-lime" />
                Real estate lead generation
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[clamp(2.75rem,8vw,6rem)] leading-[0.9] text-ink">
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
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="slab relative overflow-hidden rounded-xl p-0">
                <Image
                  src="/images/jody/jody-coaching-1200.webp"
                  alt="Jody McNamer, founder of Done For You Leads"
                  width={1200}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 34rem"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 flex items-center gap-2 border-t-2 border-r-2 border-ink bg-lime px-4 py-2">
                  <span className="font-display text-sm font-bold text-ink">Built by an operator</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== TICKER ===================== */}
      <div className="overflow-hidden border-b-2 border-ink bg-lime py-3">
        <div className="marquee">
          {[0, 1].map((rep) => (
            <ul key={rep} className="flex shrink-0" aria-hidden={rep === 1}>
              {ticker.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-4 pr-8 font-display text-sm font-bold tracking-tight text-ink uppercase"
                >
                  {t}
                  <Plus className="size-4" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ===================== POSITIONING ===================== */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker">The problem</p>
              <h2 className="mt-5 text-4xl leading-[0.95] text-ink sm:text-5xl">
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
      <section className="border-b-2 border-ink bg-paper-2">
        <div className="wrap py-20 lg:py-28">
          <Reveal>
            <p className="kicker">How it works</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              Three moves. We make all three.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="slab slab-hover flex h-full flex-col rounded-xl p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-lg border-2 border-ink bg-lime">
                      <s.icon className="size-6 text-ink" aria-hidden />
                    </span>
                    <span className="font-display text-4xl font-bold text-ink/15">{s.n}</span>
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
      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="kicker">What you get</p>
              <h2 className="mt-5 max-w-2xl text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
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

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <div key={d.title} className="group bg-paper p-8 transition-colors hover:bg-lime">
                <d.icon className="size-7 text-ink" aria-hidden />
                <h3 className="mt-5 text-xl text-ink">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2 group-hover:text-ink">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NUMBERS (inversion) ===================== */}
      <section className="border-b-2 border-ink bg-dark text-paper">
        <div className="wrap py-20 lg:py-28">
          <Reveal>
            <p className="kicker text-lime">Why agents trust it</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[0.95] text-paper sm:text-5xl">
              Built by someone who has done the reps.
            </h2>
          </Reveal>
          <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((p) => (
              <Reveal key={p.label}>
                <div className="border-t-2 border-lime pt-5">
                  <dd className="font-display text-6xl font-bold text-paper">
                    {p.value}
                    <span className="text-lime">{'suffix' in p ? p.suffix : ''}</span>
                  </dd>
                  <dt className="mt-3 leading-snug text-white/60">{p.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ===================== OPERATOR ===================== */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-5">
            <div className="slab overflow-hidden rounded-xl">
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
              <p className="kicker">Who runs it</p>
              <h2 className="mt-5 text-4xl leading-[0.95] text-ink sm:text-5xl">
                Jody McNamer — 20+ years, still in the arena.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
                Founder of the McNamer group of companies and a nationally ranked real-estate
                trainer, Jody has spent two decades teaching agents how to stand out and get found.
                Done For You Leads is that playbook, run for you — by someone who has actually done
                the job it is built for.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
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
              <p className="kicker">Questions</p>
              <h2 className="mt-5 text-4xl leading-[0.95] text-ink sm:text-5xl">
                Before you book.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-xl border-2 border-ink bg-paper">
              {faqs.map((f, i) => (
                <details
                  key={f.question}
                  className="group border-b-2 border-ink last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                    <span className="font-display text-lg font-semibold text-ink">{f.question}</span>
                    <Plus
                      className="size-5 shrink-0 text-ink transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <div className="px-6 pb-6 leading-relaxed text-ink-2">{f.answer}</div>
                  <span className="sr-only">{i}</span>
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
