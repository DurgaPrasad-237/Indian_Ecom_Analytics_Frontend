import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { Skeleton } from './Skeleton';

interface SideMetric {
  label: string;
  value: string | null;
  icon?: LucideIcon;
}

interface KpiDonutCardProps {
  label: string;
  value: number | null;
  sideMetrics: SideMetric[];
  isLoading?: boolean;
  isError?: boolean;
  accent?: 'brand' | 'saffron' | 'positive' | 'negative';
}

const ACCENT_STYLES: Record<
  NonNullable<KpiDonutCardProps['accent']>,
  {
    ring: string;
    icon: string;
  }
> = {
  brand: {
    ring: 'text-brand-600',
    icon: 'bg-brand-50 text-brand-700',
  },
  saffron: {
    ring: 'text-saffron-500',
    icon: 'bg-saffron-100 text-saffron-600',
  },
  positive: {
    ring: 'text-signal-positive',
    icon: 'bg-signal-positive-bg text-signal-positive',
  },
  negative: {
    ring: 'text-signal-negative',
    icon: 'bg-signal-negative-bg text-signal-negative',
  },
};

export function KpiDonutCard({
  label,
  value,
  sideMetrics,
  isLoading,
  isError,
  accent = 'positive',
}: KpiDonutCardProps) {
  const percentage = Math.min(Math.max(value ?? 0, 0), 100);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="card flex items-center gap-8 p-6">
      
      {/* Donut */}
      <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
        {isLoading ? (
          <Skeleton className="h-40 w-40 rounded-full" />
        ) : isError || value === null ? (
          <div className="text-2xl font-semibold text-ink-400">
            —
          </div>
        ) : (
          <>
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 120 120"
            >
              {/* Background ring */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-ink-100"
              />

              {/* Progress ring */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={clsx(
                  'transition-all duration-500',
                  ACCENT_STYLES[accent].ring
                )}
              />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="tabular-nums text-2xl font-bold text-ink-900">
                {percentage.toFixed(1)}%
              </span>

              <span className="mt-1 text-xs font-medium text-ink-500">
                {label}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Side metrics */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {sideMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-ink-100 p-4"
            >
              <div className="flex items-center gap-2">
                {Icon && (
                  <span
                    className={clsx(
                      'flex h-7 w-7 items-center justify-center rounded-lg',
                      ACCENT_STYLES[accent].icon
                    )}
                  >
                    <Icon size={14} />
                  </span>
                )}

                <span className="text-sm font-medium text-ink-500">
                  {metric.label}
                </span>
              </div>

              <div className="mt-2">
                {isLoading ? (
                  <Skeleton className="h-7 w-24" />
                ) : isError ? (
                  <span className="text-sm text-ink-400">—</span>
                ) : (
                  <span className="tabular-nums text-xl font-semibold text-ink-900">
                    {metric.value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}