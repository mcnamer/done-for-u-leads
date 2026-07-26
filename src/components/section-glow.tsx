import { cn } from '@/lib/utils';

/**
 * Ambient wavelength light-orbs — the hero's atmosphere, made reusable so any
 * dark section can share the same depth. Purely decorative and static (no JS),
 * so it costs nothing at runtime and is hidden from assistive tech.
 */
export function SectionGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="bg-wave-azure/10 absolute -top-24 left-[8%] h-72 w-72 rounded-full blur-[120px]" />
      <div className="bg-wave-violet/10 absolute top-1/3 right-[6%] h-64 w-64 rounded-full blur-[120px]" />
      <div className="bg-brass/[0.08] absolute -bottom-24 left-[38%] h-80 w-80 rounded-full blur-[140px]" />
    </div>
  );
}
