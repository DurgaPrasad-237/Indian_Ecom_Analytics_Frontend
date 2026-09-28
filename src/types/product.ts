
export interface TotalUnitsSoldResponse {
    Total_Units_Sold:number
}

export interface TotalProductsResponse{
    Total_Products:number
}

export interface ReturnUnitsResponse{
    Returned_Units:number
}

export interface AvgProductPriceResponse{
    Avg_Product_Price:number
}

export interface AvgProductCostResponse{
    Avg_Product_Cost:number
}

export interface TopProductPoint {
  product_name: string;
  units_sold: number;
}

export type TopProductsResponse = TopProductPoint[];


export interface TopProductRevPoint{
    product_name:string;
    revenue:number;
    price:number
}

export type TopProductRevResponse = TopProductRevPoint[];

export interface TopCategoryPoint {
  category: string;
  units_sold: number;
}

export type TopCategoryResponse = TopCategoryPoint[];

export interface PriceUnitsSoldPoint {
  product_name: string;
  price: number;
  units_sold: number;
}

export type PriceUnitsSoldResponse = PriceUnitsSoldPoint[];