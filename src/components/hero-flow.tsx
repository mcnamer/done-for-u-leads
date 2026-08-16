import Image from 'next/image';

/**
 * Minimal, premium hero backdrop: a white canvas with the supplied grey
 * flowing-lines artwork drifting slowly, plus two soft floating washes for
 * depth. Pure CSS animation (see globals.css) — no client JS — and it freezes
 * under `prefers-reduced-motion`. Used on the homepage hero only.
 */
export function HeroFlow() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-white">
      {/* Drifting line artwork */}
      <div className="hero-lines absolute inset-0">
        <Image
          src="/images/hero-lines.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
      </div>

      {/* Soft floating washes — barely-there colour for depth */}
      <div
        className="hero-blob absolute -top-24 -left-24 size-[38rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(111,161,204,0.18), rgba(111,161,204,0) 70%)',
        }}
      />
      <div
        className="hero-blob-2 absolute -right-32 top-10 size-[42rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(148,107,232,0.12), rgba(148,107,232,0) 70%)',
        }}
      />

      {/* Fade the artwork into the page so the hero blends into what follows */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
