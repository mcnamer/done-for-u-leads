import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * "Approved by Jody McNamer" — a trust marker shown on articles Jody has
 * personally reviewed. Small/inline variants so it can sit in a card or a byline.
 */
export function VerifiedBadge({
  className,
  size = 'md',
}: {
  className?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={cn(
        'border-brass/40 bg-brass/10 text-brass inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2.5 py-1 text-[0.6875rem]' : 'px-3.5 py-1.5 text-sm',
        className,
      )}
    >
      <BadgeCheck aria-hidden className={size === 'sm' ? 'size-3.5' : 'size-4'} />
      Approved by Jody McNamer
    </span>
  );
}
