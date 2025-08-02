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
  MdBusiness,
} from 'react-icons/md';
import '../Layout/Sidebar.css';


const Sidebar = ({ collapsed, setCollapsed }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/doctor', icon: <MdDashboard size={24} /> },
    { name: 'My Clinic', path: '/doctor/my-clinic', icon: <MdBusiness size={24} /> },
    { name: 'Appointments', path: '/doctor/appointments', icon: <MdEventNote size={24} /> },
    { name: 'Patients', path: '/doctor/patients', icon: <MdPeople size={24} /> },
    { name: 'Notes', path: '/doctor/notes', icon: <MdNote size={24} /> },
    { name: 'Invitations', path: '/doctor/invitations', icon: <MdPeople size={24} /> },
    { name: 'Chat', path: '/doctor/chat', icon: <MdChat size={24} /> },
    { name: 'Files', path: '/doctor/files', icon: <MdFolder size={24} /> },
    { name: 'Analytics', path: '/doctor/analytics', icon: <MdAnalytics size={24} /> },
    { name: 'Engagement', path: '/doctor/engagement', icon: <MdEmojiPeople size={24} /> },
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
