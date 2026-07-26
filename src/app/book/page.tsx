import type { Metadata } from 'next';
import Image from 'next/image';
import { MessageCircle, BadgeCheck, Gift } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { ConsultationHub } from '@/components/booking/consultation-hub';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { IconChip } from '@/components/ui/icon-chip';
import { contact } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Book a strategy call',
  description:
    'Book a free 30-minute strategy call with Jody McNamer. Tell him your market and goals, and see exactly which done-for-you campaigns would fill your pipeline. Pick a time in his live calendar.',
  path: '/book',
});

const expectations = [
  {
    title: 'It is a conversation, not a pitch',
    icon: MessageCircle,
    hue: '#A46BE8',
    body: 'You describe where you are. Jody tells you what he would do. If that is not him, he says so and points you at whoever it is.',
  },
  {
    title: 'It costs nothing',
    icon: BadgeCheck,
    hue: '#3F8FD1',
    body: 'The first call is free, and there is no version of it that ends with a contract in front of you.',
  },
  {
    title: 'You leave with something',
    icon: Gift,
    hue: '#6B7BE8',
    body: 'Even if you never work together — a number, a next step, or one fewer thing to worry about.',
  },
];

export default function BookPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Book a strategy call', path: '/book' },
    ]),
  );

  return (
    <>
      <PageHeader
        eyebrow="Strategy call"
        image="/images/jody/jody-coaching-1200.webp"
        imageAlt="Jody McNamer in conversation"
        imagePos="50% 5%"
        title="Book the call. See if it fits your market."
        lede="Every option below opens Jody’s live calendar. No forms, no waiting to hear back — you choose the slot and it is booked."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Book', path: '/book' },
        ]}
      />

      <Section className="grain" shapes>
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ConsultationHub />
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative mb-10">
                <Image
                  src="/images/jody/jody-standing-1200.webp"
                  alt="Jody McNamer"
                  width={1200}
                  height={1841}
                  sizes="(max-width: 1024px) 100vw, 24rem"
                  className="rounded-3xl border border-white/10 object-cover"
                />
              </div>

              <h2 className="font-display text-xl font-semibold text-white">
                What actually happens on the call
              </h2>
              <dl className="mt-6 space-y-6">
                {expectations.map((item) => (
                  <div key={item.title} className="flex gap-4 border-l border-white/10 pl-5">
                    <IconChip icon={item.icon} hue={item.hue} className="mt-0.5" />
                    <div>
                      <dt className="font-medium text-white">{item.title}</dt>
                      <dd className="mt-1.5 leading-relaxed">{item.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <p className="text-slate mt-8 border-t border-white/10 pt-8 text-sm leading-relaxed">
                Prefer the phone?{' '}
                <a href={contact.phoneHref} className="text-brass hover:text-brass-soft">
                  {contact.phone}
                </a>{' '}
                — {contact.hours}.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
