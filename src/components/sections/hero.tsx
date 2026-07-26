'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { site } from '@/content/site';

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="night relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32">
      {/* ===== Full-bleed background: Jody on the balcony, Rainier behind. ===== */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/jody/jody-hero-balcony-1600.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_34%] sm:origin-center sm:scale-[1.4] sm:translate-x-[5%] sm:translate-y-[4%] sm:object-center"
        />
      </div>

      {/* Scrims — keep the left-hand copy legible, warm the whole frame. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0a1626]/92 via-[#0a1626]/55 to-[#0a1626]/10 sm:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0a1626]/85 via-transparent to-[#0a1626]/40"
      />
      <div aria-hidden className="bg-brass/[0.07] absolute inset-0 mix-blend-overlay" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* ===== Copy ===== */}
      <div className="shell relative z-10 w-full">
        <div className="max-w-xl">
          <motion.p {...rise(0)} className="eyebrow">
            <span aria-hidden className="bg-brass inline-block h-px w-6" />
            {site.role.replace(/,/g, ' ·')}
          </motion.p>

          <motion.h1
            {...rise(0.1)}
            className="font-display mt-6 text-[3.25rem] leading-[0.98] font-bold tracking-[-0.03em] text-white sm:text-7xl lg:text-[5rem] [text-shadow:0_2px_34px_rgba(5,11,20,0.65)]"
          >
            Your pipeline,
            <br />
            run for you.
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="text-brass mt-5 text-2xl font-semibold tracking-[-0.01em] sm:text-3xl [text-shadow:0_0_40px_rgba(164,107,232,0.4)]"
          >
            Conversations, not cold calls.
          </motion.p>

          <motion.p
            {...rise(0.3)}
            className="text-paper/90 mt-6 max-w-lg text-lg leading-relaxed sm:text-xl [text-shadow:0_1px_18px_rgba(5,11,20,0.5)]"
          >
            Buyer and seller campaigns built, launched and managed for you — by an operator who
            still lists and sells. You take the appointments; we handle everything that fills the
            calendar.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/book">
                Book a strategy call
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/60"
          >
            <ChevronDown className="size-6" />
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
