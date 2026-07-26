import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { VerifiedBadge } from '@/components/verified-badge';
import { CtaBand } from '@/components/sections/cta-band';
import { Button } from '@/components/ui/button';
import { posts } from '@/content/posts';
import { socials } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Insights',
  description:
    'Notes from Jody McNamer on real estate lead generation, follow-up, conversion, and building an agent business that keeps a full pipeline.',
  path: '/blogs',
});

const youtube = socials.find((s) => s.label === 'YouTube')?.href ?? '#';

export default function BlogsPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/blogs' },
    ]),
  );

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        image="/images/businesses/done-for-you-leads.webp"
        imageAlt="A live marketing training session"
        imagePos="center"
        title="Notes from the field"
        lede="Lead generation, follow-up, conversion and building an agent business that keeps a full pipeline. Written when there is something worth saying."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blogs' },
        ]}
      />

      <Section shapes>
        <div className="shell">
          {posts.length === 0 ? (
            /* A real empty state: it sends you somewhere useful instead of saying
               "coming soon" and stopping. */
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center sm:p-14">
                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  The first article is still being written
                </h2>
                <p className="mt-5 leading-relaxed">
                  In the meantime, Jody publishes on video — market reality, VA loans, what actually
                  works for agents, and <span className="text-white">Autism, Answered</span>, the
                  series he films with his son Tyler.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                      <ArrowUpRight aria-hidden />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/book">Ask Jody directly</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={i * 0.05} className="h-full">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="glass lift group relative flex h-full flex-col overflow-hidden rounded-2xl"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 24rem"
                          style={{ objectPosition: post.imagePos ?? 'center' }}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-white uppercase backdrop-blur-md">
                          {post.tag}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-display group-hover:text-brass text-xl font-semibold text-white transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-slate mt-3 line-clamp-3 flex-1 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                          <p className="text-slate font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </time>{' '}
                            · {post.readingMinutes} min
                          </p>
                          {post.approved && <VerifiedBadge size="sm" />}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
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
