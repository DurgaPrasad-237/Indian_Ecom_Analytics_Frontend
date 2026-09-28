import { Skeleton } from './Skeleton';

interface LoadingStateProps {
  /** Approximate height of the area being loaded, so layout doesn't jump. */
  height?: number;
  label?: string;
}

/** Skeleton placeholder shown while a chart, KPI, or table is fetching. */
export function LoadingState({ height = 260, label = 'Loading data…' }: LoadingStateProps) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{ minHeight: height }}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="flex-1 w-full" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
