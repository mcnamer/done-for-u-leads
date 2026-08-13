'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Full-bleed hero background slideshow. Crossfades between the provided images,
 * pauses for reduced-motion, and exposes clickable indicator dots.
 */
export function HeroSlider({
  slides,
  interval = 5000,
}: {
  slides: { src: string; alt: string }[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [reduced, slides.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
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

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 lg:right-8 lg:left-auto lg:translate-x-0">
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
      )}
    </div>
  );
}
