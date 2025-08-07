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
        <div className={styles.patientModal}>
          <div className={styles.patientModalContent}>
            <div className={styles.patientModalHeader}>
              <h2>{selectedPatient.firstName || selectedPatient.name.split(' ')[0]} {selectedPatient.lastName || selectedPatient.name.split(' ')[1]}</h2>
              <button className={styles.patientCloseBtn} onClick={closePatientDetailsModal}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.patientModalBody}>
              <div className={styles.patientDetailsContainer}>
                {/* Basic Information Section */}
                <div className={styles.patientDetailsSection}>
                  <h3 className={styles.patientSectionTitle}>Basic Information</h3>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Patient ID</label>
                      <div className={styles.patientReadonlyInput}>PT-2024-{String(selectedPatient.id).padStart(3, '0')}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>First Name</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.firstName || selectedPatient.name.split(' ')[0]}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Middle Name</label>
                      <div className={styles.patientReadonlyInput}>-</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Last Name</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.lastName || selectedPatient.name.split(' ')[1]}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Sex</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.sex || '-'}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Date of Birth</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.dateOfBirth 
                          ? new Date(selectedPatient.dateOfBirth).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : '-'
                        }
                      </div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Age</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.age || '-'}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Blood Type</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.bloodType || '-'}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Phone Number</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.primaryMobile || selectedPatient.phone}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Email Address</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.email}</div>
                    </div>
                  </div>
                  
                </div>

                {/* Medical Background */}
                <div className={styles.patientDetailsSection}>
                  <h3 className={styles.patientSectionTitle}>Medical Background</h3>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Known Medical Conditions</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.medicalConditions ? 
                          selectedPatient.medicalConditions.split('\n').map((condition, index) => (
                            <div key={index}>{condition}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Allergies</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.allergies && selectedPatient.allergies !== 'None Known' ? 
                          selectedPatient.allergies.split('\n').map((allergy, index) => (
                            <div key={index}>{allergy}</div>
                          )) : 
                          'None recorded'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Previous Surgeries</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.previousSurgeries && selectedPatient.previousSurgeries !== 'None' ? 
                          selectedPatient.previousSurgeries.split('\n').map((surgery, index) => (
                            <div key={index}>{surgery}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Family History</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.familyHistory ? 
                          selectedPatient.familyHistory.split('\n').map((history, index) => (
                            <div key={index}>{history}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Current Medications</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.currentMedications ? 
                          selectedPatient.currentMedications.split('\n').map((med, index) => (
                            <div key={index}>{med}</div>
                          )) : 
                          'None recorded'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Supplements</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatient.supplements ? 
                          selectedPatient.supplements.split('\n').map((supplement, index) => (
                            <div key={index}>{supplement}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Concern */}
                <div className={styles.patientDetailsSection}>
                  <h3 className={styles.patientSectionTitle}>Concern</h3>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Current Concern</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatient.concern || '-'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsSection;
