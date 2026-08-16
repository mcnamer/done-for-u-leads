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
import {
  PipelineWidget,
  ChannelReachWidget,
  SpeedToLeadWidget,
  UspComparisonWidget,
} from '@/components/widgets';
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

const heroStats = [
  { value: '6%', label: 'avg. call-to-close' },
  { value: '20+', label: 'years in real estate' },
  { value: '1:1', label: 'messaging per agent' },
  { value: '100%', label: 'done for you' },
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

const programIncludes = [
  'Your USP, defined',
  'Ad creative + landing pages',
  'Micro-audience targeting',
  'Individualized messaging',
  'Automated follow-up',
  'Plain-English reporting',
  'Coaching from creation to close',
  'Lead tracking & nurturing',
  'Integrated social media',
  'CRM consulting',
];

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  intro,
  dark,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <span className={dark ? 'kicker bg-white/10 text-brand-tint-2' : 'kicker'}>{eyebrow}</span>
        <h2
          className={`mt-5 text-4xl leading-[1.05] sm:text-5xl ${dark ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-2'}`}>
            {intro}
          </p>
        )}
      </Reveal>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO (centered) ===================== */}
      <section className="relative isolate overflow-hidden border-b border-hair">
        <Image
          src="/images/slider/slide-leadgen.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#0b1626]/85 via-[#0f1c2b]/72 to-[#0b1626]/92"
        />

        <div className="wrap relative py-24 text-center lg:py-32">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="kicker bg-white text-brand-strong shadow-soft-sm">
                Real estate lead generation
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.0] text-white">
                Be the <span className="text-lime-bright">obvious</span> agent to call.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
                We find what makes you different, then put it in front of the exact people looking
                for it — with proprietary targeting, micro-audiences and messaging that sounds like
                you. All done for you.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/book">
                    Book a strategy call
                    <ArrowUpRight aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:border-white hover:bg-white/10"
                >
                  <Link href="/how-it-works">See how it works</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <span className="flex items-center gap-2">
                  <Stars />
                  <span className="text-sm font-medium text-white">Built by a 20-year operator</span>
                </span>
                <span className="hidden h-4 w-px bg-white/25 sm:block" />
                <span className="flex items-center gap-2 text-sm text-white/80">
                  <ShieldCheck aria-hidden className="size-4 text-lime-bright" />
                  First call’s free — no contracts
                </span>
              </div>
            </Reveal>

            {/* Centered glass stat strip */}
            <Reveal delay={0.25}>
              <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {heroStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-md"
                  >
                    <dd className="font-display text-3xl font-extrabold text-white">{s.value}</dd>
                    <dt className="mt-1 text-xs text-white/70">{s.label}</dt>
                  </div>
                ))}
              </dl>
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

      {/* ===================== POSITIONING (centered) ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap py-20 text-center lg:py-28">
          <Reveal>
            <span className="kicker">The problem</span>
            <p className="mx-auto mt-6 max-w-4xl text-3xl leading-[1.2] text-ink sm:text-4xl">
              Every agent online looks the same. Same headshot, same badge, same stock photo.{' '}
              <span className="text-ink-2">
                When you blend in, you compete on price and luck — so we make you impossible to
                confuse with anyone else, and aim that difference at the people most likely to hire
                it.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== VIDEO (centered) ===================== */}
      <section className="border-b border-hair bg-paper-2">
        <div className="wrap py-20 lg:py-28">
          <SectionHead
            eyebrow="Watch"
            title="See it for yourself."
            intro="A quick look at how Done For You Leads finds what makes you different and turns it into real conversations with buyers and sellers."
          />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-4xl">
              <VideoEmbed id="-h-lXL3KoE0" title="Done For You Leads" />
            </div>
          </Reveal>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/book">
                Book a strategy call
                <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS (centered) ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap py-20 lg:py-28">
          <SectionHead eyebrow="How it works" title="Three moves. We make all three." />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="slab slab-hover flex h-full flex-col items-center p-8 text-center">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-tint text-brand-strong">
                    <s.icon className="size-6" aria-hidden />
                  </span>
                  <span className="mt-5 font-display text-sm font-bold tracking-wide text-brand/40">
                    {s.n}
                  </span>
                  <h3 className="mt-2 text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABLES (centered) ===================== */}
      <section className="border-b border-hair bg-paper-2">
        <div className="wrap py-20 lg:py-28">
          <SectionHead
            eyebrow="What you get"
            title="A whole marketing team, without hiring one."
            intro="Everything that fills a calendar — handled end to end, so you can stay in front of clients instead of dashboards."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.06}>
                <div className="slab slab-hover flex h-full flex-col items-center p-8 text-center">
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

      {/* ===================== WIDGETS (moving parts) ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap py-20 lg:py-28">
          <SectionHead
            eyebrow="Under the hood"
            title="The moving parts, working together."
            intro="Positioning, multi-channel reach and instant follow-up — the pieces that quietly turn strangers into booked appointments."
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
            <Reveal>
              <UspComparisonWidget />
            </Reveal>
            <Reveal delay={0.08}>
              <ChannelReachWidget />
            </Reveal>
            <Reveal delay={0.16}>
              <SpeedToLeadWidget />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== NUMBERS + PIPELINE (inversion) ===================== */}
      <section className="border-b border-hair bg-dark">
        <div className="wrap py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="kicker bg-white/10 text-brand-tint-2">Why agents trust it</span>
                <h2 className="mt-5 text-4xl leading-[1.05] text-white sm:text-5xl">
                  Built by someone who has done the reps.
                </h2>
              </Reveal>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
                {proofPoints.map((p) => (
                  <Reveal key={p.label}>
                    <div>
                      <dd className="font-display text-5xl font-extrabold text-white">
                        {p.value}
                        <span className="text-brand">{'suffix' in p ? p.suffix : ''}</span>
                      </dd>
                      <dt className="mt-2 leading-snug text-white/55">{p.label}</dt>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
            <Reveal delay={0.1}>
              <PipelineWidget />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== THE PROGRAM (centered stack) ===================== */}
      <section className="border-b border-hair bg-paper">
        <div className="wrap py-20 lg:py-28">
          <SectionHead
            eyebrow="The program"
            title="Everything the Done For You Leads program covers."
            intro="An end-to-end, done-for-you system built on your unique selling proposition — not a one-size-fits-all lead vendor. Direct-response advertising across every social channel, integrated brand marketing, and messaging tuned to each audience. Customized, optimized, and exclusive to you."
          />

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-2xl rounded-[1.5rem] bg-brand-tint p-6 sm:p-10">
              <Image
                src="/images/hero-vector.webp"
                alt="Two people searching for the right home online"
                width={1520}
                height={850}
                sizes="(max-width: 768px) 100vw, 40rem"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mx-auto mt-12 grid max-w-3xl gap-x-8 gap-y-3 text-left sm:grid-cols-2">
              {programIncludes.map((point) => (
                <li key={point} className="flex items-center gap-3 text-ink">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-[0.95rem]">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-hair bg-paper-2 p-4 text-center">
            <Image
              src="/logo/jm-mark-256.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full"
            />
            <p className="text-left text-sm leading-snug text-ink-2">
              Built and run by <span className="font-semibold text-ink">Jody McNamer</span> — 20+
              years.{' '}
              <Link href="/about-us" className="font-semibold text-brand-strong hover:underline">
                Meet the operator →
              </Link>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/services">
                See all services
                <ArrowUpRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== FAQ (centered) ===================== */}
      <section className="bg-paper-2">
        <div className="wrap py-20 lg:py-28">
          <SectionHead eyebrow="Questions" title="Before you book." />
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-hair bg-paper shadow-soft">
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
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/faq">See all FAQs</Link>
            </Button>
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
