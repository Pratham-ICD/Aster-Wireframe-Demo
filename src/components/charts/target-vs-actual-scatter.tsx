'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TargetVsActualScatterProps {
  data: Array<{
    target: number;
    current: number;
    name: string;
    cohort: string;
  }>;
}

export function TargetVsActualScatter({ data }: TargetVsActualScatterProps) {
  return (
    <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎯 Target vs Current Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              type='number'
              dataKey='target'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Target Performance (%)',
                position: 'insideBottom',
                offset: -10,
              }}
              domain={[0, 100]}
            />
            <YAxis
              type='number'
              dataKey='current'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Current Performance (%)',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[0, 100]}
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
                name === 'current'
                  ? 'Current Performance'
                  : 'Target Performance',
              ]}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return [
                    `${payload[0].payload.name}`,
                    `Cohort: ${payload[0].payload.cohort}`,
                  ];
                }
                return label;
              }}
            />
            <Scatter name='KPIs' data={data} fill='#3b82f6' />
            <ReferenceLine
              segment={[
                { x: 0, y: 0 },
                { x: 100, y: 100 },
              ]}
              stroke='#ef4444'
              strokeDasharray='5 5'
              strokeWidth={2}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <div className='mt-4 text-sm text-slate-600'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 border-2 border-red-500 border-dashed rounded-sm'></div>
              <span>Perfect Performance Line</span>
            </div>
            <div className='text-xs text-slate-500'>
              Points above the line exceed targets, points below need
              improvement
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
