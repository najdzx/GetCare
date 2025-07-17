import React, { useState } from 'react';
import { MdPeople, MdCheck, MdClose, MdSend } from 'react-icons/md';
import './Invitations.css';

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
    },
    {
      id: 2,
      patient: 'Jane Smith',
      case: 'Hypertension',
      inviter: 'Dr. Brown',
      status: 'accepted',
      date: '2024-05-28T14:00:00Z',
      access: 'Read-only',
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
    },
    {
      id: 4,
      patient: 'John Doe',
      case: 'Diabetes Management',
      invitee: 'Dr. Davis',
      status: 'declined',
      date: '2024-05-30T11:00:00Z',
      access: 'Read-only',
    },
  ],
};

const Invitations = () => {
  const [tab, setTab] = useState('incoming');
  const [invitations, setInvitations] = useState(mockInvitations);

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

  return (
    <div className="invitations-page">
      <div className="invitations-content-container">
        <div className="invitations-header-row">
          <h2><MdPeople style={{ verticalAlign: 'middle', marginRight: 8}} />Invitations</h2>
          <div className="invitations-actions">
            <button className={`invitations-tab-btn ${tab === 'incoming' ? 'active' : 'inactive'}`} onClick={() => setTab('incoming')}>Incoming</button>
            <button className={`invitations-tab-btn ${tab === 'outgoing' ? 'active' : 'inactive'}`} onClick={() => setTab('outgoing')}>Outgoing</button>
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
                <div className="invitation-patient">{inv.invitee} <span style={{ color: '#888', fontWeight: 400 }}>({inv.patient} - {inv.case})</span></div>
                <div className="invitation-meta">Sent on {new Date(inv.date).toLocaleString()} &middot; Access: {inv.access}</div>
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
    </div>
  );
};

export default Invitations; 