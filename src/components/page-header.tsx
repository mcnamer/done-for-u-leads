import Link from 'next/link';
import Image from 'next/image';

/**
 * Interior page header — clean and bright. A soft violet-tinted band with a
 * pill eyebrow, big headline, and an optional soft-shadow image on the right.
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
      <div className="wrap grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-10'}>
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 font-display text-xs text-ink-2">
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
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] text-ink">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{lede}</p>}
        </div>

        {image && (
          <div className="lg:col-span-5">
            <div className="slab overflow-hidden rounded-[1.25rem]">
              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 32rem"
                style={{ objectPosition: imagePos }}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
