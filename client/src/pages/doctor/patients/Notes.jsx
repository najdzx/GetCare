import React from 'react';
import styles from './Patients.module.css';

const Notes = () => {
  // Local notes state for demo/standalone use
  const [notes, setNotes] = React.useState([
    {
      id: 1,
      doctorName: 'Dr. Daniel Cruz',
      date: '2025-07-30T10:15:00',
      subject: 'Follow-up on blood pressure',
      content: 'Patient is recovering well. Continue current medication and monitor blood pressure daily.',
      files: [
        { name: 'BP Chart.pdf', url: '#' }
      ]
    },
    {
      id: 2,
      doctorName: 'Dr. Maria Santos',
      date: '2025-07-28T14:45:00',
      subject: 'Lab results review',
      content: 'Reviewed lab results. No abnormalities detected. Recommend routine follow-up in 3 months.',
      files: [
        { name: 'LabResults2025.pdf', url: '#' }
      ]
    }
  ]);
  const [selectedNoteId, setSelectedNoteId] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    date: new Date().toISOString().slice(0, 10),
    subject: '',
    content: '',
    visibility: 'all',
    files: []
  });
  const sortedNotes = notes.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const selectedNote = sortedNotes.find(n => n.id === selectedNoteId);

  // Drag-and-drop file upload handlers
  const fileInputRef = React.useRef();
  const [dragActive, setDragActive] = React.useState(false);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };
  const removeFile = (idx) => {
    setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData(prev => ({ ...prev, files: [...prev.files, ...Array.from(e.dataTransfer.files)] }));
    }
  };
  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Add note button handler
  const handleAddNote = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({
      date: new Date().toISOString().slice(0, 10),
      subject: '',
      content: '',
      visibility: 'all',
      files: []
    });
  };

  // Edit note button handler
  const handleEditNote = (id) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setIsEditing(true);
      setIsAdding(false);
      setFormData({
        date: note.date ? note.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
        subject: note.subject || '',
        content: note.content,
        visibility: note.visibility || 'all',
        files: note.files || []
      });
      setSelectedNoteId(id);
    }
  };

  // Save note handler
  const handleSaveNote = (e) => {
    e && e.preventDefault();
    if (isEditing) {
      setNotes(prev => prev.map(n => n.id === selectedNoteId ? {
        ...n,
        date: formData.date ? new Date(formData.date).toISOString() : n.date,
        subject: formData.subject,
        content: formData.content,
        visibility: formData.visibility,
        files: formData.files
      } : n));
    } else {
      const newNote = {
        id: Date.now(),
        doctorName: 'Dr. Daniel Cruz',
        date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
        subject: formData.subject,
        content: formData.content,
        visibility: formData.visibility,
        files: formData.files
      };
      setNotes(prev => [newNote, ...prev]);
      setSelectedNoteId(newNote.id);
    }
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ date: new Date().toISOString().slice(0, 10), subject: '', content: '', visibility: 'all', files: [] });
  };

  // Delete note handler
  const handleDeleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(n => n.id !== id));
      setSelectedNoteId(prev => {
        const remaining = notes.filter(n => n.id !== id);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  };

  return (
    <div className={styles['notes-container']}>
      <div className={styles['notes-left-panel'] + ' custom-scrollbar'}>
        <div className={styles['visits-header']}>
          <h3>Notes</h3>
          <button 
            className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-small']}`}
            onClick={handleAddNote}
            disabled={isAdding || isEditing}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: '6px'}}>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add Note
          </button>
        </div>
        <div className={styles['visits-list']}>
          {sortedNotes.length > 0 ? (
            sortedNotes.map(note => (
              <div
                key={note.id}
                className={
                  `${styles['note-date-item']} ${selectedNoteId === note.id ? styles.active : ''}`
                }
                onClick={() => setSelectedNoteId(note.id)}
                title={note.subject || ''}
              >
                <div style={{ fontWeight: 500 }}>
                  {note.date ? new Date(note.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No Date'}
                </div>
                <div style={{ fontSize: '13px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {note.subject || <span style={{ color: '#bbb' }}>(No subject)</span>}
                </div>
              </div>
            ))
          ) : (
            <div className={styles['empty-notes-state']}><p>No notes available.</p></div>
          )}
        </div>
      </div>
        <div className={styles['notes-right-panel'] + ' custom-scrollbar'}>
          <div className={styles['soap-form-header']}>
            <h3>
              {isAdding
                ? 'Add New Note'
                : selectedNote
                  ? `${selectedNote.doctorName || (selectedNote.type === 'assigned' ? 'Assigned Doctor' : 'Doctor')} - ${selectedNote.date ? new Date(selectedNote.date).toLocaleDateString() : ''}`
                  : 'Select a note date'}
            </h3>
          </div>
          <div className={styles['soap-form-content']}>
            {(isAdding || isEditing) ? (
              <form className={styles['soap-section']} onSubmit={handleSaveNote}>
                {(isAdding || isEditing) && (
                  <div className={styles['soap-section']} style={{ marginBottom: 12 }}>
                    <label className={styles['soap-title']} htmlFor="note-date">Date</label>
                    <input
                      id="note-date"
                      type="date"
                      className={styles['form-input']}
                      value={formData.date}
                      onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                )}
                <div className={styles['soap-section']}>
                  <label className={styles['soap-title']}>Subject/Title</label>
                  <input
                    type="text"
                    className={styles['form-input']}
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles['soap-section']}>
                  <label className={styles['soap-title']}>Type of Note</label>
                  <select
                    className={styles['form-select']}
                    value={formData.type || ''}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="followup">Follow-up</option>
                    <option value="lab">Lab Result</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles['soap-section']}>
                  <label className={styles['soap-title']}>Content</label>
                  <textarea
                    className={styles['form-textarea']}
                    value={formData.content}
                    onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles['soap-section']}>
                  <label className={styles['soap-title']}>Visibility</label>
                  <select
                    className={styles['form-select']}
                    value={formData.visibility}
                    onChange={e => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                  >
                    <option value="all">All</option>
                    <option value="patient">Patient Only</option>
                    <option value="doctors">Doctors Only</option>
                  </select>
                </div>
                <div className={styles['soap-section']}>
                  <label className={styles['soap-title']}>Attachments</label>
                  <div
                    className={
                      styles['file-upload-area'] + (dragActive ? ' ' + styles['dragover'] : '')
                    }
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    tabIndex={0}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <div style={{ color: '#888', fontSize: 14 }}>
                      Drag & drop files here or <span style={{ color: '#434bb8', textDecoration: 'underline' }}>browse</span>
                    </div>
                  </div>
                  {formData.files.length > 0 && (
                    <div className={styles['uploaded-files']}>
                      {formData.files.map((file, idx) => (
                        <div key={idx} className={styles['file-item']}>
                          <span className={styles['file-name']}>{file.name}</span>
                          <button type="button" className={styles['file-remove']} onClick={e => { e.stopPropagation(); removeFile(idx); }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles['soap-form-actions']}>
                  <button type="submit" className="global-btn2">Save</button>
                  <button type="button" className="global-btn2" onClick={() => { setIsAdding(false); setIsEditing(false); }}>Cancel</button>
                </div>
              </form>
            ) : selectedNote ? (
              <div className={styles['note-details']} style={{ padding: 0, margin: 0 }}>
                <div className={styles['soap-section']} style={{ marginBottom: 18 }}>
                  <label className={styles['soap-title']} htmlFor="note-view-subject">Subject/Title</label>
                  <input
                    id="note-view-subject"
                    type="text"
                    className={styles['form-input']}
                    value={selectedNote.subject || ''}
                    readOnly
                    style={{ marginBottom: 10 }}
                  />
                </div>
                <div className={styles['soap-section']} style={{ marginBottom: 18 }}>
                  <label className={styles['soap-title']} htmlFor="note-view-content">Content</label>
                  <textarea
                    id="note-view-content"
                    className={styles['form-textarea']}
                    value={selectedNote.content || ''}
                    readOnly
                    style={{ resize: 'vertical' }}
                  />
                </div>
                {selectedNote.files && selectedNote.files.length > 0 && (
                  <div className={styles['soap-section']} style={{ marginBottom: 16 }}>
                    <label className={styles['soap-title']}>Attachments</label>
                    <div className={styles['uploaded-files']}>
                      {selectedNote.files.map((file, idx) => (
                        <div key={idx} className={styles['file-item']}>
                          <span className={styles['file-name']}>{file.name}</span>
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className={styles['file-link']} style={{ marginLeft: 8 }}>View</a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={styles['note-actions']} style={{ display: 'flex', gap: 10 }}>
                  <button className="global-btn2" onClick={() => handleEditNote(selectedNote.id)}>Edit</button>
                  <button className="global-btn2" onClick={() => handleDeleteNote(selectedNote.id)}>Delete</button>
                </div>
              </div>
            ) : (
              <div className={styles['empty-notes-state']}><p>Select a note date to view details.</p></div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Notes;
