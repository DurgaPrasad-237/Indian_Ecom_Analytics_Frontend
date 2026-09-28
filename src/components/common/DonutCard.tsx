import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface DonutChartProps {
  percentage: number;
  label?: string;
}

const VALUE_COLOR = '#2864AD';
const REMAINING_COLOR = '#E8EEF5';

export function DonutCard({
  percentage,
  label = 'Current rate',
}: DonutChartProps) {

  const safePercentage = Math.min(
    Math.max(percentage, 0),
    100
  );

  const data = [
    {
      name: 'Value',
      value: safePercentage,
    },
    {
      name: 'Remaining',
      value: 100 - safePercentage,
    },
  ];

  return (
    <div className="relative h-full w-full">

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={92}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            <Cell fill={VALUE_COLOR} />
            <Cell fill={REMAINING_COLOR} />
          </Pie>

        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

        <div className="text-center">

          <div className="text-[32px] font-bold tracking-tight text-ink-900">
            {safePercentage.toFixed(2)}%
          </div>

          <div className="mt-1 text-xs font-medium text-ink-500">
            {label}
          </div>

        </div>

      </div>

    </div>
  );
}