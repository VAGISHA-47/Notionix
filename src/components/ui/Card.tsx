import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, glass = false, radius = 'lg', padding = 'md', children, ...props }, ref) => {
    const radiuses = {
      sm: 'rounded-apple-sm',
      md: 'rounded-apple-md',
      lg: 'rounded-apple-lg',
      xl: 'rounded-apple-xl',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const baseClass = cn(
      "border border-border bg-panel text-text shadow-premium transition-colors overflow-hidden",
      glass && "glass-panel bg-panel/70 backdrop-blur-md",
      radiuses[radius],
      paddings[padding],
      className
    );

    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ 
            y: -4, 
            boxShadow: 'var(--shadow)',
            borderColor: 'rgba(79, 70, 229, 0.2)' 
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(baseClass, "cursor-pointer")}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClass} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
