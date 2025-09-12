'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceDonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function PerformanceDonutChart({ data }: PerformanceDonutChartProps) {
  const totalKPIs = data.reduce((sum, item) => sum + item.value, 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        fontSize={12}
        fontWeight='600'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className='bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎯 Performance Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={60}
              fill='#8884d8'
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value) => [`${value} KPIs`, 'Count']}
            />
            <Legend
              verticalAlign='bottom'
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color, fontWeight: '500' }}>
                  {value}
                </span>
              )}
            />
            {/* Center text */}
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize={24}
              fontWeight='bold'
              fill='#1e293b'
            >
              {totalKPIs}
            </text>
            <text
              x='50%'
              y='55%'
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize={12}
              fill='#64748b'
            >
              Total KPIs
            </text>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
