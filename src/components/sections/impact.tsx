import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import { CountUp } from '@/components/count-up';
import { ProgressBar } from '@/components/ui/progress-bar';
import { impact } from '@/content/home';

const hues = ['#A46BE8', '#3F8FD1', '#6B7BE8', '#A46BE8'];

export function Impact() {
  return (
    <Section id="impact">
      <div className="shell">
        <Reveal>
          <Eyebrow>The operator&rsquo;s track record</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Run by someone who has done the reps
          </h2>
        </Reveal>

        <dl className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="h-full">
              <div className="glass lift relative flex h-full flex-col rounded-2xl p-7">
                <dd className="font-display text-4xl font-bold text-white sm:text-5xl">
                  <CountUp value={stat.value} />
                  {stat.suffix ? <span className="text-brass">{stat.suffix}</span> : null}
                </dd>
                <dt className="text-slate mt-3 mb-6 flex-1 leading-snug">{stat.label}</dt>
                <ProgressBar value={stat.fill} hex={hues[i % hues.length]!} />
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
