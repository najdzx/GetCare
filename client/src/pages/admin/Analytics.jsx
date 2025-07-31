import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './Analytics.module.css';

const Analytics = () => {
  return (
    <AdminLayout>
      <div className={styles.adminAnalytics}>
        <div className={styles.analyticsHeader}>
          <div className={styles.headerLeft}>
            <h1>Analytics</h1>
            <p>View detailed analytics and insights for GetCare platform</p>
          </div>
        </div>
        
        <div className={styles.analyticsContent}>
          <div className={styles.placeholderMessage}>
            <h2>Analytics Dashboard</h2>
            <p>This page will contain comprehensive analytics and reporting features for administrators.</p>
            <p>Features will include:</p>
            <ul>
              <li>Platform usage statistics</li>
              <li>User engagement metrics</li>
              <li>Revenue and performance reports</li>
              <li>Custom data visualizations</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics; 