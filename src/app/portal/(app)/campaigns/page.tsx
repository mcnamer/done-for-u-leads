import { getSession } from '@/lib/portal/session';
import { getCampaigns, isLive } from '@/lib/portal/api';
import { Card, LiveBanner, PageTitle, money } from '@/components/portal/ui';
import { cn } from '@/lib/utils';

const statusStyle: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-amber-100 text-amber-700',
  ended: 'bg-slate-100 text-slate-500',
};

export default async function CampaignsPage() {
  const session = (await getSession())!;
  const campaigns = await getCampaigns(session);

  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0);
  const totalLeads = campaigns.reduce((a, c) => a + c.leads, 0);
  const totalClosed = campaigns.reduce((a, c) => a + c.closed, 0);

  return (
    <>
      <PageTitle title="Campaigns" sub="Spend and results for every campaign we run for you." />
      <LiveBanner live={isLive} />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-ink-2 uppercase">Total spend</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-ink tabular-nums">{money(totalSpend)}</p>
        </Card>
        <Card className="p-5">
          <p className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-ink-2 uppercase">Leads</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-ink tabular-nums">{totalLeads}</p>
        </Card>
        <Card className="p-5">
          <p className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-ink-2 uppercase">Closings</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-ink tabular-nums">{totalClosed}</p>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-hair bg-paper shadow-soft-sm">
        <table className="w-full min-w-[48rem] text-sm">
          <thead>
            <tr className="border-b border-hair text-left font-display text-[0.7rem] tracking-wide text-ink-2 uppercase">
              <th className="px-5 py-3 font-semibold">Campaign</th>
              <th className="px-3 py-3 font-semibold">Channel</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 text-right font-semibold">Spend</th>
              <th className="px-3 py-3 text-right font-semibold">Leads</th>
              <th className="px-3 py-3 text-right font-semibold">Appts</th>
              <th className="px-3 py-3 text-right font-semibold">Closed</th>
              <th className="px-5 py-3 text-right font-semibold">Cost / lead</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b border-hair/70 last:border-0 hover:bg-brand-tint/40">
                <td className="px-5 py-3 font-medium text-ink">{c.name}</td>
                <td className="px-3 py-3 text-ink-2">{c.channel}</td>
                <td className="px-3 py-3">
                  <span className={cn('inline-flex rounded-full px-2.5 py-0.5 font-display text-[0.7rem] font-semibold capitalize', statusStyle[c.status])}>
                    {c.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{money(c.spend)}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{c.leads}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{c.appointments}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{c.closed}</td>
                <td className="px-5 py-3 text-right tabular-nums text-ink">{money(c.spend / Math.max(c.leads, 1))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
