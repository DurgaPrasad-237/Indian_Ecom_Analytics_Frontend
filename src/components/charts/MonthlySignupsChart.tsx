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
import customerService from '@/services/customerService';

import type {
  MonthlySignupPoint,
  MonthlySignupResponse,
} from '@/types/customer';

import { CHART_COLORS } from '@/constants/chartTheme';
import {
  formatCompactNumber,
  formatIndianNumber,
} from '@/utils/formatters';

/** GET /api/customer/monthly-signups — bar chart of new customer signups per month. */
export function MonthlySignupsChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<MonthlySignupResponse[]>(() =>
    customerService.getMonthlySignups()
  );

  console.log("this is monthly signup chart file", data);

  const points: MonthlySignupPoint[] = (data ?? []).map((item) => ({
    customer_signup_month: item.customer_signup_month,
    count: item.count,
  }));

  return (
    <ChartCard
      title="Monthly Customer Signups"
      description="New customers acquired per month"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={!isLoading && !isError && points.length === 0}
      onRetry={refetch}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={points}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke={CHART_COLORS.grid}
            vertical={false}
          />

          <XAxis
            dataKey="customer_signup_month"
            tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
            axisLine={{ stroke: CHART_COLORS.grid }}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatCompactNumber(value)}
            width={40}
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
              'Signups',
            ]}
          />

          <Bar
            dataKey="count"
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}