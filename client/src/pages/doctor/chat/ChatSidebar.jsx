import React from 'react';

const ChatSidebar = ({ patients, selectedPatient, onSelect }) => (
  <div className="messenger-sidebar">
    <h3>Conversations</h3>
    <ul>
      {patients.map(patient => (
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

export default ChatSidebar; 