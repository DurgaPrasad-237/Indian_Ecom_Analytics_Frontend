import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/common/ChartCard';
import { useFetch } from '@/hooks/useFetch';
import customerService from '@/services/customerService';

import type {
  MonthlySignupsGenderPoint,
  MonthlySignupsGenderResponse,
} from '@/types/customer';

import {
  CHART_COLORS,
  GENDER_COLORS,
} from '@/constants/chartTheme';

import {
  formatCompactNumber,
  formatIndianNumber,
} from '@/utils/formatters';

/**
 * GET /api/customer/monthly-signups-gender
 * Grouped bar chart of signups split by gender.
 */
export function SignupsByGenderChart() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<MonthlySignupsGenderResponse>(() =>
  customerService.getMonthlySignupsGender()
);

  console.log('monthly signup gender data', data);

const points: MonthlySignupsGenderPoint[] = Object.values(
  (data ?? []).reduce(
    (acc, item) => {
      if (!acc[item.customer_signup_month]) {
        acc[item.customer_signup_month] = {
          customer_signup_month: item.customer_signup_month,
          male: 0,
          female: 0,
          other: 0,
        };
      }

      if (item.gender === 'Male') {
        acc[item.customer_signup_month].male = item.count;
      }

      if (item.gender === 'Female') {
        acc[item.customer_signup_month].female = item.count;
      }

      if (item.gender === 'Other') {
        acc[item.customer_signup_month].other = item.count;
      }

      return acc;
    },
    {} as Record<string, MonthlySignupsGenderPoint>
  )
);

  const hasOther = points.some(
    (point) => (point.other ?? 0) > 0
  );

  return (
    <ChartCard
      title="Customer Signups by Gender"
      description="Monthly signups split by gender"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={!isLoading && !isError && points.length === 0}
      onRetry={refetch}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={points}
          margin={{
            top: 4,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke={CHART_COLORS.grid}
            vertical={false}
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
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: CHART_COLORS.axis,
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              formatCompactNumber(value)
            }
            width={40}
          />

          <Tooltip
            cursor={{
              fill: 'rgba(37, 91, 168, 0.06)',
            }}
            contentStyle={{
              borderRadius: 8,
              borderColor: '#EEF1F5',
              fontSize: 12,
            }}
            formatter={(value: number) =>
              formatIndianNumber(value)
            }
          />

          <Legend
            wrapperStyle={{ fontSize: 12 }}
            iconType="circle"
            iconSize={8}
          />

          <Bar
            dataKey="male"
            name="Male"
            fill={GENDER_COLORS.Male}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />

          <Bar
            dataKey="female"
            name="Female"
            fill={GENDER_COLORS.Female}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />

          {hasOther && (
            <Bar
              dataKey="other"
              name="Other"
              fill={GENDER_COLORS.Other}
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}