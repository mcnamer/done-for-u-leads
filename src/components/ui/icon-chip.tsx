import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Icon chip: a soft violet-tinted rounded square with a deep-violet glyph.
 * The optional `hue` tints an individual chip (used where call-sites pass a
 * per-track colour); otherwise it falls back to the brand violet.
 */
export function IconChip({
  icon: Icon,
  hue,
  className,
}: {
  icon: LucideIcon;
  hue?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand-strong',
        className,
      )}
      style={hue ? { backgroundColor: `${hue}1f`, color: hue } : undefined}
    >
      <Icon className="size-5" strokeWidth={2} />
    </span>
  );
}
