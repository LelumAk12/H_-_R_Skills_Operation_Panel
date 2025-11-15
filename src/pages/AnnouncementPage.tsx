import React, { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { EyeIcon, Edit2Icon, Trash2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import '../styles/AnnouncementPage.css';
export function AnnouncementPage() {
  const [] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    audience: '',
    description: '',
    scheduleDate: ''
  });
  const announcements = [{
    id: '1',
    title: 'System Maintenance Notice',
    audience: 'All Users',
    status: 'Active',
    date: 'Nov 25, 2025'
  }, {
    id: '2',
    title: 'New Courses Available!',
    audience: 'Student',
    status: 'Scheduled',
    date: 'Nov 22, 2025'
  }, {
    id: '3',
    title: 'Update Course Content Reminder',
    audience: 'Lecturer',
    status: 'Draft',
    date: ''
  }];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className="ops-announcement-page">
      <OperationsSidebar />
      <div className="ops-announcement-main">
        <OperationsHeader />
        <div className="ops-announcement-content">
          <h1 className="ops-announcement-title">Announcement</h1>
          <div className="ops-announcement-create-section">
            <h2 className="ops-announcement-section-title">
              Create Announcement
            </h2>
            <div className="ops-announcement-form">
              <div className="ops-announcement-form-row">
                <div className="ops-announcement-form-group">
                  <label className="ops-announcement-label">
                    Announcement Title
                  </label>
                  <input type="text" name="title" placeholder="Enter Title" value={formData.title} onChange={handleChange} className="ops-announcement-input" />
                </div>
                <div className="ops-announcement-form-group">
                  <label className="ops-announcement-label">Audience</label>
                  <select name="audience" value={formData.audience} onChange={handleChange} className="ops-announcement-select">
                    <option value="">Select Audience</option>
                    <option value="All Users">All Users</option>
                    <option value="Students">Students</option>
                    <option value="Lecturers">Lecturers</option>
                  </select>
                </div>
              </div>
              <div className="ops-announcement-form-row">
                <div className="ops-announcement-form-group ops-announcement-description">
                  <label className="ops-announcement-label">Description</label>
                  <textarea name="description" placeholder="Enter Description" value={formData.description} onChange={handleChange} className="ops-announcement-textarea" rows={4} />
                </div>
                <div className="ops-announcement-form-group">
                  <label className="ops-announcement-label">
                    Schedule Publication (Optional)
                  </label>
                  <input type="text" name="scheduleDate" placeholder="mm/dd/yyyy, - : - -" value={formData.scheduleDate} onChange={handleChange} className="ops-announcement-input" />
                </div>
              </div>
              <div className="ops-announcement-actions">
                <button className="ops-announcement-btn schedule">
                  Schedule
                </button>
                <button className="ops-announcement-btn post">Post Now</button>
              </div>
            </div>
          </div>
          <div className="ops-announcement-manage-section">
            <h2 className="ops-announcement-section-title">
              Manage Announcement
            </h2>
            <div className="ops-announcement-table-container">
              <table className="ops-announcement-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Audience</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map(announcement => <tr key={announcement.id}>
                      <td className="ops-announcement-title-cell">
                        {announcement.title}
                      </td>
                      <td>{announcement.audience}</td>
                      <td>
                        <span className={`ops-announcement-status ${announcement.status.toLowerCase()}`}>
                          {announcement.status}
                        </span>
                      </td>
                      <td>{announcement.date || '-'}</td>
                      <td>
                        <div className="ops-announcement-table-actions">
                          <button className="ops-announcement-action-btn">
                            <EyeIcon className="ops-announcement-action-icon" />
                          </button>
                          <button className="ops-announcement-action-btn">
                            <Edit2Icon className="ops-announcement-action-icon" />
                          </button>
                          <button className="ops-announcement-action-btn delete">
                            <Trash2Icon className="ops-announcement-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
              <div className="ops-announcement-pagination">
                <p className="ops-announcement-pagination-text">
                  Showing 1 to 5 of 97 results
                </p>
                <div className="ops-announcement-pagination-buttons">
                  <button className="ops-announcement-pagination-btn">
                    <ChevronLeftIcon className="ops-announcement-pagination-icon" />
                  </button>
                  <button className="ops-announcement-pagination-btn active">
                    1
                  </button>
                  <button className="ops-announcement-pagination-btn">2</button>
                  <button className="ops-announcement-pagination-btn">3</button>
                  <button className="ops-announcement-pagination-btn">
                    <ChevronRightIcon className="ops-announcement-pagination-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}