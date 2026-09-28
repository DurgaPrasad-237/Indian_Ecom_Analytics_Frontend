import { useMemo, useState } from 'react';

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
import { SelectFilter } from '@/components/common/SelectFilter';
import { useFetch } from '@/hooks/useFetch';
import customerService from '@/services/customerService';

import {
  CUSTOMER_SEGMENT_OPTIONS,
  type CustomerSegmentView,
} from '@/constants/customerSegment';

import {
  CATEGORICAL_PALETTE,
  CHART_COLORS,
} from '@/constants/chartTheme';

import {
  formatCompactNumber,
  formatCurrencyINR,
  formatIndianNumber,
  formatPercent,
} from '@/utils/formatters';

import type {
  CustomerSegmentApiResponse,
} from '@/types/customer';


const CURRENCY_VIEWS: CustomerSegmentView[] = [
  'avg_spend_by_segment',
  'total_spend_by_segment',
  'avg_vs_median_spend',
];


export function CustomerSegmentChart() {

  const [view, setView] =
    useState<CustomerSegmentView>(
      CUSTOMER_SEGMENT_OPTIONS[0].value
    );


  const activeOption =
    CUSTOMER_SEGMENT_OPTIONS.find(
      (option) => option.value === view
    )!;


  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<CustomerSegmentApiResponse>(
    () => customerService.getCustomerSegment(view),
    [view]
  );


  console.log('Customer segment API:', data);


  /*
   * Convert backend response into the structure
   * required by the selected chart.
   */
  const points = useMemo(() => {

    if (!data) {
      return [];
    }


    // Average Spend
    if (view === 'avg_spend_by_segment') {

      return data.map((item) => ({
        segment: item.customer_segment,
        value: item.total_spend_mean,
      }));

    }


    // Total Spending
    if (view === 'total_spend_by_segment') {

      return data.map((item) => ({
        segment: item.customer_segment,
        value: item.total_sum,
      }));

    }


    // Customer Count
    if (view === 'count_by_segment') {

      return data.map((item) => ({
        segment: item.customer_segment,
        value: item.cust_count,
      }));

    }


    // Average vs Median
    if (view === 'avg_vs_median_spend') {

      return data.map((item) => ({
        segment: item.customer_segment,
        average: item.total_spend_mean,
        median: item.total_spend_median,
      }));

    }


    // Coefficient of Variation
    if (view === 'coefficient_of_variation') {

      return data.map((item) => ({
        segment: item.customer_segment,
        coefficient_of_variation: item.cv,
      }));

    }


    return [];

  }, [data, view]);


  /*
   * Currency formatting
   */
  const valueFormatter = (value: number) => {

    if (CURRENCY_VIEWS.includes(view)) {
      return formatCurrencyINR(value);
    }

    if (view === 'coefficient_of_variation') {
      return formatPercent(value, {
        alreadyPercent: true,
      });
    }

    return formatIndianNumber(value);
  };


  /*
   * Y-axis formatting
   */
  const axisFormatter = (value: number) => {

    if (CURRENCY_VIEWS.includes(view)) {
      return formatCompactNumber(value);
    }

    if (view === 'coefficient_of_variation') {
      return `${value}%`;
    }

    return formatCompactNumber(value);
  };


  return (
    <ChartCard

      title="Customer Segment Analysis"

      description={activeOption.label}

      isLoading={isLoading}

      isError={isError}

      errorMessage={error?.message}

      isEmpty={
        !isLoading &&
        !isError &&
        points.length === 0
      }

      onRetry={refetch}


      action={

        <SelectFilter

          label="Segment analysis view"

          value={view}

          onChange={(next) =>
            setView(next as CustomerSegmentView)
          }

          options={
            CUSTOMER_SEGMENT_OPTIONS.map(
              ({ value, label }) => ({
                value,
                label,
              })
            )
          }

        />

      }

    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart
          data={points}
          margin={{
            top: 20,
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

            dataKey="segment"

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

            tickFormatter={axisFormatter}

            width={55}

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
              valueFormatter(value)
            }

          />


          {/* Average vs Median */}

          {view === 'avg_vs_median_spend' && (

            <>

              <Legend
                wrapperStyle={{
                  fontSize: 12,
                }}
                iconType="circle"
                iconSize={8}
              />

              <Bar
                dataKey="average"
                name="Average"
                fill={CHART_COLORS.primary}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />

              <Bar
                dataKey="median"
                name="Median"
                fill={CHART_COLORS.accent}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />

            </>

          )}


          {/* Average Spend */}

          {view === 'avg_spend_by_segment' && (

            <Bar
              dataKey="value"
              name="Average Spend"
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />

          )}


          {/* Total Spend */}

          {view === 'total_spend_by_segment' && (

            <Bar
              dataKey="value"
              name="Total Spending"
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />

          )}


          {/* Customer Count */}

          {view === 'count_by_segment' && (

            <Bar
              dataKey="value"
              name="Customer Count"
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />

          )}


          {/* Coefficient of Variation */}

          {view === 'coefficient_of_variation' && (

            <Bar
              dataKey="coefficient_of_variation"
              name="Coefficient of Variation"
              fill={CHART_COLORS.accent}
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />

          )}

        </BarChart>

      </ResponsiveContainer>

    </ChartCard>
  );
}