import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { LeadKitForm } from '@/components/forms/lead-kit-form';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { CtaBand } from '@/components/sections/cta-band';
import { IconChip } from '@/components/ui/icon-chip';
import { coachResources, leadKit } from '@/content/resources';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, graph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Free resources',
  description:
    'Free tools for real estate agents from Done For You Leads: a USP worksheet, first-contact scripts, a cost-per-closing worksheet and training from Jody McNamer.',
  path: '/free-resources',
});

export default function FreeResourcesPage() {
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Free resources', path: '/free-resources' },
  ];
  const jsonLd = graph(breadcrumbSchema(breadcrumb));

  return (
    <>
      <PageHeader
        eyebrow="Free resources"
        title="Free tools to close more of your leads"
        lede="Scripts, worksheets and training from Jody McNamer and 20+ years of marketing real estate. Use them whether you ever work with us or not."
        breadcrumb={breadcrumb}
      />

      <Section>
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="kicker">Free download</span>
              <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">{leadKit.name}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed">
                Leads cost money. What you do with them decides how much of that money comes back.
                This five-page PDF covers what makes you the obvious choice, what to say when a lead
                comes in, and what each closing really costs.
              </p>
            </Reveal>
            <ul className="mt-9 space-y-6">
              {leadKit.parts.map((part) => (
                <li key={part.title} className="flex gap-4">
                  <IconChip icon={part.icon} />
                  <div>
                    <h3 className="text-xl text-ink">{part.title}</h3>
                    <p className="mt-1.5 leading-relaxed">{part.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-5">
            <div className="slab rounded-2xl p-7 sm:p-9">
              <h3 className="text-2xl text-ink">Get your free copy</h3>
              <p className="mt-2 mb-6 leading-relaxed">
                Enter your name and email, and the download is yours right away.
              </p>
              <LeadKitForm source="the free resources page" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="bone">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kicker">More free training</span>
            <h2 className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
              More from Agent Broker Coach
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Agent Broker Coach is Jody&rsquo;s coaching company. These live on its site, and most
              of them ask for a quick sign-up there.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coachResources.map((resource) => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slab slab-hover flex h-full flex-col rounded-2xl p-7"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-ink">
                      {resource.title}
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-brand-strong" />
                  </span>
                  <span className="mt-2 leading-relaxed">{resource.body}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand title="Rather have it done for you?" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
