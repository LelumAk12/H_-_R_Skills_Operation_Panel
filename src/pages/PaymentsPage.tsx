import { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import '../styles/PaymentsPage.css';
export function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<'student' | 'lecture'>('student');
  const [] = useState('');
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const studentTransactions = [{
    id: '1',
    name: 'Nimal Perera',
    course: 'Diploma in IT',
    amount: '$134',
    date: 'Nav 25, 2025',
    status: 'Complete'
  }, {
    id: '2',
    name: 'Sachini Fernando',
    course: 'Diploma in Law',
    amount: '$138',
    date: 'Nav 22, 2025',
    status: 'Complete'
  }, {
    id: '3',
    name: 'Tharindu Jayasooriya',
    course: 'HND in IT',
    amount: '$1562',
    date: 'Nav 19, 2025',
    status: 'Failed'
  }];
  const lecturerPayments = [{
    id: '1',
    name: 'Dr. Malsha Karunaratne',
    course: 'Biomedical Science',
    amount: '$134',
    date: 'Nav 25, 2025',
    status: 'Complete'
  }, {
    id: '2',
    name: 'Mr. Dilan Madushanka',
    course: 'Web Development Fundamentals',
    amount: '$138',
    date: 'Nav 22, 2025',
    status: 'Complete'
  }, {
    id: '3',
    name: 'Ms. Ishara Jayasinghe',
    course: 'HND in IT',
    amount: '$1562',
    date: 'Nav 19, 2025',
    status: 'Failed'
  }];
  return <div className="ops-payments-page">
      <OperationsSidebar />
      <div className="ops-payments-main">
        <OperationsHeader />
        <div className="ops-payments-content">

          <h1 className="ops-payments-title">Payments</h1>
          <div className="ops-payments-tabs">
            <button onClick={() => setActiveTab('student')} className={`ops-payments-tab ${activeTab === 'student' ? 'active' : ''}`}>
              Student
            </button>
            <button onClick={() => setActiveTab('lecture')} className={`ops-payments-tab ${activeTab === 'lecture' ? 'active' : ''}`}>
              Lecture
            </button>
          </div>
          {activeTab === 'student' && <>
              <div className="ops-payments-stats">
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Total Revenue</p>
                  <p className="ops-payments-stat-value">$125,430.00</p>
                  <p className="ops-payments-stat-change positive">
                    +2.5% vs last month
                  </p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Pending Payments</p>
                  <p className="ops-payments-stat-value">$8,650.00</p>
                  <p className="ops-payments-stat-change positive">
                    +1.8% vs last month
                  </p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">
                    Recent Transactions (7d)
                  </p>
                  <p className="ops-payments-stat-value">72</p>
                  <p className="ops-payments-stat-change negative">
                    -0.5% vs last week
                  </p>
                </div>
              </div>
              <div className="ops-payments-filter-wrapper">
                <select className="ops-payments-filter-btn" value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
                  <option value="Day">Day</option>
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last year">Last year</option>
                </select>
              </div>
              <div className="ops-payments-table-container">
                <table className="ops-payments-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentTransactions.map(transaction => <tr key={transaction.id}>
                        <td className="ops-payments-name-cell">
                          {transaction.name}
                        </td>
                        <td className="ops-payments-course-cell">
                          {transaction.course}
                        </td>
                        <td className="ops-payments-amount-cell">
                          {transaction.amount}
                        </td>
                        <td className="ops-payments-date-cell">
                          {transaction.date}
                        </td>
                        <td>
                          <span className={`ops-payments-status ${transaction.status.toLowerCase()}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td>
                          <button className={`ops-payments-action-btn ${transaction.status === 'Failed' ? 'retry' : 'refund'}`}>
                            {transaction.status === 'Failed' ? 'Retry' : 'Refund'}
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
                <div className="ops-payments-pagination">
                  <p className="ops-payments-pagination-text">
                    Showing 1 to 5 of 97 results
                  </p>
                  <div className="ops-payments-pagination-buttons">
                    <button className="ops-payments-pagination-btn">
                      <ChevronLeftIcon className="ops-payments-pagination-icon" />
                    </button>
                    <button className="ops-payments-pagination-btn active">
                      1
                    </button>
                    <button className="ops-payments-pagination-btn">2</button>
                    <button className="ops-payments-pagination-btn">3</button>
                    <button className="ops-payments-pagination-btn">
                      <ChevronRightIcon className="ops-payments-pagination-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </>}
          {activeTab === 'lecture' && <>
              <div className="ops-payments-stats">
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Total Payments Made</p>
                  <p className="ops-payments-stat-value">$125,430.00</p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Pending Payments</p>
                  <p className="ops-payments-stat-value">$15,200.00</p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">
                    This Month's Payouts
                  </p>
                  <p className="ops-payments-stat-value">$22,800.00</p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">
                    Next Scheduled Payout
                  </p>
                  <p className="ops-payments-stat-value">$54,300</p>
                </div>
              </div>
              <div className="ops-payments-filter-wrapper">
                <select className="ops-payments-filter-btn" value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
                  <option value="Day">Day</option>
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last year">Last year</option>
                </select>
              </div>
              <div className="ops-payments-table-container">
                <table className="ops-payments-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Amount</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturerPayments.map(payment => <tr key={payment.id}>
                        <td className="ops-payments-name-cell">
                          {payment.name}
                        </td>
                        <td className="ops-payments-course-cell">
                          {payment.course}
                        </td>
                        <td className="ops-payments-amount-cell">
                          {payment.amount}
                        </td>
                        <td className="ops-payments-date-cell">
                          {payment.date}
                        </td>
                        <td>
                          <span className={`ops-payments-status ${payment.status.toLowerCase()}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
                <div className="ops-payments-pagination">
                  <p className="ops-payments-pagination-text">
                    Showing 1 to 5 of 97 results
                  </p>
                  <div className="ops-payments-pagination-buttons">
                    <button className="ops-payments-pagination-btn">
                      <ChevronLeftIcon className="ops-payments-pagination-icon" />
                    </button>
                    <button className="ops-payments-pagination-btn active">
                      1
                    </button>
                    <button className="ops-payments-pagination-btn">2</button>
                    <button className="ops-payments-pagination-btn">3</button>
                    <button className="ops-payments-pagination-btn">
                      <ChevronRightIcon className="ops-payments-pagination-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </>}
        </div>
        <OperationsFooter />
      </div>
    </div>;
}