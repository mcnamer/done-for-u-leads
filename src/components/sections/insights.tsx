import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play, Youtube } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { media } from '@/content/home';

export function Insights() {
  return (
    <Section id="insights" tone="navy" shapes>
      <div className="shell">
        <Reveal>
          <Eyebrow>Insights & media</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Watch, read, and get the thinking behind it
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* YouTube channel — primary media card */}
          <Reveal className="lg:col-span-2">
            <a
              href={media.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="glass lift brass-edge group relative grid h-full overflow-hidden rounded-2xl sm:grid-cols-2"
            >
              <div className="relative flex flex-col justify-between p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-[#A46BE8]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                />
                <div className="relative">
                  <span className="text-brass inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
                    <Youtube aria-hidden className="size-4" />
                    YouTube
                  </span>
                  <h3 className="font-display mt-4 max-w-md text-2xl font-semibold text-white">
                    Market takes, coaching and conversations
                  </h3>
                  <p className="text-slate mt-3 max-w-md leading-relaxed">
                    Real estate strategy, agent coaching and the occasional straight talk about the
                    market — on Jody&rsquo;s channel.
                  </p>
                </div>
                <span className="relative mt-8 inline-flex items-center gap-3 font-medium text-white">
                  <span className="bg-brass text-onaccent grid size-11 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105">
                    <Play aria-hidden className="size-4 translate-x-px" fill="currentColor" />
                  </span>
                  Watch on YouTube
                </span>
              </div>

              {/* Media rail — Jody on camera, keyed to the channel. */}
              <div className="night relative hidden min-h-[15rem] overflow-hidden sm:block">
                <Image
                  src="/images/jody/jody-media-1200.webp"
                  alt="Jody McNamer on camera"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-[#0b1626]/85 via-transparent to-transparent"
                />
              </div>
            </a>
          </Reveal>

          {/* Video series + Articles */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.06} className="h-full">
              <a
                href={media.series.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass lift group relative flex h-full flex-col rounded-2xl p-7"
                style={{ borderTop: '3px solid #A46BE8' }}
              >
                <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-white">
                  {media.series.title}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                </h3>
                <p className="text-slate mt-3 leading-relaxed">{media.series.body}</p>
              </a>
            </Reveal>

            <Reveal delay={0.12} className="h-full">
              <Link
                href="/blogs"
                className="glass lift group relative flex h-full flex-col rounded-2xl p-7"
              >
                <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-white">
                  Articles
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                </h3>
                <p className="text-slate mt-3 leading-relaxed">
                  Written guidance on buying, selling, financing and building a practice.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
