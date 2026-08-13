import type { Metadata } from 'next';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { faqs } from '@/content/faqs';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description:
    'Answers to the most common questions about Done For You Leads — what "done for you" means, how it differs from portal leads, what it costs, and how fast leads start.',
  path: '/faq',
});

export default function FaqPage() {
  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ]),
    faqSchema,
  );

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered"
        lede="The things agents ask most before booking a call. Still not sure? The first call is free and there is no version of it that ends with a contract in front of you."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />

      <Section>
        <div className="wrap">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-hair bg-paper shadow-soft">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group border-b border-hair last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 transition-colors hover:bg-brand-tint/50">
                  <span className="font-display text-lg font-semibold text-ink">{f.question}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong transition-transform duration-300 group-open:rotate-45">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-ink-2">{f.answer}</div>
              </details>
            ))}
          </div>
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
