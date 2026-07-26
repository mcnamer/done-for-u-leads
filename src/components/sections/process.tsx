import { MessagesSquare, ClipboardList, Wrench, Sprout } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { IconChip } from '@/components/ui/icon-chip';

/**
 * These ARE a sequence, so they get numbers. (The businesses do not, and don't.)
 */
const steps = [
  {
    title: 'Strategy call',
    icon: MessagesSquare,
    hue: '#A46BE8',
    body: 'A real conversation about your market, your goals and your numbers. We map exactly which campaigns fit — no pressure, no forty-slide deck.',
  },
  {
    title: 'Built for you',
    icon: ClipboardList,
    hue: '#3F8FD1',
    body: 'We build your buyer and seller campaigns, the ad creative, the landing pages and the follow-up sequences — tuned to your area and your price band.',
  },
  {
    title: 'Launched & managed',
    icon: Wrench,
    hue: '#6B7BE8',
    body: 'We launch, watch the numbers daily, and keep optimizing. Leads route straight to you, warmed by automated follow-up so nothing goes cold.',
  },
  {
    title: 'You take the calls',
    icon: Sprout,
    hue: '#A46BE8',
    body: 'Your calendar fills with real conversations. You do what you do best — list, show and close — while the pipeline keeps refilling behind you.',
  },
];

export function Process() {
  return (
    <Section tone="paper">
      <div className="shell">
        <Reveal>
          <span className="text-ink/60 inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.22em] uppercase">
            <span aria-hidden className="bg-ink/40 inline-block h-px w-6" />
            How it works
          </span>
          <h2 className="text-ink mt-5 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Four steps. We do the first three.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="lift brass-edge border-ink/10 relative flex h-full flex-col rounded-2xl border bg-[#ffffff]/75 p-8 shadow-[0_24px_50px_-34px_rgba(22,48,77,0.45)] backdrop-blur-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <IconChip icon={step.icon} hue={step.hue} />
                    <span className="text-ink/35 font-mono text-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-ink font-display text-xl font-semibold">{step.title}</h3>
                  <p className="text-ink/70 mt-3 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
