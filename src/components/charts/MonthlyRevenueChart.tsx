import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/common/ChartCard';
import { useFetch } from '@/hooks/useFetch';
import salesService from '@/services/salesService';

import type {
  MonthlyRevenueByYearPoint,
  MonthlyRevenueByYearResponse,
} from '@/types/sales';

import { CHART_COLORS } from '@/constants/chartTheme';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const YEAR_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.positive,
  CHART_COLORS.secondary,
];

export function MonthlyRevenueByYear() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<MonthlyRevenueByYearResponse>(() =>
    salesService.getMonthlyRevenueByYear()
  );

  const points: MonthlyRevenueByYearPoint[] = data ?? [];

  // Get available years
  const years = [...new Set(points.map((item) => item.year))].sort();

  // Convert API data into:
  // [
  //   {
  //     month: "January",
  //     "2023": 100000,
  //     "2024": 200000
  //   }
  // ]
  const chartData = MONTHS.map((month) => {
    const row: Record<string, string | number | null> = {
      month,
    };

    years.forEach((year) => {
      const item = points.find(
        (point) =>
          point.year === year &&
          point.month === month
      );

      row[String(year)] = item?.item_revenue ?? null;
    });

    return row;
  });

  const formatProfit = (value: number) => {
    const crore = value / 10_000_000;

    if (crore >= 1) {
      return `₹${crore.toFixed(1)} Cr`;
    }

    const lakh = value / 100_000;

    if (lakh >= 1) {
      return `₹${lakh.toFixed(1)} L`;
    }

    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <ChartCard
      title="Monthly Revenue by Year"
      description="Monthly Revenue comparison across years"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={
        !isLoading &&
        !isError &&
        chartData.length === 0
      }
      onRetry={refetch}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 8,
            right: 16,
            left: 8,
            bottom: 8,
          }}
        >
          <CartesianGrid
            stroke={CHART_COLORS.grid}
            vertical={true}
          />

          <XAxis
            dataKey="month"
            tick={{
              fontSize: 11,
              fill: CHART_COLORS.axis,
            }}
            axisLine={{
              stroke: CHART_COLORS.grid,
            }}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={55}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: CHART_COLORS.axis,
            }}
            axisLine={false}
            tickLine={false}
            width={55}
            tickFormatter={(value) =>
              formatProfit(value)
            }
          />

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: CHART_COLORS.grid,
              fontSize: 12,
            }}
            labelStyle={{
              fontWeight: 600,
              marginBottom: 4,
            }}
            formatter={(value: number, name: string) => [
              formatProfit(value),
              name,
            ]}
          />

          <Legend
            verticalAlign="top"
            align="left"
            height={30}
            iconType="line"
            wrapperStyle={{
              fontSize: 12,
            }}
          />

          {years.map((year, index) => (
            <Line
              key={year}
              type="monotone"
              dataKey={String(year)}
              name={String(year)}
              stroke={
                YEAR_COLORS[
                  index % YEAR_COLORS.length
                ]
              }
              strokeWidth={2}
              dot={{
                r: 3,
              }}
              activeDot={{
                r: 5,
              }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}