import React, { useEffect, useState } from 'react';
import { MdPeople, MdPersonAdd } from 'react-icons/md';
import PatientInfo from './PatientInfo';
import MedicalBackground from './MedicalBackground';
import SoapNote from './SoapNote';
import './Patients.css';

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
    <div className="patients-container">
      {!selectedPatient ? (
        // Show patient lists when no patient is selected
    <div className="patients-grid">
          {/* My Patients */}
      <div className="patients-card">
        <div className="patients-card-header">
          <MdPeople className="patients-icon" />
              <h3>My Patients</h3>
            </div>

            {/* Search for My Patients */}
            <div className="card-search-section">
              <input
                type="text"
                placeholder="Search my patients..."
                value={myPatientsSearch}
                onChange={(e) => setMyPatientsSearch(e.target.value)}
                className="card-search-input"
              />
        </div>

        <div className="patients-table">
          <div className="patients-table-header">
            <span>Name</span>
            <span>Concern</span>
            <span>Action</span>
          </div>
          <div className="patients-table-scroll">
            {loading ? (
              <div className="patients-empty">Loading...</div>
                ) : filteredMyPatients.length === 0 ? (
                  <div className="patients-empty">No patients found.</div>
            ) : (
                  filteredMyPatients.map((patient) => (
                <div className="patients-table-row" key={patient.id}>
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
      <div className="patients-card">
        <div className="patients-card-header">
          <MdPersonAdd className="patients-icon" />
              <h3>Shared Cases</h3>
            </div>

            {/* Search for Shared Cases */}
            <div className="card-search-section">
              <input
                type="text"
                placeholder="Search shared cases..."
                value={sharedCasesSearch}
                onChange={(e) => setSharedCasesSearch(e.target.value)}
                className="card-search-input"
              />
        </div>

        <div className="patients-table referred">
          <div className="patients-table-header">
            <span>Name</span>
            <span>Doctor</span>
            <span>Concern</span>
            <span>Action</span>
          </div>

          {loading ? (
            <div className="patients-empty">Loading...</div>
              ) : filteredSharedCases.length === 0 ? (
                <div className="patients-empty">No shared cases found.</div>
          ) : (
                filteredSharedCases.map((patient) => (
              <div className="patients-table-row" key={patient.id}>
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
        <div className="patient-details-container">
          {/* Navigation with back button */}
          <div className="patient-nav">
            <div className="nav-tabs">
              <button
                className={`nav-btn${modalPage === 1 ? ' active' : ''}`}
                onClick={() => setModalPage(1)}
              >
                Patient Info
              </button>
              <button
                className={`nav-btn${modalPage === 2 ? ' active' : ''}`}
                onClick={() => setModalPage(2)}
              >
                Medical Background
              </button>
              <button
                className={`nav-btn${modalPage === 3 ? ' active' : ''}`}
                onClick={() => setModalPage(3)}
              >
                SOAP Note
              </button>
            </div>
            <button className="back-btn" onClick={handleClose}>
              ← Back to Patients
              </button>
            </div>

          {/* Content */}
          <div className="patient-content">
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