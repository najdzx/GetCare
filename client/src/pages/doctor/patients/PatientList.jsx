import React from 'react';
import styles from './Patients.module.css';

const PatientList = ({ 
  patients, 
  selectedPatientId, 
  currentPatientTab, 
  selectPatient, 
  calculateAge 
}) => {
  return patients.map(patient => {
    const age = calculateAge(patient.dateOfBirth);
    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
    
    return (
      <div 
        key={patient.id}
        className={`${styles['patient-item']} ${selectedPatientId === patient.id ? styles.active : ''} ${currentPatientTab === 'shared-cases' ? styles.shared : ''}`}
        onClick={() => selectPatient(patient.id)}
      >
        <div className={styles['patient-avatar']}>{initials}</div>
        <div className={styles['patient-details-text']}>
          <div className={styles['patient-name']}>{patient.firstName} {patient.lastName}</div>
          <div className={styles['patient-info']}>
            <span>{age} years old</span>
            <span>{patient.sex}</span>
            <span>{patient.bloodType || 'N/A'}</span>
          </div>
          {patient.sharedBy && <div className={styles['shared-by']}>Shared by {patient.sharedBy}</div>}
        </div>
      </div>
    );
  });
};

export default PatientList;
