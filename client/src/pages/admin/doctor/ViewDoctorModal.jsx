import React from 'react';
import styles from './Doctors.module.css';

const ViewDoctorModal = ({ showViewModal, setShowViewModal, currentDoctor }) => {
  if (!showViewModal || !currentDoctor) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 id="viewDoctorFullName">Dr. {currentDoctor.firstName} {currentDoctor.lastName}</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => setShowViewModal(false)}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.doctorDetails}>
            {/* Basic Information Section */}
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Doctor ID</label>
                  <div className={styles.readonlyInput}>{currentDoctor.doctorId}</div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <div className={styles.readonlyInput}>{currentDoctor.firstName}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Middle Name</label>
                  <div className={styles.readonlyInput}>{currentDoctor.middleName || '-'}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <div className={styles.readonlyInput}>{currentDoctor.lastName}</div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Sex</label>
                  <div className={styles.readonlyInput}>{currentDoctor.sex}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Date of Birth</label>
                  <div className={styles.readonlyInput}>{currentDoctor.dateOfBirth}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <div className={styles.readonlyInput}>{currentDoctor.age}</div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <div className={styles.readonlyInput}>{currentDoctor.phoneNumber}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <div className={styles.readonlyInput}>{currentDoctor.email}</div>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Professional Information</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>PRC License Number</label>
                  <div className={styles.readonlyInput}>{currentDoctor.prcLicense}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>PTR License Number</label>
                  <div className={styles.readonlyInput}>{currentDoctor.ptrLicense}</div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Specialization</label>
                  <div className={styles.readonlyInput}>{currentDoctor.specialization}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Years of Experience</label>
                  <div className={styles.readonlyInput}>{currentDoctor.experience}</div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Affiliated Hospital</label>
                  <div className={styles.readonlyInput}>{currentDoctor.hospital}</div>
                </div>
              </div>
            </div>

            {/* Training Section */}
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Education</h3>
              <div className={styles.educationList}>
                {currentDoctor.training.map((edu, index) => (
                  <div key={index} className={styles.formGroup}>
                    <label>Education {index + 1}</label>
                    <div className={styles.readonlyInput}>
                      {edu.title} - {edu.institution} ({edu.period})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Certifications</h3>
              <div className={styles.certificationsList}>
                {currentDoctor.certifications.map((cert, index) => (
                  <div key={index} className={styles.formGroup}>
                    <label>Certification {index + 1}</label>
                    <div className={styles.readonlyInput}>
                      {cert.title} ({cert.year})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorModal;
