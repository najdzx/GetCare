import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <AdminTopNav collapsed={collapsed} />
      <main
        className="admin-main-content"
        style={{
          marginLeft: collapsed ? '80px' : '240px',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default AdminLayout; 