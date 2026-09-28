/**
 * Centralized chart color palette so every chart in the app stays visually consistent.
 * Keep this list short and deliberate — do not add colors ad hoc per chart.
 */
export const CHART_COLORS = {
  primary: '#255BA8',
  primaryMuted: '#93B8E8',
  accent: '#F0972A',
  positive: '#1A7F52',
  negative: '#C23B33',
  neutral: '#8593A8',
  grid: '#EEF1F5',
  axis: '#8593A8',
};

export const CATEGORICAL_PALETTE = [
  '#255BA8',
  '#F0972A',
  '#1A7F52',
  '#8593A8',
  '#93B8E8',
  '#C23B33',
];

export const GENDER_COLORS: Record<string, string> = {
  Male: '#255BA8',
  Female: '#F0972A',
  Other: '#8593A8',
  Unknown: '#B2BCCB',
};

export const STATUS_COLORS: Record<string, string> = {
  Active: '#1A7F52',
  Churned: '#C23B33',
  'At Risk': '#F0972A',
  New: '#255BA8',
  Dormant: '#8593A8',
};
