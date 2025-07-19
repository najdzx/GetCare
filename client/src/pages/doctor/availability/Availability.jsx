import React, { useState } from 'react';
import './Availability.css';

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
    <div className="availability-container">
      <h2>Online Schedule</h2>
      
      <div className="availability-stepper">
        <div className="availability-step-circle">1</div>
        <span className="availability-step-label">
          {isEditMode ? 'Set your online appointment availability' : 'Your online appointment availability'}
        </span>
      </div>

      <div className="availability-toggle-group">
        <div className="availability-toggle-left">
          <button
            className={`toggle-btn${onlineSchedule.enabled ? ' active' : ''}`}
            onClick={() => setOnlineSchedule(prev => ({ ...prev, enabled: true }))}
            type="button"
          >ENABLED</button>
          <button
            className={`toggle-btn${!onlineSchedule.enabled ? ' active' : ''}`}
            onClick={() => setOnlineSchedule(prev => ({ ...prev, enabled: false }))}
            type="button"
          >DISABLED</button>
        </div>
        
        {/* Booking Settings Toggle Button - Moved to same level, far right */}
        <div className="availability-toggle-right">
          <button
            type="button"
            className="availability-toggle-settings-btn"
            onClick={() => setShowBookingSettings(!showBookingSettings)}
          >
            {showBookingSettings ? '−' : '+'} BOOKING SETTINGS
          </button>
        </div>
      </div>

      <div className="availability-schedule-section">
        {/* Days checkboxes */}
        <div className="schedule-days">
          {DAYS.map(day => (
            <label key={day} className="schedule-day-label">
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
        <div className="schedule-details">
          {/* Header labels */}
          <div className="schedule-row schedule-header-row">
            <div className="schedule-row-label"></div>
            <label className="schedule-label">Start Time</label>
            <label className="schedule-label">End Time</label>
            <label className="schedule-label">Availability</label>
            <div style={{ width: 120 }}></div>
          </div>

          {/* Schedule rows for checked days */}
          {checkedDays
            .sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))
            .map(day => (
              <div key={day}>
                {onlineSchedule.schedule[day].slots.map((slot, slotIndex) => (
                  <div className="schedule-row" key={`${day}-${slotIndex}`}>
                    <div className="schedule-row-label">
                      {slotIndex === 0 ? DAY_LABELS[day] : ''}
                    </div>
                    <div className="schedule-cell">
                      <input 
                        type="time" 
                        className="schedule-time-input"
                        value={slot.start}
                        onChange={(e) => handleTimeChange(day, slotIndex, 'start', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="schedule-cell">
                      <input 
                        type="time" 
                        className="schedule-time-input"
                        value={slot.end}
                        onChange={(e) => handleTimeChange(day, slotIndex, 'end', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="schedule-cell">
                      <select 
                        value={slot.availability}
                        onChange={(e) => handleTimeChange(day, slotIndex, 'availability', e.target.value)}
                        disabled={!isEditMode}
                      >
                        <option value="appointments">Appointments</option>
                        <option value="follow-up">Follow up</option>
                      </select>
                    </div>
                    <div className="schedule-cell">
                      {isEditMode && (
                        <div className="schedule-buttons">
                          {onlineSchedule.schedule[day].slots.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSlot(day, slotIndex)}
                              className="remove-slot-btn"
                            >
                              Remove
                            </button>
                          )}
                          {slotIndex === onlineSchedule.schedule[day].slots.length - 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleAddNewSlot(day)}
                            >
                              + ADD NEW
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
          <div className="availability-edit-toggle">
            <button
              type="button"
              className="availability-edit-btn"
              onClick={() => setIsEditMode(true)}
            >
              Edit Schedule
            </button>
          </div>
        )}

        {/* Save/Cancel Buttons - Only show in edit mode */}
        {isEditMode && (
          <div className="availability-actions">
            <button
              type="button"
              className="availability-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="availability-save-btn"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Booking Settings Modal */}
      {showBookingSettings && (
        <div className="availability-modal-overlay" onClick={() => setShowBookingSettings(false)}>
          <div className="availability-modal" onClick={(e) => e.stopPropagation()}>
            <div className="availability-modal-header">
              <h3>Booking Settings</h3>
              <button 
                className="availability-modal-close"
                onClick={() => setShowBookingSettings(false)}
              >
                ×
              </button>
            </div>
            <div className="availability-modal-content">
              <div className="availability-form">
                <div className="availability-fields">
                  <div className="availability-row">
                    <label className="availability-label">
                      Advance Notice Required
                    </label>
                    <select
                      value={advanceNotice}
                      onChange={(e) => setAdvanceNotice(Number(e.target.value))}
                      className="availability-input"
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={4}>4 hours</option>
                      <option value={12}>12 hours</option>
                      <option value={24}>24 hours</option>
                      <option value={48}>48 hours</option>
                    </select>
                  </div>

                  <div className="availability-row">
                    <label className="availability-label">
                      Cancellation Policy
                    </label>
                    <select
                      value={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(Number(e.target.value))}
                      className="availability-input"
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
            <div className="availability-modal-footer">
              <button
                type="button"
                className="availability-modal-btn availability-modal-cancel"
                onClick={() => setShowBookingSettings(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="availability-modal-btn availability-modal-save"
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