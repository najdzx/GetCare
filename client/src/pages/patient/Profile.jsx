import React from 'react';
import './Profile.css';

const patient = {
  firstName: 'Juan',
  lastName: 'Cruz',
  middleName: 'Dela',
  suffix: '',
  nickname: '',
  dob: '1990-01-01',
  sex: 'Male',
  bloodType: 'O+',
  civilStatus: 'Single',
  philhealth: '1234-5678-9012',
  email: 'juan.cruz@email.com',
  mobile: '09171234567',
  profilePic: '',
  id: '123456',
};

const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-','NA'];
const civilStatuses = ['Single','Married','Separated','Widowed'];

const Profile = () => {
  return (
    <div className="patient-profile-outer-container">
      <div className="patient-profile-wrapper">
        <div className="patient-profile-container">
          <div className="patient-profile-info-container">
            <div className="patient-profile-info-fields">
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">FIRST NAME</span>
                <span className="patient-profile-info-value">{patient.firstName}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">LAST NAME</span>
                <span className="patient-profile-info-value">{patient.lastName}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">MIDDLE NAME</span>
                <span className="patient-profile-info-value">{patient.middleName}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">SUFFIX</span>
                <span className="patient-profile-info-value">{patient.suffix}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">NICKNAME</span>
                <span className="patient-profile-info-value">{patient.nickname}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">DATE OF BIRTH</span>
                <span className="patient-profile-info-value">{patient.dob}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">SEX</span>
                <div className="patient-profile-info-tags-group">
                  <span className={`patient-profile-info-tag ${patient.sex === 'Male' ? 'active' : 'inactive'}`}>Male</span>
                  <span className={`patient-profile-info-tag ${patient.sex === 'Female' ? 'active' : 'inactive'}`}>Female</span>
                </div>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">BLOOD TYPE</span>
                <div className="patient-profile-info-tags-group blood-type">
                  {bloodTypes.map(type => (
                    <span key={type} className={`patient-profile-info-tag ${patient.bloodType === type ? 'active' : 'inactive'}`}>{type}</span>
                  ))}
                </div>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">CIVIL STATUS</span>
                <div className="patient-profile-info-tags-group">
                  {civilStatuses.map(status => (
                    <span key={status} className={`patient-profile-info-tag ${patient.civilStatus === status ? 'active' : 'inactive'}`}>{status}</span>
                  ))}
                </div>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">PHIL HEALTH NO.</span>
                <span className="patient-profile-info-value">{patient.philhealth}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">EMAIL</span>
                <span className="patient-profile-info-value">{patient.email}</span>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">PRIMARY MOBILE</span>
                <span className="patient-profile-info-value">{patient.mobile}</span>
              </div>
            </div>
            <div className="patient-profile-info-profile">
              <img
                src={
                  patient.profilePic ||
                  `https://ui-avatars.com/api/?name=${patient.firstName}+${patient.lastName}&background=034172&color=fff&size=100`
                }
                alt="Profile"
                className="patient-profile-info-pic"
              />
              <p><strong>ID:</strong> {patient.id}</p>
            </div>
          </div>
          <button className="global-btn primary patient-profile-edit-btn" type="button" style={{ position: 'absolute', bottom: 32, right: 32, zIndex: 10 }}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 