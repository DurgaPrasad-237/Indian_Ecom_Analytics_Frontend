import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/common/ChartCard';
import { useFetch } from '@/hooks/useFetch';
import productService from '@/services/productService';

import type { TopProductsResponse } from '@/types/product';

import { CHART_COLORS } from '@/constants/chartTheme';
import {
  formatCompactNumber,
  formatIndianNumber,
} from '@/utils/formatters';

export function TopProductsChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<TopProductsResponse>(() =>
    productService.getTop10ProductsSold()
  );

  console.log('Top products data:', data);

  return (
    <ChartCard
      title="Top 10 Most Sold Products"
      description="Products ranked by total units sold"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={!isLoading && !isError && (!data || data.length === 0)}
      onRetry={refetch}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data ?? []}
          layout="vertical"
          margin={{ top: 4, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid
            stroke={CHART_COLORS.grid}
            horizontal={false}
          />

          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
            axisLine={{ stroke: CHART_COLORS.grid }}
            tickLine={false}
            tickFormatter={(value) => formatCompactNumber(value)}
          />

          <YAxis
            type="category"
            dataKey="product_name"
            width={160}
            tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: 'rgba(37, 91, 168, 0.06)' }}
            contentStyle={{
              borderRadius: 8,
              borderColor: '#EEF1F5',
              fontSize: 12,
            }}
            formatter={(value: number) => [
              formatIndianNumber(value),
              'Units Sold',
            ]}
          />

          <Bar
            dataKey="units_sold"
            fill={CHART_COLORS.primary}
            radius={[0, 4, 4, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}