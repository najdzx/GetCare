import React, { useState, useEffect, useRef } from 'react';
import styles from './Doctorchat.module.css';

const Doctorchat = () => {
  const [currentPatient, setCurrentPatient] = useState('john-santos');
  const [messageInput, setMessageInput] = useState('');
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const patients = {
    'john-santos': {
      name: 'John Santos',
      initials: 'JS',
      status: 'online',
      lastMessage: 'Thank you for the prescription, Doctor.',
      time: '2:30 PM',
      unread: 2
    },
    'maria-cruz': {
      name: 'Maria Cruz',
      initials: 'MC',
      status: 'offline',
      lastMessage: 'When should I schedule my follow-up?',
      time: 'Yesterday',
      unread: 0
    },
    'carlos-mendoza': {
      name: 'Carlos Mendoza',
      initials: 'CM',
      status: 'online',
      lastMessage: 'The medication is working well.',
      time: 'Monday',
      unread: 1
    },
    'ana-rodriguez': {
      name: 'Ana Rodriguez',
      initials: 'AR',
      status: 'away',
      lastMessage: 'Lab results received, thank you!',
      time: 'Sunday',
      unread: 0
    },
    'luis-garcia': {
      name: 'Luis Garcia',
      initials: 'LG',
      status: 'offline',
      lastMessage: 'I have some questions about my treatment.',
      time: 'Friday',
      unread: 0
    }
    ,
    'john-garcia': {
      name: 'John Garcia',
      initials: 'LG',
      status: 'offline',
      lastMessage: 'I have some questions about my treatment.',
      time: 'Friday',
      unread: 0
    }
    ,
    'j-garcia': {
      name: 'J Garcia',
      initials: 'LG',
      status: 'offline',
      lastMessage: 'I have some questions about my treatment.',
      time: 'Friday',
      unread: 0
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'online': return 'Online • Last seen now';
      case 'away': return 'Away • Last seen 5 minutes ago';
      case 'offline': return 'Offline • Last seen 2 hours ago';
      default: return 'Unknown status';
    }
  };

  const selectPatient = (patientId) => {
    setCurrentPatient(patientId);
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (text) {
      addMessage(text, 'sent');
      setMessageInput('');
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        addMessage("Thank you, Doctor. I'll follow your instructions.", 'received');
      }, 2000);
    }
  };

  const addMessage = (text, type) => {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${styles.message} ${styles[type]}`;

    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    // Build content safely without innerHTML
    const contentDiv = document.createElement('div');
    contentDiv.className = styles.messageContent;
    const p = document.createElement('p');
    p.textContent = text;
    contentDiv.appendChild(p);

    const timeDiv = document.createElement('div');
    timeDiv.className = styles.messageTime;
    timeDiv.textContent = currentTime;

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);

    if (type === 'sent') {
      const statusDiv = document.createElement('div');
      statusDiv.className = `${styles.messageStatus} ${styles.delivered}`;
      messageDiv.appendChild(statusDiv);
    }

    // Insert before the messagesEndRef sentinel so the sentinel stays last.
    const endRef = messagesEndRef.current;
    if (messagesContainer && endRef && endRef.parentNode === messagesContainer) {
      messagesContainer.insertBefore(messageDiv, endRef);
    } else if (messagesContainer) {
      messagesContainer.appendChild(messageDiv);
    }

    // Scroll to the sentinel (which remains after the new message)
    scrollToBottom();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    addFileMessage(file.name, url, file.type);
    e.target.value = '';
  };

  const addFileMessage = (filename, url, mime) => {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${styles.message} ${styles.sent}`;

    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    const contentDiv = document.createElement('div');
    contentDiv.className = styles.messageContent;

    if (mime && mime.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = filename;
      img.style.maxWidth = '240px';
      img.style.borderRadius = '8px';
      contentDiv.appendChild(img);
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noreferrer noopener';
      link.textContent = filename;
      contentDiv.appendChild(link);
    }

    const timeDiv = document.createElement('div');
    timeDiv.className = styles.messageTime;
    timeDiv.textContent = currentTime;

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);

    const endRef = messagesEndRef.current;
    if (messagesContainer && endRef && endRef.parentNode === messagesContainer) {
      messagesContainer.insertBefore(messageDiv, endRef);
    } else if (messagesContainer) {
      messagesContainer.appendChild(messageDiv);
    }

    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const scrollToBottom = () => {
    try {
      if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    } catch (e) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.doctorInfo}>
            <div className={styles.doctorAvatar}>
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg>
            </div>
            <div className={styles.doctorDetails}>
              <h1>Patient Messages</h1>
              <p>Dr. Maria Elena Rodriguez • Internal Medicine</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnSecondary} onClick={() => alert('Notifications panel would open here')}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              Notifications
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Patients Sidebar */}
          <div className={styles.patientsSidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.searchContainer}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const patientItems = document.querySelectorAll(`.${styles.patientItem}`);
                    
                    patientItems.forEach(item => {
                      const patientName = item.querySelector(`.${styles.patientName}`).textContent.toLowerCase();
                      item.style.display = patientName.includes(searchTerm) ? 'flex' : 'none';
                    });
                  }}
                />
              </div>
            </div>
            
            <div className={styles.patientsList}>
              {Object.entries(patients).map(([id, patient]) => (
                <div 
                  key={id}
                  className={`${styles.patientItem} ${currentPatient === id ? styles.active : ''}`}
                  onClick={() => selectPatient(id)}
                >
                  <div className={styles.patientAvatar}>
                    <span>{patient.initials}</span>
                    <div className={`${styles.statusIndicator} ${styles[patient.status]}`}></div>
                  </div>
                  <div className={styles.patientInfo}>
                    <div className={styles.patientName}>{patient.name}</div>
                    <div className={styles.lastMessage}>{patient.lastMessage}</div>
                    <div className={styles.messageTime}>{patient.time}</div>
                  </div>
                  {patient.unread > 0 && (
                    <div className={styles.unreadCount}>{patient.unread}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={styles.chatArea}>
            <div className={styles.chatHeader}>
              <div className={styles.currentPatientInfo}>
                <div className={`${styles.patientAvatar} ${styles.large}`}>
                  <span>{patients[currentPatient].initials}</span>
                  <div className={`${styles.statusIndicator} ${styles[patients[currentPatient].status]}`}></div>
                </div>
                <div className={styles.patientDetails}>
                  <div className={styles.patientName}>{patients[currentPatient].name}</div>
                  <div className={styles.patientStatus}>{getStatusText(patients[currentPatient].status)}</div>
                </div>
              </div>
              <div className={styles.chatActions}>
                <button className={styles.actionBtn} onClick={() => setShowPatientInfo(true)} title="Patient Info">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} onClick={() => alert('Schedule appointment dialog would open here')} title="Schedule">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} onClick={() => alert('Prescription form would open here')} title="Prescribe">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.messagesContainer} id="messagesContainer">
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.messageInputArea}>
              <div className={styles.inputContainer}>
                <button className={`${styles.attachmentBtn} ${styles.sideBtn}`} onClick={() => fileInputRef.current?.click()} title="Attach File">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 0 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 0 1-7 0V3z"/>
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelected(e)}
                />
                <textarea 
                  id="messageInput"
                  className={styles.messageInput}
                  placeholder="Type your message..."
                  rows="1"
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    autoResize(e);
                  }}
                  onKeyPress={handleKeyPress}
                />

                <button className={`${styles.sendBtn} ${styles.sideBtn}`} onClick={handleSendMessage} title="Send Message">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V8.72l-4.5 1.5a.5.5 0 0 1-.65-.65l1.5-4.5H8.72c.859 0 1.319-1.012.753-1.658L4.677 1.14a.5.5 0 0 1 .353-.853h10.5a.5.5 0 0 1 .5.5v10.5a.5.5 0 0 1-.853.353L12.14 8.753Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Patient Info Panel */}
          <div className={`${styles.patientInfoPanel} ${showPatientInfo ? styles.active : ''}`}>
            <div className={styles.panelHeader}>
              <h3>Patient Information</h3>
              <button className={styles.closeBtn} onClick={() => setShowPatientInfo(false)}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </button>
            </div>
            <div className={styles.panelContent}>
              <div className={styles.patientSummary}>
                <div className={`${styles.patientAvatar} ${styles.large}`}>
                  <span>{patients[currentPatient].initials}</span>
                </div>
                <div className={styles.patientDetails}>
                  <h4>{patients[currentPatient].name}</h4>
                  <p>Male, 34 years old</p>
                  <p>Patient ID: P-2024-001</p>
                </div>
              </div>
              
              <div className={styles.infoSection}>
                <h5>Contact Information</h5>
                <p><strong>Phone:</strong> +63 917 123 4567</p>
                <p><strong>Email:</strong> john.santos@email.com</p>
              </div>

              <div className={styles.infoSection}>
                <h5>Medical Information</h5>
                <p><strong>Blood Type:</strong> O+</p>
                <p><strong>Allergies:</strong> Penicillin</p>
                <p><strong>Last Visit:</strong> March 15, 2024</p>
              </div>

              <div className={styles.infoSection}>
                <h5>Current Medications</h5>
                <ul>
                  <li>Ibuprofen 400mg - As needed</li>
                  <li>Vitamin D 1000IU - Daily</li>
                </ul>
              </div>

              <div className={styles.panelActions}>
                <button className={styles.btnPrimary} onClick={() => alert('Full patient record would open here')}>View Full Record</button>
                <button className={styles.btnSecondary} onClick={() => alert('Schedule appointment dialog would open here')}>Schedule Appointment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctorchat;