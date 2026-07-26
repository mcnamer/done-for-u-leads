import { Reveal } from '@/components/reveal';
import { Eyebrow, Section } from '@/components/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/content/faqs';

export function FaqSection() {
  return (
    <Section id="faqs">
      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-4xl">
              The things people ask before they call
            </h2>
            <p className="mt-6 leading-relaxed">
              If yours is not here, ask it directly — the answer is free and so is the call.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <div className="glass brass-edge relative rounded-3xl px-6 py-2 sm:px-8">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.question} value={`faq-${i}`} className="last:border-b-0">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
