import React, { useState } from 'react';
import './ChatMessenger.css';

const ChatSidebar = ({ patients, selectedPatient, onSelect }) => {
  const [search, setSearch] = useState('');
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="messenger-sidebar">
      <h3>Chat</h3>
      <div className="sidebar-search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {filteredPatients.map(patient => (
          <li
            key={patient.id}
            className={selectedPatient && selectedPatient.id === patient.id ? 'active' : ''}
            onClick={() => onSelect(patient)}
          >
            <div className="conversation-item">
              <div className="conversation-avatar">
                {patient.name ? patient.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div className="conversation-content">
                <div className="conversation-name">{patient.name}</div>
                <div className="conversation-preview">
                  {patient.lastMessage || 'No messages yet'}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar; 