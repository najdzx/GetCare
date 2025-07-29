import React, { useState } from 'react';
import { MdPeople, MdCheck, MdClose, MdSend, MdAdd, MdNote, MdSearch } from 'react-icons/md';
import './Invitations.css';
import '../../components/Layout/Scrollbar.css';

const mockInvitations = {
  incoming: [
    {
      id: 1,
      patient: 'John Doe',
      case: 'Diabetes Management',
      inviter: 'Dr. Smith',
      status: 'pending',
      date: '2024-06-01T10:00:00Z',
      access: 'Full',
      note: 'Patient has complex Type 2 diabetes with recent complications. Need cardiology consultation for cardiovascular risk assessment. Patient prefers telehealth consultations.',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      case: 'Hypertension',
      inviter: 'Dr. Brown',
      status: 'accepted',
      date: '2024-05-28T14:00:00Z',
      access: 'Read-only',
      note: 'Patient showing signs of resistant hypertension. Need nephrology consultation to assess kidney function and optimize medication.',
    },
  ],
  outgoing: [
    {
      id: 3,
      patient: 'Alice Brown',
      case: 'Cardiac Assessment',
      invitee: 'Dr. Wilson',
      status: 'pending',
      date: '2024-06-02T09:00:00Z',
      access: 'Full',
      note: 'Patient experiencing chest pain and shortness of breath. ECG shows ST elevation. Urgent cardiology consultation needed.',
      urgency: 'high',
    },
    {
      id: 4,
      patient: 'John Doe',
      case: 'Diabetes Management',
      invitee: 'Dr. Davis',
      status: 'declined',
      date: '2024-05-30T11:00:00Z',
      access: 'Read-only',
      note: 'Patient has uncontrolled blood sugar levels despite medication adjustments. Need endocrinology specialist review.',
    },
  ],
};

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

const Invitations = () => {
  const [tab, setTab] = useState('incoming');
  const [invitations, setInvitations] = useState(mockInvitations);
  const [showSendModal, setShowSendModal] = useState(false);
  const [searchSpecialist, setSearchSpecialist] = useState('');
  const [newInvitation, setNewInvitation] = useState({
    patient: '',
    case: '',
    invitee: '',
    access: 'Full',
    note: '',
    urgency: 'medium',
  });

  const handleAccept = (id) => {
    setInvitations((prev) => ({
      ...prev,
      incoming: prev.incoming.map(inv => inv.id === id ? { ...inv, status: 'accepted' } : inv),
    }));
  };
  
  const handleDecline = (id) => {
    setInvitations((prev) => ({
      ...prev,
      incoming: prev.incoming.map(inv => inv.id === id ? { ...inv, status: 'declined' } : inv),
    }));
  };
  
  const handleCancel = (id) => {
    setInvitations((prev) => ({
      ...prev,
      outgoing: prev.outgoing.map(inv => inv.id === id ? { ...inv, status: 'cancelled' } : inv),
    }));
  };

  const handleSendInvitation = () => {
    const invitation = {
      id: Date.now(),
      ...newInvitation,
      status: 'pending',
      date: new Date().toISOString(),
    };

    setInvitations((prev) => ({
      ...prev,
      outgoing: [invitation, ...prev.outgoing],
    }));

    setNewInvitation({
      patient: '',
      case: '',
      invitee: '',
      access: 'Full',
      note: '',
      urgency: 'medium',
    });
    setSearchSpecialist('');
    setShowSendModal(false);
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
    <div className="invitations-page">
      <div className="invitations-content-container">
        <div className="invitations-header-row">
          <h2><MdPeople style={{ verticalAlign: 'middle', marginRight: 8}} />Invitations</h2>
          <div className="invitations-actions">
            <button className={`invitations-tab-btn ${tab === 'incoming' ? 'active' : 'inactive'}`} onClick={() => setTab('incoming')}>Incoming</button>
            <button className={`invitations-tab-btn ${tab === 'outgoing' ? 'active' : 'inactive'}`} onClick={() => setTab('outgoing')}>Outgoing</button>
            <button className="invitation-btn primary" onClick={() => setShowSendModal(true)}>
              <MdAdd /> Send Invitation
            </button>
          </div>
        </div>
        <div className="invitations-section-title">{tab === 'incoming' ? 'Invitations you have received' : 'Invitations you have sent'}</div>
        <div style={{ marginTop: 16}}>
          {tab === 'incoming' && invitations.incoming.length === 0 && (
            <div className="invitations-empty">No incoming invitations.</div>
          )}
          {tab === 'outgoing' && invitations.outgoing.length === 0 && (
            <div className="invitations-empty">No outgoing invitations.</div>
          )}
          {tab === 'incoming' && invitations.incoming.map(inv => (
            <div key={inv.id} className="invitation-item">
              <div className="invitation-info">
                <div className="invitation-patient">{inv.patient} <span style={{ color: '#888', fontWeight: 400 }}>({inv.case})</span></div>
                <div className="invitation-meta">Invited by <b>{inv.inviter}</b> &middot; {new Date(inv.date).toLocaleString()} &middot; Access: {inv.access}</div>
                {inv.note && (
                  <div className="invitation-note">
                    <MdNote size={16} style={{ marginRight: 8, color: '#666' }} />
                    <span>{inv.note.length > 100 ? `${inv.note.substring(0, 100)}...` : inv.note}</span>
                    {inv.note.length > 100 && (
                      <button className="read-more-btn" onClick={() => alert(inv.note)}>Read more</button>
                    )}
                  </div>
                )}
              </div>
              <div className="invitation-actions">
                {inv.status === 'pending' && <>
                  <button className="invitation-btn primary" onClick={() => handleAccept(inv.id)}><MdCheck /> Accept</button>
                  <button className="invitation-btn secondary" onClick={() => handleDecline(inv.id)}><MdClose /> Decline</button>
                </>}
                {inv.status === 'accepted' && <span className="invitation-status accepted">Accepted</span>}
                {inv.status === 'declined' && <span className="invitation-status declined">Declined</span>}
              </div>
            </div>
          ))}
          {tab === 'outgoing' && invitations.outgoing.map(inv => (
            <div key={inv.id} className="invitation-item">
              <div className="invitation-info">
                <div className="invitation-patient">
                  {inv.invitee} <span style={{ color: '#888', fontWeight: 400 }}>({inv.patient} - {inv.case})</span>
                  {inv.urgency && (
                    <span 
                      className="urgency-badge" 
                      style={{ 
                        backgroundColor: urgencyColors[inv.urgency],
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        marginLeft: '8px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {inv.urgency}
                    </span>
                  )}
                </div>
                <div className="invitation-meta">Sent on {new Date(inv.date).toLocaleString()} &middot; Access: {inv.access}</div>
                {inv.note && (
                  <div className="invitation-note">
                    <MdNote size={16} style={{ marginRight: 8, color: '#666' }} />
                    <span>{inv.note.length > 100 ? `${inv.note.substring(0, 100)}...` : inv.note}</span>
                    {inv.note.length > 100 && (
                      <button className="read-more-btn" onClick={() => alert(inv.note)}>Read more</button>
                    )}
                  </div>
                )}
              </div>
              <div className="invitation-actions">
                {inv.status === 'pending' && <button className="invitation-btn secondary" onClick={() => handleCancel(inv.id)}><MdClose /> Cancel</button>}
                {inv.status === 'accepted' && <span className="invitation-status accepted">Accepted</span>}
                {inv.status === 'declined' && <span className="invitation-status declined">Declined</span>}
                {inv.status === 'cancelled' && <span className="invitation-status cancelled">Cancelled</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Invitation Modal */}
      {showSendModal && (
        <div className="modal-overlay" onClick={() => setShowSendModal(false)}>
          <div className="modal-content custom-scrollbar" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Send Specialist Invitation</h3>
              <button className="modal-close" onClick={() => setShowSendModal(false)}>
                <MdClose />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={newInvitation.patient}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, patient: e.target.value }))}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="form-group">
                <label>Case/Condition</label>
                <input
                  type="text"
                  value={newInvitation.case}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, case: e.target.value }))}
                  placeholder="e.g., Diabetes Management, Cardiac Assessment"
                />
              </div>
              <div className="form-group">
                <label>Search & Select Specialist</label>
                <div className="specialist-search-container">
                  <input
                    type="text"
                    value={searchSpecialist}
                    onChange={(e) => setSearchSpecialist(e.target.value)}
                    placeholder="Search by name or specialty..."
                    className="specialist-search-input"
                  />
                  <div className="specialists-grid custom-scrollbar">
                    {filteredSpecialists.map(specialist => (
                      <div
                        key={specialist.id}
                        className={`specialist-card ${newInvitation.invitee === specialist.name ? 'selected' : ''} ${!specialist.available ? 'unavailable' : ''}`}
                        onClick={() => {
                          if (specialist.available) {
                            setNewInvitation(prev => ({ ...prev, invitee: specialist.name }));
                          }
                        }}
                      >
                        <div className="specialist-card-header">
                          <div className="specialist-avatar">{specialist.avatar}</div>
                          <div className="specialist-status">
                            {specialist.available ? (
                              <span className="status-available">Available</span>
                            ) : (
                              <span className="status-unavailable">Unavailable</span>
                            )}
                          </div>
                        </div>
                        <div className="specialist-card-body">
                          <h4 className="specialist-name">{specialist.name}</h4>
                          <p className="specialist-specialty">{specialist.specialty}</p>
                          <div className="specialist-details">
                            <span className="specialist-rating">⭐ {specialist.rating}</span>
                            <span className="specialist-experience">{specialist.experience}</span>
                          </div>
                        </div>
                        {newInvitation.invitee === specialist.name && (
                          <div className="specialist-selected">
                            <MdCheck />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Access Level</label>
                  <select
                    value={newInvitation.access}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, access: e.target.value }))}
                  >
                    <option value="Full">Full Access</option>
                    <option value="Read-only">Read-only</option>
                  </select>
                </div>
                <div className="form-group">
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
              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea
                  value={newInvitation.note}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="Provide context about the case, why this specialist is needed, or any specific concerns..."
                  rows={4}
                  maxLength={500}
                />
                <div className="char-count">{newInvitation.note.length}/500</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="invitation-btn secondary" onClick={() => setShowSendModal(false)}>
                Cancel
              </button>
              <button 
                className="invitation-btn primary" 
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

export default Invitations; 