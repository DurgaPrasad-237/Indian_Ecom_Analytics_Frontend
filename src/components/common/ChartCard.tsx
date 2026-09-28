import type { ReactNode } from 'react';
import clsx from 'clsx';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';

interface ChartCardProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  onRetry?: () => void;
  height?: number;
  /** Optional control rendered top-right of the card header, e.g. a dropdown filter. */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Standard container every chart on the dashboard is rendered inside of.
 * Centralizes the title/description header and the loading/error/empty
 * branching so individual chart components only need to render their chart.
 */
export function ChartCard({
  title,
  description,
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  onRetry,
  height = 300,
  action,
  className,
  children,
}: ChartCardProps) {
  return (
    <div className={clsx('card flex h-full flex-col p-5', className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-ink-500">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      {isLoading ? (
        <LoadingState height={height} />
      ) : isError ? (
        <ErrorState message={errorMessage} onRetry={onRetry} height={height} />
      ) : isEmpty ? (
        <EmptyState height={height} />
      ) : (
        <div style={{ height }}>{children}</div>
      )}
    </div>
  );
}
