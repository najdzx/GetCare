import React from 'react';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';

import './Appointments.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekView = ({ 
  date, 
  events, 
  getAppointmentsForDate 
}) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // Sunday start

  return (
    <div className="week-view">
      <div className="week-grid custom-scrollbar">
        {/* Week header with day names */}
        <div className="week-header">
          <div className="week-time-header"></div>
          {[...Array(7)].map((_, i) => {
            const dayDate = new Date(weekStart);
            dayDate.setDate(weekStart.getDate() + i);
            const isToday = dayDate.toDateString() === new Date().toDateString();
            return (
              <div key={i} className={`week-day-header ${isToday ? 'is-today' : ''}`}>
                <div className="week-day-name">{weekdays[i]}</div>
                <div className="week-day-date">{format(dayDate, 'MMM d')}</div>
              </div>
            );
          })}
        </div>
        
        {/* Week grid with time slots */}
        <div className="week-grid-body custom-scrollbar">
          {[...Array(18)].map((_, i) => {
            const hour = 4 + i;
            const timeString = hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
            
            return (
              <div key={i} className="week-row">
                <div className="week-time-cell">{timeString}</div>
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
                    <div key={j} className="week-appointments-cell">
                      <div className="week-appointment-half">
                        {topHalfAppointments.length > 0 ? (
                          topHalfAppointments.map((appt, idx) => (
                            <div key={idx} className="week-appointment-item">
                              <div className="week-appointment-title">{appt.title}</div>
                            </div>
                          ))
                        ) : (
                          <div className="no-appointment-slot"></div>
                        )}
                      </div>
                      <div className="week-appointment-half">
                        {bottomHalfAppointments.length > 0 ? (
                          bottomHalfAppointments.map((appt, idx) => (
                            <div key={idx} className="week-appointment-item">
                              <div className="week-appointment-title">{appt.title}</div>
                            </div>
                          ))
                        ) : (
                          <div className="no-appointment-slot"></div>
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