import React from 'react';
import { cn } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, icon, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-muted select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-text-muted pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            id={id}
            type={type}
            ref={ref}
            className={cn(
              "w-full bg-panel text-text border border-border rounded-apple-md h-11 transition-all duration-200 outline-none shadow-sm",
              "focus:border-brand/80 focus:ring-[3px] focus:ring-brand/15 focus:shadow-md",
              "placeholder:text-text-muted/60 disabled:opacity-50 disabled:bg-bg-light/30",
              icon ? "pl-11 pr-4" : "px-4",
              error && "border-danger focus:border-danger focus:ring-danger/15",
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-muted select-none">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "w-full bg-panel text-text border border-border rounded-apple-md p-4 min-h-[100px] transition-all duration-200 outline-none shadow-sm",
            "focus:border-brand/80 focus:ring-[3px] focus:ring-brand/15 focus:shadow-md",
            "placeholder:text-text-muted/60 disabled:opacity-50 disabled:bg-bg-light/30",
            error && "border-danger focus:border-danger focus:ring-danger/15",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
