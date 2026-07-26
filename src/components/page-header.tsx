import Link from 'next/link';
import Image from 'next/image';
import { Eyebrow } from './section';
import { SectionGlow } from '@/components/section-glow';

/**
 * Page hero. Each page passes its own background image, scrimmed into the brand
 * midnight so the header stays legible over it and the copy reads. A `night`
 * zone — always cinematic, in either theme.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumb,
  image,
  imageAlt = '',
  imagePos = 'center',
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  breadcrumb: { name: string; path: string }[];
  image?: string;
  imageAlt?: string;
  imagePos?: string;
}) {
  return (
    <header className="night relative isolate flex min-h-[58vh] items-end overflow-hidden pt-36 pb-14 sm:min-h-[62vh] sm:pt-44 sm:pb-20">
      {/* Background */}
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: imagePos }}
            className="object-cover"
          />
          {/* Keep the lower-left dark for the copy; leave the upper-right clear
              so Jody's face (or the scene) reads fully. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0a1626] via-[#0a1626]/55 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#0a1626]/92 via-[#0a1626]/35 to-transparent"
          />
        </>
      ) : (
        <SectionGlow />
      )}
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="shell relative z-10 w-full">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-slate flex flex-wrap items-center gap-2 font-mono text-xs">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-slate/40">
                    /
                  </span>
                )}
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-white/70">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-brass transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lede && <p className="text-paper/85 mt-6 max-w-2xl text-lg leading-relaxed">{lede}</p>}
      </div>

      <div aria-hidden className="beam-x absolute right-0 bottom-0 left-0 z-10 h-px" />
    </header>
  );
}
