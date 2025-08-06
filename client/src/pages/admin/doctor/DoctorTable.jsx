import React from 'react';
import styles from './Doctors.module.css';

const DoctorTable = ({ 
  filteredDoctors, 
  handleViewDoctor, 
  handleEditDoctor, 
  handleDeleteDoctor, 
  handleApproveDoctor, 
  handleRejectDoctor 
}) => {
  return (
    <div className={styles.doctorsTable}>
      {/* Header Row */}
      <div className={styles.tableHeader}>
        <div className={styles.colDoctor}>Doctor</div>
        <div className={styles.colSpecialization}>Specialization</div>
        <div className={styles.colPatients}>Patients</div>
        <div className={styles.colStatus}>Status</div>
        <div className={styles.colActions}>Actions</div>
      </div>
      
      {/* Doctor Rows */}
      <div className={styles.tableBody}>
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className={styles.doctorRow}>
            <div className={styles.colDoctor}>
              <div className={styles.doctorAvatar}>{doctor.initials}</div>
              <div className={styles.doctorInfo}>
                <div className={styles.doctorName}>{doctor.name}</div>
                <div className={styles.doctorEmail}>{doctor.email}</div>
              </div>
            </div>
            <div className={styles.colSpecialization}>
              <span className={`${styles.specializationTag} ${styles[doctor.specialization.toLowerCase()]}`}>
                {doctor.specialization}
              </span>
            </div>
            <div className={styles.colPatients}>
              <span className={styles.patientCount}>{doctor.patients}</span>
            </div>
            <div className={styles.colStatus}>
              <span className={`${styles.statusBadge} ${styles[doctor.status]}`}>
                {doctor.statusText}
              </span>
            </div>
            <div className={styles.colActions}>
              {doctor.status === 'pending' ? (
                <>
                  <button 
                    className={`${styles.actionBtn} ${styles.approve}`} 
                    onClick={() => handleApproveDoctor(doctor.id)}
                    title="Approve"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg>
                  </button>
                  <button 
                    className={`${styles.actionBtn} ${styles.view}`} 
                    onClick={() => handleViewDoctor(doctor.id)}
                    title="View Details"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  </button>
                  <button 
                    className={`${styles.actionBtn} ${styles.reject}`} 
                    onClick={() => handleRejectDoctor(doctor.id)}
                    title="Reject"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className={`${styles.actionBtn} ${styles.view}`} 
                    onClick={() => handleViewDoctor(doctor.id)}
                    title="View Details"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  </button>
                  <button 
                    className={`${styles.actionBtn} ${styles.edit}`} 
                    onClick={() => handleEditDoctor(doctor.id)}
                    title="Edit"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9l-3-3L2.5 11.707V14.5h2.793L11.207 9z"/>
                    </svg>
                  </button>
                  <button 
                    className={`${styles.actionBtn} ${styles.delete}`} 
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    title="Delete"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorTable;
