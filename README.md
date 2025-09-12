# Aster Healthcare Dashboard

A modern, responsive healthcare dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This dashboard provides comprehensive insights for healthcare management with real-time data visualization.

## Features

- **Modern UI Design**: Clean, professional interface with healthcare-focused design
- **Real-time Metrics**: Live KPI cards showing patient counts, appointments, revenue, and bed occupancy
- **Interactive Charts**: Multiple chart types including area charts, bar charts, and pie charts
- **Patient Management**: Recent patients list with status tracking
- **System Monitoring**: Real-time system status and performance metrics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices



## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **Lucide React** - Beautiful icon library
- **Shadcn UI** - Modern component library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dashboard Sections

### KPI Cards
- Total Patients: 2,847 (+12%)
- Active Appointments: 156 (+8%)
- Monthly Revenue: $68,420 (+15%)
- Bed Occupancy: 87% (+3%)

### Charts & Visualizations
- **Patient Trends**: Area chart showing monthly patient visits and appointments
- **Department Distribution**: Pie chart showing patient distribution across departments
- **Revenue Analysis**: Bar chart displaying monthly revenue trends
- **Recent Patients**: Live feed of recent patient activities

### System Monitoring
- Database status
- API services status
- Backup system status
- Security status
- Performance metrics (satisfaction, response time, uptime, data accuracy)

### Quick Actions
- Add New Patient
- Schedule Appointment
- View Reports
- Emergency Alert

## Customization

The dashboard uses mock data and can be easily customized by:
- Updating the data arrays in `src/components/dashboard.tsx`
- Modifying the color scheme in `tailwind.config.ts`
- Adding new chart types using Recharts
- Extending the component library with additional Shadcn UI components

## Healthcare Industry Focus

This dashboard is specifically designed for healthcare organizations like Aster Healthcare, featuring:
- Medical terminology and metrics
- Healthcare-specific KPIs
- Patient management workflows
- Department-based organization
- Emergency response capabilities
- Compliance and security monitoring

## License

This project is created for demonstration purposes for Aster Healthcare.