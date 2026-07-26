'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A scroll-snap carousel: native momentum/drag on touch, arrows and dots on
 * pointer, gentle autoplay that pauses on hover/focus. Built on real scrolling
 * so it stays accessible and needs no width math. Item sizing is responsive —
 * one card on phones, easing to ~three on wide screens.
 */
export function Carousel<T>({
  items,
  renderItem,
  ariaLabel,
  autoplayMs = 4500,
  className,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  autoplayMs?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + items.length) % items.length;
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
  }, [items.length]);

  // Track which card is nearest the left edge, for dots + arrow state.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - track.scrollLeft);
      if (d < min) {
        min = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  // Autoplay — advances one card, pauses on interaction, respects reduced-motion.
  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        scrollToIndex(next);
        return next;
      });
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [paused, items.length, autoplayMs, scrollToIndex]);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="relative">
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {items.map((item, i) => (
            <li
              key={i}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[30.5%]"
              aria-label={`${i + 1} of ${items.length}`}
              aria-roledescription="slide"
            >
              {renderItem(item, i)}
            </li>
          ))}
        </ul>

        {/* Side navigation — flanks the cards on the left and right. */}
        <button
          type="button"
          onClick={() => scrollToIndex(active - 1)}
          aria-label="Previous"
          className="hover:bg-brass hover:text-onaccent absolute top-[32%] left-0 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#ffffff] text-[#16304d] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-colors sm:-left-3"
        >
          <ArrowLeft className="size-[1.15rem]" />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(active + 1)}
          aria-label="Next"
          className="hover:bg-brass hover:text-onaccent absolute top-[32%] right-0 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#ffffff] text-[#16304d] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-colors sm:-right-3"
        >
          <ArrowRight className="size-[1.15rem]" />
        </button>
      </div>

      {/* Dots */}
      <div
        className="mt-8 flex items-center justify-center gap-2.5"
        role="tablist"
        aria-label="Slides"
      >
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              active === i ? 'bg-brass w-8' : 'w-2.5 bg-current/25 hover:bg-current/50',
            )}
          />
        ))}
      </div>
    </div>
  );
}
