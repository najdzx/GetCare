import React, { useRef, useEffect, useState } from 'react';
import format from 'date-fns/format';

import './Appointments.css';

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
    <div className="today-view">
      <div className="today-grid custom-scrollbar" ref={todayGridRef}>
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
            <div key={i} className="today-row">
              <div className="today-time-cell">{timeString}</div>
              <div className="today-appointments-cell">
                <div className="today-appointment-half">
                  {topHalfAppointments.length > 0 ? (
                    topHalfAppointments.map((appt, idx) => (
                      <div key={idx} className="today-appointment-item">
                        <div className="today-appointment-time">{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</div>
                        <div className="today-appointment-title">{appt.title}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-appointment-slot"></div>
                  )}
                </div>
                <div className="today-appointment-half">
                  {bottomHalfAppointments.length > 0 ? (
                    bottomHalfAppointments.map((appt, idx) => (
                      <div key={idx} className="today-appointment-item">
                        <div className="today-appointment-time">{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</div>
                        <div className="today-appointment-title">{appt.title}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-appointment-slot"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {showNextBtn && (
          <button className="next-appointment-btn" onClick={scrollToNextAppointment}>
            ↓
          </button>
        )}
      </div>
    </div>
  );
};

export default TodayView; 