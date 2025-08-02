import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';
import styles from '../maincontent.module.css';

const DoctorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <TopNav collapsed={collapsed} />
      <main
        className={styles['main-content']}
        style={{
          marginLeft: collapsed ? '80px' : '240px',
        }}
      >
        <Outlet /> {/* 👈 This renders the nested route like Dashboard */}
      </main>
    </>
  );
};

export default DoctorLayout;