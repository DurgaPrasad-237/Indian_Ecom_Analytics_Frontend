import apiClient from './api';

const salesService = {
    getSalesKPIs: () => apiClient.get("/api/sales/sales-kpis").then((res)=>res.data),
    getTopProfitMargin: () => apiClient.get("/api/sales/top-profit-margin").then((res)=>res.data),
    getTopRevenue: () => apiClient.get("/api/sales/top-revenue").then((res)=>res.data),
    getTopProfit: () => apiClient.get("/api/sales/top-profit").then((res)=>res.data),
    getLowestProiftMargin: () => apiClient.get("/api/sales/lowest-profit-margin").then((res)=>res.data),
    getLossMakingOrderRate: () => apiClient.get("/api/sales/loss-making-order-rate").then((res)=>res.data),
    getDiscountVsProfitMargin: () => apiClient.get("/api/sales/discount-vs-profit-margin").then((res)=>res.data),
    getMonthlyProfitByYear: () => apiClient.get("/api/sales/monthly_profit_by_year").then((res)=>res.data),
    getMonthlyRevenueByYear: () => apiClient.get("/api/sales/monthly_revenue_by_year").then((res)=>res.data),
}   

export default salesService