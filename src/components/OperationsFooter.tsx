import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, MessageCircleIcon, YoutubeIcon } from 'lucide-react';
import '../styles/OperationsFooter.css';
export function OperationsFooter() {
  const navigate = useNavigate();
  return <footer className="ops-footer">
      <div className="ops-footer-content">
        <div className="ops-footer-section">
          <div className="ops-footer-logo-wrapper">
            <img src="/Footer-Logo.jpg" alt="H & R Skills" className="ops-footer-logo" />
          </div>
          <div className="ops-footer-social">
            <button className="ops-footer-social-btn">
              <FacebookIcon style={{
              width: '20px',
              height: '20px',
              color: '#ffffff'
            }} />
            </button>
            <button className="ops-footer-social-btn">
              <InstagramIcon style={{
              width: '20px',
              height: '20px',
              color: '#ffffff'
            }} />
            </button>
            <button className="ops-footer-social-btn">
              <MessageCircleIcon style={{
              width: '20px',
              height: '20px',
              color: '#ffffff'
            }} />
            </button>
            <button className="ops-footer-social-btn">
              <YoutubeIcon style={{
              width: '20px',
              height: '20px',
              color: '#ffffff'
            }} />
            </button>
          </div>
        </div>
        <div className="ops-footer-section">
          <h3 className="ops-footer-heading">QUICK LINKS</h3>
          <ul className="ops-footer-links">
            <li>
              <button onClick={() => navigate('/operations/dashboard')}>
                Overview
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/operations/user-management')}>
                User Management
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/operations/courses')}>
                Course Management
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/operations/payments')}>
                Payment
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/operations/announcements')}>
                Announcement
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/operations/settings')}>
                Settings
              </button>
            </li>
          </ul>
        </div>
        <div className="ops-footer-section">
          <h3 className="ops-footer-heading">OUR CONTACTS</h3>
          <div className="ops-footer-contact">
            <p>
              <strong>Address:</strong>
            </p>
            <p>*****************</p>
            <p>
              <strong>Phone No:</strong>
            </p>
            <p>*** *** ****</p>
            <p>
              <strong>Email:</strong>
            </p>
            <p>*****@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="ops-footer-bottom">
        <p>
          2025 © All Rights Reserved | H & R Skills Pvt Ltd | Designed &
          Developed by{' '}
          <a href="https://everefficient.lk/" target="_blank" rel="noopener noreferrer" className="ops-footer-link">
            EVER EFFICIENT Business Management (Pvt) Ltd.
          </a>
        </p>
      </div>
    </footer>;
}