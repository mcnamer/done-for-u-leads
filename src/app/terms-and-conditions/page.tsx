import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { LegalProse } from '@/components/legal-prose';
import { contact } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms & conditions',
  description: 'The terms that apply to your use of doneforuleads.com.',
  path: '/terms-and-conditions',
  index: false,
});

const UPDATED = 'July 2026';

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${UPDATED}`}
        title="Terms & conditions"
        image="/images/jody/jody-about-1200.webp"
        imageAlt="Jody McNamer"
        imagePos="50% 6%"
        lede="The rules of the road for using this site."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Terms & conditions', path: '/terms-and-conditions' },
        ]}
      />

      <Section>
        <div className="wrap">
          <LegalProse>
            <section>
              <h2>Using this site</h2>
              <p>
                By using doneforuleads.com you agree to these terms. If you do not agree with them, please
                do not use the site.
              </p>
            </section>

            <section>
              <h2>This is information, not advice</h2>
              <p>
                Everything published here — articles, calculators, figures, market commentary — is
                general information. It is not legal, tax, financial or investment advice, and it
                does not create a client, agency or fiduciary relationship. Nothing here is a
                commitment to lend or an offer of credit.
              </p>
              <p>
                A brokerage or lending relationship begins only when it is set out in a signed
                written agreement. Until then, treat what you read here as a starting point for a
                conversation, not a substitute for one.
              </p>
            </section>

            <section>
              <h2>Real estate and lending</h2>
              <p>
                Real estate brokerage services are offered through The Real Brokerage. Mortgage
                services are offered through One Real Mortgage. All loans are subject to credit
                approval, underwriting, and property qualification. Rates and terms are subject to
                change without notice. Equal Housing Opportunity.
              </p>
            </section>

            <section>
              <h2>Accuracy</h2>
              <p>
                We work to keep the site accurate and current, but we do not warrant that it is free
                from error or omission. Market data, figures and third-party information can change.
                Verify anything you intend to act on.
              </p>
            </section>

            <section>
              <h2>Third-party links</h2>
              <p>
                This site links to other businesses in the McNamer ecosystem and to third-party
                tools such as Motion scheduling. We are not responsible for the content,
                availability or privacy practices of external sites.
              </p>
            </section>

            <section>
              <h2>Intellectual property</h2>
              <p>
                The content, design, marks and photography on this site belong to Jody McNamer or
                are used with permission. You may share and quote from it with attribution; you may
                not republish it wholesale or present it as your own.
              </p>
            </section>

            <section>
              <h2>Limitation of liability</h2>
              <p>
                To the extent permitted by law, we are not liable for indirect or consequential
                losses arising out of your use of this site. Nothing in these terms limits liability
                that cannot lawfully be limited.
              </p>
            </section>

            <section>
              <h2>Governing law</h2>
              <p>
                These terms are governed by the laws of the State of Washington. Any dispute will be
                heard in the courts of Kitsap County, Washington.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Questions about these terms: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                .
              </p>
              <p className="text-slate text-sm">
                These terms are provided in good faith and are not legal advice. Have counsel review
                them before you rely on them.
              </p>
            </section>
          </LegalProse>
        </div>
      </Section>
    </>
  );
}
