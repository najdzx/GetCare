import React from 'react';
import styles from './Doctors.module.css';

const OnlineAvailability = ({
  onlineDaysChecked,
  setOnlineDaysChecked,
  isEditModeOnline,
  setIsEditModeOnline,
  onlineScheduleSlots,
  handleOnlineDayChange,
  handleOnlineSlotChange,
  handleAddNewOnlineSlot,
  handleRemoveOnlineSlot
}) => {
  return (
    <div className={styles.availabilityTabContent}>
      <div className={styles.availabilityScheduleSection}>
        {/* Days checkboxes and Edit button in the same row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div className={styles.scheduleDays} style={{ marginBottom: 0 }}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <label key={day} className={styles.scheduleDayLabel}>
                <span>{day.slice(0,3).toUpperCase()}</span>
                <input
                  type="checkbox"
                  checked={onlineDaysChecked[day]}
                  onChange={() => isEditModeOnline && handleOnlineDayChange(day)}
                  disabled={!isEditModeOnline}
                />
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {!isEditModeOnline && (
              <button
                type="button"
                className="global-btn secondary"
                onClick={() => setIsEditModeOnline(true)}
                style={{ marginLeft: 16 }}
              >
                Edit
              </button>
            )}
            {isEditModeOnline && (
              <>
                <button
                  type="button"
                  className="global-btn secondary"
                  style={{ marginLeft: 16 }}
                  onClick={() => setIsEditModeOnline(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="global-btn"
                  style={{ marginLeft: 8 }}
                  // TODO: Implement save logic
                  onClick={() => setIsEditModeOnline(false)}
                >
                  Save
                </button>
              </>
            )}
          </div>
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
                        onChange={(e) => isEditModeOnline && handleOnlineSlotChange(day, slotIndex, 'start', e.target.value)}
                        disabled={!isEditModeOnline}
                      />
                    </div>
                    <div className={styles.scheduleCell}>
                      <input 
                        type="time" 
                        className={styles.scheduleTimeInput}
                        value={slot.end}
                        onChange={(e) => isEditModeOnline && handleOnlineSlotChange(day, slotIndex, 'end', e.target.value)}
                        disabled={!isEditModeOnline}
                      />
                    </div>
                    <div className={styles.scheduleCell}>
                      <select 
                        value={slot.availability}
                        onChange={(e) => isEditModeOnline && handleOnlineSlotChange(day, slotIndex, 'availability', e.target.value)}
                        disabled={!isEditModeOnline}
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
                        onChange={(e) => isEditModeOnline && handleOnlineSlotChange(day, slotIndex, 'notes', e.target.value)}
                        disabled={!isEditModeOnline}
                      />
                    </div>
                    <div className={styles.scheduleCell}>
                      <div className={styles.scheduleButtons}>
                        {isEditModeOnline && onlineScheduleSlots[day]?.length > 1 && (
                          <button 
                            type="button" 
                            className="global-btn secondary"
                            onClick={() => handleRemoveOnlineSlot(day, slotIndex)}
                          >
                            Remove
                          </button>
                        )}
                        {isEditModeOnline && slotIndex === onlineScheduleSlots[day]?.length - 1 && (
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
  );
};

export default OnlineAvailability;
