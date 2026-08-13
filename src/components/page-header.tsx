import Link from 'next/link';
import Image from 'next/image';

/**
 * Interior page header — centered. A soft blue-tinted band with a centered
 * eyebrow, headline and lede; an optional image drops in as a wide banner below.
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
    <header className="border-b border-hair bg-gradient-to-b from-brand-tint to-paper">
      <div className="wrap py-14 text-center lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center justify-center gap-2 font-display text-xs text-ink-2">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-ink/30">
                    /
                  </span>
                )}
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="transition-colors hover:text-brand-strong">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <span className="kicker">{eyebrow}</span>
        <h1 className="mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] text-ink">
          {title}
        </h1>
        {lede && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{lede}</p>
        )}

        {image && (
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="slab overflow-hidden rounded-[1.5rem]">
              <Image
                src={image}
                alt={imageAlt}
                width={1600}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 64rem"
                style={{ objectPosition: imagePos }}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
