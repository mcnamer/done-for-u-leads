'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError, FieldLabel, Input, Select, Textarea } from '@/components/ui/field';
import { contactSchema, topicLabels, type ContactInput } from '@/lib/validation';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: 'real-estate', company: '' },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus('sending');
    setServerError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'The message did not send. Try again in a moment.');
      }

      setStatus('sent');
      reset();
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'The message did not send.');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="slab flex flex-col items-start rounded-2xl bg-brand-tint p-10">
        <CheckCircle2 aria-hidden className="size-9 text-ink" />
        <h3 className="mt-5 text-2xl text-ink">Message sent</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink/80">
          It lands in Jody&rsquo;s inbox, not a queue. You will hear back within one business day —
          usually the same day.
        </p>
        <Button variant="outline" className="mt-7" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot — visually and semantically hidden from real users. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name">Your name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          <FieldError id="name-error">{errors.name?.message}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          <FieldError id="email-error">{errors.email?.message}</FieldError>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
          <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
          <FieldError id="phone-error">{errors.phone?.message}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="topic">What is this about?</FieldLabel>
          <Select
            id="topic"
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? 'topic-error' : undefined}
            {...register('topic')}
          >
            {Object.entries(topicLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <FieldError id="topic-error">{errors.topic?.message}</FieldError>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          placeholder="Where are you now, and where are you trying to get to?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        <FieldError id="message-error">{errors.message?.message}</FieldError>
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg border-2 border-red-600 bg-red-50 p-4 font-medium text-red-700"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 aria-hidden className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Send aria-hidden />
            </>
          )}
        </Button>
        <p className="text-sm text-ink-2">Replies within one business day.</p>
      </div>
    </form>
  );
}
