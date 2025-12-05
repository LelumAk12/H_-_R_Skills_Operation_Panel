import React, { useState, useRef, useEffect } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { SearchIcon, EyeIcon, Edit2Icon, Trash2Icon, ChevronLeftIcon, ChevronRightIcon, Calendar } from 'lucide-react';
import { useOperations } from '../context/OperationsContext';
import '../styles/AnnouncementPage.css';

// Simple Calendar Picker Component
function CalendarPicker({ value, onChange, onClose }: { value: string; onChange: (date: string) => void; onClose: () => void }) {
  const [displayMonth, setDisplayMonth] = useState(() => {
    if (value) {
      const [month, , year] = value.split('/');
      return new Date(parseInt(year), parseInt(month) - 1);
    }
    return new Date();
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const month = String(displayMonth.getMonth() + 1).padStart(2, '0');
    const year = displayMonth.getFullYear();
    const dayStr = String(day).padStart(2, '0');
    onChange(`${month}/${dayStr}/${year}`);
    onClose();
  };

  const handlePrevMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDay = getFirstDayOfMonth(displayMonth);
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="ops-announcement-calendar-picker">
      <div className="ops-announcement-calendar-header">
        <button onClick={handlePrevMonth} className="ops-announcement-calendar-nav">‹</button>
        <h3>{monthNames[displayMonth.getMonth()]} {displayMonth.getFullYear()}</h3>
        <button onClick={handleNextMonth} className="ops-announcement-calendar-nav">›</button>
      </div>
      <div className="ops-announcement-calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="ops-announcement-calendar-day-header">{day}</div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`ops-announcement-calendar-day ${day ? 'active' : 'empty'}`}
            onClick={() => day && handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const titleRef = useRef<HTMLInputElement | null>(null);
  const audienceRef = useRef<HTMLSelectElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const scheduleInputRef = useRef<HTMLInputElement | null>(null);
  const [viewModal, setViewModal] = useState<any>(null);
  const [editModal, setEditModal] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    audience: '',
    description: '',
    scheduleDate: '',
    status: 'Active'
  });
  const [showCreateCalendar, setShowCreateCalendar] = useState(false);
  const [showEditCalendar, setShowEditCalendar] = useState(false);
  const createCalendarRef = useRef<HTMLDivElement>(null);
  const editCalendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (createCalendarRef.current && !createCalendarRef.current.contains(event.target as Node)) {
        setShowCreateCalendar(false);
      }
      if (editCalendarRef.current && !editCalendarRef.current.contains(event.target as Node)) {
        setShowEditCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    // clear error for this field when user types
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
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
    setErrors(prev => ({ ...prev, scheduleDate: '' }));
  };

  const handlePostNow = () => {
    // validate required fields: title, audience, description
    const newErrors: { [k: string]: string } = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.audience?.trim()) newErrors.audience = 'Audience is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // focus first invalid field
      if (newErrors.title && titleRef.current) {
        titleRef.current.focus();
        titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.audience && audienceRef.current) {
        audienceRef.current.focus();
        audienceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.description && descriptionRef.current) {
        descriptionRef.current.focus();
        descriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    // clear errors if any
    setErrors({});
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
  };

  const handleSchedule = () => {
    // validate required fields: title, audience, description, scheduleDate
    const newErrors: { [k: string]: string } = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.audience?.trim()) newErrors.audience = 'Audience is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.scheduleDate?.trim()) newErrors.scheduleDate = 'Schedule date is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // focus first invalid field in order
      if (newErrors.title && titleRef.current) {
        titleRef.current.focus();
        titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.audience && audienceRef.current) {
        audienceRef.current.focus();
        audienceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.description && descriptionRef.current) {
        descriptionRef.current.focus();
        descriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.scheduleDate && scheduleInputRef.current) {
        scheduleInputRef.current.focus();
        scheduleInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setErrors({});
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
      scheduleDate: announcement.scheduleDate || '',
      status: announcement.status || 'Active'
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
        status: editFormData.status || editModal.status,
        scheduleDate: editFormData.scheduleDate || undefined,
        date: editFormData.scheduleDate || editModal.date
      });
      setEditModal(null);
      setShowEditCalendar(false);
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
                  <input ref={titleRef} type="text" name="title" placeholder="Enter Title" value={formData.title} onChange={handleChange} className={`ops-announcement-input ${errors.title ? 'invalid' : ''}`} />
                  {errors.title && <span className="ops-announcement-error">{errors.title}</span>}
                </div>
                <div className="ops-announcement-form-group">
                  <label className="ops-announcement-label">Audience</label>
                  <select ref={audienceRef} name="audience" value={formData.audience} onChange={handleChange} className={`ops-announcement-select ${errors.audience ? 'invalid' : ''}`}>
                    <option value="">Select Audience</option>
                    <option value="All Users">All Users</option>
                    <option value="Students">Students</option>
                    <option value="Lecturers">Lecturers</option>
                  </select>
                  {errors.audience && <span className="ops-announcement-error">{errors.audience}</span>}
                </div>
              </div>
              <div className="ops-announcement-form-row">
                <div className="ops-announcement-form-group ops-announcement-description">
                  <label className="ops-announcement-label">Description</label>
                  <textarea ref={descriptionRef} name="description" placeholder="Enter Description" value={formData.description} onChange={handleChange} className={`ops-announcement-textarea ${errors.description ? 'invalid' : ''}`} rows={4} />
                  {errors.description && <span className="ops-announcement-error">{errors.description}</span>}
                </div>
                <div className="ops-announcement-form-group">
                  <label className="ops-announcement-label">
                    Schedule Publication (Optional)
                  </label>
                  <div className="ops-announcement-date-input-wrapper" ref={createCalendarRef}>
                    <input 
                      type="text" 
                      ref={scheduleInputRef}
                      name="scheduleDate" 
                      placeholder="mm/dd/yyyy" 
                      maxLength={10} 
                      value={formData.scheduleDate} 
                      onChange={handleDateChange} 
                      className="ops-announcement-input" 
                      readOnly 
                      onClick={() => setShowCreateCalendar(true)}
                      style={{ cursor: 'pointer' }}
                    />
                    <button 
                      className="ops-announcement-calendar-btn" 
                      onClick={() => setShowCreateCalendar(!showCreateCalendar)}
                      type="button"
                    >
                      <Calendar size={18} />
                    </button>
                    {showCreateCalendar && (
                      <div className="ops-announcement-calendar-container">
                        <CalendarPicker 
                          value={formData.scheduleDate} 
                          onChange={(date) => {
                            setFormData({ ...formData, scheduleDate: date });
                            setShowCreateCalendar(false);
                          }}
                          onClose={() => setShowCreateCalendar(false)}
                        />
                      </div>
                    )}
                  </div>
                  {errors.scheduleDate && <span className="ops-announcement-error">{errors.scheduleDate}</span>}
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
                  <label>Status</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    className="ops-announcement-modal-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Draft">Draft</option>
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
                <div className="ops-announcement-date-input-wrapper" ref={editCalendarRef}>
                  <input 
                    type="text" 
                    name="scheduleDate" 
                    placeholder="mm/dd/yyyy"
                    maxLength={10}
                    value={editFormData.scheduleDate} 
                    onChange={handleEditDateChange}
                    className="ops-announcement-modal-input"
                    readOnly
                    onClick={() => setShowEditCalendar(true)}
                    style={{ cursor: 'pointer' }}
                  />
                  <button 
                    className="ops-announcement-calendar-btn" 
                    onClick={() => setShowEditCalendar(!showEditCalendar)}
                    type="button"
                  >
                    <Calendar size={18} />
                  </button>
                  {showEditCalendar && (
                    <div className="ops-announcement-calendar-container">
                      <CalendarPicker 
                        value={editFormData.scheduleDate} 
                        onChange={(date) => {
                          setEditFormData({ ...editFormData, scheduleDate: date });
                          setShowEditCalendar(false);
                        }}
                        onClose={() => setShowEditCalendar(false)}
                      />
                    </div>
                  )}
                </div>
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