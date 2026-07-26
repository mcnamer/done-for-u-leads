import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { nav } from '@/content/site';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center border-b-2 border-ink bg-paper">
      <div className="wrap">
        <p className="kicker">
          <span aria-hidden className="inline-block h-2 w-2 bg-lime" />
          404
        </p>
        <h1 className="mt-6 max-w-2xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] text-ink">
          That page moved, or it never existed.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          Either way, you are two clicks from what you came for. Start from the top, or go straight
          to the calendar.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/">Back to the homepage</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/book">Book a strategy call</Link>
          </Button>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t-2 border-ink pt-8">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-2 text-ink-2 transition-colors hover:text-lime-600"
              >
                <span aria-hidden className="h-3 w-[3px] bg-lime" />
                <span className="font-display text-[0.6875rem] font-semibold tracking-[0.12em] uppercase">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
