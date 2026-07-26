const NAVY = '#16304d';
const BRASS = '#a46be8';

const tri = (variant: 'a' | 'b') =>
  variant === 'a' ? 'polygon(0 0, 100% 0, 100% 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)';

/**
 * Angular navy + brass accents for section backgrounds — sharp geometry that
 * echoes the prism mark. Decorative only; sits behind the content and bleeds
 * off the section's clipped edges. Placement alternates section-to-section (see
 * the `shapes` prop on <Section>), so no two stacked sections both carry it.
 */
export function SectionShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-right cluster */}
      <div
        className="absolute -top-20 -right-16 hidden h-80 w-80 rotate-[14deg] sm:block"
        style={{ background: BRASS, opacity: 0.14, clipPath: tri('a') }}
      />
      <div
        className="absolute top-4 right-48 hidden h-44 w-44 -rotate-6 lg:block"
        style={{ background: NAVY, opacity: 0.1, clipPath: tri('b') }}
      />
      <div
        className="absolute top-24 right-24 hidden h-24 w-24 rotate-45 lg:block"
        style={{ border: `2px solid ${BRASS}`, opacity: 0.35 }}
      />

      {/* Bottom-left cluster */}
      <div
        className="absolute -bottom-20 -left-16 h-96 w-96 rotate-[6deg]"
        style={{ background: NAVY, opacity: 0.09, clipPath: tri('b') }}
      />
      <div
        className="absolute bottom-16 left-28 hidden h-16 w-16 rotate-45 sm:block"
        style={{ background: BRASS, opacity: 0.18 }}
      />
      <div
        className="absolute bottom-10 left-16 hidden h-14 w-14 rotate-45 lg:block"
        style={{ border: `2px solid ${NAVY}`, opacity: 0.22 }}
      />
      {/* Thin diagonal blade sweeping through */}
      <div
        className="absolute -bottom-10 left-1/2 hidden h-[150%] w-1.5 -rotate-[22deg] lg:block"
        style={{ background: BRASS, opacity: 0.1 }}
      />
    </div>
  );
}
