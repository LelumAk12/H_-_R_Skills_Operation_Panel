import { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import '../styles/CourseManagementPage.css';
export function CourseManagementPage() {
  const [] = useState('');
  const courses = [{
    id: '1',
    title: 'Biomedical Science',
    level: 'Certificate',
    lecturer: 'Dr. Malsha Karunaratne',
    status: 'Active'
  }, {
    id: '2',
    title: 'Web Development Fundamentals',
    level: 'Diploma',
    lecturer: 'Mr. Dilan Madushanka',
    status: 'pending'
  }, {
    id: '3',
    title: 'Human Resource Management',
    level: 'HND',
    lecturer: 'Ms. Ishara Jayasinghe',
    status: 'Rejected'
  }];
  return <div className="ops-course-management-page">
      <OperationsSidebar />
      <div className="ops-course-management-main">
        <OperationsHeader />
        <div className="ops-course-management-content">
          <h1 className="ops-course-management-title">Course Management</h1>
          <div className="ops-course-table-container">
            <table className="ops-course-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Level</th>
                  <th>Lecturer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => <tr key={course.id}>
                    <td className="ops-course-title-cell">{course.title}</td>
                    <td className="ops-course-level-cell">{course.level}</td>
                    <td className="ops-course-lecturer-cell">
                      {course.lecturer}
                    </td>
                    <td>
                      <span className={`ops-course-status ${course.status.toLowerCase()}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}