import React from 'react';
import styles from './Appointments.module.css';

const CalendarView = ({ 
  currentDate, 
  appointments, 
  openModal, 
  generateCalendar, 
  createDayElement 
}) => {
  return (
    <div className={styles['calendar-content']}>
      <div className={styles['calendar-grid']}>
        {generateCalendar()}
      </div>
    </div>
  );
};

export default CalendarView;
