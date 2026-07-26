import * as React from 'react';
import { cn } from '@/lib/utils';

const base =
  'w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate/50 transition-colors focus:border-brass/60 focus:bg-white/[0.05] aria-[invalid=true]:border-red-400/70';

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
      className="text-slate mb-2 block font-mono text-[0.6875rem] tracking-[0.16em] uppercase"
    >
      {children}
    </label>
  );
}

export function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-300">
      {children}
    </p>
  );
}
