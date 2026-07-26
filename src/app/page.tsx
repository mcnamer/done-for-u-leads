import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Process } from '@/components/sections/process';
import { Why } from '@/components/sections/why';
import { Impact } from '@/components/sections/impact';
import { AboutTeaser } from '@/components/sections/about-teaser';
import { Insights } from '@/components/sections/insights';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaBand } from '@/components/sections/cta-band';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Done For You Leads — Real Estate Lead Generation, Done For You',
  description:
    'Buyer and seller campaigns built, launched and managed for you — so your calendar fills with real conversations instead of cold calls. Built inside a working brokerage. Book a strategy call.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Process />
      <Why />
      <Impact />
      <AboutTeaser />
      <Insights />
      <FaqSection />
      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(faqSchema)) }}
      />
    </>
  );
}
