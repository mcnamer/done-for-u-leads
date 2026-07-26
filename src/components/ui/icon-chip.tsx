import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Editorial icon chip: a lime square with a thick ink border and black icon.
 * The `hue` prop is accepted for call-site compatibility but the editorial
 * system keeps one consistent lime/ink treatment.
 */
export function IconChip({
  icon: Icon,
  hue: _hue,
  className,
}: {
  icon: LucideIcon;
  hue?: string;
  className?: string;
}) {
  void _hue;
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-lg border-2 border-ink bg-lime text-ink',
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={2} />
    </span>
  );
}
