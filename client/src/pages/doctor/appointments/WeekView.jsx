import React from 'react';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import styles from './Appointments.module.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekView = ({ 
  date, 
  events, 
  getAppointmentsForDate 
}) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // Sunday start

  return (
    <div className={styles.weekView}>
      <div className={`${styles.weekGrid} custom-scrollbar`}>
        {/* Week header with day names */}
        <div className={styles.weekHeader}>
          <div className={styles.weekTimeHeader}></div>
          {[...Array(7)].map((_, i) => {
            const dayDate = new Date(weekStart);
            dayDate.setDate(weekStart.getDate() + i);
            const isToday = dayDate.toDateString() === new Date().toDateString();
            return (
              <div key={i} className={`${styles.weekDayHeader} ${isToday ? styles.isToday : ''}`}>
                <div className={styles.weekDayName}>{weekdays[i]}</div>
                <div className={styles.weekDayDate}>{format(dayDate, 'MMM d')}</div>
              </div>
            );
          })}
        </div>
        
        {/* Week grid with time slots */}
        <div className={`${styles.weekGridBody} custom-scrollbar`}>
          {[...Array(18)].map((_, i) => {
            const hour = 4 + i;
            const timeString = hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
            
            return (
              <div key={i} className={styles.weekRow}>
                <div className={styles.weekTimeCell}>{timeString}</div>
                {[...Array(7)].map((_, j) => {
                  const dayDate = new Date(weekStart);
                  dayDate.setDate(weekStart.getDate() + j);
                  const slotDate = new Date(dayDate);
                  slotDate.setHours(hour, 0, 0, 0);
                  
                  const appointments = getAppointmentsForDate(slotDate);
                  const topHalfAppointments = appointments.filter(appt => {
                    const apptHour = appt.start.getHours();
                    const apptMinute = appt.start.getMinutes();
                    return apptHour === hour && apptMinute < 30;
                  });
                  const bottomHalfAppointments = appointments.filter(appt => {
                    const apptHour = appt.start.getHours();
                    const apptMinute = appt.start.getMinutes();
                    return apptHour === hour && apptMinute >= 30;
                  });

                  return (
                    <div key={j} className={styles.weekAppointmentsCell}>
                      <div className={styles.weekAppointmentHalf}>
                        {topHalfAppointments.length > 0 ? (
                          topHalfAppointments.map((appt, idx) => (
                            <div key={idx} className={styles.weekAppointmentItem}>
                              <div className={styles.weekAppointmentTitle}>{appt.title}</div>
                            </div>
                          ))
                        ) : (
                          <div className={styles.noAppointmentSlot}></div>
                        )}
                      </div>
                      <div className={styles.weekAppointmentHalf}>
                        {bottomHalfAppointments.length > 0 ? (
                          bottomHalfAppointments.map((appt, idx) => (
                            <div key={idx} className={styles.weekAppointmentItem}>
                              <div className={styles.weekAppointmentTitle}>{appt.title}</div>
                            </div>
                          ))
                        ) : (
                          <div className={styles.noAppointmentSlot}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView; 