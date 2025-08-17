
import React, { useEffect } from 'react';
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
  const location = useLocation();

  // Collapse sidebar on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !collapsed) {
        setCollapsed(true);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [collapsed, setCollapsed]);

  const menuItems = [
    { name: 'Dashboard', path: '/doctor', icon: <MdDashboard size={24} /> },
    { name: 'My Clinic', path: '/doctor/my-clinic', icon: <MdBusiness size={24} /> },
    { name: 'Appointments', path: '/doctor/appointments', icon: <MdEventNote size={24} /> },
    { name: 'Patients', path: '/doctor/patients', icon: <MdPeople size={24} /> },
    { name: 'Invitations', path: '/doctor/invitations', icon: <MdPeople size={24} /> },
    { name: 'Chat', path: '/doctor/chat', icon: <MdChat size={24} /> },
    { name: 'Analytics', path: '/doctor/analytics', icon: <MdAnalytics size={24} /> },
  ];

  // Toggle sidebar collapse/expand
  const handleToggle = (e) => {
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}> 
      <div className="top-section" style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'flex-start' : 'space-between', padding: '12px 20px' }}>
        {!collapsed && <span className="logo-text" style={{ fontWeight: 'bold', fontSize: '1.7rem', color: '#fff' }}>GetCare</span>}
        <button
          className="sidebar-toggle-btn"
          onClick={handleToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          aria-controls="sidebar-nav"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#fff', marginLeft: collapsed ? 0 : 'auto' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
        </button>
      </div>
  <nav id="sidebar-nav">
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
}

export default Sidebar;
