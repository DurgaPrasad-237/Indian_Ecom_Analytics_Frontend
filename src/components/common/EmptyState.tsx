import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
  height?: number;
}

/** Shown when an API call succeeds but returns no rows / zero records. */
export function EmptyState({
  title = 'No data available yet.',
  message = 'Once records exist for this range, they will appear here.',
  icon: Icon = Inbox,
  height = 260,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-ink-200 px-6 py-8 text-center"
      style={{ minHeight: height }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-400">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-ink-800">{title}</p>
        <p className="max-w-sm text-sm text-ink-500">{message}</p>
      </div>
    </div>
  );
}
