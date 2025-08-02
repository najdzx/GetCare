import React, { useState, useEffect } from 'react';
import styles from './MyClinic.module.css';
import '../../../components/Layout/Button.css';
import '../../../components/Layout/Scrollbar.css';

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

function MyClinic() {
  const [clinics, setClinics] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState(null);
  const [clinic, setClinic] = useState({
    name: '',
    accreditation: '',
    room: '',
    address: '',
    region: '',
    city: '',
    zip: '',
    image: null,
    isHospital: false,
  });
  const [step, setStep] = useState(1);

  // Track checked days for schedule
  const [checkedDays, setCheckedDays] = useState([]);

  // Track schedule slots for each day
  const [scheduleSlots, setScheduleSlots] = useState({
    MON: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
    TUE: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
    WED: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
    THU: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
    FRI: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
    SAT: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
    SUN: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
  });

  const handleInputChange = (e) => {
    setClinic({ ...clinic, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setClinic({ ...clinic, image: e.target.files[0] });
  };

  const handleAddClinic = (e) => {
    e.preventDefault();
    setStep(2); // Move to schedule step
  };

  const handleDeleteClinic = (id) => {
    setClinics(clinics.filter(c => c.id !== id));
    setShowDeleteId(null);
  };

  // Handle schedule day checkbox
  const handleDayCheck = (day) => {
    setCheckedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  // Handle schedule slot changes
  const handleSlotChange = (day, slotIndex, field, value) => {
    setScheduleSlots(prev => ({
      ...prev,
      [day]: prev[day].map((slot, index) => 
        index === slotIndex 
          ? { ...slot, [field]: value }
          : slot
      )
    }));
  };

  // Handle adding new slot
  const handleAddNewSlot = (day) => {
    setScheduleSlots(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }]
    }));
  };

  // Handle removing slot
  const handleRemoveSlot = (day, slotIndex) => {
    setScheduleSlots(prev => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== slotIndex)
    }));
  };


  return (
    <div>
      {/* Clinic Cards Grid */}
      {!showAddForm && (
        <div className={`${styles.dashboardGrid} ${styles.clinicGrid}`}>
          {clinics.map((c) => (
            <div
              key={c.id}
              className={`${styles.card} ${styles.clinicCard}`}
              onMouseLeave={() => setShowDeleteId(null)}
            >
              <button
                className={styles.clinicRemoveBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteId(c.id);
                }}
                tabIndex={-1}
              >
                ×
              </button>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  {c.image ? (
                    <span className={styles.clinicCardImg}>
                      <img src={URL.createObjectURL(c.image)} alt="Clinic" />
                    </span>
                  ) : (
                    <span role="img" aria-label="clinic" className={styles.clinicCardIcon}>🏥</span>
                  )}
                  <h3>{c.name}</h3>
                </div>
              </div>
              <div className={styles.clinicCardDetails}>
                <div className={styles.clinicCardAddress}>{c.address}</div>
                <div className={styles.clinicCardType}>{c.isHospital ? 'Hospital' : 'Clinic'}</div>
              </div>
              {showDeleteId === c.id && (
                <div className={styles.clinicDeleteDialog}>
                  <div>Are you sure you want to delete this clinic?</div>
                  <div className={styles.clinicDeleteActions}>
                    <button
                      className="global-btn danger"
                      onClick={() => handleDeleteClinic(c.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="global-btn secondary"
                      onClick={() => setShowDeleteId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className={`${styles.card} ${styles.addClinicCard}`} onClick={() => { setShowAddForm(true); setStep(1); }}>
            <div className={styles.addClinicContent}>
              <span className={styles.addClinicPlus}>+</span>
              <div>Add Clinic</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Clinic Form & Schedule Step */}
      {showAddForm && (
        <div className={styles.myclinicContainer}>
          {step === 1 && (
            <>
              <h2>Add New Physical Clinic</h2>
              <div className={styles.myclinicStepper}>
                <div className={styles.myclinicStepCircle}>1</div>
                <span className={styles.myclinicStepLabel}>Is this clinic in a hospital?</span>
              </div>
              <div className={styles.myclinicToggleGroup}>
                <button
                  className={`toggleBtn${clinic.isHospital ? ' toggleBtnActive' : ''}`}
                  onClick={() => setClinic({ ...clinic, isHospital: true })}
                  type="button"
                >YES</button>
                <button
                  className={`toggleBtn${!clinic.isHospital ? ' toggleBtnActive' : ''}`}
                  onClick={() => setClinic({ ...clinic, isHospital: false })}
                  type="button"
                >NO</button>
              </div>
              <form className={styles.myclinicForm} onSubmit={handleAddClinic}>
                <div className={styles.myclinicFields}>
                  <div className={styles.myclinicRow}>
                    <label className={styles.myclinicLabel}>
                      Clinic Name<span className={styles.required}>*</span>
                    </label>
                    <input
                      name="name"
                      value={clinic.name}
                      onChange={handleInputChange}
                      required
                      className={styles.myclinicInput}
                    />
                  </div>
                  <div className={styles.myclinicRow}>
                    <label className={styles.myclinicLabel}>
                      Accreditation No.
                    </label>
                    <input
                      name="accreditation"
                      value={clinic.accreditation}
                      onChange={handleInputChange}
                      className={styles.myclinicInput}
                      placeholder="For PhilHealth Claim Forms"
                    />
                  </div>
                  <div className={styles.myclinicRow}>
                    <label className={styles.myclinicLabel}>
                      Room/Wing/Bldg.
                    </label>
                    <input
                      name="room"
                      value={clinic.room}
                      onChange={handleInputChange}
                      className={styles.myclinicInput}
                    />
                  </div>
                  <div className={styles.myclinicRow}>
                    <label className={styles.myclinicLabel}>
                      Address<span className={styles.required}>*</span>
                    </label>
                    <input
                      name="address"
                      value={clinic.address}
                      onChange={handleInputChange}
                      required
                      className={styles.myclinicInput}
                    />
                  </div>
                  <div className={styles.myclinicRow}>
                    <label className={styles.myclinicLabel}>
                      Region<span className={styles.required}>*</span>
                    </label>
                    <select
                      name="region"
                      value={clinic.region}
                      onChange={handleInputChange}
                      required
                      className={styles.myclinicInput}
                    >
                      <option key="region" value="">Select Region</option>
                      <option key="ncr" value="National Capital Region (NCR)">National Capital Region (NCR)</option>
                      {/* Add more regions as needed */}
                    </select>
                  </div>
                  <div className={styles.myclinicRow}>
                    <label className={styles.myclinicLabel}>
                      City<span className={styles.required}>*</span>
                    </label>
                    <select
                      name="city"
                      value={clinic.city}
                      onChange={handleInputChange}
                      required
                      className={styles.myclinicInput}
                      style={{ marginRight: 12, width: '50%' }}
                    >
                      <option key="city" value="">Select City</option>
                      <option key="makati" value="Makati">Makati</option>
                      {/* Add more cities as needed */}
                    </select>
                    <label className={styles.myclinicLabel} style={{ marginLeft: 12 }}>
                      ZIP Code
                    </label>
                    <input
                      name="zip"
                      value={clinic.zip}
                      onChange={handleInputChange}
                      className={styles.myclinicInput}
                      style={{ width: '30%' }}
                    />
                  </div>
                  <div className={styles.myclinicRow} style={{ justifyContent: 'flex-end', marginTop: 0, gap: 16 }}>
                    <button
                      type="button"
                      className="global-btn secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setStep(1);
                        setClinic({
                          name: '',
                          accreditation: '',
                          room: '',
                          address: '',
                          region: '',
                          city: '',
                          zip: '',
                          image: null,
                          isHospital: false,
                        });
                        setCheckedDays([]);
                        setScheduleSlots({
                          MON: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                          TUE: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                          WED: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                          THU: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                          FRI: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                          SAT: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                          SUN: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="global-btn secondary">
                      Next
                    </button>
                  </div>
                </div>
                <div className={styles.myclinicImageSection}>
                  <div style={{ textAlign: 'center', marginBottom: 6, fontWeight: 600, color: '#555', fontSize: 15 }}>
                    Display Image
                  </div>
                  <div className={styles.myclinicImagePreview}>
                    {clinic.image ? (
                      <img
                        src={URL.createObjectURL(clinic.image)}
                        alt="Clinic"
                        className={styles.myclinicImg}
                      />
                    ) : (
                      <div className={styles.myclinicImgPlaceholder}>
                        <span role="img" aria-label="clinic" style={{ fontSize: 48 }}>🏥</span>
                      </div>
                    )}
                  </div>
                  <label className={styles.myclinicImgUpload}>
                    UPDATE IMAGE
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <div className={styles.myclinicScheduleSection}>
              <h3>What's your schedule?</h3>
              {/* Days checkboxes */}
              <div className={styles.scheduleDays}>
                {DAYS.map(day => (
                  <label key={day} className={styles.scheduleDayLabel}>
                    <span className={styles.scheduleDayLabelSpan}>{day}</span>
                    <input
                      type="checkbox"
                      checked={checkedDays.includes(day)}
                      onChange={() => handleDayCheck(day)}
                      className={styles.scheduleDaysInputCheckbox}
                    />
                  </label>
                ))}
              </div>
              {/* Only show schedule rows for checked days */}
              <div className={`${styles.scheduleDetails} custom-scrollbar`}>
                {/* Header labels */}
                <div className={`${styles.scheduleRow} ${styles.scheduleHeaderRow}`}>
                  <div className={styles.scheduleRowLabel}></div>
                  <label className={styles.scheduleLabel}>Start Time</label>
                  <label className={styles.scheduleLabel}>End Time</label>
                  <label className={styles.scheduleLabel}>Availability</label>
                  <label className={styles.scheduleLabel}>Schedule Notes</label>
                  <div style={{ width: 120 }}></div>
                </div>
                {checkedDays
                  .sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))
                  .map(day => (
                      <div key={day}>
                        {scheduleSlots[day].map((slot, slotIndex) => (
                          <div className={styles.scheduleRow} key={`${day}-${slotIndex}`}>
                            <div className={styles.scheduleRowLabel}>
                              {slotIndex === 0 ? DAY_LABELS[day] : ''}
                            </div>
                      <div className="schedule-cell">
                              <input 
                                type="time" 
                                className={styles.scheduleRowInput}
                                value={slot.start}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'start', e.target.value)}
                              />
                      </div>
                      <div className="schedule-cell">
                              <input 
                                type="time" 
                                className={styles.scheduleRowInput}
                                value={slot.end}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'end', e.target.value)}
                              />
                      </div>
                      <div className="schedule-cell">
                              <select
                                className={styles.scheduleRowSelect}
                                value={slot.availability}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'availability', e.target.value)}
                              >
                          <option>Appointments only</option>
                          <option>Appointments & Walk-ins</option>
                        </select>
                      </div>
                      <div className="schedule-cell">
                              <input 
                                className={styles.scheduleRowInput}
                                placeholder="Ex. For Follow-ups schedule here"
                                value={slot.notes}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'notes', e.target.value)}
                              />
                      </div>
                      <div className="schedule-cell">
                              <div className={styles.scheduleButtons}>
                                {scheduleSlots[day].length > 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => handleRemoveSlot(day, slotIndex)}
                                    className="global-btn danger small"
                                  >
                                    Remove
                                  </button>
                                )}
                                {slotIndex === scheduleSlots[day].length - 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => handleAddNewSlot(day)}
                                    className="global-btn secondary small"
                                  >
                                    ADD NEW
                                  </button>
                                )}
                              </div>
                      </div>
                    </div>
                  ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.myclinicActions}>
                <button
                  type="button"
                  className="global-btn secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="global-btn primary"
                  onClick={() => {
                    setClinics([...clinics, { ...clinic, id: Date.now() }]);
                    setShowAddForm(false);
                    setStep(1);
                    setClinic({
                      name: '',
                      accreditation: '',
                      room: '',
                      address: '',
                      region: '',
                      city: '',
                      zip: '',
                      image: null,
                      isHospital: false,
                    });
                    setCheckedDays([]);
                    setScheduleSlots({
                      MON: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                      TUE: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                      WED: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                      THU: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                      FRI: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                      SAT: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                      SUN: [{ start: '09:00', end: '17:00', availability: 'Appointments only', notes: '' }],
                    });
                  }}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MyClinic;