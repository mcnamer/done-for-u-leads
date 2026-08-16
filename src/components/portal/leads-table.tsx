'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Lead, LeadStatus } from '@/lib/portal/types';
import { LEAD_STATUSES, STATUS_LABELS } from '@/lib/portal/types';
import { StatusBadge, money } from './ui';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function shortDate(iso: string) {
  // Parse the ISO string directly so server and client render identically.
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}`;
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LeadStatus | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (status !== 'all' && l.status !== status) return false;
      if (!q) return true;
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.city ?? '').toLowerCase().includes(q) ||
        l.source.toLowerCase().includes(q)
      );
    });
  }, [leads, query, status]);

  return (
    <div className="rounded-2xl border border-hair bg-paper shadow-soft-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-hair p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-2" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads…"
            aria-label="Search leads"
            className="w-full rounded-xl border border-hair bg-paper py-2.5 pr-3 pl-9 text-sm text-ink focus:border-brand-strong focus:ring-4 focus:ring-brand-strong/15 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="statusf" className="text-sm text-ink-2">Status</label>
          <select
            id="statusf"
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus | 'all')}
            className="rounded-xl border border-hair bg-paper px-3 py-2.5 text-sm text-ink focus:border-brand-strong focus:ring-4 focus:ring-brand-strong/15 focus:outline-none"
          >
            <option value="all">All ({leads.length})</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] text-sm">
          <thead>
            <tr className="border-b border-hair text-left font-display text-[0.7rem] tracking-wide text-ink-2 uppercase">
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-3 py-3 font-semibold">Contact</th>
              <th className="px-3 py-3 font-semibold">Source</th>
              <th className="px-3 py-3 font-semibold">Campaign</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 text-right font-semibold">Cost</th>
              <th className="px-5 py-3 text-right font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-hair/70 last:border-0 hover:bg-brand-tint/40">
                <td className="px-5 py-3">
                  <p className="font-medium text-ink">{l.fullName}</p>
                  <p className="text-xs text-ink-2">{l.city}, {l.region}</p>
                </td>
                <td className="px-3 py-3">
                  <p className="text-ink">{l.email}</p>
                  <p className="text-xs text-ink-2 tabular-nums">{l.phone}</p>
                </td>
                <td className="px-3 py-3 text-ink-2">{l.source}</td>
                <td className="px-3 py-3 text-ink-2">{l.campaignName ?? '—'}</td>
                <td className="px-3 py-3"><StatusBadge status={l.status} /></td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{money(l.cost)}</td>
                <td className="px-5 py-3 text-right tabular-nums text-ink-2">{shortDate(l.createdAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-ink-2">
                  No leads match those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
