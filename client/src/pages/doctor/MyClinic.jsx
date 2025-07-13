import React, { useState } from 'react';
import './MyClinic.css';

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

  const handleInputChange = (e) => {
    setClinic({ ...clinic, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setClinic({ ...clinic, image: e.target.files[0] });
  };

  const handleAddClinic = (e) => {
    e.preventDefault();
    setClinics([
      ...clinics,
      {
        id: Date.now(),
        name: clinic.name,
        address: `${clinic.city}, ${clinic.region}`,
        image: clinic.image,
        isHospital: clinic.isHospital,
      },
    ]);
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
    setShowAddForm(false);
  };

  const handleDeleteClinic = (id) => {
    setClinics(clinics.filter(c => c.id !== id));
    setShowDeleteId(null);
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
    {/* Confirmation Dialog: Only show when remove button is clicked */}
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
          {/* Add Clinic Card */}
          <div className="card add-clinic-card" onClick={() => setShowAddForm(true)}>
            <div className="add-clinic-content">
              <span className="add-clinic-plus">+</span>
              <div>Add Clinic</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Clinic Form */}
      {showAddForm && (
  <div className="myclinic-container">
    <h2>Add New Physical Clinic</h2>
    <div className="myclinic-stepper">
      <div className="myclinic-step-circle">1</div>
      <span className="myclinic-step-label">Is this clinic in a hospital?</span>
    </div>
    <div className="myclinic-toggle-group">
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
        {/* Next Button: same level as city/zipcode row */}
        <div className="myclinic-row" style={{ justifyContent: 'flex-end', marginTop: 0 }}>
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
  </div>
)}
    </div>
  );
}

export default MyClinic;