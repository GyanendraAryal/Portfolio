import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, onClick, variant = 'primary', className, disabled, type = 'button', ...props }) => {
  const baseClasses = 'px-6 py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/80',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    ghost: 'text-text hover:text-accent hover:bg-surface',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;