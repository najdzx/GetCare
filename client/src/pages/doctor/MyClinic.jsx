import React, { useState } from 'react';
import './MyClinic.css';

function MyClinic() {
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

  const handleInputChange = (e) => {
    setClinic({ ...clinic, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setClinic({ ...clinic, image: e.target.files[0] });
  };

  return (
    <div className="myclinic-container">
      <h2>Add New Physical Clinic</h2>
      <div className="myclinic-stepper" style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
        <div className="myclinic-step-circle">1</div>
        <span className="myclinic-step-label">Is this clinic in a hospital?</span>
      </div>
      <div className="myclinic-toggle-group" style={{ marginBottom: 32 }}>
        <button
          className={clinic.isHospital ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setClinic({ ...clinic, isHospital: true })}
          type="button"
        >YES</button>
        <button
          className={!clinic.isHospital ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setClinic({ ...clinic, isHospital: false })}
          type="button"
        >NO</button>
      </div>
      <form className="myclinic-form">
        <div className="myclinic-fields">
          <label>
            Clinic Name<span className="required">*</span>
            <input
              name="name"
              value={clinic.name}
              onChange={handleInputChange}
              required
              className="myclinic-input"
            />
          </label>
          <label>
            Accreditation No.
            <input
              name="accreditation"
              value={clinic.accreditation}
              onChange={handleInputChange}
              className="myclinic-input"
            />
          </label>
          <label>
            Room/Wing/Bldg.
            <input
              name="room"
              value={clinic.room}
              onChange={handleInputChange}
              className="myclinic-input"
            />
          </label>
          <label>
            Address<span className="required">*</span>
            <input
              name="address"
              value={clinic.address}
              onChange={handleInputChange}
              required
              className="myclinic-input"
            />
          </label>
          <label>
            Region<span className="required">*</span>
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
          </label>
          <label>
            City<span className="required">*</span>
            <select
              name="city"
              value={clinic.city}
              onChange={handleInputChange}
              required
              className="myclinic-input"
            >
              <option key="city" value="">Select City</option>
              <option key="makati" value="Makati">Makati</option>
              {/* Add more cities as needed */}
            </select>
          </label>
          <label>
            ZIP Code
            <input
              name="zip"
              value={clinic.zip}
              onChange={handleInputChange}
              className="myclinic-input"
            />
          </label>
        </div>
        <div className="myclinic-image-section">
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
    </div>
  );
}

export default MyClinic;