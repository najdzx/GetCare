import React, { useState } from 'react';
import styles from './MedicalRecords.module.css';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [records] = useState([
    {
      id: 1,
      type: 'notes',
      date: 'March 15, 2024',
      doctor: 'Dr. Maria Elena Rodriguez',
      specialty: 'Internal Medicine',
      visitReason: 'Annual Physical Examination',
      content: {
        chiefComplaint: 'Routine annual check-up, no specific complaints',
        assessment: 'Patient appears healthy. Vital signs within normal limits. Blood pressure 120/80, heart rate 72 bpm, temperature 98.6°F.',
        physicalExam: 'Heart sounds normal, lungs clear, abdomen soft and non-tender. No abnormalities detected.',
        plan: 'Continue current lifestyle. Recommended annual blood work. Follow up in 12 months or as needed.'
      }
    },
    {
      id: 2,
      type: 'prescriptions',
      date: 'March 10, 2024',
      doctor: 'Dr. Carlos Mendoza',
      specialty: 'Family Medicine',
      medications: [
        {
          name: 'Amoxicillin 500mg',
          instructions: 'Take 1 capsule every 8 hours for 7 days',
          quantity: '21 capsules'
        },
        {
          name: 'Ibuprofen 400mg',
          instructions: 'Take 1 tablet every 6 hours as needed for pain',
          quantity: '20 tablets'
        }
      ],
      notes: 'Take with food to avoid stomach upset. Complete the full course of antibiotics even if feeling better.'
    },
    {
      id: 3,
      type: 'lab-requests',
      date: 'March 8, 2024',
      doctor: 'Dr. Ana Patricia Cruz',
      specialty: 'Internal Medicine',
      tests: [
        'Complete Blood Count (CBC)',
        'Comprehensive Metabolic Panel (CMP)',
        'Lipid Profile',
        'Thyroid Function Tests (TSH, T3, T4)',
        'Hemoglobin A1C'
      ],
      instructions: 'Fasting required for 12 hours before blood draw. Schedule appointment at laboratory within 7 days.',
      status: 'pending'
    },
    {
      id: 4,
      type: 'lab-results',
      date: 'March 5, 2024',
      doctor: 'Dr. Ana Patricia Cruz',
      specialty: 'Internal Medicine',
      results: [
        {
          name: 'Hemoglobin',
          value: '14.2 g/dL',
          status: 'normal',
          range: 'Normal (12.0-15.5)'
        },
        {
          name: 'White Blood Cells',
          value: '6,800 /μL',
          status: 'normal',
          range: 'Normal (4,500-11,000)'
        },
        {
          name: 'Glucose (Fasting)',
          value: '110 mg/dL',
          status: 'high',
          range: 'Slightly High (70-99)'
        },
        {
          name: 'Total Cholesterol',
          value: '185 mg/dL',
          status: 'normal',
          range: 'Normal (<200)'
        }
      ],
      comments: 'Overall results are good. Glucose slightly elevated - recommend dietary modifications and recheck in 3 months.',
      status: 'completed'
    },
    {
      id: 5,
      type: 'notes',
      date: 'February 28, 2024',
      doctor: 'Dr. Roberto Silva',
      specialty: 'Cardiology',
      visitReason: 'Follow-up for chest pain evaluation',
      content: {
        chiefComplaint: 'Occasional chest discomfort during exercise',
        assessment: 'EKG normal, stress test negative. Chest pain likely musculoskeletal in origin.',
        plan: 'Continue current activity level. Return if symptoms worsen or become more frequent.'
      }
    }
  ]);

  const filterRecords = (type) => {
    setActiveTab(type);
  };

  const downloadRecords = () => {
    alert('Downloading medical records... This feature would generate a PDF with all your medical records.');
  };

  const filteredRecords = activeTab === 'all' 
    ? records 
    : records.filter(record => record.type === activeTab);

  const getTypeStyles = (type) => {
    switch(type) {
      case 'notes':
        return styles.notes;
      case 'prescriptions':
        return styles.prescriptions;
      case 'lab-requests':
        return styles.labRequests;
      case 'lab-results':
        return styles.labResults;
      default:
        return '';
    }
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'pending':
        return styles.pending;
      case 'completed':
        return styles.completed;
      default:
        return '';
    }
  };

  const getValueStyles = (status) => {
    switch(status) {
      case 'normal':
        return styles.normal;
      case 'high':
        return styles.high;
      case 'low':
        return styles.low;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.patientInfo}>
            <div className={styles.patientAvatar}>
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg>
            </div>
            <div className={styles.patientDetails}>
              <h1>My Medical Records</h1>
              <p>John Michael Santos • Patient ID: P-2024-001</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnSecondary} onClick={downloadRecords}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Download
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`} 
            onClick={() => filterRecords('all')}
          >
            All Records
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'notes' ? styles.active : ''}`} 
            onClick={() => filterRecords('notes')}
          >
            Doctor Notes
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'prescriptions' ? styles.active : ''}`} 
            onClick={() => filterRecords('prescriptions')}
          >
            Prescriptions
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'lab-requests' ? styles.active : ''}`} 
            onClick={() => filterRecords('lab-requests')}
          >
            Lab Requests
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'lab-results' ? styles.active : ''}`} 
            onClick={() => filterRecords('lab-results')}
          >
            Lab Results
          </button>
        </div>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.recordsContainer}>
            {filteredRecords.map(record => (
              <div key={record.id} className={styles.recordCard} data-type={record.type}>
                <div className={styles.recordHeader}>
                  <div className={`${styles.recordType} ${getTypeStyles(record.type)}`}>
                    {record.type === 'notes' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                      </svg>
                    )}
                    {record.type === 'prescriptions' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                    )}
                    {record.type === 'lab-requests' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                      </svg>
                    )}
                    {record.type === 'lab-results' && (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                        <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5V6.5Z"/>
                      </svg>
                    )}
                    {record.type === 'notes' && 'Doctor Notes'}
                    {record.type === 'prescriptions' && 'Prescription'}
                    {record.type === 'lab-requests' && 'Lab Request'}
                    {record.type === 'lab-results' && 'Lab Results'}
                  </div>
                  <div className={styles.recordDate}>{record.date}</div>
                </div>

                <div className={styles.recordContent}>
                  <div className={styles.doctorInfo}>
                    <strong>{record.doctor}</strong> - {record.specialty}
                  </div>

                  {record.type === 'notes' && (
                    <>
                      <div className={styles.visitReason}>
                        <strong>Visit Reason:</strong> {record.visitReason}
                      </div>
                      <div className={styles.notesContent}>
                        <p><strong>Chief Complaint:</strong> {record.content.chiefComplaint}</p>
                        <p><strong>Assessment:</strong> {record.content.assessment}</p>
                        <p><strong>Physical Examination:</strong> {record.content.physicalExam}</p>
                        <p><strong>Plan:</strong> {record.content.plan}</p>
                      </div>
                    </>
                  )}

                  {record.type === 'prescriptions' && (
                    <>
                      <div className={styles.prescriptionList}>
                        {record.medications.map((med, index) => (
                          <div key={index} className={styles.medicationItem}>
                            <div className={styles.medName}>{med.name}</div>
                            <div className={styles.medInstructions}>{med.instructions}</div>
                            <div className={styles.medQuantity}>Quantity: {med.quantity}</div>
                          </div>
                        ))}
                      </div>
                      <div className={styles.prescriptionNotes}>
                        <strong>Instructions:</strong> {record.notes}
                      </div>
                    </>
                  )}

                  {record.type === 'lab-requests' && (
                    <>
                      <div className={styles.labTests}>
                        <h4>Requested Tests:</h4>
                        <ul className={styles.testList}>
                          {record.tests.map((test, index) => (
                            <li key={index}>{test}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.labInstructions}>
                        <strong>Instructions:</strong> {record.instructions}
                      </div>
                      <div className={`${styles.statusBadge} ${getStatusStyles(record.status)}`}>
                        Status: {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </div>
                    </>
                  )}

                  {record.type === 'lab-results' && (
                    <>
                      <div className={styles.labResults}>
                        <h4>Test Results:</h4>
                        <div className={styles.resultTable}>
                          {record.results.map((result, index) => (
                            <div key={index} className={styles.resultRow}>
                              <span className={styles.testName}>{result.name}</span>
                              <span className={`${styles.testValue} ${getValueStyles(result.status)}`}>
                                {result.value}
                              </span>
                              <span className={styles.testRange}>{result.range}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.labNotes}>
                        <strong>Doctor's Comments:</strong> {record.comments}
                      </div>
                      <div className={`${styles.statusBadge} ${getStatusStyles(record.status)}`}>
                        Status: {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MedicalRecords;