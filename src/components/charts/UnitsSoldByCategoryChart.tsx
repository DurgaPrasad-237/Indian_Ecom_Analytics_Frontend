import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import { ChartCard } from '@/components/common/ChartCard';
import { useFetch } from '@/hooks/useFetch';
import productService from '@/services/productService';

import type { TopCategoryResponse } from '@/types/product';

import { formatIndianNumber } from '@/utils/formatters';

const CATEGORY_COLORS = [
  '#2563EB', // Blue
  '#F97316', // Orange
  '#10B981', // Green
  '#8B5CF6', // Purple
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#EAB308', // Yellow
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#6366F1', // Indigo
];

export function UnitsSoldByCategoryChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<TopCategoryResponse>(() =>
    productService.getTop10CategoriesSold()
  );

  console.log('Units sold by category:', data);

  return (
    <ChartCard
      title="Units Sold by Category"
      description="Distribution of units sold across product categories"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={!isLoading && !isError && (!data || data.length === 0)}
      onRetry={refetch}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data ?? []}
            dataKey="units_sold"
            nameKey="category"
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={2}
            stroke="none"
          >
            {(data ?? []).map((_, index) => (
              <Cell
                key={`category-${index}`}
                fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number) => [
              formatIndianNumber(value),
              'Units Sold',
            ]}
          />

          <Legend
            verticalAlign="bottom"
            height={40}
            iconType="circle"
            wrapperStyle={{
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}