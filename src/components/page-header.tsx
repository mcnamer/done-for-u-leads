import Link from 'next/link';
import Image from 'next/image';

/**
 * Interior page header — editorial and bright. Big headline on paper, an
 * optional framed image on the right with a hard offset shadow.
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
    <header className="border-b-2 border-ink bg-paper">
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
                    <Link href={crumb.path} className="transition-colors hover:text-lime-600">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <span className="kicker">
            <span aria-hidden className="inline-block h-2 w-2 bg-lime" />
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] text-ink">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{lede}</p>}
        </div>

        {image && (
          <div className="lg:col-span-5">
            <div className="slab overflow-hidden rounded-xl">
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
