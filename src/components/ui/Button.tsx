import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-deep-violet text-off-white rounded-lg hover:brightness-110 focus-visible:ring-deep-violet shadow-sm hover:shadow-md",
        cta: "bg-gold text-charcoal rounded-full hover:scale-105 focus-visible:ring-gold font-bold shadow-md hover:shadow-lg",
        secondary: "bg-rich-lavender text-off-white rounded-lg hover:brightness-110 focus-visible:ring-rich-lavender shadow-sm hover:shadow-md",
        outline: "border border-deep-violet text-deep-violet rounded-lg hover:bg-deep-violet hover:text-off-white focus-visible:ring-deep-violet",
        ghost: "text-charcoal rounded-lg hover:bg-off-white focus-visible:ring-charcoal",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 py-3 text-base",
        xl: "h-14 px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
