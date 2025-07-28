import React from 'react';
import { MdPeople, MdSchedule, MdMessage, MdBusiness } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Doctors', 
      value: '24', 
      icon: <MdPeople />, 
      color: '#3498db',
      change: '+2 this week'
    },
    { 
      title: 'Active Patients', 
      value: '1,247', 
      icon: <MdPeople />, 
      color: '#2ecc71',
      change: '+15 today'
    },
    { 
      title: 'Today\'s Appointments', 
      value: '89', 
      icon: <MdSchedule />, 
      color: '#f39c12',
      change: '+12 from yesterday'
    },
    { 
      title: 'Pending Messages', 
      value: '23', 
      icon: <MdMessage />, 
      color: '#e74c3c',
      change: '+5 new'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Dr. Smith added new patient', time: '2 minutes ago', type: 'doctor' },
    { id: 2, action: 'Appointment scheduled for tomorrow', time: '5 minutes ago', type: 'appointment' },
    { id: 3, action: 'Patient message received', time: '10 minutes ago', type: 'message' },
    { id: 4, action: 'New clinic registered', time: '1 hour ago', type: 'clinic' },
    { id: 5, action: 'System maintenance completed', time: '2 hours ago', type: 'system' },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening with GetCare today.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-change">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <MdSchedule />
              <span>Schedule Appointment</span>
            </button>
            <button className="quick-action-btn">
              <MdPeople />
              <span>Add New Patient</span>
            </button>
            <button className="quick-action-btn">
              <MdBusiness />
              <span>Register Clinic</span>
            </button>
            <button className="quick-action-btn">
              <MdMessage />
              <span>Send Message</span>
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dashboard-section">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'doctor' && <MdPeople />}
                  {activity.type === 'appointment' && <MdSchedule />}
                  {activity.type === 'message' && <MdMessage />}
                  {activity.type === 'clinic' && <MdBusiness />}
                  {activity.type === 'system' && <MdBusiness />}
                </div>
                <div className="activity-content">
                  <p>{activity.action}</p>
                  <span>{activity.time}</span>
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