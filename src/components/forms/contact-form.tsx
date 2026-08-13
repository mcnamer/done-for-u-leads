'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError, FieldLabel, Input, Textarea } from '@/components/ui/field';
import { contactSchema, topicLabels, type ContactInput } from '@/lib/validation';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const steps = ['You', 'Topic', 'Details'] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: 'leads', company: '' },
    mode: 'onTouched',
  });

  const topic = watch('topic');

  const next = async () => {
    const fields: Record<number, (keyof ContactInput)[]> = {
      0: ['name', 'email', 'phone'],
      1: ['topic'],
    };
    const ok = await trigger(fields[step] ?? []);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

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
      setStep(0);
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'The message did not send.');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="slab flex flex-col items-start rounded-2xl bg-brand-tint p-10">
        <CheckCircle2 aria-hidden className="size-9 text-brand-strong" />
        <h3 className="mt-5 text-2xl text-ink">Message sent</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-2">
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
    <div className="slab rounded-2xl p-7 sm:p-9">
      {/* Stepper */}
      <ol className="flex items-center gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                'grid size-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-colors',
                i < step
                  ? 'bg-brand-strong text-white'
                  : i === step
                    ? 'bg-brand-strong text-white'
                    : 'bg-brand-tint text-brand-strong',
              )}
            >
              {i < step ? <Check className="size-4" aria-hidden /> : i + 1}
            </span>
            <span
              className={cn(
                'hidden font-display text-sm font-semibold sm:block',
                i === step ? 'text-ink' : 'text-ink-2',
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="mx-1 h-px flex-1 bg-hair sm:mx-2" />
            )}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8">
        {/* Honeypot */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="company">Company</label>
          <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
        </div>

        {/* Step 1 — You */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <FieldLabel htmlFor="name">Your name</FieldLabel>
              <Input
                id="name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register('name')}
              />
              <FieldError id="name-error">{errors.name?.message}</FieldError>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  {...register('email')}
                />
                <FieldError id="email-error">{errors.email?.message}</FieldError>
              </div>
              <div>
                <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
                <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
                <FieldError id="phone-error">{errors.phone?.message}</FieldError>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Topic */}
        {step === 1 && (
          <fieldset>
            <legend className="mb-4 font-display text-sm font-semibold text-ink">
              What is this about?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(topicLabels).map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setValue('topic', value as ContactInput['topic'])}
                  className={cn(
                    'flex items-center justify-between rounded-xl border p-4 text-left transition-colors',
                    topic === value
                      ? 'border-brand-strong bg-brand-tint text-ink'
                      : 'border-hair bg-paper text-ink-2 hover:border-brand-strong/40',
                  )}
                >
                  <span className="text-[0.95rem] font-medium">{label}</span>
                  <span
                    className={cn(
                      'grid size-5 place-items-center rounded-full border',
                      topic === value ? 'border-brand-strong bg-brand-strong text-white' : 'border-hair',
                    )}
                  >
                    {topic === value && <Check className="size-3" aria-hidden />}
                  </span>
                </button>
              ))}
            </div>
            <FieldError id="topic-error">{errors.topic?.message}</FieldError>
          </fieldset>
        )}

        {/* Step 3 — Details */}
        {step === 2 && (
          <div>
            <FieldLabel htmlFor="message">Tell us a little more</FieldLabel>
            <Textarea
              id="message"
              placeholder="Where are you now, and where are you trying to get to?"
              aria-invalid={Boolean(errors.message)}
              {...register('message')}
            />
            <FieldError id="message-error">{errors.message?.message}</FieldError>
          </div>
        )}

        {serverError && (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 font-medium text-red-700">
            {serverError}
          </p>
        )}

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft aria-hidden />
              Back
            </Button>
          ) : (
            <span className="text-sm text-ink-2">Step {step + 1} of {steps.length}</span>
          )}

          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              Continue
              <ArrowRight aria-hidden />
            </Button>
          ) : (
            <Button type="submit" disabled={status === 'sending'}>
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
          )}
        </div>
      </form>
    </div>
  );
}
