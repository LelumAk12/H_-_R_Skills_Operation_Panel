import { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../styles/DashboardPage.css';
const registrationData = [{
  month: 'Jan',
  value: 45
}, {
  month: 'Feb',
  value: 52
}, {
  month: 'Mar',
  value: 48
}, {
  month: 'Apr',
  value: 61
}, {
  month: 'May',
  value: 55
}, {
  month: 'Jun',
  value: 67
}, {
  month: 'Jul',
  value: 73
}, {
  month: 'Aug',
  value: 69
}, {
  month: 'Sep',
  value: 78
}, {
  month: 'Oct',
  value: 85
}, {
  month: 'Nov',
  value: 73
}, {
  month: 'Dec',
  value: 82
}];
export function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const completedPercentage = 75;
  return <div className="ops-dashboard-page">
      <OperationsSidebar />
      <div className="ops-dashboard-main">
        <OperationsHeader />
        <div className="ops-dashboard-content">
          <div className="ops-dashboard-header">
            <h1 className="ops-dashboard-title">Overview</h1>
            <select className="ops-dashboard-filter" value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
              <option value="Day">Day</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last year">Last year</option>
            </select>
          </div>
          <div className="ops-dashboard-stats">
            <div className="ops-stat-card">
              <p className="ops-stat-label">Total Students</p>
              <p className="ops-stat-value">1,250</p>
              <p className="ops-stat-change positive">+5.4%</p>
            </div>
            <div className="ops-stat-card">
              <p className="ops-stat-label">Total Lectures</p>
              <p className="ops-stat-value">75</p>
              <p className="ops-stat-change positive">+1.2%</p>
            </div>
            <div className="ops-stat-card">
              <p className="ops-stat-label">Total Courses</p>
              <p className="ops-stat-value">120</p>
              <p className="ops-stat-change new">+10 New</p>
            </div>
            <div className="ops-stat-card">
              <p className="ops-stat-label">Total Earnings</p>
              <p className="ops-stat-value">$54,300</p>
              <p className="ops-stat-change positive">+12.5%</p>
            </div>
          </div>
          <div className="ops-dashboard-charts">
            <div className="ops-chart-card">
              <div className="ops-chart-header">
                <div>
                  <h3 className="ops-chart-title">Student Registrations</h3>
                  <p className="ops-chart-subtitle">Daily/Monthly new users</p>
                </div>
                <p className="ops-chart-change">+15.2%</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorGradient)" dot={false} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="ops-chart-card">
              <div className="ops-chart-header">
                <div>
                  <h3 className="ops-chart-title">Course Completion</h3>
                  <p className="ops-chart-subtitle">Completed vs In-Progress</p>
                </div>
              </div>
              <div className="ops-donut-chart">
                <svg viewBox="0 0 200 200" className="ops-donut-svg">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray={`${completedPercentage * 4.4} 440`} strokeDashoffset="110" strokeLinecap="round" transform="rotate(-90 100 100)" />
                  <text x="100" y="100" textAnchor="middle" dy="10" className="ops-donut-percentage">
                    {completedPercentage}%
                  </text>
                  <text x="100" y="125" textAnchor="middle" className="ops-donut-label">
                    Complete
                  </text>
                </svg>
                <div className="ops-donut-legend">
                  <div className="ops-legend-item">
                    <span className="ops-legend-dot completed"></span>
                    <span className="ops-legend-text">Completed</span>
                  </div>
                  <div className="ops-legend-item">
                    <span className="ops-legend-dot in-progress"></span>
                    <span className="ops-legend-text">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}