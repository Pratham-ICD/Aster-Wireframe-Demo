'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthKPI } from '@/types/dashboard';

interface CohortRadarAnalysisProps {
  data: HealthKPI[];
}

export function CohortRadarAnalysis({ data }: CohortRadarAnalysisProps) {
  // Calculate cohort averages for radar chart
  const cohortMap = new Map();

  data.forEach((kpi) => {
    if (!cohortMap.has(kpi.cohort)) {
      cohortMap.set(kpi.cohort, {
        performance: [],
        targets: [],
        benchmarks: [],
        patients: [],
        kpiCount: 0,
      });
    }
    const cohortData = cohortMap.get(kpi.cohort);
    cohortData.performance.push(kpi.percentage);
    cohortData.targets.push(kpi.target);
    cohortData.benchmarks.push(kpi.benchmark);
    cohortData.patients.push(kpi.denominator);
    cohortData.kpiCount++;
  });

  // Create radar data with multiple dimensions
  const radarData = Array.from(cohortMap.entries()).map(([cohort, data]) => ({
    cohort,
    performance:
      data.performance.reduce((a: number, b: number) => a + b, 0) /
      data.performance.length,
    targetAchievement:
      (data.performance.reduce((a: number, b: number) => a + b, 0) /
        data.performance.length /
        (data.targets.reduce((a: number, b: number) => a + b, 0) /
          data.targets.length)) *
      100,
    benchmarkComparison:
      (data.performance.reduce((a: number, b: number) => a + b, 0) /
        data.performance.length /
        (data.benchmarks.reduce((a: number, b: number) => a + b, 0) /
          data.benchmarks.length)) *
      100,
    patientVolume: Math.min(
      100,
      data.patients.reduce((a: number, b: number) => a + b, 0) / 100
    ), // Scaled to 0-100
    kpiDiversity: Math.min(100, data.kpiCount * 15), // Scaled based on number of KPIs
    consistency:
      100 - (Math.max(...data.performance) - Math.min(...data.performance)), // Performance consistency
  }));

  // Prepare data for radar chart
  const metrics = [
    'Performance Score',
    'Target Achievement',
    'Benchmark Comparison',
    'Patient Volume',
    'KPI Diversity',
    'Consistency',
  ];

  const radarChartData = metrics.map((metric) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataPoint: any = { metric };
    radarData.forEach((cohort) => {
      switch (metric) {
        case 'Performance Score':
          dataPoint[cohort.cohort] = cohort.performance;
          break;
        case 'Target Achievement':
          dataPoint[cohort.cohort] = Math.min(120, cohort.targetAchievement);
          break;
        case 'Benchmark Comparison':
          dataPoint[cohort.cohort] = Math.min(120, cohort.benchmarkComparison);
          break;
        case 'Patient Volume':
          dataPoint[cohort.cohort] = cohort.patientVolume;
          break;
        case 'KPI Diversity':
          dataPoint[cohort.cohort] = cohort.kpiDiversity;
          break;
        case 'Consistency':
          dataPoint[cohort.cohort] = Math.max(0, cohort.consistency);
          break;
      }
    });
    return dataPoint;
  });

  const cohortColors = [
    '#8b5cf6',
    '#ef4444',
    '#f59e0b',
    '#06b6d4',
    '#84cc16',
    '#f97316',
    '#ec4899',
    '#6366f1',
  ];

  return (
    <Card className='bg-gradient-to-br from-white via-indigo-50/20 to-purple-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎯 Multi-Dimensional Cohort Analysis
        </CardTitle>
        <div className='text-sm text-slate-600'>
          Radar view of cohort performance across 6 key dimensions
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={450}>
          <RadarChart
            data={radarChartData}
            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
          >
            <PolarGrid stroke='#e2e8f0' />
            <PolarAngleAxis
              dataKey='metric'
              tick={{ fontSize: 11, fill: '#64748b' }}
              className='text-xs'
            />
            <PolarRadiusAxis
              angle={0}
              domain={[0, 120]}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickCount={5}
            />

            {radarData.map((cohort, index) => (
              <Radar
                key={cohort.cohort}
                name={cohort.cohort}
                dataKey={cohort.cohort}
                stroke={cohortColors[index % cohortColors.length]}
                fill={cohortColors[index % cohortColors.length]}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ r: 4, fill: cohortColors[index % cohortColors.length] }}
              />
            ))}

            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(1)}`,
                name,
              ]}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Cohort Legend */}
        <div className='mt-4 flex flex-wrap gap-3 justify-center'>
          {radarData.map((cohort, index) => (
            <div
              key={cohort.cohort}
              className='flex items-center space-x-2 text-xs'
            >
              <div
                className='w-3 h-3 rounded-full'
                style={{
                  backgroundColor: cohortColors[index % cohortColors.length],
                }}
              ></div>
              <span className='font-medium'>{cohort.cohort}</span>
            </div>
          ))}
        </div>

        {/* Dimension Explanations */}
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs'>
          <div className='bg-blue-50 p-3 rounded-lg'>
            <div className='font-semibold text-blue-800'>Performance Score</div>
            <div className='text-blue-600'>
              Average KPI performance percentage
            </div>
          </div>
          <div className='bg-emerald-50 p-3 rounded-lg'>
            <div className='font-semibold text-emerald-800'>
              Target Achievement
            </div>
            <div className='text-emerald-600'>
              Performance vs target ratio (100% = perfect)
            </div>
          </div>
          <div className='bg-purple-50 p-3 rounded-lg'>
            <div className='font-semibold text-purple-800'>
              Benchmark Comparison
            </div>
            <div className='text-purple-600'>
              Performance vs industry benchmarks
            </div>
          </div>
          <div className='bg-orange-50 p-3 rounded-lg'>
            <div className='font-semibold text-orange-800'>Patient Volume</div>
            <div className='text-orange-600'>
              Total patient population scale
            </div>
          </div>
          <div className='bg-teal-50 p-3 rounded-lg'>
            <div className='font-semibold text-teal-800'>KPI Diversity</div>
            <div className='text-teal-600'>Number of tracked metrics</div>
          </div>
          <div className='bg-rose-50 p-3 rounded-lg'>
            <div className='font-semibold text-rose-800'>Consistency</div>
            <div className='text-rose-600'>
              Performance variance across KPIs
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className='mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg'>
          <h4 className='font-semibold text-slate-800 mb-3'>
            Dimensional Leaders
          </h4>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 text-sm'>
            <div>
              <span className='font-medium text-emerald-700'>
                🏆 Best Performance:
              </span>
              <div className='text-slate-600'>
                {
                  radarData.reduce((best, current) =>
                    current.performance > best.performance ? current : best
                  ).cohort
                }
              </div>
            </div>
            <div>
              <span className='font-medium text-blue-700'>
                🎯 Target Leader:
              </span>
              <div className='text-slate-600'>
                {
                  radarData.reduce((best, current) =>
                    current.targetAchievement > best.targetAchievement
                      ? current
                      : best
                  ).cohort
                }
              </div>
            </div>
            <div>
              <span className='font-medium text-purple-700'>
                📊 Most Consistent:
              </span>
              <div className='text-slate-600'>
                {
                  radarData.reduce((best, current) =>
                    current.consistency > best.consistency ? current : best
                  ).cohort
                }
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
