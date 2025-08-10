import React from 'react';
import styles from './Appointments.module.css';

const ListView = ({ 
  listFilters, 
  setListFilters, 
  getFilteredAppointments, 
  appointments, 
  setAppointments,
  setSelectedDate,
  setReschedIndex,
  setShowReschedModal 
}) => {
  return (
    <div className={styles['list-content']}>
      {/* Filters */}
      <div className={styles['list-filters']}>
        <div className={styles['filter-group']}>
          <label>Date (MM/DD/YYYY):</label>
          <input
            type="date"
            value={listFilters.date ? (() => {
              const [month, day, year] = listFilters.date.split('/');
              return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            })() : ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                const [year, month, day] = val.split('-');
                setListFilters({ ...listFilters, date: `${month}/${day}/${year}` });
              } else {
                setListFilters({ ...listFilters, date: '' });
              }
            }}
            className={styles['filter-select']}
          />
        </div>
        
        <div className={styles['filter-group']}>
          <label>Type:</label>
          <select 
            value={listFilters.type}
            onChange={(e) => setListFilters({...listFilters, type: e.target.value})}
            className={styles['filter-select']}
          >
            <option value="all">All Types</option>
            <option value="consultation">Consultation</option>
            <option value="follow-up">Follow-up</option>
            <option value="emergency">Emergency</option>
            <option value="routine">Routine</option>
          </select>
        </div>
        
        <div className={styles['filter-group']}>
          <label>Meeting Type:</label>
          <select 
            value={listFilters.meetingType}
            onChange={(e) => setListFilters({...listFilters, meetingType: e.target.value})}
            className={styles['filter-select']}
          >
            <option value="all">All Meeting Types</option>
            <option value="face-to-face">Face-to-Face</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className={styles['appointments-list-view']}>
        {getFilteredAppointments().length === 0 ? (
          <div className={styles['no-appointments']}>
            <p>No appointments found matching your filters.</p>
          </div>
        ) : (
          getFilteredAppointments().map((appointment, index) => (
            <div key={`${appointment.date}-${index}`} className={`${styles['list-appointment-item']} ${styles[appointment.meetingType]}`}>
              <div className={styles['list-appointment-date']}>
                <div className={styles['date-number']}>
                  {new Date(appointment.date).getDate()}
                </div>
                <div className={styles['date-month']}>
                  {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
              
              <div className={styles['list-appointment-time']}>
                {appointment.time}
              </div>
              
              <div className={styles['list-appointment-details']}>
                <div className={styles['list-patient-name']}>{appointment.patient}</div>
                <div className={styles['list-appointment-type']}>
                  {appointment.type} • {appointment.meetingType === 'face-to-face' ? 'Face-to-Face' : 'Online'}
                </div>
                <div className={styles['list-location']}>
                  {appointment.meetingType === 'online' ? (
                    <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer" className={styles['meet-link']}>
                      {appointment.meetLink}
                    </a>
                  ) : (
                    <span>{appointment.location}</span>
                  )}
                </div>
                {appointment.reschedNote && (
                  <div className={styles['reschedule-note']}>
                    Reschedule Note: {appointment.reschedNote}
                  </div>
                )}
              </div>
              
              <div className={styles['list-appointment-actions']}>
                <button 
                  className="global-btn secondary"
                  onClick={() => {
                    const dateAppointments = appointments[appointment.date];
                    const appointmentIndex = dateAppointments.findIndex(apt => 
                      apt.time === appointment.time && apt.patient === appointment.patient
                    );
                    setSelectedDate(appointment.date);
                    setReschedIndex(appointmentIndex);
                    setShowReschedModal(true);
                  }}
                >
                  Reschedule
                </button>
                <button 
                  className="global-btn secondary"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this appointment?')) {
                      const updatedAppointments = { ...appointments };
                      const dateAppointments = updatedAppointments[appointment.date];
                      const appointmentIndex = dateAppointments.findIndex(apt => 
                        apt.time === appointment.time && apt.patient === appointment.patient
                      );
                      dateAppointments.splice(appointmentIndex, 1);
                      if (dateAppointments.length === 0) {
                        delete updatedAppointments[appointment.date];
                      }
                      setAppointments(updatedAppointments);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListView;
