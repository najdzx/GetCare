import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './AdminDashboard.module.css';

function Dashboard() {
  // State for statistics
  const [stats, setStats] = useState({
    totalPatients: 1247,
    todaysAppointments: 34,
    activeDoctors: 18,
    monthlyRevenue: 89240
  });

  // State for recent appointments
  const [appointments, setAppointments] = useState([
    { id: 1, initials: 'SJ', name: 'Sarah Johnson', doctor: 'Dr. Smith', time: '10:00 AM', status: 'confirmed' },
    { id: 2, initials: 'MB', name: 'Michael Brown', doctor: 'Dr. Davis', time: '11:30 AM', status: 'pending' },
    { id: 3, initials: 'EW', name: 'Emily Wilson', doctor: 'Dr. Johnson', time: '2:15 PM', status: 'confirmed' },
    { id: 4, initials: 'DL', name: 'David Lee', doctor: 'Dr. Smith', time: '3:45 PM', status: 'cancelled' },
    { id: 5, initials: 'AM', name: 'Anna Martinez', doctor: 'Dr. Wilson', time: '4:30 PM', status: 'pending' }
  ]);

  // State for recent activity
  const [activities, setActivities] = useState([
    { id: 1, text: 'New patient Sarah Johnson registered', time: '2 minutes ago' },
    { id: 2, text: 'Dr. Smith updated patient records', time: '15 minutes ago' },
    { id: 3, text: 'Appointment cancelled by David Lee', time: '1 hour ago' },
    { id: 4, text: 'Monthly report generated', time: '2 hours ago' },
    { id: 5, text: 'New doctor Dr. Wilson added to system', time: '1 day ago' }
  ]);

  // Action handlers
  const viewAllAppointments = () => {
    alert('Opening appointments management...');
  };

  const addNewPatient = () => {
    alert('Opening new patient registration form...');
  };

  const scheduleAppointment = () => {
    alert('Opening appointment scheduler...');
  };

  const manageStaff = () => {
    alert('Opening staff management panel...');
  };

  const viewReports = () => {
    alert('Opening reports dashboard...');
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate stat updates
      setStats(prevStats => ({
        ...prevStats,
        totalPatients: prevStats.totalPatients + Math.floor(Math.random() * 5),
        todaysAppointments: prevStats.todaysAppointments + Math.floor(Math.random() * 3) - 1,
        monthlyRevenue: prevStats.monthlyRevenue + Math.floor(Math.random() * 1000) - 500
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Dashboard Content */}
        <div className={styles.dashboardContent}>
          {/* Statistics Cards */}
          <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statTitle}>Total Patients</div>
                  <div className={`${styles.statIcon} ${styles.patients}`}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statValue}>{stats.totalPatients.toLocaleString()}</div>
                <div className={`${styles.statChange} ${styles.positive}`}>+12% from last month</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statTitle}>Today's Appointments</div>
                  <div className={`${styles.statIcon} ${styles.appointments}`}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statValue}>{stats.todaysAppointments}</div>
                <div className={`${styles.statChange} ${styles.positive}`}>+8% from yesterday</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statTitle}>Active Doctors</div>
                  <div className={`${styles.statIcon} ${styles.doctors}`}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
                      <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5V6.5Z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statValue}>{stats.activeDoctors}</div>
                <div className={`${styles.statChange} ${styles.positive}`}>+2 new this week</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statTitle}>Monthly Revenue</div>
                  <div className={`${styles.statIcon} ${styles.revenue}`}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statValue}>₱{stats.monthlyRevenue.toLocaleString()}</div>
                <div className={`${styles.statChange} ${styles.negative}`}>-3% from last month</div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className={styles.dashboardGrid}>
              {/* Recent Appointments */}
              <div className={styles.dashboardSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Recent Appointments</h3>
                  <button className={styles.viewAllBtn} onClick={viewAllAppointments}>View All</button>
                </div>
                <div className={styles.sectionContent}>
                  {appointments.map(appointment => (
                    <div key={appointment.id} className={styles.recentItem}>
                      <div className={styles.itemAvatar}>{appointment.initials}</div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemName}>{appointment.name}</div>
                        <div className={styles.itemDetail}>{appointment.doctor} • {appointment.time}</div>
                      </div>
                      <div className={`${styles.itemStatus} ${styles[`status-${appointment.status}`]}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={styles.dashboardSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Quick Actions</h3>
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.quickActions}>
                    <button className={styles.actionBtn} onClick={addNewPatient}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      Add Patient
                    </button>
                    <button className={styles.actionBtn} onClick={scheduleAppointment}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5z" />
                        <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
                      </svg>
                      Schedule
                    </button>
                    <button className={styles.actionBtn} onClick={manageStaff}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                      </svg>
                      Manage Staff
                    </button>
                    <button className={styles.actionBtn} onClick={viewReports}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zM7.5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM14 7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2z" />
                      </svg>
                      Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={styles.dashboardSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Recent Activity</h3>
                </div>
                <div className={styles.sectionContent}>
                  {activities.map(activity => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={styles.activityDot}></div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityText}>{activity.text}</div>
                        <div className={styles.activityTime}>{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;