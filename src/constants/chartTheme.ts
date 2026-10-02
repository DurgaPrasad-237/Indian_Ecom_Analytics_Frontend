/**
 * Centralized chart color palette so every chart in the app stays visually consistent.
 * Keep this list short and deliberate — do not add colors ad hoc per chart.
 */
export const CHART_COLORS = {
  primary: '#255BA8',
  primaryMuted: '#93B8E8',

  secondary: '#6C63A8',
  secondaryMuted: '#B8B3D9',

  accent: '#F0972A',
  accentMuted: '#F6C98F',

  blue: '#3B82F6',
  purple: '#8B5CF6',
  teal: '#0F9D8A',
  cyan: '#06B6D4',
  orange: '#F97316',
  yellow: '#EAB308',
  pink: '#EC4899',
  indigo: '#6366F1',

  positive: '#1A7F52',
  negative: '#C23B33',
  warning: '#D97706',
  neutral: '#8593A8',

  grid: '#EEF1F5',
  axis: '#8593A8',
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',

  text: '#1F2937',
  textMuted: '#6B7280',

  series: [
    '#255BA8',
    '#F0972A',
    '#1A7F52',
    '#6C63A8',
    '#0F9D8A',
    '#EC4899',
    '#8B5CF6',
    '#06B6D4',
    '#D97706',
    '#6366F1',
  ],
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
