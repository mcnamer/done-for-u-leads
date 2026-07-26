import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A small tinted media chip that carries a section's subject as an icon. The
 * hue is a 6-digit hex (usually a wavelength colour); we append alpha suffixes
 * so a single value drives the fill, the icon and the hairline ring.
 */
export function IconChip({
  icon: Icon,
  hue,
  className,
}: {
  icon: LucideIcon;
  hue: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn('grid size-11 shrink-0 place-items-center rounded-xl', className)}
      style={{ backgroundColor: `${hue}1f`, color: hue, boxShadow: `inset 0 0 0 1px ${hue}33` }}
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  );
}
