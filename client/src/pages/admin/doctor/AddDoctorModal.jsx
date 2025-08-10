import React from 'react';
import styles from './Doctors.module.css';

const AddDoctorModal = ({ showAddModal, setShowAddModal, handleSubmitDoctorForm }) => {
  if (!showAddModal) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add New Doctor</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => setShowAddModal(false)}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          <form id="addDoctorForm" onSubmit={handleSubmitDoctorForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name <span className={styles.required}>*</span></label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="middleName">Middle Name</label>
                <input type="text" id="middleName" name="middleName" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name <span className={styles.required}>*</span></label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="sex">Sex</label>
                <select id="sex" name="sex">
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="specialization">Specialization <span className={styles.required}>*</span></label>
                <select id="specialization" name="specialization" required>
                  <option value="">Select Specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Surgery">Surgery</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="prcLicense">PRC License Number <span className={styles.required}>*</span></label>
                <input type="text" id="prcLicense" name="prcLicense" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="ptrLicense">PTR License Number <span className={styles.required}>*</span></label>
                <input type="text" id="ptrLicense" name="ptrLicense" required />
              </div>
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className="global-btn secondary" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="global-btn secondary">Add Doctor</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorModal;
