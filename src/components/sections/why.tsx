import { Award, Home, HeartHandshake } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { TiltImage } from '@/components/ui/tilt-image';
import { IconChip } from '@/components/ui/icon-chip';

const reasons = [
  {
    title: 'Built by an operator, not a vendor',
    icon: Award,
    hue: '#A46BE8',
    body: 'These campaigns were built and tested inside a working brokerage — by someone who still lists and sells. You get what actually converts, not a template a marketer guessed at.',
  },
  {
    title: 'Done for you, start to finish',
    icon: Home,
    hue: '#3F8FD1',
    body: 'Ad creative, landing pages, follow-up sequences, reporting — handled. You do not touch a dashboard or write a single follow-up text. You take the appointments.',
  },
  {
    title: 'Conversations, not just clicks',
    icon: HeartHandshake,
    hue: '#6B7BE8',
    body: 'The goal is not lead-count vanity. It is booked conversations with people who are actually in the market — kept warm by automated follow-up so nothing goes cold.',
  },
];

export function Why() {
  return (
    <Section shapes>
      <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <TiltImage
              src="/images/jody/jody-coaching-1200.webp"
              alt="Jody McNamer seated, in conversation"
              sizes="(max-width: 1024px) 100vw, 28rem"
              glowHex="#A46BE8"
              objectPosition="center 15%"
              className="aspect-[4/5] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>Why agents choose it</Eyebrow>
            <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              A pipeline built by someone who sells
            </h2>
          </Reveal>

          <dl className="mt-12 space-y-10">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.08}>
                <div className="hover:border-brass/50 flex gap-5 border-l-2 border-white/10 pl-6 transition-colors duration-500">
                  <IconChip icon={reason.icon} hue={reason.hue} className="mt-1" />
                  <div>
                    <dt className="font-display text-xl font-semibold text-white">{reason.title}</dt>
                    <dd className="mt-3 max-w-xl leading-relaxed">{reason.body}</dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
