import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdSchedule,
  MdMessage,
  MdSettings,
  MdAnalytics,
  MdBusiness,
  MdPerson
} from 'react-icons/md';
import '../Layout/Sidebar.css';

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const sidebarRef = useRef(null);
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
          <img src="/heartbeat.svg" alt="GetCare" className="logo-img" />
          {!collapsed && <span className="logo-text">GetCare</span>}
        </div>
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