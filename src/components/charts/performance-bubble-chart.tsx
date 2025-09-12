'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthKPI } from '@/types/dashboard';

interface PerformanceBubbleChartProps {
  data: HealthKPI[];
}

export function PerformanceBubbleChart({ data }: PerformanceBubbleChartProps) {
  // Transform data for bubble chart
  const bubbleData = data.map((kpi) => ({
    x: kpi.percentage, // Current performance
    y: kpi.target, // Target performance
    z: kpi.denominator, // Patient population size (bubble size)
    name:
      kpi.healthOutcome.length > 25
        ? kpi.healthOutcome.substring(0, 25) + '...'
        : kpi.healthOutcome,
    cohort: kpi.cohort,
    patients: kpi.denominator,
    current: kpi.percentage,
    target: kpi.target,
    gap: kpi.percentage - kpi.target,
    ratio: kpi.percentage / kpi.target,
  }));

  const getCohortColor = (cohort: string) => {
    const colors: { [key: string]: string } = {
      BMI: '#8b5cf6',
      Hypertension: '#ef4444',
      Diabetes: '#f59e0b',
      Kidney: '#06b6d4',
      Dialysis: '#84cc16',
      Urology: '#f97316',
      OBG: '#ec4899',
      'Iron Deficiency': '#6366f1',
    };
    return colors[cohort] || '#64748b';
  };

  // Custom dot component for variable bubble sizes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const size = Math.max(4, Math.min(20, payload.z / 50)); // Scale bubble size based on patient count
    const color = getCohortColor(payload.cohort);
    const opacity = payload.ratio >= 1 ? 0.8 : 0.6;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={size}
        fill={color}
        opacity={opacity}
        stroke={color}
        strokeWidth={2}
        className='hover:opacity-100 transition-opacity duration-200'
      />
    );
  };

  return (
    <Card className='bg-gradient-to-br from-white via-purple-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🫧 Performance vs Target Bubble Analysis
        </CardTitle>
        <div className='text-sm text-slate-600'>
          Bubble size = Patient population • Color = Cohort • Position =
          Performance vs Target
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <ScatterChart margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              type='number'
              dataKey='x'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Current Performance (%)',
                position: 'insideBottom',
                offset: -10,
              }}
              domain={[0, 100]}
            />
            <YAxis
              type='number'
              dataKey='y'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Target Performance (%)',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 8px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '12px',
              }}
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className='space-y-2'>
                      <div className='font-semibold text-slate-800 border-b pb-2'>
                        {data.name}
                      </div>
                      <div className='space-y-1 text-sm'>
                        <div className='flex justify-between'>
                          <span>Cohort:</span>
                          <span
                            className='font-medium'
                            style={{ color: getCohortColor(data.cohort) }}
                          >
                            {data.cohort}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Current:</span>
                          <span className='font-medium'>
                            {data.current.toFixed(1)}%
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Target:</span>
                          <span className='font-medium'>{data.target}%</span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Gap:</span>
                          <span
                            className={`font-medium ${
                              data.gap >= 0
                                ? 'text-emerald-600'
                                : 'text-red-600'
                            }`}
                          >
                            {data.gap >= 0 ? '+' : ''}
                            {data.gap.toFixed(1)}%
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Patients:</span>
                          <span className='font-medium'>
                            {data.patients.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name='KPIs' data={bubbleData} shape={<CustomDot />} />

            {/* Reference line for perfect performance */}
            <line
              x1={0}
              y1={0}
              x2={400}
              y2={400}
              stroke='#94a3b8'
              strokeDasharray='5 5'
              strokeWidth={1}
              opacity={0.5}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Cohort Legend */}
        <div className='mt-4 flex flex-wrap gap-3 justify-center'>
          {Array.from(new Set(data.map((d) => d.cohort))).map((cohort) => (
            <div key={cohort} className='flex items-center space-x-2 text-xs'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: getCohortColor(cohort) }}
              ></div>
              <span className='font-medium'>{cohort}</span>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div className='bg-emerald-50 p-3 rounded-lg'>
            <div className='font-semibold text-emerald-800'>Above Target</div>
            <div className='text-emerald-600'>
              {bubbleData.filter((d) => d.ratio >= 1).length} KPIs exceeding
              targets
            </div>
          </div>
          <div className='bg-amber-50 p-3 rounded-lg'>
            <div className='font-semibold text-amber-800'>Needs Attention</div>
            <div className='text-amber-600'>
              {bubbleData.filter((d) => d.ratio < 1 && d.ratio >= 0.8).length}{' '}
              KPIs close to target
            </div>
          </div>
          <div className='bg-red-50 p-3 rounded-lg'>
            <div className='font-semibold text-red-800'>Critical Gap</div>
            <div className='text-red-600'>
              {bubbleData.filter((d) => d.ratio < 0.8).length} KPIs
              significantly below target
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
