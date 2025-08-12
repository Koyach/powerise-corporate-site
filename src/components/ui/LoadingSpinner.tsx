import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export function LoadingScreen({ message = 'Loading...', className }: LoadingScreenProps) {
  return (
    <div className={cn(
      'flex min-h-screen items-center justify-center bg-gray-50',
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" className="text-blue-600" />
        {message && (
          <p className="text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
