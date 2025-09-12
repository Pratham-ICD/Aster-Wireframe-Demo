'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopKPIsChartProps {
  data: Array<{
    name: string;
    performance: number;
    cohort: string;
  }>;
}

export function TopKPIsChart({ data }: TopKPIsChartProps) {
  return (
    <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🏆 Top 5 Performing KPIs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart
            data={data}
            layout='horizontal'
            margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              type='number'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Performance (%)',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              type='category'
              dataKey='name'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value, name, props) => [
                `${Number(value).toFixed(1)}%`,
                'Performance',
                `Cohort: ${props.payload.cohort}`,
              ]}
            />
            <Bar dataKey='performance' fill='#10b981' radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
