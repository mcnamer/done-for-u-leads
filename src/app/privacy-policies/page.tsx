import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { LegalProse } from '@/components/legal-prose';
import { contact } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy policy',
  description: 'How doneforuleads.com collects, uses and protects your information.',
  path: '/privacy-policies',
  index: false,
});

const UPDATED = 'July 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${UPDATED}`}
        title="Privacy policy"
        image="/images/jody/jody-outdoors-1200.webp"
        imageAlt="Jody McNamer outdoors"
        imagePos="50% 15%"
        lede="What this site collects, why, and what happens to it."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Privacy policy', path: '/privacy-policies' },
        ]}
      />

      <Section>
        <div className="shell">
          <LegalProse>
            <section>
              <h2>What we collect</h2>
              <p>
                If you send a message through the contact form, we collect the name, email address,
                optional phone number, topic and message you provide. If you book a consultation,
                the scheduling is handled by Motion and is governed by Motion&rsquo;s own privacy
                policy.
              </p>
              <p>
                Like most websites, our host records standard technical information such as IP
                address, browser type and pages visited. This is used to keep the site running and
                to understand which pages are useful.
              </p>
            </section>

            <section>
              <h2>Why we collect it</h2>
              <ul>
                <li>To reply to your enquiry.</li>
                <li>To schedule and prepare for a consultation you requested.</li>
                <li>To keep the site secure and to limit automated form abuse.</li>
                <li>To understand, in aggregate, which content is worth writing more of.</li>
              </ul>
            </section>

            <section>
              <h2>What we do not do</h2>
              <p>
                We do not sell your information. We do not rent it, trade it, or hand it to lead
                brokers. If you ask a question about a house, that question does not become a
                product.
              </p>
            </section>

            <section>
              <h2>Who else sees it</h2>
              <p>
                Service providers who help us operate the site and the business — for example our
                hosting provider, our email delivery provider, and our scheduling tool — process
                this information on our behalf. Where a transaction requires it (a lender, a title
                company, a brokerage), information is shared only as needed to complete the work you
                asked for, or where the law requires it.
              </p>
            </section>

            <section>
              <h2>How long we keep it</h2>
              <p>
                Enquiries are retained for as long as we have an active or reasonably expected
                relationship with you, and thereafter as required by real estate and lending
                record-keeping rules. You can ask us to delete your information at any time.
              </p>
            </section>

            <section>
              <h2>Your choices</h2>
              <p>
                You can ask what we hold about you, ask us to correct it, or ask us to delete it.
                Email <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will handle it.
                Washington residents have specific rights under the Washington My Health My Data Act
                and other state law; those rights are honoured on request.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Jody McNamer, {contact.city}, {contact.regionName}.{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> ·{' '}
                <a href={contact.phoneHref}>{contact.phone}</a>
              </p>
              <p className="text-slate text-sm">
                This policy is provided in good faith and is not legal advice. Have counsel review
                it against your current practices before you rely on it.
              </p>
            </section>
          </LegalProse>
        </div>
      </Section>
    </>
  );
}
