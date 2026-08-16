'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PortalUser } from '@/lib/portal/types';
import { cn } from '@/lib/utils';

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/leads', label: 'Leads', icon: Users },
  { href: '/portal/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/portal/reports', label: 'Reports', icon: BarChart3 },
  { href: '/portal/billing', label: 'Billing', icon: CreditCard },
  { href: '/portal/settings', label: 'Settings', icon: Settings },
];

export function PortalShell({ user, children }: { user: PortalUser; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/portal' ? pathname === '/portal' : pathname.startsWith(href);

  async function signOut() {
    await fetch('/portal/api/logout', { method: 'POST' });
    router.push('/portal/login');
    router.refresh();
  }

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

  const Nav = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-display text-[0.95rem] font-medium transition-colors',
              active
                ? 'bg-brand-strong text-white shadow-soft-sm'
                : 'text-ink-2 hover:bg-brand-tint hover:text-brand-strong',
            )}
          >
            <item.icon className="size-[1.15rem]" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-paper-2 lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-hair bg-paper p-5 lg:flex">
        <Link href="/portal" className="flex items-center gap-2.5 px-1.5">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-strong font-display text-sm font-extrabold text-white">
            DL
          </span>
          <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink">
            DFY <span className="text-brand-strong">Portal</span>
          </span>
        </Link>
        <div className="mt-8 flex-1">{Nav}</div>
        <button
          type="button"
          onClick={signOut}
          className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 font-display text-[0.95rem] font-medium text-ink-2 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-[1.15rem]" aria-hidden />
          Sign out
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-hair bg-paper px-4 py-3 lg:hidden">
        <Link href="/portal" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-strong font-display text-xs font-extrabold text-white">
            DL
          </span>
          <span className="font-display font-extrabold text-ink">DFY Portal</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid size-9 place-items-center rounded-lg border border-hair text-ink"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-b border-hair bg-paper px-4 py-4 lg:hidden">
          {Nav}
          <button
            type="button"
            onClick={signOut}
            className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 font-display text-[0.95rem] font-medium text-red-600"
          >
            <LogOut className="size-[1.15rem]" aria-hidden /> Sign out
          </button>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-col">
        {/* Desktop top bar */}
        <header className="hidden items-center justify-end gap-4 border-b border-hair bg-paper px-8 py-3.5 lg:flex">
          <div className="text-right">
            <p className="font-display text-sm font-semibold text-ink">{user.name}</p>
            <p className="text-xs text-ink-2">
              {user.company ?? 'Agent'} · {user.plan} plan
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-brand-tint font-display text-sm font-bold text-brand-strong">
            {initials}
          </span>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
