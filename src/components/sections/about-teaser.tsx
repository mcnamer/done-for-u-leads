import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { TiltImage } from '@/components/ui/tilt-image';
const chips = [
  '23+ years in real estate',
  '500+ properties closed',
  'Thousands of agents coached',
  'Still lists and sells',
];

export function AboutTeaser() {
  return (
    <Section id="about">
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <TiltImage
            src="/images/jody/jody-about-1200.webp"
            alt="Jody McNamer"
            sizes="(max-width: 1024px) 100vw, 26rem"
            glowHex="#A46BE8"
            objectPosition="center 12%"
            className="aspect-[4/5] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>The operator behind it</Eyebrow>
            <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Built by someone who still sells
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Done For You Leads is run by Jody McNamer — a broker of 23 years who has bought and
              sold 500+ properties and coached thousands of agents. These campaigns were built and
              proven inside his own brokerage, not dreamed up by a marketing agency. When you hire
              the pipeline, you hire the judgment behind it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <li
                  key={c}
                  className="text-slate rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 text-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/about-us">
                  Meet the operator
                  <ArrowUpRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/book">Book a strategy call</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
