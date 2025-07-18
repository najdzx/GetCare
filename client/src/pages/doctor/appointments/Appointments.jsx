import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Calendar as BigCalendar,
  Views,
  dateFnsLocalizer,
} from 'react-big-calendar';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfWeek from 'date-fns/startOfWeek';
import parse from 'date-fns/parse';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Appointments.css';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Example patient list for autocomplete
const patients = [
  'John Doe',
  'Jane Smith',
  'Alice Brown',
  'Bob Johnson',
  'Charlie Lee',
];

const Appointments = () => {
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');
  // Add Appointment Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [patientInput, setPatientInput] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('Face to face');

  const handlePrev = () => {
    if (view === 'today') {
      setDate(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 1);
        return d;
      });
    } else {
      setDate(subMonths(date, 1));
    }
  };
  const handleNext = () => {
    if (view === 'today') {
      setDate(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() + 1);
        return d;
      });
    } else {
      setDate(addMonths(date, 1));
    }
  };

  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  const [events, setEvents] = useState([
    {
      title: 'John Doe (Online)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
    },
    {
      title: 'Jane Smith (F2F)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 11, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
    },
    {
      title: 'Alice Brown (Online)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 9, 30),
    },
    {
      title: 'Test Appt (9:30-10:00)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
    },
    {
      title: 'Edge Appt (8:00-8:30)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30),
    },
    {
      title: 'Late Morning (11:30-12:00)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
    },
    {
      title: 'Evening Appt (8:00-8:30 PM)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 30),
    },
    {
      title: 'Morning Appt (9:00-9:30)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 30),
    },
    {
      title: 'Midmorning Appt (10:30-11:00)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
    },
    {
      title: 'Evening Appt (6:00-6:30 PM)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 18, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 18, 30),
    },
  ]);





  // Appointments for the selected date in 'today' view
  const appointmentsForToday = events.filter(
    (event) =>
      event.start.getFullYear() === date.getFullYear() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getDate() === date.getDate()
  );

  // Autocomplete handlers
  const handlePatientInput = (e) => {
    const value = e.target.value;
    setPatientInput(value);
    setFilteredPatients(
      patients.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
      )
    );
    setSelectedPatient('');
  };

  const handleSelectPatient = (name) => {
    setSelectedPatient(name);
    setPatientInput(name);
    setFilteredPatients([]);
  };

  // Handle view switch
  const handleViewSwitch = (newView) => {
    setView(newView);
    if (newView === 'today') {
      setDate(today);
    }
  };

  const todayGridRef = useRef(null);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [lastScrolledIdx, setLastScrolledIdx] = useState(-1);

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

  // Reset lastScrolledIdx when appointments or date changes
  useEffect(() => {
    setLastScrolledIdx(-1);
  }, [appointmentsForToday, date]);

  // Show/hide the next button based on scroll position
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

  // Attach scroll handler
  useEffect(() => {
    const grid = todayGridRef.current;
    if (!grid) return;
    grid.addEventListener('scroll', handleTodayGridScroll);
    handleTodayGridScroll();
    return () => grid.removeEventListener('scroll', handleTodayGridScroll);
  }, [appointmentsForToday, date]);

  useEffect(() => {
    if (location.state && location.state.focus === 'today') {
      setDate(new Date());
      setView('today');
    }
  }, [location.state]);

  return (
    <div className="appointments-page">
      <h2 className="calendar-title">Calendar</h2>
      <div className="calendar-card">
        <div className="custom-header">
          <div className="header-left">
            <span className="label">
              {view === 'today'
                ? format(date, 'EEEE, MMMM d, yyyy')
                : format(date, 'MMMM d, yyyy')}
            </span>
          </div>
          <div className="nav-buttons">
            <button onClick={handlePrev} className="nav-btn">
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </button>
            <button onClick={handleNext} className="nav-btn">
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
          <div className="calendar-view-switch">
            <button className={`calendar-view-btn${view === 'today' ? ' active' : ''}`} onClick={() => handleViewSwitch('today')}>Today</button>
            <button className={`calendar-view-btn${view === 'week' ? ' active' : ''}`} onClick={() => handleViewSwitch('week')}>Week</button>
            <button className={`calendar-view-btn${view === 'month' ? ' active' : ''}`} onClick={() => handleViewSwitch('month')}>Month</button>
          </div>
          <button
            className="add-appointment-btn"
            onClick={() => setAddModalOpen(true)}
          >
            Add Appointment
          </button>
        </div>

        {view === 'month' && (
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
              style={{ height: 'calc(60vh - 50px)' }}
            />
          </>
        )}
        {view === 'week' && (
          <BigCalendar
            localizer={localizer}
            events={events}
            date={date}
            view={Views.WEEK}
            onNavigate={setDate}
            onView={() => setView('week')}
            views={['week']}
            components={{
              toolbar: () => null,
              header: () => null,
            }}
            style={{ height: '60vh' }}
          />
        )}
        {view === 'today' && (
          <div className="today-view" style={{ height: '60vh' }}>
            <div className="today-grid" ref={todayGridRef}>
              {[...Array(18)].map((_, i) => {
                const hour = 4 + i;
                const timeLabel =
                  hour === 0
                    ? '12:00 AM'
                    : hour < 12
                    ? `${hour}:00 AM`
                    : hour === 12
                    ? '12:00 PM'
                    : `${hour - 12}:00 PM`;
                // Full hour: appointments from :00 to next :00
                const fullAppointments = appointmentsForToday.filter(
                  (appt) =>
                    appt.start.getHours() === hour &&
                    appt.start.getMinutes() === 0 &&
                    appt.end.getHours() === hour + 1 &&
                    appt.end.getMinutes() === 0
                );
                // Top half: appointments that end at this hour (not full-hour)
                const topAppointments = appointmentsForToday.filter(
                  (appt) =>
                    appt.end.getHours() === hour &&
                    appt.end.getMinutes() === 0 &&
                    !(appt.start.getHours() === hour - 1 && appt.start.getMinutes() === 0 && appt.end.getHours() === hour && appt.end.getMinutes() === 0)
                );
                // Bottom half: appointments that start at this hour and end after the hour (not full-hour)
                const bottomAppointments = appointmentsForToday.filter(
                  (appt) =>
                    appt.start.getHours() === hour &&
                    appt.start.getMinutes() === 0 &&
                    (appt.end.getHours() > hour || (appt.end.getHours() === hour && appt.end.getMinutes() > 0)) &&
                    !(appt.end.getHours() === hour + 1 && appt.end.getMinutes() === 0)
                );
                return (
                  <div className="today-row" key={hour}>
                    <div className="today-time-cell">{timeLabel}</div>
                    <div className="today-appointments-cell">
                      <div className="today-appointment-half top-half">
                        {fullAppointments.length === 1 ? (
                          <div className="today-appointment-item full-hour">
                            <span className="today-appointment-time">{format(fullAppointments[0].start, 'hh:mm a')} - {format(fullAppointments[0].end, 'hh:mm a')}</span>
                            <span className="today-appointment-title">{fullAppointments[0].title}</span>
                          </div>
                        ) : topAppointments.length > 0 ? (
                          topAppointments.map((appt, idx) => (
                            <div key={idx} className="today-appointment-item">
                              <span className="today-appointment-time">{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</span>
                              <span className="today-appointment-title">{appt.title}</span>
                            </div>
                          ))
                        ) : (
                          <span className="no-appointment-slot">&nbsp;</span>
                        )}
                      </div>
                      <div className="today-appointment-half bottom-half">
                        {fullAppointments.length === 1 ? null : bottomAppointments.length > 0 ? (
                          bottomAppointments.map((appt, idx) => (
                            <div key={idx} className="today-appointment-item">
                              <span className="today-appointment-time">{format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')}</span>
                              <span className="today-appointment-title">{appt.title}</span>
                            </div>
                          ))
                        ) : (
                          <span className="no-appointment-slot">&nbsp;</span>
                        )}
                      </div>
                      <div className="today-row-divider center-divider" />
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
        )}

        {/* Add Appointment Modal */}
        <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <Box className="appointments-modal">
            <h3>Add Appointment</h3>
            <div className="form-group">
              <label>Patient</label>
              <input
                type="text"
                value={patientInput}
                onChange={handlePatientInput}
                placeholder="Type patient name"
                autoComplete="off"
              />
              {patientInput && filteredPatients.length > 0 && (
                <ul className="autocomplete-list">
                  {filteredPatients.map((name) => (
                    <li
                      key={name}
                      onClick={() => handleSelectPatient(name)}
                      className="autocomplete-item"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mode</label>
              <select
                value={appointmentMode}
                onChange={(e) => setAppointmentMode(e.target.value)}
              >
                <option value="Face to face">Face to face</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <Button
              variant="contained"
              className="modal-add-appointment-btn"
              onClick={() => {
                // Parse date and time into a JS Date object
                const [year, month, day] = appointmentDate.split('-').map(Number);
                const [hour, minute] = appointmentTime.split(':').map(Number);
                const start = new Date(year, month - 1, day, hour, minute);
                const end = new Date(start.getTime() + 30 * 60000); // 30 minutes duration

                setEvents([
                  ...events,
                  {
                    title: `${patientInput} (${appointmentMode})`,
                    start,
                    end,
                  },
                ]);
                setAddModalOpen(false);

                // Optionally reset form fields
                setPatientInput('');
                setSelectedPatient('');
                setAppointmentDate('');
                setAppointmentTime('');
                setAppointmentMode('Face to face');
              }}
              disabled={
                !patientInput || !appointmentDate || !appointmentTime || !appointmentMode
              }
            >
              Save
            </Button>
          </Box>
        </Modal>


      </div>
    </div>
  );
};

export default Appointments;