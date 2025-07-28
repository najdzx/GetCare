import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import './Messages.css';

const Messages = () => {
  return (
    <AdminLayout>
      <div className="admin-messages">
        <div className="messages-header">
          <div className="header-left">
            <h1>Messages</h1>
            <p>Manage all messages across GetCare platform</p>
          </div>
        </div>
        
        <div className="messages-content">
          <div className="placeholder-message">
            <h2>Messages Management</h2>
            <p>This page will contain message management features for administrators.</p>
            <p>Features will include:</p>
            <ul>
              <li>View all messages between doctors and patients</li>
              <li>Monitor message activity</li>
              <li>Manage message policies</li>
              <li>Generate communication reports</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Messages; 