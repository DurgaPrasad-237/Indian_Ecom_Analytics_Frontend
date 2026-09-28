import apiClient from './api';

const productService = {

    getTotalUnitsSold: () => apiClient.get("/api/products/total_units_sold").then((res)=>res.data),
    getTotalProducts: () => apiClient.get("/api/products/total_products").then((res)=>res.data),
    getReturnUnits: () => apiClient.get("/api/products/return_units").then((res)=>res.data),
    getAvgProductPrice: () => apiClient.get("/api/products/avg_product_price").then((res)=>res.data),
    getAvgProductCost: () => apiClient.get("/api/products/avg_product_cost").then((res)=>res.data),
    getTop10ProductsSold: () => apiClient.get("/api/products/top_10_products_sold").then((res)=>res.data),
    getTop10RevProducts: () => apiClient.get("/api/products/top_10_rev_products").then((res)=>res.data),
    getTop10CategoriesSold: () => apiClient.get("/api/products/top_10_categories_sold").then((res)=>res.data),
    getPriceVsUnitSold: () => apiClient.get("/api/products/price_vs_unitsSold").then((res)=>res.data),


}

export default productService;