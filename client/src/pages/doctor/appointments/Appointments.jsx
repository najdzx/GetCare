import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from './Appointments.module.css';
import '../../../components/Layout/Button.css';

const AppointmentsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2024
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({
    '2025-12-15': [
      { time: '09:00', patient: 'John Smith', type: 'consultation', meetingType: 'face-to-face', location: 'Downtown Medical Center' },
      { time: '14:30', patient: 'Mary Johnson', type: 'follow-up', meetingType: 'online', meetLink: 'https://meet.google.com/abc-defg-hij' }
    ],
    '2025-12-18': [
      { time: '10:00', patient: 'Robert Brown', type: 'emergency', meetingType: 'face-to-face', location: 'Emergency Clinic' }
    ],
    '2025-12-22': [
      { time: '11:00', patient: 'Sarah Davis', type: 'consultation', meetingType: 'face-to-face', location: 'Main Clinic' },
      { time: '15:00', patient: 'Michael Wilson', type: 'follow-up', meetingType: 'online', meetLink: 'https://meet.google.com/xyz-uvwx-rst' },
      { time: '16:30', patient: 'Lisa Anderson', type: 'consultation', meetingType: 'face-to-face', location: 'Downtown Medical Center' }
    ],
    '2025-07-15': [
      { time: '08:30', patient: 'Emma Thompson', type: 'routine', meetingType: 'face-to-face', location: 'Main Clinic' },
      { time: '10:15', patient: 'David Chen', type: 'consultation', meetingType: 'online', meetLink: 'https://meet.google.com/def-ghij-klm' },
      { time: '13:00', patient: 'Sophie Miller', type: 'follow-up', meetingType: 'online', meetLink: 'https://meet.google.com/nop-qrst-uvw' },
      { time: '14:45', patient: 'James Rodriguez', type: 'emergency', meetingType: 'face-to-face', location: 'Emergency Clinic' },
      { time: '16:00', patient: 'Anna Williams', type: 'consultation', meetingType: 'face-to-face', location: 'Downtown Medical Center' }
    ]
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'view' or 'add'
  const [modalTitle, setModalTitle] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [meetingType, setMeetingType] = useState('face-to-face');
  const [reschedIndex, setReschedIndex] = useState(null);
  const [showReschedModal, setShowReschedModal] = useState(false);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get previous month's last days
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const calendarDays = [];

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      calendarDays.push(
        <div key={`header-${day}`} className={styles['calendar-day-header']}>
          {day}
        </div>
      );
    });

    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push(createDayElement(day, true, year, month - 1));
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(createDayElement(day, false, year, month));
    }

    // Next month's leading days - fill to complete the last week
    let totalCells = calendarDays.length;
    let nextMonthDay = 1;
    while (totalCells < 7 + 42) { // 7 headers + 42 day cells (6 rows)
      calendarDays.push(createDayElement(nextMonthDay, true, year, month + 1));
      nextMonthDay++;
      totalCells++;
    }

    return calendarDays;
  };

  const createDayElement = (day, isOtherMonth, year, month) => {
    const dayDate = new Date(year, month, day);
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const today = new Date();
    
    const dayClasses = [styles['calendar-day']];
    if (isOtherMonth) dayClasses.push(styles['other-month']);
    if (!isOtherMonth && dayDate.toDateString() === today.toDateString()) {
      dayClasses.push(styles['today']);
    }
    
    const dayAppointments = appointments[dateKey] || [];
    const hasAppointments = dayAppointments.length > 0;
    
    return (
      <div 
        key={dateKey}
        className={dayClasses.join(' ')}
        onClick={() => !isOtherMonth && openModal(dateKey, day, month, year)}
      >
        <div className={styles['day-number']}>{day}</div>
        
        {hasAppointments && (
          <>
            <div style={{ flex: 1, overflow: 'hidden', marginBottom: '30px' }}>
              {dayAppointments.slice(0, 2).map((appointment, idx) => (
                <div key={idx} className={`${styles.appointment} ${styles[appointment.meetingType]}`}>
                  <div className={styles['appointment-time']}>{appointment.time}</div>
                  <div className={styles['appointment-patient']}>{appointment.patient}</div>
                </div>
              ))}
              
              {dayAppointments.length > 2 && (
                <div 
                  className={styles['appointment-more']}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    marginTop: '2px',
                    textAlign: 'center',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#5a6268'}
                  onMouseOut={(e) => e.target.style.background = '#6c757d'}
                >
                  +{dayAppointments.length - 2} more
                </div>
              )}
            </div>
            
            {dayAppointments.length > 1 && (
              <div 
                className={styles['appointment-badge']}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: '#434bb8',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700',
                  zIndex: '10',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {dayAppointments.length}
              </div>
            )}
          </>
        )}
        
        <button 
          className={styles['add-appointment-btn']}
          onClick={(e) => {
            e.stopPropagation();
            openModal(dateKey, day, month, year);
          }}
        >
          +
        </button>
      </div>
    );
  };

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
    setMeetingType('face-to-face');
    const today = new Date();
    setCurrentDate(today); // Set calendar to today
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDate(dateKey);
    setModalTitle('Add New Appointment');
    setModalType('add');
    setShowModal(true);
  };

  const renderAppointmentForm = (dateKey, isNew = false, meetingType, setMeetingType) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const appointmentDate = formData.get('date');
      const newAppointment = {
        time: formData.get('time'),
        patient: formData.get('patient'),
        type: formData.get('type'),
        meetingType: formData.get('meetingType'),
        notes: formData.get('notes')
      };
      // Only add location for face-to-face; meet link will be generated after creation
      if (newAppointment.meetingType === 'face-to-face') {
        newAppointment.location = formData.get('location');
      }
      const updatedAppointments = { ...appointments };
      if (!updatedAppointments[appointmentDate]) {
        updatedAppointments[appointmentDate] = [];
      }
      updatedAppointments[appointmentDate].push(newAppointment);
      updatedAppointments[appointmentDate].sort((a, b) => a.time.localeCompare(b.time));
      setAppointments(updatedAppointments);
      setShowModal(false);
      setShowAppointmentForm(false);
    };
    const toggleLocationField = (type) => {
      setMeetingType(type);
    };
    return (
      <form className={styles['appointment-form']} onSubmit={handleSubmit}>
        {!isNew && <h3 style={{ 
          marginBottom: '15px', 
          color: '#333', 
          borderTop: '1px solid #e0e0e0', 
          paddingTop: '20px' 
        }}>Add New Appointment</h3>}
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Date</label>
          <input 
            type="date" 
            className={styles['form-input']} 
            name="date" 
            defaultValue={dateKey} 
            required 
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Time</label>
          <input 
            type="time" 
            className={styles['form-input']} 
            name="time" 
            required 
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Patient Name</label>
          <input 
            type="text" 
            className={styles['form-input']} 
            name="patient" 
            placeholder="Enter patient name" 
            required 
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Appointment Type</label>
          <select className={styles['form-select']} name="type" required>
            <option value="consultation">Consultation</option>
            <option value="follow-up">Follow-up</option>
            <option value="emergency">Emergency</option>
            <option value="routine">Routine Check-up</option>
          </select>
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Meeting Type</label>
          <select 
            className={styles['form-select']} 
            name="meetingType" 
            required 
            onChange={(e) => toggleLocationField(e.target.value)}
            defaultValue="face-to-face"
          >
            <option value="face-to-face">Face-to-Face</option>
            <option value="online">Online</option>
          </select>
        </div>
        {meetingType === 'face-to-face' && (
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Clinic Location</label>
            <input 
              type="text" 
              className={styles['form-input']} 
              name="location" 
              placeholder="Enter clinic name or address" 
              required
            />
          </div>
        )}
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Notes (Optional)</label>
          <textarea 
            className={styles['form-textarea']} 
            name="notes" 
            placeholder="Additional notes..."
          ></textarea>
        </div>
        <div className={styles['form-actions']}>
          <button type="submit" className="global-btn2"> 
            Add Appointment
          </button>
          <button 
            type="button" 
            className="global-btn2" 
            onClick={() => {
              setShowAppointmentForm(false);
              if (isNew) setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
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

  const closeModal = () => {
    setShowModal(false);
    setShowAppointmentForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Calendar Header */}
        <div className={styles['calendar-header']}>
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
          <button className="global-btn2" onClick={openAddAppointmentModal}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add Appointment
          </button>
        </div>

        {/* Calendar Content */}
        <div className={styles['calendar-content']}>
          <div className={styles['calendar-grid']}>
            {generateCalendar()}
          </div>
        </div>
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
              {modalType === 'add' && renderAppointmentForm(selectedDate, true, meetingType, setMeetingType)}
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
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                              </svg>
                              <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer" className={styles['meet-link']}>
                                Join Google Meet
                              </a>
                            </div>
                          ) : (
                            <div className={styles['appointment-item-location']}>
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                              </svg>
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
                              className={`${styles.btn} ${styles['btn-danger']}`} 
                              onClick={() => deleteAppointment(index)}
                              style={{ padding: '8px 16px', fontSize: '13px' }}
                            >
                              Delete Appointment
                            </button>
                            <button
                              className={`${styles.btn} ${styles['btn-primary']}`}
                              onClick={() => openReschedModal(index)}
                              style={{ padding: '8px 16px', fontSize: '13px' }}
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Always show Add Appointment button in modal */}
                  {!showAppointmentForm && (
                    <button 
                      className="global-btn2" 
                      style={{ width: 'auto', minWidth: '180px', margin: '10px auto 0 auto', display: 'block' }}
                      onClick={() => setShowAppointmentForm(true)}
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                      Add Appointment
                    </button>
                  )}
                  {showAppointmentForm && renderAppointmentForm(selectedDate, false, meetingType, setMeetingType)}
                  {showReschedModal && reschedIndex !== null && (() => {
                    const appointment = appointments[selectedDate][reschedIndex];
                    return (
                      <div className={styles.modal} style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 10000, alignItems: 'center', justifyContent: 'center' }}>
                        <div className={styles['modal-content']}>
                          <div className={styles['modal-header']}>
                            <h2 className={styles['modal-title']}>Reschedule Appointment</h2>
                            <button className={styles['close-btn']} onClick={() => setShowReschedModal(false)}>&times;</button>
                          </div>
                          <form className={styles['appointment-form']} onSubmit={handleReschedSubmit}>
                            <div className={styles['form-group']}>
                              <label className={styles['form-label']}>New Date</label>
                              <input type="date" className={styles['form-input']} name="date" defaultValue={selectedDate} required />
                            </div>
                            <div className={styles['form-group']}>
                              <label className={styles['form-label']}>New Time</label>
                              <input type="time" className={styles['form-input']} name="time" defaultValue={appointment.time} required />
                            </div>
                            <div className={styles['form-group']}>
                              <label className={styles['form-label']}>Note (Reason for reschedule)</label>
                              <textarea className={styles['form-textarea']} name="note" placeholder="Enter reason or note..." defaultValue={appointment.reschedNote || ''}></textarea>
                            </div>
                            <div className={styles['form-actions']}>
                              <button type="submit" className="global-btn">Save</button>
                              <button type="button" className="global-btn" onClick={() => setShowReschedModal(false)}>Cancel</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    );
                  })()}
                </>;
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsCalendar;