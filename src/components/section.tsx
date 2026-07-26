import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SectionGlow } from '@/components/section-glow';
import { SectionShapes } from '@/components/section-shapes';

export function Section({
  id,
  children,
  className,
  tone = 'dark',
  glow,
  shapes,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'dark' | 'navy' | 'paper';
  /** Ambient wavelength glow behind the section. Defaults on for dark/navy. */
  glow?: boolean;
  /** Sharp navy + brass geometry behind the section. Opt-in per section so no
   *  two stacked sections both carry it (they alternate down the page). */
  shapes?: boolean;
}) {
  const tones = {
    dark: 'bg-midnight',
    navy: 'bg-navy',
    paper: 'bg-paper text-ink',
  } as const;

  const isDark = tone !== 'paper';
  const showGlow = glow ?? isDark;
  const showShapes = shapes ?? false;

  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden py-24 sm:py-28 lg:py-32',
        tones[tone],
        className,
      )}
    >
      {showGlow && <SectionGlow />}
      {showShapes && <SectionShapes />}
      {isDark && <div aria-hidden className="grain pointer-events-none absolute inset-0" />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, hex }: { children: ReactNode; hex?: string }) {
  return (
    <span className="eyebrow" style={hex ? { color: hex } : undefined}>
      <span
        aria-hidden
        className="inline-block h-px w-6"
        style={{ background: hex ?? 'currentColor' }}
      />
      {children}
    </span>
  );
}
