import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { nav } from '@/content/site';

export default function NotFound() {
  return (
    <section className="spill grain relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="shell relative">
        <p className="eyebrow">
          <span aria-hidden className="bg-brass inline-block h-px w-6" />
          404
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          That page moved, or it never existed
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">
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

        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-8">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-slate flex items-center gap-2 transition-colors hover:text-white"
              >
                <span aria-hidden className="bg-brass h-3 w-[2px] rounded-full" />
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
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
