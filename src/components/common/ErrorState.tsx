import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  height?: number;
}

/** Standard error panel used whenever an API call fails. Never crashes the rest of the page. */
export function ErrorState({
  title = 'Unable to load this data.',
  message,
  onRetry,
  height = 260,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-signal-negative-bg bg-signal-negative-bg/40 px-6 py-8 text-center"
      style={{ minHeight: height }}
      role="alert"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-signal-negative">
        <AlertTriangle size={20} strokeWidth={2} />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        {message && <p className="max-w-sm text-sm text-ink-500">{message}</p>}
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <RotateCcw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}
