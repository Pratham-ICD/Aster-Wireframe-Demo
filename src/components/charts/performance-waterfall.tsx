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
import { HealthKPI } from '@/types/dashboard';

interface PerformanceWaterfallProps {
  data: HealthKPI[];
}

export function PerformanceWaterfall({ data }: PerformanceWaterfallProps) {
  // Calculate performance gaps and sort by impact
  const gapData = data
    .map((kpi) => ({
      name:
        kpi.healthOutcome.length > 20
          ? kpi.healthOutcome.substring(0, 20) + '...'
          : kpi.healthOutcome,
      gap: kpi.percentage - kpi.target,
      current: kpi.percentage,
      target: kpi.target,
      patients: kpi.denominator,
      cohort: kpi.cohort,
      impact: Math.abs(kpi.percentage - kpi.target) * (kpi.denominator / 100), // Weighted impact
    }))
    .sort((a, b) => b.impact - a.impact) // Sort by highest impact first
    .slice(0, 8); // Show top 8 most impactful gaps

  // Create waterfall data with cumulative values
  let cumulativeGap = 0;
  const waterfallData = gapData.map((item) => {
    const startValue = cumulativeGap;
    cumulativeGap += item.gap;

    return {
      name: item.name,
      gap: item.gap,
      startValue,
      endValue: cumulativeGap,
      barHeight: Math.abs(item.gap),
      isPositive: item.gap >= 0,
      patients: item.patients,
      cohort: item.cohort,
      current: item.current,
      target: item.target,
    };
  });

  const getBarColor = (isPositive: boolean, index: number) => {
    if (isPositive) {
      return index % 2 === 0 ? '#10b981' : '#059669'; // Green variations for positive
    } else {
      return index % 2 === 0 ? '#ef4444' : '#dc2626'; // Red variations for negative
    }
  };

  const maxAbsValue = Math.max(
    ...waterfallData.map((d) => Math.abs(d.endValue)),
    ...waterfallData.map((d) => Math.abs(d.startValue))
  );

  return (
    <Card className='bg-gradient-to-br from-white via-emerald-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          📊 Performance Impact Waterfall
        </CardTitle>
        <div className='text-sm text-slate-600'>
          Cumulative impact of performance gaps • Sorted by weighted patient
          impact
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart
            data={waterfallData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              dataKey='name'
              stroke='#64748b'
              fontSize={11}
              tick={{ fill: '#64748b' }}
              angle={-45}
              textAnchor='end'
              height={80}
            />
            <YAxis
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Cumulative Gap (%)',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[-maxAbsValue * 1.1, maxAbsValue * 1.1]}
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
                          <span className='font-medium'>{data.cohort}</span>
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
                          <span>Patients Affected:</span>
                          <span className='font-medium'>
                            {data.patients.toLocaleString()}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Cumulative Impact:</span>
                          <span className='font-medium'>
                            {data.endValue.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey='barHeight' radius={[2, 2, 2, 2]}>
              {waterfallData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.isPositive, index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Statistics */}
        <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-emerald-50 p-3 rounded-lg text-center'>
            <div className='text-lg font-bold text-emerald-600'>
              +
              {waterfallData
                .filter((d) => d.isPositive)
                .reduce((sum, d) => sum + d.gap, 0)
                .toFixed(1)}
              %
            </div>
            <div className='text-xs text-emerald-700'>
              Total Positive Impact
            </div>
          </div>

          <div className='bg-red-50 p-3 rounded-lg text-center'>
            <div className='text-lg font-bold text-red-600'>
              {waterfallData
                .filter((d) => !d.isPositive)
                .reduce((sum, d) => sum + d.gap, 0)
                .toFixed(1)}
              %
            </div>
            <div className='text-xs text-red-700'>Total Negative Impact</div>
          </div>

          <div className='bg-blue-50 p-3 rounded-lg text-center'>
            <div className='text-lg font-bold text-blue-600'>
              {cumulativeGap.toFixed(1)}%
            </div>
            <div className='text-xs text-blue-700'>Net Cumulative Gap</div>
          </div>

          <div className='bg-purple-50 p-3 rounded-lg text-center'>
            <div className='text-lg font-bold text-purple-600'>
              {waterfallData
                .reduce((sum, d) => sum + d.patients, 0)
                .toLocaleString()}
            </div>
            <div className='text-xs text-purple-700'>
              Total Patients Affected
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className='mt-4 p-4 bg-slate-50 rounded-lg'>
          <h4 className='font-semibold text-slate-800 mb-2'>Key Insights</h4>
          <ul className='text-sm text-slate-600 space-y-1'>
            <li>• Highest impact gaps are prioritized for intervention</li>
            <li>• Patient volume weights the overall impact calculation</li>
            <li>• Cumulative effect shows net performance vs targets</li>
            <li>
              • Focus areas:{' '}
              {waterfallData
                .filter((d) => !d.isPositive)
                .slice(0, 2)
                .map((d) => d.cohort)
                .join(', ')}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
