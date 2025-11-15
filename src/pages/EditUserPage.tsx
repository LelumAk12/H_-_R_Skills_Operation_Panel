import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { UploadIcon } from 'lucide-react';
import '../styles/EditUserPage.css';
export function EditUserPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'Saduni Perera',
    email: 'saduniperera@gmail.com',
    contactNumber: '*** **** 123',
    status: 'Active',
    registrationDate: '2025 - 11 - 25'
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = () => {
    console.log('Saving user:', formData);
    navigate('/operations/user-management');
  };
  return <div className="ops-edit-user-page">
      <OperationsSidebar />
      <div className="ops-edit-user-main">
        <OperationsHeader />
        <div className="ops-edit-user-content">
          <div className="ops-edit-user-profile-section">
            <img src="Profile.jpg" alt="Profile" className="ops-edit-user-profile-photo" />
            <div className="ops-edit-user-profile-info">
              <h2 className="ops-edit-user-profile-name">
                {formData.fullName}
              </h2>
              <p className="ops-edit-user-profile-email">{formData.email}</p>
            </div>
            <button className="ops-edit-user-upload-btn">
              <UploadIcon className="ops-edit-user-upload-icon" />
              Upload Photo
            </button>
          </div>
          <div className="ops-edit-user-section">
            <h2 className="ops-edit-user-section-title">Basic Information</h2>
            <div className="ops-edit-user-form">
              <div className="ops-edit-user-form-row">
                <div className="ops-edit-user-form-group">
                  <label className="ops-edit-user-label">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="ops-edit-user-input" />
                </div>
                <div className="ops-edit-user-form-group">
                  <label className="ops-edit-user-label">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="ops-edit-user-input" />
                </div>
              </div>
              <div className="ops-edit-user-form-row">
                <div className="ops-edit-user-form-group">
                  <label className="ops-edit-user-label">Contact Number</label>
                  <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="ops-edit-user-input" />
                </div>
                <div className="ops-edit-user-form-group">
                  <label className="ops-edit-user-label">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="ops-edit-user-select">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="ops-edit-user-form-group">
                <label className="ops-edit-user-label">Registration Date</label>
                <input type="text" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="ops-edit-user-input" disabled />
              </div>
            </div>
          </div>
          <div className="ops-edit-user-section">
            <h2 className="ops-edit-user-section-title">Account Settings</h2>
            <div className="ops-edit-user-account-actions">
              <div className="ops-edit-user-account-item">
                <div>
                  <h3 className="ops-edit-user-account-title">
                    Reset Password
                  </h3>
                  <p className="ops-edit-user-account-description">
                    An email will be start to the student to reset their
                    password.
                  </p>
                </div>
                <button className="ops-edit-user-account-btn reset">
                  Send Reset Link
                </button>
              </div>
              <div className="ops-edit-user-account-item danger">
                <div>
                  <h3 className="ops-edit-user-account-title danger">
                    Deactivate Account
                  </h3>
                  <p className="ops-edit-user-account-description">
                    This will suspend the student's access to the LMS.
                  </p>
                </div>
                <button className="ops-edit-user-account-btn deactivate">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
          <div className="ops-edit-user-actions">
            <button onClick={handleSave} className="ops-edit-user-save-btn">
              Save Changes
            </button>
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}