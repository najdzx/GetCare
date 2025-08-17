import React, { useState, useEffect, useCallback } from 'react';
import styles from './Patients.module.css';
import BasicInformation from './BasicInformation';
import MedicalBackground from './MedicalBackground';
import SoapNotes from './SoapNotes';
import Notes from './Notes';
import Doctors from './Doctors';
import PatientList from './PatientList';

const Patients = () => {
  // Patient data state
  const [myPatients, setMyPatients] = useState([
    {
      id: 1,
      userId: 'USR-2024-001',
      firstName: 'John',
      lastName: 'Smith',
      middleName: 'Michael',
      suffix: '',
      nickname: 'Johnny',
      dateOfBirth: '1985-03-15',
      sex: 'male',
      bloodType: 'A+',
      civilStatus: 'married',
      philhealthNo: '12-345678901-2',
      email: 'john.smith@email.com',
      primaryMobile: '+63 912 345 6789',
      medicalBackground: {
        knownConditions: 'Hypertension, Type 2 Diabetes',
        allergies: 'Penicillin, Shellfish',
        previousSurgeries: 'Appendectomy (2010)',
        familyHistory: 'Father: Heart disease, Mother: Diabetes',
        medications: 'Metformin 500mg, Lisinopril 10mg',
        supplements: 'Vitamin D3, Omega-3'
      },
      soapNotes: [],
      tag: 'ongoing'
    },
    {
      id: 2,
      userId: 'USR-2024-002',
      firstName: 'Maria',
      lastName: 'Garcia',
      middleName: 'Santos',
      suffix: '',
      nickname: 'Mia',
      dateOfBirth: '1990-07-22',
      sex: 'female',
      bloodType: 'O+',
      civilStatus: 'single',
      philhealthNo: '12-987654321-0',
      email: 'maria.garcia@email.com',
      primaryMobile: '+63 917 654 3210',
      medicalBackground: {
        knownConditions: 'Asthma',
        allergies: 'Dust mites, Pollen',
        previousSurgeries: 'None',
        familyHistory: 'Mother: Asthma, Grandfather: Stroke',
        medications: 'Salbutamol inhaler',
        supplements: 'Vitamin C'
      },
      soapNotes: [],
      tag: 'pending'
    }
  ]);

  const [sharedCases, setSharedCases] = useState([
    {
      id: 3,
      userId: 'USR-2024-003',
      firstName: 'Robert',
      lastName: 'Johnson',
      middleName: 'Lee',
      suffix: 'Jr.',
      nickname: 'Rob',
      dateOfBirth: '1978-11-08',
      sex: 'male',
      bloodType: 'B-',
      civilStatus: 'married',
      philhealthNo: '12-456789012-3',
      email: 'robert.johnson@email.com',
      primaryMobile: '+63 920 123 4567',
      sharedBy: 'Dr. Sarah Wilson',
      medicalBackground: {
        knownConditions: 'Chronic kidney disease',
        allergies: 'Iodine contrast',
        previousSurgeries: 'Kidney stone removal (2020)',
        familyHistory: 'Father: Kidney disease',
        medications: 'ACE inhibitor, Phosphate binder',
        supplements: 'Iron supplement'
      },
      soapNotes: [],
      tag: 'completed'
    }
  ]);

  // UI state
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [currentPatientTab, setCurrentPatientTab] = useState('my-patients');
  const [currentContentTab, setCurrentContentTab] = useState('basic-info');
  const [searchTerm, setSearchTerm] = useState('');
  
  // SOAP notes state (for communication with SoapNotes component)
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSOAPNote, setCurrentSOAPNote] = useState(null);
  const [remarksTemplate, setRemarksTemplate] = useState('default');

  // Sample visits data
  const visits = [
    {
      id: 1,
      date: '2024-01-15',
      chiefComplaint: 'Headache and fever for 2 days',
      diagnosis: 'Viral upper respiratory infection'
    },
    {
      id: 2,
      date: '2024-01-08',
      chiefComplaint: 'Follow-up for hypertension',
      diagnosis: 'Hypertension, controlled'
    },
    {
      id: 3,
      date: '2023-12-20',
      chiefComplaint: 'Annual check-up',
      diagnosis: 'Routine health maintenance'
    }
  ];

  // Calculate age from date of birth
  const calculateAge = useCallback((dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }, []);

  // Filter patients based on search term
  const filteredPatients = useCallback(() => {
    const patients = currentPatientTab === 'my-patients' ? myPatients : sharedCases;
    if (!searchTerm) return patients;
    
    return patients.filter(patient => {
      const searchLower = searchTerm.toLowerCase();
      return (
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchLower) ||
        patient.email.toLowerCase().includes(searchLower) ||
        patient.primaryMobile.includes(searchTerm)
      );
    });
  }, [currentPatientTab, myPatients, sharedCases, searchTerm]);

  // Get selected patient
  const selectedPatient = useCallback(() => {
    const allPatients = [...myPatients, ...sharedCases];
    return allPatients.find(p => p.id === selectedPatientId);
  }, [myPatients, sharedCases, selectedPatientId]);

  // Switch between patient tabs
  const switchPatientTab = (tab) => {
    setCurrentPatientTab(tab);
    setSelectedPatientId(null);
  };

  // Select a patient to view details
  const selectPatient = (patientId) => {
    setSelectedPatientId(patientId);
    setIsEditMode(false);
    setSelectedVisitId(null);
    setCurrentContentTab('basic-info');
  };

  // Switch between content tabs
  const switchContentTab = (tab) => {
    setCurrentContentTab(tab);
  };

  // Auto-expand textareas
  const autoExpandTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(80, textarea.scrollHeight)}px`;
  };

  // Setup auto-expand for textareas
  useEffect(() => {
    const setupAutoExpand = () => {
      document.querySelectorAll(`.${styles['form-textarea']}`).forEach(textarea => {
        textarea.addEventListener('input', function() {
          autoExpandTextarea(this);
        });
        autoExpandTextarea(textarea);
      });
    };

    setupAutoExpand();
  }, [currentContentTab, selectedVisitId, isEditMode]);

  // Update patient tag
  const updatePatientTag = (patientId, newTag) => {
    setMyPatients(prev => prev.map(p => p.id === patientId ? { ...p, tag: newTag } : p));
    setSharedCases(prev => prev.map(p => p.id === patientId ? { ...p, tag: newTag } : p));
  };

  // Render patient details
  const renderPatientDetails = (patient) => {
    const age = calculateAge(patient.dateOfBirth);
    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
    
    return (
      <>
        <div className={styles['sticky-header']}>
          <div className={styles['patient-header']}>
            <div className={styles['patient-avatar-large']}>{initials}</div>
            <div className={styles['patient-title-section']}>
              <h2 className={styles['patient-title']}>{patient.firstName} {patient.lastName} {patient.suffix || ''}</h2>
              <div className={styles['patient-subtitle']}>
                {age} years old • {patient.sex.charAt(0).toUpperCase() + patient.sex.slice(1)} • {patient.bloodType || 'Blood type not available'}
              </div>
            </div>
          </div>
          <div className={styles['content-tabs']}>
            <button 
              className={`${styles['content-tab']} ${currentContentTab === 'basic-info' ? styles.active : ''}`} 
              onClick={() => switchContentTab('basic-info')}
            >
              Basic Information
            </button>
            <button 
              className={`${styles['content-tab']} ${currentContentTab === 'medical-background' ? styles.active : ''}`} 
              onClick={() => switchContentTab('medical-background')}
            >
              Medical Background
            </button>
            <button 
              className={`${styles['content-tab']} ${currentContentTab === 'soap-notes' ? styles.active : ''}`} 
              onClick={() => switchContentTab('soap-notes')}
            >
              SOAP Notes
            </button>
            <button 
              className={`${styles['content-tab']} ${currentContentTab === 'notes' ? styles.active : ''}`} 
              onClick={() => switchContentTab('notes')}
            >
              Notes
            </button>
            <button 
              className={`${styles['content-tab']} ${currentContentTab === 'doctors' ? styles.active : ''}`} 
              onClick={() => switchContentTab('doctors')}
            >
              Doctors
            </button>
          </div>
        </div>
        <div className={styles['scrollable-content']}>
          {currentContentTab === 'basic-info' && (
            <BasicInformation 
              patient={patient} 
              calculateAge={calculateAge} 
              updatePatientTag={updatePatientTag}
            />
          )}
          {currentContentTab === 'medical-background' && (
            <MedicalBackground patient={patient} />
          )}
          {currentContentTab === 'soap-notes' && (
            <SoapNotes
              visits={visits}
              selectedVisitId={selectedVisitId}
              isEditMode={isEditMode}
              currentSOAPNote={currentSOAPNote}
              remarksTemplate={remarksTemplate}
              setSelectedVisitId={setSelectedVisitId}
              setIsEditMode={setIsEditMode}
              setCurrentSOAPNote={setCurrentSOAPNote}
              setRemarksTemplate={setRemarksTemplate}
            />
          )}
          {currentContentTab === 'notes' && (
            <Notes
              notes={patient.notes || []}
              addNote={() => {}}
              editNote={() => {}}
              deleteNote={() => {}}
            />
          )}
          {currentContentTab === 'doctors' && (
            <Doctors patient={patient} />
          )}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles['header-left']}>
            <h1 className={styles['page-title']}>Patients</h1>
            <div className={styles['search-container']}>
              <input 
                type="text" 
                className={styles['search-input']} 
                placeholder="Search patients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className={styles['search-icon']} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles['patient-tabs']}>
              <button 
                className={`${styles['tab-btn']} ${currentPatientTab === 'my-patients' ? styles.active : ''}`}
                onClick={() => switchPatientTab('my-patients')}
              >
                My Patients
              </button>
              <button 
                className={`${styles['tab-btn']} ${currentPatientTab === 'shared-cases' ? styles.active : ''}`}
                onClick={() => switchPatientTab('shared-cases')}
              >
                Shared Cases
              </button>
            </div>
            <div className={styles['patient-list']}>
              <PatientList 
                patients={filteredPatients()}
                selectedPatientId={selectedPatientId}
                currentPatientTab={currentPatientTab}
                selectPatient={selectPatient}
                calculateAge={calculateAge}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className={styles['main-content']}>
            {selectedPatientId ? (
              renderPatientDetails(selectedPatient())
            ) : (
              <div className={styles['empty-state']}>
                <h3>Select a Patient</h3>
                <p>Choose a patient from the list to view their information and SOAP notes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;