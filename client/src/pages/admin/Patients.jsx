import React, { useState, useEffect } from 'react';
import styles from './Patients.module.css';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeMedicalTab, setActiveMedicalTab] = useState('visits');

  // Sample patient data
  const patientData = {
    1: {
      id: 1,
      patientId: 'PAT-2024-001',
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe',
      sex: 'Male',
      dateOfBirth: 'January 15, 1990',
      age: 34,
      ageText: '34 years',
      bloodType: 'O+',
      phoneNumber: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      address: '123 Main Street, Anytown, ST 12345',
      assignedDoctor: 'Dr. Sarah Smith',
      doctorSpecialty: 'Cardiology',
      lastVisit: 'Dec 15, 2024',
      registrationDate: 'March 15, 2024',
      totalVisits: '12 visits',
      status: 'active',
      statusText: 'Active',
      emergencyName: 'Jane Doe',
      emergencyPhone: '+1 (555) 987-6543',
      emergencyRelation: 'Spouse',
      allergies: 'Penicillin, Shellfish',
      medications: 'Lisinopril 10mg daily, Metformin 500mg twice daily',
      referralDoctors: [
        { name: 'Dr. Emily Wilson', specialty: 'Endocrinology', date: 'Nov 15, 2024' },
        { name: 'Dr. James Brown', specialty: 'Ophthalmology', date: 'Oct 8, 2024' }
      ]
    },
    2: {
      id: 2,
      patientId: 'PAT-2024-002',
      firstName: 'Jane',
      middleName: 'Elizabeth',
      lastName: 'Smith',
      sex: 'Female',
      dateOfBirth: 'March 22, 1996',
      age: 28,
      ageText: '28 years',
      bloodType: 'A+',
      phoneNumber: '+1 (555) 234-5678',
      email: 'jane.smith@email.com',
      address: '456 Oak Avenue, Somewhere, ST 67890',
      assignedDoctor: 'Dr. Michael Davis',
      doctorSpecialty: 'Neurology',
      lastVisit: 'Dec 12, 2024',
      registrationDate: 'April 10, 2024',
      totalVisits: '8 visits',
      status: 'active',
      statusText: 'Active',
      emergencyName: 'Robert Smith',
      emergencyPhone: '+1 (555) 876-5432',
      emergencyRelation: 'Father',
      allergies: 'None known',
      medications: 'Birth control pills',
      referralDoctors: []
    },
    // ... other patient data (3-6) would be here
  };

  const filteredPatients = Object.values(patientData).filter(patient => {
    const matchesSearch = 
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesAgeGroup = true;
    if (ageGroupFilter === 'child') {
      matchesAgeGroup = patient.age <= 17;
    } else if (ageGroupFilter === 'adult') {
      matchesAgeGroup = patient.age >= 18 && patient.age <= 64;
    } else if (ageGroupFilter === 'senior') {
      matchesAgeGroup = patient.age >= 65;
    }
    
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    
    return matchesSearch && matchesAgeGroup && matchesStatus;
  });

  const handleViewPatient = (id) => {
    setSelectedPatient(patientData[id]);
    setShowViewModal(true);
  };

  const handleEditPatient = (id) => {
    alert(`Edit functionality for Patient ID ${id} would be implemented here`);
  };

  const handleViewMedicalHistory = (id) => {
    setSelectedPatient(patientData[id]);
    setShowMedicalModal(true);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Patient added successfully!');
    setShowAddModal(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return styles.active;
      case 'inactive': return styles.inactive;
      case 'critical': return styles.critical;
      case 'discharged': return styles.discharged;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.adminContent}>
          {/* Header Section */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>All Patients</h1>
            <p className={styles.pageSubtitle}>View and manage registered patients</p>
          </div>

          {/* Search and Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBox}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterControls}>
              <select 
                className={styles.filterSelect}
                value={ageGroupFilter}
                onChange={(e) => setAgeGroupFilter(e.target.value)}
              >
                <option value="">All Age Groups</option>
                <option value="child">Child (0-17)</option>
                <option value="adult">Adult (18-64)</option>
                <option value="senior">Senior (65+)</option>
              </select>
              <select 
                className={styles.filterSelect}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="critical">Critical</option>
                <option value="discharged">Discharged</option>
              </select>
              <button className={styles.addPatientBtn} onClick={() => setShowAddModal(true)}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Patient
              </button>
            </div>
          </div>

          {/* Patients Table */}
          <div className={styles.patientsTable}>
            {/* Header Row */}
            <div className={styles.tableHeader}>
              <div className={styles.colPatient}>Patient</div>
              <div className={styles.colAge}>Age</div>
              <div className={styles.colDoctor}>Assigned Doctor</div>
              <div className={styles.colLastVisit}>Last Visit</div>
              <div className={styles.colStatus}>Status</div>
              <div className={styles.colActions}>Actions</div>
            </div>
            
            {/* Patient Rows */}
            <div className={styles.tableBody}>
              {filteredPatients.map(patient => (
                <div key={patient.id} className={styles.patientRow}>
                  <div className={styles.colPatient}>
                    <div className={styles.patientAvatar}>
                      {getInitials(patient.firstName, patient.lastName)}
                    </div>
                    <div className={styles.patientInfo}>
                      <div className={styles.patientName}>{patient.firstName} {patient.lastName}</div>
                      <div className={styles.patientEmail}>{patient.email}</div>
                    </div>
                  </div>
                  <div className={styles.colAge}>
                    <span className={styles.ageInfo}>{patient.ageText}</span>
                  </div>
                  <div className={styles.colDoctor}>
                    <div className={styles.doctorAssignment}>
                      <span className={styles.doctorName}>{patient.assignedDoctor}</span>
                      <span className={styles.doctorSpecialty}>{patient.doctorSpecialty}</span>
                    </div>
                  </div>
                  <div className={styles.colLastVisit}>
                    <span className={styles.visitDate}>{patient.lastVisit}</span>
                  </div>
                  <div className={styles.colStatus}>
                    <span className={`${styles.statusBadge} ${getStatusClass(patient.status)}`}>
                      {patient.statusText}
                    </span>
                  </div>
                  <div className={styles.colActions}>
                    <button 
                      className={`${styles.actionBtn} ${styles.view}`} 
                      onClick={() => handleViewPatient(patient.id)}
                      title="View Details"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    </button>
                    <button 
                      className={`${styles.actionBtn} ${styles.edit}`} 
                      onClick={() => handleEditPatient(patient.id)}
                      title="Edit"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9l-3-3L2.5 11.707V14.5h2.793L11.207 9z"/>
                      </svg>
                    </button>
                    <button 
                      className={`${styles.actionBtn} ${styles.medical}`} 
                      onClick={() => handleViewMedicalHistory(patient.id)}
                      title="Medical History"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Add New Patient</h2>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <form onSubmit={handleAddPatient}>
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
                    <label htmlFor="dateOfBirth">Date of Birth <span className={styles.required}>*</span></label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="sex">Sex <span className={styles.required}>*</span></label>
                    <select id="sex" name="sex" required>
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="bloodType">Blood Type</label>
                    <select id="bloodType" name="bloodType">
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number <span className={styles.required}>*</span></label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" required />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                    <input type="text" id="emergencyContactName" name="emergencyContactName" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
                    <input type="tel" id="emergencyContactPhone" name="emergencyContactPhone" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContactRelation">Relationship</label>
                    <select id="emergencyContactRelation" name="emergencyContactRelation">
                      <option value="">Select Relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className={styles.submitBtn}>Add Patient</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Patient Modal */}
      {showViewModal && selectedPatient && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
              <button className={styles.closeBtn} onClick={() => setShowViewModal(false)}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.patientDetails}>
                {/* Basic Information Section */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Basic Information</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Patient ID</label>
                      <div className={styles.readonlyInput}>{selectedPatient.patientId}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>First Name</label>
                      <div className={styles.readonlyInput}>{selectedPatient.firstName}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Middle Name</label>
                      <div className={styles.readonlyInput}>{selectedPatient.middleName || '-'}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Last Name</label>
                      <div className={styles.readonlyInput}>{selectedPatient.lastName}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Sex</label>
                      <div className={styles.readonlyInput}>{selectedPatient.sex}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Date of Birth</label>
                      <div className={styles.readonlyInput}>{selectedPatient.dateOfBirth}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Age</label>
                      <div className={styles.readonlyInput}>{selectedPatient.ageText}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Blood Type</label>
                      <div className={styles.readonlyInput}>{selectedPatient.bloodType || '-'}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <div className={styles.readonlyInput}>{selectedPatient.phoneNumber}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email Address</label>
                      <div className={styles.readonlyInput}>{selectedPatient.email}</div>
                    </div>
                  </div>
                  
                </div>

                {/* Medical Background */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Medical Background</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Known Medical Conditions</label>
                      <div className={styles.readonlyInput}>-</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Allergies</label>
                      <div className={styles.readonlyInput}>{selectedPatient.allergies || 'None recorded'}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Previous Surgeries</label>
                      <div className={styles.readonlyInput}>-</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Family History</label>
                      <div className={styles.readonlyInput}>-</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Current Medications</label>
                      <div className={styles.readonlyInput}>{selectedPatient.medications || 'None recorded'}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Supplements</label>
                      <div className={styles.readonlyInput}>-</div>
                    </div>
                  </div>
                </div>

                {/* Concern */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Concern</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Current Concern</label>
                      <div className={styles.readonlyInput}>-</div>
                    </div>
                  </div>
                </div>

                {/* Doctor Assignment */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Doctor Assignment</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Assigned Doctor</label>
                      <div className={styles.readonlyInput}>{selectedPatient.assignedDoctor} ({selectedPatient.doctorSpecialty})</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Referral Doctors</label>
                      <div className={styles.readonlyInput}>
                        <div className={styles.referralList}>
                          {selectedPatient.referralDoctors && selectedPatient.referralDoctors.length > 0 ? (
                            selectedPatient.referralDoctors.map((referral, index) => (
                              <div key={index} className={styles.referralItem}>
                                <div className={styles.referralDoctor}>{referral.name}</div>
                                <div className={styles.referralSpecialty}>{referral.specialty}</div>
                                <div className={styles.referralDate}>Referred: {referral.date}</div>
                              </div>
                            ))
                          ) : (
                            <div className={styles.referralItem}>No referrals on record</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medical History Modal */}
      {showMedicalModal && selectedPatient && (
        <div className={styles.modal}>
          <div className={`${styles.modalContent} ${styles.largeModal}`}>
            <div className={styles.modalHeader}>
              <h2>Medical History - {selectedPatient.firstName} {selectedPatient.lastName}</h2>
              <button className={styles.closeBtn} onClick={() => setShowMedicalModal(false)}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.medicalHistoryTabs}>
                <button 
                  className={`${styles.tabBtn} ${activeMedicalTab === 'visits' ? styles.active : ''}`} 
                  onClick={() => setActiveMedicalTab('visits')}
                >
                  Visit History
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeMedicalTab === 'diagnoses' ? styles.active : ''}`} 
                  onClick={() => setActiveMedicalTab('diagnoses')}
                >
                  Diagnoses
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeMedicalTab === 'prescriptions' ? styles.active : ''}`} 
                  onClick={() => setActiveMedicalTab('prescriptions')}
                >
                  Prescriptions
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeMedicalTab === 'tests' ? styles.active : ''}`} 
                  onClick={() => setActiveMedicalTab('tests')}
                >
                  Lab Tests
                </button>
              </div>

              {/* Visit History Tab */}
              <div id="visitsTab" className={`${styles.tabContent} ${activeMedicalTab === 'visits' ? styles.active : ''}`}>
                <div className={styles.visitsSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Recent Visits</h3>
                  </div>
                  
                  <div className={styles.historyList}>
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>December 15, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Regular Checkup</div>
                        <div className={styles.historyDoctor}>Dr. Sarah Smith - Cardiology</div>
                        <div className={styles.historyNotes}>Routine cardiovascular examination. Blood pressure normal. Patient reports feeling well.</div>
                      </div>
                    </div>
                    
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>November 20, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Follow-up Consultation</div>
                        <div className={styles.historyDoctor}>Dr. Sarah Smith - Cardiology</div>
                        <div className={styles.historyNotes}>Follow-up for hypertension management. Medication adjustment made.</div>
                      </div>
                    </div>
                    
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>October 10, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Emergency Visit</div>
                        <div className={styles.historyDoctor}>Dr. Michael Davis - Emergency</div>
                        <div className={styles.historyNotes}>Chest pain evaluation. ECG normal. Discharged with follow-up instructions.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnoses Tab */}
              <div id="diagnosesTab" className={`${styles.tabContent} ${activeMedicalTab === 'diagnoses' ? styles.active : ''}`}>
                <div className={styles.diagnosesSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Medical Diagnoses</h3>
                  </div>
                  
                  <div className={styles.historyList}>
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>November 20, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Essential Hypertension</div>
                        <div className={styles.historyDoctor}>Dr. Sarah Smith - Cardiology</div>
                        <div className={styles.historyNotes}>ICD-10: I10 - Primary hypertension diagnosed. Patient started on ACE inhibitor.</div>
                      </div>
                    </div>
                    
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>March 15, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Type 2 Diabetes Mellitus</div>
                        <div className={styles.historyDoctor}>Dr. Sarah Smith - Cardiology</div>
                        <div className={styles.historyNotes}>ICD-10: E11 - Well-controlled with metformin. Regular monitoring required.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prescriptions Tab */}
              <div id="prescriptionsTab" className={`${styles.tabContent} ${activeMedicalTab === 'prescriptions' ? styles.active : ''}`}>
                <div className={styles.prescriptionsSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Prescription History</h3>
                  </div>
                  
                  <div className={styles.historyList}>
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>November 20, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Lisinopril 10mg</div>
                        <div className={styles.historyDoctor}>Dr. Sarah Smith - Cardiology</div>
                        <div className={styles.historyNotes}>Take once daily for hypertension. 30-day supply with 2 refills.</div>
                      </div>
                    </div>
                    
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>March 15, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Metformin 500mg</div>
                        <div className={styles.historyDoctor}>Dr. Sarah Smith - Cardiology</div>
                        <div className={styles.historyNotes}>Take twice daily with meals for diabetes management. 90-day supply.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Tests Tab */}
              <div id="testsTab" className={`${styles.tabContent} ${activeMedicalTab === 'tests' ? styles.active : ''}`}>
                <div className={styles.testsSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Laboratory Tests</h3>
                  </div>
                  
                  <div className={styles.historyList}>
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>December 10, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Comprehensive Metabolic Panel</div>
                        <div className={styles.historyDoctor}>Ordered by: Dr. Sarah Smith</div>
                        <div className={styles.historyNotes}>Glucose: 95 mg/dL (Normal), Creatinine: 1.0 mg/dL (Normal), All values within normal limits.</div>
                      </div>
                    </div>
                    
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>October 15, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>Lipid Panel</div>
                        <div className={styles.historyDoctor}>Ordered by: Dr. Sarah Smith</div>
                        <div className={styles.historyNotes}>Total Cholesterol: 180 mg/dL, HDL: 45 mg/dL, LDL: 110 mg/dL, Triglycerides: 125 mg/dL</div>
                      </div>
                    </div>
                    
                    <div className={styles.historyItem}>
                      <div className={styles.historyDate}>March 20, 2024</div>
                      <div className={styles.historyContent}>
                        <div className={styles.historyTitle}>HbA1c</div>
                        <div className={styles.historyDoctor}>Ordered by: Dr. Sarah Smith</div>
                        <div className={styles.historyNotes}>HbA1c: 6.8% - Good diabetes control. Continue current management.</div>
                      </div>
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

export default Patients;