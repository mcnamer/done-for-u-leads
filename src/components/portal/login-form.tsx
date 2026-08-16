'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

export function LoginForm({ demo, next }: { demo: boolean; next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/portal/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Sign-in failed. Try again.');
      }
      router.push(next.startsWith('/portal') ? next : '/portal');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-gradient-to-b from-brand-tint to-paper px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-strong font-display text-sm font-extrabold text-white">
            DL
          </span>
          <span className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
            Done For You <span className="text-brand-strong">Leads</span>
          </span>
        </div>

        <div className="slab rounded-2xl p-7 sm:p-9">
          <h1 className="text-2xl text-ink">Client sign-in</h1>
          <p className="mt-2 text-sm text-ink-2">Access your leads, campaigns and results.</p>

          <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block font-display text-[0.8125rem] font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-hair bg-paper px-4 py-3 text-ink transition-all focus:border-brand-strong focus:ring-4 focus:ring-brand-strong/15 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block font-display text-[0.8125rem] font-semibold text-ink">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-hair bg-paper px-4 py-3 text-ink transition-all focus:border-brand-strong focus:ring-4 focus:ring-brand-strong/15 focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-strong font-display font-semibold text-white transition-all hover:bg-[#245a8a] active:scale-[0.99] disabled:opacity-60"
            >
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Signing in
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="size-4" aria-hidden />
                </>
              )}
            </button>
          </form>

          {demo && (
            <p className="mt-6 rounded-xl bg-brand-tint px-4 py-3 text-xs leading-relaxed text-brand-ink">
              <b>Demo mode.</b> The live WordPress backend isn&rsquo;t connected yet — sign in with
              any email and a 4+ character password to explore the portal on sample data.
            </p>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-2">
          <ShieldCheck className="size-3.5 text-brand-strong" aria-hidden />
          Protected by 2-factor authentication
        </p>
        <p className="mt-4 text-center text-xs text-ink-2">
          <Link href="/" className="hover:text-brand-strong">
            ← Back to doneforuleads.com
          </Link>
        </p>
      </div>
    </main>
  );
}
