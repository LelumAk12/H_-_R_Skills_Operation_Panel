import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OperationsSidebar } from '../components/OperationsSidebar';
import { OperationsHeader } from '../components/OperationsHeader';
import { OperationsFooter } from '../components/OperationsFooter';
import { useOperations } from '../context/OperationsContext';
import { UploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/EditUserPage.css';
export function EditUserPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    getStudentById,
    getLecturerById,
    updateStudent,
    updateLecturer
  } = useOperations();
  const [userType, setUserType] = useState<'student' | 'lecturer' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    status: 'Active' as 'Active' | 'Inactive',
    registrationDate: '',
    address: '',
    dateOfBirth: '',
    photo: ''
  });
  useEffect(() => {
    if (!id) return;
    const student = getStudentById(id);
    if (student) {
      setUserType('student');
      setFormData({
        fullName: student.name,
        email: student.email,
        contactNumber: student.phone,
        status: student.status,
        registrationDate: student.registeredDate,
        address: student.address,
        dateOfBirth: (() => {
          try {
            const d = new Date(student.dateOfBirth || '');
            if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
          } catch (e) {}
          return '';
        })(),
        photo: student.photo || ''
      });
      return;
    }
    const lecturer = getLecturerById(id);
    if (lecturer) {
      setUserType('lecturer');
      setFormData({
        fullName: lecturer.name,
        email: lecturer.email,
        contactNumber: lecturer.phone || '',
        status: lecturer.status,
        registrationDate: lecturer.registeredDate,
        address: '',
        dateOfBirth: '',
        photo: lecturer.photo || ''
      });
    }
  }, [id, getStudentById, getLecturerById]);

  // Phone input handlers: prevent letters and sanitize paste
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab',
    ];
    if (allowedKeys.includes(e.key)) return;
    // allow ctrl/cmd combinations
    if (e.ctrlKey || e.metaKey) return;
    // allow digits and common phone chars
    const allowedChars = /[0-9+\-() ]/;
    if (e.key.length === 1 && !allowedChars.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text');
    // keep only digits and common phone characters
    const sanitized = paste.replace(/[^0-9+\-() ]+/g, '');
    if (sanitized !== paste) {
      e.preventDefault();
      const input = e.currentTarget;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const newValue = input.value.slice(0, start) + sanitized + input.value.slice(end);
      setFormData({ ...formData, contactNumber: newValue });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sanitize value to allowed chars
    const sanitized = e.target.value.replace(/[^0-9+\-() ]+/g, '');
    setFormData({ ...formData, contactNumber: sanitized });
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.value is in yyyy-mm-dd (ISO) format; store as-is
    setFormData({ ...formData, dateOfBirth: e.target.value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = () => {
    if (!id || !userType) return;
    if (userType === 'student') {
      updateStudent(id, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.contactNumber,
        status: formData.status,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        photo: formData.photo
      });
      toast.success('Student updated successfully');
    } else {
      updateLecturer(id, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.contactNumber,
        status: formData.status,
        photo: formData.photo
      });
      toast.success('Lecturer updated successfully');
    }
    navigate('/operations/user-management');
  };
  const handleResetPassword = () => {
    toast.success('Password reset link sent to ' + formData.email);
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoUrl = event.target?.result as string;
        setFormData({
          ...formData,
          photo: photoUrl
        });
        toast.success('Photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleAccountStatus = () => {
    if (!id || !userType) return;
    const newStatus = formData.status === 'Active' ? 'Inactive' : 'Active';
    if (userType === 'student') {
      updateStudent(id, {
        status: newStatus
      });
      toast.success(newStatus === 'Active' ? 'Student account activated' : 'Student account deactivated');
    } else {
      updateLecturer(id, {
        status: newStatus
      });
      toast.success(newStatus === 'Active' ? 'Lecturer account activated' : 'Lecturer account deactivated');
    }
    setFormData({
      ...formData,
      status: newStatus
    });
  };
  if (!userType) {
    return <>
      <div className="ops-edit-user-page">
        <OperationsSidebar />
        <div className="ops-edit-user-main">
          <OperationsHeader />
          <div className="ops-edit-user-content">
            <p>User not found</p>
          </div>
        </div>
      </div>
      <OperationsFooter />
    </>;
  }
    return <>
      <div className="ops-edit-user-page">
      <OperationsSidebar />
      <div className="ops-edit-user-main">
        <OperationsHeader />
        <div className="ops-edit-user-content">
          <div className="ops-edit-user-profile-section">
            <img src={formData.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'} alt="Profile" className="ops-edit-user-profile-photo" />
            <div className="ops-edit-user-profile-info">
              <h2 className="ops-edit-user-profile-name">
                {formData.fullName}
              </h2>
              <p className="ops-edit-user-profile-email">{formData.email}</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            <button className="ops-edit-user-upload-btn" onClick={() => fileInputRef.current?.click()}>
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
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                    onPaste={handlePhonePaste}
                    inputMode="tel"
                    className="ops-edit-user-input"
                    placeholder="e.g. 0771234567"
                  />
                </div>
              </div>
              {userType === 'student' && <>
                  <div className="ops-edit-user-form-row">
                    <div className="ops-edit-user-form-group">
                      <label className="ops-edit-user-label">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} className="ops-edit-user-input" />
                    </div>
                    <div className="ops-edit-user-form-group">
                      <label className="ops-edit-user-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleDobChange}
                        className="ops-edit-user-input"
                      />
                    </div>
                  </div>
                </>}
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
                    An email will be sent to the {userType} to reset their
                    password.
                  </p>
                </div>
                <button onClick={handleResetPassword} className="ops-edit-user-account-btn reset">
                  Send Reset Link
                </button>
              </div>
              <div className={`ops-edit-user-account-item ${formData.status === 'Inactive' ? 'success' : 'danger'}`}>
                <div>
                  <h3 className={`ops-edit-user-account-title ${formData.status === 'Inactive' ? 'success' : 'danger'}`}>
                    {formData.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                  </h3>
                  <p className="ops-edit-user-account-description">
                    {formData.status === 'Active' 
                      ? `This will suspend the ${userType}'s access to the LMS.`
                      : `This will restore the ${userType}'s access to the LMS.`
                    }
                  </p>
                </div>
                <button 
                  onClick={handleToggleAccountStatus} 
                  className={`ops-edit-user-account-btn ${formData.status === 'Active' ? 'deactivate' : 'activate'}`}
                >
                  {formData.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
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
        
      </div>
    </div>
    <OperationsFooter />
    </>;
}