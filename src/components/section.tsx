import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Editorial section wrapper. Three tones on the paper/bone/ink scale, thick
 * ink rule between bands. No glow, no grain, no glass — flat and confident.
 */
export function Section({
  id,
  children,
  className,
  tone = 'paper',
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'bone' | 'dark';
  bordered?: boolean;
}) {
  const tones = {
    paper: 'bg-paper text-ink-2',
    bone: 'bg-paper-2 text-ink-2',
    dark: 'bg-dark text-white/70',
  } as const;

  return (
    <section
      id={id}
      className={cn('py-20 lg:py-28', tones[tone], bordered && 'border-b-2 border-ink', className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={cn('kicker', dark && 'text-lime')}>
      <span aria-hidden className="inline-block h-2 w-2 bg-lime" />
      {children}
    </span>
  );
}
