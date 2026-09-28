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
import customerService from '@/services/customerService';

import type {
  SignupTrendResponse,
  SignupTrendPoint,
} from '@/types/customer';

import { CHART_COLORS } from '@/constants/chartTheme';
import {
  formatCompactNumber,
  formatIndianNumber,
} from '@/utils/formatters';


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


export function SignupTrendChart() {

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<SignupTrendResponse[]>(() =>
    customerService.getSignupTrend()
  );


  /*
   * API gives 36 rows:
   *
   * 2023 January
   * 2023 February
   * ...
   * 2024 January
   * ...
   * 2025 December
   *
   * We convert them into 12 rows:
   *
   * January   -> 2023, 2024, 2025
   * February  -> 2023, 2024, 2025
   * ...
   */

  const points: SignupTrendPoint[] = MONTHS.map((month) => {

    const row: SignupTrendPoint = {
      month,
      "2023": 0,
      "2024": 0,
      "2025": 0,
    };

    (data ?? [])
      .filter((item) => item.month === month)
      .forEach((item) => {

        if (item.customer_signup_year === 2023) {
          row["2023"] = item.count;
        }

        if (item.customer_signup_year === 2024) {
          row["2024"] = item.count;
        }

        if (item.customer_signup_year === 2025) {
          row["2025"] = item.count;
        }

      });

    return row;
  });


  console.log("Signup trend API:", data);
  console.log("Signup trend chart data:", points);


  return (
    <ChartCard
      title="Year-wise Customer Signup Trend"
      description="Monthly customer signups compared across years"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={
        !isLoading &&
        !isError &&
        points.length === 0
      }
      onRetry={refetch}
      height={400}
    >

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={points}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >

          {/* Grid */}
          <CartesianGrid
            stroke={CHART_COLORS.grid}
            vertical={false}
          />


          {/* X Axis */}
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


          {/* Y Axis */}
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
            width={45}
          />


          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: '#EEF1F5',
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => [
              formatIndianNumber(value),
              name,
            ]}
          />


          {/* Legend */}
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              paddingBottom: 15,
              fontSize: 12,
            }}
          />


          {/* 2023 */}
          <Line
            type="monotone"
            dataKey="2023"
            name="2023"
            stroke="#E8B7AD"
            strokeWidth={2.25}
            dot={{
              r: 3,
              fill: '#E8B7AD',
              strokeWidth: 0,
            }}
            activeDot={{
              r: 5,
            }}
          />


          {/* 2024 */}
          <Line
            type="monotone"
            dataKey="2024"
            name="2024"
            stroke="#B66B9B"
            strokeWidth={2.25}
            dot={{
              r: 3,
              fill: '#B66B9B',
              strokeWidth: 0,
            }}
            activeDot={{
              r: 5,
            }}
          />


          {/* 2025 */}
          <Line
            type="monotone"
            dataKey="2025"
            name="2025"
            stroke="#33234A"
            strokeWidth={2.25}
            dot={{
              r: 3,
              fill: '#33234A',
              strokeWidth: 0,
            }}
            activeDot={{
              r: 5,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </ChartCard>
  );
}