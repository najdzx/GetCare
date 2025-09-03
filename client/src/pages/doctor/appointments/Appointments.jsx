import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from './Appointments.module.css';
import '../../../components/Layout/Button.css';
import CalendarView from './CalendarView';
import ListView from './ListView';
import AppointmentBooking from './AppointmentBooking';
import { showToast } from '../../../components/Layout/toast';


const AppointmentsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [modalType, setModalType] = useState(null); // 'view' or 'add'
  const [modalTitle, setModalTitle] = useState('');
  const [reschedIndex, setReschedIndex] = useState(null);
  const [showReschedModal, setShowReschedModal] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'list', or 'booking'
  
  // Confirmation modal state - matching patient system
  const [showModal, setShowModal] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [confirmedDate, setConfirmedDate] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null); // For rescheduling appointments
  
  const [listFilters, setListFilters] = useState({
    date: '',  // exact date filter
    type: 'all',
    meetingType: 'all'
  });

  const openModal = (dateKey, day, month, year) => {
    setMeetingType('face-to-face');
    setSelectedDate(dateKey);
    setShowAppointmentForm(false);
    const date = new Date(year, month, day);
    setModalTitle(`Appointments - ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    setModalType('view');
    setShowModal(true);
  };

  const openAddAppointmentModal = () => {
    setViewMode('booking');
  };

  const handleAppointmentCreated = (dateKey, newAppointment) => {
    const updatedAppointments = { ...appointments };
    
    // If rescheduling an existing appointment
    if (rescheduleTarget) {
      const { originalDate, originalIndex } = rescheduleTarget;
      
      // Remove appointment from original date
      if (updatedAppointments[originalDate]) {
        updatedAppointments[originalDate].splice(originalIndex, 1);
        if (updatedAppointments[originalDate].length === 0) {
          delete updatedAppointments[originalDate];
        }
      }
      
      // Add updated appointment to new date
      if (!updatedAppointments[dateKey]) {
        updatedAppointments[dateKey] = [];
      }
      updatedAppointments[dateKey].push(newAppointment);
      updatedAppointments[dateKey].sort((a, b) => a.time.localeCompare(b.time));
      setAppointments(updatedAppointments);
      
      // Clear reschedule target
      setRescheduleTarget(null);
      
      // Show confirmation modal and toast for rescheduling
      setConfirmedAppointment(newAppointment);
      setConfirmedDate(new Date(dateKey));
      setShowModal(true);
      showToast('Appointment rescheduled successfully', 'success');
      setViewMode('calendar');
      return;
    }
    
    // Regular appointment creation
    if (!updatedAppointments[dateKey]) {
      updatedAppointments[dateKey] = [];
    }
    updatedAppointments[dateKey].push(newAppointment);
    updatedAppointments[dateKey].sort((a, b) => a.time.localeCompare(b.time));
    setAppointments(updatedAppointments);
    
    // Show confirmation modal and toast - matching patient system
    setConfirmedAppointment(newAppointment);
    setConfirmedDate(new Date(dateKey));
    setShowModal(true);
    showToast('Appointment scheduled successfully', 'success');
    setViewMode('calendar');
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmedAppointment(null);
    setConfirmedDate(null);
  };

  const viewAppointments = () => {
    setShowModal(false);
    setViewMode('list');
    setConfirmedAppointment(null);
    setConfirmedDate(null);
  };

  const deleteAppointment = (index) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const updatedAppointments = { ...appointments };
      updatedAppointments[selectedDate].splice(index, 1);
      if (updatedAppointments[selectedDate].length === 0) {
        delete updatedAppointments[selectedDate];
      }
      setAppointments(updatedAppointments);
      setShowModal(false);
    }
  };

  // Reschedule appointment function - based on patient system
  const rescheduleAppointment = (date, appointmentIndex) => {
    const appointment = appointments[date][appointmentIndex];
    if (!appointment) return;
    
    setRescheduleTarget({
      ...appointment,
      originalDate: date,
      originalIndex: appointmentIndex,
      appointmentId: `${date}-${appointmentIndex}` // Create unique ID for tracking
    });
    
    setViewMode('booking');
  };

  const openReschedModal = (index) => {
    setReschedIndex(index);
    setShowReschedModal(true);
  };

  const handleReschedSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDate = formData.get('date');
    const newTime = formData.get('time');
    const note = formData.get('note');
    const updatedAppointments = { ...appointments };
    const appointment = updatedAppointments[selectedDate][reschedIndex];
    // Remove from old date
    updatedAppointments[selectedDate].splice(reschedIndex, 1);
    if (updatedAppointments[selectedDate].length === 0) {
      delete updatedAppointments[selectedDate];
    }
    // Add to new date
    const newAppointment = { ...appointment, time: newTime, reschedNote: note };
    if (!updatedAppointments[newDate]) updatedAppointments[newDate] = [];
    updatedAppointments[newDate].push(newAppointment);
    updatedAppointments[newDate].sort((a, b) => a.time.localeCompare(b.time));
    setAppointments(updatedAppointments);
    setShowReschedModal(false);
    setShowModal(false);
    setReschedIndex(null);
  };

  const previousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  // Get all appointments as a flat list for list view
  const getAllAppointments = () => {
    const allAppointments = [];
    Object.entries(appointments).forEach(([date, dayAppointments]) => {
      dayAppointments.forEach(appointment => {
        allAppointments.push({
          ...appointment,
          date,
          dateObj: new Date(date)
        });
      });
    });
    
    // Sort by date and time
    allAppointments.sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.dateObj - b.dateObj;
    });
    
    return allAppointments;
  };

  // Filter appointments based on list filters
  const getFilteredAppointments = () => {
    let filtered = getAllAppointments();

    // Exact date filter (MM/DD/YYYY)
    if (listFilters.date) {
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.date);
        const formatted = `${String(aptDate.getMonth()+1).padStart(2,'0')}/${String(aptDate.getDate()).padStart(2,'0')}/${aptDate.getFullYear()}`;
        return formatted === listFilters.date;
      });
    }
    
    // Type filter
    if (listFilters.type !== 'all') {
      filtered = filtered.filter(apt => apt.type === listFilters.type);
    }
    
    // Meeting type filter
    if (listFilters.meetingType !== 'all') {
      filtered = filtered.filter(apt => apt.meetingType === listFilters.meetingType);
    }
    
    return filtered;
  };

  const renderModalContent = () => {
    if (!confirmedAppointment || !confirmedDate) return null;

    const formatTime = (timeString) => {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    const dateStr = confirmedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let meetingLink = null;
    if (confirmedAppointment.meetingType === 'online') {
      if (confirmedAppointment.meetLink && !confirmedAppointment.needsGoogleAuth) {
        // Real Google Meet link
        const fullLink = confirmedAppointment.meetLink.startsWith('http') 
          ? confirmedAppointment.meetLink 
          : `https://${confirmedAppointment.meetLink}`;
        
        const chooserHref = `https://accounts.google.com/AccountChooser?continue=${encodeURIComponent(fullLink)}`;
        const displayLink = fullLink.replace(/^https?:\/\//, '');
        
        meetingLink = (
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Google Meet Link:</span>
            <span className={styles.summaryValue} style={{color: '#1a1a1a', textDecoration: 'underline'}}>
              <a href={chooserHref} target="_blank" rel="noopener noreferrer" style={{color: '#1a1a1a'}}>
                {displayLink}
              </a>
            </span>
          </div>
        );
      } else {
        // No Google Meet link available
        meetingLink = (
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Google Meet Link:</span>
            <span className={styles.summaryValue} style={{color: '#d32f2f'}}>
              Google authentication required to generate meet link
            </span>
          </div>
        );
      }
    }

    return (
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.successIcon}>
            <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
          </div>
          <h2>Appointment Confirmed!</h2>
          <p>Your appointment has been successfully booked.</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.appointmentSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Appointment ID:</span>
              <span className={styles.summaryValue}>#APT{Math.floor(Math.random() * 9000 + 1000)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Patient:</span>
              <span className={styles.summaryValue}>{confirmedAppointment.patientName || confirmedAppointment.patient}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Date & Time:</span>
              <span className={styles.summaryValue}>{dateStr} at {formatTime(confirmedAppointment.time)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Type:</span>
              <span className={styles.summaryValue}>
                {confirmedAppointment.meetingType === 'online' ? 'Online Consultation' : 'Face-to-Face'}
              </span>
            </div>
            {confirmedAppointment.meetingType === 'face-to-face' && confirmedAppointment.location && (
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Location:</span>
                <span className={styles.summaryValue}>{confirmedAppointment.location}</span>
              </div>
            )}
            {confirmedAppointment.meetingType === 'online' && meetingLink}
          </div>
          {confirmedAppointment.meetingType === 'online' && (
            <div style={{background: confirmedAppointment.needsGoogleAuth ? '#fef3c7' : '#f0f9ff', padding: '12px', borderRadius: '6px', marginTop: '16px', fontSize: '12px', color: confirmedAppointment.needsGoogleAuth ? '#92400e' : '#0369a1'}}>
              {confirmedAppointment.needsGoogleAuth ? (
                <>
                  ⚠️ Google authentication is required to generate a meet link.<br />
                  📝 Please authenticate with Google to enable automatic meet link creation for future appointments.
                </>
              ) : (
                <>
                  📧 Meeting details and Google Meet link have been sent to your email.<br />
                  📱 You'll also receive an SMS reminder 30 minutes before your appointment.
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.modalActions}>
          <button className={styles.btnSecondary} onClick={closeModal}>Close</button>
          <button className={styles.btnPrimary} onClick={viewAppointments}>View My Appointments</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Calendar Header */}
        <div className={styles['calendar-header']}>
          {viewMode === 'calendar' && (
            <div className={styles['calendar-left']}>
              <h1 className={styles['calendar-title']}>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h1>
              <div className={styles['calendar-nav']}>
                <button className="global-btn secondary" onClick={previousMonth} aria-label="Previous Month">
                  <MdChevronLeft size={24} />
                </button>
                <button className="global-btn secondary" onClick={nextMonth} aria-label="Next Month">
                  <MdChevronRight size={24} />
                </button>
              </div>
            </div>
          )}
          {viewMode === 'list' && (
            <div className={styles['calendar-left']}>
              <h1 className={styles['calendar-title']}>
                All Appointments
              </h1>
            </div>
          )}
          {viewMode === 'booking' && (
            <div className={styles['calendar-left']}>
            </div>
          )}
          {viewMode !== 'booking' && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="global-btn secondary" onClick={openAddAppointmentModal}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Appointment
              </button>
              <button 
                className={viewMode === 'list' ? "global-btn secondary" : "global-btn secondary"} 
                onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                  {viewMode === 'calendar' ? (
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm1 0v12h14V2H1zm1 3v1h12V5H2zm0 2v1h12V7H2zm0 2v1h12V9H2z"/>
                  ) : (
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  )}
                </svg>
                {viewMode === 'calendar' ? 'View All' : 'Calendar View'}
              </button>
            </div>
          )}
        </div>

        {/* Content - Calendar, List, or Booking View */}
        {viewMode === 'calendar' ? (
          <CalendarView 
            currentDate={currentDate}
            appointments={appointments}
            openModal={openModal}
          />
        ) : viewMode === 'list' ? (
          <ListView 
            listFilters={listFilters}
            setListFilters={setListFilters}
            getFilteredAppointments={getFilteredAppointments}
            appointments={appointments}
            setAppointments={setAppointments}
            setSelectedDate={setSelectedDate}
            setReschedIndex={setReschedIndex}
            setShowReschedModal={setShowReschedModal}
            rescheduleAppointment={rescheduleAppointment}
          />
        ) : (
          <AppointmentBooking
            onClose={() => {
              setViewMode('calendar');
              setRescheduleTarget(null); // Clear reschedule target when closing
            }}
            onAppointmentCreated={handleAppointmentCreated}
            rescheduleTarget={rescheduleTarget}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && selectedDate && (
        <div 
          className={styles.modal}
          style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 10000,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => e.target.classList.contains(styles.modal) && closeModal()}
        >
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <h2 className={styles['modal-title']}>{modalTitle}</h2>
              <button className={styles['close-btn']} onClick={closeModal}>&times;</button>
            </div>
            <div className={styles['modal-body-scroll']}>
              {modalType === 'view' && (() => {
                const dayAppointments = appointments[selectedDate] || [];
                return <>
                  {dayAppointments.length > 0 && (
                    <div className={styles['appointment-list']}>
                      {dayAppointments.map((appointment, index) => (
                        <div key={index} className={`${styles['appointment-item']} ${styles[appointment.meetingType]}`}>
                          <div className={styles['appointment-item-time']}>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>
                            {appointment.time}
                          </div>
                          <div className={styles['appointment-item-patient']}>{appointment.patient}</div>
                          <div className={styles['appointment-item-type']}>
                            {appointment.type} • {appointment.meetingType === 'face-to-face' ? 'Face-to-Face' : 'Online'}
                          </div>
                          {appointment.meetingType === 'online' ? (
                            <div className={styles['appointment-item-location']}>
                              <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer" className={styles['meet-link']}>
                                {appointment.meetLink}
                              </a>
                            </div>
                          ) : (
                            <div className={styles['appointment-item-location']}>
                              {appointment.location}
                            </div>
                          )}
                          {appointment.reschedNote && (
                            <div style={{ marginTop: '8px', fontSize: '12px', color: '#434bb8', background: '#f5f5f5', borderRadius: '4px', padding: '6px 10px', fontStyle: 'italic' }}>
                              <strong>Reschedule Note:</strong> {appointment.reschedNote}
                            </div>
                          )}
                          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <button 
                              className="global-btn secondary" 
                              onClick={() => deleteAppointment(index)}
                              style={{ padding: '8px 16px', fontSize: '13px' }}
                            >
                              Delete Appointment
                            </button>
                            <button
                              className="global-btn secondary"
                              onClick={() => rescheduleAppointment(selectedDate, index)}
                              style={{ padding: '8px 16px', fontSize: '13px' }}
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {dayAppointments.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                      <p>No appointments scheduled for this date.</p>
                      <button 
                        className="global-btn secondary" 
                        style={{ marginTop: '15px' }}
                        onClick={() => {
                          closeModal();
                          setViewMode('booking');
                        }}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Appointment
                      </button>
                    </div>
                  )}
                </>;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal - Top Level */}
      {showReschedModal && reschedIndex !== null && selectedDate && (
        <div className={styles.modal} style={{display:'flex', position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.6)', zIndex:10000, alignItems:'center', justifyContent:'center'}} onClick={(e)=>(e.target.classList.contains(styles.modal) && setShowReschedModal(false))}>
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <h2 className={styles['modal-title']}>Reschedule Appointment</h2>
              <button className={styles['close-btn']} onClick={()=>setShowReschedModal(false)}>&times;</button>
            </div>
            <form className={styles['appointment-form']} onSubmit={handleReschedSubmit}>
              <div className={styles['form-group']}>
                <label className={styles['form-label']}>New Date</label>
                <input type="date" className={styles['form-input']} name="date" defaultValue={selectedDate} required />
              </div>
              <div className={styles['form-group']}>
                <label className={styles['form-label']}>New Time</label>
                <input type="time" className={styles['form-input']} name="time" defaultValue={appointments[selectedDate][reschedIndex]?.time} required />
              </div>
              <div className={styles['form-group']}>
                <label className={styles['form-label']}>Note (Reason for reschedule)</label>
                <textarea className={styles['form-textarea']} name="note" placeholder="Enter reason or note..." defaultValue={appointments[selectedDate][reschedIndex]?.reschedNote || ''}></textarea>
              </div>
              <div className={styles['form-actions']}>
                <button type="submit" className="global-btn secondary">Save</button>
                <button type="button" className="global-btn secondary" onClick={()=>setShowReschedModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal - matching patient system */}
      {showModal && (
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          {renderModalContent()}
        </div>
      )}
    </div>
  );
};

export default AppointmentsCalendar;