import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import './Analytics.css';

const Analytics = () => {
  return (
    <AdminLayout>
      <div className="admin-analytics">
        <div className="analytics-header">
          <div className="header-left">
            <h1>Analytics</h1>
            <p>Platform-wide analytics and insights</p>
          </div>
        </div>
        
        <div className="analytics-content">
          <div className="placeholder-message">
            <h2>Analytics Dashboard</h2>
            <p>This page will contain comprehensive analytics for administrators.</p>
            <p>Features will include:</p>
            <ul>
              <li>Platform usage statistics</li>
              <li>User engagement metrics</li>
              <li>Revenue and performance data</li>
              <li>Custom reports and insights</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics; 