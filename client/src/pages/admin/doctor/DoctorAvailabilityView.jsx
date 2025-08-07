import React, { useState } from 'react';

import styles from './Doctors.module.css';
import ClinicsAvailability from './ClinicsAvailability';
import OnlineAvailability from './OnlineAvailability';
import PatientsSection from './PatientsSection';
import AppointmentsSection from './AppointmentsSection';
import HistorySection from './HistorySection';

const DoctorAvailabilityView = ({ getCurrentDoctor, handleBackToList, activeTab, setActiveTab }) => {
  const doctor = getCurrentDoctor();

  // Days state for checkboxes (for clinics tab)
  const [clinicDaysChecked, setClinicDaysChecked] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: false,
    Friday: true,
    Saturday: false,
    Sunday: false
  });


  // Online consultation days state
  const [onlineDaysChecked, setOnlineDaysChecked] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false
  });

  // Online edit mode state
  const [isEditModeOnline, setIsEditModeOnline] = useState(false);

  // State for schedule slots
  // Per-clinic edit mode state
  const [editModeClinics, setEditModeClinics] = useState({});
  const [clinicScheduleSlots, setClinicScheduleSlots] = useState({
    Monday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
    Tuesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
    Wednesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
    Thursday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
    Friday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
    Saturday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
    Sunday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
  });

  // Online consultation schedule slots state
  const [onlineScheduleSlots, setOnlineScheduleSlots] = useState({
    Monday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
    Tuesday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
    Wednesday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
    Thursday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
    Friday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
    Saturday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
    Sunday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }]
  });

  // Dummy clinics data
  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: "St. Mary's Medical Center - Main Campus",
      address: "123 Medical Drive, Downtown",
      department: "Cardiology Department",
      status: "Active",
      daysChecked: {
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: false,
        Friday: true,
        Saturday: false,
        Sunday: false
      },
      scheduleSlots: {
        Monday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: 'Regular hours' }],
        Tuesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: 'Regular hours' }],
        Wednesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: 'Regular hours' }],
        Thursday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Friday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: 'Regular hours' }],
        Saturday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Sunday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
      }
    },
    {
      id: 2,
      name: "Downtown Health Clinic",
      address: "456 Downtown Ave, Business Center",
      department: "General Practice",
      status: "Active",
      daysChecked: {
        Monday: false,
        Tuesday: true,
        Wednesday: false,
        Thursday: true,
        Friday: false,
        Saturday: true,
        Sunday: false
      },
      scheduleSlots: {
        Monday: [{ start: '14:00', end: '18:00', availability: 'appointments', notes: '' }],
        Tuesday: [{ start: '14:00', end: '18:00', availability: 'appointments', notes: 'Evening appointments' }],
        Wednesday: [{ start: '14:00', end: '18:00', availability: 'appointments', notes: '' }],
        Thursday: [{ start: '14:00', end: '18:00', availability: 'appointments', notes: 'Evening appointments' }],
        Friday: [{ start: '14:00', end: '18:00', availability: 'appointments', notes: '' }],
        Saturday: [{ start: '10:00', end: '16:00', availability: 'walkins', notes: 'Weekend hours' }],
        Sunday: [{ start: '10:00', end: '16:00', availability: 'walkins', notes: '' }]
      }
    }
  ]);

  // Error handling - if no doctor found, show error message
  if (!doctor) {
    return (
      <div className={styles.doctorAvailabilityContainer}>
        <div className={styles.doctorAvailabilityWrapper}>
          <div className={styles.doctorAvailabilityHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Doctors
            </button>
          </div>
          <div className={styles.doctorAvailabilityContent}>
            <div className={styles.availabilitySectionHeader}>
              <h3>Error</h3>
            </div>
            <p>Doctor information not found. Please go back and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  // Handler for clinic day checkbox
  const handleOldClinicDayChange = (day) => {
    setClinicDaysChecked(prev => ({ ...prev, [day]: !prev[day] }));
  };

  // Handler for online day checkbox
  const handleOnlineDayChange = (day) => {
    setOnlineDaysChecked(prev => ({ ...prev, [day]: !prev[day] }));
  };

  // Handler functions for clinic slot management
  const handleSlotChange = (day, slotIndex, field, value) => {
    setClinicScheduleSlots(prev => ({
      ...prev,
      [day]: prev[day].map((slot, index) => 
        index === slotIndex 
          ? { ...slot, [field]: value }
          : slot
      )
    }));
  };

  // Handler functions for online slot management
  const handleOnlineSlotChange = (day, slotIndex, field, value) => {
    setOnlineScheduleSlots(prev => ({
      ...prev,
      [day]: prev[day].map((slot, index) => 
        index === slotIndex 
          ? { ...slot, [field]: value }
          : slot
      )
    }));
  };

  const handleAddNewSlot = (day) => {
    setClinicScheduleSlots(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
    }));
  };

  // Handler for adding online consultation slots
  const handleAddNewOnlineSlot = (day) => {
    setOnlineScheduleSlots(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '08:00', end: '20:00', availability: 'appointments', notes: '' }]
    }));
  };

  const handleRemoveSlot = (day, slotIndex) => {
    setClinicScheduleSlots(prev => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== slotIndex)
    }));
  };

  // Handler for removing online consultation slots
  const handleRemoveOnlineSlot = (day, slotIndex) => {
    setOnlineScheduleSlots(prev => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== slotIndex)
    }));
  };

  // Clinic management handlers
  const handleClinicDayChange = (clinicId, day) => {
    setClinics(prev => prev.map(clinic => 
      clinic.id === clinicId 
        ? { ...clinic, daysChecked: { ...clinic.daysChecked, [day]: !clinic.daysChecked[day] } }
        : clinic
    ));
  };

  const handleClinicSlotChange = (clinicId, day, slotIndex, field, value) => {
    setClinics(prev => prev.map(clinic => 
      clinic.id === clinicId 
        ? {
            ...clinic, 
            scheduleSlots: {
              ...clinic.scheduleSlots,
              [day]: clinic.scheduleSlots[day].map((slot, index) => 
                index === slotIndex 
                  ? { ...slot, [field]: value }
                  : slot
              )
            }
          }
        : clinic
    ));
  };

  const handleAddNewClinicSlot = (clinicId, day) => {
    setClinics(prev => prev.map(clinic => 
      clinic.id === clinicId 
        ? {
            ...clinic, 
            scheduleSlots: {
              ...clinic.scheduleSlots,
              [day]: [...clinic.scheduleSlots[day], { start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
            }
          }
        : clinic
    ));
  };

  const handleRemoveClinicSlot = (clinicId, day, slotIndex) => {
    setClinics(prev => prev.map(clinic => 
      clinic.id === clinicId 
        ? {
            ...clinic, 
            scheduleSlots: {
              ...clinic.scheduleSlots,
              [day]: clinic.scheduleSlots[day].filter((_, index) => index !== slotIndex)
            }
          }
        : clinic
    ));
  };

  const handleAddNewClinic = () => {
    const newClinic = {
      id: Date.now(),
      name: "New Clinic",
      address: "Enter clinic address",
      department: "General Practice",
      status: "Active",
      daysChecked: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      },
      scheduleSlots: {
        Monday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Tuesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Wednesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Thursday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Friday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Saturday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
        Sunday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
      }
    };
    setClinics(prev => [...prev, newClinic]);
  };

  const handleRemoveClinic = (clinicId) => {
    setClinics(prev => prev.filter(clinic => clinic.id !== clinicId));
  };

  return (
    <div className={styles.doctorAvailabilityContainer}>
      <div className={styles.doctorAvailabilityWrapper}>
        {/* Header Section */}
        <div className={styles.doctorAvailabilityHeader}>
          <button className={styles.backButton} onClick={handleBackToList}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Doctors
          </button>
          <h1 className={styles.doctorAvailabilityTitle}>
          Dr. {doctor.firstName || ''} {doctor.lastName || ''}
          </h1>
        </div>
        {/* Content Section */}
        <div className={styles.doctorAvailabilityContent}>
          <div className={styles.availabilityTabs}>
            <button 
              className={`${styles.availabilityTabBtn} ${activeTab === 'ftf' ? styles.active : ''}`} 
              onClick={() => setActiveTab('ftf')}
            >
              Clinics
            </button>
            <button 
              className={`${styles.availabilityTabBtn} ${activeTab === 'online' ? styles.active : ''}`} 
              onClick={() => setActiveTab('online')}
            >
              Online
            </button>
            <button 
              className={`${styles.availabilityTabBtn} ${activeTab === 'patients' ? styles.active : ''}`} 
              onClick={() => setActiveTab('patients')}
            >
              Patients
            </button>
            <button 
              className={`${styles.availabilityTabBtn} ${activeTab === 'appointments' ? styles.active : ''}`} 
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button 
              className={`${styles.availabilityTabBtn} ${activeTab === 'history' ? styles.active : ''}`} 
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>
          {/* Clinics Availability */}
          {activeTab === 'ftf' && (
            <ClinicsAvailability
              clinics={clinics}
              setClinics={setClinics}
              editModeClinics={editModeClinics}
              setEditModeClinics={setEditModeClinics}
              handleClinicDayChange={handleClinicDayChange}
              handleClinicSlotChange={handleClinicSlotChange}
              handleAddNewClinicSlot={handleAddNewClinicSlot}
              handleRemoveClinicSlot={handleRemoveClinicSlot}
              handleAddNewClinic={handleAddNewClinic}
              handleRemoveClinic={handleRemoveClinic}
            />
          )}
          {/* Online Availability */}
          {activeTab === 'online' && (
            <OnlineAvailability
              onlineDaysChecked={onlineDaysChecked}
              setOnlineDaysChecked={setOnlineDaysChecked}
              isEditModeOnline={isEditModeOnline}
              setIsEditModeOnline={setIsEditModeOnline}
              onlineScheduleSlots={onlineScheduleSlots}
              handleOnlineDayChange={handleOnlineDayChange}
              handleOnlineSlotChange={handleOnlineSlotChange}
              handleAddNewOnlineSlot={handleAddNewOnlineSlot}
              handleRemoveOnlineSlot={handleRemoveOnlineSlot}
            />
          )}
          {/* Patients Section */}
          {activeTab === 'patients' && (
            <PatientsSection doctor={doctor} />
          )}
          {/* Appointments Section */}
          {activeTab === 'appointments' && (
            <AppointmentsSection doctor={doctor} />
          )}
          {/* History Section */}
          {activeTab === 'history' && (
            <HistorySection doctor={doctor} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityView;
