import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import './Settings.css';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="admin-settings">
        <div className="settings-header">
          <div className="header-left">
            <h1>Settings</h1>
            <p>Platform configuration and preferences</p>
          </div>
        </div>
        
        <div className="settings-content">
          <div className="placeholder-message">
            <h2>Platform Settings</h2>
            <p>This page will contain platform-wide settings for administrators.</p>
            <p>Features will include:</p>
            <ul>
              <li>System configuration</li>
              <li>User permissions management</li>
              <li>Platform policies and rules</li>
              <li>Security and privacy settings</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings; 