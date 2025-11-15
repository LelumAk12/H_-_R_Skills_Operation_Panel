import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OperationsProvider } from './context/OperationsContext';
import { LoginPage as OperationsLoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { StudentDetailPage } from './pages/StudentDetailPage';
import { LecturerDetailPage } from './pages/LecturerDetailPage';
import { CourseManagementPage } from './pages/CourseManagementPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { AnnouncementPage } from './pages/AnnouncementPage';
import { OperationsSettingsPage } from './pages/OperationsSettingsPage';
import { OperationsNotificationsPage } from './pages/OperationsNotificationsPage';
import { EditUserPage } from './pages/EditUserPage';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/operations/login" replace />} />
        {/* Operations Routes */}
        <Route path="/operations/login" element={<OperationsProvider>
              <OperationsLoginPage />
            </OperationsProvider>} />
        <Route path="/operations/dashboard" element={<OperationsProvider>
              <DashboardPage />
            </OperationsProvider>} />
        <Route path="/operations/user-management" element={<OperationsProvider>
              <UserManagementPage />
            </OperationsProvider>} />
        <Route path="/operations/student/:id" element={<OperationsProvider>
              <StudentDetailPage />
            </OperationsProvider>} />
        <Route path="/operations/edit-user/:id" element={<OperationsProvider>
              <EditUserPage />
            </OperationsProvider>} />
        <Route path="/operations/lecturer/:id" element={<OperationsProvider>
              <LecturerDetailPage />
            </OperationsProvider>} />
        <Route path="/operations/courses" element={<OperationsProvider>
              <CourseManagementPage />
            </OperationsProvider>} />
        <Route path="/operations/payments" element={<OperationsProvider>
              <PaymentsPage />
            </OperationsProvider>} />
        <Route path="/operations/announcements" element={<OperationsProvider>
              <AnnouncementPage />
            </OperationsProvider>} />
        <Route path="/operations/notifications" element={<OperationsProvider>
              <OperationsNotificationsPage />
            </OperationsProvider>} />
        <Route path="/operations/settings" element={<OperationsProvider>
              <OperationsSettingsPage />
            </OperationsProvider>} />
      </Routes>
    </BrowserRouter>;
}