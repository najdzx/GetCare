import React, { useEffect, useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { io } from 'socket.io-client';
import './ChatMessenger.css';

const socket = io('http://localhost:3001'); // Update as needed

const ChatMessenger = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Fetch patients (replace with your actual API)
    fetch('/api/doctor/assigned-patients')
      .then(res => res.json())
      .then(data => {
        // Add sample last messages for demonstration
        const patientsWithMessages = data.map(patient => ({
          ...patient,
          lastMessage: getSampleLastMessage(patient.name)
        }));
        setPatients(patientsWithMessages);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
        // Fallback data for testing
        setPatients([
          { id: 1, name: 'John Doe', lastMessage: 'Thank you doctor, I feel much better now.' },
          { id: 2, name: 'Maria Reyes', lastMessage: 'When should I take my medication?' },
          { id: 3, name: 'Jane Smith', lastMessage: 'Can I schedule a follow-up appointment?' },
          { id: 4, name: 'Alex Johnson', lastMessage: 'The symptoms have improved significantly.' },
          { id: 5, name: 'Sarah Wilson', lastMessage: 'Is it okay to exercise now?' },
        ]);
      });
  }, []);

  // Helper function to generate sample last messages
  const getSampleLastMessage = (name) => {
    const messages = [
      'Thank you for the consultation.',
      'When should I take my medication?',
      'Can I schedule a follow-up?',
      'The symptoms have improved.',
      'Is it okay to exercise now?',
      'I have a question about the prescription.',
      'The treatment is working well.',
      'Should I continue with the current dosage?'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="messenger-outer-wrapper">
      <div className="messenger-container">
        <ChatSidebar
          patients={patients}
          selectedPatient={selectedPatient}
          onSelect={setSelectedPatient}
        />
        <ChatWindow
          patient={selectedPatient}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default ChatMessenger; 