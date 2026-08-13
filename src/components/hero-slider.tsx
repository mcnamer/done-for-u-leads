'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Full-bleed hero background slideshow. Crossfades between images and — per the
 * WCAG "auto-rotation" guidance — pauses on hover/focus, offers a pause/play
 * control, announces the active slide, and stays static under reduced motion.
 */
export function HeroSlider({
  slides,
  interval = 5000,
}: {
  slides: { src: string; alt: string }[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const running = !reduced && !paused && !hovered && slides.length > 1;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [running, slides.length, interval]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {slides.map((s, idx) => (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden
          fill
          priority={idx === 0}
          sizes="100vw"
          className={cn(
            'object-cover transition-opacity duration-[1200ms] ease-out',
            idx === i ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {/* Screen-reader announcement of the active slide */}
      <div aria-live="polite" className="sr-only">
        Slide {i + 1} of {slides.length}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 lg:right-8 lg:left-auto lg:translate-x-0">
          <div className="flex gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show slide ${idx + 1}`}
                aria-current={idx === i}
                onClick={() => setI(idx)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  idx === i ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80',
                )}
              />
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="grid size-7 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
