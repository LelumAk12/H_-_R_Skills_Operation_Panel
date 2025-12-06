import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { useOperations } from '../context/OperationsContext';
import { useSearch } from '../context/SearchContext';
import { EyeIcon, Trash2Icon, Edit2Icon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/UserManagementPage.css';

// Search function for filtering students and lecturers
const searchUsers = (users: any[], query: string) => {
  if (!query.trim()) return users;
  const lowerQuery = query.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(lowerQuery) || 
    user.email.toLowerCase().includes(lowerQuery)
  );
};

export function UserManagementPage() {
  const navigate = useNavigate();
  const {
    students,
    lecturers,
    deleteStudent,
    deleteLecturer
  } = useOperations();
  const [activeTab, setActiveTab] = useState<'students' | 'lecturers'>('students');
  const { globalSearchQuery: searchQuery } = useSearch();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
    type: 'student' | 'lecturer';
  } | null>(null);
  
  const filteredStudents = useMemo(() => searchUsers(students, searchQuery), [students, searchQuery]);
  const filteredLecturers = useMemo(() => searchUsers(lecturers, searchQuery), [lecturers, searchQuery]);
  
  const handleDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'student') {
      deleteStudent(deleteConfirm.id);
      toast.success('Student deleted successfully');
    } else {
      deleteLecturer(deleteConfirm.id);
      toast.success('Lecturer deleted successfully');
    }
    setDeleteConfirm(null);
  };
    return <>
      <div className="ops-user-management-page">
      <OperationsSidebar />
      <div className="ops-user-management-main">
        <OperationsHeader />
        <div className="ops-user-management-content">
          <div className="ops-user-management-header">
            <h1 className="ops-user-management-title">User Management</h1>
          </div>
          <div className="ops-user-management-tabs">
            <button onClick={() => setActiveTab('students')} className={`ops-tab ${activeTab === 'students' ? 'active' : ''}`}>
              Students ({students.length})
            </button>
            <button onClick={() => setActiveTab('lecturers')} className={`ops-tab ${activeTab === 'lecturers' ? 'active' : ''}`}>
              Lecturers ({lecturers.length})
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
                  {filteredStudents.map(student => <tr key={student.id}>
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
                          <button onClick={() => navigate(`/operations/student/${student.id}`)} className="ops-action-button view" title="View Details">
                            <EyeIcon className="ops-action-icon" />
                          </button>
                          <button onClick={() => navigate(`/operations/edit-user/${student.id}`)} className="ops-action-button edit" title="Edit User">
                            <Edit2Icon className="ops-action-icon" />
                          </button>
                          <button onClick={() => setDeleteConfirm({
                      id: student.id,
                      name: student.name,
                      type: 'student'
                    })} className="ops-action-button delete" title="Delete User">
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
                  {filteredLecturers.map(lecturer => <tr key={lecturer.id}>
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
                          <button onClick={() => navigate(`/operations/lecturer/${lecturer.id}`)} className="ops-action-button view" title="View Details">
                            <EyeIcon className="ops-action-icon" />
                          </button>
                          <button onClick={() => navigate(`/operations/edit-user/${lecturer.id}`)} className="ops-action-button edit" title="Edit User">
                            <Edit2Icon className="ops-action-icon" />
                          </button>
                          <button onClick={() => setDeleteConfirm({
                      id: lecturer.id,
                      name: lecturer.name,
                      type: 'lecturer'
                    })} className="ops-action-button delete" title="Delete User">
                            <Trash2Icon className="ops-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteConfirm && <div className="ops-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="ops-modal ops-modal-small" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-header">
              <h2 className="ops-modal-title">Confirm Delete</h2>
              <button onClick={() => setDeleteConfirm(null)} className="ops-modal-close">
                <XIcon className="ops-modal-close-icon" />
              </button>
            </div>
            <div className="ops-modal-body">
              <p className="ops-modal-text">
                Are you sure you want to delete{' '}
                <strong>{deleteConfirm.name}</strong>? This action cannot be
                undone.
              </p>
            </div>
            <div className="ops-modal-footer">
              <button onClick={() => setDeleteConfirm(null)} className="ops-modal-btn cancel">
                Cancel
              </button>
              <button onClick={handleDelete} className="ops-modal-btn delete">
                Delete
              </button>
            </div>
          </div>
        </div>}
    </div>
  <OperationsFooter />
  </>;
}