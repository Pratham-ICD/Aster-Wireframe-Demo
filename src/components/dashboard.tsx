"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Activity, 
  Heart, 
  Stethoscope, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  UserCheck,
  Pill,
  Shield,
  Brain,
  Zap,
  Target,
  BarChart3,
  PieChart,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Bed,
  Thermometer,
  Microscope,
  X
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ComposedChart,
  ReferenceLine,
  Legend,
  RadialBarChart,
  RadialBar,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";

// Comprehensive healthcare analytics data
const patientFlowData = [
  { 
    time: "00:00", 
    emergency: 12, 
    outpatient: 8, 
    inpatient: 45, 
    surgery: 3, 
    icu: 8,
    revenue: 12500,
    satisfaction: 4.2
  },
  { 
    time: "04:00", 
    emergency: 8, 
    outpatient: 2, 
    inpatient: 42, 
    surgery: 1, 
    icu: 7,
    revenue: 8200,
    satisfaction: 4.1
  },
  { 
    time: "08:00", 
    emergency: 25, 
    outpatient: 45, 
    inpatient: 48, 
    surgery: 8, 
    icu: 9,
    revenue: 18500,
    satisfaction: 4.3
  },
  { 
    time: "12:00", 
    emergency: 18, 
    outpatient: 62, 
    inpatient: 52, 
    surgery: 12, 
    icu: 11,
    revenue: 22100,
    satisfaction: 4.4
  },
  { 
    time: "16:00", 
    emergency: 22, 
    outpatient: 58, 
    inpatient: 55, 
    surgery: 15, 
    icu: 13,
    revenue: 25600,
    satisfaction: 4.2
  },
  { 
    time: "20:00", 
    emergency: 15, 
    outpatient: 28, 
    inpatient: 48, 
    surgery: 6, 
    icu: 10,
    revenue: 18900,
    satisfaction: 4.0
  },
];

const departmentAnalytics = [
  { 
    department: "Cardiology", 
    patients: 1247, 
    revenue: 2850000, 
    avgStay: 4.2, 
    satisfaction: 4.6,
    efficiency: 92,
    color: "#ef4444",
    trend: "+12%",
    criticalCases: 23
  },
  { 
    department: "Neurology", 
    patients: 892, 
    revenue: 2100000, 
    avgStay: 5.8, 
    satisfaction: 4.4,
    efficiency: 88,
    color: "#3b82f6",
    trend: "+8%",
    criticalCases: 18
  },
  { 
    department: "Orthopedics", 
    patients: 1156, 
    revenue: 1950000, 
    avgStay: 3.1, 
    satisfaction: 4.7,
    efficiency: 95,
    color: "#10b981",
    trend: "+15%",
    criticalCases: 12
  },
  { 
    department: "Pediatrics", 
    patients: 743, 
    revenue: 1200000, 
    avgStay: 2.8, 
    satisfaction: 4.8,
    efficiency: 90,
    color: "#f59e0b",
    trend: "+6%",
    criticalCases: 8
  },
  { 
    department: "Emergency", 
    patients: 2156, 
    revenue: 1800000, 
    avgStay: 1.2, 
    satisfaction: 4.1,
    efficiency: 85,
    color: "#8b5cf6",
    trend: "+22%",
    criticalCases: 45
  },
  { 
    department: "Oncology", 
    patients: 456, 
    revenue: 3200000, 
    avgStay: 8.5, 
    satisfaction: 4.5,
    efficiency: 78,
    color: "#ec4899",
    trend: "+4%",
    criticalCases: 67
  },
];

const patientDemographics = [
  { age: "0-18", male: 1200, female: 1100, total: 2300, avgCost: 2500 },
  { age: "19-35", male: 2100, female: 2400, total: 4500, avgCost: 3200 },
  { age: "36-50", male: 1800, female: 2000, total: 3800, avgCost: 4500 },
  { age: "51-65", male: 1600, female: 1800, total: 3400, avgCost: 6800 },
  { age: "65+", male: 1400, female: 1600, total: 3000, avgCost: 9200 },
];

const financialMetrics = [
  { month: "Jan", revenue: 2850000, expenses: 2100000, profit: 750000, margin: 26.3 },
  { month: "Feb", revenue: 3100000, expenses: 2250000, profit: 850000, margin: 27.4 },
  { month: "Mar", revenue: 2950000, expenses: 2200000, profit: 750000, margin: 25.4 },
  { month: "Apr", revenue: 3200000, expenses: 2350000, profit: 850000, margin: 26.6 },
  { month: "May", revenue: 3400000, expenses: 2450000, profit: 950000, margin: 27.9 },
  { month: "Jun", revenue: 3650000, expenses: 2600000, profit: 1050000, margin: 28.8 },
];

const operationalEfficiency = [
  { metric: "Patient Wait Time", current: 18, target: 15, unit: "min", status: "warning" },
  { metric: "Bed Turnover Rate", current: 2.4, target: 2.8, unit: "per day", status: "below" },
  { metric: "Surgery Success Rate", current: 96.8, target: 95, unit: "%", status: "excellent" },
  { metric: "Readmission Rate", current: 8.2, target: 7, unit: "%", status: "warning" },
  { metric: "Staff Utilization", current: 87, target: 85, unit: "%", status: "excellent" },
  { metric: "Equipment Uptime", current: 94.5, target: 95, unit: "%", status: "good" },
];

const criticalAlerts = [
  { id: 1, type: "critical", message: "ICU Bed 3 - Patient condition deteriorating", time: "2 min ago", department: "ICU" },
  { id: 2, type: "warning", message: "MRI Scanner maintenance overdue", time: "15 min ago", department: "Radiology" },
  { id: 3, type: "info", message: "New patient admitted to Cardiology", time: "23 min ago", department: "Cardiology" },
  { id: 4, type: "critical", message: "Emergency power backup activated", time: "31 min ago", department: "Facilities" },
  { id: 5, type: "warning", message: "Pharmacy inventory low - Antibiotics", time: "45 min ago", department: "Pharmacy" },
];

const resourceUtilization = [
  { resource: "Operating Rooms", utilization: 78, capacity: 12, available: 3, efficiency: 85 },
  { resource: "ICU Beds", utilization: 92, capacity: 25, available: 2, efficiency: 88 },
  { resource: "MRI Scanners", utilization: 65, capacity: 4, available: 2, efficiency: 72 },
  { resource: "CT Scanners", utilization: 88, capacity: 6, available: 1, efficiency: 91 },
  { resource: "Ambulances", utilization: 45, capacity: 8, available: 4, efficiency: 78 },
  { resource: "Lab Equipment", utilization: 72, capacity: 15, available: 4, efficiency: 82 },
];

const predictiveAnalytics = [
  { period: "Next Week", predictedPatients: 2450, confidence: 89, trend: "up" },
  { period: "Next Month", predictedPatients: 10200, confidence: 92, trend: "up" },
  { period: "Next Quarter", predictedPatients: 31200, confidence: 85, trend: "stable" },
  { period: "Next Year", predictedPatients: 125000, confidence: 78, trend: "up" },
];

const kpiData = [
  {
    title: "Total Revenue",
    value: "$3.65M",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    subValue: "This Month",
    detail: "vs $3.25M last month"
  },
  {
    title: "Patient Volume",
    value: "2,847",
    change: "+8.7%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    subValue: "Active Patients",
    detail: "vs 2,618 last month"
  },
  {
    title: "Bed Occupancy",
    value: "87.3%",
    change: "+2.1%",
    trend: "up",
    icon: Bed,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    subValue: "Capacity",
    detail: "vs 85.2% last month"
  },
  {
    title: "Avg Wait Time",
    value: "18 min",
    change: "-12%",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    subValue: "Emergency",
    detail: "vs 20.5 min last month"
  },
  {
    title: "Surgery Success",
    value: "96.8%",
    change: "+1.2%",
    trend: "up",
    icon: Target,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    subValue: "Rate",
    detail: "vs 95.6% last month"
  },
  {
    title: "Staff Efficiency",
    value: "87%",
    change: "+3.5%",
    trend: "up",
    icon: Zap,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    subValue: "Utilization",
    detail: "vs 83.5% last month"
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Aster Healthcare</h1>
                <p className="text-sm text-gray-600">Advanced Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Data</span>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                <Clock className="w-3 h-3 mr-1" />
                {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center shadow-sm`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mb-1">{kpi.subValue}</p>
                  <p className="text-xs text-gray-400">{kpi.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complex Analytics Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Patient Flow Heatmap */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>24-Hour Patient Flow Analysis</span>
              </CardTitle>
              <CardDescription>Real-time patient distribution across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={patientFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis yAxisId="left" stroke="#666" />
                  <YAxis yAxisId="right" orientation="right" stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="emergency" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Emergency" />
                  <Area yAxisId="left" type="monotone" dataKey="outpatient" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Outpatient" />
                  <Area yAxisId="left" type="monotone" dataKey="inpatient" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Inpatient" />
                  <Area yAxisId="left" type="monotone" dataKey="surgery" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Surgery" />
                  <Area yAxisId="left" type="monotone" dataKey="icu" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="ICU" />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#ec4899" strokeWidth={3} name="Satisfaction Score" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Performance Radial Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Department Efficiency</span>
              </CardTitle>
              <CardDescription>Performance metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={departmentAnalytics}>
                  <RadialBar dataKey="efficiency" cornerRadius={10} fill="#8884d8" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {departmentAnalytics.slice(0, 4).map((dept, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                      <span className="font-medium">{dept.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{dept.efficiency}%</span>
                      <Badge variant="outline" className="text-xs">
                        {dept.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue vs Expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Financial Performance</span>
              </CardTitle>
              <CardDescription>Revenue, expenses, and profit margins</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={financialMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value: number, name: string) => [
                    name === 'margin' ? `${value}%` : `$${(value / 1000000).toFixed(1)}M`, 
                    name === 'revenue' ? 'Revenue' : name === 'expenses' ? 'Expenses' : name === 'profit' ? 'Profit' : 'Margin'
                  ]} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar yAxisId="left" dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar yAxisId="left" dataKey="profit" fill="#3b82f6" name="Profit" />
                  <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#8b5cf6" strokeWidth={3} name="Margin %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Patient Demographics Scatter Plot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Patient Demographics & Cost Analysis</span>
              </CardTitle>
              <CardDescription>Age groups vs treatment costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart data={patientDemographics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" name="Age Group" />
                  <YAxis dataKey="avgCost" name="Avg Cost ($)" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [
                    name === 'total' ? `${value} patients` : `$${value}`, 
                    name === 'total' ? 'Total Patients' : 'Average Cost'
                  ]} />
                  <Scatter dataKey="total" fill="#3b82f6" name="Patient Count" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Resource Utilization & Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Resource Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>Resource Utilization</span>
              </CardTitle>
              <CardDescription>Equipment and facility usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceUtilization.map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{resource.resource}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{resource.utilization}%</span>
                        <span className="text-xs text-gray-500">({resource.available}/{resource.capacity})</span>
                      </div>
                    </div>
                    <Progress value={resource.utilization} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Efficiency: {resource.efficiency}%</span>
                      <span>Available: {resource.available}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span>Critical Alerts</span>
              </CardTitle>
              <CardDescription>Real-time system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                    alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                    alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {alert.department}
                          </Badge>
                          <span className="text-xs text-gray-500">{alert.time}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Operational Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Operational KPIs</span>
              </CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {operationalEfficiency.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{metric.current}{metric.unit}</span>
                        <Badge 
                          variant={metric.status === 'excellent' ? 'default' : 
                                  metric.status === 'good' ? 'secondary' : 
                                  metric.status === 'warning' ? 'outline' : 'outline'}
                          className={`text-xs ${
                            metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                            metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                            metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Target: {metric.target}{metric.unit}</span>
                      <span className={metric.current >= metric.target ? 'text-green-600' : 'text-red-600'}>
                        {metric.current >= metric.target ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Department Revenue Treemap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                <span>Department Revenue Distribution</span>
              </CardTitle>
              <CardDescription>Revenue breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={departmentAnalytics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ department, revenue }) => `${department}: $${(revenue / 1000000).toFixed(1)}M`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {departmentAnalytics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, 'Revenue']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Predictive Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span>Predictive Analytics</span>
              </CardTitle>
              <CardDescription>AI-powered patient volume forecasting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveAnalytics.map((prediction, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{prediction.period}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-indigo-600">
                          {prediction.predictedPatients.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">patients</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          prediction.trend === 'up' ? 'bg-green-500' : 
                          prediction.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-sm text-gray-600 capitalize">{prediction.trend} trend</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <Badge variant="outline" className="bg-white">
                          {prediction.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
