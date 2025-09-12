'use client';

import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdvancedTrendAnalysisProps {
  data?: unknown[];
}

export function AdvancedTrendAnalysis({}: AdvancedTrendAnalysisProps) {
  // Generate more sophisticated trend data with multiple metrics
  const trendData = [
    {
      period: 'Jan 2024',
      overallPerformance: 72.5,
      targetAchievement: 85.2,
      patientVolume: 5890,
      criticalKPIs: 6,
      excellentKPIs: 8,
      averageGap: -2.5,
      benchmarkRatio: 104.2,
      qualityScore: 78.3,
    },
    {
      period: 'Feb 2024',
      overallPerformance: 74.8,
      targetAchievement: 87.6,
      patientVolume: 6120,
      criticalKPIs: 5,
      excellentKPIs: 9,
      averageGap: -1.8,
      benchmarkRatio: 106.1,
      qualityScore: 81.2,
    },
    {
      period: 'Mar 2024',
      overallPerformance: 76.2,
      targetAchievement: 89.1,
      patientVolume: 6350,
      criticalKPIs: 4,
      excellentKPIs: 11,
      averageGap: -0.9,
      benchmarkRatio: 108.7,
      qualityScore: 83.6,
    },
    {
      period: 'Apr 2024',
      overallPerformance: 75.8,
      targetAchievement: 88.7,
      patientVolume: 6180,
      criticalKPIs: 4,
      excellentKPIs: 10,
      averageGap: -1.2,
      benchmarkRatio: 107.9,
      qualityScore: 82.8,
    },
    {
      period: 'May 2024',
      overallPerformance: 78.9,
      targetAchievement: 92.3,
      patientVolume: 6480,
      criticalKPIs: 3,
      excellentKPIs: 13,
      averageGap: 0.4,
      benchmarkRatio: 111.2,
      qualityScore: 86.1,
    },
    {
      period: 'Jun 2024',
      overallPerformance: 80.1,
      targetAchievement: 94.8,
      patientVolume: 6650,
      criticalKPIs: 2,
      excellentKPIs: 14,
      averageGap: 1.8,
      benchmarkRatio: 113.5,
      qualityScore: 88.7,
    },
  ];

  return (
    <Card className='bg-gradient-to-br from-white via-cyan-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          📈 Advanced Multi-Metric Trend Analysis
        </CardTitle>
        <div className='text-sm text-slate-600'>
          Combined view of performance, volume, and quality trends over 6 months
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={450}>
          <ComposedChart
            data={trendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              dataKey='period'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
            />
            <YAxis
              yAxisId='left'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Performance (%)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              stroke='#64748b'
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{
                value: 'Patient Volume (000s)',
                angle: 90,
                position: 'insideRight',
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 8px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '12px',
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className='space-y-3'>
                      <div className='font-semibold text-slate-800 border-b pb-2'>
                        {label}
                      </div>
                      <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-sm'>
                        <div className='flex justify-between'>
                          <span>Overall Performance:</span>
                          <span className='font-medium text-blue-600'>
                            {data.overallPerformance}%
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Target Achievement:</span>
                          <span className='font-medium text-emerald-600'>
                            {data.targetAchievement}%
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Quality Score:</span>
                          <span className='font-medium text-purple-600'>
                            {data.qualityScore}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Patient Volume:</span>
                          <span className='font-medium text-cyan-600'>
                            {(data.patientVolume / 1000).toFixed(1)}K
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Critical KPIs:</span>
                          <span className='font-medium text-red-600'>
                            {data.criticalKPIs}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Excellent KPIs:</span>
                          <span className='font-medium text-emerald-600'>
                            {data.excellentKPIs}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Avg Gap:</span>
                          <span
                            className={`font-medium ${
                              data.averageGap >= 0
                                ? 'text-emerald-600'
                                : 'text-red-600'
                            }`}
                          >
                            {data.averageGap >= 0 ? '+' : ''}
                            {data.averageGap}%
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Benchmark Ratio:</span>
                          <span className='font-medium text-indigo-600'>
                            {data.benchmarkRatio}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType='circle' />

            {/* Patient Volume Area Chart (Background) */}
            <Area
              yAxisId='right'
              type='monotone'
              dataKey='patientVolume'
              stackId='1'
              stroke='#06b6d4'
              fill='#06b6d4'
              fillOpacity={0.1}
              name='Patient Volume'
            />

            {/* Performance Bars */}
            <Bar
              yAxisId='left'
              dataKey='overallPerformance'
              fill='#3b82f6'
              fillOpacity={0.7}
              name='Overall Performance'
              radius={[2, 2, 0, 0]}
            />

            {/* Target Achievement Line */}
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='targetAchievement'
              stroke='#10b981'
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#10b981', strokeWidth: 2 }}
              name='Target Achievement'
            />

            {/* Quality Score Line */}
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='qualityScore'
              stroke='#8b5cf6'
              strokeWidth={2}
              strokeDasharray='5 5'
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              name='Quality Score'
            />

            {/* Benchmark Ratio Line */}
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='benchmarkRatio'
              stroke='#f59e0b'
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2 }}
              name='Benchmark Ratio'
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Trend Insights */}
        <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-emerald-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between mb-2'>
              <h4 className='font-semibold text-emerald-800'>
                📈 Positive Trends
              </h4>
              <div className='text-emerald-600 text-2xl font-bold'>+7.6%</div>
            </div>
            <ul className='text-sm text-emerald-700 space-y-1'>
              <li>• Overall performance improving</li>
              <li>• Target achievement rising consistently</li>
              <li>• Critical KPIs decreasing</li>
              <li>• Quality score trending upward</li>
            </ul>
          </div>

          <div className='bg-blue-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between mb-2'>
              <h4 className='font-semibold text-blue-800'>📊 Key Metrics</h4>
              <div className='text-blue-600 text-2xl font-bold'>6M</div>
            </div>
            <ul className='text-sm text-blue-700 space-y-1'>
              <li>• Average performance: 76.4%</li>
              <li>• Peak month: June 2024</li>
              <li>• Patient volume growth: +12.9%</li>
              <li>• Benchmark ratio: 108.6%</li>
            </ul>
          </div>

          <div className='bg-purple-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between mb-2'>
              <h4 className='font-semibold text-purple-800'>🎯 Focus Areas</h4>
              <div className='text-purple-600 text-2xl font-bold'>2</div>
            </div>
            <ul className='text-sm text-purple-700 space-y-1'>
              <li>• Maintain momentum in May-June</li>
              <li>• Address remaining critical KPIs</li>
              <li>• Scale improvements with volume</li>
              <li>• Sustain quality score gains</li>
            </ul>
          </div>
        </div>

        {/* Performance Trajectory */}
        <div className='mt-4 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg'>
          <h4 className='font-semibold text-slate-800 mb-2'>
            Performance Trajectory Analysis
          </h4>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
            <div className='text-center'>
              <div className='text-lg font-bold text-blue-600'>+10.6%</div>
              <div className='text-slate-600'>6-Month Growth</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-emerald-600'>94.8%</div>
              <div className='text-slate-600'>Peak Achievement</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-purple-600'>+10.4</div>
              <div className='text-slate-600'>Quality Improvement</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-cyan-600'>13%</div>
              <div className='text-slate-600'>Volume Growth</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
