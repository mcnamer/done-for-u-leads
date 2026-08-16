import { Check } from 'lucide-react';
import { getSession } from '@/lib/portal/session';
import { getInvoices, isLive } from '@/lib/portal/api';
import { Card, LiveBanner, PageTitle, money } from '@/components/portal/ui';
import { cn } from '@/lib/utils';

const planPrice: Record<string, string> = { Bronze: '$59', Silver: '$97', Platinum: '$247', Custom: 'Custom' };
const invStyle: Record<string, string> = {
  paid: 'bg-emerald-100 text-emerald-700',
  open: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-600',
};

export default async function BillingPage() {
  const session = (await getSession())!;
  const invoices = await getInvoices(session);
  const plan = session.user.plan;

  return (
    <>
      <PageTitle title="Billing" sub="Your plan, payment method and invoices." />
      <LiveBanner live={isLive} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <p className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-ink-2 uppercase">Current plan</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-ink">{plan}</p>
          <p className="text-ink-2">
            <span className="font-semibold text-brand-strong">{planPrice[plan]}</span>
            {plan !== 'Custom' && <span className="text-sm"> / month</span>}
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {['Managed campaigns', 'Full lead access', 'Monthly reporting'].map((f) => (
              <li key={f} className="flex items-center gap-2 text-ink">
                <span className="grid size-5 place-items-center rounded-full bg-brand-tint text-brand-strong">
                  <Check className="size-3" aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-full bg-brand-strong/40 px-5 py-2.5 font-display text-sm font-semibold text-white"
          >
            Manage in Stripe
          </button>
          <p className="mt-2 text-center text-xs text-ink-2">Stripe connects with the live backend.</p>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink">Invoices</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-sm">
              <thead>
                <tr className="border-b border-hair text-left font-display text-[0.7rem] tracking-wide text-ink-2 uppercase">
                  <th className="py-2.5 pr-3 font-semibold">Invoice</th>
                  <th className="py-2.5 pr-3 font-semibold">Date</th>
                  <th className="py-2.5 pr-3 font-semibold">Status</th>
                  <th className="py-2.5 pr-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-hair/70 last:border-0">
                    <td className="py-3 pr-3 font-medium text-ink tabular-nums">{inv.id}</td>
                    <td className="py-3 pr-3 text-ink-2 tabular-nums">{inv.date}</td>
                    <td className="py-3 pr-3">
                      <span className={cn('inline-flex rounded-full px-2.5 py-0.5 font-display text-[0.7rem] font-semibold capitalize', invStyle[inv.status])}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums text-ink">{money(inv.amount)}</td>
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
