import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';
import styles from '../maincontent.module.css';

const AdminLayoutRoute = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <AdminTopNav collapsed={collapsed} />
      <main
        className={styles['main-content']}
        style={{
          marginLeft: collapsed ? '80px' : '240px',
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayoutRoute;
