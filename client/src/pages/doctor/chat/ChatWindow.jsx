import React, { useEffect, useState, useRef } from 'react';

const ChatWindow = ({ patient, socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!patient) return;

    // Join the room for this conversation
    const room = `doctor_1_patient_${patient.id}`; // Replace doctor_1 with actual doctor ID
    socket.emit('joinRoom', room);

    // Listen for messages
    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    // Optionally fetch previous messages here

    // Cleanup
    return () => {
      socket.emit('leaveRoom', room);
      socket.off('receiveMessage');
      setMessages([]);
    };
  }, [patient, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && patient) {
      const room = `doctor_1_patient_${patient.id}`; // Replace doctor_1 with actual doctor ID
      socket.emit('sendMessage', { room, text: input, sender: 'doctor' });
      setInput('');
    }
  };

  if (!patient) {
    return <div className="messenger-chat-window">Select a patient to start chatting.</div>;
  }

  return (
    <div className="messenger-chat-window">
      <div className="messenger-chat-header">{patient.name}</div>
      <div className="messenger-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`messenger-chat-message ${msg.sender === 'doctor' ? 'sent' : 'received'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="messenger-chat-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow; 