'use client';

import type { PointerEvent, CSSProperties } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A 3D, glossy image frame: the card tilts toward the pointer, a specular
 * highlight tracks the cursor, and a glass edge + soft sheen sit on top.
 *
 * `frameless` drops the border/box and feathers the edges with a mask so the
 * subject reads as a cutout that melts into the section (no visible photo box).
 * `objectPosition` anchors the crop — use 'top' / 'center 25%' to keep heads in.
 * Honours reduced-motion.
 */
export function TiltImage({
  src,
  alt,
  sizes,
  priority,
  className,
  fit = 'cover',
  bg,
  glowHex,
  objectPosition = 'center',
  frameless = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fit?: 'cover' | 'contain';
  bg?: string;
  glowHex?: string;
  objectPosition?: string;
  frameless?: boolean;
}) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });
  const gloss = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255,255,255,0.28), rgba(255,255,255,0) 70%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width;
    const dy = (e.clientY - r.top) / r.height;
    ry.set((dx - 0.5) * 12);
    rx.set(-(dy - 0.5) * 12);
    gx.set(dx * 100);
    gy.set(dy * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  const mask =
    'radial-gradient(ellipse 74% 82% at 50% 42%, #000 52%, transparent 100%)';
  const maskStyle: CSSProperties = frameless
    ? { WebkitMaskImage: mask, maskImage: mask }
    : {};

  return (
    <div className="relative [perspective:1200px]" onPointerMove={onMove} onPointerLeave={reset}>
      {glowHex && (
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[2rem] opacity-70 blur-3xl"
          style={{ background: `radial-gradient(58% 58% at 50% 42%, ${glowHex}55, transparent)` }}
        />
      )}
      <motion.div
        style={{
          ...(reduced ? {} : { rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }),
          ...maskStyle,
        }}
        className={cn(
          'group relative overflow-hidden will-change-transform',
          frameless ? '' : 'rounded-3xl border border-white/12',
          className,
        )}
      >
        <div className="absolute inset-0" style={bg ? { background: bg } : undefined} />
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition }}
          className={fit === 'contain' ? 'object-contain' : 'object-cover'}
        />
        {/* Specular glint that follows the pointer */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ backgroundImage: gloss }}
          />
        )}
        {!frameless && (
          <>
            {/* Thin top sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/12 to-transparent"
            />
            {/* Glass edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25)]"
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
