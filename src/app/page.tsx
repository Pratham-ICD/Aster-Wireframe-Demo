'use client';

import { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { KPICard } from '@/components/ui/kpi-card';
import { CohortPerformanceHeatmap } from '@/components/charts/cohort-performance-heatmap';
import { PerformanceBubbleChart } from '@/components/charts/performance-bubble-chart';
import { AdvancedTrendAnalysis } from '@/components/charts/advanced-trend-analysis';
import { PerformanceWaterfall } from '@/components/charts/performance-waterfall';
import { CohortRadarAnalysis } from '@/components/charts/cohort-radar-analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  healthcareKPIs,
  cohorts,
  timePeriods,
  facilities,
  departments,
  viewOptions,
} from '@/data/healthcareData';
import { DashboardFilters } from '@/types/dashboard';
import { formatNumber } from '@/lib/utils';
import {
  Users,
  Target,
  AlertTriangle,
  Activity,
  Stethoscope,
} from 'lucide-react';

export default function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    cohorts: cohorts,
    timePeriod: 'Q3 2024',
    facility: 'All Facilities',
    department: 'All Departments',
    view: 'Performance vs Target',
  });

  // Filter data based on selected cohorts
  const filteredKPIs = useMemo(() => {
    return healthcareKPIs.filter(
      (kpi) =>
        filters.cohorts.length === 0 || filters.cohorts.includes(kpi.cohort)
    );
  }, [filters.cohorts]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalPatients = filteredKPIs.reduce(
      (sum, kpi) => sum + kpi.denominator,
      0
    );
    const avgPerformance =
      filteredKPIs.reduce((sum, kpi) => sum + kpi.percentage, 0) /
      filteredKPIs.length;
    const targetsMet = filteredKPIs.filter(
      (kpi) => kpi.percentage >= kpi.target
    ).length;
    const criticalKPIs = filteredKPIs.filter(
      (kpi) => kpi.percentage < kpi.target * 0.8
    ).length;

    return {
      totalPatients,
      avgPerformance,
      targetsMet,
      totalKPIs: filteredKPIs.length,
      criticalKPIs,
    };
  }, [filteredKPIs]);

  // Options for filters
  const cohortOptions = cohorts.map((cohort) => ({
    value: cohort,
    label: cohort,
  }));
  const timePeriodOptions = timePeriods.map((period) => ({
    value: period,
    label: period,
  }));
  const facilityOptions = facilities.map((facility) => ({
    value: facility,
    label: facility,
  }));
  const departmentOptions = departments.map((dept) => ({
    value: dept,
    label: dept,
  }));
  const viewOptionsData = viewOptions.map((view) => ({
    value: view,
    label: view,
  }));

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white'>
      <div className='w-full px-2 py-3 space-y-4'>
        {/* Dashboard Header */}
        <DashboardHeader
          filters={filters}
          onFiltersChange={setFilters}
          cohortOptions={cohortOptions}
          timePeriodOptions={timePeriodOptions}
          facilityOptions={facilityOptions}
          departmentOptions={departmentOptions}
          viewOptions={viewOptionsData}
        />

        {/* KPI Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2'>
          <KPICard
            title='Total Patients'
            value={summaryMetrics.totalPatients}
            change={12.3}
            trend='up'
            format='number'
            icon={<Users className='w-6 h-6' />}
          />

          <KPICard
            title='Average Performance'
            value={summaryMetrics.avgPerformance}
            change={2.3}
            trend='up'
            format='percentage'
            icon={<Activity className='w-6 h-6' />}
          />

          <KPICard
            title='Targets Met'
            value={`${summaryMetrics.targetsMet}/${summaryMetrics.totalKPIs}`}
            change={5.2}
            trend='up'
            icon={<Target className='w-6 h-6' />}
          />

          <KPICard
            title='Critical KPIs'
            value={summaryMetrics.criticalKPIs}
            change={-1.8}
            trend='down'
            icon={<AlertTriangle className='w-6 h-6' />}
          />

          <KPICard
            title='Benchmark Ratio'
            value={1.08}
            change={0.05}
            trend='up'
            format='number'
            icon={<Stethoscope className='w-6 h-6' />}
          />
        </div>

        {/* Dense Layout Row 1: 3 Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <CohortPerformanceHeatmap data={filteredKPIs} />
          <PerformanceBubbleChart data={filteredKPIs} />
          <CohortRadarAnalysis data={filteredKPIs} />
        </div>

        {/* Dense Layout Row 2: 2 Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          <AdvancedTrendAnalysis />
          <PerformanceWaterfall data={filteredKPIs} />
        </div>

        {/* Dense Layout Row 3: 4 Mini Charts */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
          <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>
                📊 Performance Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-2'>
                {filteredKPIs.slice(0, 5).map((kpi, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between text-xs'
                  >
                    <span className='truncate'>{kpi.cohort}</span>
                    <span
                      className={`font-bold ${
                        kpi.percentage >= kpi.target
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }`}
                    >
                      {kpi.percentage.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>🎯 Target Achievement</CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-2'>
                {filteredKPIs.slice(0, 5).map((kpi, idx) => {
                  const ratio = (kpi.percentage / kpi.target) * 100;
                  return (
                    <div key={idx} className='flex items-center gap-2 text-xs'>
                      <span className='truncate flex-1'>{kpi.cohort}</span>
                      <div className='w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className={`h-full ${
                            ratio >= 100
                              ? 'bg-emerald-500'
                              : ratio >= 80
                              ? 'bg-blue-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, ratio)}%` }}
                        />
                      </div>
                      <span className='text-xs font-medium w-8 text-right'>
                        {ratio.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>👥 Patient Volume</CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-2'>
                {filteredKPIs.slice(0, 5).map((kpi, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between text-xs'
                  >
                    <span className='truncate'>{kpi.cohort}</span>
                    <div className='text-right'>
                      <div className='font-bold text-slate-800'>
                        {formatNumber(kpi.denominator)}
                      </div>
                      <div className='text-xs text-slate-500'>
                        {(
                          (kpi.denominator /
                            filteredKPIs.reduce(
                              (sum, k) => sum + k.denominator,
                              0
                            )) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>⚡ Performance Gaps</CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-2'>
                {filteredKPIs
                  .sort(
                    (a, b) =>
                      a.target - a.percentage - (b.target - b.percentage)
                  )
                  .slice(0, 5)
                  .map((kpi, idx) => {
                    const gap = kpi.target - kpi.percentage;
                    return (
                      <div
                        key={idx}
                        className='flex items-center justify-between text-xs'
                      >
                        <span className='truncate'>{kpi.cohort}</span>
                        <span
                          className={`font-bold ${
                            gap <= 0
                              ? 'text-emerald-600'
                              : gap > 5
                              ? 'text-red-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {gap > 0 ? '+' : ''}
                          {gap.toFixed(1)}%
                        </span>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed KPI Table */}
        <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              📋 Comprehensive KPI Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b-2 border-blue-200'>
                    <th className='text-left p-4 font-bold text-slate-800'>
                      Cohort
                    </th>
                    <th className='text-left p-4 font-bold text-slate-800'>
                      Health Outcome
                    </th>
                    <th className='text-center p-4 font-bold text-slate-800'>
                      Current (%)
                    </th>
                    <th className='text-center p-4 font-bold text-slate-800'>
                      Target (%)
                    </th>
                    <th className='text-center p-4 font-bold text-slate-800'>
                      Benchmark (%)
                    </th>
                    <th className='text-center p-4 font-bold text-slate-800'>
                      Patients
                    </th>
                    <th className='text-center p-4 font-bold text-slate-800'>
                      Performance Status
                    </th>
                    <th className='text-center p-4 font-bold text-slate-800'>
                      Impact Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKPIs.map((kpi) => {
                    const ratio = kpi.percentage / kpi.target;
                    const impactScore =
                      Math.abs(kpi.percentage - kpi.target) *
                      (kpi.denominator / 100);
                    const status =
                      ratio >= 1.15
                        ? 'Outstanding'
                        : ratio >= 1.05
                        ? 'Excellent'
                        : ratio >= 0.95
                        ? 'Good'
                        : ratio >= 0.85
                        ? 'Attention Needed'
                        : ratio >= 0.75
                        ? 'Critical'
                        : 'Emergency';

                    const statusColors = {
                      Outstanding:
                        'text-emerald-800 bg-emerald-100 border-emerald-200',
                      Excellent:
                        'text-emerald-700 bg-emerald-50 border-emerald-200',
                      Good: 'text-blue-700 bg-blue-50 border-blue-200',
                      'Attention Needed':
                        'text-amber-700 bg-amber-50 border-amber-200',
                      Critical: 'text-red-700 bg-red-50 border-red-200',
                      Emergency: 'text-red-800 bg-red-100 border-red-300',
                    };

                    return (
                      <tr
                        key={kpi.id}
                        className='border-b border-slate-100 hover:bg-blue-50/30 transition-colors duration-200'
                      >
                        <td className='p-4'>
                          <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'>
                            {kpi.cohort}
                          </span>
                        </td>
                        <td className='p-4 text-slate-900 max-w-xs font-medium'>
                          {kpi.healthOutcome}
                        </td>
                        <td className='p-4 text-center'>
                          <span className='font-bold text-lg text-slate-800'>
                            {kpi.percentage.toFixed(1)}%
                          </span>
                        </td>
                        <td className='p-4 text-center text-slate-600 font-medium'>
                          {kpi.target.toFixed(1)}%
                        </td>
                        <td className='p-4 text-center text-slate-500 font-medium'>
                          {kpi.benchmark.toFixed(1)}%
                        </td>
                        <td className='p-4 text-center text-slate-600 font-medium'>
                          <div className='text-sm'>
                            <div className='font-bold'>
                              {formatNumber(kpi.numerator)}
                            </div>
                            <div className='text-xs text-slate-500'>
                              of {formatNumber(kpi.denominator)}
                            </div>
                          </div>
                        </td>
                        <td className='p-4 text-center'>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                              statusColors[status as keyof typeof statusColors]
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className='p-4 text-center'>
                          <div className='flex flex-col items-center'>
                            <span className='font-bold text-slate-800'>
                              {impactScore.toFixed(1)}
                            </span>
                            <div
                              className={`w-12 h-2 rounded-full mt-1 ${
                                impactScore > 50
                                  ? 'bg-red-400'
                                  : impactScore > 25
                                  ? 'bg-amber-400'
                                  : impactScore > 10
                                  ? 'bg-blue-400'
                                  : 'bg-emerald-400'
                              }`}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className='text-center py-8 text-slate-500 border-t border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg'>
          <p className='text-sm font-medium'>
            © 2024 Aster DM Healthcare | Advanced Clinical Analytics Dashboard |
            Last Updated: {new Date().toLocaleDateString()} | Data Source: Aster
            Clinical Database
          </p>
          <p className='text-xs mt-2 text-slate-400'>
            Powered by Next.js, TypeScript & Modern Analytics • Real-time
            Healthcare Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
