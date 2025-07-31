import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { MdChevronLeft, MdChevronRight, MdAdd, MdEdit, MdDelete, MdSchedule } from 'react-icons/md';
import MonthView from './MonthView';
import WeekView from './WeekView';
import TodayView from './TodayView';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Appointments.module.css';
import '../../../components/Layout/Scrollbar.css';
import '../../../components/Layout/Button.css';

import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfWeek from 'date-fns/startOfWeek';
import parse from 'date-fns/parse';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

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

  // Add state for day-details modal
  const [dayDetailsOpen, setDayDetailsOpen] = useState(false);
  const [dayDetailsDate, setDayDetailsDate] = useState(null);

  const handlePrev = () => {
    if (view === 'today') {
      setDate(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 1);
        return d;
      });
    } else if (view === 'week') {
      setDate(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 7);
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
    } else if (view === 'week') {
      setDate(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() + 7);
        return d;
      });
    } else {
      setDate(addMonths(date, 1));
    }
  };

  const today = new Date();
  const todayIndex = today.getDay();

  // Sample events data
  const [events, setEvents] = useState([
    {
      title: 'John Doe',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
    },
    {
      title: 'Jane Smith (F2F)',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 11, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
    },
    {
      title: 'Alice Brown',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 9, 30),
    },
    {
      title: 'Test Appt',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
    },
    {
      title: 'Edge Appt',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30),
    },
    {
      title: 'Late Morning',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
    },
    {
      title: 'Evening Appt',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 30),
    },
    {
      title: 'Morning Appt',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 30),
    },
    {
      title: 'Midmorning Appt',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
    },
    {
      title: 'Evening Appt',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 18, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 18, 30),
    },
  ]);

  const getAppointmentsForDate = (d) =>
    events.filter(
      (event) =>
        event.start.getDate() === d.getDate() &&
        event.start.getMonth() === d.getMonth() &&
        event.start.getFullYear() === d.getFullYear()
    );

  const handleMonthDayClick = (slotInfo) => {
    setDayDetailsDate(slotInfo.start);
    setDayDetailsOpen(true);
  };

  const handleAddFromDayDetails = () => {
    setDayDetailsOpen(false);
    setAddModalOpen(true);
  };

  const handlePatientInput = (e) => {
    const value = e.target.value;
    setPatientInput(value);
    
    if (value.trim()) {
      const filtered = patients.filter(patient =>
        patient.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  };

  const handleSelectPatient = (name) => {
    setSelectedPatient(name);
    setPatientInput(name);
    setFilteredPatients([]);
  };

  const handleViewSwitch = (newView) => {
    setView(newView);
    if (newView === 'today') {
      setDate(new Date());
    }
  };

  const scrollToNextAppointment = () => {
    // This function will be called from TodayView when the arrow button is clicked
    // The actual scrolling logic is handled within TodayView component
    console.log('Scroll to next appointment');
  };

  const handleTodayGridScroll = () => {
    // Implementation for handling today grid scroll
    console.log('Today grid scroll');
  };

  // Check if there are appointments for today
  const todayAppointments = getAppointmentsForDate(date);
  const hasAppointmentsToday = todayAppointments.length > 0;

  return (
    <div className={styles.appointmentsPage}>
      <div className={styles.calendarCard}>
        <div className={styles.customHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.label}>
              <span>
                {view === 'week'
                  ? (() => {
                      const weekStart = startOfWeek(date, { weekStartsOn: 0 });
                      const weekEnd = new Date(weekStart);
                      weekEnd.setDate(weekStart.getDate() + 6);
                      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
                    })()
                  : format(date, 'MMMM d, yyyy')}
              </span>
            </div>
          </div>
          <div className={styles.navButtons}>
            <button onClick={handlePrev} className="global-btn secondary">
              <MdChevronLeft />
            </button>
            <button onClick={handleNext} className="global-btn secondary">
              <MdChevronRight />
            </button>
          </div>
          <div className={styles.calendarViewSwitch}>
            <button className={`${styles.calendarViewBtn}${view === 'today' ? ` ${styles.active}` : ''}`} onClick={() => handleViewSwitch('today')}>Today</button>
            <button className={`${styles.calendarViewBtn}${view === 'week' ? ` ${styles.active}` : ''}`} onClick={() => handleViewSwitch('week')}>Week</button>
            <button className={`${styles.calendarViewBtn}${view === 'month' ? ` ${styles.active}` : ''}`} onClick={() => handleViewSwitch('month')}>Month</button>
            <button
              className="global-btn primary"
              onClick={() => setAddModalOpen(true)}
            >
              <MdAdd /> Add Appointment
            </button>
          </div>
        </div>

        {view === 'month' && (
          <MonthView
            date={date}
            events={events}
            setDate={setDate}
            setView={setView}
            dayDetailsOpen={dayDetailsOpen}
            setDayDetailsOpen={setDayDetailsOpen}
            dayDetailsDate={dayDetailsDate}
            setDayDetailsDate={setDayDetailsDate}
            getAppointmentsForDate={getAppointmentsForDate}
            handleAddFromDayDetails={handleAddFromDayDetails}
          />
        )}

        {view === 'week' && (
          <WeekView
            date={date}
            events={events}
            getAppointmentsForDate={getAppointmentsForDate}
          />
        )}

        {view === 'today' && (
          <TodayView
            date={date}
            events={events}
            getAppointmentsForDate={getAppointmentsForDate}
          />
        )}
      </div>

      {/* Add Appointment Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Box className={styles.appointmentsModal}>
          <h3>Add Appointment</h3>
          <div className={styles.formGroup}>
            <label>Patient</label>
            <input
              type="text"
              value={patientInput}
              onChange={handlePatientInput}
              placeholder="Type patient name"
              autoComplete="off"
            />
            {patientInput && filteredPatients.length > 0 && (
              <ul className={`${styles.autocompleteList} custom-scrollbar`}>
                {filteredPatients.map((name) => (
                  <li
                    key={name}
                    onClick={() => handleSelectPatient(name)}
                    className={styles.autocompleteItem}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Time</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
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
            className="global-btn primary"
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
  );
};

export default Appointments;