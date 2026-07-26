import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Editorial buttons: rectangular, thick ink border, hard offset shadow that
 * collapses on press. The primary is electric lime with black text.
 */
const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[0.55rem] border-2 border-ink font-display font-semibold transition-all duration-200 ease-[cubic-bezier(0.2,0.9,0.3,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-lime text-ink shadow-[3px_3px_0_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_var(--color-ink)]',
        solid:
          'bg-ink text-paper shadow-[3px_3px_0_0_var(--color-lime)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-lime)] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_var(--color-lime)]',
        outline: 'bg-transparent text-ink hover:bg-ink hover:text-paper',
        ghost: 'border-transparent bg-transparent text-ink hover:bg-ink/[0.06]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-13 px-7 text-base',
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
