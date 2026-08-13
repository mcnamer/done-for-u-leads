'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  TrendingUp,
  Zap,
  MessageSquare,
  PhoneCall,
  CalendarCheck,
  Check,
  X,
} from 'lucide-react';

/* ---------------------------------------------------------------------------
   PipelineWidget — the frosted "done-for-you funnel" card (for dark grounds).
--------------------------------------------------------------------------- */
const stages = [
  { label: 'Leads generated', pct: 100 },
  { label: 'Conversations', pct: 66 },
  { label: 'Appointments', pct: 40 },
  { label: 'Closings', pct: 22 },
];

export function PipelineWidget() {
  const reduced = useReducedMotion();
  return (
    <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-6 shadow-soft-lg backdrop-blur-md sm:p-7">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-display text-[0.7rem] font-bold tracking-wide text-white uppercase">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Your pipeline
        </span>
        <TrendingUp className="size-5 text-white/70" aria-hidden />
      </div>
      <p className="mt-5 font-display text-lg font-bold text-white">The done-for-you funnel</p>
      <div className="mt-4 space-y-3.5">
        {stages.map((s, i) => (
          <div key={s.label}>
            <p className="text-[0.8rem] text-white/80">{s.label}</p>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#6fa1cc] to-[#bfe3ff]"
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
                style={reduced ? { width: `${s.pct}%` } : undefined}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-5">
        <div>
          <p className="font-display text-3xl font-extrabold text-white">6%</p>
          <p className="text-xs text-white/70">avg. lead call-to-close</p>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-brand-strong transition-transform hover:-translate-y-0.5"
        >
          Book a call
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   WidgetCard — shared light shell for the on-page widgets.
--------------------------------------------------------------------------- */
function WidgetCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="slab flex h-full flex-col p-7 text-left">
      <span className="font-display text-[0.7rem] font-bold tracking-[0.14em] text-brand-strong uppercase">
        {eyebrow}
      </span>
      <h3 className="mt-2 text-xl text-ink">{title}</h3>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ChannelReachWidget — animated multi-channel reach bars.
--------------------------------------------------------------------------- */
const channels = [
  { label: 'Facebook', pct: 90 },
  { label: 'Instagram', pct: 78 },
  { label: 'YouTube', pct: 64 },
  { label: 'Pinterest', pct: 52 },
  { label: 'X / Twitter', pct: 40 },
];

export function ChannelReachWidget() {
  const reduced = useReducedMotion();
  return (
    <WidgetCard eyebrow="Multi-channel reach" title="Where we find your buyers">
      <div className="space-y-3">
        {channels.map((c, i) => (
          <div key={c.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm text-ink-2">{c.label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-brand-tint">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-strong"
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: `${c.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                style={reduced ? { width: `${c.pct}%` } : undefined}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-ink-2">
        Highly targeted audiences and lookalikes across every platform your best clients actually
        use.
      </p>
    </WidgetCard>
  );
}

/* ---------------------------------------------------------------------------
   SpeedToLeadWidget — instant follow-up timeline.
--------------------------------------------------------------------------- */
const timeline = [
  { icon: Zap, label: 'Lead comes in', time: '0 min' },
  { icon: MessageSquare, label: 'Speed-to-lead text', time: '~1 min' },
  { icon: PhoneCall, label: 'Follow-up sequence', time: 'Ongoing' },
  { icon: CalendarCheck, label: 'Appointment booked', time: 'Result' },
];

export function SpeedToLeadWidget() {
  return (
    <WidgetCard eyebrow="Automated follow-up" title="Speed-to-lead, on autopilot">
      <ol className="space-y-4">
        {timeline.map((t, i) => (
          <li key={t.label} className="flex items-center gap-3">
            <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong">
              <t.icon className="size-4" aria-hidden />
              {i < timeline.length - 1 && (
                <span aria-hidden className="absolute top-9 h-4 w-px bg-hair" />
              )}
            </span>
            <span className="flex-1 text-sm text-ink">{t.label}</span>
            <span className="font-display text-xs font-semibold text-brand-strong">{t.time}</span>
          </li>
        ))}
      </ol>
    </WidgetCard>
  );
}

/* ---------------------------------------------------------------------------
   UspComparisonWidget — blends in vs stands out.
--------------------------------------------------------------------------- */
const generic = ['Same headshot & badge', 'Shared portal leads', 'Competes on price'];
const you = ['A clear, unique edge', 'Leads exclusive to you', 'Chosen, not compared'];

export function UspComparisonWidget() {
  return (
    <WidgetCard eyebrow="Your USP, defined" title="Blend in, or stand out">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-hair bg-paper-2 p-4">
          <p className="font-display text-xs font-bold text-ink-2 uppercase">Most agents</p>
          <ul className="mt-3 space-y-2">
            {generic.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-ink-2">
                <X className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-brand-strong/30 bg-brand-tint p-4">
          <p className="font-display text-xs font-bold text-brand-ink uppercase">With us</p>
          <ul className="mt-3 space-y-2">
            {you.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-strong" aria-hidden />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WidgetCard>
  );
}
