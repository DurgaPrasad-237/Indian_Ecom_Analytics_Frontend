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

import type { TopProductRevResponse } from '@/types/product';

import { CHART_COLORS } from '@/constants/chartTheme';
import {
  formatCompactNumber,
  formatIndianNumber,
} from '@/utils/formatters';

export function TopProductRevChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<TopProductRevResponse>(() =>
    productService.getTop10RevProducts()
  );

  console.log('Top revenue products:', data);

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const product = payload[0].payload;

    return (
        <div
        style={{
            background: '#fff',
            border: '1px solid #EEF1F5',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 12,
        }}
        >
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {product.product_name}
        </div>

        <div>
            Revenue: ₹{formatIndianNumber(product.revenue)}
        </div>

        <div>
            Unit Price: ₹{formatIndianNumber(product.price)}
        </div>
        </div>
    );
};

  return (
    <ChartCard
      title="Top 10 Revenue-Generating Products"
      description="Products ranked by total revenue"
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
            width={170}
            tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
            axisLine={false}
            tickLine={false}
          />

     <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="revenue"
            fill={CHART_COLORS.primary}
            radius={[0, 4, 4, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}