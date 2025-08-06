import React, { useState } from 'react';
import styles from './Doctors.module.css';

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

  // State for schedule slots
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
            Edit Availability - Dr. {doctor.firstName || ''} {doctor.lastName || ''}
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
              Online Consultations
            </button>
          </div>

          {/* Clinics Availability */}
          {activeTab === 'ftf' && (
            <div className={styles.availabilityTabContent}>
              <div className={styles.clinicsList}>
                {clinics.map(clinic => (
                  <div key={clinic.id} className={styles.clinicCard}>
                    <div className={styles.clinicCardHeader}>
                      <div className={styles.clinicInfo}>
                        <h4>{clinic.name}</h4>
                        <p>{clinic.address} • {clinic.department}</p>
                        <span className={styles.clinicStatus}>{clinic.status}</span>
                      </div>
                      <div className={styles.clinicActions}>
                        <button className={styles.editClinicBtn} title="Edit Clinic">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button 
                          className={styles.removeClinicBtn} 
                          title="Remove Clinic"
                          onClick={() => handleRemoveClinic(clinic.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className={styles.clinicAvailabilityScheduleSection}>
                      {/* Days checkboxes */}
                      <div className={styles.clinicScheduleDays}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <label key={`${clinic.id}-${day}`} className={styles.clinicScheduleDayLabel}>
                            <span>{day.slice(0,3).toUpperCase()}</span>
                            <input
                              type="checkbox"
                              checked={clinic.daysChecked[day]}
                              onChange={() => handleClinicDayChange(clinic.id, day)}
                            />
                          </label>
                        ))}
                      </div>

                      {/* Schedule details */}
                      <div className={styles.clinicScheduleDetails}>
                        {/* Header labels */}
                        <div className={styles.clinicScheduleRow}>
                          <div className={styles.clinicScheduleRowLabel}></div>
                          <label className={styles.clinicScheduleLabel}>Start Time</label>
                          <label className={styles.clinicScheduleLabel}>End Time</label>
                          <label className={styles.clinicScheduleLabel}>Availability</label>
                          <label className={styles.clinicScheduleLabel}>Schedule Notes</label>
                          <div style={{ width: 120 }}></div>
                        </div>

                        {/* Schedule rows for checked days only */}
                        <div className={styles.clinicScheduleRowsWrapper}>
                          {Object.entries(clinic.daysChecked).filter(([day, checked]) => checked).map(([day]) => (
                            <div key={`${clinic.id}-schedule-${day}`}>
                              {clinic.scheduleSlots[day]?.map((slot, slotIndex) => (
                                <div className={styles.clinicScheduleRow} key={`clinic-${clinic.id}-${day}-${slotIndex}`}>
                                  <div className={styles.clinicScheduleRowLabel}>
                                    {slotIndex === 0 ? day : ''}
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.start}
                                      onChange={(e) => handleClinicSlotChange(clinic.id, day, slotIndex, 'start', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.end}
                                      onChange={(e) => handleClinicSlotChange(clinic.id, day, slotIndex, 'end', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <select 
                                      value={slot.availability}
                                      onChange={(e) => handleClinicSlotChange(clinic.id, day, slotIndex, 'availability', e.target.value)}
                                    >
                                      <option value="appointments">Appointments Only</option>
                                      <option value="walkins">Walk-ins</option>
                                      <option value="both">Both</option>
                                    </select>
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="text" 
                                      className={styles.clinicScheduleNotesInput}
                                      placeholder="Schedule notes..."
                                      value={slot.notes}
                                      onChange={(e) => handleClinicSlotChange(clinic.id, day, slotIndex, 'notes', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <div className={styles.clinicScheduleButtons}>
                                      {clinic.scheduleSlots[day]?.length > 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleRemoveClinicSlot(clinic.id, day, slotIndex)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                      {slotIndex === clinic.scheduleSlots[day]?.length - 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleAddNewClinicSlot(clinic.id, day)}
                                        >
                                          Add New
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )) || []}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Clinic Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button className={styles.addClinicBtn} onClick={handleAddNewClinic}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add New Clinic
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Online Consultations */}
          {activeTab === 'online' && (
            <div className={styles.availabilityTabContent}>
              <div className={styles.availabilityScheduleSection}>
                {/* Days checkboxes - ORIGINAL layout */}
                <div className={styles.scheduleDays}>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <label key={day} className={styles.scheduleDayLabel}>
                      <span>{day.slice(0,3).toUpperCase()}</span>
                      <input
                        type="checkbox"
                        checked={onlineDaysChecked[day]}
                        onChange={() => handleOnlineDayChange(day)}
                      />
                    </label>
                  ))}
                </div>

                {/* Schedule details - ORIGINAL layout */}
                <div className={styles.scheduleDetails}>
                  {/* Header labels */}
                  <div className={styles.scheduleRow}>
                    <div className={styles.scheduleRowLabel}></div>
                    <label className={styles.scheduleLabel}>Start Time</label>
                    <label className={styles.scheduleLabel}>End Time</label>
                    <label className={styles.scheduleLabel}>Availability</label>
                    <label className={styles.scheduleLabel}>Schedule Notes</label>
                    <div style={{ width: 120 }}></div>
                  </div>

                  {/* Schedule rows for checked days only */}
                  <div className={styles.scheduleRowsWrapper}>
                    {Object.entries(onlineDaysChecked).filter(([day, checked]) => checked).map(([day]) => (
                      <div key={day}>
                        {onlineScheduleSlots[day]?.map((slot, slotIndex) => (
                          <div className={styles.scheduleRow} key={`online-${day}-${slotIndex}`}>
                            <div className={styles.scheduleRowLabel}>
                              {slotIndex === 0 ? day : ''}
                            </div>
                            <div className={styles.scheduleCell}>
                              <input 
                                type="time" 
                                className={styles.scheduleTimeInput}
                                value={slot.start}
                                onChange={(e) => handleOnlineSlotChange(day, slotIndex, 'start', e.target.value)}
                              />
                            </div>
                            <div className={styles.scheduleCell}>
                              <input 
                                type="time" 
                                className={styles.scheduleTimeInput}
                                value={slot.end}
                                onChange={(e) => handleOnlineSlotChange(day, slotIndex, 'end', e.target.value)}
                              />
                            </div>
                            <div className={styles.scheduleCell}>
                              <select 
                                value={slot.availability}
                                onChange={(e) => handleOnlineSlotChange(day, slotIndex, 'availability', e.target.value)}
                              >
                                <option value="appointments">Appointments Only</option>
                                <option value="walkins">Walk-ins</option>
                                <option value="both">Both</option>
                              </select>
                            </div>
                            <div className={styles.scheduleCell}>
                              <input 
                                type="text" 
                                className={styles.scheduleNotesInput}
                                placeholder="Schedule notes..."
                                value={slot.notes}
                                onChange={(e) => handleOnlineSlotChange(day, slotIndex, 'notes', e.target.value)}
                              />
                            </div>
                            <div className={styles.scheduleCell}>
                              <div className={styles.scheduleButtons}>
                                {onlineScheduleSlots[day]?.length > 1 && (
                                  <button 
                                    type="button" 
                                    className="global-btn secondary"
                                    onClick={() => handleRemoveOnlineSlot(day, slotIndex)}
                                  >
                                    Remove
                                  </button>
                                )}
                                {slotIndex === onlineScheduleSlots[day]?.length - 1 && (
                                  <button 
                                    type="button" 
                                    className="global-btn secondary"
                                    onClick={() => handleAddNewOnlineSlot(day)}
                                  >
                                    Add New
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )) || []}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.availabilityActions}>
            <button 
              className="global-btn secondary" 
              onClick={handleBackToList}
            >
              Cancel
            </button>
            <button 
              className="global-btn primary"
              onClick={() => {
                alert('Availability settings have been saved successfully!');
                handleBackToList();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityView;
