import React from 'react';
import styles from './Patients.module.css';

const BasicInformation = ({ patient, calculateAge, onTagChange }) => {
  const age = calculateAge(patient.dateOfBirth);
  const [tag, setTag] = React.useState(patient.tag || 'ongoing');
  const handleTagChange = (e) => {
    setTag(e.target.value);
    if (onTagChange) onTagChange(e.target.value);
  };
  return (
    <div className={styles['info-grid']}>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Patient Tag</label>
        <select
          className={styles['form-select']}
          value={tag}
          onChange={handleTagChange}
          disabled={!!patient.sharedBy}
        >
          <option value="ongoing">Ongoing</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>ID</label>
        <div className={styles['info-value']}>{patient.userId}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>First Name</label>
        <div className={styles['info-value']}>{patient.firstName}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Last Name</label>
        <div className={styles['info-value']}>{patient.lastName}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Middle Name</label>
        <div className={styles['info-value']}>{patient.middleName || 'N/A'}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Suffix</label>
        <div className={styles['info-value']}>{patient.suffix || 'N/A'}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Nickname</label>
        <div className={styles['info-value']}>{patient.nickname || 'N/A'}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Date of Birth</label>
        <div className={styles['info-value']}>{new Date(patient.dateOfBirth).toLocaleDateString()}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Age</label>
        <div className={styles['info-value']}>{age} years old</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Sex</label>
        <div className={styles['info-value']}>{patient.sex.charAt(0).toUpperCase() + patient.sex.slice(1)}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Blood Type</label>
        <div className={styles['info-value']}>{patient.bloodType || 'Not Available'}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Civil Status</label>
        <div className={styles['info-value']}>{patient.civilStatus.charAt(0).toUpperCase() + patient.civilStatus.slice(1)}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>PhilHealth No.</label>
        <div className={styles['info-value']}>{patient.philhealthNo || 'Not provided'}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Email</label>
        <div className={styles['info-value']}>{patient.email || 'Not provided'}</div>
      </div>
      <div className={styles['info-group']}>
        <label className={styles['info-label']}>Primary Mobile</label>
        <div className={styles['info-value']}>{patient.primaryMobile}</div>
      </div>
    </div>
  );
};

export default BasicInformation;
