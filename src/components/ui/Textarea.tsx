import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-lg border border-off-white bg-white px-3 py-2 text-sm transition-all duration-200 placeholder:text-charcoal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus-visible:ring-deep-violet focus-visible:border-deep-violet focus-visible:shadow-deep-violet/20",
        error: "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
        success: "border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500",
      },
      size: {
        sm: "min-h-[60px] text-xs",
        md: "min-h-[80px]",
        lg: "min-h-[120px] text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, error, ...props }, ref) => {
    const textareaVariant = error ? 'error' : variant;
    
    return (
      <div className="w-full">
        <textarea
          className={cn(textareaVariants({ variant: textareaVariant, size, className }))}
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

Textarea.displayName = "Textarea";

export { Textarea };
