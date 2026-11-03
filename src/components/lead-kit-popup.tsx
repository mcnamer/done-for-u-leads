'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { LeadKitForm } from '@/components/forms/lead-kit-form';
import { leadKit } from '@/content/resources';
import { popupSnoozed, snoozePopup } from '@/lib/lead-kit';

const DELAY_MS = 20_000;
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;

// Pages where the visitor is already converting, or reading something that should not be interrupted.
const QUIET_PATHS = [
  '/free-resources',
  '/book',
  '/contact-us',
  '/privacy-policies',
  '/terms-and-conditions',
];

/**
 * Offers the free kit once: after 20 seconds, or sooner if the mouse heads for
 * the tab bar. Closing it snoozes it for two weeks, and getting the kit ends it.
 * A native <dialog> gives us the focus trap, Esc and an inert page for free.
 */
export function LeadKitPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (shown.current || QUIET_PATHS.includes(pathname) || popupSnoozed()) return;

    const show = () => {
      // Never stack on the booking modal; exit intent can still catch them later.
      if (shown.current || document.querySelector('[aria-modal="true"]')) return;
      shown.current = true;
      setOpen(true);
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const timer = setTimeout(show, DELAY_MS);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      clearTimeout(timer);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();

    // BookingModal would open underneath a modal dialog, so step aside for it.
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.('a[href="/book"], [data-book]')) dialog.current?.close();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [open]);

  if (!open) return null;

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-labelledby="lead-kit-title"
      onClose={() => {
        if (!popupSnoozed()) snoozePopup(SNOOZE_MS);
        setOpen(false);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-[1.5rem] bg-paper p-0 shadow-soft-lg transition duration-300 backdrop:bg-ink/70 backdrop:backdrop-blur-sm starting:translate-y-4 starting:opacity-0"
    >
      <div className="relative grid sm:grid-cols-2">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/15 sm:text-ink sm:hover:bg-brand-tint"
        >
          <X className="size-5" />
        </button>
        <div className="flex flex-col justify-center bg-gradient-to-br from-[#1e4e76] via-[#2c6ca6] to-[#6fa1cc] p-6 sm:p-9">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            Free download
          </p>
          <h2 id="lead-kit-title" className="mt-3 pr-8 text-[1.9rem] leading-[1.08] text-white sm:pr-0">
            Close more of the leads you already have
          </h2>
          <p className="mt-3 leading-relaxed text-white/85">
            Get {leadKit.name}, free from Jody McNamer.
          </p>
          <ul className="mt-3 hidden space-y-2 text-white sm:block">
            {leadKit.parts.map((part) => (
              <li key={part.title} className="flex items-start gap-2 text-[0.95rem]">
                <Check aria-hidden className="mt-1 size-4 shrink-0" />
                {part.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative p-6 sm:p-9 sm:pt-12">
          <LeadKitForm source="the site popup" onDecline={close} />
        </div>
      </div>
    </dialog>
  );
}
