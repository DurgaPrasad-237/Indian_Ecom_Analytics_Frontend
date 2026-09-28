import { ProductKpiCard } from '@/components/dashboard/ProductKpiGrid';
import { TopProductsChart } from '@/components/charts/TopProductsSoldChart';
import {TopProductRevChart } from '@/components/charts/TopProductsRevChart'
import { UnitsSoldByCategoryChart } from '@/components/charts/UnitsSoldByCategoryChart';
import { PriceVsUnitsSoldChart } from '@/components/charts/PriceVsUnitSoldChart';
import { AnalyticsAssistant } from '@/components/ai/AnalyticsAssistant';


export default function ProductsPage() {

    return (
        <div className="space-y-8">

            <ProductKpiCard />

             <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <TopProductsChart />
                <TopProductRevChart/>

             </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <UnitsSoldByCategoryChart/>
                <PriceVsUnitsSoldChart/>
            </div>

            <AnalyticsAssistant type="product" />

        </div>
    );
}