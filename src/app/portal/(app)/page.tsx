import { Users, CalendarCheck, DollarSign, Target, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { getSession } from '@/lib/portal/session';
import { getLeads, getMetrics, isLive } from '@/lib/portal/api';
import { LEAD_STATUSES } from '@/lib/portal/types';
import { Card, LiveBanner, PageTitle, Sparkline, StatCard, StatusBadge, money } from '@/components/portal/ui';

export default async function DashboardPage() {
  const session = (await getSession())!;
  const [metrics, leads] = await Promise.all([getMetrics(session), getLeads(session)]);
  const recent = [...leads]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);
  const pipelineMax = Math.max(...Object.values(metrics.pipeline), 1);

  return (
    <>
      <PageTitle
        title={`Welcome back, ${session.user.name.split(' ')[0]}`}
        sub="Here’s what your pipeline looks like over the last 30 days."
      />
      <LiveBanner live={isLive} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Leads"
          value={String(metrics.leads)}
          hint={<span className="text-emerald-600">▲ {metrics.leadsDelta}% vs last period</span>}
          icon={Users}
        />
        <StatCard label="Appointments" value={String(metrics.appointments)} hint="booked this period" icon={CalendarCheck} />
        <StatCard label="Cost / lead" value={money(metrics.costPerLead)} hint={`${money(metrics.spend)} spent`} icon={DollarSign} />
        <StatCard label="Call-to-close" value={`${metrics.callToClose}%`} hint="lead → closing" icon={Target} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Leads over time</h2>
              <p className="text-sm text-ink-2">Last 14 days</p>
            </div>
            <span className="font-display text-2xl font-extrabold text-ink tabular-nums">
              {metrics.trend.reduce((a, b) => a + b, 0)}
            </span>
          </div>
          <div className="mt-5">
            <Sparkline data={metrics.trend} />
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-bold text-ink">Revenue influenced</h2>
          <p className="mt-2 font-display text-4xl font-extrabold text-brand-strong tabular-nums">
            {money(metrics.revenueInfluenced)}
          </p>
          <p className="mt-1 text-sm text-ink-2">estimated from closings this period</p>
          <Link
            href="/portal/reports"
            className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-strong hover:underline"
          >
            View full report <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Pipeline */}
        <Card>
          <h2 className="font-display text-lg font-bold text-ink">Pipeline</h2>
          <ul className="mt-5 space-y-3">
            {LEAD_STATUSES.map((s) => (
              <li key={s} className="flex items-center gap-3">
                <span className="w-24 shrink-0">
                  <StatusBadge status={s} />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper-2">
                  <div
                    className="h-full rounded-full bg-brand-strong"
                    style={{ width: `${(metrics.pipeline[s] / pipelineMax) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-sm font-semibold text-ink tabular-nums">
                  {metrics.pipeline[s]}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent leads */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Recent leads</h2>
            <Link
              href="/portal/leads"
              className="font-display text-sm font-semibold text-brand-strong hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-hair text-left font-display text-[0.7rem] tracking-wide text-ink-2 uppercase">
                  <th className="py-2 pr-3 font-semibold">Name</th>
                  <th className="py-2 pr-3 font-semibold">Source</th>
                  <th className="py-2 pr-3 font-semibold">Status</th>
                  <th className="py-2 pr-3 text-right font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((l) => (
                  <tr key={l.id} className="border-b border-hair/70 last:border-0">
                    <td className="py-2.5 pr-3">
                      <p className="font-medium text-ink">{l.fullName}</p>
                      <p className="text-xs text-ink-2">{l.city}, {l.region}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-ink-2">{l.source}</td>
                    <td className="py-2.5 pr-3"><StatusBadge status={l.status} /></td>
                    <td className="py-2.5 pr-3 text-right tabular-nums text-ink">{money(l.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
