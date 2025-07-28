import React, { useState, useEffect } from 'react';
import './MyClinic.css';

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
        <div className="dashboard-grid clinic-grid">
          {clinics.map((c) => (
            <div
              key={c.id}
              className="card clinic-card"
              onMouseLeave={() => setShowDeleteId(null)}
            >
              <button
                className="clinic-remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteId(c.id);
                }}
                tabIndex={-1}
              >
                ×
              </button>
              <div className="card-header">
                <div className="card-title">
                  {c.image ? (
                    <span className="clinic-card-img">
                      <img src={URL.createObjectURL(c.image)} alt="Clinic" />
                    </span>
                  ) : (
                    <span role="img" aria-label="clinic" className="clinic-card-icon">🏥</span>
                  )}
                  <h3>{c.name}</h3>
                </div>
              </div>
              <div className="clinic-card-details">
                <div className="clinic-card-address">{c.address}</div>
                <div className="clinic-card-type">{c.isHospital ? 'Hospital' : 'Clinic'}</div>
              </div>
              {showDeleteId === c.id && (
                <div className="clinic-delete-dialog">
                  <div>Are you sure you want to delete this clinic?</div>
                  <div className="clinic-delete-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClinic(c.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setShowDeleteId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="card add-clinic-card" onClick={() => { setShowAddForm(true); setStep(1); }}>
            <div className="add-clinic-content">
              <span className="add-clinic-plus">+</span>
              <div>Add Clinic</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Clinic Form & Schedule Step */}
      {showAddForm && (
        <div className="myclinic-container">
          {step === 1 && (
            <>
              <h2>Add New Physical Clinic</h2>
              <div className="myclinic-stepper">
                <div className="myclinic-step-circle">1</div>
                <span className="myclinic-step-label">Is this clinic in a hospital?</span>
              </div>
              <div className="myclinic-toggle-group">
                <button
                  className={`toggle-btn${clinic.isHospital ? ' active' : ''}`}
                  onClick={() => setClinic({ ...clinic, isHospital: true })}
                  type="button"
                >YES</button>
                <button
                  className={`toggle-btn${!clinic.isHospital ? ' active' : ''}`}
                  onClick={() => setClinic({ ...clinic, isHospital: false })}
                  type="button"
                >NO</button>
              </div>
              <form className="myclinic-form" onSubmit={handleAddClinic}>
                <div className="myclinic-fields">
                  <div className="myclinic-row">
                    <label className="myclinic-label">
                      Clinic Name<span className="required">*</span>
                    </label>
                    <input
                      name="name"
                      value={clinic.name}
                      onChange={handleInputChange}
                      required
                      className="myclinic-input"
                    />
                  </div>
                  <div className="myclinic-row">
                    <label className="myclinic-label">
                      Accreditation No.
                    </label>
                    <input
                      name="accreditation"
                      value={clinic.accreditation}
                      onChange={handleInputChange}
                      className="myclinic-input"
                      placeholder="For PhilHealth Claim Forms"
                    />
                  </div>
                  <div className="myclinic-row">
                    <label className="myclinic-label">
                      Room/Wing/Bldg.
                    </label>
                    <input
                      name="room"
                      value={clinic.room}
                      onChange={handleInputChange}
                      className="myclinic-input"
                    />
                  </div>
                  <div className="myclinic-row">
                    <label className="myclinic-label">
                      Address<span className="required">*</span>
                    </label>
                    <input
                      name="address"
                      value={clinic.address}
                      onChange={handleInputChange}
                      required
                      className="myclinic-input"
                    />
                  </div>
                  <div className="myclinic-row">
                    <label className="myclinic-label">
                      Region<span className="required">*</span>
                    </label>
                    <select
                      name="region"
                      value={clinic.region}
                      onChange={handleInputChange}
                      required
                      className="myclinic-input"
                    >
                      <option key="region" value="">Select Region</option>
                      <option key="ncr" value="National Capital Region (NCR)">National Capital Region (NCR)</option>
                      {/* Add more regions as needed */}
                    </select>
                  </div>
                  <div className="myclinic-row">
                    <label className="myclinic-label">
                      City<span className="required">*</span>
                    </label>
                    <select
                      name="city"
                      value={clinic.city}
                      onChange={handleInputChange}
                      required
                      className="myclinic-input"
                      style={{ marginRight: 12, width: '50%' }}
                    >
                      <option key="city" value="">Select City</option>
                      <option key="makati" value="Makati">Makati</option>
                      {/* Add more cities as needed */}
                    </select>
                    <label className="myclinic-label" style={{ marginLeft: 12 }}>
                      ZIP Code
                    </label>
                    <input
                      name="zip"
                      value={clinic.zip}
                      onChange={handleInputChange}
                      className="myclinic-input"
                      style={{ width: '30%' }}
                    />
                  </div>
                  <div className="myclinic-row" style={{ justifyContent: 'flex-end', marginTop: 0, gap: 16 }}>
                    <button
                      type="button"
                      className="cancel-btn"
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
                    <button type="submit" className="next-clinic-btn">
                      Next
                    </button>
                  </div>
                </div>
                <div className="myclinic-image-section">
                  <div style={{ textAlign: 'center', marginBottom: 6, fontWeight: 600, color: '#555', fontSize: 15 }}>
                    Display Image
                  </div>
                  <div className="myclinic-image-preview">
                    {clinic.image ? (
                      <img
                        src={URL.createObjectURL(clinic.image)}
                        alt="Clinic"
                        className="myclinic-img"
                      />
                    ) : (
                      <div className="myclinic-img-placeholder">
                        <span role="img" aria-label="clinic" style={{ fontSize: 48 }}>🏥</span>
                      </div>
                    )}
                  </div>
                  <label className="myclinic-img-upload">
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
            <div className="myclinic-schedule-section">
              <h3>What's your schedule?</h3>
              {/* Days checkboxes */}
              <div className="schedule-days">
                {DAYS.map(day => (
                  <label key={day} className="schedule-day-label">
                    <span>{day}</span>
                    <input
                      type="checkbox"
                      checked={checkedDays.includes(day)}
                      onChange={() => handleDayCheck(day)}
                    />
                  </label>
                ))}
              </div>
              {/* Only show schedule rows for checked days */}
              <div className="schedule-details">
                {/* Header labels */}
                <div className={`schedule-row schedule-header-row`}>
                  <div className="schedule-row-label"></div>
                  <label className="schedule-label">Start Time</label>
                  <label className="schedule-label">End Time</label>
                  <label className="schedule-label">Availability</label>
                  <label className="schedule-label">Schedule Notes</label>
                  <div style={{ width: 120 }}></div>
                </div>
                {checkedDays
                  .sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))
                  .map(day => (
                      <div key={day}>
                        {scheduleSlots[day].map((slot, slotIndex) => (
                          <div className="schedule-row" key={`${day}-${slotIndex}`}>
                            <div className="schedule-row-label">
                              {slotIndex === 0 ? DAY_LABELS[day] : ''}
                            </div>
                      <div className="schedule-cell">
                              <input 
                                type="time" 
                                className="schedule-time-input"
                                value={slot.start}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'start', e.target.value)}
                              />
                      </div>
                      <div className="schedule-cell">
                              <input 
                                type="time" 
                                className="schedule-time-input"
                                value={slot.end}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'end', e.target.value)}
                              />
                      </div>
                      <div className="schedule-cell">
                              <select
                                value={slot.availability}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'availability', e.target.value)}
                              >
                          <option>Appointments only</option>
                          <option>Appointments & Walk-ins</option>
                        </select>
                      </div>
                      <div className="schedule-cell">
                              <input 
                                placeholder="Ex. For Follow-ups schedule here"
                                value={slot.notes}
                                onChange={(e) => handleSlotChange(day, slotIndex, 'notes', e.target.value)}
                              />
                      </div>
                      <div className="schedule-cell">
                              <div className="schedule-buttons">
                                {scheduleSlots[day].length > 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => handleRemoveSlot(day, slotIndex)}
                                    className="remove-slot-btn"
                                  >
                                    Remove
                                  </button>
                                )}
                                {slotIndex === scheduleSlots[day].length - 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => handleAddNewSlot(day)}
                                  >
                                    + ADD NEW
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
              <div className="myclinic-actions">
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="save-btn"
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