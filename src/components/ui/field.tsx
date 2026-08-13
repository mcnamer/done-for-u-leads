import * as React from 'react';
import { cn } from '@/lib/utils';

const base =
  'w-full rounded-xl border border-hair bg-paper px-4 py-3 text-ink placeholder:text-ink-2/60 transition-all focus:outline-none focus:border-brand-strong focus:ring-4 focus:ring-brand-strong/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => <input ref={ref} className={cn(base, className)} {...props} />);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, 'min-h-36 resize-y', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select ref={ref} className={cn(base, 'appearance-none pr-10', className)} {...props} />
));
Select.displayName = 'Select';

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-display text-[0.8125rem] font-semibold text-ink"
    >
      {children}
    </label>
  );
}

export function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-red-600">
      {children}
    </p>
  );
}
