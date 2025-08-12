import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  "font-semibold text-charcoal tracking-tight",
  {
    variants: {
      level: {
        h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl lg:text-4xl",
        h4: "text-xl md:text-2xl lg:text-3xl",
        h5: "text-lg md:text-xl lg:text-2xl",
        h6: "text-base md:text-lg lg:text-xl",
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
