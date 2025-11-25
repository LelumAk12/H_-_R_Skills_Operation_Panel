import React, { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { SearchIcon, EyeIcon, Edit2Icon, Trash2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useOperations } from '../context/OperationsContext';
import '../styles/AnnouncementPage.css';

export function AnnouncementPage() {
  const { announcements, addAnnouncement, deleteAnnouncement, updateAnnouncement } = useOperations();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    audience: '',
    description: '',
    scheduleDate: ''
  });
  const [viewModal, setViewModal] = useState<any>(null);
  const [editModal, setEditModal] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    audience: '',
    description: '',
    scheduleDate: ''
  });

  const itemsPerPage = 5;
  const filteredAnnouncements = announcements.filter((announcement: any) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.audience.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + itemsPerPage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Auto-format as MM/DD/YYYY
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    
    setFormData({
      ...formData,
      scheduleDate: value
    });
  };

  const handlePostNow = () => {
    if (formData.title && formData.audience && formData.description) {
      addAnnouncement({
        title: formData.title,
        audience: formData.audience,
        description: formData.description,
        status: 'Active',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        scheduleDate: formData.scheduleDate || undefined
      });
      setFormData({ title: '', audience: '', description: '', scheduleDate: '' });
      setCurrentPage(1);
    }
  };

  const handleSchedule = () => {
    if (formData.title && formData.audience && formData.description && formData.scheduleDate) {
      addAnnouncement({
        title: formData.title,
        audience: formData.audience,
        description: formData.description,
        status: 'Scheduled',
        date: formData.scheduleDate,
        scheduleDate: formData.scheduleDate
      });
      setFormData({ title: '', audience: '', description: '', scheduleDate: '' });
      setCurrentPage(1);
    }
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleDelete = (id: string) => {
    deleteAnnouncement(id);
    if (paginatedAnnouncements.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewAnnouncement = (announcement: any) => {
    setViewModal(announcement);
  };

  const handleEditAnnouncement = (announcement: any) => {
    setEditModal(announcement);
    setEditFormData({
      title: announcement.title,
      audience: announcement.audience,
      description: announcement.description,
      scheduleDate: announcement.scheduleDate || ''
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    
    setEditFormData({
      ...editFormData,
      scheduleDate: value
    });
  };

  const handleSaveEdit = () => {
    if (editFormData.title && editFormData.audience && editFormData.description) {
      updateAnnouncement(editModal.id, {
        title: editFormData.title,
        audience: editFormData.audience,
        description: editFormData.description,
        scheduleDate: editFormData.scheduleDate || undefined
      });
      setEditModal(null);
    }
  };

  const endingIndex = Math.min(startIndex + itemsPerPage, filteredAnnouncements.length);

  return <>
    <div className="ops-announcement-page">
      <OperationsSidebar />
      <div className="ops-announcement-main">
        <OperationsHeader />
        <div className="ops-announcement-content">
          <div className="ops-announcement-search-wrapper">
            <SearchIcon className="ops-announcement-search-icon" />
            <input type="text" placeholder="Search by announcements..." value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }} className="ops-announcement-search-input" />
          </div>
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
                  <input type="text" name="scheduleDate" placeholder="mm/dd/yyyy" maxLength={10} value={formData.scheduleDate} onChange={handleDateChange} className="ops-announcement-input" />
                </div>
              </div>
              <div className="ops-announcement-actions">
                <button onClick={handleSchedule} className="ops-announcement-btn schedule">
                  Schedule
                </button>
                <button onClick={handlePostNow} className="ops-announcement-btn post">Post Now</button>
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
                  {paginatedAnnouncements.length > 0 ? paginatedAnnouncements.map((announcement: any) => <tr key={announcement.id}>
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
                          <button className="ops-announcement-action-btn" onClick={() => handleViewAnnouncement(announcement)}>
                            <EyeIcon className="ops-announcement-action-icon" />
                          </button>
                          <button className="ops-announcement-action-btn" onClick={() => handleEditAnnouncement(announcement)}>
                            <Edit2Icon className="ops-announcement-action-icon" />
                          </button>
                          <button className="ops-announcement-action-btn delete" onClick={() => handleDelete(announcement.id)}>
                            <Trash2Icon className="ops-announcement-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>) : <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                        No announcements found
                      </td>
                    </tr>}
                </tbody>
              </table>
              <div className="ops-announcement-pagination">
                <p className="ops-announcement-pagination-text">
                  Showing {filteredAnnouncements.length > 0 ? startIndex + 1 : 0} to {endingIndex} of {filteredAnnouncements.length} results
                </p>
                <div className="ops-announcement-pagination-buttons">
                  <button className="ops-announcement-pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeftIcon className="ops-announcement-pagination-icon" />
                  </button>
                  {[1, 2, 3].map(pageNum => (
                    <button 
                      key={pageNum}
                      className={`ops-announcement-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={pageNum > totalPages}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button className="ops-announcement-pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                    <ChevronRightIcon className="ops-announcement-pagination-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModal && (
        <div className="ops-announcement-modal-overlay" onClick={() => setViewModal(null)}>
          <div className="ops-announcement-modal" onClick={e => e.stopPropagation()}>
            <div className="ops-announcement-modal-header">
              <h2>View Announcement</h2>
              <button className="ops-announcement-modal-close" onClick={() => setViewModal(null)}>×</button>
            </div>
            <div className="ops-announcement-modal-content">
              <div className="ops-announcement-modal-field">
                <label>Title</label>
                <p>{viewModal.title}</p>
              </div>
              <div className="ops-announcement-modal-field">
                <label>Audience</label>
                <p>{viewModal.audience}</p>
              </div>
              <div className="ops-announcement-modal-field">
                <label>Description</label>
                <p>{viewModal.description}</p>
              </div>
              <div className="ops-announcement-modal-field">
                <label>Status</label>
                <p>
                  <span className={`ops-announcement-status ${viewModal.status.toLowerCase()}`}>
                    {viewModal.status}
                  </span>
                </p>
              </div>
              <div className="ops-announcement-modal-field">
                <label>Date</label>
                <p>{viewModal.date || '-'}</p>
              </div>
            </div>
            <div className="ops-announcement-modal-footer">
              <button onClick={() => setViewModal(null)} className="ops-announcement-modal-btn close">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="ops-announcement-modal-overlay" onClick={() => setEditModal(null)}>
          <div className="ops-announcement-modal" onClick={e => e.stopPropagation()}>
            <div className="ops-announcement-modal-header">
              <h2>Edit Announcement</h2>
              <button className="ops-announcement-modal-close" onClick={() => setEditModal(null)}>×</button>
            </div>
            <div className="ops-announcement-modal-content">
              <div className="ops-announcement-modal-field">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={editFormData.title} 
                  onChange={handleEditChange}
                  className="ops-announcement-modal-input"
                />
              </div>
              <div className="ops-announcement-modal-field">
                <label>Audience</label>
                <select 
                  name="audience" 
                  value={editFormData.audience} 
                  onChange={handleEditChange}
                  className="ops-announcement-modal-select"
                >
                  <option value="">Select Audience</option>
                  <option value="All Users">All Users</option>
                  <option value="Students">Students</option>
                  <option value="Lecturers">Lecturers</option>
                </select>
              </div>
              <div className="ops-announcement-modal-field">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={editFormData.description} 
                  onChange={handleEditChange}
                  className="ops-announcement-modal-textarea"
                  rows={4}
                />
              </div>
              <div className="ops-announcement-modal-field">
                <label>Schedule Date (Optional)</label>
                <input 
                  type="text" 
                  name="scheduleDate" 
                  placeholder="mm/dd/yyyy"
                  maxLength={10}
                  value={editFormData.scheduleDate} 
                  onChange={handleEditDateChange}
                  className="ops-announcement-modal-input"
                />
              </div>
            </div>
            <div className="ops-announcement-modal-footer">
              <button onClick={() => setEditModal(null)} className="ops-announcement-modal-btn cancel">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="ops-announcement-modal-btn save">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <OperationsFooter />
  </>;
}