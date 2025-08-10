import React, { useState } from 'react';
import styles from './Availability.module.css';
import '../../../components/Layout/Scrollbar.css';
import '../../../components/Layout/Button.css';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const DAY_LABELS = {
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
  SUN: 'Sunday'
};

const Availability = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [onlineSchedule, setOnlineSchedule] = useState({
    enabled: true,
    timezone: 'Asia/Manila',
    schedule: {
      MON: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      TUE: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      WED: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      THU: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      FRI: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      SAT: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      SUN: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
    }
  });

  const [advanceNotice, setAdvanceNotice] = useState(24); // hours
  const [cancellationPolicy, setCancellationPolicy] = useState(2); // hours
  const [showBookingSettings, setShowBookingSettings] = useState(false);

  // Track checked days for schedule - start with no days selected
  const [checkedDays, setCheckedDays] = useState([]);

  // Track saved state to restore on cancel
  const [savedOnlineSchedule, setSavedOnlineSchedule] = useState({
    enabled: true,
    timezone: 'Asia/Manila',
    schedule: {
      MON: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      TUE: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      WED: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      THU: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      FRI: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      SAT: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
      SUN: { enabled: false, slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }] },
    }
  });
  const [savedAdvanceNotice, setSavedAdvanceNotice] = useState(24);
  const [savedCancellationPolicy, setSavedCancellationPolicy] = useState(2);
  const [savedCheckedDays, setSavedCheckedDays] = useState([]);

  const handleDayCheck = (day) => {
    if (!isEditMode) return;
    
    setCheckedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
    
    // Update schedule enabled state
    setOnlineSchedule(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          enabled: !prev.schedule[day].enabled
        }
      }
    }));
  };

  const handleTimeChange = (day, slotIndex, field, value) => {
    if (!isEditMode) return;
    
    setOnlineSchedule(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          slots: prev.schedule[day].slots.map((slot, index) => 
            index === slotIndex 
              ? { ...slot, [field]: value }
              : slot
          )
        }
      }
    }));
  };

  const handleAddNewSlot = (day) => {
    if (!isEditMode) return;
    
    setOnlineSchedule(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          slots: [...prev.schedule[day].slots, { start: '09:00', end: '17:00', availability: 'appointments' }]
        }
      }
    }));
  };

  const handleRemoveSlot = (day, slotIndex) => {
    if (!isEditMode) return;
    
    setOnlineSchedule(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          slots: prev.schedule[day].slots.filter((_, index) => index !== slotIndex)
        }
      }
    }));
  };

  const handleSave = () => {
    // Save availability settings
    console.log('Saving availability settings:', { onlineSchedule, advanceNotice, cancellationPolicy });
    // TODO: Implement API call to save settings
    
    // Update saved state
    setSavedOnlineSchedule(onlineSchedule);
    setSavedAdvanceNotice(advanceNotice);
    setSavedCancellationPolicy(cancellationPolicy);
    setSavedCheckedDays([...checkedDays]);
    
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // Restore to saved values instead of resetting to empty
    setOnlineSchedule(savedOnlineSchedule);
    setCheckedDays([...savedCheckedDays]);
    setAdvanceNotice(savedAdvanceNotice);
    setCancellationPolicy(savedCancellationPolicy);
    setShowBookingSettings(false);
    setIsEditMode(false);
  };

  return (
    <div className={styles.availabilityContainer}>
      <h2>Online Schedule</h2>
      
      <div className={styles.availabilityStepper}>
        <div className={styles.availabilityStepCircle}>1</div>
        <span className={styles.availabilityStepLabel}>
          {isEditMode ? 'Set your online appointment availability' : 'Your online appointment availability'}
        </span>
      </div>

      <div className={styles.availabilityToggleGroup}>
        <div className={styles.availabilityToggleLeft}>
          <button
            className={`${styles.toggleBtn}${onlineSchedule.enabled ? ` ${styles.active}` : ''}`}
            onClick={() => setOnlineSchedule(prev => ({ ...prev, enabled: true }))}
            type="button"
          >ENABLED</button>
          <button
            className={`${styles.toggleBtn}${!onlineSchedule.enabled ? ` ${styles.active}` : ''}`}
            onClick={() => setOnlineSchedule(prev => ({ ...prev, enabled: false }))}
            type="button"
          >DISABLED</button>
        </div>
        
        {/* Booking Settings Toggle Button - Moved to same level, far right */}
        <div className={styles.availabilityToggleRight}>
          <button
            type="button"
            className={styles.availabilityToggleSettingsBtn}
            onClick={() => setShowBookingSettings(!showBookingSettings)}
          >
            {showBookingSettings ? '−' : '+'} BOOKING SETTINGS
          </button>
        </div>
      </div>

      <div className={styles.availabilityScheduleSection}>
        {/* Days checkboxes */}
        <div className={styles.scheduleDays}>
          {DAYS.map(day => (
            <label key={day} className={styles.scheduleDayLabel}>
              <span>{day}</span>
              <input
                type="checkbox"
                checked={checkedDays.includes(day)}
                onChange={() => handleDayCheck(day)}
                disabled={!isEditMode}
              />
            </label>
          ))}
        </div>

        {/* Schedule details */}
        <div className={`${styles.scheduleDetails} custom-scrollbar`}>
          {/* Header labels */}
          <div className={`${styles.scheduleRow} ${styles.scheduleHeaderRow}`}>
            <div className={styles.scheduleRowLabel}></div>
            <label className={styles.scheduleLabel}>Start Time</label>
            <label className={styles.scheduleLabel}>End Time</label>
            <label className={styles.scheduleLabel}>Availability</label>
            <div style={{ width: 120 }}></div>
          </div>

          {/* Schedule rows for checked days */}
          {checkedDays
            .sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))
            .map(day => (
              <div key={day}>
                {onlineSchedule.schedule[day].slots.map((slot, slotIndex) => (
                  <div className={styles.scheduleRow} key={`${day}-${slotIndex}`}>
                    <div className={styles.scheduleRowLabel}>
                      {slotIndex === 0 ? DAY_LABELS[day] : ''}
                    </div>
                    <div className={styles.scheduleCell}>
                      <input 
                        type="time" 
                        className={styles.scheduleTimeInput}
                        value={slot.start}
                        onChange={(e) => handleTimeChange(day, slotIndex, 'start', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className={styles.scheduleCell}>
                      <input 
                        type="time" 
                        className={styles.scheduleTimeInput}
                        value={slot.end}
                        onChange={(e) => handleTimeChange(day, slotIndex, 'end', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className={styles.scheduleCell}>
                      <select 
                        value={slot.availability}
                        onChange={(e) => handleTimeChange(day, slotIndex, 'availability', e.target.value)}
                        disabled={!isEditMode}
                      >
                        <option value="appointments">Appointments</option>
                        <option value="follow-up">Follow up</option>
                      </select>
                    </div>
                    <div className={styles.scheduleCell}>
                      {isEditMode && (
                        <div className={styles.scheduleButtons}>
                          {onlineSchedule.schedule[day].slots.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSlot(day, slotIndex)}
                              className={`global-btn secondary ${styles.scheduleActionBtn}`}
                            >
                              Remove
                            </button>
                          )}
                          {slotIndex === onlineSchedule.schedule[day].slots.length - 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleAddNewSlot(day)}
                              className={`global-btn secondary ${styles.scheduleActionBtn}`}
                            >
                              Add New
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        {/* Edit/View Mode Toggle */}
        {!isEditMode && (
          <div className={styles.availabilityEditToggle}>
            <button
              type="button"
              className={styles.availabilityEditBtn}
              onClick={() => setIsEditMode(true)}
            >
              Edit Schedule
            </button>
          </div>
        )}

        {/* Save/Cancel Buttons - Only show in edit mode */}
        {isEditMode && (
          <div className={styles.availabilityActions}>
            <button
              type="button"
              className={styles.availabilityCancelBtn}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.availabilitySaveBtn}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Booking Settings Modal */}
      {showBookingSettings && (
        <div className={styles.availabilityModalOverlay} onClick={() => setShowBookingSettings(false)}>
          <div className={styles.availabilityModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.availabilityModalHeader}>
              <h3>Booking Settings</h3>
              <button 
                className={styles.availabilityModalClose}
                onClick={() => setShowBookingSettings(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.availabilityModalContent}>
              <div className={styles.availabilityForm}>
                <div className={styles.availabilityFields}>
                  <div className={styles.availabilityRow}>
                    <label className={styles.availabilityLabel}>
                      Advance Notice Required
                    </label>
                    <select
                      value={advanceNotice}
                      onChange={(e) => setAdvanceNotice(Number(e.target.value))}
                      className={styles.availabilityInput}
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={4}>4 hours</option>
                      <option value={12}>12 hours</option>
                      <option value={24}>24 hours</option>
                      <option value={48}>48 hours</option>
                    </select>
                  </div>

                  <div className={styles.availabilityRow}>
                    <label className={styles.availabilityLabel}>
                      Cancellation Policy
                    </label>
                    <select
                      value={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(Number(e.target.value))}
                      className={styles.availabilityInput}
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={4}>4 hours</option>
                      <option value={12}>12 hours</option>
                      <option value={24}>24 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.availabilityModalFooter}>
              <button
                type="button"
                className={`${styles.availabilityModalBtn} ${styles.availabilityModalCancel}`}
                onClick={() => setShowBookingSettings(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`${styles.availabilityModalBtn} ${styles.availabilityModalSave}`}
                onClick={() => setShowBookingSettings(false)}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availability; 