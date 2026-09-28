/**
 * Type contracts for the FastAPI customer-analytics endpoints.
 * Adjust field names here if your backend's JSON shape differs — this is the single
 * source of truth the rest of the frontend relies on.
 */

export interface TotalCustomersResponse {
  total_customers: number;
}

export interface ChurnRateResponse {
  churn_rate: number; // e.g. 53.46 meaning 53.46%
}

export interface AverageSpendResponse {
  average_customer_spend: number;
}

export interface AverageOrderValueResponse {
  average_order_value: number;
}

export interface MonthlySignupPoint {
  month: string; // e.g. "2024-01" or "Jan 2024"
  signups: number;
}

export interface MonthlySignupsGenderPoint {
  month: string;
  male: number;
  female: number;
  other?: number;
}

export interface SignupTrendResponse {
  customer_signup_year: number;
  month: string;
  count: number;
}

export interface SignupTrendPoint {
  month: string;
  "2023": number;
  "2024": number;
  "2025": number;
}

export interface CustomerChurnStatusPoint {
  customer_status: string;
  count: number;
}

export interface CustomerSegmentResponse {
  customer_segment: string;
  total_spend_mean: number;
  total_spend_median: number;
  total_spend_std: number;
  cust_count: number;
  total_sum: number;
  cv: number;
}

export interface CustomerSegmentValuePoint {
  segment: string;
  value: number;
}

export interface CustomerSegmentAvgMedianPoint {
  segment: string;
  average: number;
  median: number;
}

export interface CustomerSegmentCVPoint {
  segment: string;
  coefficient_of_variation: number;
}

export type CustomerSegmentApiResponse = CustomerSegmentResponse[];
export type MonthlySignupResponse = MonthlySignupPoint