import React, { useState, useEffect } from 'react';
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
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Add Appointment Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [patientInput, setPatientInput] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('Face to face');

  const handlePrev = () => setDate(subMonths(date, 1));
  const handleNext = () => setDate(addMonths(date, 1));

  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  const [events, setEvents] = useState([
  {
    title: 'John Doe (Online)',
    start: new Date(2025, 6, 10, 10, 0),
    end: new Date(2025, 6, 10, 10, 30),
  },
  {
    title: 'Jane Smith (F2F)',
    start: new Date(2025, 6, 12, 11, 30),
    end: new Date(2025, 6, 12, 12, 0),
  },
  {
    title: 'Alice Brown (Online)',
    start: new Date(2025, 6, 13, 9, 0),
    end: new Date(2025, 6, 13, 9, 30),
  },
]);

  // Handler for clicking a day tile
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setModalOpen(true);
  };

  // Get appointments for selected date
  const appointmentsForSelectedDate = events.filter(
    (event) =>
      selectedDate &&
      event.start.toDateString() === selectedDate.toDateString()
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

  return (
    <div className="appointments-page">
      <h2 className="calendar-title">Calendar</h2>
      <div className="calendar-card">
        <div className="custom-header">
          <div className="header-left">
            <span className="label">
              {format(date, 'MMMM d, yyyy')}
            </span>
            <div className="nav-buttons">
              <button onClick={handlePrev} className="nav-btn">
                <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
              </button>
              <button onClick={handleNext} className="nav-btn">
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
          <button
            className="add-appointment-btn"
            onClick={() => setAddModalOpen(true)}
          >
            Add Appointment
          </button>
        </div>

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
          view={view}
          onNavigate={setDate}
          onView={setView}
          views={['month']}
          components={{
            toolbar: () => null,
            header: () => null,
            // Removed custom dateCellWrapper
          }}
          formats={{
            dateFormat: 'd',
          }}
          style={{ height: '60vh' }}
          selectable
          onSelectSlot={handleSelectSlot}
        />

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

        {/* Modal for selected date */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box className="appointments-modal">
            <h3>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
            </h3>
            {appointmentsForSelectedDate.length > 0 ? (
              <ul>
                {appointmentsForSelectedDate.map((appt, idx) => (
                  <li key={idx}>
                    {appt.title} ({format(appt.start, 'hh:mm a')} - {format(appt.end, 'hh:mm a')})
                  </li>
                ))}
              </ul>
            ) : (
              <Button
                variant="contained"
                className="modal-add-appointment-btn"
                onClick={() => {
                  setModalOpen(false);
                  setAddModalOpen(true);
                }}
              >
                Add Appointment
              </Button>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Appointments;