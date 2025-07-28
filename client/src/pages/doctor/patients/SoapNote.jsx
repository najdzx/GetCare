import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const SoapNote = ({ soapNote, setSoapNote, uploadedFiles, setUploadedFiles }) => {
  const [remarksTemplate, setRemarksTemplate] = useState('notes');
  const [showRemarksMenu, setShowRemarksMenu] = useState(false);
  const textareaRef = useRef();
  const [remarksFileFocused, setRemarksFileFocused] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);

  const handleFileChange = (e) => {
    setUploadedFiles(prev =>
      [...prev, ...Array.from(e.target.files)]
        .filter((file, idx, arr) =>
          arr.findIndex(f => f.name === file.name && f.size === file.size) === idx
        )
    );
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  return (
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
                      ? '#1976d2'
                      : remarksFileFocused
                        ? '#212121'
                        : '#bdbdbd'
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
                        className={remarksTemplate === 'notes' ? 'remarks-menu-option-active' : 'remarks-menu-option'}
                        onClick={() => { setRemarksTemplate('notes'); setShowRemarksMenu(false); }}
                        type="button"
                      >
                        Notes
                      </button>
                      <button
                        className={remarksTemplate === 'file' ? 'remarks-menu-option-active' : 'remarks-menu-option'}
                        onClick={() => { setRemarksTemplate('file'); setShowRemarksMenu(false); }}
                        type="button"
                      >
                        Lab Results / File(s)
                      </button>
                      <button
                        className={remarksTemplate === 'vitals' ? 'remarks-menu-option-active' : 'remarks-menu-option'}
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
                            className={remarksTemplate === 'notes' ? 'remarks-menu-option-active' : 'remarks-menu-option'}
                            onClick={() => { setRemarksTemplate('notes'); setShowRemarksMenu(false); }}
                            type="button"
                          >
                            Notes
                          </button>
                          <button
                            className={remarksTemplate === 'file' ? 'remarks-menu-option-active' : 'remarks-menu-option'}
                            onClick={() => { setRemarksTemplate('file'); setShowRemarksMenu(false); }}
                            type="button"
                          >
                            Lab Results / File(s)
                          </button>
                          <button
                            className={remarksTemplate === 'vitals' ? 'remarks-menu-option-active' : 'remarks-menu-option'}
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
                sx={{ mb: 0 }}
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
            sx={{ mt: 0 }}
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
              onClick={() => {/* Send prescription logic */}}
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
              onClick={() => {/* Send prescription logic */}}
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
            onClick={() => {/* Schedule follow up logic */}}
          >
            <span className="plus-circle" aria-hidden="true">+</span> Schedule Follow Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoapNote; 