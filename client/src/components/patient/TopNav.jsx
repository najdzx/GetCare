import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { MdNotifications } from 'react-icons/md';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../Layout/TopNav.css';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ collapsed }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userName, setUserName] = useState('Jane Doe');
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const left = collapsed ? '80px' : '240px';

// useEffect(() => {
//   fetch('/api/auth/me', { credentials: 'include' })
//     .then(res => res.json())
//     .then(data => setUserName(data.name || ''))
//     .catch(() => setUserName(''));
// }, []);

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setNotifOpen(false);
  };

  const toggleNotif = () => {
    setNotifOpen((prev) => !prev);
    setProfileOpen(false);
  };

  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileOpen(false);
    navigate('/patient/profile');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current && !profileRef.current.contains(e.target) &&
        notifRef.current && !notifRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Patient navigation links (formerly in Sidebar)
  const navLinks = [
    { name: 'Dashboard', path: '/patient' },
    { name: 'Diagnostics', path: '/patient/diagnostics' },
    { name: 'Appointments', path: '/patient/appointments' },
    { name: 'Records', path: '/patient/medical-records' },
    { name: 'Chat', path: '/patient/chat' },
    { name: 'Analytics', path: '/patient/analytics' },
  ];

  return (
    <header className="topnav" style={{ left: 0, width: '100%', display: 'flex', alignItems: 'center', height: '60px', padding: '0 20px', justifyContent: 'space-between' }}>
      {/* Logo section */}
      <div className="topnav-logo" style={{ display: 'flex', alignItems: 'center', minWidth: '140px' }}>
        <span style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '1px', fontFamily: 'Poppins, sans-serif' }}>
          <span style={{ color: '#333' }}>Get</span>
          <span style={{ color: '#434bb8' }}>Care</span>
        </span>
      </div>
      {/* Centered nav links */}
      <nav className="topnav-links" style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'center' }}>
        {navLinks.map(link => (
          <Button
            key={link.name}
            onClick={() => navigate(link.path)}
            className="topnav-link-btn"
            sx={{ margin: '0 8px', minWidth: 0, padding: 0 }}
          >
            {link.name}
          </Button>
        ))}
      </nav>
      <div className="topnav-icons">
        {/* Notification Dropdown */}
        <div className="dropdown-wrapper" onClick={toggleNotif} ref={notifRef}>
          <MdNotifications className="topnav-icon" />
          {notifOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>Notification</li>
                <hr />
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown-wrapper profile-section" onClick={toggleProfile} ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Profile"
            className="profile-pic"
          />
          <KeyboardArrowDownIcon className="dropdown-icon" />
          {profileOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleProfileClick}>Profile</li>
                <li>Calendar</li>
                <li>Private Files</li>
                <hr />
                <li>Preferences</li>
                <hr />
                <li className="logout">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;