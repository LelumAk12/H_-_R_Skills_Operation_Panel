import { useState, useMemo, useEffect } from 'react';
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

  const [studentTransactions, setStudentTransactions] = useState([{
    id: '1',
    name: 'Nimal Perera',
    course: 'Diploma in IT',
    amount: 'Rs.13000',
    date: 'Nov 25, 2025',
    isoDate: '2025-11-25',
    status: 'Complete'
  }, {
    id: '2',
    name: 'Sachini Fernando',
    course: 'Diploma in Law',
    amount: 'Rs.13000',
    date: 'Nov 22, 2025',
    isoDate: '2025-11-22',
    status: 'Complete'
  }, {
    id: '3',
    name: 'Tharindu Jayasooriya',
    course: 'HND in IT',
    amount: 'Rs.15000',
    date: 'Nov 19, 2025',
    isoDate: '2025-11-19',
    status: 'Failed'
  }, {
    id: '4',
    name: 'Malini Silva',
    course: 'Certificate in Business',
    amount: 'Rs.24000',
    date: 'Oct 18, 2025',
    isoDate: '2025-10-18',
    status: 'Complete'
  }, {
    id: '5',
    name: 'Ravi Kumar',
    course: 'HND in Engineering',
    amount: 'Rs.8000',
    date: 'Nov 17, 2024',
    isoDate: '2024-11-17',
    status: 'Complete'
  }, {
    id: '6',
    name: 'Anjali Sharma',
    course: 'Diploma in IT',
    amount: 'Rs.5000',
    date: 'Nov 16, 2025',
    isoDate: '2025-11-16',
    status: 'Failed'
  }]);

  const [lecturerPayments, setLecturerPayments] = useState([{
    id: '1',
    name: 'Dr. Malsha Karunaratne',
    course: 'Biomedical Science',
    amount: 'Rs.13400',
    date: 'Nov 25, 2025',
    isoDate: '2025-11-25',
    status: 'Complete'
  }, {
    id: '2',
    name: 'Mr. Dilan Madushanka',
    course: 'Web Development Fundamentals',
    amount: 'Rs.13800',
    date: 'Nov 20, 2025',
    isoDate: '2025-11-20',
    status: 'Complete'
  }, {
    id: '3',
    name: 'Ms. Ishara Jayasinghe',
    course: 'HND in IT',
    amount: 'Rs.15000',
    date: 'Sep 19, 2025',
    isoDate: '2025-09-19',
    status: 'Failed'
  }, {
    id: '4',
    name: 'Prof. Sunil Desai',
    course: 'Advanced Python',
    amount: 'Rs.4500',
    date: 'Oct 18, 2025',
    isoDate: '2025-10-18',
    status: 'Complete'
  }, {
    id: '5',
    name: 'Dr. Lisa Wong',
    course: 'Data Science Basics',
    amount: 'Rs.6780',
    date: 'Nov 01, 2024',
    isoDate: '2024-11-01',
    status: 'Complete'
  }, {
    id: '6',
    name: 'Mr. Ahmed Hassan',
    course: 'Mobile App Development',
    amount: 'Rs.8000',
    date: 'Nov 16, 2025',
    isoDate: '2025-11-16',
    status: 'Complete'
  }]);

  const itemsPerPage = 5;
  const currentTransactions = activeTab === 'student' ? studentTransactions : lecturerPayments;
  const [refundedIds, setRefundedIds] = useState<string[]>([]);
  const [actionModal, setActionModal] = useState<null | { type: 'refund' | 'retry'; tab: 'student' | 'lecture'; id: string }>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('refundedPayments');
      if (raw) setRefundedIds(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('refundedPayments', JSON.stringify(refundedIds));
    } catch (e) {
      // ignore
    }
  }, [refundedIds]);

  const cutoffDate = useMemo(() => {
    const now = new Date();
    switch (timeFilter) {
      case 'Day':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      case 'Last 7 days':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'Last 30 days':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case 'Last year':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      default:
        return new Date(0);
    }
  }, [timeFilter]);

  const filteredTransactions = currentTransactions.filter(trans => {
    // search match
    const searchMatch = trans.name.toLowerCase().includes(searchQuery.toLowerCase()) || trans.course.toLowerCase().includes(searchQuery.toLowerCase());
    if (!searchMatch) return false;
    // exclude refunded (namespace by tab to avoid collisions)
    const key = `${activeTab}:${trans.id}`;
    if (refundedIds.includes(key)) return false;
    // time filter match — use isoDate if present
    const tDate = trans.isoDate ? new Date(trans.isoDate) : new Date(trans.date);
    return tDate >= cutoffDate;
  });

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
  return <>
    <div className="ops-payments-page">
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
                <select className="ops-payments-filter-btn" value={timeFilter} onChange={e => { setTimeFilter(e.target.value); setCurrentPage(1); }}>
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
                          <button
                            className={`ops-payments-action-btn ${transaction.status === 'Failed' ? 'retry' : 'refund'}`}
                            onClick={() => setActionModal({ type: transaction.status === 'Failed' ? 'retry' : 'refund', tab: activeTab, id: transaction.id })}
                          >
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
          {/* Action Modal (Refund / Retry) */}
          {actionModal && (() => {
            const list = actionModal.tab === 'student' ? studentTransactions : lecturerPayments;
            const tx = list.find(t => t.id === actionModal.id);
            if (!tx) return null;
            return <div className="ops-modal-overlay" onClick={() => setActionModal(null)}>
                <div className="ops-modal ops-modal-small" onClick={e => e.stopPropagation()}>
                  <div className="ops-modal-header">
                    <h2 className="ops-modal-title">{actionModal.type === 'refund' ? 'Refund Payment' : 'Retry Payment'}</h2>
                    <button onClick={() => setActionModal(null)} className="ops-modal-close">×</button>
                  </div>
                  <div className="ops-modal-body">
                    <p>Transaction: <strong>{tx.name}</strong></p>
                    <p>Course: {tx.course}</p>
                    <p>Amount: {tx.amount}</p>
                    <p>Status: {tx.status}</p>
                    <p>Do you want to {actionModal.type === 'refund' ? 'refund' : 'retry'} this payment?</p>
                  </div>
                  <div className="ops-modal-footer">
                    <button onClick={() => setActionModal(null)} className="ops-modal-btn cancel">Cancel</button>
                    <button onClick={() => {
                      if (actionModal.type === 'refund') {
                        // add to refundedIds (namespace by tab)
                        const key = `${actionModal.tab}:${actionModal.id}`;
                        setRefundedIds(prev => {
                          const next = Array.from(new Set([...prev, key]));
                          return next;
                        });
                      } else {
                        // retry: update only the corresponding state list
                        if (actionModal.tab === 'student') {
                          setStudentTransactions(prev => prev.map(p => p.id === actionModal.id ? { ...p, status: 'Complete' } : p));
                        } else {
                          setLecturerPayments(prev => prev.map(p => p.id === actionModal.id ? { ...p, status: 'Complete' } : p));
                        }
                      }
                      setActionModal(null);
                    }} className="ops-modal-btn save">{actionModal.type === 'refund' ? 'Confirm Refund' : 'Confirm Retry'}</button>
                  </div>
                </div>
              </div>;
          })()}
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
                <select className="ops-payments-filter-btn" value={timeFilter} onChange={e => { setTimeFilter(e.target.value); setCurrentPage(1); }}>
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
      </div>
    </div>
    <OperationsFooter />
  </>;
}