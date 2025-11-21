import { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import '../styles/PaymentsPage.css';

export function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<'student' | 'lecture'>('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);

  const studentTransactions = [{
    id: '1',
    name: 'Nimal Perera',
    course: 'Diploma in IT',
    amount: 'Rs.13000',
    date: 'Nav 25, 2025',
    status: 'Complete'
  }, {
    id: '2',
    name: 'Sachini Fernando',
    course: 'Diploma in Law',
    amount: 'Rs.13000',
    date: 'Nav 22, 2025',
    status: 'Complete'
  }, {
    id: '3',
    name: 'Tharindu Jayasooriya',
    course: 'HND in IT',
    amount: 'Rs.15000',
    date: 'Nav 19, 2025',
    status: 'Failed'
  }, {
    id: '4',
    name: 'Malini Silva',
    course: 'Certificate in Business',
    amount: 'Rs.24000',
    date: 'Nav 18, 2025',
    status: 'Complete'
  }, {
    id: '5',
    name: 'Ravi Kumar',
    course: 'HND in Engineering',
    amount: 'Rs.8000',
    date: 'Nav 17, 2025',
    status: 'Complete'
  }, {
    id: '6',
    name: 'Anjali Sharma',
    course: 'Diploma in IT',
    amount: 'Rs.5000',
    date: 'Nav 16, 2025',
    status: 'Failed'
  }];

  const lecturerPayments = [{
    id: '1',
    name: 'Dr. Malsha Karunaratne',
    course: 'Biomedical Science',
    amount: 'Rs.13400',
    date: 'Nav 25, 2025',
    status: 'Complete'
  }, {
    id: '2',
    name: 'Mr. Dilan Madushanka',
    course: 'Web Development Fundamentals',
    amount: 'Rs.13800',
    date: 'Nav 22, 2025',
    status: 'Complete'
  }, {
    id: '3',
    name: 'Ms. Ishara Jayasinghe',
    course: 'HND in IT',
    amount: 'Rs.15000',
    date: 'Nav 19, 2025',
    status: 'Failed'
  }, {
    id: '4',
    name: 'Prof. Sunil Desai',
    course: 'Advanced Python',
    amount: 'Rs.4500',
    date: 'Nav 18, 2025',
    status: 'Complete'
  }, {
    id: '5',
    name: 'Dr. Lisa Wong',
    course: 'Data Science Basics',
    amount: 'Rs.6780',
    date: 'Nav 17, 2025',
    status: 'Complete'
  }, {
    id: '6',
    name: 'Mr. Ahmed Hassan',
    course: 'Mobile App Development',
    amount: 'Rs.8000',
    date: 'Nav 16, 2025',
    status: 'Complete'
  }];

  const itemsPerPage = 5;
  const currentTransactions = activeTab === 'student' ? studentTransactions : lecturerPayments;
  
  const filteredTransactions = currentTransactions.filter(trans =>
    trans.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trans.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  const endingIndex = Math.min(startIndex + itemsPerPage, filteredTransactions.length);

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleTabChange = (tab: 'student' | 'lecture') => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
  };
  return <div className="ops-payments-page">
      <OperationsSidebar />
      <div className="ops-payments-main">
        <OperationsHeader />
        <div className="ops-payments-content">
          <div className="ops-payments-search-wrapper">
            <SearchIcon className="ops-payments-search-icon" />
            <input type="text" placeholder="Search by name or course..." value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }} className="ops-payments-search-input" />
          </div>
          <h1 className="ops-payments-title">Payments</h1>
          <div className="ops-payments-tabs">
            <button onClick={() => handleTabChange('student')} className={`ops-payments-tab ${activeTab === 'student' ? 'active' : ''}`}>
              Student
            </button>
            <button onClick={() => handleTabChange('lecture')} className={`ops-payments-tab ${activeTab === 'lecture' ? 'active' : ''}`}>
              Lecture
            </button>
          </div>
          {activeTab === 'student' && <>
              <div className="ops-payments-stats">
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Total Revenue</p>
                  <p className="ops-payments-stat-value">Rs.125,430.00</p>
                  <p className="ops-payments-stat-change positive">
                    +2.5% vs last month
                  </p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Pending Payments</p>
                  <p className="ops-payments-stat-value">Rs.8,650.00</p>
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
                    {paginatedTransactions.map(transaction => <tr key={transaction.id}>
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
                    Showing {filteredTransactions.length > 0 ? startIndex + 1 : 0} to {endingIndex} of {filteredTransactions.length} results
                  </p>
                  <div className="ops-payments-pagination-buttons">
                    <button className="ops-payments-pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      <ChevronLeftIcon className="ops-payments-pagination-icon" />
                    </button>
                    {[1, 2, 3].map(pageNum => (
                      <button 
                        key={pageNum}
                        className={`ops-payments-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={pageNum > totalPages}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button className="ops-payments-pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
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
                  <p className="ops-payments-stat-value">Rs.125,430.00</p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">Pending Payments</p>
                  <p className="ops-payments-stat-value">Rs.15,200.00</p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">
                    This Month's Payouts
                  </p>
                  <p className="ops-payments-stat-value">Rs.22,800.00</p>
                </div>
                <div className="ops-payments-stat-card">
                  <p className="ops-payments-stat-label">
                    Next Scheduled Payout
                  </p>
                  <p className="ops-payments-stat-value">Rs.54,300</p>
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
                    {paginatedTransactions.map(payment => <tr key={payment.id}>
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
                    Showing {filteredTransactions.length > 0 ? startIndex + 1 : 0} to {endingIndex} of {filteredTransactions.length} results
                  </p>
                  <div className="ops-payments-pagination-buttons">
                    <button className="ops-payments-pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      <ChevronLeftIcon className="ops-payments-pagination-icon" />
                    </button>
                    {[1, 2, 3].map(pageNum => (
                      <button 
                        key={pageNum}
                        className={`ops-payments-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={pageNum > totalPages}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button className="ops-payments-pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
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