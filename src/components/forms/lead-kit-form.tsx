'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, CheckCircle2, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError, FieldLabel, Input } from '@/components/ui/field';
import { leadKit } from '@/content/resources';
import { snoozePopup } from '@/lib/lead-kit';
import { leadKitSchema, type LeadKitInput } from '@/lib/validation';

export function LeadKitForm({ source, onDecline }: { source: string; onDecline?: () => void }) {
  const id = useId();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadKitInput>({
    resolver: zodResolver(leadKitSchema),
    defaultValues: { company: '' },
    mode: 'onTouched',
  });

  const onSubmit = async (values: LeadKitInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          topic: 'leads',
          message: `Requested ${leadKit.name} from ${source}.`,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'That did not go through. Try again in a moment.');
      }
      snoozePopup(Infinity);
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'That did not go through.');
    }
  };

  if (sent) {
    return (
      <div role="status">
        <CheckCircle2 aria-hidden className="size-9 text-brand-strong" />
        <h3 className="mt-4 text-2xl text-ink">Your kit is ready</h3>
        <p className="mt-2 leading-relaxed text-ink-2">
          Download it now and start with the Find Your Edge worksheet.
        </p>
        <Button asChild size="lg" className="mt-6 w-full">
          <a href={leadKit.file} download>
            Download the kit
            <Download aria-hidden />
          </a>
        </Button>
        <Link
          href="/book"
          className="mt-5 flex items-center justify-center gap-1.5 font-display text-sm font-semibold text-brand-strong hover:text-brand-ink"
        >
          Rather have it done for you? Book a free call
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>

      <div className="space-y-5">
        <div>
          <FieldLabel htmlFor={`${id}-name`}>Your name</FieldLabel>
          <Input
            id={`${id}-name`}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          <FieldError id={`${id}-name-error`}>{errors.name?.message}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          <FieldError id={`${id}-email-error`}>{errors.email?.message}</FieldError>
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 font-medium text-red-700">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full">
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="animate-spin" />
            One moment
          </>
        ) : (
          <>
            Get my free kit
            <Download aria-hidden />
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-2">
        You&rsquo;ll get the download right away. Jody&rsquo;s team may follow up by email about lead
        generation, and you can ask us to stop any time.{' '}
        <Link href="/privacy-policies" className="underline hover:text-brand-strong">
          Privacy policy
        </Link>
      </p>

      {onDecline && (
        <button
          type="button"
          onClick={onDecline}
          className="mx-auto mt-3 block rounded-md px-2 py-1 text-sm text-ink-2 transition-colors hover:text-ink"
        >
          No thanks
        </button>
      )}
    </form>
  );
}
