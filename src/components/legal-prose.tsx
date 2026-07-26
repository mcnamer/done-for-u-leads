import type { ReactNode } from 'react';

/** Shared typographic frame for the legal pages. */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div className="[&_a]:text-brass [&_a:hover]:text-brass-soft [&_h2]:font-display max-w-3xl space-y-8 leading-relaxed [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:pl-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      {children}
    </div>
  );
}
