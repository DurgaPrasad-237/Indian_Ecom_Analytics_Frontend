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
import salesService from '@/services/salesService';

import type {
  ProductProfitabilityAnalysisPoint,
  ProductProfitabilityAnalysisResponse,
} from '@/types/sales';

import { CHART_COLORS } from '@/constants/chartTheme';

export function TopProductProfitChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<ProductProfitabilityAnalysisResponse>(() =>
    salesService.getTopProfit()
  );

  const points: ProductProfitabilityAnalysisPoint[] = data ?? [];

  return (
    <ChartCard
      title="Top Products by Profit"
      description="Products generating the highest profit"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={!isLoading && !isError && points.length === 0}
      onRetry={refetch}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={points}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 20, bottom: 0 }}
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
            tickFormatter={(value) =>
              `₹${value.toLocaleString('en-IN')}`
            }
          />

          <YAxis
            type="category"
            dataKey="product_name"
            tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
            axisLine={false}
            tickLine={false}
            width={120}
          />

          <Tooltip
            cursor={{ fill: 'rgba(37, 91, 168, 0.06)' }}
            contentStyle={{
              borderRadius: 8,
              borderColor: '#EEF1F5',
              fontSize: 12,
            }}
            formatter={(value: number) => [
              `₹${value.toLocaleString('en-IN')}`,
              'Profit',
            ]}
          />

          <Bar
            dataKey="profit"
            fill={CHART_COLORS.secondary}
            radius={[0, 4, 4, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}