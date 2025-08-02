import React from 'react';
import styles from './Dashboard.module.css';

// SVG Icon Components
const CaretUpIcon = () => (
  <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  </svg>
);

const ReportsIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm5-1v12h4V2H6zm-4 0v12h3V2H2zm11 0h-3v12h3V2z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  </svg>
);

// Sub-components
const StatCard = ({ number, label, change, isPositive }) => (
  <div className={styles.statCard}>
    <div className={styles.statNumber}>{number}</div>
    <div className={styles.statLabel}>{label}</div>
    <div className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
      <CaretUpIcon />
      {change}
    </div>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button className={styles.actionBtn} onClick={onClick}>
    {icon}
    {label}
  </button>
);

const AppointmentItem = ({ time, doctor, type }) => (
  <div className={styles.appointmentItem}>
    <div className={styles.appointmentTime}>{time}</div>
    <div className={styles.appointmentInfo}>
      <div className={styles.appointmentDoctor}>{doctor}</div>
      <div className={styles.appointmentType}>{type}</div>
    </div>
  </div>
);

const MessageItem = ({ icon, from, text, time, isUnread }) => (
  <div className={`${styles.messageItem} ${isUnread ? styles.unread : ''}`}>
    <div className={styles.messageIcon}>{icon}</div>
    <div className={styles.messageContent}>
      <div className={styles.messageFrom}>{from}</div>
      <div className={styles.messageText}>{text}</div>
      <div className={styles.messageTime}>{time}</div>
    </div>
  </div>
);

const PrescriptionItem = ({ name, dosage, refills, status }) => (
  <div className={styles.prescriptionItem}>
    <div className={styles.prescriptionInfo}>
      <div className={styles.prescriptionName}>{name}</div>
      <div className={styles.prescriptionDosage}>{dosage}</div>
      <div className={styles.prescriptionRefills}>{refills}</div>
    </div>
    <div className={`${styles.prescriptionStatus} ${styles[`status${status}`]}`}>
      {status}
    </div>
  </div>
);

const Card = ({ title, action, onActionClick, children }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {action && (
        <a href="#" className={styles.cardAction} onClick={onActionClick}>
          {action}
        </a>
      )}
    </div>
    <div className={styles.cardContent}>{children}</div>
  </div>
);

// Main Component
const Dashboard = () => {
  // Handler functions
  const bookAppointment = () => alert('Opening appointment booking...');
  const viewTestResults = () => alert('Opening test results...');
  const requestPrescription = () => alert('Opening prescription refill request...');
  const contactDoctor = () => alert('Opening message composer...');
  const viewAllAppointments = (e) => {
    e.preventDefault();
    alert('Opening all appointments...');
  };
  const viewAllMessages = (e) => {
    e.preventDefault();
    alert('Opening all messages...');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Welcome back, Sarah</h1>
            <p className={styles.welcomeSubtitle}>Here's your health overview and upcoming appointments</p>
          </div>

          <div className={styles.statsGrid}>
            <StatCard number="3" label="Upcoming Appointments" change="Next: Tomorrow" isPositive />
            <StatCard number="2" label="Active Prescriptions" change="All current" isPositive />
            <StatCard number="5" label="Test Results" change="1 new result" isPositive />
            <StatCard number="1" label="New Messages" change="From Dr. Smith" isPositive />
          </div>

          <div className={styles.dashboardGrid}>
            <Card title="Quick Actions">
              <div className={styles.quickActions}>
                <ActionButton
                  icon={<CalendarIcon />}
                  label="Book Appointment"
                  onClick={bookAppointment}
                />
                <ActionButton
                  icon={<ReportsIcon />}
                  label="New notes"
                  onClick={viewTestResults}
                />
                <ActionButton
                  icon={<PlusIcon />}
                  label="Request Refill"
                  onClick={requestPrescription}
                />
                <ActionButton
                  icon={<MessageIcon />}
                  label="Contact Doctor"
                  onClick={contactDoctor}
                />
              </div>
            </Card>

            <Card 
              title="Upcoming Appointments" 
              action="View All" 
              onActionClick={viewAllAppointments}
            >
              <div className={styles.appointmentsList}>
                <AppointmentItem 
                  time="Tomorrow 10:00 AM" 
                  doctor="Dr. Michael Smith" 
                  type="Annual Checkup" 
                />
                <AppointmentItem 
                  time="Mar 15, 2:30 PM" 
                  doctor="Dr. Sarah Wilson" 
                  type="Cardiology Follow-up" 
                />
                <AppointmentItem 
                  time="Mar 22, 9:00 AM" 
                  doctor="Dr. James Brown" 
                  type="Lab Work" 
                />
              </div>
            </Card>

            <Card 
              title="Recent Messages" 
              action="View All" 
              onActionClick={viewAllMessages}
            >
              <div className={styles.messagesList}>
                <MessageItem
                  icon={<UserIcon />}
                  from="Dr. Michael Smith"
                  text="Your lab results are ready for review. Please schedule a follow-up appointment."
                  time="2 hours ago"
                  isUnread
                />
                <MessageItem
                  icon={<CalendarIcon />}
                  from="Appointment Reminder"
                  text="Don't forget your appointment tomorrow at 10:00 AM with Dr. Smith"
                  time="1 day ago"
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a', marginBottom: '12px' }}>
                  Current Prescriptions
                </h4>
                <div className={styles.prescriptionList}>
                  <PrescriptionItem
                    name="Lisinopril 10mg"
                    dosage="Take once daily"
                    refills="2 refills remaining"
                    status="Active"
                  />
                  <PrescriptionItem
                    name="Metformin 500mg"
                    dosage="Take twice daily with meals"
                    refills="1 refill remaining"
                    status="Active"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;