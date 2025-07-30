import React, { useState } from 'react';
import './Profile.css';

const initialPatient = {
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  nickname: '',
  dob: '',
  sex: '',
  bloodType: '',
  civilStatus: '',
  philhealth: '',
  email: '',
  mobile: '',
  profilePic: '',
  id: '',
};

const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-','NA'];
const civilStatuses = ['Single','Married','Separated','Widowed'];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState(initialPatient);

  const handleInputChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    console.log('Saving changes:', patientData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPatientData(initialPatient);
    setIsEditing(false);
  };

  return (
    <div className="patient-profile-outer-container">
      <div className="patient-profile-wrapper">
        <div className="patient-profile-container">
          <div className="patient-profile-info-container">
            <div className="patient-profile-info-fields">
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">FIRST NAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="patient-profile-info-input"
                    value={patientData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.firstName}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">LAST NAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="patient-profile-info-input"
                    value={patientData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.lastName}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">MIDDLE NAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="patient-profile-info-input"
                    value={patientData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.middleName}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">SUFFIX</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="patient-profile-info-input"
                    value={patientData.suffix}
                    onChange={(e) => handleInputChange('suffix', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.suffix}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">NICKNAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="patient-profile-info-input"
                    value={patientData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.nickname}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">DATE OF BIRTH</span>
                {isEditing ? (
                  <input
                    type="date"
                    className="patient-profile-info-input"
                    value={patientData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.dob}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">SEX</span>
                {/* SEX TAGS */}
                <div className="patient-profile-info-tags-group">
                  {['Male', 'Female'].map(sex => (
                    <span
                      key={sex}
                      className={`patient-profile-info-tag ${patientData.sex === sex ? 'active' : 'inactive'}${isEditing ? ' clickable' : ''}`}
                      onClick={isEditing ? () => handleInputChange('sex', sex) : undefined}
                    >{sex}</span>
                  ))}
                </div>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">BLOOD TYPE</span>
                {/* BLOOD TYPE TAGS */}
                <div className="patient-profile-info-tags-group blood-type">
                  {bloodTypes.map(type => (
                    <span
                      key={type}
                      className={`patient-profile-info-tag ${patientData.bloodType === type ? 'active' : 'inactive'}${isEditing ? ' clickable' : ''}`}
                      onClick={isEditing ? () => handleInputChange('bloodType', type) : undefined}
                    >{type}</span>
                  ))}
                </div>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">CIVIL STATUS</span>
                {/* CIVIL STATUS TAGS */}
                <div className="patient-profile-info-tags-group">
                  {civilStatuses.map(status => (
                    <span
                      key={status}
                      className={`patient-profile-info-tag ${patientData.civilStatus === status ? 'active' : 'inactive'}${isEditing ? ' clickable' : ''}`}
                      onClick={isEditing ? () => handleInputChange('civilStatus', status) : undefined}
                    >{status}</span>
                  ))}
                </div>
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">PHIL HEALTH NO.</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="patient-profile-info-input"
                    value={patientData.philhealth}
                    onChange={(e) => handleInputChange('philhealth', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.philhealth}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">EMAIL</span>
                {isEditing ? (
                  <input
                    type="email"
                    className="patient-profile-info-input"
                    value={patientData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.email}</span>
                )}
              </div>
              <div className="patient-profile-info-row">
                <span className="patient-profile-info-label">PRIMARY MOBILE</span>
                {isEditing ? (
                  <input
                    type="tel"
                    className="patient-profile-info-input"
                    value={patientData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                  />
                ) : (
                  <span className="patient-profile-info-value">{patientData.mobile}</span>
                )}
              </div>
            </div>
            <div className="patient-profile-info-profile">
              <img
                src={
                  patientData.profilePic ||
                  `https://ui-avatars.com/api/?name=${patientData.firstName}+${patientData.lastName}&background=034172&color=fff&size=100`
                }
                alt="Profile"
                className="patient-profile-info-pic"
              />
              <p><strong>ID:</strong> {patientData.id}</p>
            </div>
          </div>
          <div className="patient-profile-buttons patient-profile-edit-btn">
            {isEditing ? (
              <>
                <button className="global-btn secondary" type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="global-btn primary" type="button" onClick={handleSave}>
                  Save
                </button>
              </>
            ) : (
              <button className="global-btn primary" type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;