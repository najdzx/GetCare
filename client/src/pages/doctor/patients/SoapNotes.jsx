import React, { useState } from 'react';
import styles from './Patients.module.css';

const SoapNotes = ({
  visits,
  selectedVisitId,
  isEditMode,
  currentSOAPNote,
  remarksTemplate,
  setSelectedVisitId,
  setIsEditMode,
  setCurrentSOAPNote,
  setRemarksTemplate
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [vitals, setVitals] = useState({
    weight: '',
    height: '',
    bloodPressure: '',
    oxygenSat: '',
    respiratoryRate: '',
    heartRate: '',
    temperature: '',
    bloodGlucose: ''
  });

  // Select a visit to view details
  const selectVisit = (visitId) => {
    setSelectedVisitId(visitId);
    setIsEditMode(false);
    
    // Load visit data
    const visitData = visits.find(v => v.id === visitId);
    if (visitData) {
      setCurrentSOAPNote({
        ...visitData,
        historyOfIllness: 'Patient reports onset of headache 2 days ago, accompanied by low-grade fever. No recent travel or sick contacts.',
        remarksNote: 'Patient appears mildly ill but alert and oriented.',
        objective: 'Temp 100.2°F, BP 120/80, HR 88, RR 16. HEENT: mild pharyngeal erythema. Lungs clear. Heart RRR.',
        diagnosis: 'Viral upper respiratory infection',
        plan: 'Supportive care, rest, fluids. Return if symptoms worsen or persist >7 days.',
        prescription: 'Acetaminophen 650mg q6h PRN fever/pain',
        testRequest: 'None at this time'
      });
    }
  };

  // Add new SOAP note
  const addNewSOAPNote = () => {
    setSelectedVisitId(null);
    setIsEditMode(true);
    setCurrentSOAPNote({
      id: null,
      date: new Date().toISOString().split('T')[0],
      chiefComplaint: '',
      historyOfIllness: '',
      remarksNote: '',
      objective: '',
      diagnosis: '',
      plan: '',
      prescription: '',
      testRequest: ''
    });
  };

  // Edit SOAP note
  const editSOAPNote = () => {
    setIsEditMode(true);
  };

  // Save SOAP note
  const saveSOAPNote = () => {
    alert('SOAP note has been saved successfully!');
    setIsEditMode(false);
  };

  // Schedule follow-up
  const scheduleFollowUp = () => {
    alert('Follow-up appointment has been scheduled successfully!');
  };

  // Send to patient
  const sendToPatient = (type) => {
    const typeName = type === 'prescription' ? 'Prescription' : 'Test Request';
    alert(`${typeName} has been sent to the patient successfully!`);
  };

  // Change remarks template
  const handleRemarksTemplateChange = (e) => {
    const template = e.target.value;
    setRemarksTemplate(template);
    
    // Set default content based on template selection
    let newContent = '';
    
    switch(template) {
      case 'lab-results':
        newContent = 'Lab Results:\n- CBC: \n- Chemistry: \n- Urinalysis: ';
        break;
      case 'vitals':
        newContent = 'Vital Signs:\n- BP: \n- HR: \n- RR: \n- Temp: ';
        break;
      default:
        // Keep existing content for default template
        newContent = currentSOAPNote?.remarksNote || '';
    }
    
    // Update the current SOAP note with the new content
    if (currentSOAPNote) {
      setCurrentSOAPNote({
        ...currentSOAPNote,
        remarksNote: newContent
      });
    }
  };

  // Render visits list
  const renderVisitsList = () => {
    if (visits.length === 0) {
      return <div className={styles['empty-soap-state']}><p>No previous consults recorded.</p></div>;
    }

    return visits.map(visit => (
      <div 
        key={visit.id}
        className={`${styles['visit-item']} ${selectedVisitId === visit.id ? styles.active : ''}`}
        onClick={() => selectVisit(visit.id)}
      >
        <div className={styles['visit-date']}>
          {new Date(visit.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        <div className={styles['visit-preview']}>
          <strong>CC:</strong> {visit.chiefComplaint}<br />
        </div>
      </div>
    ));
  };

  // Render SOAP form
  const renderSOAPForm = () => {
    if (!selectedVisitId && !isEditMode) {
      return (
        <div className={styles['empty-soap-state']}>
          <p>Select a previous consult from the left panel to view details, or click "Add New Note" to create a new SOAP note.</p>
        </div>
      );
    }

    const formClass = isEditMode ? styles['edit-mode'] : styles['view-mode'];
    const disabled = !isEditMode;

    const renderRemarksContent = () => {
      const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(prev => [...prev, ...files]);
      };

      const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
      };

      const updateVital = (field, value) => {
        setVitals(prev => ({ ...prev, [field]: value }));
      };

      const calculateBMI = () => {
        if (vitals.weight && vitals.height) {
          return (vitals.weight / ((vitals.height/100) ** 2)).toFixed(1);
        }
        return '';
      };

      switch(remarksTemplate) {
        case 'lab-results':
          return (
            <>
              <div 
                className={`${styles['file-upload-area']} ${isEditMode ? '' : styles['disabled']}`}
                onClick={() => isEditMode && document.getElementById('fileInput')?.click()}
                onDragOver={(e) => isEditMode && e.preventDefault()}
                onDrop={(e) => {
                  if (isEditMode) {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    setUploadedFiles(prev => [...prev, ...files]);
                  }
                }}
              >
                <p>Click to upload lab results or drag files here</p>
                <input 
                  type="file" 
                  id="fileInput" 
                  multiple 
                  style={{display: 'none'}} 
                  onChange={handleFileUpload}
                  disabled={!isEditMode}
                />
              </div>
              {uploadedFiles.length > 0 && (
                <div className={styles['uploaded-files']}>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className={styles['file-item']}>
                      <span className={styles['file-name']}>{file.name}</span>
                      {isEditMode && (
                        <button 
                          className={styles['file-remove']}
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <textarea 
                className={styles['form-textarea']} 
                value={currentSOAPNote?.remarksNote || ''}
                onChange={(e) => {
                  if (currentSOAPNote) {
                    setCurrentSOAPNote({
                      ...currentSOAPNote,
                      remarksNote: e.target.value
                    });
                  }
                }}
                disabled={disabled}
                placeholder="Notes about lab results..."
              />
            </>
          );

        case 'vitals':
          return (
            <>
              <div className={styles['vitals-grid']}>
                {[
                  { id: 'weight', label: 'Weight (kg)', type: 'number', step: '0.1' },
                  { id: 'height', label: 'Height (cm)', type: 'number', step: '0.1' },
                  { id: 'bmi', label: 'BMI (kg/m²)', type: 'text', readOnly: true, value: calculateBMI() },
                  { id: 'bloodPressure', label: 'Blood Pressure (mmHg)', type: 'text', placeholder: '120/80' },
                  { id: 'oxygenSat', label: 'Oxygen Saturation (%)', type: 'number', min: '0', max: '100' },
                  { id: 'respiratoryRate', label: 'Respiratory Rate (breaths/min)', type: 'number' },
                  { id: 'heartRate', label: 'Heart Rate (bpm)', type: 'number' },
                  { id: 'temperature', label: 'Body Temperature (°C)', type: 'number', step: '0.1' },
                  { id: 'bloodGlucose', label: 'Capillary Blood Glucose (mg/dL)', type: 'number' }
                ].map(field => (
                  <div key={field.id} className={styles['vital-group']}>
                    <label className={styles['vital-label']}>{field.label}</label>
                    <input
                      className={styles['vital-input']}
                      type={field.type}
                      value={field.value || vitals[field.id] || ''}
                      onChange={(e) => updateVital(field.id, e.target.value)}
                      disabled={disabled || field.readOnly}
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                    />
                  </div>
                ))}
              </div>
              <textarea 
                className={styles['form-textarea']} 
                value={currentSOAPNote?.remarksNote || ''}
                onChange={(e) => {
                  if (currentSOAPNote) {
                    setCurrentSOAPNote({
                      ...currentSOAPNote,
                      remarksNote: e.target.value
                    });
                  }
                }}
                disabled={disabled}
                placeholder="Additional notes about vitals..."
              />
            </>
          );

        default:
          return (
            <textarea 
              className={styles['form-textarea']} 
              value={currentSOAPNote?.remarksNote || ''}
              onChange={(e) => {
                if (currentSOAPNote) {
                  setCurrentSOAPNote({
                    ...currentSOAPNote,
                    remarksNote: e.target.value
                  });
                }
              }}
              disabled={disabled}
              placeholder="Enter remarks..."
            />
          );
      }
    };

    return (
      <div className={formClass}>
        {isEditMode && !currentSOAPNote?.id && (
          <div className={styles['soap-section']}>
            <div className={styles['soap-title']}>Date</div>
            <input 
              type="date" 
              className={styles['form-input']} 
              value={currentSOAPNote?.date || ''}
              onChange={(e) => {
                if (currentSOAPNote) {
                  setCurrentSOAPNote({
                    ...currentSOAPNote,
                    date: e.target.value
                  });
                }
              }}
              disabled={disabled}
            />
          </div>
        )}
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>Chief Complaint</div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.chiefComplaint || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  chiefComplaint: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter chief complaint..."
          />
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>History of Present Illness</div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.historyOfIllness || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  historyOfIllness: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter history of present illness..."
          />
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>
            Remarks
            <select 
              className={styles['template-selector']} 
              value={remarksTemplate}
              onChange={handleRemarksTemplateChange}
            >
              <option value="default">Remarks</option>
              <option value="lab-results">Lab Results/Files</option>
              <option value="vitals">Vitals</option>
            </select>
          </div>
          <div id="remarksContent">
            <div style={{background: '#fff', color: '#222', borderRadius: '6px', padding: '8px', boxShadow: 'none'}}>
              {renderRemarksContent()}
            </div>
          </div>
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>Objective</div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.objective || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  objective: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter objective findings..."
          />
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>Diagnosis</div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.diagnosis || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  diagnosis: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter diagnosis..."
          />
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>Plan</div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.plan || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  plan: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter treatment plan..."
          />
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>
            Prescription
            {isEditMode && (
              <button 
                className={styles['send-btn']} 
                onClick={() => sendToPatient('prescription')}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '6px'}}>
                  <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
                Send to Patient
              </button>
            )}
          </div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.prescription || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  prescription: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter prescription details..."
          />
        </div>
        
        <div className={styles['soap-section']}>
          <div className={styles['soap-title']}>
            Test Request
            {isEditMode && (
              <button 
                className={styles['send-btn']} 
                onClick={() => sendToPatient('test-request')}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '6px'}}>
                  <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
              Send to Patient
            </button>
          )}
          </div>
          <textarea 
            className={styles['form-textarea']} 
            value={currentSOAPNote?.testRequest || ''}
            onChange={(e) => {
              if (currentSOAPNote) {
                setCurrentSOAPNote({
                  ...currentSOAPNote,
                  testRequest: e.target.value
                });
              }
            }}
            disabled={disabled}
            placeholder="Enter test requests..."
          />
        </div>
        
        <div className={styles['soap-form-actions']}>
          <button 
            className="global-btn2" 
            onClick={scheduleFollowUp}
            disabled={!isEditMode}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '8px'}}>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Schedule Follow Up
          </button>
          {isEditMode ? (
            <button className="global-btn2" onClick={saveSOAPNote}>Save</button>
          ) : (
            <button className="global-btn2" onClick={editSOAPNote}>Edit</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles['soap-container']}>
      <div className={styles['soap-left-panel'] + ' custom-scrollbar'}>
        <div className={styles['visits-header']}>
          <h3>Consults</h3>
          <button 
            className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-small']}`} 
            onClick={addNewSOAPNote}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '6px'}}>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add New Note
          </button>
        </div>
        <div className={styles['visits-list']}>
          {renderVisitsList()}
        </div>
      </div>
      <div className={styles['soap-right-panel'] + ' custom-scrollbar'}>
        <div className={styles['soap-form-header']}>
          <h3>
            {selectedVisitId ? `Visit - ${new Date(currentSOAPNote?.date).toLocaleDateString()}` : 
             isEditMode ? 'New SOAP Note' : 'Select a visit or add new note'}
          </h3>
        </div>
        <div className={styles['soap-form-content']}>
          {renderSOAPForm()}
        </div>
      </div>
    </div>
  );
};

export default SoapNotes;
