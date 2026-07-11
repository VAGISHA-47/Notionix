import React from 'react';
import { cn } from '../../utils';
import { AlertCircle, FileQuestion, RotateCcw } from 'lucide-react';
import { Button } from './Button';

// --- Skeleton Component ---
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-apple-md bg-border/60",
        className
      )}
      {...props}
    />
  );
};

// --- Empty State Component ---
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-apple-lg bg-panel/30", className)}>
      <div className="p-4 bg-border/20 rounded-full text-text-muted mb-4">
        {icon || <FileQuestion className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

// --- Error State Component ---
interface ErrorStateProps {
  title?: string;
  message: string;
  fullPage?: boolean;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  fullPage = false,
  onRetry,
  className,
}) => {
  const content = (
    <div className={cn("flex flex-col items-center justify-center text-center p-6 border border-danger/20 rounded-apple-lg bg-danger/5", className)}>
      <AlertCircle className="w-10 h-10 text-danger mb-3" />
      <h3 className="text-base font-semibold text-text mb-1">{title}</h3>
      <p className="text-xs text-text-muted max-w-xs mb-4 leading-normal">{message}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry} className="h-8 py-0 px-3 flex gap-1.5 items-center">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </Button>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-bg flex items-center justify-center p-4 z-50">
        <div className="max-w-md w-full">{content}</div>
      </div>
    );
  }

  return content;
};
