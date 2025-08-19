import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';
import styles from '../maincontent.module.css';

const AdminLayoutRoute = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
  {/* Sidebar removed for admin side */}
      <AdminTopNav collapsed={collapsed} />
      <main
        className={styles['main-content']}

      >
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayoutRoute;
