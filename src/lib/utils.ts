import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}

export function getStatusColor(current: number, target: number): string {
  const ratio = current / target;
  if (ratio >= 1.1) return 'text-emerald-600';
  if (ratio >= 1.0) return 'text-blue-600';
  if (ratio >= 0.8) return 'text-amber-600';
  return 'text-red-600';
}

export function getStatusBadgeColor(current: number, target: number): string {
  const ratio = current / target;
  if (ratio >= 1.1) return 'bg-emerald-100 text-emerald-800';
  if (ratio >= 1.0) return 'bg-blue-100 text-blue-800';
  if (ratio >= 0.8) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}
