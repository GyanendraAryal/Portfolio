import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ className, variant = 'default', size = 'default', children, isLoading, disabled, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-white text-black hover:bg-white/90 shadow-sm',
    accent: 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20',
    outline: 'border border-border bg-transparent hover:bg-surface-hover text-primary',
    ghost: 'hover:bg-surface-hover text-primary',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;