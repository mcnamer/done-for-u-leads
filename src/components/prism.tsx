'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { businesses } from '@/content/businesses';

/**
 * The signature element.
 *
 * The JM mark is a prism, so the site's organising metaphor is refraction: one
 * source of light — Jody — entering a prism and leaving as five wavelengths,
 * one per business. The beam draws itself on load, strikes the prism, and the
 * five rays fan out in sequence. The same five hues then act as the structural
 * rule down the left edge of each business on the page, so the device carries
 * information rather than decorating the hero.
 */
export function PrismRefraction({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  // Rays fan out from the prism's exit face, spreading by wavelength.
  const rays = businesses.map((b, i) => ({
    hex: b.hex,
    name: b.name,
    y: 148 + (i - 2) * 26,
  }));

  return (
    <svg
      viewBox="0 0 520 300"
      className={className}
      fill="none"
      role="img"
      aria-label="A beam of light entering a prism and refracting into five colours, one for each McNamer business"
    >
      <defs>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* Incoming beam */}
      <motion.line
        x1="0"
        y1="148"
        x2="196"
        y2="148"
        stroke="url(#beam)"
        strokeWidth="1.5"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* The prism */}
      <motion.path
        d="M232 96 L268 148 L232 200 Z"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
        fill="rgba(255,255,255,0.03)"
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: '250px 148px' }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />

      {/* Refracted wavelengths */}
      {rays.map((ray, i) => (
        <g key={ray.hex}>
          <motion.line
            x1="268"
            y1="148"
            x2="512"
            y2={ray.y}
            stroke={ray.hex}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 0.9, delay: 1.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.line
            x1="268"
            y1="148"
            x2="512"
            y2={ray.y}
            stroke={ray.hex}
            strokeWidth="4"
            filter="url(#soft)"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 1.4, delay: 1.3 + i * 0.1 }}
          />
        </g>
      ))}

      {/* Entry point */}
      <motion.circle
        cx="232"
        cy="148"
        r="2.5"
        fill="#ffffff"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      />
    </svg>
  );
}

/**
 * The refraction spine — a vertical rail of the same five wavelengths down the
 * left edge. Each wavelength is a live shortcut: hover a line and a labelled
 * tab slides out from the edge, linking straight to that business.
 */
export function PrismSpine() {
  return (
    <nav
      aria-label="The McNamer ecosystem"
      className="fixed top-1/2 left-0 z-30 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex"
    >
      {businesses.map((b) => (
        <a
          key={b.slug}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the ${b.name} website`}
          className="group relative flex items-center"
        >
          {/* The wavelength tick. */}
          <span
            className="h-8 w-[3px] rounded-r-full opacity-45 transition-all duration-300 group-hover:h-10 group-hover:w-[5px] group-hover:opacity-100"
            style={{ background: b.hex }}
          />
          {/* The tab that slides out from the left edge on hover. */}
          <span
            className="pointer-events-none absolute top-1/2 left-4 flex -translate-x-4 -translate-y-1/2 items-center gap-2 rounded-md bg-[#0b1626]/95 py-2 pr-4 pl-3 text-xs font-semibold whitespace-nowrap text-[#ffffff] opacity-0 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          >
            <span
              aria-hidden
              className="h-3.5 w-[3px] rounded-full"
              style={{ background: b.hex }}
            />
            {b.name}
          </span>
        </a>
      ))}
    </nav>
  );
}
