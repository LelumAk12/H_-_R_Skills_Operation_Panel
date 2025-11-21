import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, SearchIcon } from 'lucide-react';
import '../styles/OperationsHeader.css';
import { useOperations } from '../context/OperationsContext';

export function OperationsHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { notifications } = useOperations();
  const unreadCount = notifications.filter(n => !n.read).length;

  return <header className="ops-header">
      <div className="ops-header-search-wrapper">
        <SearchIcon className="ops-header-search-icon" />
        <input type="text" placeholder="Search users, courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="ops-header-search-input" />
      </div>
      <div className="ops-header-actions">
        <button onClick={() => navigate('/operations/notifications')} className="ops-header-notification" aria-label="Notifications">
          <BellIcon className="ops-header-icon" />
          {unreadCount > 0 && <span className="ops-header-notification-badge">{unreadCount}</span>}
        </button>
      </div>
    </header>;
}