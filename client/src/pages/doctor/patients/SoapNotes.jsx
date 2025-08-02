import React from 'react';
import styles from './Patients.module.css';

const SoapNotes = ({
  visits,
  selectedVisitId,
  isEditMode,
  currentSOAPNote,
  remarksTemplate,
  handleRemarksTemplateChange,
  selectVisit,
  addNewSOAPNote,
  editSOAPNote,
  saveSOAPNote,
  scheduleFollowUp,
  sendToPatient,
  renderVisitsList,
  renderSOAPForm
}) => {
  return (
    <div className={styles['soap-container']}>
      <div className={styles['soap-left-panel'] + ' custom-scrollbar'}>
        <div className={styles['visits-header']}>
          <h3>Consults</h3>
          <button 
            className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-small']}`} 
            onClick={addNewSOAPNote}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '6px'}}>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add New Note
          </button>
        </div>
        <div className={styles['visits-list']}>
          {renderVisitsList()}
        </div>
      </div>
      <div className={styles['soap-right-panel'] + ' custom-scrollbar'}>
        <div className={styles['soap-form-header']}>
          <h3>
            {selectedVisitId ? `Visit - ${new Date(currentSOAPNote?.date).toLocaleDateString()}` : 
             isEditMode ? 'New SOAP Note' : 'Select a visit or add new note'}
          </h3>
        </div>
        <div className={styles['soap-form-content']}>
          {renderSOAPForm()}
        </div>
      </div>
    </div>
  );
};

export default SoapNotes;
