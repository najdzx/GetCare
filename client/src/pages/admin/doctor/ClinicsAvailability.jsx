import React from 'react';
import styles from './Doctors.module.css';

const ClinicsAvailability = ({
  clinics,
  setClinics,
  editModeClinics,
  setEditModeClinics,
  handleClinicDayChange,
  handleClinicSlotChange,
  handleAddNewClinicSlot,
  handleRemoveClinicSlot,
  handleAddNewClinic,
  handleRemoveClinic
}) => {
  return (
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
                {!editModeClinics[clinic.id] && (
                  <>
                    <button
                      type="button"
                      className="global-btn secondary"
                      title="Edit Clinic"
                      onClick={() => setEditModeClinics(prev => ({ ...prev, [clinic.id]: true }))}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="global-btn secondary"
                      title="Remove Clinic"
                      onClick={() => handleRemoveClinic(clinic.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </>
                )}
                {editModeClinics[clinic.id] && (
                  <>
                    <button
                      type="button"
                      className="global-btn secondary"
                      style={{ marginLeft: 8 }}
                      onClick={() => setEditModeClinics(prev => ({ ...prev, [clinic.id]: false }))}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="global-btn"
                      style={{ marginLeft: 8 }}
                      // TODO: Implement save logic for clinics
                      onClick={() => setEditModeClinics(prev => ({ ...prev, [clinic.id]: false }))}
                    >
                      Save
                    </button>
                  </>
                )}
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
                      onChange={() => editModeClinics[clinic.id] && handleClinicDayChange(clinic.id, day)}
                      disabled={!editModeClinics[clinic.id]}
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
                              onChange={(e) => editModeClinics[clinic.id] && handleClinicSlotChange(clinic.id, day, slotIndex, 'start', e.target.value)}
                              disabled={!editModeClinics[clinic.id]}
                            />
                          </div>
                          <div className={styles.clinicScheduleCell}>
                            <input 
                              type="time" 
                              className={styles.clinicScheduleTimeInput}
                              value={slot.end}
                              onChange={(e) => editModeClinics[clinic.id] && handleClinicSlotChange(clinic.id, day, slotIndex, 'end', e.target.value)}
                              disabled={!editModeClinics[clinic.id]}
                            />
                          </div>
                          <div className={styles.clinicScheduleCell}>
                            <select 
                              value={slot.availability}
                              onChange={(e) => editModeClinics[clinic.id] && handleClinicSlotChange(clinic.id, day, slotIndex, 'availability', e.target.value)}
                              disabled={!editModeClinics[clinic.id]}
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
                              onChange={(e) => editModeClinics[clinic.id] && handleClinicSlotChange(clinic.id, day, slotIndex, 'notes', e.target.value)}
                              disabled={!editModeClinics[clinic.id]}
                            />
                          </div>
                          <div className={styles.clinicScheduleCell}>
                            <div className={styles.clinicScheduleButtons}>
                              {editModeClinics[clinic.id] && clinic.scheduleSlots[day]?.length > 1 && (
                                <button 
                                  type="button" 
                                  className="global-btn secondary"
                                  onClick={() => handleRemoveClinicSlot(clinic.id, day, slotIndex)}
                                >
                                  Remove
                                </button>
                              )}
                              {editModeClinics[clinic.id] && slotIndex === clinic.scheduleSlots[day]?.length - 1 && (
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
  );
};

export default ClinicsAvailability;
