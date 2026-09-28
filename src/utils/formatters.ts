/**
 * Formatting helpers used throughout the dashboard.
 * All values passed in must already come from the API — this module only formats, never invents data.
 */

/** Formats a number using the Indian numbering system, e.g. 2500000 -> "25,00,000". */
export function formatIndianNumber(value: number | null | undefined, fractionDigits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

/** Formats a value as Indian Rupees, e.g. 100031 -> "₹1,00,031". */
export function formatCurrencyINR(value: number | null | undefined, fractionDigits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

/** Formats a fraction (0-1) or a raw percentage number as a percentage string. */
export function formatPercent(value: number | null | undefined, opts?: { alreadyPercent?: boolean; fractionDigits?: number }): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const fractionDigits = opts?.fractionDigits ?? 2;
  const normalized = opts?.alreadyPercent ? value : value * 100;
  return `${normalized.toFixed(fractionDigits)}%`;
}

/** Compact number formatting for axis ticks, e.g. 12500 -> "12.5K". */
export function formatCompactNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Formats an ISO date string or Date into a short, readable label. */
export function formatShortDate(value: string | Date | null | undefined): string {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric' }).format(date);
}
