export interface KpiCardResponse{
    Gross_Revenue: number,
    Gross_Profit: number,
    Profit_Margin: number,
    Refund_Amount: number,
    Net_Revenue: number,
    Total_Item_Cost: number
}

export interface ProductProfitabilityAnalysisPoint{
    product_name:string
    revenue:number
    profit:number
    item_cost:number
    avg_discount:number
    number_of_times_discount_applied:number
    profit_margin:number
    loss_making_order_rate:number
}

export type ProductProfitabilityAnalysisResponse = ProductProfitabilityAnalysisPoint[];

export interface MonthlyProfitByYearPoint {
  year: number;
  month: string;
  profit: number;
}

export type MonthlyProfitByYearResponse =
  MonthlyProfitByYearPoint[];


export interface MonthlyRevenueByYearPoint {
  year: number;
  month: string;
  item_revenue: number;
}

export type MonthlyRevenueByYearResponse =
  MonthlyRevenueByYearPoint[];