'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { businesses } from '@/content/businesses';

const WORD = 'MCNAMER'.split('');

/**
 * An aesthetic intro: a brass progress ring draws around the JM mark, the five
 * wavelengths refract outward, the wordmark rises letter by letter, then the
 * whole overlay lifts away. Rendered on first paint; skipped for reduced-motion.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="night bg-midnight fixed inset-0 z-[300] grid place-items-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Ambient glow */}
          <motion.div
            aria-hidden
            className="bg-brass/12 absolute size-[26rem] rounded-full blur-[120px]"
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.4 } }}
          >
            {/* Ring + mark */}
            <div className="relative grid size-28 place-items-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#pl-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 45}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c4a0f0" />
                    <stop offset="100%" stopColor="#A46BE8" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src="/logo/jm-mark-256.png" alt="McNamer" width={60} height={60} priority />
              </motion.div>
            </div>

            {/* Refracting wavelengths */}
            <div className="mt-9 flex items-center gap-1.5">
              {businesses.map((b, i) => (
                <motion.span
                  key={b.slug}
                  className="block h-[3px] rounded-full"
                  style={{ background: b.hex }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 26, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>

            {/* Wordmark, letter by letter */}
            <div className="mt-5 flex overflow-hidden">
              {WORD.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display text-sm font-semibold tracking-[0.35em] text-white"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
