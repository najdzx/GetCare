import React from 'react';
import TextField from '@mui/material/TextField';
import styles from './Patients.module.css';

const MedicalBackground = ({ selectedPatient }) => {
  return (
    <>
      <div className={styles.medicalBackground}>
        <h2>Medical Background</h2>
        <div className={styles.medicalFields}>
          <div className={styles.medicalFieldContainer}>
            <TextField
              label="Known Medical Condition"
              value={selectedPatient.conditions || 'blank'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
              variant="outlined"
            />
          </div>
          <div className={styles.medicalFieldContainer}>
            <TextField
              label="Allergies"
              value={selectedPatient.allergies || 'blank'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
              variant="outlined"
            />
          </div>
          <div className={styles.medicalFieldContainer}>
            <TextField
              label="Previous Surgeries"
              value={selectedPatient.surgeries || 'blank'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
              variant="outlined"
            />
          </div>
          <div className={styles.medicalFieldContainer}>
            <TextField
              label="Family History"
              value={selectedPatient.familyHistory || 'blank'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
              variant="outlined"
            />
          </div>
          <div className={styles.medicalFieldContainer}>
            <TextField
              label="Medication"
              value={selectedPatient.medication || 'blank'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
              variant="outlined"
            />
          </div>
          <div className={styles.medicalFieldContainer}>
            <TextField
              label="Supplements"
              value={selectedPatient.supplements || 'blank'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalBackground; 