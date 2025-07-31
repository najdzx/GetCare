import React, { useEffect, useState } from 'react';
import { MdPeople, MdPersonAdd } from 'react-icons/md';
import PatientInfo from './PatientInfo';
import MedicalBackground from './MedicalBackground';
import SoapNote from './SoapNote';
import styles from './Patients.module.css';
import '../../../components/Layout/Scrollbar.css';

const Patients = () => {
  const [myPatients, setMyPatients] = useState([]);
  const [sharedCases, setSharedCases] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalPage, setModalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Search state for each card
  const [myPatientsSearch, setMyPatientsSearch] = useState('');
  const [sharedCasesSearch, setSharedCasesSearch] = useState('');


  // SOAP Note state
  const [soapNote, setSoapNote] = useState({
    chiefComplaint: '',
    history: '',
    objective: '',
    diagnosis: '',
    plan: '',
    prescription: '',
    remarks: '',
    testRequest: '',
  });

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Sample data for UI testing
    setMyPatients([
          { id: 1, name: 'John Doe', concern: 'Headache' },
          { id: 2, name: 'Maria Reyes', concern: 'Back Pain' },
          { id: 3, name: 'Jane Smith', concern: 'Anxiety' },
          { id: 4, name: 'Alex Johnson', concern: 'Migraine' },
          { id: 5, name: 'Maria Reyes', concern: 'Back Pain' },
          { id: 6, name: 'Jaria Reyes', concern: 'Back Pain' },
          { id: 7, name: 'Jaria Reyes', concern: 'Back Pain' },
          { id: 8, name: 'Jaria Reyes', concern: ' Pain' },
        ]);
    setSharedCases([
          { id: 3, name: 'Jane Smith', doctor: 'Dr. Cruz', concern: 'Anxiety' },
          { id: 4, name: 'Alex Johnson', doctor: 'Dr. Tan', concern: 'Migraine' },
        ]);
    setLoading(false);
  }, []);

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setModalPage(1);
  };

  const handleClose = () => {
    setSelectedPatient(null);
  };

  // Filter patients based on search term for each card
  const filteredMyPatients = myPatients.filter(patient => {
    return patient.name.toLowerCase().includes(myPatientsSearch.toLowerCase()) ||
           patient.concern.toLowerCase().includes(myPatientsSearch.toLowerCase()) ||
           patient.id.toString().includes(myPatientsSearch);
  });

  const filteredSharedCases = sharedCases.filter(patient => {
    return patient.name.toLowerCase().includes(sharedCasesSearch.toLowerCase()) ||
           patient.concern.toLowerCase().includes(sharedCasesSearch.toLowerCase()) ||
           patient.doctor.toLowerCase().includes(sharedCasesSearch.toLowerCase()) ||
           patient.id.toString().includes(sharedCasesSearch);
  });

  return (
    <div className={styles.patientsContainer}>
      {!selectedPatient ? (
        // Show patient lists when no patient is selected
    <div className={styles.patientsGrid}>
          {/* My Patients */}
      <div className={styles.patientsCard}>
        <div className={styles.patientsCardHeader}>
          <MdPeople className={styles.patientsIcon} />
              <h3>My Patients</h3>
            </div>

            {/* Search for My Patients */}
            <div className={styles.cardSearchSection}>
              <input
                type="text"
                placeholder="Search my patients..."
                value={myPatientsSearch}
                onChange={(e) => setMyPatientsSearch(e.target.value)}
                className={styles.cardSearchInput}
              />
        </div>

        <div className={styles.patientsTable}>
          <div className={styles.patientsTableHeader}>
            <span>Name</span>
            <span>Concern</span>
            <span>Action</span>
          </div>
          <div className={`${styles.patientsTableScroll} custom-scrollbar`}>
            {loading ? (
              <div className={styles.patientsEmpty}>Loading...</div>
                ) : filteredMyPatients.length === 0 ? (
                  <div className={styles.patientsEmpty}>No patients found.</div>
            ) : (
                  filteredMyPatients.map((patient) => (
                <div className={styles.patientsTableRow} key={patient.id}>
                  <span>{patient.name}</span>
                  <span>{patient.concern}</span>
                  <button onClick={() => handleView(patient)}>View</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

          {/* Shared Cases */}
      <div className={styles.patientsCard}>
        <div className={styles.patientsCardHeader}>
          <MdPersonAdd className={styles.patientsIcon} />
              <h3>Shared Cases</h3>
            </div>

            {/* Search for Shared Cases */}
            <div className={styles.cardSearchSection}>
              <input
                type="text"
                placeholder="Search shared cases..."
                value={sharedCasesSearch}
                onChange={(e) => setSharedCasesSearch(e.target.value)}
                className={styles.cardSearchInput}
              />
        </div>

        <div className={`${styles.patientsTable} referred`}>
          <div className={styles.patientsTableHeader}>
            <span>Name</span>
            <span>Doctor</span>
            <span>Concern</span>
            <span>Action</span>
          </div>

          {loading ? (
            <div className={styles.patientsEmpty}>Loading...</div>
              ) : filteredSharedCases.length === 0 ? (
                <div className={styles.patientsEmpty}>No shared cases found.</div>
          ) : (
                filteredSharedCases.map((patient) => (
              <div className={styles.patientsTableRow} key={patient.id}>
                <span>{patient.name}</span>
                <span>{patient.doctor}</span>
                <span>{patient.concern}</span>
                <button onClick={() => handleView(patient)}>View</button>
              </div>
            ))
          )}
        </div>
      </div>
        </div>
      ) : (
        // Show patient details in main content area
        <div className={styles.patientDetailsContainer}>
          {/* Navigation with back button */}
          <div className={styles.patientNav}>
            <div className={styles.navTabs}>
              <button
                className={`${styles.navBtn}${modalPage === 1 ? ' ' + styles.active : ''}`}
                onClick={() => setModalPage(1)}
              >
                Patient Info
              </button>
              <button
                className={`${styles.navBtn}${modalPage === 2 ? ' ' + styles.active : ''}`}
                onClick={() => setModalPage(2)}
              >
                Medical Background
              </button>
              <button
                className={`${styles.navBtn}${modalPage === 3 ? ' ' + styles.active : ''}`}
                onClick={() => setModalPage(3)}
              >
                SOAP Note
              </button>
            </div>
            <button className={styles.backBtn} onClick={handleClose}>
              ← Back to Patients
            </button>
          </div>

          {/* Content */}
          <div className={styles.patientContent}>
            {modalPage === 1 && (
              <PatientInfo selectedPatient={selectedPatient} />
            )}

            {modalPage === 2 && (
              <MedicalBackground selectedPatient={selectedPatient} />
            )}

            {modalPage === 3 && (
              <SoapNote 
                soapNote={soapNote} 
                setSoapNote={setSoapNote} 
                uploadedFiles={uploadedFiles} 
                setUploadedFiles={setUploadedFiles} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;