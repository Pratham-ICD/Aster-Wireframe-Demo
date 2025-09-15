export interface HealthKPI {
  id: string;
  cohort: string;
  healthOutcome: string;
  denominator: number;
  numerator: number;
  target: number;
  benchmark: number;
  percentage: number;
  vsTarget: number;
  vsBenchmark: number;
  facility: string;
  department: string;
  timePeriod: string;
}

export interface CohortSummary {
  cohort: string;
  totalPatients: number;
  averagePerformance: number;
  kpisCount: number;
  targetsMet: number;
}

export interface DashboardFilters {
  cohorts: string[];
  timePeriod: string;
  facility: string;
  department: string;
}

export interface TrendData {
  month: string;
  performance: number;
  target: number;
}
