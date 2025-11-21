import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, ArrowLeftIcon } from 'lucide-react';
import '../styles/LoginPage.css';
export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/operations/dashboard');
  };
  return <div className="ops-login-page">
      <button className="ops-login-back-button" onClick={() => navigate('/')} aria-label="Go back" title="Go back">
        <ArrowLeftIcon className="ops-login-back-icon" />
        <span>Back</span>
      </button>
      <div className="ops-login-card">
        <div className="ops-login-left">
          <img src="/Login-Logo.png" alt="H & R Skills Logo" className="ops-login-logo" />
        </div>
        <div className="ops-login-right">
          <form onSubmit={handleLogin} className="ops-login-form">
            <div className="ops-login-form-group">
              <label className="ops-login-label">Email or Username</label>
              <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="ops-login-input" />
            </div>
            <div className="ops-login-form-group">
              <label className="ops-login-label">Password</label>
              <div className="ops-login-password-wrapper">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="ops-login-input" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ops-login-password-toggle">
                  {showPassword ? <EyeOffIcon className="ops-login-icon" /> : <EyeIcon className="ops-login-icon" />}
                </button>
              </div>
            </div>
            <div className="ops-login-forgot">
              <a href="#forgot">Forgot Password</a>
            </div>
            <button type="submit" className="ops-login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>;
}