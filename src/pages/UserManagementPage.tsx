import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { useOperations } from '../context/OperationsContext';
import { EyeIcon, Trash2Icon, Edit2Icon } from 'lucide-react';
import '../styles/UserManagementPage.css';
export function UserManagementPage() {
  const navigate = useNavigate();
  const {
    students,
    lecturers
  } = useOperations();
  const [activeTab, setActiveTab] = useState<'students' | 'lecturers'>('students');
  return <div className="ops-user-management-page">
      <OperationsSidebar />
      <div className="ops-user-management-main">
        <OperationsHeader />
        <div className="ops-user-management-content">
          <h1 className="ops-user-management-title">User Management</h1>
          <div className="ops-user-management-tabs">
            <button onClick={() => setActiveTab('students')} className={`ops-tab ${activeTab === 'students' ? 'active' : ''}`}>
              Students
            </button>
            <button onClick={() => setActiveTab('lecturers')} className={`ops-tab ${activeTab === 'lecturers' ? 'active' : ''}`}>
              Lecturers
            </button>
          </div>
          {activeTab === 'students' && <div className="ops-table-container">
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => <tr key={student.id}>
                      <td className="ops-table-name">{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.registeredDate}</td>
                      <td>
                        <span className={`ops-status ${student.status.toLowerCase()}`}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="ops-table-actions">
                          <button onClick={() => navigate(`/operations/student/${student.id}`)} className="ops-action-button view">
                            <EyeIcon className="ops-action-icon" />
                          </button>
                          <button onClick={() => navigate(`/operations/edit-user/${student.id}`)} className="ops-action-button edit">
                            <Edit2Icon className="ops-action-icon" />
                          </button>
                          <button className="ops-action-button delete">
                            <Trash2Icon className="ops-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
          {activeTab === 'lecturers' && <div className="ops-table-container">
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered Date</th>
                    <th>Total Courses</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map(lecturer => <tr key={lecturer.id}>
                      <td className="ops-table-name">{lecturer.name}</td>
                      <td>{lecturer.email}</td>
                      <td>{lecturer.registeredDate}</td>
                      <td>{lecturer.totalCourses}</td>
                      <td>
                        <span className={`ops-status ${lecturer.status.toLowerCase()}`}>
                          {lecturer.status}
                        </span>
                      </td>
                      <td>
                        <div className="ops-table-actions">
                          <button onClick={() => navigate(`/operations/lecturer/${lecturer.id}`)} className="ops-action-button view">
                            <EyeIcon className="ops-action-icon" />
                          </button>
                          <button onClick={() => navigate(`/operations/edit-user/${lecturer.id}`)} className="ops-action-button edit">
                            <Edit2Icon className="ops-action-icon" />
                          </button>
                          <button className="ops-action-button delete">
                            <Trash2Icon className="ops-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
        </div>
        <OperationsFooter />
      </div>
    </div>;
}