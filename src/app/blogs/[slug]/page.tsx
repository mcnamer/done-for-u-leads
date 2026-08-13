import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { VerifiedBadge } from '@/components/verified-badge';
import { CtaBand } from '@/components/sections/cta-band';
import { Button } from '@/components/ui/button';
import { posts, getPost } from '@/content/posts';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { absoluteUrl } from '@/lib/utils';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blogs/${slug}` });
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/blogs' },
      { name: post.title, path: `/blogs/${post.slug}` },
    ]),
    {
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.image),
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author, url: absoluteUrl('/') },
      publisher: { '@type': 'Person', name: site.person },
      mainEntityOfPage: absoluteUrl(`/blogs/${post.slug}`),
    },
  );

  return (
    <>
      {/* Hero */}
      <header className="border-b border-hair bg-paper pt-12 sm:pt-16">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.14em] text-ink-2 uppercase transition-colors hover:text-lime-600"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              All insights
            </Link>
          </nav>

          <p className="kicker">
            <span aria-hidden className="inline-block h-2 w-2 bg-lime" />
            {post.tag}
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] text-ink">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex items-center gap-2.5">
              <Image
                src="/logo/jm-mark-256.png"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full border border-hair"
              />
              <span className="text-sm">
                <span className="block font-display font-semibold text-ink">{post.author}</span>
                <span className="text-xs text-ink-2">Founder, Done For You Leads</span>
              </span>
            </span>
            {post.approved && <VerifiedBadge />}
            <span className="flex items-center gap-2 text-sm text-ink-2">
              <Calendar aria-hidden className="size-4" />
              <time dateTime={post.date}>{fmt(post.date)}</time>
            </span>
            <span className="flex items-center gap-2 text-sm text-ink-2">
              <Clock aria-hidden className="size-4" />
              {post.readingMinutes} min read
            </span>
          </div>
        </div>

        <div className="wrap mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-hair shadow-soft">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 64rem"
              style={{ objectPosition: post.imagePos ?? 'center' }}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <Section>
        <div className="wrap">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-xl leading-relaxed font-medium text-ink">{post.excerpt}</p>

              <div className="mt-10 space-y-8">
                {post.content.map((block, i) => (
                  <Reveal key={i} delay={i * 0.03}>
                    <div>
                      {block.heading && (
                        <h2 className="mb-4 text-2xl text-ink">{block.heading}</h2>
                      )}
                      <div className="space-y-4 leading-relaxed text-ink-2">
                        {block.body.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Verified footer */}
              <div className="slab mt-14 flex flex-col gap-4 rounded-xl bg-paper p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg font-bold text-ink">Reviewed by {post.author}</p>
                  <p className="mt-1 text-sm text-ink-2">
                    Every article here is checked and approved by Jody before it is published.
                  </p>
                </div>
                <VerifiedBadge />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {post.takeaways && post.takeaways.length > 0 && (
                  <div className="slab rounded-xl bg-paper p-7">
                    <p className="font-display text-[0.6875rem] font-semibold tracking-[0.2em] text-ink-2 uppercase">
                      Key takeaways
                    </p>
                    <ul className="mt-5 space-y-3.5">
                      {post.takeaways.map((t) => (
                        <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink">
                          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-brand-tint-2 p-7">
                  <h3 className="text-lg text-ink">Have a question for Jody?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">
                    The answer is free and so is the call.
                  </p>
                  <Button asChild variant="solid" className="mt-5" size="sm">
                    <Link href="/book">
                      Book a strategy call
                      <ArrowUpRight aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mx-auto mt-20 max-w-6xl border-t border-hair pt-14">
              <h2 className="text-2xl text-ink">Keep reading</h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blogs/${r.slug}`}
                      className="slab slab-hover group relative flex h-full flex-col overflow-hidden rounded-xl"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hair">
                        <Image
                          src={r.image}
                          alt={r.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 20rem"
                          style={{ objectPosition: r.imagePos ?? 'center' }}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-display text-[0.625rem] font-semibold tracking-[0.16em] text-lime-600 uppercase">
                          {r.tag}
                        </p>
                        <h3 className="mt-3 text-lg leading-snug text-ink">{r.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
