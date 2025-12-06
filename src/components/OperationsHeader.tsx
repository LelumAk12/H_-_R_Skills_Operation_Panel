import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BellIcon, SearchIcon } from 'lucide-react';
import '../styles/OperationsHeader.css';
import { useOperations } from '../context/OperationsContext';
import { useSearch } from '../context/SearchContext';

export function OperationsHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { globalSearchQuery, setGlobalSearchQuery } = useSearch();
  const { notifications } = useOperations();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Hide search bar on detail pages
  const isDetailPage = location.pathname.includes('/student/') || location.pathname.includes('/lecturer/');

  return <header className="ops-header">
      {!isDetailPage && <div className="ops-header-search-wrapper">
        <SearchIcon className="ops-header-search-icon" />
        <input type="text" placeholder="Search users, courses..." value={globalSearchQuery} onChange={e => setGlobalSearchQuery(e.target.value)} className="ops-header-search-input" />
      </div>}
      {isDetailPage && <div style={{ flex: 1 }}></div>}
      <div className="ops-header-actions">
        <button onClick={() => navigate('/operations/notifications')} className="ops-header-notification" aria-label="Notifications">
          <BellIcon className="ops-header-icon" />
          {unreadCount > 0 && <span className="ops-header-notification-badge">{unreadCount}</span>}
        </button>
      </div>
    </header>;
}