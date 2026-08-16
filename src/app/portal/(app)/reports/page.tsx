import { Download, CalendarClock } from 'lucide-react';
import { getSession } from '@/lib/portal/session';
import { getLeads, getMetrics, isLive } from '@/lib/portal/api';
import { Card, LiveBanner, PageTitle, money } from '@/components/portal/ui';

export default async function ReportsPage() {
  const session = (await getSession())!;
  const [metrics, leads] = await Promise.all([getMetrics(session), getLeads(session)]);

  const bySource = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const srcMax = Math.max(...bySource.map(([, n]) => n), 1);

  return (
    <>
      <PageTitle title="Reports" sub="Your results, summarized — and ready to share." />
      <LiveBanner live={isLive} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Cost per lead', money(metrics.costPerLead)],
          ['Cost per appointment', money(metrics.spend / Math.max(metrics.appointments, 1))],
          ['Call-to-close', `${metrics.callToClose}%`],
          ['Revenue influenced', money(metrics.revenueInfluenced)],
        ].map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-ink-2 uppercase">{label}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-ink tabular-nums">{value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink">Leads by source</h2>
          <ul className="mt-5 space-y-3">
            {bySource.map(([src, n]) => (
              <li key={src} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-ink-2">{src}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-paper-2">
                  <div className="h-full rounded-full bg-brand-strong" style={{ width: `${(n / srcMax) * 100}%` }} />
                </div>
                <span className="w-8 text-right text-sm font-semibold text-ink tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-bold text-ink">Share &amp; schedule</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Export a white-label PDF or get this report emailed to you automatically each month.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-hair px-5 py-2.5 font-display text-sm font-semibold text-ink-2"
            >
              <Download className="size-4" aria-hidden /> Download PDF
            </button>
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-hair px-5 py-2.5 font-display text-sm font-semibold text-ink-2"
            >
              <CalendarClock className="size-4" aria-hidden /> Schedule monthly email
            </button>
          </div>
          <p className="mt-3 text-xs text-ink-2">Enabled once the live backend is connected.</p>
        </Card>
      </div>
    </>
  );
}
