# Aster Healthcare Analytics Dashboard

A modern, beautiful healthcare analytics dashboard built with Next.js, TypeScript, and Tailwind CSS. This dashboard replaces the old Streamlit wireframe with a sleek, professional interface featuring a sophisticated 2-tone blue color scheme.

## ✨ Features

### 🎨 Design Excellence

- **Modern 2-tone Color Scheme**: Sophisticated blue gradients with white accents
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects and transitions for enhanced UX
- **Professional Healthcare UI**: Clean, clinical aesthetic appropriate for medical data

### 📊 Interactive Analytics

- **Multi-Cohort Analysis**: BMI, Hypertension, Diabetes, Kidney, Dialysis, Urology, OBG
- **Real-time Filtering**: Dynamic cohort, time period, facility, and department filters
- **Comprehensive KPI Tracking**: Performance vs targets and industry benchmarks
- **Advanced Visualizations**: Bar charts, donut charts, line graphs, and scatter plots

### 🏥 Healthcare-Specific Features

- **Clinical Performance Metrics**: Track key healthcare quality indicators
- **Target Achievement Monitoring**: Visual status indicators for performance goals
- **Benchmark Comparisons**: Industry standard comparisons
- **Patient Population Analytics**: Denominator/numerator tracking
- **Trend Analysis**: 6-month performance tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd aster-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## 📈 Dashboard Sections

### 1. Hero Header

- **Gradient Background**: Professional blue gradient
- **Quick Stats**: Multi-cohort analysis indicators
- **Period Selection**: Current reporting period display

### 2. Interactive Filters

- **Healthcare Cohorts**: Multi-select for BMI, Hypertension, Diabetes, etc.
- **Time Periods**: Q1-Q4 2024, YTD options
- **Facilities**: Aster Hospital Dubai, Clinic Sharjah, Medical Centers
- **Departments**: Internal Medicine, Pediatrics, OBG, Cardiology
- **Analysis Views**: Performance vs Target, Benchmark Comparison, Trend Analysis

### 3. KPI Summary Cards

- **Total Patients**: Aggregate patient counts with trend indicators
- **Average Performance**: Overall performance percentage
- **Targets Met**: Achievement ratio with color coding
- **Critical KPIs**: Alert indicators for underperforming metrics
- **Benchmark Ratio**: Industry comparison metrics

### 4. Visual Analytics

- **Cohort Performance Bar Chart**: Comparative performance by medical specialty
- **Performance Distribution Donut**: Status distribution (Excellent/Good/Critical)
- **6-Month Trend Line**: Performance trajectory over time
- **Top Performing KPIs**: Horizontal bar chart of best metrics
- **Target vs Actual Scatter**: Correlation analysis with perfect performance line

### 5. Detailed Data Table

- **Comprehensive KPI Listing**: All metrics with full details
- **Status Indicators**: Color-coded performance badges
- **Interactive Sorting**: Sortable columns for analysis
- **Patient Counts**: Numerator/denominator tracking

## 🎯 Healthcare KPIs Tracked

### BMI Cohort

- Prevalence of Obesity in Adult Patients (18+ years)

### Hypertension Cohort

- Optimal Control of Hypertension
- Patients with Poorly Controlled Hypertension

### Diabetes Cohort

- HbA1c Poor Control (>9.0%)
- HbA1c Good Control (≤7.0%)
- Annual Eye Examinations

### Kidney Cohort

- CKD Patients HbA1c Control
- CKD Nephrology Referrals
- Dialysis Phosphorus Control
- CKD Dietitian Referrals
- CKD Blood Pressure Control

### OBG Cohort

- Vaccination during Pregnancy
- PPH Management with IV Oxytocin
- PPH Management with Tranexamic Acid
- Hysterectomy for PPH

### Additional Cohorts

- Iron Deficiency Screening
- Dialysis Anemia Management
- Prostate Cancer Screening

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#3b82f6` - Main brand color
- **Secondary Blue**: `#1e40af` - Darker accent
- **Success Green**: `#10b981` - Positive indicators
- **Warning Amber**: `#f59e0b` - Attention needed
- **Error Red**: `#ef4444` - Critical alerts
- **Neutral Slate**: `#64748b` - Text and borders

## 🆚 Comparison with Original Streamlit App

### Improvements Made

- **Modern UI Framework**: Next.js vs Streamlit for better performance
- **Professional Design**: Healthcare-appropriate visual design
- **Better Responsiveness**: Mobile-first responsive design
- **Enhanced Interactivity**: Smooth animations and transitions
- **Type Safety**: TypeScript for better code quality
- **Modular Architecture**: Reusable components and clean code structure
- **Performance**: Faster loading and smoother interactions
- **Scalability**: Easy to extend with new features and KPIs

### Maintained Features

- **All Original KPIs**: Complete healthcare metrics coverage
- **Filter Functionality**: Cohort, time, facility, department filtering
- **Multiple Chart Types**: Bar, donut, line, and scatter plots
- **Detailed Tables**: Comprehensive KPI performance data
- **Healthcare Focus**: Clinical terminology and industry standards

---

© 2024 Aster DM Healthcare | Advanced Clinical Analytics Dashboard

Built with ❤️ and modern web technologies for the healthcare industry.
