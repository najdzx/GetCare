import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdNotifications, MdAccountCircle, MdLogout, MdSettings } from 'react-icons/md';
import '../Layout/TopNav.css';

const AdminTopNav = ({ collapsed }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const left = collapsed ? '80px' : '240px';

  const notifications = [
    { id: 1, message: 'New appointment request from Dr. Smith', time: '2 min ago' },
    { id: 2, message: 'Patient message received', time: '5 min ago' },
    { id: 3, message: 'System maintenance scheduled', time: '1 hour ago' },
  ];

  const toggleProfile = () => {
    setShowProfileDropdown((prev) => !prev);
    setShowNotifications(false);
  };

  const toggleNotif = () => {
    setShowNotifications((prev) => !prev);
    setShowProfileDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current && !profileRef.current.contains(e.target) &&
        notifRef.current && !notifRef.current.contains(e.target)
      ) {
        setShowProfileDropdown(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  // Admin navigation links (formerly in Sidebar)
  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Doctors', path: '/admin/doctors' },
    { name: 'Patients', path: '/admin/patients' },
    { name: 'Appointments', path: '/admin/appointments' },
    { name: 'Messages', path: '/admin/messages' },
    { name: 'Clinics', path: '/admin/clinics' },
    { name: 'Analytics', path: '/admin/analytics' },
    { name: 'Settings', path: '/admin/settings' },
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
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`topnav-link-btn${isActive ? ' active' : ''}`}
                sx={{ margin: '0 8px', minWidth: 0, padding: 0 }}
              >
                {link.name}
              </Button>
            );
          })}
      </nav>
      <div className="topnav-icons">
        {/* Notifications */}
        <div className="dropdown-wrapper" onClick={toggleNotif} ref={notifRef}>
          <MdNotifications className="topnav-icon" />
          {showNotifications && (
            <div className="dropdown-menu">
              <ul>
                <li>Notifications</li>
                <hr />
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <div>{notification.message}</div>
                    <small>{notification.time}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown-wrapper profile-section" onClick={toggleProfile} ref={profileRef}>
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=434bb8&color=fff&size=40"
            alt="Admin"
            className="profile-pic"
          />
          {showProfileDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li>Profile</li>
                <li>Settings</li>
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

export default AdminTopNav; 