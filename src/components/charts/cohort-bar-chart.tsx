'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CohortBarChartProps {
  data: Array<{
    cohort: string;
    performance: number;
    target: number;
  }>;
}

export function CohortBarChart({ data }: CohortBarChartProps) {
  const getBarColor = (performance: number, target: number) => {
    const ratio = performance / target;
    if (ratio >= 1.1) return '#10b981'; // emerald-500
    if (ratio >= 1.0) return '#3b82f6'; // blue-500
    if (ratio >= 0.8) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          📈 Performance by Cohort
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              dataKey='cohort'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
            />
            <YAxis
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Performance (%)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value, name) => [
                `${Number(value).toFixed(1)}%`,
                name === 'performance' ? 'Current' : 'Target',
              ]}
            />
            <Bar dataKey='performance' radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.performance, entry.target)}
                />
              ))}
            </Bar>
            <Bar
              dataKey='target'
              fill='#94a3b8'
              radius={[4, 4, 0, 0]}
              opacity={0.3}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
