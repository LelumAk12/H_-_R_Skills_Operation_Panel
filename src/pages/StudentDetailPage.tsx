import { useParams, useNavigate } from 'react-router-dom';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { useOperations } from '../context/OperationsContext';
import '../styles/StudentDetailPage.css';
export function StudentDetailPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    getStudentById
  } = useOperations();
  const student = id ? getStudentById(id) : undefined;
  if (!student) {
    return <div className="ops-student-detail-page">
        <OperationsSidebar />
        <div className="ops-student-detail-main">
          <OperationsHeader />
          <div className="ops-student-detail-content">
            <p>Student not found</p>
          </div>
          <OperationsFooter />
        </div>
      </div>;
  }
  return <div className="ops-student-detail-page">
      <OperationsSidebar />
      <div className="ops-student-detail-main">
        <OperationsHeader />
        <div className="ops-student-detail-content">
          <div className="ops-student-profile-card">
            <img src="Profile.jpg" alt={student.name} className="ops-student-profile-photo" />
            <div className="ops-student-profile-info">
              <h2 className="ops-student-profile-name">{student.name}</h2>
              <p className="ops-student-profile-id">
                Student ID: {student.studentId}
              </p>
              <span className="ops-student-profile-status active">
                Status: Active
              </span>
            </div>
          </div>
          <div className="ops-student-details-grid">
            <div className="ops-student-left-section">
              <div className="ops-student-stats-card">
                <h3 className="ops-student-section-title">Statistics</h3>
                <div className="ops-student-stat-item">
                  <p className="ops-student-stat-label">Courses Enrolled</p>
                  <p className="ops-student-stat-value">
                    {student.coursesEnrolled}
                  </p>
                </div>
                <div className="ops-student-stat-item">
                  <p className="ops-student-stat-label">Courses Completed</p>
                  <p className="ops-student-stat-value">
                    {student.coursesCompleted}
                  </p>
                </div>
              </div>
              <div className="ops-student-contact-card">
                <h3 className="ops-student-section-title">Contact Details</h3>
                <div className="ops-student-contact-row">
                  <span className="ops-student-contact-label">Email</span>
                  <span className="ops-student-contact-value">
                    {student.email}
                  </span>
                </div>
                <div className="ops-student-contact-row">
                  <span className="ops-student-contact-label">Phone</span>
                  <span className="ops-student-contact-value">
                    {student.phone}
                  </span>
                </div>
                <div className="ops-student-contact-row">
                  <span className="ops-student-contact-label">Registered</span>
                  <span className="ops-student-contact-value">
                    {student.registeredDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="ops-student-right-section">
              <div className="ops-student-overview-card">
                <h3 className="ops-student-section-title">Overview</h3>
                <div className="ops-student-personal-info">
                  <h4 className="ops-student-subsection-title">
                    Personal Information
                  </h4>
                  <table className="ops-student-info-table">
                    <tbody>
                      <tr>
                        <td className="ops-student-info-label">Full Name</td>
                        <td className="ops-student-info-value">
                          {student.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="ops-student-info-label">
                          Date of Birth
                        </td>
                        <td className="ops-student-info-value">
                          {student.dateOfBirth}
                        </td>
                      </tr>
                      <tr>
                        <td className="ops-student-info-label">Address</td>
                        <td className="ops-student-info-value">
                          {student.address}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="ops-student-recent-activity">
                  <h4 className="ops-student-subsection-title">
                    Recent Activity
                  </h4>
                  <table className="ops-student-activity-table">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Progress</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.recentActivity.map((activity, index) => <tr key={index}>
                          <td>{activity.courseName}</td>
                          <td>
                            <div className="ops-student-progress-container">
                              <div className="ops-student-progress-bar">
                                <div className="ops-student-progress-fill" style={{
                              width: `${activity.progress}%`
                            }} />
                              </div>
                              <span className="ops-student-progress-text">
                                {activity.progress}%
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`ops-student-activity-status ${activity.status.toLowerCase().replace(' ', '-')}`}>
                              • {activity.status}
                            </span>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}