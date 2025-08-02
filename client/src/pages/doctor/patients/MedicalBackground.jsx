import React from 'react';
import styles from './Patients.module.css';

const MedicalBackground = ({ patient }) => {
  return (
    <div className={styles['medical-section']}>
      <div className={styles['info-grid']}>
        <div className={styles['info-group']}>
          <label className={styles['info-label']}>Known Medical Conditions</label>
          <div className={styles['info-value']}>{patient.medicalBackground.knownConditions || 'None reported'}</div>
        </div>
        <div className={styles['info-group']}>
          <label className={styles['info-label']}>Allergies</label>
          <div className={styles['info-value']}>{patient.medicalBackground.allergies || 'None reported'}</div>
        </div>
        <div className={styles['info-group']}>
          <label className={styles['info-label']}>Previous Surgeries</label>
          <div className={styles['info-value']}>{patient.medicalBackground.previousSurgeries || 'None reported'}</div>
        </div>
        <div className={styles['info-group']}>
          <label className={styles['info-label']}>Family History</label>
          <div className={styles['info-value']}>{patient.medicalBackground.familyHistory || 'None reported'}</div>
        </div>
        <div className={styles['info-group']}>
          <label className={styles['info-label']}>Current Medications</label>
          <div className={styles['info-value']}>{patient.medicalBackground.medications || 'None reported'}</div>
        </div>
        <div className={styles['info-group']}>
          <label className={styles['info-label']}>Supplements</label>
          <div className={styles['info-value']}>{patient.medicalBackground.supplements || 'None reported'}</div>
        </div>
      </div>
    </div>
  );
};

export default MedicalBackground;
