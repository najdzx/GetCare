import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdFavorite,
  MdDashboard,
  MdEventNote,
  MdPeople,
  MdNote,
  MdChat,
  MdFolder,
  MdAnalytics,
  MdEmojiPeople,
} from 'react-icons/md';
import '../Layout/Sidebar.css';


const Sidebar = ({ collapsed, setCollapsed }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/patient', icon: <MdDashboard size={24} /> },
    { name: 'Diagnostics', path: '/patient/diagnostics', icon: <MdFavorite size={24} /> },
    { name: 'Appointments', path: '/patient/appointments', icon: <MdEventNote size={24} /> },
    { name: 'Patients', path: '/patient/doctors', icon: <MdPeople size={24} /> },
    { name: 'Notes', path: '/patient/notes', icon: <MdNote size={24} /> },
    { name: 'Chat', path: '/patient/chat', icon: <MdChat size={24} /> },
    { name: 'Files', path: '/patient/files', icon: <MdFolder size={24} /> },
    { name: 'Analytics', path: '/patient/analytics', icon: <MdAnalytics size={24} /> },
    { name: 'Engagement', path: '/patient/engagement', icon: <MdEmojiPeople size={24} /> },
  ];

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setCollapsed(true);
    }
  };

  const handleClickInside = () => {
    if (collapsed) {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      onClick={handleClickInside}
      ref={sidebarRef}
    >
      <div className="top-section">
        <div className="logo">
  <img src="/heartbeat.svg" alt="GetCare Logo" className="logo-img" />
  {!collapsed && <span className="logo-text">GetCare</span>}
</div>
      </div>
      
      <nav>
        <ul>
          {menuItems.map(({ name, path, icon }) => {
            const isActive = location.pathname === path;

            return (
              <li key={name} className={isActive ? 'active-wrapper' : ''}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  {icon}
                  {!collapsed && <span>{name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
