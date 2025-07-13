import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';

const DoctorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <TopNav collapsed={collapsed} />
      <main
        style={{
          marginLeft: collapsed ? '80px' : '240px',
          padding: '80px 20px 20px',
          transition: 'margin-left 0.3s ease',
          backgroundColor: '#ffffff',
          minHeight: '100vh',
        }}
      >
        <Outlet /> {/* 👈 This renders the nested route like Dashboard */}
      </main>
    </>
  );
};

export default DoctorLayout;