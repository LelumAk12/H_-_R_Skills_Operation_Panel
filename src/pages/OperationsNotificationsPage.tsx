import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { BellIcon } from 'lucide-react';
import '../styles/OperationsNotificationsPage.css';
export function OperationsNotificationsPage() {
  const notifications = [{
    id: '1',
    title: 'New Student Registered',
    description: 'A new student, *Isuri Perera, has registered for the platform.'
  }, {
    id: '2',
    title: 'New Lecturer Joined',
    description: 'Dr. Kusal Fernando has been added as a lecturer in the Management Department.'
  }, {
    id: '3',
    title: 'Payment Received',
    description: "Payment of $120 received from student *Tharindu Silva for 'Diploma in IT'."
  }, {
    id: '4',
    title: 'Certificate Issued',
    description: "Certificate issued to *Janith Perera for completing 'Diploma in Management'."
  }];
  return <div className="ops-notifications-page">
      <OperationsSidebar />
      <div className="ops-notifications-main">
        <OperationsHeader />
        <div className="ops-notifications-content">
          <h1 className="ops-notifications-title">Notifications</h1>
          <div className="ops-notifications-list">
            {notifications.map(notification => <div key={notification.id} className="ops-notification-card">
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
                </div>
              </div>)}
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}