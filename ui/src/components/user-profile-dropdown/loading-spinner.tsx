import React from 'react';
import { cn } from './utils';

export interface LoadingSpinnerProps {
  isMobile: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isMobile,
  className,
}) => {
  return (
    <div
      className={cn('adu relative', isMobile ? 'block' : 'hidden', className)}
    >
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-adu-popover-foreground/60">
        <div className="w-4 h-4 border-2 border-transparent border-t-adu-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
