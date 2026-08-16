import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { LeadStatus } from '@/lib/portal/types';
import { STATUS_LABELS } from '@/lib/portal/types';
import { cn } from '@/lib/utils';

export function money(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <h1 className="text-2xl text-ink sm:text-3xl">{title}</h1>
      {sub && <p className="mt-1.5 text-ink-2">{sub}</p>}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-hair bg-paper p-6 shadow-soft-sm', className)}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: ReactNode;
  icon: LucideIcon;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-ink-2 uppercase">
          {label}
        </span>
        <span className="grid size-8 place-items-center rounded-lg bg-brand-tint text-brand-strong">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold tracking-[-0.02em] text-ink tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-2">{hint}</p>}
    </Card>
  );
}

export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 260;
  const h = 56;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => [i * step, h - ((d - min) / span) * (h - 6) - 3] as const);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  const last = pts[pts.length - 1] ?? ([w, h] as const);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-14 w-full', className)} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)" />
      <path d={line} fill="none" stroke="var(--color-brand-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="3" fill="var(--color-brand-strong)" />
    </svg>
  );
}

const statusStyles: Record<LeadStatus, string> = {
  new: 'bg-brand-tint text-brand-strong',
  contacted: 'bg-sky-100 text-sky-700',
  qualified: 'bg-amber-100 text-amber-700',
  appointment: 'bg-indigo-100 text-indigo-700',
  approved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-emerald-600 text-white',
  lost: 'bg-slate-100 text-slate-500',
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-[0.7rem] font-semibold',
        statusStyles[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function LiveBanner({ live }: { live: boolean }) {
  if (live) return null;
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-strong/25 bg-brand-tint px-4 py-3 text-sm text-brand-ink">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-strong text-[0.7rem] font-bold text-white">
        i
      </span>
      <p>
        <b>Demo data.</b> Connect the WordPress backend (set <code className="rounded bg-white/60 px-1">WP_API_URL</code> in Vercel) to show this agent&rsquo;s real leads.
      </p>
    </div>
  );
}
