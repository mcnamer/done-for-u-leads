import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Conversion buttons: friendly pills with a soft violet-tinted shadow that
 * lifts on hover. Primary is deep violet with white text (AA); a dark "solid"
 * and a quiet outline cover secondary actions.
 */
const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-semibold transition-all duration-200 ease-[cubic-bezier(0.2,0.9,0.3,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.05em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-strong text-white shadow-[0_10px_24px_-10px_rgba(75,42,134,0.55)] hover:-translate-y-0.5 hover:bg-[#5c2ab0] hover:shadow-[0_16px_34px_-12px_rgba(75,42,134,0.6)] active:translate-y-0',
        solid:
          'bg-ink text-white shadow-[0_10px_24px_-12px_rgba(26,19,39,0.6)] hover:-translate-y-0.5 hover:bg-[#251b3a] active:translate-y-0',
        outline:
          'border border-brand-strong/40 bg-transparent text-brand-strong hover:border-brand-strong hover:bg-brand-tint',
        ghost: 'bg-transparent text-ink hover:bg-brand-tint',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-[0.95rem]',
        lg: 'h-13 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
