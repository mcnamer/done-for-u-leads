'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A blend-mode cursor: an outlined ring and a soft dot rendered in
 * mix-blend-difference, so they invert against whatever is behind them and read
 * on any background or theme. The ring lags on a spring and snaps to a rounded
 * square over interactive targets; the dot tracks precisely. Fine pointers only
 * — off on touch, coarse pointers and reduced-motion, where the native cursor
 * stays.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 750, damping: 32, mass: 0.24 });
  const ringY = useSpring(y, { stiffness: 750, damping: 32, mass: 0.24 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHovering(
        Boolean(t?.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]')),
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', leave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', leave);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" style={{ mixBlendMode: 'difference' }}>
      {/* Trailing ring — squares off over interactive targets */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          animate={{
            width: hovering ? 46 : 28,
            height: hovering ? 46 : 28,
            borderRadius: hovering ? 14 : 999,
            scale: down ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="block border-2 border-white"
        />
      </motion.div>

      {/* Precise dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          animate={{ scale: down ? 1.6 : hovering ? 0.4 : 1, opacity: hovering ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
          className="block size-2 rounded-full bg-white"
        />
      </motion.div>
    </div>
  );
}
