import React, { useState } from 'react';
import styles from './Doctors.module.css';

const PatientsSection = ({ doctor }) => {
  // Modal state for patient details
  const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Dynamic patients data based on the doctor
  const [patientsData] = useState({
    assignedPatients: [
      {
        id: 1,
        doctorId: doctor?.id || 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        dateAssigned: "2024-01-15",
        lastVisit: "2024-07-28",
        condition: "Hypertension",
        status: "Active",
        // Personal Information
        firstName: "John",
        lastName: "Smith",
        suffix: "",
        nickName: "Johnny",
        dateOfBirth: "1980-03-12",
        age: "44 years old",
        sex: "Male",
        bloodType: "O+",
        civilStatus: "Married",
        philHealthNo: "12-345678901-1",
        primaryMobile: "+1 (555) 123-4567",
        // Medical Background
        medicalConditions: "Hypertension\nHigh Cholesterol",
        allergies: "None Known",
        previousSurgeries: "None",
        familyHistory: "Father: Heart Disease\nMother: Diabetes",
        currentMedications: "Lisinopril 10mg - Once daily\nAtorvastatin 20mg - Once daily",
        supplements: "Multivitamin - Daily",
        concern: ""
      },
      {
        id: 2,
        doctorId: doctor?.id || 1,
        name: "Maria Garcia",
        email: "maria.garcia@email.com",
        phone: "+1 (555) 234-5678",
        dateAssigned: "2024-02-10",
        lastVisit: "2024-08-02",
        condition: "Diabetes Type 2",
        status: "Active"
      },
      {
        id: 3,
        doctorId: doctor?.id || 1,
        name: "Robert Johnson",
        email: "robert.j@email.com",
        phone: "+1 (555) 345-6789",
        dateAssigned: "2024-03-05",
        lastVisit: "2024-07-15",
        condition: "Cardiac Monitoring",
        status: "Follow-up Required"
      },
      {
        id: 4,
        doctorId: doctor?.id || 1,
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 456-7890",
        dateAssigned: "2024-04-12",
        lastVisit: "2024-08-01",
        condition: "Chronic Pain Management",
        status: "Active"
      },
      {
        id: 5,
        doctorId: doctor?.id || 1,
        name: "James Wilson",
        email: "james.wilson@email.com",
        phone: "+1 (555) 567-8901",
        dateAssigned: "2024-05-20",
        lastVisit: "2024-08-05",
        condition: "Anxiety and Depression",
        status: "Active"
      },
      {
        id: 6,
        doctorId: doctor?.id || 1,
        name: "Lisa Martinez",
        email: "lisa.martinez@email.com",
        phone: "+1 (555) 678-9012",
        dateAssigned: "2024-06-15",
        lastVisit: "2024-08-06",
        condition: "Thyroid Disorder",
        status: "Follow-up Required"
      }
    ],
    sharedCases: [
      {
        id: 5,
        doctorId: doctor?.id || 1,
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "+1 (555) 567-8901",
        primaryDoctor: "Dr. Michael Chen",
        sharedDate: "2024-06-20",
        lastConsultation: "2024-07-30",
        condition: "Cardiac Consultation",
        status: "Consultation Complete"
      },
      {
        id: 6,
        doctorId: doctor?.id || 1,
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "+1 (555) 678-9012",
        primaryDoctor: "Dr. Lisa Park",
        sharedDate: "2024-07-10",
        lastConsultation: "2024-08-01",
        condition: "Second Opinion",
        status: "Ongoing"
      },
      {
        id: 7,
        doctorId: doctor?.id || 1,
        name: "Amanda Thompson",
        email: "amanda.t@email.com",
        phone: "+1 (555) 789-0123",
        primaryDoctor: "Dr. James Miller",
        sharedDate: "2024-07-25",
        lastConsultation: "2024-08-03",
        condition: "Specialist Consultation",
        status: "Pending Review"
      }
    ]
  });

  const [activePatientTab, setActivePatientTab] = useState('assigned');

  // Filter patients based on doctor - use fallback logic to ensure patients show up
  const doctorId = doctor?.id || 1;
  const filteredAssignedPatients = patientsData.assignedPatients.filter(
    patient => patient.doctorId === doctorId || patient.doctorId === 1
  );
  
  const filteredSharedCases = patientsData.sharedCases.filter(
    patient => patient.doctorId === doctorId || patient.doctorId === 1
  );

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return styles.statusActive;
      case 'follow-up required':
        return styles.statusFollowUp;
      case 'consultation complete':
        return styles.statusComplete;
      case 'ongoing':
        return styles.statusOngoing;
      case 'pending review':
        return styles.statusPending;
      default:
        return styles.statusDefault;
    }
  };

  // Handler functions for patient details modal
  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetailsModal(true);
  };

  const closePatientDetailsModal = () => {
    setShowPatientDetailsModal(false);
    setSelectedPatient(null);
  };

  return (
    <div className={styles.availabilityTabContent}>
      <div className={styles.patientsSection}>
        {/* Patients Tab Navigation */}
        <div className={styles.patientsTabNav}>
          <button 
            className={`${styles.patientTabBtn} ${activePatientTab === 'assigned' ? styles.active : ''}`}
            onClick={() => setActivePatientTab('assigned')}
          >
            Assigned Patients ({filteredAssignedPatients.length})
          </button>
          <button 
            className={`${styles.patientTabBtn} ${activePatientTab === 'shared' ? styles.active : ''}`}
            onClick={() => setActivePatientTab('shared')}
          >
            Shared Cases ({filteredSharedCases.length})
          </button>
        </div>

        {/* Assigned Patients */}
        {activePatientTab === 'assigned' && (
          <div className={styles.patientsTabContent}>
            <div className={styles.patientsList}>
              {filteredAssignedPatients.map(patient => (
                <div key={patient.id} className={styles.patientCard}>
                  <div className={styles.patientCardHeader}>
                    <div className={styles.patientInfo}>
                      <h4>{patient.name}</h4>
                      <div className={styles.patientContact}>
                        <span>{patient.email}</span>
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                    <div className={styles.patientActions}>
                      <button 
                        className="global-btn secondary" 
                        title="View Patient Details"
                        onClick={() => handleViewPatientDetails(patient)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="global-btn secondary" title="Edit Patient">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={styles.patientDetails}>
                    <div className={styles.patientDetailRow}>
                      <label>Condition:</label>
                      <span>{patient.condition}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Date Assigned:</label>
                      <span>{new Date(patient.dateAssigned).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Last Visit:</label>
                      <span>{new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Status:</label>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shared Cases */}
        {activePatientTab === 'shared' && (
          <div className={styles.patientsTabContent}>
            <div className={styles.patientsList}>
              {filteredSharedCases.map(patient => (
                <div key={patient.id} className={styles.patientCard}>
                  <div className={styles.patientCardHeader}>
                    <div className={styles.patientInfo}>
                      <h4>{patient.name}</h4>
                      <div className={styles.patientContact}>
                        <span>{patient.email}</span>
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                    <div className={styles.patientActions}>
                      <button 
                        className="global-btn secondary" 
                        title="View Patient Details"
                        onClick={() => handleViewPatientDetails(patient)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="global-btn secondary" title="Add Consultation Notes">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={styles.patientDetails}>
                    <div className={styles.patientDetailRow}>
                      <label>Primary Doctor:</label>
                      <span>{patient.primaryDoctor}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Condition:</label>
                      <span>{patient.condition}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Shared Date:</label>
                      <span>{new Date(patient.sharedDate).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Last Consultation:</label>
                      <span>{new Date(patient.lastConsultation).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.patientDetailRow}>
                      <label>Status:</label>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Patient Details Modal */}
      {showPatientDetailsModal && selectedPatient && (
        <div className={styles.patientModalOverlay} onClick={closePatientDetailsModal}>
          <div className={styles.patientModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.patientModalHeader}>
              <h3>Patient Details</h3>
              <button className={styles.patientCloseModal} onClick={closePatientDetailsModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.patientModalContent}>
              {/* Patient Avatar and Basic Info */}
              <div className={styles.patientAvatarSection}>
                <div className={styles.patientAvatar}>
                  <div className={styles.patientProfilePic}>
                    👤
                  </div>
                  <div className={styles.patientAvatarInfo}>
                    <div className={styles.patientAvatarName}>{selectedPatient.name}</div>
                    <div className={styles.patientAvatarId}>Patient ID: PT-2024-{String(selectedPatient.id).padStart(3, '0')}</div>
                  </div>
                </div>
              </div>

              <div className={styles.patientDetailsGrid}>
                {/* Personal Information Section */}
                <div className={styles.patientInfoSection}>
                  <h4>Personal Information</h4>
                  <div className={styles.patientViewGrid}>
                    <div className={styles.patientViewGroup}>
                      <label>First Name</label>
                      <span>{selectedPatient.firstName || selectedPatient.name.split(' ')[0]}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Last Name</label>
                      <span>{selectedPatient.lastName || selectedPatient.name.split(' ')[1]}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Suffix</label>
                      <span>{selectedPatient.suffix || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Nickname</label>
                      <span>{selectedPatient.nickName || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Date of Birth</label>
                      <span>
                        {selectedPatient.dateOfBirth 
                          ? new Date(selectedPatient.dateOfBirth).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : "N/A"
                        }
                      </span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Age</label>
                      <span>{selectedPatient.age || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Sex</label>
                      <span>{selectedPatient.sex || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Blood Type</label>
                      <span>{selectedPatient.bloodType || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Civil Status</label>
                      <span>{selectedPatient.civilStatus || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>PhilHealth No.</label>
                      <span>{selectedPatient.philHealthNo || "N/A"}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Email Address</label>
                      <span>{selectedPatient.email}</span>
                    </div>
                    <div className={styles.patientViewGroup}>
                      <label>Primary Mobile</label>
                      <span>{selectedPatient.primaryMobile || selectedPatient.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Medical Background Section */}
                <div className={styles.patientInfoSection}>
                  <h4>Medical Background</h4>
                  <div className={styles.patientViewGrid}>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <label>Known Medical Conditions</label>
                      <div className={styles.patientViewField}>
                        {selectedPatient.medicalConditions ? 
                          selectedPatient.medicalConditions.split('\n').map((condition, index) => (
                            <div key={index}>{condition}</div>
                          )) : 
                          <div>No known medical conditions</div>
                        }
                      </div>
                    </div>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <label>Allergies</label>
                      <div className={styles.patientViewField}>
                        {selectedPatient.allergies ? 
                          selectedPatient.allergies.split('\n').map((allergy, index) => (
                            <div key={index}>{allergy}</div>
                          )) : 
                          <div>No known allergies</div>
                        }
                      </div>
                    </div>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <label>Previous Surgeries</label>
                      <div className={styles.patientViewField}>
                        {selectedPatient.previousSurgeries ? 
                          selectedPatient.previousSurgeries.split('\n').map((surgery, index) => (
                            <div key={index}>{surgery}</div>
                          )) : 
                          <div>No previous surgeries</div>
                        }
                      </div>
                    </div>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <label>Family History</label>
                      <div className={styles.patientViewField}>
                        {selectedPatient.familyHistory ? 
                          selectedPatient.familyHistory.split('\n').map((history, index) => (
                            <div key={index}>{history}</div>
                          )) : 
                          <div>No significant family history</div>
                        }
                      </div>
                    </div>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <label>Current Medications</label>
                      <div className={styles.patientViewField}>
                        {selectedPatient.currentMedications ? 
                          selectedPatient.currentMedications.split('\n').map((med, index) => (
                            <div key={index}>{med}</div>
                          )) : 
                          <div>No current medications</div>
                        }
                      </div>
                    </div>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <label>Supplements</label>
                      <div className={styles.patientViewField}>
                        {selectedPatient.supplements ? 
                          selectedPatient.supplements.split('\n').map((supplement, index) => (
                            <div key={index}>{supplement}</div>
                          )) : 
                          <div>No supplements</div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Concern Section */}
                <div className={styles.patientInfoSection}>
                  <h4>Concern</h4>
                  <div className={styles.patientViewGrid}>
                    <div className={`${styles.patientViewGroup} ${styles.fullWidth}`}>
                      <div className={styles.patientViewField}>
                        {/* Intentionally left blank */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.patientModalFooter}>
              <button className="global-btn secondary" onClick={closePatientDetailsModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsSection;
