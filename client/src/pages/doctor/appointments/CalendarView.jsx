import React from 'react';
import styles from './Appointments.module.css';

const CalendarView = ({ 
  currentDate, 
  appointments, 
  openModal
}) => {
  
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

  return (
    <div className={styles['calendar-content']}>
      <div className={styles['calendar-grid']}>
        {generateCalendar()}
      </div>
    </div>
  );
};

export default CalendarView;
