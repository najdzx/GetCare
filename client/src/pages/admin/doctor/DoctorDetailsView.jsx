import React, { useState } from 'react';
import styles from './Doctors.module.css';

const DoctorDetailsView = ({ getCurrentDoctor, handleBackToList }) => {
  console.log('DoctorDetailsView - Starting render');
  
  let doctor;
  try {
    doctor = getCurrentDoctor();
    console.log('DoctorDetailsView - doctor:', doctor);
  } catch (error) {
    console.error('Error getting current doctor:', error);
    return (
      <div className={styles.doctorDetailsContainer}>
        <div className={styles.doctorDetailsWrapper}>
          <div className={styles.doctorDetailsHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Doctors
            </button>
          </div>
          <div className={styles.doctorDetailsContent}>
            <div className={styles.doctorDetailsSection}>
              <h2 className={styles.doctorDetailsSectionTitle}>Error</h2>
              <p>Error loading doctor data. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error handling - if no doctor found, show error message
  if (!doctor) {
    return (
      <div className={styles.doctorDetailsContainer}>
        <div className={styles.doctorDetailsWrapper}>
          <div className={styles.doctorDetailsHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Doctors
            </button>
          </div>
          <div className={styles.doctorDetailsContent}>
            <div className={styles.doctorDetailsSection}>
              <h2 className={styles.doctorDetailsSectionTitle}>Error</h2>
              <p>Doctor information not found. Please go back and try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('DoctorDetailsView - About to render with doctor:', doctor.firstName);

  try {
    const doctorName = doctor.firstName || doctor.lastName 
      ? `Dr. ${doctor.firstName || ''} ${doctor.middleName || ''} ${doctor.lastName || ''}`.replace(/\s+/g, ' ').trim()
      : 'Dr. [Name]';

    return (
      <div className={styles.doctorDetailsContainer}>
        <div className={styles.doctorDetailsWrapper}>
          {/* Header Section */}
          <div className={styles.doctorDetailsHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Doctors
            </button>
            
            <div className={styles.doctorDetailsProfileHeader}>
              <div className={styles.doctorDetailsProfilePicContainer}>
                <div className={styles.doctorDetailsProfilePic}>
                  👨‍⚕️
                </div>
              </div>
              
              <div className={styles.doctorDetailsBasicInfo}>
                <h1>{doctorName}</h1>
                <p>{doctor.specialization || '[Specialization]'}</p>
                <p>{doctor.hospital || '[Hospital]'}</p>
                <p>{doctor.experience || '[Experience]'}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.doctorDetailsContent}>
            {/* Personal Information */}
            <div className={styles.doctorDetailsSection}>
              <h2 className={styles.doctorDetailsSectionTitle}>Personal Information</h2>
              <div className={styles.doctorDetailsFieldsGrid}>
                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Doctor ID</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.doctorId || '[ID]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>First Name</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.firstName || '[First Name]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Middle Name</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.middleName || '[Middle Name]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Last Name</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.lastName || '[Last Name]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Sex</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.sex || '[Sex]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Date of Birth</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.dateOfBirth || '[Date of Birth]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Age</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.age || '[Age]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Phone Number</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.phoneNumber || '[Phone Number]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Email</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.email || '[Email]'}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className={styles.doctorDetailsSection}>
              <h2 className={styles.doctorDetailsSectionTitle}>Professional Information</h2>
              <div className={styles.doctorDetailsFieldsGrid}>
                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>PRC License Number</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.prcLicense || '[PRC License]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>PTR License Number</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.ptrLicense || '[PTR License]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Specialization</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.specialization || '[Specialization]'}
                  </div>
                </div>

                <div className={styles.doctorDetailsField}>
                  <label className={styles.doctorDetailsFieldLabel}>Years of Experience</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.experience || '[Experience]'}
                  </div>
                </div>

                <div className={`${styles.doctorDetailsField} ${styles.doctorDetailsFieldFull}`}>
                  <label className={styles.doctorDetailsFieldLabel}>Affiliated Hospital</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.hospital || '[Hospital]'}
                  </div>
                </div>

                <div className={`${styles.doctorDetailsField} ${styles.doctorDetailsFieldFull}`}>
                  <label className={styles.doctorDetailsFieldLabel}>Training</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.training && doctor.training.length > 0 
                      ? doctor.training.map(t => `${t.title} - ${t.institution} (${t.period})`).join(', ')
                      : '[Training]'
                    }
                  </div>
                </div>

                <div className={`${styles.doctorDetailsField} ${styles.doctorDetailsFieldFull}`}>
                  <label className={styles.doctorDetailsFieldLabel}>Certifications</label>
                  <div className={styles.doctorDetailsFieldValue}>
                    {doctor.certifications && doctor.certifications.length > 0 
                      ? doctor.certifications.map(c => `${c.title} (${c.year})`).join(', ')
                      : '[Certifications]'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (renderError) {
    console.error('Error during render:', renderError);
    return (
      <div className={styles.doctorDetailsContainer}>
        <div className={styles.doctorDetailsWrapper}>
          <div className={styles.doctorDetailsHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Doctors
            </button>
          </div>
          <div className={styles.doctorDetailsContent}>
            <div className={styles.doctorDetailsSection}>
              <h2 className={styles.doctorDetailsSectionTitle}>Error</h2>
              <p>Error rendering doctor details. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DoctorDetailsView;
