import React, { useState } from 'react';
import { MdPerson, MdAdd, MdPeople, MdAttachFile, MdClose, MdSend, MdNote, MdCheck, MdSchedule, MdSearch } from 'react-icons/md';
import styles from './Notes.module.css';
import '../../components/Layout/Scrollbar.css';

const mockMyPatients = [
  { id: 1, name: 'John Doe', case: 'Diabetes Management', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-15', type: 'primary' },
  { id: 2, name: 'Jane Smith', case: 'Hypertension', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-14', type: 'primary' },
  { id: 6, name: 'Michael Chen', case: 'Asthma Management', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-17', type: 'primary' },
  { id: 7, name: 'Sarah Wilson', case: 'Depression Treatment', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-16', type: 'primary' },
  { id: 10, name: 'Robert Taylor', case: 'Chronic Pain Management', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-20', type: 'primary' },
  { id: 11, name: 'Lisa Anderson', case: 'Sleep Disorder', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-21', type: 'primary' },
  { id: 12, name: 'James Wilson', case: 'Heart Disease', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-22', type: 'primary' },
  { id: 13, name: 'Maria Garcia', case: 'Thyroid Issues', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-23', type: 'primary' },
  { id: 14, name: 'Thomas Brown', case: 'Arthritis Treatment', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-24', type: 'primary' },
  { id: 15, name: 'Jennifer Lee', case: 'Migraine Management', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-25', type: 'primary' },
];

const mockConsultations = [
  { id: 3, name: 'Alice Brown', case: 'Cardiac Assessment', primaryDoctor: 'Dr. Wilson', status: 'Active', lastVisit: '2024-01-16', type: 'consultation', access: 'Full' },
  { id: 4, name: 'Bob Johnson', case: 'Neurological Review', primaryDoctor: 'Dr. Davis', status: 'Active', lastVisit: '2024-01-13', type: 'consultation', access: 'Read-only' },
  
  { id: 8, name: 'David Lee', case: 'Dermatology Review', primaryDoctor: 'Dr. Martinez', status: 'Active', lastVisit: '2024-01-18', type: 'consultation', access: 'Full' },
  { id: 9, name: 'Emily Davis', case: 'Psychiatric Evaluation', primaryDoctor: 'Dr. Rodriguez', status: 'Active', lastVisit: '2024-01-19', type: 'consultation', access: 'Read-only' },
  { id: 16, name: 'Frank Miller', case: 'Oncology Review', primaryDoctor: 'Dr. Thompson', status: 'Active', lastVisit: '2024-01-26', type: 'consultation', access: 'Full' },
  { id: 17, name: 'Grace Kim', case: 'Rheumatology Consultation', primaryDoctor: 'Dr. Johnson', status: 'Active', lastVisit: '2024-01-27', type: 'consultation', access: 'Read-only' },
  { id: 18, name: 'Henry Park', case: 'Gastroenterology Review', primaryDoctor: 'Dr. Williams', status: 'Active', lastVisit: '2024-01-28', type: 'consultation', access: 'Full' },
  { id: 19, name: 'Irene Santos', case: 'Pulmonology Assessment', primaryDoctor: 'Dr. Moore', status: 'Active', lastVisit: '2024-01-29', type: 'consultation', access: 'Read-only' },
  { id: 20, name: 'Kevin O\'Connor', case: 'Urology Consultation', primaryDoctor: 'Dr. Clark', status: 'Active', lastVisit: '2024-01-30', type: 'consultation', access: 'Full' },
];

const mockNotes = [
  { id: 1, patientId: 1, title: 'Initial Consultation', content: 'Discussed lifestyle modifications.', author: 'Dr. Smith', timestamp: '2024-01-15T10:00:00Z', type: 'Consultation', visibility: 'Patient-visible', attachments: [] },
  { id: 2, patientId: 1, title: 'Follow-up', content: 'Patient reports improvement.', author: 'Dr. Smith', timestamp: '2024-01-20T10:00:00Z', type: 'Progress', visibility: 'Doctor-only', attachments: ['lab_report.pdf'] },
  { id: 3, patientId: 3, title: 'Cardiology Review', content: 'Reviewed cardiac assessment. Patient shows signs of improvement.', author: 'Dr. Smith', timestamp: '2024-01-16T14:00:00Z', type: 'Consultation', visibility: 'Collaborative team only', attachments: [] },
];

const mockSpecialists = [
  { id: 1, name: 'Dr. Johnson', specialty: 'Endocrinologist', available: true, rating: 4.8, experience: '15 years', avatar: 'JJ' },
  { id: 2, name: 'Dr. Brown', specialty: 'Cardiologist', available: true, rating: 4.9, experience: '12 years', avatar: 'DB' },
  { id: 3, name: 'Dr. Wilson', specialty: 'Neurologist', available: false, rating: 4.7, experience: '18 years', avatar: 'DW' },
  { id: 4, name: 'Dr. Davis', specialty: 'Nephrologist', available: true, rating: 4.6, experience: '10 years', avatar: 'DD' },
  { id: 5, name: 'Dr. Garcia', specialty: 'Dermatologist', available: true, rating: 4.5, experience: '8 years', avatar: 'DG' },
  { id: 6, name: 'Dr. Martinez', specialty: 'Oncologist', available: true, rating: 4.9, experience: '20 years', avatar: 'DM' },
  { id: 7, name: 'Dr. Rodriguez', specialty: 'Psychiatrist', available: true, rating: 4.4, experience: '14 years', avatar: 'DR' },
  { id: 8, name: 'Dr. Thompson', specialty: 'Rheumatologist', available: false, rating: 4.8, experience: '16 years', avatar: 'DT' },
];

const noteTypes = ['Consultation', 'Progress', 'Lab Result', 'Prescription', 'Referral'];
const visibilities = ['Patient-visible', 'Doctor-only', 'Collaborative team only'];

const Notes = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState(mockNotes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', type: noteTypes[0], visibility: visibilities[0], attachments: [] });
  const [searchSpecialist, setSearchSpecialist] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [newInvitation, setNewInvitation] = useState({
    patient: '',
    case: '',
    invitee: '',
    access: 'Full',
    note: '',
    urgency: 'medium',
  });

  const allPatients = [...mockMyPatients, ...mockConsultations];
  const filteredNotes = selectedPatient
    ? notes.filter(note => note.patientId === selectedPatient.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    : [];

  // Filter patients based on search
  const filteredMyPatients = mockMyPatients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.case.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredConsultations = mockConsultations.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.case.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handleAddNote = () => {
    if (!selectedPatient || !newNote.title || !newNote.content) return;
    setNotes([
      {
        ...newNote,
        id: Date.now(),
        patientId: selectedPatient.id,
        author: 'Dr. Smith',
        timestamp: new Date().toISOString(),
      },
      ...notes,
    ]);
    setShowAddModal(false);
    setNewNote({ title: '', content: '', type: noteTypes[0], visibility: visibilities[0], attachments: [] });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map(f => f.name);
    setNewNote({ ...newNote, attachments: [...newNote.attachments, ...files] });
  };

  const handleRemoveAttachment = (file) => {
    setNewNote({ ...newNote, attachments: newNote.attachments.filter(f => f !== file) });
  };

  const handleOpenInviteModal = () => {
    if (selectedPatient) {
      setNewInvitation({
        patient: selectedPatient.name,
        case: selectedPatient.case,
        invitee: '',
        access: 'Full',
        note: `Patient: ${selectedPatient.name}\nCase: ${selectedPatient.case}\n\nPlease review this case and provide specialist consultation.`,
        urgency: 'medium',
      });
    }
    setShowInviteModal(true);
  };

  const handleSendInvitation = () => {
    // Here you would typically send the invitation to your backend
    // For now, we'll just close the modal and show a success message
    alert(`Invitation sent to ${newInvitation.invitee} for ${newInvitation.patient}`);
    setShowInviteModal(false);
    setNewInvitation({
      patient: '',
      case: '',
      invitee: '',
      access: 'Full',
      note: '',
      urgency: 'medium',
    });
  };

  const filteredSpecialists = mockSpecialists.filter(s =>
    s.name.toLowerCase().includes(searchSpecialist.toLowerCase()) ||
    s.specialty.toLowerCase().includes(searchSpecialist.toLowerCase())
  );

  const urgencyColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545',
  };

  return (
    <div className={styles.notesPage}>
      <div className={styles.notesSidebar}>
        <div className={styles.sidebarSection}>
          <div className={styles.searchBar}>
            <MdSearch size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
          </div>
          <h3>My Patients</h3>
          <div className={`${styles.patientList} custom-scrollbar`}>
            {filteredMyPatients.map(patient => (
              <div
                key={patient.id}
                className={`${styles.patientItem} ${selectedPatient?.id === patient.id ? styles.active : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <span className={styles.patientAvatar}>
                  <MdPerson size={24} />
                </span>
                <div className={styles.patientInfo}>
                  <div className={styles.patientName}>{patient.name}</div>
                  <div className={styles.patientCase}>{patient.case}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidebarSection}>
          <h3>Shared Cases</h3>
          <div className={`${styles.patientList} custom-scrollbar`}>
            {filteredConsultations.map(patient => (
              <div
                key={patient.id}
                className={`${styles.patientItem} ${selectedPatient?.id === patient.id ? styles.active : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <span className={styles.patientAvatar}>
                  <MdPerson size={24} />
                </span>
                <div className={styles.patientInfo}>
                  <div className={styles.patientName}>{patient.name}</div>
                  <div className={styles.patientCase}>{patient.case}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.notesContentContainer}>
          {selectedPatient ? (
            <>
              <div className={styles.notesHeaderRow}>
                <div>
                  <h2>{selectedPatient.name}</h2>
                  <div className={styles.notesCaseTitle}>
                    {selectedPatient.case}
                                         {selectedPatient.type === 'consultation' && (
                       <span className={styles.consultationBadge}>
                         Shared Case • {selectedPatient.access} Access
                       </span>
                     )}
                  </div>
                </div>
                <div className={styles.notesActions}>
                  {selectedPatient.type === 'primary' && (
                    <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleOpenInviteModal}><MdPeople /> Invite Specialist</button>
                  )}
                  <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setShowAddModal(true)}><MdAdd /> Add Note</button>
                </div>
              </div>
              <h4 className={styles.notesSectionTitle}>Notes Timeline</h4>
              {filteredNotes.length === 0 && <div className={styles.notesEmpty}>No notes for this patient.</div>}
              {filteredNotes.map(note => (
                <div key={note.id} className={styles.noteItem}>
                  <div className={styles.noteTitleRow}>
                    <div className={styles.noteTitle}>{note.title}</div>
                    <span className={`${styles.noteTypePill} ${styles[`noteType${note.type.replace(/ /g, '')}`]}`}>{note.type}</span>
                    <span className={`${styles.noteVisibilityPill} ${styles[`noteVisibility${note.visibility.replace(/ /g, '')}`]}`}>{note.visibility}</span>
                  </div>
                  <div className={styles.noteContent}>{note.content}</div>
                  <div className={styles.noteMeta}>By {note.author} on {new Date(note.timestamp).toLocaleString()}</div>
                  {note.attachments && note.attachments.length > 0 && (
                    <div className="note-attachments">
                      <MdAttachFile /> {note.attachments.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className={styles.noSelection}>
              <MdPerson size={48} />
              <div style={{ marginTop: 16 }}>Select a patient to view notes</div>
            </div>
          )}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Add Note</h3>
              <button className={styles.btnIcon} onClick={() => setShowAddModal(false)}><MdClose /></button>
            </div>
            <div className={`${styles.modalBody} custom-scrollbar`}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input type="text" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label>Type</label>
                <select value={newNote.type} onChange={e => setNewNote({ ...newNote, type: e.target.value })}>
                  {noteTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} rows={4} />
              </div>
              <div className={styles.formGroup}>
                <label>Visibility</label>
                <select value={newNote.visibility} onChange={e => setNewNote({ ...newNote, visibility: e.target.value })}>
                  {visibilities.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Attachments</label>
                <input type="file" multiple onChange={handleFileChange} />
                <div className={styles.attachmentsList}>
                  {newNote.attachments.map(file => (
                    <span key={file} className={styles.attachmentChip}>{file} <button onClick={() => handleRemoveAttachment(file)}><MdClose size={14} /></button></span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAddNote} disabled={!newNote.title || !newNote.content}><MdSend /> Save Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Invite Specialist Modal */}
      {showInviteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowInviteModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Invite Specialist</h3>
              <button className={styles.modalClose} onClick={() => setShowInviteModal(false)}>
                <MdClose />
              </button>
            </div>
            <div className={`${styles.modalBody} custom-scrollbar`}>
              <div className={styles.formGroup}>
                <label>Patient Name</label>
                <input
                  type="text"
                  value={newInvitation.patient}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, patient: e.target.value }))}
                  placeholder="Enter patient name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Case/Condition</label>
                <input
                  type="text"
                  value={newInvitation.case}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, case: e.target.value }))}
                  placeholder="e.g., Diabetes Management, Cardiac Assessment"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Search & Select Specialist</label>
                <div className={styles.specialistSearchContainer}>
                  <input
                    type="text"
                    value={searchSpecialist}
                    onChange={(e) => setSearchSpecialist(e.target.value)}
                    placeholder="Search by name or specialty..."
                    className={styles.specialistSearchInput}
                  />
                  <div className={`${styles.specialistsGrid} custom-scrollbar`}>
                    {filteredSpecialists.map(specialist => (
                      <div
                        key={specialist.id}
                        className={`${styles.specialistCard} ${newInvitation.invitee === specialist.name ? styles.selected : ''} ${!specialist.available ? styles.unavailable : ''}`}
                        onClick={() => {
                          if (specialist.available) {
                            setNewInvitation(prev => ({ ...prev, invitee: specialist.name }));
                          }
                        }}
                      >
                        <div className={styles.specialistCardHeader}>
                          <div className={styles.specialistAvatar}>{specialist.avatar}</div>
                          <div className={styles.specialistStatus}>
                            {specialist.available ? (
                              <span className={styles.statusAvailable}>Available</span>
                            ) : (
                              <span className={styles.statusUnavailable}>Unavailable</span>
                            )}
                          </div>
                        </div>
                        <div className={styles.specialistCardBody}>
                          <h4 className={styles.specialistName}>{specialist.name}</h4>
                          <p className={styles.specialistSpecialty}>{specialist.specialty}</p>
                          <div className={styles.specialistDetails}>
                            <span className={styles.specialistRating}>⭐ {specialist.rating}</span>
                            <span className={styles.specialistExperience}>{specialist.experience}</span>
                          </div>
                        </div>
                        {newInvitation.invitee === specialist.name && (
                          <div className={styles.specialistSelected}>
                            <MdCheck />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Access Level</label>
                  <select
                    value={newInvitation.access}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, access: e.target.value }))}
                  >
                    <option value="Full">Full Access</option>
                    <option value="Read-only">Read-only</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Urgency</label>
                  <select
                    value={newInvitation.urgency}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, urgency: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Note (Optional)</label>
                <textarea
                  value={newInvitation.note}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="Provide context about the case, why this specialist is needed, or any specific concerns..."
                  rows={4}
                  maxLength={500}
                />
                <div className={styles.charCount}>{newInvitation.note.length}/500</div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowInviteModal(false)}>
                Cancel
              </button>
              <button 
                className={`${styles.btn} ${styles.btnPrimary}`} 
                onClick={handleSendInvitation}
                disabled={!newInvitation.patient || !newInvitation.case || !newInvitation.invitee}
              >
                <MdSend /> Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;