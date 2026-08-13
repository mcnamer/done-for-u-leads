'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

/**
 * Hero widget — a frosted "pipeline" card that sits over the background
 * slideshow. Animated done-for-you funnel + the real call-to-close stat and a
 * CTA. Purely illustrative bars; the only hard number is the real 6% stat.
 */
const stages = [
  { label: 'Leads generated', pct: 100 },
  { label: 'Conversations', pct: 66 },
  { label: 'Appointments', pct: 40 },
  { label: 'Closings', pct: 22 },
];

export function HeroWidget() {
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
