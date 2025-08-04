import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdSchedule,
  MdMessage,
  MdSettings,
  MdAnalytics,
  MdBusiness,
  MdPerson,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import '../Layout/Sidebar.css';

const AdminSidebar = ({ collapsed, setCollapsed }) => {
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
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: <MdDashboard size={24} />, label: 'Dashboard' },
    { path: '/admin/doctors', icon: <MdPerson size={24} />, label: 'Doctors' },
    { path: '/admin/patients', icon: <MdPeople size={24} />, label: 'Patients' },
    { path: '/admin/appointments', icon: <MdSchedule size={24} />, label: 'Appointments' },
    { path: '/admin/messages', icon: <MdMessage size={24} />, label: 'Messages' },
    { path: '/admin/clinics', icon: <MdBusiness size={24} />, label: 'Clinics' },
    { path: '/admin/analytics', icon: <MdAnalytics size={24} />, label: 'Analytics' },
    { path: '/admin/settings', icon: <MdSettings size={24} />, label: 'Settings' },
  ];

  // Toggle sidebar collapse/expand
  const handleToggle = (e) => {
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}> 
      <div className="top-section" style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'flex-start' : 'space-between', padding: '12px 20px' }}>
        {collapsed ? (
          <button 
            className="sidebar-toggle-btn" 
            onClick={handleToggle}
            aria-label="Expand sidebar"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#fff' }}
          >
            <span>&#9776;</span>
          </button>
        ) : (
          <>
            <span className="logo-text" style={{ fontWeight: 'bold', fontSize: '1.7rem', color: '#fff' }}>GetCare</span>
            <button 
              className="sidebar-toggle-btn" 
              onClick={handleToggle}
              aria-label="Collapse sidebar"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#fff', marginLeft: 'auto' }}
            >
              <MdKeyboardDoubleArrowLeft size={28} />
            </button>
          </>
        )}
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className={isActive ? 'active-wrapper' : ''}>
                <Link
                  to={item.path}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;