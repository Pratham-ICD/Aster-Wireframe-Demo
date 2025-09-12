'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendData } from '@/types/dashboard';

interface TrendLineChartProps {
  data: TrendData[];
}

export function TrendLineChart({ data }: TrendLineChartProps) {
  return (
    <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          📅 6-Month Performance Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              dataKey='month'
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
              domain={['dataMin - 5', 'dataMax + 5']}
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
                name === 'performance' ? 'Current Performance' : 'Target',
              ]}
            />
            <Line
              type='monotone'
              dataKey='performance'
              stroke='#3b82f6'
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line
              type='monotone'
              dataKey='target'
              stroke='#94a3b8'
              strokeWidth={2}
              strokeDasharray='5 5'
              dot={{ fill: '#94a3b8', strokeWidth: 2, r: 4 }}
            />
            <ReferenceLine
              y={75}
              stroke='#ef4444'
              strokeDasharray='3 3'
              label='Target Line'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
