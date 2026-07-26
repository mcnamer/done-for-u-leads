import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 motion-reduce:transform-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brass text-onaccent hover:bg-brass-soft hover:shadow-[0_0_32px_-8px_var(--color-brass)]',
        outline:
          'border border-white/20 text-white hover:border-brass/70 hover:text-brass bg-transparent',
        ghost: 'text-slate hover:text-white bg-transparent',
        inverse: 'bg-midnight text-white hover:bg-navy',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-full',
        md: 'h-11 px-6 text-[0.9375rem] rounded-full',
        lg: 'h-13 px-8 text-base rounded-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
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
