import React, { useState } from 'react';
import styles from './Profile.module.css';

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
    <div className={styles.patientProfileOuterContainer}>
      <div className={styles.patientProfileWrapper}>
        <div className={styles.patientProfileContainer}>
          <div className={styles.patientProfileInfoContainer}>
            <div className={styles.patientProfileFields}>
              <div className={styles.patientProfileInfoFields}>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>FIRST NAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.patientProfileInfoInput}
                    value={patientData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.firstName}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>LAST NAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.patientProfileInfoInput}
                    value={patientData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.lastName}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>MIDDLE NAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.patientProfileInfoInput}
                    value={patientData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.middleName}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>SUFFIX</span>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.patientProfileInfoInput}
                    value={patientData.suffix}
                    onChange={(e) => handleInputChange('suffix', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.suffix}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>NICKNAME</span>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.patientProfileInfoInput}
                    value={patientData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.nickname}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>DATE OF BIRTH</span>
                {isEditing ? (
                  <input
                    type="date"
                    className={styles.patientProfileInfoInput}
                    value={patientData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.dob}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>SEX</span>
                {/* SEX TAGS */}
                <div className={styles.patientProfileInfoTagsGroup}>
                  {['Male', 'Female'].map(sex => (
                    <span
                      key={sex}
                      className={`${styles.patientProfileInfoTag} ${patientData.sex === sex ? styles.active : styles.inactive}${isEditing ? ` ${styles.clickable}` : ''}`}
                      onClick={isEditing ? () => handleInputChange('sex', sex) : undefined}
                    >{sex}</span>
                  ))}
                </div>
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>BLOOD TYPE</span>
                {/* BLOOD TYPE TAGS */}
                <div className={`${styles.patientProfileInfoTagsGroup} ${styles.bloodType}`}>
                  {bloodTypes.map(type => (
                    <span
                      key={type}
                      className={`${styles.patientProfileInfoTag} ${patientData.bloodType === type ? styles.active : styles.inactive}${isEditing ? ` ${styles.clickable}` : ''}`}
                      onClick={isEditing ? () => handleInputChange('bloodType', type) : undefined}
                    >{type}</span>
                  ))}
                </div>
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>CIVIL STATUS</span>
                {/* CIVIL STATUS TAGS */}
                <div className={styles.patientProfileInfoTagsGroup}>
                  {civilStatuses.map(status => (
                    <span
                      key={status}
                      className={`${styles.patientProfileInfoTag} ${patientData.civilStatus === status ? styles.active : styles.inactive}${isEditing ? ` ${styles.clickable}` : ''}`}
                      onClick={isEditing ? () => handleInputChange('civilStatus', status) : undefined}
                    >{status}</span>
                  ))}
                </div>
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>PHIL HEALTH NO.</span>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.patientProfileInfoInput}
                    value={patientData.philhealth}
                    onChange={(e) => handleInputChange('philhealth', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.philhealth}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>EMAIL</span>
                {isEditing ? (
                  <input
                    type="email"
                    className={styles.patientProfileInfoInput}
                    value={patientData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.email}</span>
                )}
              </div>
              <div className={styles.patientProfileInfoRow}>
                <span className={styles.patientProfileInfoLabel}>PRIMARY MOBILE</span>
                {isEditing ? (
                  <input
                    type="tel"
                    className={styles.patientProfileInfoInput}
                    value={patientData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                  />
                ) : (
                  <span className={styles.patientProfileInfoValue}>{patientData.mobile}</span>
                )}
              </div>
              </div>
            </div>
            <div className={styles.patientProfileInfoProfile}>
              <img
                src={
                  patientData.profilePic ||
                  `https://ui-avatars.com/api/?name=${patientData.firstName}+${patientData.lastName}&background=034172&color=fff&size=100`
                }
                alt="Profile"
                className={styles.patientProfileInfoPic}
              />
              <p><strong>ID:</strong> {patientData.id}</p>
            </div>
          </div>
          <div className={`${styles.patientProfileButtons} ${styles.patientProfileEditBtn}`}>
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