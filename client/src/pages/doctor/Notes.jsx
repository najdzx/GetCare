import React, { useState } from 'react';
import { MdPerson, MdAdd, MdPeople, MdAttachFile, MdClose, MdSend } from 'react-icons/md';
import './Notes.css';

const mockPatients = [
  { id: 1, name: 'John Doe', case: 'Diabetes Management', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-15' },
  { id: 2, name: 'Jane Smith', case: 'Hypertension', primaryDoctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-14' },
];

const mockNotes = [
  { id: 1, patientId: 1, title: 'Initial Consultation', content: 'Discussed lifestyle modifications.', author: 'Dr. Smith', timestamp: '2024-01-15T10:00:00Z', type: 'Consultation', visibility: 'Patient-visible', attachments: [] },
  { id: 2, patientId: 1, title: 'Follow-up', content: 'Patient reports improvement.', author: 'Dr. Smith', timestamp: '2024-01-20T10:00:00Z', type: 'Progress', visibility: 'Doctor-only', attachments: ['lab_report.pdf'] },
];

const mockSpecialists = [
  { id: 1, name: 'Dr. Johnson', specialty: 'Endocrinologist', available: true },
  { id: 2, name: 'Dr. Brown', specialty: 'Cardiologist', available: true },
  { id: 3, name: 'Dr. Wilson', specialty: 'Neurologist', available: false },
];

const noteTypes = ['Consultation', 'Progress', 'Lab Result', 'Prescription', 'Referral'];
const visibilities = ['Patient-visible', 'Doctor-only', 'Collaborative team only'];

const Notes = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState(mockNotes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', type: noteTypes[0], visibility: visibilities[0], attachments: [] });
  const [selectedSpecialists, setSelectedSpecialists] = useState([]);
  const [searchSpecialist, setSearchSpecialist] = useState('');

  const filteredNotes = selectedPatient
    ? notes.filter(note => note.patientId === selectedPatient.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    : [];

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

  const filteredSpecialists = mockSpecialists.filter(s =>
    s.name.toLowerCase().includes(searchSpecialist.toLowerCase()) ||
    s.specialty.toLowerCase().includes(searchSpecialist.toLowerCase())
  );

  return (
    <div className="notes-page">
      <div className="notes-sidebar">
        <h3>Patients</h3>
        <div className="patient-list">
          {mockPatients.map(patient => (
            <div
              key={patient.id}
              className={
                'patient-item' + (selectedPatient?.id === patient.id ? ' active' : '')
              }
              onClick={() => setSelectedPatient(patient)}
            >
              <span className="patient-avatar">
                <MdPerson size={24} />
              </span>
              <div className="patient-info">
                <div className="patient-name">{patient.name}</div>
                <div className="patient-case">{patient.case}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-content-container">
          {selectedPatient ? (
            <>
              <div className="notes-header-row">
                <div>
                  <h2>{selectedPatient.name}</h2>
                  <div className="notes-case-title">{selectedPatient.case}</div>
                </div>
                <div className="notes-actions">
                  <button className="btn btn-secondary" onClick={() => setShowInviteModal(true)}><MdPeople /> Invite Specialist</button>
                  <button className="btn btn-primary" onClick={() => setShowAddModal(true)}><MdAdd /> Add Note</button>
                </div>
              </div>
              <h4 className="notes-section-title">Notes Timeline</h4>
              {filteredNotes.length === 0 && <div className="notes-empty">No notes for this patient.</div>}
              {filteredNotes.map(note => (
                <div key={note.id} className="note-item">
                  <div className="note-title-row">
                    <div className="note-title">{note.title}</div>
                    <span className={`note-type-pill note-type-${note.type.toLowerCase().replace(/ /g, '-')}`}>{note.type}</span>
                    <span className={`note-visibility-pill note-visibility-${note.visibility.toLowerCase().replace(/ /g, '-')}`}>{note.visibility}</span>
                  </div>
                  <div className="note-content">{note.content}</div>
                  <div className="note-meta">By {note.author} on {new Date(note.timestamp).toLocaleString()}</div>
                  {note.attachments && note.attachments.length > 0 && (
                    <div className="note-attachments">
                      <MdAttachFile /> {note.attachments.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="no-selection">
              <MdPerson size={48} />
              <div style={{ marginTop: 16 }}>Select a patient to view notes</div>
            </div>
          )}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Note</h3>
              <button className="btn-icon" onClick={() => setShowAddModal(false)}><MdClose /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={newNote.type} onChange={e => setNewNote({ ...newNote, type: e.target.value })}>
                  {noteTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} rows={4} />
              </div>
              <div className="form-group">
                <label>Visibility</label>
                <select value={newNote.visibility} onChange={e => setNewNote({ ...newNote, visibility: e.target.value })}>
                  {visibilities.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Attachments</label>
                <input type="file" multiple onChange={handleFileChange} />
                <div className="attachments-list">
                  {newNote.attachments.map(file => (
                    <span key={file} className="attachment-chip">{file} <button onClick={() => handleRemoveAttachment(file)}><MdClose size={14} /></button></span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddNote} disabled={!newNote.title || !newNote.content}><MdSend /> Save Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Specialist Modal */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Invite Specialist</h3>
              <button className="btn-icon" onClick={() => setShowInviteModal(false)}><MdClose /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Search Specialists</label>
                <input type="text" value={searchSpecialist} onChange={e => setSearchSpecialist(e.target.value)} placeholder="Type name or specialty..." />
              </div>
              <div className="form-group">
                <label>Available Specialists</label>
                <div className="specialists-list">
                  {filteredSpecialists.map(s => (
                    <label key={s.id} className={`specialist-item${selectedSpecialists.includes(s.id) ? ' selected' : ''}${!s.available ? ' unavailable' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedSpecialists.includes(s.id)}
                        disabled={!s.available}
                        onChange={() => {
                          if (selectedSpecialists.includes(s.id)) {
                            setSelectedSpecialists(selectedSpecialists.filter(id => id !== s.id));
                          } else {
                            setSelectedSpecialists([...selectedSpecialists, s.id]);
                          }
                        }}
                      />
                      <span>{s.name} ({s.specialty}) {s.available ? '' : '(Unavailable)'}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowInviteModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowInviteModal(false)} disabled={selectedSpecialists.length === 0}><MdSend /> Send Invitation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes; 