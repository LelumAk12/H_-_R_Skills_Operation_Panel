import { useState } from 'react';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsFooter } from '../components/OperationsFooter';
import { CheckCircle } from 'lucide-react';
import { useOperations } from '../context/OperationsContext';
import '../styles/OperationsSettingsPage.css';

export function OperationsSettingsPage() {
  const { platformSettings, updatePlatformSettings } = useOperations();
  const [formData, setFormData] = useState({
    platformName: platformSettings.platformName,
    contactEmail: platformSettings.contactEmail,
    supportUrl: platformSettings.supportUrl
  });

  const [savedSettings, setSavedSettings] = useState({
    platformName: platformSettings.platformName,
    contactEmail: platformSettings.contactEmail,
    supportUrl: platformSettings.supportUrl
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(platformSettings.logoUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    setHasChanges(JSON.stringify(newFormData) !== JSON.stringify(savedSettings) || logoFile !== null);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    setSavedSettings(formData);
    
    // Update platform settings in context
    updatePlatformSettings({
      platformName: formData.platformName,
      contactEmail: formData.contactEmail,
      supportUrl: formData.supportUrl,
      logoUrl: logoPreview
    });
    
    setHasChanges(false);
    setLogoFile(null);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setFormData(savedSettings);
    setLogoFile(null);
    setLogoPreview(platformSettings.logoUrl);
    setHasChanges(false);
  };

  return <>
    <div className="ops-settings-page">
      <OperationsSidebar />
      <div className="ops-settings-main">
        <div className="ops-settings-header-bar">
          <h1 className="ops-settings-page-title">Settings</h1>
        </div>
        <div className="ops-settings-content">
          {showSuccessMessage && (
            <div className="ops-settings-success-message">
              <CheckCircle size={20} />
              <span>Settings saved successfully!</span>
            </div>
          )}
          <div className="ops-settings-section">
            <h2 className="ops-settings-section-title">Platform Branding</h2>
            <div className="ops-settings-form">
              <div className="ops-settings-form-row">
                <div className="ops-settings-form-group">
                  <label className="ops-settings-label">Platform Name</label>
                  <input 
                    type="text" 
                    name="platformName" 
                    value={formData.platformName} 
                    onChange={handleChange} 
                    className="ops-settings-input" 
                  />
                </div>
                <div className="ops-settings-logo-group">
                  <label className="ops-settings-label">Platform Logo</label>
                  <div className="ops-settings-logo-wrapper">
                    <img src={logoPreview} alt="Platform Logo" className="ops-settings-logo-preview" />
                    <label htmlFor="logo-upload" className="ops-settings-upload-btn">
                      Upload Logo
                    </label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                    />
                    {logoFile && <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>{logoFile.name}</p>}
                  </div>
                </div>
              </div>
              <div className="ops-settings-form-row">
                <div className="ops-settings-form-group">
                  <label className="ops-settings-label">Contact Email</label>
                  <input 
                    type="email" 
                    name="contactEmail" 
                    value={formData.contactEmail} 
                    onChange={handleChange} 
                    className="ops-settings-input" 
                  />
                </div>
                <div className="ops-settings-form-group">
                  <label className="ops-settings-label">Support URL</label>
                  <input 
                    type="text" 
                    name="supportUrl" 
                    value={formData.supportUrl} 
                    onChange={handleChange} 
                    className="ops-settings-input" 
                  />
                </div>
              </div>
              <div className="ops-settings-actions">
                <button onClick={handleCancel} className="ops-settings-btn cancel" disabled={!hasChanges}>Cancel</button>
                <button onClick={handleSave} className="ops-settings-btn save" disabled={!hasChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OperationsFooter />
  </>;
}