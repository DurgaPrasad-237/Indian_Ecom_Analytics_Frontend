import { ChartCard } from '@/components/common/ChartCard';
import { ScatterPlot } from '@/components/common/ScatterPlot';
import { useFetch } from '@/hooks/useFetch';

import salesService from '@/services/salesService';

import type { ProductProfitabilityAnalysisResponse } from '@/types/sales';

export function DiscountVsProfitMargin() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<ProductProfitabilityAnalysisResponse>(() =>
    salesService.getDiscountVsProfitMargin()
  );

  console.log('Discount vs Profit Margin:', data);

  const scatterData = (data ?? []).map((item) => ({
    x: item.profit_margin,
    y: item.avg_discount,
    name: item.product_name,
  }));

  return (
    <ChartCard
      title="Discount vs Profit Margin"
      description="Relationship between average discount and profit margin"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={
        !isLoading &&
        !isError &&
        scatterData.length === 0
      }
      onRetry={refetch}
    >
      <ScatterPlot
        data={scatterData}
        xLabel="Profit Margin"
        yLabel="Average Discount"
      />
    </ChartCard>
  );
}