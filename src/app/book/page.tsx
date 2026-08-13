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
    hue: '#2C6CA6',
    body: 'You describe where you are. Jody tells you what he would do. If that is not him, he says so and points you at whoever it is.',
  },
  {
    title: 'It costs nothing',
    icon: BadgeCheck,
    hue: '#6FA1CC',
    body: 'The first call is free, and there is no version of it that ends with a contract in front of you.',
  },
  {
    title: 'You leave with something',
    icon: Gift,
    hue: '#1E4E76',
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

      <Section tone="bone">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ConsultationHub />
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="slab mb-10 overflow-hidden rounded-xl">
                <Image
                  src="/images/jody/jody-standing-1200.webp"
                  alt="Jody McNamer"
                  width={1200}
                  height={1841}
                  sizes="(max-width: 1024px) 100vw, 24rem"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <h2 className="text-2xl text-ink">What actually happens on the call</h2>
              <dl className="mt-6 space-y-6">
                {expectations.map((item) => (
                  <div key={item.title} className="flex gap-4 border-l border-hair pl-5">
                    <IconChip icon={item.icon} hue={item.hue} className="mt-0.5" />
                    <div>
                      <dt className="font-display font-semibold text-ink">{item.title}</dt>
                      <dd className="mt-1.5 leading-relaxed text-ink-2">{item.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-2xl bg-brand-tint p-6">
                <p className="font-display font-semibold text-ink">Is this a fit?</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  If you’re currently investing at least{' '}
                  <span className="font-semibold text-ink">$2,500/month</span> in advertising — or
                  you’re ready to — we should talk. We’ll learn a bit about you, tell you briefly
                  about us, and decide together how to proceed.
                </p>
              </div>

              <p className="mt-6 border-t border-hair pt-6 text-sm leading-relaxed text-ink-2">
                Prefer the phone?{' '}
                <a href={contact.phoneHref} className="font-semibold text-brand-strong">
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
