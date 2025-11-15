import React, { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import '../styles/OperationsSettingsPage.css';
export function OperationsSettingsPage() {
  const [formData, setFormData] = useState({
    platformName: 'H & R Skills Pvt Ltd',
    contactEmail: 'admin@gmail.com',
    supportUrl: 'https://h&rskills.com/help'
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = () => {
    console.log('Saving settings:', formData);
  };
  return <div className="ops-settings-page">
      <OperationsSidebar />
      <div className="ops-settings-main">
        <OperationsHeader />
        <div className="ops-settings-content">
          <h1 className="ops-settings-title">Settings</h1>
          <div className="ops-settings-section">
            <h2 className="ops-settings-section-title">Platform Branding</h2>
            <div className="ops-settings-form">
              <div className="ops-settings-form-row">
                <div className="ops-settings-form-group">
                  <label className="ops-settings-label">Platform Name</label>
                  <input type="text" name="platformName" value={formData.platformName} onChange={handleChange} className="ops-settings-input" />
                </div>
                <div className="ops-settings-logo-group">
                  <label className="ops-settings-label">Platform Logo</label>
                  <div className="ops-settings-logo-wrapper">
                    <img src="/Logo.png" alt="Platform Logo" className="ops-settings-logo-preview" />
                    <button className="ops-settings-upload-btn">
                      Upload Logo
                    </button>
                  </div>
                </div>
              </div>
              <div className="ops-settings-form-row">
                <div className="ops-settings-form-group">
                  <label className="ops-settings-label">Contact Email</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="ops-settings-input" />
                </div>
                <div className="ops-settings-form-group">
                  <label className="ops-settings-label">Support URL</label>
                  <input type="text" name="supportUrl" value={formData.supportUrl} onChange={handleChange} className="ops-settings-input" />
                </div>
              </div>
              <div className="ops-settings-actions">
                <button className="ops-settings-btn cancel">Cancel</button>
                <button onClick={handleSave} className="ops-settings-btn save">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <OperationsFooter />
      </div>
    </div>;
}