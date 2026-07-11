import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className,
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <motion.div
          animate={{
            backgroundColor: checked ? 'var(--primary)' : 'var(--border)',
          }}
          transition={{ duration: 0.2 }}
          className="w-12 h-7 rounded-full transition-colors flex items-center px-1"
        >
          <motion.div
            layout
            animate={{
              x: checked ? 20 : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="w-5 h-5 bg-white rounded-full shadow-md"
          />
        </motion.div>
      </div>
      {label && <span className="text-sm font-medium text-text">{label}</span>}
    </label>
  );
};
