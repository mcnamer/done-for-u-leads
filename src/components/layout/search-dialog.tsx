'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { nav } from '@/content/site';
import { cn } from '@/lib/utils';

type Item = { label: string; hint: string; href: string };

const staticItems: Item[] = [
  { label: 'Home', hint: 'Page', href: '/' },
  ...nav.map((n) => ({ label: n.label, hint: 'Page', href: n.href })),
  { label: 'Book a strategy call', hint: 'Action', href: '/book' },
  { label: 'How it works', hint: 'Section', href: '/how-it-works' },
  { label: 'The operator behind it', hint: 'Section', href: '/#about' },
  { label: 'Impact by the numbers', hint: 'Section', href: '/#impact' },
  { label: 'Insights & media', hint: 'Section', href: '/#insights' },
  { label: 'FAQs', hint: 'Section', href: '/#faqs' },
];

export function SearchDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const reduced = useReducedMotion();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staticItems;
    return staticItems.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q),
    );
  }, [query]);

  // Cmd/Ctrl+K opens; Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const go = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    router.push(item.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className={cn(
          'text-white hover:text-brass hover:border-brass/50 grid size-9 place-items-center rounded-full border border-white/15 transition-colors',
          triggerClassName,
        )}
      >
        <Search className="size-[1.05rem]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="night fixed inset-0 z-[160] flex items-start justify-center p-4 pt-[12vh] sm:p-6 sm:pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-midnight/80 absolute inset-0 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search the site"
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/12 bg-midnight/95 backdrop-blur-xl"
              style={{ boxShadow: '0 40px 90px -30px rgba(0,0,0,0.8)' }}
              initial={reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5">
                <Search className="text-slate size-5 shrink-0" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setActive((a) => Math.min(a + 1, results.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setActive((a) => Math.max(a - 1, 0));
                    } else if (e.key === 'Enter') {
                      go(results[active]);
                    }
                  }}
                  placeholder="Search pages and sections…"
                  className="w-full bg-transparent py-4 text-white placeholder:text-slate/60 focus:outline-none"
                  aria-label="Search"
                />
                <kbd className="text-slate hidden shrink-0 rounded border border-white/15 px-1.5 py-0.5 font-mono text-[0.625rem] sm:block">
                  ESC
                </kbd>
              </div>

              <ul className="max-h-[46vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="text-slate px-4 py-6 text-center text-sm">
                    Nothing matches “{query}”.
                  </li>
                )}
                {results.map((item, i) => (
                  <li key={`${item.href}-${item.label}`}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(item)}
                      className={cn(
                        'flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors',
                        active === i ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5',
                      )}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="flex items-center gap-3">
                        <span className="text-slate font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                          {item.hint}
                        </span>
                        {active === i && <CornerDownLeft className="text-slate size-3.5" aria-hidden />}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
