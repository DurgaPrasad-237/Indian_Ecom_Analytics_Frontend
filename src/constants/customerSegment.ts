export type CustomerSegmentView =
  | 'avg_spend_by_segment'
  | 'total_spend_by_segment'
  | 'count_by_segment'
  | 'avg_vs_median_spend'
  | 'coefficient_of_variation';

export interface CustomerSegmentOption {
  value: CustomerSegmentView;
  label: string;
  /** Chart type used to render this view; informs the ChartCard which Recharts component to use. */
  chartType: 'bar' | 'grouped-bar' | 'boxplot-bar' | 'bar-variance';
}

export const CUSTOMER_SEGMENT_OPTIONS: CustomerSegmentOption[] = [
  { value: 'avg_spend_by_segment', label: 'Average Spend by Customer Segment', chartType: 'bar' },
  { value: 'total_spend_by_segment', label: 'Total Spending by Customer Segment', chartType: 'bar' },
  { value: 'count_by_segment', label: 'Customer Count by Segment', chartType: 'bar' },
  { value: 'avg_vs_median_spend', label: 'Average vs Median Spend', chartType: 'grouped-bar' },
  { value: 'coefficient_of_variation', label: 'Coefficient of Variation by Segment', chartType: 'bar-variance' },
];
