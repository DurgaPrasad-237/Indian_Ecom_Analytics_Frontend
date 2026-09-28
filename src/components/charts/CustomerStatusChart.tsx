import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { ChartCard } from '@/components/common/ChartCard';
import { useFetch } from '@/hooks/useFetch';
import customerService from '@/services/customerService';

import type {
  CustomerChurnStatusPoint,
} from '@/types/customer';

import {
  CATEGORICAL_PALETTE,
  STATUS_COLORS,
} from '@/constants/chartTheme';

import { formatIndianNumber } from '@/utils/formatters';


/** GET /api/customer/churn — donut chart of customer status distribution. */
export function CustomerStatusChart() {

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<CustomerChurnStatusPoint[]>(() =>
    customerService.getCustomerChurn()
  );


  const points = data ?? [];


  console.log('Customer status:', points);


  return (
    <ChartCard
      title="Customer Status"
      description="Distribution of customers by lifecycle status"
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isEmpty={
        !isLoading &&
        !isError &&
        points.length === 0
      }
      onRetry={refetch}
    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <PieChart>

          <Pie
            data={points}
            dataKey="count"
            nameKey="customer_status"
            innerRadius="58%"
            outerRadius="85%"
            paddingAngle={2}
            strokeWidth={0}
          >

            {points.map((point, index) => (

              <Cell
                key={point.customer_status}
                fill={
                  STATUS_COLORS[point.customer_status] ??
                  CATEGORICAL_PALETTE[
                    index % CATEGORICAL_PALETTE.length
                  ]
                }
              />

            ))}

          </Pie>


          <Tooltip
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
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: 12,
            }}
          />

        </PieChart>

      </ResponsiveContainer>

    </ChartCard>
  );
}