'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Lightweight YouTube facade. Renders the poster + a play button and only loads
 * the (privacy-enhanced) iframe on click — no YouTube scripts on first paint.
 */
export function VideoEmbed({
  id,
  title = 'Watch the video',
  className,
}: {
  id: string;
  title?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        'slab relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-dark',
        className,
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget;
              if (!el.dataset.fallback) {
                el.dataset.fallback = '1';
                el.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
          />
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-strong text-white shadow-soft-lg transition-transform duration-200 group-hover:scale-105"
          >
            <Play className="ml-1 size-8 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
