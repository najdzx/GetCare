import React, { useRef, useEffect, useState } from 'react';
import format from 'date-fns/format';
import styles from './Appointments.module.css';

const TodayView = ({ 
  date, 
  events, 
  getAppointmentsForDate
}) => {
  const todayGridRef = useRef(null);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const handleTodayGridScroll = () => {
    if (!todayGridRef.current) return;
    const grid = todayGridRef.current;
    const appointmentEls = grid.querySelectorAll('.today-appointment-item');
    if (appointmentEls.length === 0) {
      setShowNextBtn(false);
      return;
    }
    const gridRect = grid.getBoundingClientRect();
    let hasBelow = false;
    for (let el of appointmentEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top > gridRect.bottom - 20) {
        hasBelow = true;
        break;
      }
    }
    setShowNextBtn(hasBelow);
  };

  const scrollToNextAppointment = () => {
    if (!todayGridRef.current) return;
    const grid = todayGridRef.current;
    const appointmentEls = Array.from(grid.querySelectorAll('.today-appointment-item'));
    if (appointmentEls.length === 0) return;
    const gridRect = grid.getBoundingClientRect();
    for (let el of appointmentEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top > gridRect.bottom - 10) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  };

  // Attach scroll handler
  useEffect(() => {
    const grid = todayGridRef.current;
    if (!grid) return;
    grid.addEventListener('scroll', handleTodayGridScroll);
    handleTodayGridScroll();
    return () => grid.removeEventListener('scroll', handleTodayGridScroll);
  }, [getAppointmentsForDate(date)]);

  // Reset scroll position when date changes
  useEffect(() => {
    if (todayGridRef.current) {
      todayGridRef.current.scrollTop = 0;
    }
  }, [date]);

  return (
    <div className={styles.todayView}>
      <div className={`${styles.todayGrid} custom-scrollbar`} ref={todayGridRef}>
        {[...Array(18)].map((_, i) => {
          const hour = 4 + i;
          const timeString = hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
          
          const slotDate = new Date(date);
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
            <div key={i} className={styles.todayRow}>
              <div className={styles.todayTimeCell}>{timeString}</div>
              <div className={styles.todayAppointmentsCell}>
                <div className={styles.todayAppointmentHalf}>
                  {topHalfAppointments.length > 0 ? (
                    topHalfAppointments.map((appt, idx) => (
                      <div key={idx} className={styles.todayAppointmentItem}>
                        <div className={styles.todayAppointmentTime}>{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</div>
                        <div className={styles.todayAppointmentTitle}>{appt.title}</div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noAppointmentSlot}></div>
                  )}
                </div>
                <div className={styles.todayAppointmentHalf}>
                  {bottomHalfAppointments.length > 0 ? (
                    bottomHalfAppointments.map((appt, idx) => (
                      <div key={idx} className={styles.todayAppointmentItem}>
                        <div className={styles.todayAppointmentTime}>{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</div>
                        <div className={styles.todayAppointmentTitle}>{appt.title}</div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noAppointmentSlot}></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showNextBtn && (
        <button className={styles.nextAppointmentBtn} onClick={scrollToNextAppointment}>
          Next Appointment
        </button>
      )}
    </div>
  );
};

export default TodayView; 