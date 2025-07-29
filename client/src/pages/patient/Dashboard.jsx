import React from 'react';
import { MdCalendarToday, MdLocalHospital, MdDescription, MdChat, MdFileCopy, MdTrendingUp } from 'react-icons/md';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data for patient dashboard
  const healthStats = [
    { title: 'Blood Pressure', value: '120/80', status: 'Normal', color: '#28a745' },
    { title: 'Heart Rate', value: '72 bpm', status: 'Normal', color: '#28a745' },
    { title: 'Temperature', value: '98.6°F', status: 'Normal', color: '#28a745' },
    { title: 'Weight', value: '68 kg', status: 'Stable', color: '#ffc107' },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:00 AM',
      type: 'Follow-up',
      mode: 'Face to face'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2025-01-18',
      time: '2:30 PM',
      type: 'Consultation',
      mode: 'Online'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment scheduled',
      description: 'Follow-up with Dr. Johnson',
      date: '2025-01-10',
      time: '09:30 AM'
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Prescription renewed',
      description: 'Blood pressure medication',
      date: '2025-01-08',
      time: '11:15 AM'
    },
    {
      id: 3,
      type: 'test',
      title: 'Lab results available',
      description: 'Blood work completed',
      date: '2025-01-05',
      time: '03:45 PM'
    },
    {
      id: 4,
      type: 'message',
      title: 'Message from doctor',
      description: 'Dr. Johnson sent a message',
      date: '2025-01-03',
      time: '02:20 PM'
    }
  ];

  const quickActions = [
    { title: 'Book Appointment', icon: <MdCalendarToday />, color: '#434bb8' },
    { title: 'View Records', icon: <MdFileCopy />, color: '#28a745' },
    { title: 'Message Doctor', icon: <MdChat />, color: '#ffc107' },
    { title: 'Health Tips', icon: <MdTrendingUp />, color: '#17a2b8' }
  ];

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
      </div>

      {/* Health Stats */}
      <div className="dashboard-section">
        <h2>Health Overview</h2>
        <div className="stats-grid">
          {healthStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <h3>{stat.title}</h3>
                <span className="stat-status" style={{ color: stat.color }}>
                  {stat.status}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="dashboard-section">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div className="doctor-info">
                  <h3>{appointment.doctor}</h3>
                  <p>{appointment.specialty}</p>
                </div>
                <span className="appointment-type">{appointment.type}</span>
              </div>
              <div className="appointment-details">
                <div className="appointment-date">
                  <MdCalendarToday />
                  <span>{appointment.date} at {appointment.time}</span>
                </div>
                <div className="appointment-mode">
                  <MdLocalHospital />
                  <span>{appointment.mode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className="quick-action-card" style={{ borderLeftColor: action.color }}>
              <div className="action-icon" style={{ color: action.color }}>
                {action.icon}
              </div>
              <h3>{action.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="dashboard-section">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'appointment' && <MdCalendarToday />}
                {activity.type === 'prescription' && <MdDescription />}
                {activity.type === 'test' && <MdFileCopy />}
                {activity.type === 'message' && <MdChat />}
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <span className="activity-time">{activity.date} at {activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;