import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber, formatPercentage, cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  format?: 'number' | 'percentage' | 'currency';
  icon?: React.ReactNode;
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = 'vs last quarter',
  trend = 'neutral',
  format = 'number',
  icon,
  className,
}: KPICardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'percentage':
        return formatPercentage(val);
      case 'currency':
        return `$${formatNumber(val)}`;
      default:
        return formatNumber(val);
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className='w-4 h-4 text-emerald-600' />;
      case 'down':
        return <TrendingDown className='w-4 h-4 text-red-600' />;
      default:
        return <Minus className='w-4 h-4 text-slate-500' />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-emerald-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <Card
      className={cn(
        'bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-200/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-3'>
            {icon && <div className='text-blue-600'>{icon}</div>}
            <p className='text-sm font-medium text-slate-600'>{title}</p>
          </div>

          <div className='space-y-2'>
            <p className='text-3xl font-bold text-slate-900'>
              {formatValue(value)}
            </p>

            {change !== undefined && (
              <div className='flex items-center gap-1 text-sm'>
                {getTrendIcon()}
                <span className={cn('font-medium', getTrendColor())}>
                  {change > 0 ? '+' : ''}
                  {formatPercentage(change)}
                </span>
                <span className='text-slate-500'>{changeLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
