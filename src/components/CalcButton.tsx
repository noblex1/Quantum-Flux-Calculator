import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'relative select-none font-mono font-bold text-lg transition-all duration-200 active:scale-95 overflow-hidden group',
  {
    variants: {
      variant: {
        number: [
          'bg-glass-bg/60 hover:bg-glass-bg/80',
          'border border-glass-border/50 hover:border-neon-cyan/50',
          'text-foreground hover:text-neon-cyan',
          'shadow-md hover:shadow-neon/50',
          'backdrop-blur-sm',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon-cyan/10 before:to-neon-purple/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity'
        ],
        operator: [
          'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20',
          'border border-neon-purple/50 hover:border-neon-purple',
          'text-neon-purple hover:text-neon-pink',
          'shadow-purple/30 hover:shadow-purple',
          'backdrop-blur-sm',
          'hover:animate-glow-expand'
        ],
        equals: [
          'bg-gradient-primary',
          'border border-neon-cyan',
          'text-primary-foreground',
          'shadow-neon/50 hover:shadow-neon',
          'animate-neon-pulse',
          'font-extrabold'
        ],
        secondary: [
          'bg-muted/50 hover:bg-muted/70',
          'border border-border hover:border-muted-foreground/50',
          'text-muted-foreground hover:text-foreground',
          'backdrop-blur-sm'
        ]
      },
      size: {
        default: 'h-16 px-4 rounded-xl',
        lg: 'h-20 px-6 rounded-xl text-xl'
      }
    },
    defaultVariants: {
      variant: 'number',
      size: 'default'
    }
  }
);

interface CalcButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const CalcButton = forwardRef<HTMLButtonElement, CalcButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 rounded-xl"></div>
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-neon-cyan/20 transition-opacity duration-150"></div>
      </button>
    );
  }
);

CalcButton.displayName = 'CalcButton';

export { CalcButton, buttonVariants };