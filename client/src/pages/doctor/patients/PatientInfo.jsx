import React from 'react';

const PatientInfo = ({ selectedPatient }) => {
  return (
    <div className="patient-info-container">
      <div className="patient-info-fields">
        <div className="info-row">
          <span className="info-label">FIRST NAME</span>
          <span className="info-value">{selectedPatient.firstName || 'Juan'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">LAST NAME</span>
          <span className="info-value">{selectedPatient.lastName || 'Cruz'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">MIDDLE NAME</span>
          <span className="info-value">{selectedPatient.middleName || 'Dela'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">SUFFIX</span>
          <span className="info-value">{selectedPatient.suffix || ''}</span>
        </div>
        <div className="info-row">
          <span className="info-label">NICKNAME</span>
          <span className="info-value">{selectedPatient.nickname || ''}</span>
        </div>
        <div className="info-row">
          <span className="info-label">DATE OF BIRTH</span>
          <span className="info-value">{selectedPatient.dob || ''}</span>
        </div>
        <div className="info-row">
          <span className="info-label">SEX</span>
          <div className="info-tags-group">
            <span className={`info-tag ${selectedPatient.sex === 'Male' ? 'active' : 'inactive'}`}>
              Male
            </span>
            <span className={`info-tag ${selectedPatient.sex === 'Female' ? 'active' : 'inactive'}`}>
              Female
            </span>
          </div>
        </div>
        <div className="info-row">
          <span className="info-label">BLOOD TYPE</span>
          <div className="info-tags-group blood-type">
            <span className={`info-tag ${selectedPatient.bloodType === 'A+' ? 'active' : 'inactive'}`}>A+</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'A-' ? 'active' : 'inactive'}`}>A-</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'B+' ? 'active' : 'inactive'}`}>B+</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'B-' ? 'active' : 'inactive'}`}>B-</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'AB+' ? 'active' : 'inactive'}`}>AB+</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'AB-' ? 'active' : 'inactive'}`}>AB-</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'O+' ? 'active' : 'inactive'}`}>O+</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'O-' ? 'active' : 'inactive'}`}>O-</span>
            <span className={`info-tag ${selectedPatient.bloodType === 'NA' ? 'active' : 'inactive'}`}>NA</span>
          </div>
        </div>
        <div className="info-row">
          <span className="info-label">CIVIL STATUS</span>
          <div className="info-tags-group">
            <span className={`info-tag ${selectedPatient.civilStatus === 'Single' ? 'active' : 'inactive'}`}>Single</span>
            <span className={`info-tag ${selectedPatient.civilStatus === 'Married' ? 'active' : 'inactive'}`}>Married</span>
            <span className={`info-tag ${selectedPatient.civilStatus === 'Separated' ? 'active' : 'inactive'}`}>Separated</span>
            <span className={`info-tag ${selectedPatient.civilStatus === 'Widowed' ? 'active' : 'inactive'}`}>Widowed</span>
          </div>
        </div>
        <div className="info-row">
          <span className="info-label">PHIL HEALTH NO.</span>
          <span className="info-value">{selectedPatient.philhealth || ''}</span>
        </div>
        <div className="info-row">
          <span className="info-label">PATIENT TAGS</span>
          <select className="info-value patient-tags-select">
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="info-row">
          <span className="info-label">EMAIL</span>
          <span className="info-value">{selectedPatient.email || ''}</span>
        </div>
        <div className="info-row">
          <span className="info-label">PRIMARY MOBILE</span>
          <span className="info-value">{selectedPatient.mobile || ''}</span>
        </div>
      </div>
      
      <div className="patient-info-profile">
        <img
          src={
            selectedPatient.profilePic ||
            `https://ui-avatars.com/api/?name=${selectedPatient.firstName || 'Juan'}+${selectedPatient.lastName || 'Cruz'}&background=034172&color=fff&size=100`
          }
          alt="Profile"
          className="profile-pic"
        />
        <p><strong>ID:</strong> {selectedPatient.id || '123456'}</p>
      </div>
    </div>
  );
};

export default PatientInfo; 