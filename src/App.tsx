import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { OperationsProvider } from './context/OperationsContext';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
// Operations Routes
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
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/operations/login" replace />} />

        {/* Operations Routes */}
        <Route path="/operations/login" element={<OperationsProvider>
              <OperationsLoginPage />
            </OperationsProvider>} />
        <Route path="/operations/dashboard" element={<ProtectedRoute><OperationsProvider>
              <DashboardPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/user-management" element={<ProtectedRoute><OperationsProvider>
              <UserManagementPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/student/:id" element={<ProtectedRoute><OperationsProvider>
              <StudentDetailPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/edit-user/:id" element={<ProtectedRoute><OperationsProvider>
              <EditUserPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/lecturer/:id" element={<ProtectedRoute><OperationsProvider>
              <LecturerDetailPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/courses" element={<ProtectedRoute><OperationsProvider>
              <CourseManagementPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/payments" element={<ProtectedRoute><OperationsProvider>
              <PaymentsPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/announcements" element={<ProtectedRoute><OperationsProvider>
              <AnnouncementPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/notifications" element={<ProtectedRoute><OperationsProvider>
              <OperationsNotificationsPage />
            </OperationsProvider></ProtectedRoute>} />
        <Route path="/operations/settings" element={<ProtectedRoute><OperationsProvider>
              <OperationsSettingsPage />
            </OperationsProvider></ProtectedRoute>} />
        {/* Catch-all: redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/operations/login" replace />} />
      </Routes>
    </BrowserRouter>;
}