import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, UsersIcon, BookOpenIcon, CreditCardIcon, MegaphoneIcon, SettingsIcon, LogOutIcon, BellIcon } from 'lucide-react';
import { useOperations } from '../context/OperationsContext';
import '../styles/OperationsSidebar.css';
export function OperationsSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { platformSettings } = useOperations();
  const menuItems = [{
    icon: LayoutDashboardIcon,
    label: 'Overview',
    path: '/operations/dashboard'
  }, {
    icon: UsersIcon,
    label: 'User Management',
    path: '/operations/user-management'
  }, {
    icon: BookOpenIcon,
    label: 'Course Management',
    path: '/operations/courses'
  }, {
    icon: CreditCardIcon,
    label: 'Payments',
    path: '/operations/payments'
  }, {
    icon: MegaphoneIcon,
    label: 'Announcement',
    path: '/operations/announcements'
  }, {
    icon: BellIcon,
    label: 'Notifications',
    path: '/operations/notifications'
  }, {
    icon: SettingsIcon,
    label: 'Settings',
    path: '/operations/settings'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <div className="ops-sidebar">
      <div className="ops-sidebar-header">
        <img src={platformSettings.logoUrl} alt={platformSettings.platformName} className="ops-sidebar-logo" />
        <div className="ops-sidebar-brand">
          <h2 className="ops-sidebar-title">Admin Dashboard</h2>
          <p className="ops-sidebar-subtitle">admin@gmail.com</p>
        </div>
      </div>
      <nav className="ops-sidebar-nav">
        {menuItems.map(item => <button key={item.path} onClick={() => navigate(item.path)} className={`ops-sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}>
            <item.icon className="ops-sidebar-nav-icon" />
            <span>{item.label}</span>
          </button>)}
      </nav>
      <button onClick={() => navigate('/operations/login')} className="ops-sidebar-logout">
        <LogOutIcon className="ops-sidebar-nav-icon" />
        <span>Logout</span>
      </button>
    </div>;
}