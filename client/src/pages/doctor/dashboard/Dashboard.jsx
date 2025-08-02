import React, { useEffect } from 'react';
import styles from './Dashboard.module.css';

// SVG Icon Components
const CaretUpIcon = () => (
  <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
  </svg>
);

const ScheduleIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  </svg>
);

const ReportsIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm5-1v12h4V2H6zm-4 0v12h3V2H2zm11 0h-3v12h3V2z"/>
  </svg>
);

const MessagesIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
  </svg>
);

const ConsultationsIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>
);

const LabIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  </svg>
);

// Sub-components
const StatCard = ({ number, label, change, isPositive }) => (
  <div className={styles['stat-card']}>
    <div className={styles['stat-number']}>{number}</div>
    <div className={styles['stat-label']}>{label}</div>
    <div className={`${styles['stat-change']} ${isPositive ? styles.positive : styles.negative}`}>
      <CaretUpIcon />
      {change}
    </div>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button className={styles['action-btn']} onClick={onClick}>
    {icon}
    {label}
  </button>
);

const AppointmentItem = ({ time, patient, type }) => (
  <div className={styles['appointment-item']}>
    <div className={styles['appointment-time']}>{time}</div>
    <div className={styles['appointment-info']}>
      <div className={styles['appointment-patient']}>{patient}</div>
      <div className={styles['appointment-type']}>{type}</div>
    </div>
  </div>
);

const NotificationItem = ({ icon, title, message, time, isUnread }) => (
  <div className={`${styles['notification-item']} ${isUnread ? styles.unread : ''}`}>
    <div className={styles['notification-icon']}>{icon}</div>
    <div className={styles['notification-content']}>
      <div className={styles['notification-title']}>{title}</div>
      <div className={styles['notification-message']}>{message}</div>
      <div className={styles['notification-time']}>{time}</div>
    </div>
  </div>
);

const Card = ({ title, action, onActionClick, children }) => (
  <div className={styles.card}>
    <div className={styles['card-header']}>
      <h3 className={styles['card-title']}>{title}</h3>
      {action && (
        <a href="#" className={styles['card-action']} onClick={onActionClick}>
          {action}
        </a>
      )}
    </div>
    <div className={styles['card-content']}>{children}</div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  // Dashboard functionality
  const viewAllPatients = () => alert('Navigating to Patients page...');
  const viewPatient = (patientId) => alert(`Opening patient record for Patient ID: ${patientId}`);
  const viewConsultations = () => alert('Opening consultations page...');
  const scheduleAppointment = () => alert('Opening appointment scheduler...');
  const viewReports = () => alert('Opening reports dashboard...');
  const viewMessages = () => alert('Opening messages/communications...');
  const viewSchedule = (e) => {
    e.preventDefault();
    alert('Opening full schedule view...');
  };
  const viewAllNotifications = (e) => {
    e.preventDefault();
    alert('Opening all notifications...');
  };

  // Simulate real-time updates
  const updateStats = () => {
    console.log('Updating dashboard stats...');
  };

  useEffect(() => {
    console.log('Dashboard loaded successfully');
    updateStats();
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles['welcome-section']}>
            <h1 className={styles['welcome-title']}>Good morning, Dr. Anderson</h1>
            <p className={styles['welcome-subtitle']}>Here's what's happening with your patients today</p>
          </div>

          <div className={styles['stats-grid']}>
            <StatCard number="24" label="Total Patients" change="+3 this week" isPositive />
            <StatCard number="8" label="Today's Appointments" change="2 more than yesterday" isPositive />
            <StatCard number="5" label="Case Reviews" change="+2 this week" isPositive />
            <StatCard number="12" label="Shared Cases" change="+2 this month" isPositive />
          </div>

          <div className={styles['dashboard-grid']}>
            <Card title="Quick Actions">
              <div className={styles['quick-actions']}>
                <ActionButton
                  icon={<ScheduleIcon />}
                  label="Schedule"
                  onClick={scheduleAppointment}
                />
                <ActionButton
                  icon={<ReportsIcon />}
                  label="Reports"
                  onClick={viewReports}
                />
                <ActionButton
                  icon={<MessagesIcon />}
                  label="Messages"
                  onClick={viewMessages}
                />
                <ActionButton
                  icon={<ConsultationsIcon />}
                  label="Consultations"
                  onClick={viewConsultations}
                />
              </div>
            </Card>

            <Card 
              title="Today's Appointments" 
              action="View Schedule" 
              onActionClick={viewSchedule}
            >
              <div className={styles['appointments-list']}>
                <AppointmentItem 
                  time="9:00 AM" 
                  patient="Sarah Johnson" 
                  type="Regular Checkup" 
                />
                <AppointmentItem 
                  time="10:30 AM" 
                  patient="Michael Chen" 
                  type="Follow-up Visit" 
                />
                <AppointmentItem 
                  time="2:00 PM" 
                  patient="Emily Davis" 
                  type="Consultation" 
                />
                <AppointmentItem 
                  time="3:30 PM" 
                  patient="James Wilson" 
                  type="Lab Results Review" 
                />
              </div>
            </Card>

            <Card 
              title="Recent Notifications" 
              action="View All" 
              onActionClick={viewAllNotifications}
            >
              <div className={styles['notifications-list']}>
                <NotificationItem
                  icon={<LabIcon />}
                  title="Lab Results Available"
                  message="New lab results for John Smith are ready for review"
                  time="5 minutes ago"
                  isUnread
                />
                <NotificationItem
                  icon={<MessagesIcon />}
                  title="New Message"
                  message="Dr. Sarah Wilson shared a case with you"
                  time="15 minutes ago"
                  isUnread
                />
                <NotificationItem
                  icon={<CalendarIcon />}
                  title="Appointment Reminder"
                  message="Maria Garcia has an appointment in 30 minutes"
                  time="1 hour ago"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;