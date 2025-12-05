import { useParams } from 'react-router-dom';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { GraduationCapIcon } from 'lucide-react';
import '../styles/LecturerDetailPage.css';
import { useOperations } from '../context/OperationsContext';
export function LecturerDetailPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const { getLecturerById } = useOperations();
  const lecturer = id ? getLecturerById(id) : undefined;
  if (!lecturer) {
    return <>
      <div className="ops-lecturer-detail-page">
        <OperationsSidebar />
        <div className="ops-lecturer-detail-main">
          <OperationsHeader />
          <div className="ops-lecturer-detail-content">
            <p>Lecturer not found</p>
          </div>
        </div>
      </div>
      <OperationsFooter />
    </>;
  }
  return <>
    <div className="ops-lecturer-detail-page">
      <OperationsSidebar />
      <div className="ops-lecturer-detail-main">
        <OperationsHeader />
        <div className="ops-lecturer-detail-content">
          <div className="ops-lecturer-profile-card">
            <img src="/Lprofile.jpg" alt={lecturer.name} className="ops-lecturer-profile-photo" />
            <div className="ops-lecturer-profile-info">
              <h2 className="ops-lecturer-profile-name">{lecturer.name}</h2>
              <p className="ops-lecturer-profile-title">{lecturer.title}</p>
              <span className="ops-lecturer-profile-status active">
                Status: Active
              </span>
            </div>
          </div>
          <div className="ops-lecturer-details-grid">
            <div className="ops-lecturer-left-section">
              <div className="ops-lecturer-stats-card">
                <h3 className="ops-lecturer-section-title">Statistics</h3>
                <div className="ops-lecturer-stat-item">
                  <p className="ops-lecturer-stat-label">Total Courses</p>
                  <p className="ops-lecturer-stat-value">
                    {lecturer.totalCourses}
                  </p>
                </div>
                <div className="ops-lecturer-stat-item">
                  <p className="ops-lecturer-stat-label">Average Rating</p>
                  <p className="ops-lecturer-stat-value">
                    {lecturer.averageRating} / 5.0
                  </p>
                </div>
                <div className="ops-lecturer-stat-item">
                  <p className="ops-lecturer-stat-label">Total Students</p>
                  <p className="ops-lecturer-stat-value">
                    {lecturer.totalStudents.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="ops-lecturer-contact-card">
                <h3 className="ops-lecturer-section-title">Contact Details</h3>
                <div className="ops-lecturer-contact-row">
                  <span className="ops-lecturer-contact-label">Email</span>
                  <span className="ops-lecturer-contact-value">
                    {lecturer.email}
                  </span>
                </div>
                <div className="ops-lecturer-contact-row">
                  <span className="ops-lecturer-contact-label">Phone</span>
                  <span className="ops-lecturer-contact-value">
                    {lecturer.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="ops-lecturer-right-section">
              <div className="ops-lecturer-bio-card">
                <h3 className="ops-lecturer-section-title">
                  Bio & Qualifications
                </h3>
                <div className="ops-lecturer-bio">
                  <h4 className="ops-lecturer-subsection-title">Full Bio</h4>
                  <p className="ops-lecturer-bio-text">{lecturer.bio}</p>
                </div>
                <div className="ops-lecturer-qualifications">
                  <h4 className="ops-lecturer-subsection-title">
                    Qualifications
                  </h4>
                  <div className="ops-lecturer-qual-list">
                    {lecturer.qualifications.map((qual, index) => <div key={index} className="ops-lecturer-qual-item">
                        <GraduationCapIcon className="ops-lecturer-qual-icon" />
                        <div className="ops-lecturer-qual-text">
                          <p className="ops-lecturer-qual-degree">
                            {qual.degree}
                          </p>
                          <p className="ops-lecturer-qual-institution">
                            {qual.institution}
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OperationsFooter />
  </>;
}