'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { bookingTracks, quickCall, type BookingTrack } from '@/content/booking';
import { Button } from '@/components/ui/button';

/**
 * Two moves: pick who you are, pick the conversation, land in Motion with the
 * right link. Editorial slab styling, one lime accent.
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
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div className="slab overflow-hidden rounded-xl bg-paper">
      <div aria-hidden className="h-1.5 bg-brand-strong" />

      <div className="p-7 sm:p-10">
        <AnimatePresence mode="wait">
          {!track ? (
            <motion.div key="tracks" {...fade}>
              <p className="font-display text-[0.6875rem] font-semibold tracking-[0.2em] text-ink-2 uppercase">
                Step one — who are you?
              </p>
              <h2 className="mt-3 text-3xl text-ink sm:text-4xl">What brought you here?</h2>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {bookingTracks.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setTrack(t)}
                      className="group flex w-full items-center gap-4 rounded-xl border border-hair bg-paper p-5 text-left transition-all duration-200 hover:bg-brand-tint sm:p-6"
                    >
                      <span aria-hidden className="h-10 w-[3px] shrink-0 rounded-full bg-brand" />
                      <span className="flex-1">
                        <span className="block font-display text-lg font-semibold text-ink">
                          {t.question}
                        </span>
                        <span className="mt-1 block font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-2 uppercase group-hover:text-ink">
                          {t.name} — {t.consultations.length}{' '}
                          {t.consultations.length === 1 ? 'option' : 'options'}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-hair pt-8">
                <p className="text-sm text-ink-2">Not sure yet? Take the short way round.</p>
                <a
                  href={quickCall.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 font-display font-semibold text-lime-600 transition-colors hover:text-ink"
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
                className="mb-7 inline-flex items-center gap-2 font-display text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-2 uppercase transition-colors hover:text-ink"
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                Go back
              </button>

              <p className="font-display text-[0.6875rem] font-semibold tracking-[0.2em] text-lime-600 uppercase">
                Step two — {track.name}
              </p>
              <h2 className="mt-3 text-3xl text-ink sm:text-4xl">Pick the conversation</h2>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {track.consultations.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl border border-hair border-l-[5px] border-l-brand bg-paper p-5 transition-colors duration-200 hover:bg-brand-tint sm:p-6"
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span className="flex-1">
                          <span className="block font-display text-lg font-semibold text-ink">
                            {c.title}
                          </span>
                          <span className="mt-2 block leading-relaxed text-ink-2 group-hover:text-ink">
                            {c.detail}
                          </span>
                          <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-2 uppercase group-hover:text-ink">
                            <Clock aria-hidden className="size-3.5" />
                            {c.minutes} minutes
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-5 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-hair pt-8 text-sm text-ink-2">
                Choosing a conversation opens Jody&rsquo;s live calendar in Motion. Pick a time that
                suits you — you&rsquo;ll get a confirmation straight away.
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
    <div className="slab rounded-xl bg-paper p-7">
      <p className="kicker">Short on time</p>
      <h3 className="mt-4 text-xl text-ink">{quickCall.title}</h3>
      <p className="mt-3 leading-relaxed text-ink-2">{quickCall.detail}</p>
      <Button asChild variant="outline" className="mt-6">
        <a href={quickCall.url} target="_blank" rel="noopener noreferrer">
          Open the calendar
          <ArrowUpRight aria-hidden />
        </a>
      </Button>
    </div>
  );
}
