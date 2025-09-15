'use client';

import { Activity, Users, Calendar, Building } from 'lucide-react';
import { FilterSelect, MultiSelect } from '@/components/ui/filter-select';
import { DashboardFilters } from '@/types/dashboard';

interface DashboardHeaderProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  cohortOptions: Array<{ value: string; label: string }>;
  timePeriodOptions: Array<{ value: string; label: string }>;
  facilityOptions: Array<{ value: string; label: string }>;
  departmentOptions: Array<{ value: string; label: string }>;
}

export function DashboardHeader({
  filters,
  onFiltersChange,
  cohortOptions,
  timePeriodOptions,
  facilityOptions,
  departmentOptions,
}: DashboardHeaderProps) {
  return (
    <div className='space-y-2'>
      {/* Simple Compact Header */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Activity className='w-4 h-4' />
            <h1 className='text-lg font-medium'>Aster Dashboard</h1>
          </div>
          <div className='text-xs text-blue-100'>Healthcare Analytics</div>
        </div>
      </div>

      {/* Compact Filters */}
      <div className='bg-white/60 backdrop-blur-sm border border-blue-100 px-3 py-2'>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
          <MultiSelect
            label='Cohorts'
            values={filters.cohorts}
            options={cohortOptions}
            onChange={(cohorts) => onFiltersChange({ ...filters, cohorts })}
            icon={<Users className='w-3 h-3' />}
          />

          <FilterSelect
            label='Period'
            value={filters.timePeriod}
            options={timePeriodOptions}
            onChange={(timePeriod) =>
              onFiltersChange({ ...filters, timePeriod })
            }
            icon={<Calendar className='w-3 h-3' />}
          />

          <FilterSelect
            label='Facility'
            value={filters.facility}
            options={facilityOptions}
            onChange={(facility) => onFiltersChange({ ...filters, facility })}
            icon={<Building className='w-3 h-3' />}
          />

          <FilterSelect
            label='Department'
            value={filters.department}
            options={departmentOptions}
            onChange={(department) =>
              onFiltersChange({ ...filters, department })
            }
            icon={<Activity className='w-3 h-3' />}
          />


        </div>
      </div>
    </div>
  );
}
