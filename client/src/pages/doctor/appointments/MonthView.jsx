import React from 'react';
import { Calendar as BigCalendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { Modal, Box, Button } from '@mui/material';
import { MdAdd } from 'react-icons/md';

import './Appointments.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthView = ({ 
  date, 
  events, 
  setDate, 
  setView, 
  dayDetailsOpen, 
  setDayDetailsOpen, 
  dayDetailsDate, 
  setDayDetailsDate,
  getAppointmentsForDate,
  handleAddFromDayDetails
}) => {
  const today = new Date();
  const todayIndex = today.getDay();

  const handleMonthDayClick = (slotInfo) => {
    setDayDetailsDate(slotInfo.start);
    setDayDetailsOpen(true);
  };

  return (
    <>
      <div className="custom-weekdays">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`custom-weekday ${index === todayIndex ? 'is-today' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
      <BigCalendar
        localizer={localizer}
        events={events}
        date={date}
        view={Views.MONTH}
        onNavigate={setDate}
        onView={() => setView('month')}
        views={['month']}
        components={{
          toolbar: () => null,
          header: () => null,
        }}
        formats={{
          dateFormat: 'd',
        }}
        selectable
        onSelectSlot={handleMonthDayClick}
      />
      {/* Day Details Modal */}
      <Modal open={dayDetailsOpen} onClose={() => setDayDetailsOpen(false)}>
        <Box className="appointments-modal">
          <h3>Appointments for {dayDetailsDate ? format(dayDetailsDate, 'MMMM d, yyyy') : ''}</h3>
          <div>
            {dayDetailsDate && getAppointmentsForDate(dayDetailsDate).length > 0 ? (
              <ul className="day-appointments-list">
                {getAppointmentsForDate(dayDetailsDate).map((appt, idx) => (
                  <li key={idx} className="day-appointment-item">
                    <span className="day-appointment-time">{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</span>
                    <span className="day-appointment-title">{appt.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <div style={{ margin: '16px 0' }}>No appointments for this day.</div>
                <Button variant="contained" onClick={handleAddFromDayDetails} className="global-btn primary">
                  Add Appointment
                </Button>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MonthView; 