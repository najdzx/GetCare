import React, { useState } from 'react';
import { MdCalendarToday, MdLocalHospital, MdAccessTime, MdLocationOn, MdPerson, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import styles from './Appointments.module.css';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Sample appointments data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:00 AM',
      duration: '30 minutes',
      type: 'Follow-up',
      mode: 'Face to face',
      location: 'Medical Center Building A',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2025-01-18',
      time: '2:30 PM',
      duration: '45 minutes',
      type: 'Consultation',
      mode: 'Online',
      location: 'Virtual Consultation',
      status: 'confirmed'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-01-08',
      time: '11:00 AM',
      duration: '30 minutes',
      type: 'Check-up',
      mode: 'Face to face',
      location: 'Medical Center Building A',
      status: 'completed'
    },
    {
      id: 4,
      doctor: 'Dr. Emily Davis',
      specialty: 'General Medicine',
      date: '2025-01-05',
      time: '3:00 PM',
      duration: '20 minutes',
      type: 'Follow-up',
      mode: 'Online',
      location: 'Virtual Consultation',
      status: 'completed'
    }
  ];

  const allAppointments = [...upcomingAppointments, ...pastAppointments];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      case 'completed':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} className={styles.appointmentCard}>
      <div className={styles.appointmentHeader}>
        <div className={styles.doctorInfo}>
          <h3>{appointment.doctor}</h3>
          <p>{appointment.specialty}</p>
        </div>
        <div className={styles.appointmentStatus}>
          <span 
            className={styles.statusBadge}
            style={{ 
              backgroundColor: getStatusColor(appointment.status) + '20',
              color: getStatusColor(appointment.status)
            }}
          >
            {getStatusText(appointment.status)}
          </span>
        </div>
      </div>
      
      <div className={styles.appointmentDetails}>
        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <MdCalendarToday />
            <span>{appointment.date}</span>
          </div>
          <div className={styles.detailItem}>
            <MdAccessTime />
            <span>{appointment.time} ({appointment.duration})</span>
          </div>
        </div>
        
        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <MdLocalHospital />
            <span>{appointment.type}</span>
          </div>
          <div className={styles.detailItem}>
            <MdLocationOn />
            <span>{appointment.location}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.appointmentActions}>
        {appointment.status === 'confirmed' && (
          <>
            <button className={`${styles.actionBtn} ${styles.edit}`}>
              <MdEdit /> Reschedule
            </button>
            <button className={`${styles.actionBtn} ${styles.delete}`}>
              <MdDelete /> Cancel
            </button>
          </>
        )}
        {appointment.status === 'completed' && (
          <button className={`${styles.actionBtn} ${styles.view}`}>
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.patientAppointments}>
      <div className={styles.appointmentsHeader}>
        <div className={styles.headerContent}>
          <h1>My Appointments</h1>
          <p>Manage your medical appointments</p>
        </div>
        <button 
          className={styles.bookAppointmentBtn}
          onClick={() => setShowBookingModal(true)}
        >
          <MdAdd /> Book Appointment
        </button>
      </div>

      <div className={styles.appointmentsTabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.active : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({upcomingAppointments.length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'past' ? styles.active : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past ({pastAppointments.length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({allAppointments.length})
        </button>
      </div>

      <div className={styles.appointmentsContent}>
        {activeTab === 'upcoming' && (
          <div className={styles.appointmentsList}>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(renderAppointmentCard)
            ) : (
              <div className={styles.emptyState}>
                <MdCalendarToday />
                <h3>No upcoming appointments</h3>
                <p>You don't have any upcoming appointments scheduled.</p>
                <button 
                  className={styles.bookAppointmentBtn}
                  onClick={() => setShowBookingModal(true)}
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className={styles.appointmentsList}>
            {pastAppointments.length > 0 ? (
              pastAppointments.map(renderAppointmentCard)
            ) : (
              <div className={styles.emptyState}>
                <MdCalendarToday />
                <h3>No past appointments</h3>
                <p>You don't have any past appointments yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'all' && (
          <div className={styles.appointmentsList}>
            {allAppointments.length > 0 ? (
              allAppointments.map(renderAppointmentCard)
            ) : (
              <div className={styles.emptyState}>
                <MdCalendarToday />
                <h3>No appointments found</h3>
                <p>You don't have any appointments yet.</p>
                <button 
                  className={styles.bookAppointmentBtn}
                  onClick={() => setShowBookingModal(true)}
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal Placeholder */}
      {showBookingModal && (
        <div className={styles.modalOverlay} onClick={() => setShowBookingModal(false)}>
          <div className={styles.bookingModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Book Appointment</h2>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <p>Appointment booking functionality will be implemented here.</p>
              <p>This would include:</p>
              <ul>
                <li>Doctor selection</li>
                <li>Date and time picker</li>
                <li>Appointment type selection</li>
                <li>Mode selection (Face to face/Online)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;