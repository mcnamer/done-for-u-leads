import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Section wrapper. Three grounds on the white / soft-violet / deep-violet
 * scale, joined by hairline rules. Clean and airy — the conversion look.
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
      className={cn('py-20 lg:py-28', tones[tone], bordered && 'border-b border-hair', className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        'kicker',
        dark && 'bg-white/10 text-brand-tint-2',
      )}
    >
      <span
        aria-hidden
        className={cn('inline-block size-1.5 rounded-full', dark ? 'bg-brand-tint-2' : 'bg-brand')}
      />
      {children}
    </span>
  );
}
