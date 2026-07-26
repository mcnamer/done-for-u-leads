import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionGlow } from '@/components/section-glow';
import { Button } from '@/components/ui/button';
import { contact } from '@/content/site';
import { businesses } from '@/content/businesses';

/**
 * The pre-footer: a full-bleed image band. Jody sits in the frame on the right,
 * scrimmed into midnight; the invitation and actions read over the dark left.
 */
export function CtaBand({
  title = 'Let’s fill your calendar',
  body = 'Book a thirty-minute strategy call. Tell me your market and your goals, and I’ll show you exactly which campaigns would fill your pipeline — no charge, no pitch.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="night bg-navy relative isolate flex min-h-[32rem] items-center overflow-hidden lg:min-h-[34rem]">
      {/* Wavelength strip */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-20 flex h-1">
        {businesses.map((b) => (
          <span key={b.slug} className="flex-1" style={{ background: b.hex }} />
        ))}
      </div>

      {/* Full-bleed background — navy toned so the band reads distinct from the
          midnight footer below it. */}
      <Image
        src="/images/jody/jody-standing-1200.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[72%_top]"
      />
      <div aria-hidden className="bg-navy/45 absolute inset-0 mix-blend-multiply" />
      <div
        aria-hidden
        className="from-navy via-navy/90 to-navy/25 absolute inset-0 bg-gradient-to-r"
      />
      <div
        aria-hidden
        className="from-navy via-navy/40 to-transparent absolute inset-0 bg-gradient-to-t"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(110% 90% at 20% 40%, transparent 45%, rgba(22,48,77,0.55) 100%)',
        }}
      />
      <SectionGlow />

      <div className="shell relative z-10 w-full py-20 lg:py-24">
        <Reveal>
          <div className="max-w-xl">
            <p className="eyebrow">
              <span aria-hidden className="bg-brass inline-block h-px w-6" />
              When you are ready
            </p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-paper/85 mt-5 text-lg leading-relaxed">{body}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/book">
                  Book a strategy call
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={contact.phoneHref}>
                  <Phone aria-hidden />
                  {contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
