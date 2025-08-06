import React from 'react';
import styles from './Doctors.module.css';

const AvailabilityModal = ({ 
  showAvailabilityModal, 
  setShowAvailabilityModal, 
  currentDoctor, 
  activeTab, 
  setActiveTab 
}) => {
  if (!showAvailabilityModal || !currentDoctor) return null;

  return (
    <div className={styles.modal}>
      <div className={`${styles.modalContent} ${styles.largeModal}`}>
        <div className={styles.modalHeader}>
          <h2>Edit Availability - Dr. {currentDoctor.name}</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => setShowAvailabilityModal(false)}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.availabilityTabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'ftf' ? styles.active : ''}`} 
              onClick={() => setActiveTab('ftf')}
            >
              Clinics
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'online' ? styles.active : ''}`} 
              onClick={() => setActiveTab('online')}
            >
              Online Consultations
            </button>
          </div>

          {/* Clinics Availability - Dynamic */}
          <div id="ftfTab" className={`${styles.tabContent} ${activeTab === 'ftf' ? styles.active : ''}`}> 
            <div className={styles.clinicsSection}>
              <div className={styles.sectionHeader}>
                <h3>Clinic Availability</h3>
              </div>
              <div id="clinicsList">
                {currentDoctor.clinics && currentDoctor.clinics.length > 0 ? (
                  currentDoctor.clinics.map((clinic, idx) => (
                    <div className={styles.clinicCard} key={clinic.id || idx}>
                      <div className={styles.clinicHeader}>
                        <div className={styles.clinicInfo}>
                          <h4>{clinic.name}</h4>
                          <p>{clinic.address}</p>
                        </div>
                      </div>
                      {/* Schedule Table */}
                      <div className={styles.scheduleTable}>
                        {/* Days Selection */}
                        <div className={styles.weekdaysHeader}>
                          {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
                            <div className={styles.weekdayCheckbox} key={day}>
                              <label className={styles.weekdayLabel}>
                                <input type="checkbox" defaultChecked={clinic.schedule[day]?.enabled} /> {day.charAt(0) + day.slice(1).toLowerCase()}
                              </label>
                            </div>
                          ))}
                        </div>
                        {/* Schedule Content */}
                        <div className={styles.scheduleContent}>
                          <div className={styles.scheduleHeaders} id="mainScheduleHeaders">
                            <div className={`${styles.headerCell} ${styles.dayHeader}`}>Day</div>
                            <div className={styles.headerCell}>Start Time</div>
                            <div className={styles.headerCell}>End Time</div>
                            <div className={styles.headerCell}>Availability</div>
                            <div className={styles.headerCell}>Add</div>
                          </div>
                          {/* Schedule rows for checked days */}
                          {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
                            clinic.schedule[day]?.enabled ? (
                              <div className={styles.dayScheduleSection} key={day}>
                                <div className={styles.scheduleRows}>
                                  {clinic.schedule[day].slots.map((slot, slotIndex) => (
                                    <div className={styles.scheduleRow} key={slotIndex}>
                                      <div className={`${styles.cell} ${styles.dayCell}`}>{slotIndex === 0 ? day : ''}</div>
                                      <div className={styles.cell}>
                                        <input type="time" value={slot.start} readOnly />
                                      </div>
                                      <div className={styles.cell}>
                                        <input type="time" value={slot.end} readOnly />
                                      </div>
                                      <div className={styles.cell}>
                                        <select value={slot.availability} disabled>
                                          <option value="appointments">Appointments Only</option>
                                          <option value="walkins">Walk-ins</option>
                                          <option value="both">Both</option>
                                        </select>
                                      </div>
                                      <div className={styles.cell}>
                                        <button className={styles.addNewBtn} disabled>
                                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                          </svg>
                                          Add New
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No clinics found for this doctor.</div>
                )}
              </div>
            </div>
          </div>

          {/* Online Availability */}
          <div id="onlineTab" className={`${styles.tabContent} ${activeTab === 'online' ? styles.active : ''}`}>
            <div className={styles.onlineSection}>
              <div className={styles.onlineAvailabilityHeader}>
                <h3>Online Consultation Availability</h3>
                <div className={styles.onlineToggleSwitch}>
                  <label className={styles.availabilityToggleSwitch}>
                    <input type="checkbox" id="onlineEnabled" defaultChecked />
                    <span className={styles.availabilitySlider}></span>
                  </label>
                  <span>Enable Online Consultations</span>
                </div>
              </div>
              
              {/* Online consultation - using EXACT clinic structure */}
              <div className={styles.clinicCard}>
                <div className={styles.clinicHeader}>
                  <div className={styles.clinicInfo}>
                    <h4>Online Consultation Schedule</h4>
                    <p>Set your availability for online consultations</p>
                  </div>
                </div>
                {/* Schedule Table */}
                <div className={styles.scheduleTable}>
                  {/* Days Selection */}
                  <div className={styles.weekdaysHeader}>
                    {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
                      <div className={styles.weekdayCheckbox} key={day}>
                        <label className={styles.weekdayLabel}>
                          <input type="checkbox" defaultChecked={day !== 'SUN'} /> {day.charAt(0) + day.slice(1).toLowerCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* Schedule Content */}
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleHeaders} id="onlineScheduleHeaders">
                      <div className={`${styles.headerCell} ${styles.dayHeader}`}>Day</div>
                      <div className={styles.headerCell}>Start Time</div>
                      <div className={styles.headerCell}>End Time</div>
                      <div className={styles.headerCell}>Availability</div>
                      <div className={styles.headerCell}>Add</div>
                    </div>
                    {/* Schedule rows for checked days */}
                    {['MON','TUE','WED','THU','FRI','SAT'].map(day => (
                      <div className={styles.dayScheduleSection} key={day}>
                        <div className={styles.scheduleRows}>
                          <div className={styles.scheduleRow}>
                            <div className={`${styles.cell} ${styles.dayCell}`}>{day}</div>
                            <div className={styles.cell}>
                              <input type="time" defaultValue="08:00" />
                            </div>
                            <div className={styles.cell}>
                              <input type="time" defaultValue="20:00" />
                            </div>
                            <div className={styles.cell}>
                              <select defaultValue="appointments">
                                <option value="appointments">Appointments Only</option>
                                <option value="walkins">Walk-ins</option>
                                <option value="both">Both</option>
                              </select>
                            </div>
                            <div className={styles.cell}>
                              <button className={styles.addNewBtn}>
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Add New
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelBtn} 
              onClick={() => setShowAvailabilityModal(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className={styles.submitBtn} 
              onClick={() => {
                alert('Availability settings have been saved successfully!');
                setShowAvailabilityModal(false);
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

export default AvailabilityModal;
