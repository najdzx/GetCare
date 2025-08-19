import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';
import styles from '../maincontent.module.css';

const DoctorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar fully removed */}
      <TopNav collapsed={collapsed} />
  <main className={styles['main-content']}>
        <Outlet />
      </main>
    </>
  );
};

export default DoctorLayout;