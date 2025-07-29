import React, { useState, useRef, useEffect } from 'react';
import { MdNotifications } from 'react-icons/md';
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

  return (
    <header className="topnav" style={{ left }}>
      <div className="topnav-icons">

        {/* User Name */}
        <span className="user-name">{userName}</span>

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
          <span className="dropdown-icon">˅</span>
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