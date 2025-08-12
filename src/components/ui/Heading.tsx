import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  "font-sans text-charcoal tracking-tight",
  {
    variants: {
      level: {
        h1: "text-5xl font-bold",        // 3rem (48px), 700 (Bold)
        h2: "text-4xl font-bold",        // 2.25rem (36px), 700 (Bold)  
        h3: "text-2xl font-semibold",    // 1.5rem (24px), 600 (Semi-bold)
        h4: "text-xl font-semibold",     // 1.25rem (20px)
        h5: "text-lg font-semibold",     // 1.125rem (18px)
        h6: "text-base font-semibold",   // 1rem (16px)
      },
      color: {
        default: "text-charcoal",
        primary: "text-deep-violet",
        secondary: "text-rich-lavender",
        accent: "text-gold",
        muted: "text-charcoal/70",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      level: "h2",
      color: "default",
      align: "left",
    },
  }
);

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, color, align, as, ...props }, ref) => {
    // Use the 'as' prop if provided, otherwise use the level
    const Component = as || level || 'h2';
    
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level: level || as, color, align, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
