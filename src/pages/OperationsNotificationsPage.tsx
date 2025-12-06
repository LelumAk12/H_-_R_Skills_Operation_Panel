import { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsFooter } from '../components/OperationsFooter';
import { BellIcon, EyeIcon, XIcon } from 'lucide-react';
import '../styles/OperationsNotificationsPage.css';
import { useOperations } from '../context/OperationsContext';

export function OperationsNotificationsPage() {
  const { notifications, markNotificationAsRead, deleteNotification } = useOperations();
  const [viewNotification, setViewNotification] = useState<string | null>(null);

  

  const handleView = (id: string) => {
    // open modal and mark as read
    markNotificationAsRead(id);
    setViewNotification(id);
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
    if (viewNotification === id) setViewNotification(null);
  };

  const viewed = viewNotification ? notifications.find(n => n.id === viewNotification) : null;

  return <>
    <div className="ops-notifications-page">
      <OperationsSidebar />
      <div className="ops-notifications-main">
        <div className="ops-notifications-header-bar">
          <h1 className="ops-notifications-page-title">Notifications</h1>
        </div>
        <div className="ops-notifications-content">
          <div className="ops-notifications-list">
            {notifications.map(notification => <div key={notification.id} className={`ops-notification-card ${notification.read ? 'read' : 'unread'}`}>
                <div className="ops-notification-icon-wrapper">
                  <BellIcon className="ops-notification-icon" />
                </div>
                <div className="ops-notification-details">
                  <h3 className="ops-notification-title">
                    {notification.title}
                  </h3>
                  <p className="ops-notification-description">
                    {notification.description}
                  </p>
                  <p className="ops-notification-timestamp">{notification.timestamp}</p>
                </div>
                <div className="ops-notification-actions">
                  <button className="ops-action-button view" title="View" onClick={() => handleView(notification.id)}>
                    <EyeIcon className="ops-action-icon" />
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {viewNotification && viewed && <div className="ops-modal-overlay" onClick={() => setViewNotification(null)}>
          <div className="ops-modal ops-modal-large" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-header">
              <h2 className="ops-modal-title">{viewed.title}</h2>
              <button onClick={() => setViewNotification(null)} className="ops-modal-close">
                <XIcon className="ops-modal-close-icon" />
              </button>
            </div>
            <div className="ops-modal-body">
              <p>{viewed.description}</p>
              <p className="ops-notification-timestamp">{viewed.timestamp}</p>
            </div>
            <div className="ops-modal-footer">
              <button onClick={() => setViewNotification(null)} className="ops-modal-btn cancel">Close</button>
              <button onClick={() => handleDelete(viewed.id)} className="ops-modal-btn delete">Delete</button>
            </div>
          </div>
        </div>}
    </div>
    <OperationsFooter />
  </>;
}