import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/content/site';

/**
 * Pre-footer CTA — a full-bleed electric-lime band with black type. Loud on
 * purpose; the anti-thesis of a subtle gradient.
 */
export function CtaBand({
  title = 'Let’s fill your calendar.',
  body = 'Book a free 30-minute strategy call. Tell us your market and goals, and we’ll show you exactly what a done-for-you program would look like.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-b-2 border-ink bg-lime">
      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-8">
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] leading-[0.92] text-ink">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
          <Button asChild variant="solid" size="lg">
            <Link href="/book">
              Book a strategy call
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={contact.phoneHref}>
              <Phone aria-hidden />
              {contact.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
