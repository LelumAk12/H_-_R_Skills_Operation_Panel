import { useState, useMemo } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useSearch } from '../context/SearchContext';
import '../styles/DashboardPage.css';
const fullRegistrationData = [{
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

// Completion percentage data by time filter
const completionDataByFilter = {
  'Day': 88,
  'Last 7 days': 82,
  'Last 30 days': 75,
  'Last year': 71
};

// Registration data by time filter
const registrationDataByFilter = {
  'Day': [
    { period: '12AM', value: 12 },
    { period: '3AM', value: 18 },
    { period: '6AM', value: 25 },
    { period: '9AM', value: 45 },
    { period: '12PM', value: 65 },
    { period: '3PM', value: 72 },
    { period: '6PM', value: 68 },
    { period: '9PM', value: 55 }
  ],
  'Last 7 days': [
    { period: 'Mon', value: 42 },
    { period: 'Tue', value: 48 },
    { period: 'Wed', value: 55 },
    { period: 'Thu', value: 62 },
    { period: 'Fri', value: 71 },
    { period: 'Sat', value: 58 },
    { period: 'Sun', value: 52 }
  ],
  'Last 30 days': fullRegistrationData,
  'Last year': [
    { period: 'Q1', value: 48 },
    { period: 'Q2', value: 61 },
    { period: 'Q3', value: 76 },
    { period: 'Q4', value: 73 }
  ]
};

export function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const { globalSearchQuery: searchQuery } = useSearch();

  // Define searchable content
  const searchableContent = [
    { id: 'students', label: 'Total Students', value: '1,250', category: 'Stats' },
    { id: 'lecturers', label: 'Total Lectures', value: '75', category: 'Stats' },
    { id: 'courses', label: 'Total Courses', value: '120', category: 'Stats' },
    { id: 'earnings', label: 'Total Earnings', value: 'RS.54,300', category: 'Stats' },
    { id: 'registrations', label: 'Student Registrations', value: 'Daily/Monthly new users', category: 'Chart' },
    { id: 'completion', label: 'Course Completion', value: 'Completed vs In-Progress', category: 'Chart' }
  ];

  // Filter content based on search query
  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchableContent.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  const registrationData = useMemo(() => {
    return registrationDataByFilter[timeFilter as keyof typeof registrationDataByFilter] || fullRegistrationData;
  }, [timeFilter]);
  
  const completedPercentage = useMemo(() => {
    return completionDataByFilter[timeFilter as keyof typeof completionDataByFilter] || 75;
  }, [timeFilter]);

  // Show search results if search query exists
  if (searchQuery.trim()) {
    return <>
      <div className="ops-dashboard-page">
      <OperationsSidebar />
      <div className="ops-dashboard-main">
        <OperationsHeader />
        <div className="ops-dashboard-content">
          <div className="ops-dashboard-search-results">
            <div className="ops-search-header">
              <h2 className="ops-search-title">Search Results</h2>
              <p className="ops-search-query">Results for "{searchQuery}"</p>
            </div>
            {filteredContent.length > 0 ? (
              <div className="ops-search-results-list">
                {filteredContent.map(item => (
                  <div key={item.id} className="ops-search-result-item">
                    <div className="ops-search-result-content">
                      <h3 className="ops-search-result-title">{item.label}</h3>
                      <p className="ops-search-result-description">{item.value}</p>
                      <span className="ops-search-result-category">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ops-search-no-results">
                <p>No results found for "{searchQuery}"</p>
                <p className="ops-search-no-results-hint">Try searching for 'Students', 'Courses', 'Earnings', or 'Registrations'</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      <OperationsFooter />
    </>;
  }
    return <>
      <div className="ops-dashboard-page">
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
              <p className="ops-stat-value">RS.54,300</p>
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
                  <XAxis dataKey={timeFilter === 'Day' ? 'period' : timeFilter === 'Last year' ? 'period' : 'month'} stroke="#9ca3af" />
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
        
      </div>
    </div>
      <OperationsFooter />
    </>;
}