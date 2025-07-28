import React from 'react';
import TextField from '@mui/material/TextField';

const MedicalBackground = ({ selectedPatient }) => {
  return (
    <>
      <div className="medical-background">
        <h2>Medical Background</h2>
        <div className="medical-fields">
          <div className="medical-field-container">
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
          <div className="medical-field-container">
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
          <div className="medical-field-container">
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
          <div className="medical-field-container">
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
          <div className="medical-field-container">
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
          <div className="medical-field-container">
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