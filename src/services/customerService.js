import apiClient from './api';

/**
 * Service layer for all Customer Analytics endpoints.
 *
 * Every function here maps 1:1 to a FastAPI endpoint and returns the raw
 * JSON payload — no calculations happen in this file or anywhere in React.
 * Endpoints marked "PLACEHOLDER" are not yet confirmed on the backend;
 * update the path/params to match FastAPI once that route exists.
 */

const customerService = {
  // ---- KPI cards -----------------------------------------------------

  /** GET /api/customer/total_customers */
  getTotalCustomers: () => apiClient.get('/api/customer/total_customers').then((res) => res.data),

  /** GET /api/customer/churned_rate */
  getChurnRate: () => apiClient.get('/api/customer/churned_rate').then((res) => res.data),

  /** GET /api/customer/avg_cust_spend */
  getAverageCustomerSpend: () => apiClient.get('/api/customer/avg_cust_spend').then((res) => res.data),

  /** GET /api/customer/avg_order_value */
  getAverageOrderValue: () => apiClient.get('/api/customer/avg_order_value').then((res) => res.data),

  // ---- Signup charts ---------------------------------------------------

  /** GET /api/customer/monthly-signups */
  getMonthlySignups: () => apiClient.get('/api/customer/monthly-signups').then((res) => res.data),

  /** GET /api/customer/monthly-signups-gender */
  getMonthlySignupsGender: () =>
    apiClient.get('/api/customer/monthly-signups-gender').then((res) => res.data),

  /** GET /api/customer/signup-trend */
  getSignupTrend: () => apiClient.get('/api/customer/signup-trend').then((res) => res.data),

  // ---- Churn -------------------------------------------------------------

  /** GET /api/customer/churn */
  getCustomerChurn: () => apiClient.get('/api/customer/churn').then((res) => res.data),

  // ---- Segment analysis ---------------------------------------------------
  // PLACEHOLDER CONTRACT: the brief confirms GET /api/customer/customer_segment
  // exists; this wrapper passes the selected dropdown view as a `view` query
  // param so a single endpoint can branch server-side. If instead you expose
  // one dedicated route per view, swap the implementation below for the
  // commented per-view calls.
  /**
   * @param {'avg_spend_by_segment'|'total_spend_by_segment'|'count_by_segment'|'avg_vs_median_spend'|'spend_distribution'|'coefficient_of_variation'} view
   */
  getCustomerSegment: (view) =>
    apiClient.get('/api/customer/customer_segment', { params: { view } }).then((res) => res.data),

  // Alternative per-view endpoints (PLACEHOLDER — enable if your backend
  // prefers separate routes instead of a `view` query param):
  // getAvgSpendBySegment: () => apiClient.get('/api/customer/segment/avg-spend').then((res) => res.data),
  // getTotalSpendBySegment: () => apiClient.get('/api/customer/segment/total-spend').then((res) => res.data),
  // getCountBySegment: () => apiClient.get('/api/customer/segment/count').then((res) => res.data),
  // getAvgVsMedianSpend: () => apiClient.get('/api/customer/segment/avg-vs-median').then((res) => res.data),
  // getSpendDistribution: () => apiClient.get('/api/customer/segment/distribution').then((res) => res.data),
  // getCoefficientOfVariation: () => apiClient.get('/api/customer/segment/coefficient-of-variation').then((res) => res.data),
};

export default customerService;
