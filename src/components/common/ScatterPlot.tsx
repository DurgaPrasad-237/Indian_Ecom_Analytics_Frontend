import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ScatterPoint {
  x: number;
  y: number;
  name?: string;
}

interface ScatterPlotProps {
  data: ScatterPoint[];
  xLabel?: string;
  yLabel?: string;
  xPrefix?: string;
  yPrefix?: string;
}

export function ScatterPlot({
  data,
  xLabel = 'X',
  yLabel = 'Y',
  xPrefix = '',
  yPrefix = '',
}: ScatterPlotProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 10,
          right: 20,
          bottom: 20,
          left: 10,
        }}
      >
        <CartesianGrid
          stroke="#EEF1F5"
          vertical
        />

        <XAxis
          type="number"
          dataKey="x"
          name={xLabel}
          tick={{ fontSize: 11 }}
          axisLine={{ stroke: '#EEF1F5' }}
          tickLine={false}
          tickFormatter={(value) =>
            `${xPrefix}${value.toLocaleString('en-IN')}`
          }
        />

        <YAxis
          type="number"
          dataKey="y"
          name={yLabel}
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) =>
            `${yPrefix}${value.toLocaleString('en-IN')}`
          }
        />

        <Tooltip
          cursor={{
            strokeDasharray: '3 3',
          }}
          contentStyle={{
            borderRadius: 8,
            borderColor: '#EEF1F5',
            fontSize: 12,
          }}
          formatter={(value: number, name: string) => [
            `${name === xLabel ? xPrefix : yPrefix}${value.toLocaleString(
              'en-IN'
            )}`,
            name,
          ]}
        />

        <Scatter
          name={yLabel}
          data={data}
          fill="#2864AD"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}