'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { bookingTracks, quickCall, type BookingTrack } from '@/content/booking';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Two moves, not a popup: pick the door, pick the conversation, land in Motion
 * with the right link. The chosen wavelength washes the whole panel so you
 * always know which world you are standing in.
 */
export function ConsultationHub() {
  const [track, setTrack] = useState<BookingTrack | null>(null);
  const reduced = useReducedMotion();

  const fade = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-shadow duration-700"
      style={
        track
          ? { boxShadow: `inset 0 1px 0 0 ${track.hex}40, 0 0 80px -50px ${track.hex}` }
          : undefined
      }
    >
      {/* Wavelength bar: all five, until you choose one. */}
      <div aria-hidden className="flex h-1">
        {bookingTracks.map((t) => (
          <span
            key={t.id}
            className="flex-1 transition-opacity duration-500"
            style={{
              background: t.hex,
              opacity: !track || track.id === t.id ? 1 : 0.15,
            }}
          />
        ))}
      </div>

      <div className="p-7 sm:p-10">
        <AnimatePresence mode="wait">
          {!track ? (
            <motion.div key="tracks" {...fade}>
              <p className="text-slate font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
                Step one — which door?
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
                What brought you here?
              </h2>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {bookingTracks.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setTrack(t)}
                      className="group focus-visible:outline-brass flex w-full items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] sm:p-6"
                    >
                      <span
                        aria-hidden
                        className="h-10 w-[3px] shrink-0 rounded-full transition-all duration-300 group-hover:h-12"
                        style={{ background: t.hex }}
                      />
                      <span className="flex-1">
                        <span className="font-display block text-lg font-medium text-white">
                          {t.question}
                        </span>
                        <span className="text-slate mt-1 block font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                          {t.name} — {t.consultations.length}{' '}
                          {t.consultations.length === 1 ? 'option' : 'options'}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="text-slate text-sm">Not sure yet? Take the short way round.</p>
                <a
                  href={quickCall.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass hover:text-brass-soft mt-2 inline-flex items-center gap-2 font-medium transition-colors"
                >
                  {quickCall.title}
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div key={track.id} {...fade}>
              <button
                type="button"
                onClick={() => setTrack(null)}
                className="text-slate hover:text-brass mb-7 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                Change door
              </button>

              <p
                className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase"
                style={{ color: track.hex }}
              >
                Step two — {track.name}
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Pick the conversation
              </h2>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {track.consultations.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.05] sm:p-6',
                      )}
                      style={{ borderLeft: `3px solid ${track.hex}` }}
                    >
                      <span className="flex items-start justify-between gap-5">
                        <span className="flex-1">
                          <span className="font-display block text-lg font-medium text-white">
                            {c.title}
                          </span>
                          <span className="text-slate mt-2 block leading-relaxed">{c.detail}</span>
                          <span className="text-slate/70 mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                            <Clock aria-hidden className="size-3.5" />
                            {c.minutes} minutes
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-5 shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="text-slate mt-8 border-t border-white/10 pt-8 text-sm">
                Choosing a conversation opens Jody&rsquo;s live calendar in Motion. Pick a time that
                suits you — you will get a confirmation straight away.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function QuickCallCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
      <p className="eyebrow">Short on time</p>
      <h3 className="font-display mt-4 text-xl font-semibold text-white">{quickCall.title}</h3>
      <p className="mt-3 leading-relaxed">{quickCall.detail}</p>
      <Button asChild variant="outline" className="mt-6">
        <a href={quickCall.url} target="_blank" rel="noopener noreferrer">
          Open the calendar
          <ArrowUpRight aria-hidden />
        </a>
      </Button>
    </div>
  );
}
