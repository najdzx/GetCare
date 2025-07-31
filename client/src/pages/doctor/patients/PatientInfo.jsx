import React from 'react';
import styles from './Patients.module.css';

const PatientInfo = ({ selectedPatient }) => {
  return (
    <div className={styles.patientInfoContainer}>
      <div className={styles.patientInfoFields}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>FIRST NAME</span>
          <span className={styles.infoValue}>{selectedPatient.firstName || 'Juan'}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>LAST NAME</span>
          <span className={styles.infoValue}>{selectedPatient.lastName || 'Cruz'}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>MIDDLE NAME</span>
          <span className={styles.infoValue}>{selectedPatient.middleName || 'Dela'}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>SUFFIX</span>
          <span className={styles.infoValue}>{selectedPatient.suffix || ''}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>NICKNAME</span>
          <span className={styles.infoValue}>{selectedPatient.nickname || ''}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>DATE OF BIRTH</span>
          <span className={styles.infoValue}>{selectedPatient.dob || ''}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>SEX</span>
          <div className={styles.infoTagsGroup}>
            <span className={`${styles.infoTag} ${selectedPatient.sex === 'Male' ? styles.active : styles.inactive}`}>
              Male
            </span>
            <span className={`${styles.infoTag} ${selectedPatient.sex === 'Female' ? styles.active : styles.inactive}`}>
              Female
            </span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>BLOOD TYPE</span>
          <div className={`${styles.infoTagsGroup} ${styles.bloodType}`}>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'A+' ? styles.active : styles.inactive}`}>A+</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'A-' ? styles.active : styles.inactive}`}>A-</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'B+' ? styles.active : styles.inactive}`}>B+</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'B-' ? styles.active : styles.inactive}`}>B-</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'AB+' ? styles.active : styles.inactive}`}>AB+</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'AB-' ? styles.active : styles.inactive}`}>AB-</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'O+' ? styles.active : styles.inactive}`}>O+</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'O-' ? styles.active : styles.inactive}`}>O-</span>
            <span className={`${styles.infoTag} ${selectedPatient.bloodType === 'NA' ? styles.active : styles.inactive}`}>NA</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>CIVIL STATUS</span>
          <div className={styles.infoTagsGroup}>
            <span className={`${styles.infoTag} ${selectedPatient.civilStatus === 'Single' ? styles.active : styles.inactive}`}>Single</span>
            <span className={`${styles.infoTag} ${selectedPatient.civilStatus === 'Married' ? styles.active : styles.inactive}`}>Married</span>
            <span className={`${styles.infoTag} ${selectedPatient.civilStatus === 'Separated' ? styles.active : styles.inactive}`}>Separated</span>
            <span className={`${styles.infoTag} ${selectedPatient.civilStatus === 'Widowed' ? styles.active : styles.inactive}`}>Widowed</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>PHIL HEALTH NO.</span>
          <span className={styles.infoValue}>{selectedPatient.philhealth || ''}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>PATIENT TAGS</span>
          <select className={`${styles.infoValue} ${styles.patientTagsSelect}`}>
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>EMAIL</span>
          <span className={styles.infoValue}>{selectedPatient.email || ''}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>PRIMARY MOBILE</span>
          <span className={styles.infoValue}>{selectedPatient.mobile || ''}</span>
        </div>
      </div>
      
      <div className={styles.patientInfoProfile}>
        <img
          src={
            selectedPatient.profilePic ||
            `https://ui-avatars.com/api/?name=${selectedPatient.firstName || 'Juan'}+${selectedPatient.lastName || 'Cruz'}&background=034172&color=fff&size=100`
          }
          alt="Profile"
          className={styles.profilePic}
        />
        <p><strong>ID:</strong> {selectedPatient.id || '123456'}</p>
      </div>
    </div>
  );
};

export default PatientInfo; 