import React, { useEffect, useState, useRef } from 'react';
import { MdPeople, MdPersonAdd } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InputAdornment from '@mui/material/InputAdornment';
import './Patients.css';

const Patients = () => {
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [referredPatients, setReferredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalPage, setModalPage] = useState(1);
  const [loading, setLoading] = useState(true);


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

  // Remarks template state
  const [remarksTemplate, setRemarksTemplate] = useState('notes');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showRemarksMenu, setShowRemarksMenu] = useState(false);
  const textareaRef = useRef();
  const [remarksFileFocused, setRemarksFileFocused] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);

  const handleFileChange = (e) => {
    setUploadedFiles(prev =>
      [...prev, ...Array.from(e.target.files)]
        // Remove duplicates by name (optional)
        .filter((file, idx, arr) =>
          arr.findIndex(f => f.name === file.name && f.size === file.size) === idx
        )
    );
  };

  // Add this handler inside your Patients component:
  const handleRemoveFile = (index) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };



  // Close remarks menu when clicking outside
  useEffect(() => {
    if (!showRemarksMenu) return;
    const handleClick = (e) => {
      if (
        !e.target.closest('.remarks-menu-btn') &&
        !e.target.closest('.remarks-menu-dropdown')
      ) {
        setShowRemarksMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showRemarksMenu]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const [assignedRes, referredRes] = await Promise.all([
          fetch('/api/doctor/assigned-patients'),
          fetch('/api/doctor/referred-patients')
        ]);

        const assignedData = await assignedRes.json();
        const referredData = await referredRes.json();

        setAssignedPatients(assignedData);
        setReferredPatients(referredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);

        // Fallback for UI testing
        setAssignedPatients([
          { id: 1, name: 'John Doe', concern: 'Headache' },
          { id: 2, name: 'Maria Reyes', concern: 'Back Pain' },
          { id: 3, name: 'Jane Smith', concern: 'Anxiety' },
          { id: 4, name: 'Alex Johnson', concern: 'Migraine' },
          { id: 5, name: 'Maria Reyes', concern: 'Back Pain' },
          { id: 6, name: 'Jaria Reyes', concern: 'Back Pain' },
        ]);
        setReferredPatients([
          { id: 3, name: 'Jane Smith', doctor: 'Dr. Cruz', concern: 'Anxiety' },
          { id: 4, name: 'Alex Johnson', doctor: 'Dr. Tan', concern: 'Migraine' },
        ]);
      }
    };

    fetchPatients();
  }, []);

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setModalPage(1);
  };

  const handleClose = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="patients-grid">
      {/* Assigned Patients */}
      <div className="patients-card">
        <div className="patients-card-header">
          <MdPeople className="patients-icon" />
          <h3>Assigned Patients</h3>
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
            ) : assignedPatients.length === 0 ? (
              <div className="patients-empty">No assigned patients.</div>
            ) : (
              assignedPatients.map((patient) => (
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

      {/* Referred Patients */}
      <div className="patients-card">
        <div className="patients-card-header">
          <MdPersonAdd className="patients-icon" />
          <h3>Referred Patients</h3>
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
          ) : referredPatients.length === 0 ? (
            <div className="patients-empty">No referred patients.</div>
          ) : (
            referredPatients.map((patient) => (
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

      {/* Patient Modal */}
      {selectedPatient && (
        <div className="patient-modal-backdrop" onClick={handleClose}>
          <div className="patient-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>×</button>

            {/* Modal Navigation */}
            <div className="modal-nav">
              <button
                className={modalPage === 1 ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setModalPage(1)}
              >
                Patient Info
              </button>
              <button
                className={modalPage === 2 ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setModalPage(2)}
              >
                Medical Background
              </button>
              <button
                className={modalPage === 3 ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setModalPage(3)}
              >
                SOAP Note
              </button>
            </div>

            {modalPage === 1 && (
              <>
                <div className="patient-layout">
                  <div className="patient-left">
                    <img
                      src={
                        selectedPatient.profilePic ||
                        `https://ui-avatars.com/api/?name=${selectedPatient.firstName || 'Juan'}+${selectedPatient.lastName || 'Cruz'}&background=034172&color=fff&size=120`
                      }
                      alt="Profile"
                      className="profile-pic"
                    />
                    <p><strong>ID:</strong> {selectedPatient.id || '123456'}</p>
                    <h2>{selectedPatient.firstName || 'Juan'} {selectedPatient.middleName || 'Dela'} {selectedPatient.lastName || 'Cruz'}</h2>
                    <div className="action-buttons">
                      <button>Notes</button>
                      <button>Chat</button>
                      <button>Files</button>
                    </div>
                  </div>

                  <div className="patient-right">
                    <div className="patient-column">
                      <div className="field-row"><span className="field-label">First Name:</span><span className="field-value">{selectedPatient.firstName || ''}</span></div>
                      <div className="field-row"><span className="field-label">Middle Name:</span><span className="field-value">{selectedPatient.middleName || ''}</span></div>
                      <div className="field-row"><span className="field-label">Last Name:</span><span className="field-value">{selectedPatient.lastName || ''}</span></div>
                      <div className="field-row"><span className="field-label">Sex:</span><span className="field-value">{selectedPatient.sex || ''}</span></div>
                      <div className="field-row"><span className="field-label">Date of Birth:</span><span className="field-value">{selectedPatient.dob || ''}</span></div>
                      <div className="field-row"><span className="field-label">Civil Status:</span><span className="field-value">{selectedPatient.civilStatus || ''}</span></div>
                    </div>
                    <div className="patient-column">
                      <div className="field-row"><span className="field-label">Suffix:</span><span className="field-value">{selectedPatient.suffix || ''}</span></div>
                      <div className="field-row"><span className="field-label">Blood Type:</span><span className="field-value">{selectedPatient.bloodType || ''}</span></div>
                      <div className="field-row"><span className="field-label">PhilHealth No.:</span><span className="field-value">{selectedPatient.philhealth || ''}</span></div>
                      <div className="field-row"><span className="field-label">Email:</span><span className="field-value">{selectedPatient.email || ''}</span></div>
                      <div className="field-row"><span className="field-label">Primary Mobile:</span><span className="field-value">{selectedPatient.mobile || ''}</span></div>
                      <div className="field-row"><span className="field-label">Address:</span><span className="field-value">{selectedPatient.address || '300 san guillermo st. putatan, muntinlupa city'}</span></div>
                    </div>
                  </div>
                </div>

                <div className="appointment-history">
                  <h4>📅 Appointment History</h4>
                  {selectedPatient.history && selectedPatient.history.length > 0 ? (
                    <ul>
                      {selectedPatient.history.map((appt, index) => (
                        <li key={index}>- {appt.date} – {appt.reason}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No past appointments.</p>
                  )}
                  <button className="view-full-history">View Full History</button>
                </div>
              </>
            )}

            {modalPage === 2 && (
              <>
                <div className="medical-background">
                  <h2>Medical Background</h2>
                  <div className="medical-fields">
                    <div className="medical-field-container">
                      <TextField
                        label="Known Medical Condition"
                        value={selectedPatient.conditions || 'blank'}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                        inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
                        variant="outlined"
                      />
                    </div>
                    <div className="medical-field-container">
                      <TextField
                        label="Allergies"
                        value={selectedPatient.allergies || 'blank'}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                        inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
                        variant="outlined"
                      />
                    </div>
                    <div className="medical-field-container">
                      <TextField
                        label="Previous Surgeries"
                        value={selectedPatient.surgeries || 'blank'}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                        inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
                        variant="outlined"
                      />
                    </div>
                    <div className="medical-field-container">
                      <TextField
                        label="Family History"
                        value={selectedPatient.familyHistory || 'blank'}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                        inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
                        variant="outlined"
                      />
                    </div>
                    <div className="medical-field-container">
                      <TextField
                        label="Medication"
                        value={selectedPatient.medication || 'blank'}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                        inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
                        variant="outlined"
                      />
                    </div>
                    <div className="medical-field-container">
                      <TextField
                        label="Supplements"
                        value={selectedPatient.supplements || 'blank'}
                        fullWidth
                        margin="dense"
                        InputProps={{ readOnly: true }}
                        inputProps={{ tabIndex: -1, style: { pointerEvents: 'none' } }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalPage === 3 && (
              <div className="soap-note-form">
                <div className="soap-note-header">
                  <h2>SOAP Note</h2>
                </div>
                <div className="soap-note-scroll">
                  <form>
                    <TextField
                      label="Chief Complaint"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.chiefComplaint}
                      onChange={e => setSoapNote({ ...soapNote, chiefComplaint: e.target.value })}
                    />
                    <TextField
                      label="History of Illness"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.history}
                      onChange={e => setSoapNote({ ...soapNote, history: e.target.value })}
                    />

                    {/* Remarks Section with menu */}
                    <div className="remarks-section">
                      {remarksTemplate === 'file' ? (
                        <div
                          style={{
                            position: 'relative',
                            border: `2.5px solid ${textareaFocused
                                ? '#1976d2' // blue when textarea is focused
                                : remarksFileFocused
                                  ? '#212121' // black on hover
                                  : '#bdbdbd' // gray default
                              }`,
                            borderRadius: 4,
                            background: '#fff',
                            margin: '8px 0 8px 0',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            
                            minHeight: 0,
                            transition: 'border-color 0.2s, box-shadow 0.2s'
                          }}
                          onClick={() => textareaRef.current && textareaRef.current.focus()}
                          onMouseEnter={() => setRemarksFileFocused(true)}
                          onMouseLeave={() => setRemarksFileFocused(false)}
                          tabIndex={-1}
                        >
                          {/* 3-dots menu */}
                          <div style={{ position: 'absolute', top: 6, right: 8, zIndex: 2 }}>
                            <button
                              className="remarks-menu-btn"
                              title="Change template"
                              tabIndex={-1}
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                setShowRemarksMenu(v => !v);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <MoreVertIcon fontSize="small" style={{ color: '#888' }} />
                            </button>
                            {showRemarksMenu && (
                              <div className="remarks-menu-dropdown" style={{ right: 0, left: 'auto' }}>
                                <button
                                  className={remarksTemplate === 'notes' ? 'remarks-menu-option active' : 'remarks-menu-option'}
                                  onClick={() => { setRemarksTemplate('notes'); setShowRemarksMenu(false); }}
                                  type="button"
                                >
                                  Notes
                                </button>
                                <button
                                  className={remarksTemplate === 'file' ? 'remarks-menu-option active' : 'remarks-menu-option'}
                                  onClick={() => { setRemarksTemplate('file'); setShowRemarksMenu(false); }}
                                  type="button"
                                >
                                  Lab Results / File(s)
                                </button>
                                <button
                                  className={remarksTemplate === 'vitals' ? 'remarks-menu-option active' : 'remarks-menu-option'}
                                  onClick={() => { setRemarksTemplate('vitals'); setShowRemarksMenu(false); }}
                                  type="button"
                                >
                                  Vitals
                                </button>
                              </div>
                            )}
                          </div>
                          {/* Uploaded file chips */}
                          {uploadedFiles.length > 0 && (
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 6,
                              padding: '10px 12px 0 12px',
                              minHeight: 32
                            }}>
                              {uploadedFiles.map((file, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    background: '#f1f6fa',
                                    border: '1px solid #c3d2e0',
                                    borderRadius: 12,
                                    padding: '2px 10px 2px 6px',
                                    fontSize: 12,
                                    color: '#034172',
                                    marginRight: 4,
                                    marginBottom: 2,
                                    maxWidth: 120,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    position: 'relative'
                                  }}
                                  title={file.name}
                                >
                                  <AttachFileIcon style={{ fontSize: 14, marginRight: 2 }} />
                                  <span style={{ maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={e => { e.stopPropagation(); handleRemoveFile(idx); }}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: '#888',
                                      marginLeft: 6,
                                      cursor: 'pointer',
                                      fontSize: 14,
                                      lineHeight: 1,
                                      padding: 0
                                    }}
                                    title="Remove file"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                          {/* Upload button + textarea on the same row */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            padding: '8px 12px 0 12px'
                          }}>
                            <label className="upload-label" style={{ cursor: 'pointer', marginRight: 8, marginTop: 2 }}>
                              <AttachFileIcon fontSize="small" />
                              <span style={{ fontSize: 13, marginLeft: 2 }}>Upload</span>
                              <input
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                              />
                            </label>
                            <textarea
                              ref={textareaRef}
                              value={soapNote.remarks || ''}
                              onChange={e => setSoapNote({ ...soapNote, remarks: e.target.value })}
                              placeholder="Add notes or remarks for the file(s) here..."
                              style={{
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                width: '100%',
                                minHeight: 40,
                                fontSize: 15,
                                paddingTop: 4,
                                paddingBottom: 0,
                                paddingLeft: 10,
                                background: 'transparent',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box'
                              }}
                              rows={Math.max(2, (soapNote.remarks || '').split('\n').length)}
                              onFocus={() => { setRemarksFileFocused(true); setTextareaFocused(true); }}
                              onBlur={() => { setRemarksFileFocused(false); setTextareaFocused(false); }}
                            />
                          </div>
                        </div>
                      ) : (
                        <TextField
                          label={
                            remarksTemplate === 'vitals'
                              ? "Vitals"
                              : remarksTemplate === 'file'
                                ? "Lab Results / File(s)"
                                : "Remarks"
                          }
                          multiline
                          fullWidth
                          margin="dense"
                          value={soapNote.remarks || ''}
                          onChange={e => setSoapNote({ ...soapNote, remarks: e.target.value })}
                          placeholder={
                            remarksTemplate === 'notes'
                              ? "Select templates from the menu to add or attach Notes, Lab Results, Vitals"
                              : remarksTemplate === 'vitals'
                                ? "Enter vitals here..."
                                : remarksTemplate === 'file'
                                  ? "Add notes or remarks for the file(s) here..."
                                  : ""
                          }
                          InputProps={{
                            endAdornment: (
                              <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button
                                  className="remarks-menu-btn"
                                  title="Change template"
                                  tabIndex={-1}
                                  type="button"
                                  onClick={() => setShowRemarksMenu(v => !v)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    marginRight: 4,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <MoreVertIcon fontSize="small" style={{ color: '#888' }} />
                                </button>
                                {showRemarksMenu && (
                                  <div className="remarks-menu-dropdown">
                                    <button
                                      className={remarksTemplate === 'notes' ? 'remarks-menu-option active' : 'remarks-menu-option'}
                                      onClick={() => { setRemarksTemplate('notes'); setShowRemarksMenu(false); }}
                                      type="button"
                                    >
                                      Notes
                                    </button>
                                    <button
                                      className={remarksTemplate === 'file' ? 'remarks-menu-option active' : 'remarks-menu-option'}
                                      onClick={() => { setRemarksTemplate('file'); setShowRemarksMenu(false); }}
                                      type="button"
                                    >
                                      Lab Results / File(s)
                                    </button>
                                    <button
                                      className={remarksTemplate === 'vitals' ? 'remarks-menu-option active' : 'remarks-menu-option'}
                                      onClick={() => { setRemarksTemplate('vitals'); setShowRemarksMenu(false); }}
                                      type="button"
                                    >
                                      Vitals
                                    </button>
                                  </div>
                                )}
                              </div>
                            )
                          }}
                          sx={{ mb: 0 }} // <-- This removes the bottom margin
                        />
                      )}
                    </div>

                    <TextField
                      label="Objective"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.objective}
                      onChange={e => setSoapNote({ ...soapNote, objective: e.target.value })}
                      sx={{ mt: 0 }} // <-- Add this to remove extra top margin
                    />
                    <TextField
                      label="Diagnosis"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.diagnosis}
                      onChange={e => setSoapNote({ ...soapNote, diagnosis: e.target.value })}
                    />
                    <TextField
                      label="Plan"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.plan}
                      onChange={e => setSoapNote({ ...soapNote, plan: e.target.value })}
                    />
                    <div className="field-action-row">
                      <button
                        type="button"
                        className="send-btn"
                        onClick={() => {/* Send prescription logic */ }}
                      >
                        <span className="send-icon">&#10148;</span> Send to Patient
                      </button>
                    </div>
                    <TextField
                      label="Prescription"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.prescription}
                      onChange={e => setSoapNote({ ...soapNote, prescription: e.target.value })}
                    />
                    <div className="field-action-row">
                      <button
                        type="button"
                        className="send-btn"
                        onClick={() => {/* Send prescription logic */ }}
                      >
                        <span className="send-icon">&#10148;</span> Send to Patient
                      </button>
                    </div>
                    <TextField
                      label="Test Request"
                      multiline
                      fullWidth
                      margin="dense"
                      value={soapNote.testRequest || ''}
                      onChange={e => setSoapNote({ ...soapNote, testRequest: e.target.value })}
                    />

                  </form>
                  <div className="followup-section">
                    <label className="followup-label">Follow up Check-up</label>
                    <button
                      type="button"
                      className="followup-btn"
                      onClick={() => {/* Schedule follow up logic */ }}
                    >
                      <span className="plus-circle" aria-hidden="true">+</span> Schedule Follow Up
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;