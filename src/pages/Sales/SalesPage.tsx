import { Package } from 'lucide-react';
import { ComingSoon } from '@/components/common/ComingSoon';
import { SalesKpiCard } from '@/components/dashboard/SaleKpiGrid';
import { TopProfitMarginChart } from '@/components/charts/TopProductsProfitMargin';
import { TopRevenueProducts } from '@/components/charts/TopRevenueProducts';
import { TopProductProfitChart } from '@/components/charts/TopProductProfitChart';
import { ProductLowestProfitMargin } from '@/components/charts/ProductLowestProfitMargin';
import { ProductLossMakingOrderRate } from '@/components/charts/ProductsLossMakingOrderRate';
import { DiscountVsProfitMargin } from '@/components/charts/DiscountVsProfitMargin';
import { MonthlyProfitByYear } from '@/components/charts/MonthlyProfitChart';
import { MonthlyRevenueByYear } from '@/components/charts/MonthlyRevenueChart';
import { AnalyticsAssistant } from '@/components/ai/AnalyticsAssistant';





export default function SalesPage() {
  return (
    <div className="space-y-8">
      <SalesKpiCard />

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <TopProfitMarginChart/>
      <TopRevenueProducts/>
      <TopProductProfitChart/>
    </div>

     <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ProductLowestProfitMargin/>
      <ProductLossMakingOrderRate/>
      <DiscountVsProfitMargin/>
     
    </div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <MonthlyProfitByYear/>
      <MonthlyRevenueByYear/>
    </div>

     <AnalyticsAssistant type="sales" />
     
    
    </div>
   
  );
}
