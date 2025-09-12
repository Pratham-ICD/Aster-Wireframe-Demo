'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthKPI } from '@/types/dashboard';

interface CohortPerformanceHeatmapProps {
  data: HealthKPI[];
}

export function CohortPerformanceHeatmap({
  data,
}: CohortPerformanceHeatmapProps) {
  // Group KPIs by cohort and create a matrix
  const cohortMap = new Map();

  data.forEach((kpi) => {
    if (!cohortMap.has(kpi.cohort)) {
      cohortMap.set(kpi.cohort, []);
    }
    cohortMap.get(kpi.cohort).push(kpi);
  });

  const getPerformanceColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 1.15) return 'bg-emerald-500 text-white';
    if (ratio >= 1.05) return 'bg-emerald-400 text-white';
    if (ratio >= 0.95) return 'bg-blue-500 text-white';
    if (ratio >= 0.85) return 'bg-amber-400 text-white';
    if (ratio >= 0.75) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getPerformanceValue = (current: number, target: number) => {
    return ((current / target) * 100).toFixed(0);
  };

  return (
    <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🔥 Cohort Performance Intensity Matrix
        </CardTitle>
        <div className='text-sm text-slate-600'>
          Heat intensity shows performance vs target ratio • Darker = Better
          Performance
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {Array.from(cohortMap.entries()).map(([cohort, kpis]) => (
            <div key={cohort} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h4 className='font-semibold text-slate-800 text-sm'>
                  {cohort}
                </h4>
                <div className='text-xs text-slate-500'>
                  {kpis.length} KPI{kpis.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className='grid grid-cols-6 gap-1'>
                {kpis.map((kpi: HealthKPI) => (
                  <div
                    key={kpi.id}
                    className={`
                      relative group cursor-pointer rounded-lg p-3 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg
                      ${getPerformanceColor(kpi.percentage, kpi.target)}
                    `}
                  >
                    <div className='text-xs font-bold'>
                      {getPerformanceValue(kpi.percentage, kpi.target)}%
                    </div>
                    <div className='text-[10px] opacity-90 mt-1'>Target</div>

                    {/* Tooltip */}
                    <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-48'>
                      <div className='font-semibold'>
                        {kpi.healthOutcome.substring(0, 40)}...
                      </div>
                      <div className='mt-1'>
                        Current: {kpi.percentage.toFixed(1)}%
                      </div>
                      <div>Target: {kpi.target}%</div>
                      <div>
                        Patients: {kpi.numerator}/{kpi.denominator}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Fill empty cells if needed for visual balance */}
                {Array.from(
                  { length: Math.max(0, 6 - (kpis.length % 6)) },
                  (_, i) =>
                    kpis.length % 6 !== 0 && i < 6 - (kpis.length % 6) ? (
                      <div
                        key={`empty-${i}`}
                        className='rounded-lg p-3 bg-slate-100'
                      ></div>
                    ) : null
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className='mt-6 flex items-center justify-center space-x-4 text-xs'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-red-500 rounded'></div>
            <span>Critical (&lt;75%)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-amber-400 rounded'></div>
            <span>Needs Attention (75-95%)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-blue-500 rounded'></div>
            <span>On Target (95-105%)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-emerald-500 rounded'></div>
            <span>Excellent (&gt;115%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
