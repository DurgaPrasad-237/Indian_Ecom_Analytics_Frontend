import { ChartCard } from '@/components/common/ChartCard';
import { ScatterPlot } from '@/components/common/ScatterPlot';
import { useFetch } from '@/hooks/useFetch';

import productService from '@/services/productService';

import type { PriceUnitsSoldResponse } from '@/types/product';

export function PriceVsUnitsSoldChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<PriceUnitsSoldResponse>(() =>
    productService.getPriceVsUnitSold()
  );

  console.log('Price vs Units Sold:', data);

  const scatterData = (data ?? []).map((item) => ({
    x: item.price,
    y: item.units_sold,
    name: item.product_name,
  }));

  return (
    <ChartCard
      title="Price vs Units Sold"
      description="Relationship between product price and units sold"
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
        xLabel="Price"
        yLabel="Units Sold"
        xPrefix="₹"
      />
    </ChartCard>
  );
}