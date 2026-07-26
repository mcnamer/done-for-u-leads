'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * A thin meter that fills to `value` (0–1) the first time it enters view.
 * Decorative — it visualises emphasis, not a measured percentage.
 */
export function ProgressBar({ value, hex }: { value: number; hex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const pct = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div ref={ref} className="h-1 w-full overflow-hidden rounded-full bg-current/10">
      <motion.div
        className="h-full rounded-full"
        style={{ background: hex }}
        initial={reduced ? { width: `${pct}%` } : { width: 0 }}
        animate={inView ? { width: `${pct}%` } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
