import React from 'react';
import { MdPerson, MdEvent, MdMessage, MdTrendingUp, MdNotifications, MdSettings, MdAdd, MdSearch, MdFilterList } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './Dashboard.module.css';
import '../../components/Layout/Scrollbar.css';

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: 'Total Doctors', value: '24', icon: MdPerson, color: '#3498db', change: '+2 this week' },
    { title: 'Active Patients', value: '1,247', icon: MdPerson, color: '#2ecc71', change: '+15 today' },
    { title: 'Today\'s Appointments', value: '89', icon: MdEvent, color: '#f39c12', change: '+12 from yesterday' },
    { title: 'Pending Messages', value: '23', icon: MdMessage, color: '#e74c3c', change: '+5 new' },
  ];

  const recentActivities = [
    { id: 1, title: 'Dr. Smith added new patient', description: 'Patient John Doe registered', timestamp: '2 minutes ago', type: 'doctor', color: '#434bb8' },
    { id: 2, title: 'Appointment scheduled', description: 'Follow-up with Sarah Wilson at 2:00 PM', timestamp: '5 minutes ago', type: 'appointment', color: '#28a745' },
    { id: 3, title: 'Patient message received', description: 'New message from Mike Johnson', timestamp: '10 minutes ago', type: 'message', color: '#ffc107' },
    { id: 4, title: 'New clinic registered', description: 'Heart Clinic has been approved', timestamp: '1 hour ago', type: 'clinic', color: '#17a2b8' },
    { id: 5, title: 'System maintenance completed', description: 'Database backup successful', timestamp: '2 hours ago', type: 'system', color: '#6c757d' },
  ];

  return (
    <AdminLayout>
      <div className={styles.adminDashboard}>
        <div className={styles.dashboardHeader}>
          <h1>Admin Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div 
                className={styles.statIcon}
                style={{ backgroundColor: stat.color }}
              >
                <stat.icon />
              </div>
              <div className={styles.statContent}>
                <h3>{stat.title}</h3>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statChange}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={styles.dashboardSection}>
          <h2>Quick Actions</h2>
          <div className={styles.quickActions}>
            <button className={styles.quickActionBtn}>
              <MdEvent />
              <span>Schedule Appointment</span>
            </button>
            <button className={styles.quickActionBtn}>
              <MdPerson />
              <span>Add New Patient</span>
            </button>
            <button className={styles.quickActionBtn}>
              <MdSettings />
              <span>Register Clinic</span>
            </button>
            <button className={styles.quickActionBtn}>
              <MdMessage />
              <span>Send Message</span>
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className={styles.dashboardSection}>
          <h2>Recent Activities</h2>
          <div className={`${styles.activitiesList} custom-scrollbar`}>
            {recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div 
                  className={styles.activityIcon}
                  style={{ color: activity.color }}
                >
                  {activity.type === 'doctor' && <MdPerson />}
                  {activity.type === 'appointment' && <MdEvent />}
                  {activity.type === 'message' && <MdMessage />}
                  {activity.type === 'clinic' && <MdSettings />}
                  {activity.type === 'system' && <MdNotifications />}
                </div>
                <div className={styles.activityContent}>
                  <p>{activity.title}</p>
                  <span>{activity.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 