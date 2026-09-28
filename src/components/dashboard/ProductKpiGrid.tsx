import { CreditCard, ShoppingBag, UserMinus, Users } from 'lucide-react';
import { formatCurrencyINR, formatIndianNumber, formatPercent } from '@/utils/formatters';
import { KpiCard } from '@/components/common/KpiCard';
import { useFetch } from '@/hooks/useFetch';
import productService from '@/services/productService';

import type {
    TotalUnitsSoldResponse,
    TotalProductsResponse,
    ReturnUnitsResponse,
    AvgProductPriceResponse,
    AvgProductCostResponse
} from '@/types/product';

export function ProductKpiCard() {

    const totalunitssold = useFetch<TotalUnitsSoldResponse>(
        () => productService.getTotalUnitsSold()
    );

    const totalproducts = useFetch<TotalProductsResponse>(
        () => productService.getTotalProducts()
    );

    const returnunits = useFetch<ReturnUnitsResponse>(
        () => productService.getReturnUnits()
    );

    const avg_product_price = useFetch<AvgProductPriceResponse>(
        () => productService.getAvgProductPrice()
    );

    const avg_product_cost = useFetch<AvgProductCostResponse>(
        () => productService.getAvgProductCost()
    );


    

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            <KpiCard
                label="Total Units Sold"
                icon={ShoppingBag}
                accent="brand"
                isLoading={totalunitssold.isLoading}
                isError={totalunitssold.isError}
                value={
                    totalunitssold.data
                        ? formatIndianNumber(totalunitssold.data.Total_Units_Sold)
                        : null
                }
            />

            <KpiCard
                label="Total Products"
                icon={CreditCard}
                accent="brand"
                isLoading={totalproducts.isLoading}
                isError={totalproducts.isError}
                value={
                    totalproducts.data
                        ? String(totalproducts.data.Total_Products)
                        : null
                }
            />

            <KpiCard
                label="Returned Units"
                icon={CreditCard}
                accent="brand"
                isLoading={returnunits.isLoading}
                isError={returnunits.isError}
                value={
                    returnunits.data
                        ? String(returnunits.data.Returned_Units)
                        : null
                }
            />

            <KpiCard
                label="Avg Product Price"
                icon={Users}
                accent="brand"
                isLoading={avg_product_price.isLoading}
                isError={avg_product_price.isError}
                value={
                    avg_product_price.data
                        ? formatCurrencyINR(avg_product_price.data.Avg_Product_Price)
                        : null
                }
            />

            <KpiCard
                label="Average Product Cost"
                icon={CreditCard}
                accent="brand"
                isLoading={avg_product_cost.isLoading}
                isError={avg_product_cost.isError}
                value={
                    avg_product_cost.data
                        ? formatCurrencyINR(avg_product_cost.data.Avg_Product_Cost)
                        : null
                }
            />
        </div>
    );
}