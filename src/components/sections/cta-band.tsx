import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/content/site';

/**
 * Pre-footer CTA — a deep violet gradient band with white type and a white
 * pill button. Confident and conversion-first.
 */
export function CtaBand({
  title = 'Let’s fill your calendar.',
  body = 'Book a free 30-minute strategy call. Tell us your market and goals, and we’ll show you exactly what a done-for-you program would look like.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-b border-hair bg-paper">
      <div className="wrap py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#6d34c6] via-[#7c3fd6] to-[#a46be8] px-7 py-14 shadow-soft-lg sm:px-12 lg:px-16 lg:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] text-white">{title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{body}</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-strong shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-white hover:text-[#5c2ab0]"
              >
                <Link href="/book">
                  Book a strategy call
                  <ArrowUpRight aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:border-white hover:bg-white/10"
              >
                <a href={contact.phoneHref}>
                  <Phone aria-hidden />
                  {contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
