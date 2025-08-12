import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  "flex w-full rounded-lg border border-off-white bg-white px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-charcoal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus-visible:ring-deep-violet focus-visible:border-deep-violet focus-visible:shadow-deep-violet/20",
        error: "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
        success: "border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, error, ...props }, ref) => {
    const inputVariant = error ? 'error' : variant;
    
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(inputVariants({ variant: inputVariant, size, className }))}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
