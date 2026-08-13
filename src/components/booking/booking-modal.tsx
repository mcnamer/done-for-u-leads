'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { ConsultationHub } from './consultation-hub';

/**
 * Turns every "Book a consultation" link into a popup. A single delegated
 * listener catches clicks on any `a[href="/book"]` or `[data-book]` element and
 * opens the hub in a dialog — so the CTAs stay plain links (the /book page is
 * the no-JS fallback) and nothing needs to be wired up per button.
 */
export function BookingModal() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const el = e.target as Element | null;
      const trigger = el?.closest?.('a[href="/book"], [data-book]');
      if (!trigger) return;
      // Capture phase: run before next/link's own handler so navigation never starts.
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — fixed, never scrolls away */}
          <div aria-hidden className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />

          {/* Scroll layer: the panel scrolls within this, the backdrop stays put */}
          <div className="absolute inset-0 overflow-y-auto overscroll-contain">
            <div
              className="flex min-h-full items-start justify-center p-4 sm:p-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) setOpen(false);
              }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Book a consultation"
                className="relative z-10 my-6 w-full max-w-4xl sm:my-10"
                initial={reduced ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
                animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute -top-3 -right-3 z-20 grid size-10 place-items-center rounded-full border border-hair bg-paper text-ink transition-colors hover:bg-brand-tint"
                >
                  <X className="size-5" />
                </button>
                <ConsultationHub />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
