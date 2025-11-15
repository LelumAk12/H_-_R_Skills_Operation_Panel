import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, SearchIcon } from 'lucide-react';
import '../styles/OperationsHeader.css';
export function OperationsHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  return <header className="ops-header">
      <div className="ops-header-logo">
        <img src="/Logo.png" alt="H & R Skills" className="ops-header-logo-image" />
      </div>
      <div className="ops-header-search-wrapper">
        <SearchIcon className="ops-header-search-icon" />
        <input type="text" placeholder="Search users, courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="ops-header-search-input" />
      </div>
      <div className="ops-header-actions">
        <button onClick={() => navigate('/operations/notifications')} className="ops-header-notification">
          <BellIcon className="ops-header-icon" />
          <span className="ops-header-notification-badge">3</span>
        </button>
      </div>
    </header>;
}