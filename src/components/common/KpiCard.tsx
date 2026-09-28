import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface KpiTrend {
  /** Signed percentage change, e.g. 4.2 or -1.8. Only rendered if the API provides it. */
  value: number;
  label?: string;
}

interface KpiCardProps {
  label: string;
  value: string | null;
  icon: LucideIcon;
  isLoading?: boolean;
  isError?: boolean;
  trend?: KpiTrend | null;
  accent?: 'brand' | 'saffron' | 'positive' | 'negative';
}

const ACCENT_STYLES: Record<NonNullable<KpiCardProps['accent']>, string> = {
  brand: 'bg-brand-50 text-brand-700',
  saffron: 'bg-saffron-100 text-saffron-600',
  positive: 'bg-signal-positive-bg text-signal-positive',
  negative: 'bg-signal-negative-bg text-signal-negative',
};

/**
 * Displays a single KPI. Only ever renders values it was given — trend is optional
 * and omitted entirely when the API does not supply one (no invented percentages).
 */
export function KpiCard({
  label,
  value,
  icon: Icon,
  isLoading,
  isError,
  trend,
  accent = 'brand',
}: KpiCardProps) {
  return (
    <div className="card flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-500">{label}</span>
        <span className={clsx('flex h-8 w-8 items-center justify-center rounded-lg', ACCENT_STYLES[accent])}>
          <Icon size={16} strokeWidth={2} />
        </span>
      </div>

      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : isError ? (
        <span className="text-sm font-medium text-ink-400">—</span>
      ) : (
        <span className="tabular-nums text-kpi font-semibold text-ink-900">{value}</span>
      )}

      {trend && !isLoading && !isError && (
        <div
          className={clsx(
            'flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            trend.value >= 0 ? 'bg-signal-positive-bg text-signal-positive' : 'bg-signal-negative-bg text-signal-negative'
          )}
        >
          {trend.value >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span className="tabular-nums">{Math.abs(trend.value).toFixed(1)}%</span>
          {trend.label && <span className="font-normal text-ink-500">{trend.label}</span>}
        </div>
      )}
    </div>
  );
}
