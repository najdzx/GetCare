import React, { useState, useEffect, useRef } from 'react';
import styles from './patientchat.module.css';

const PatientChat = () => {
  const [currentDoctor, setCurrentDoctor] = useState('dr-rodriguez');
  const [messageInput, setMessageInput] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const doctors = {
    'dr-rodriguez': {
      name: 'Dr. Maria Rodriguez',
      initials: 'DR',
      specialty: 'Internal Medicine',
      status: 'online',
      lastMessage: 'Your lab results look good. Continue...',
      time: '10:30 AM',
      unread: 1
    },
    'dr-chen': {
      name: 'Dr. Lisa Chen',
      initials: 'DC',
      specialty: 'Cardiology',
      status: 'away',
      lastMessage: 'Please schedule your follow-up...',
      time: 'Yesterday',
      unread: 0
    },
    'dr-johnson': {
      name: 'Dr. Michael Johnson',
      initials: 'DJ',
      specialty: 'Orthopedics',
      status: 'online',
      lastMessage: 'How is your knee feeling today?',
      time: 'Monday',
      unread: 3
    },
    'dr-patel': {
      name: 'Dr. Priya Patel',
      initials: 'DP',
      specialty: 'Dermatology',
      status: 'offline',
      lastMessage: 'The treatment is working well...',
      time: 'Sunday',
      unread: 0
    },
    'dr-williams': {
      name: 'Dr. Sarah Williams',
      initials: 'DW',
      specialty: 'Psychiatry',
      status: 'offline',
      lastMessage: 'Remember to take your medication...',
      time: 'Friday',
      unread: 0
    }
    ,
    'd-williams': {
      name: 'D. Sarah Williams',
      initials: 'DW',
      specialty: 'Psychiatry',
      status: 'offline',
      lastMessage: 'Remember to take your medication...',
      time: 'Friday',
      unread: 0
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'online': return 'Online • Available now';
      case 'away': return 'Away • Will respond soon';
      case 'offline': return 'Offline • Will respond later';
      default: return 'Unknown status';
    }
  };

  const selectDoctor = (doctorId) => {
    setCurrentDoctor(doctorId);
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (text) {
      addMessage(text, 'sent');
      setMessageInput('');
      
      // Simulate dynamic response after 2 seconds
      const userText = text; // capture
      setTimeout(() => {
        const reply = generateReply(userText);
        addMessage(reply, 'received');
      }, 2000);
    }
  };

  // Very small reply generator for demo: echoes or summarizes the user's message
  const generateReply = (userText) => {
    if (!userText) return "Thanks — I'll follow up shortly.";
    const trimmed = userText.trim();
    // If it's a question, reply acknowledging question
    if (trimmed.endsWith('?')) {
      return `Good question — I'll check on "${trimmed.length > 60 ? trimmed.slice(0,57) + '...' : trimmed}" and get back to you.`;
    }
    // If it's long, summarize
    if (trimmed.length > 80) {
      return `Got your message: "${trimmed.slice(0,77)}..." — I'll review and reply soon.`;
    }
    // Short echo otherwise
    return `Thanks for the update: "${trimmed}".`;
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
    // For demo, create an object URL for preview (no upload)
    const url = URL.createObjectURL(file);
    addFileMessage(file.name, url, file.type);
    // clear input
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

  const sendQuickMessage = (type) => {
    let message = '';
    switch(type) {
      case 'symptoms':
        message = 'I wanted to report some symptoms I\'ve been experiencing lately.';
        break;
      case 'medication':
        message = 'I have a question about my current medication.';
        break;
      case 'appointment':
        message = 'I would like to schedule an appointment with you.';
        break;
      case 'emergency':
        message = 'I have an urgent health concern that needs attention.';
        break;
    }
    
    if (message) {
      addMessage(message, 'sent');
      setShowQuickActions(false);
    }
  };

  const scrollToBottom = () => {
    // Prefer immediate snap when called right after inserting a message to avoid jumpiness,
    // otherwise use smooth behavior.
    try {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    } catch (e) {
      // fallback
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
          <div className={styles.patientInfo}>
            <div className={styles.patientAvatar}>
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg>
            </div>
            <div className={styles.patientDetails}>
              <p>John Santos • Patient ID: P-2024-001</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Doctors Sidebar */}
          <div className={styles.doctorsSidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.searchContainer}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search doctors..." 
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const doctorItems = document.querySelectorAll(`.${styles.doctorItem}`);
                    
                    doctorItems.forEach(item => {
                      const doctorName = item.querySelector(`.${styles.doctorName}`).textContent.toLowerCase();
                      const specialty = item.querySelector(`.${styles.doctorSpecialty}`).textContent.toLowerCase();
                      item.style.display = (doctorName.includes(searchTerm) || specialty.includes(searchTerm)) ? 'flex' : 'none';
                    });
                  }}
                />
              </div>
            </div>
            
            <div className={styles.doctorsList}>
              {Object.entries(doctors).map(([id, doctor]) => (
                <div 
                  key={id}
                  className={`${styles.doctorItem} ${currentDoctor === id ? styles.active : ''}`}
                  onClick={() => selectDoctor(id)}
                >
                  <div className={styles.doctorAvatar}>
                    <span>{doctor.initials}</span>
                    <div className={`${styles.statusIndicator} ${styles[doctor.status]}`}></div>
                  </div>
                  <div className={styles.doctorInfo}>
                    <div className={styles.doctorName}>{doctor.name}</div>
                    <div className={styles.doctorSpecialty}>{doctor.specialty}</div>
                    <div className={styles.lastMessage}>{doctor.lastMessage}</div>
                    <div className={styles.messageTime}>{doctor.time}</div>
                  </div>
                  {doctor.unread > 0 && (
                    <div className={styles.unreadCount}>{doctor.unread}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={styles.chatArea}>
            <div className={styles.chatHeader}>
              <div className={styles.currentDoctorInfo}>
                <div className={`${styles.doctorAvatar} ${styles.large}`}>
                  <span>{doctors[currentDoctor].initials}</span>
                  <div className={`${styles.statusIndicator} ${styles[doctors[currentDoctor].status]}`}></div>
                </div>
                <div className={styles.doctorDetails}>
                  <div className={styles.doctorName}>{doctors[currentDoctor].name}</div>
                  <div className={styles.doctorSpecialty}>{doctors[currentDoctor].specialty}</div>
                  <div className={styles.doctorStatus}>{getStatusText(doctors[currentDoctor].status)}</div>
                </div>
              </div>
              <div className={styles.chatActions}>
                <button className={styles.actionBtn} onClick={() => alert('Appointment request form would open here')} title="Request Appointment">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} onClick={() => alert('Prescriptions page would open here')} title="My Prescriptions">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1zm11 0H3v14h10V1z"/>
                    <path d="M5 3h6v1H5V3zm0 2h6v1H5V5zm0 2h6v1H5V7zm0 2h6v1H5V9z"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} onClick={() => setShowQuickActions(true)} title="Share Symptoms">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3 3 0 0 1 8 10.5a3 3 0 0 1 3.032 1.75.5.5 0 1 0 .866-.5A4 4 0 0 0 8 9.5a4 4 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
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
                  placeholder={`Type your message to ${doctors[currentDoctor].name}...`}
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

          {/* Quick Actions Panel */}
          <div className={`${styles.quickActionsPanel} ${showQuickActions ? styles.active : ''}`}>
            <div className={styles.panelHeader}>
              <h3>Quick Actions</h3>
              <button className={styles.closeBtn} onClick={() => setShowQuickActions(false)}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </button>
            </div>
            <div className={styles.panelContent}>
              <div className={styles.quickActionItem} onClick={() => sendQuickMessage('symptoms')}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3 3 0 0 1 8 10.5a3 3 0 0 1 3.032 1.75.5.5 0 1 0 .866-.5A4 4 0 0 0 8 9.5a4 4 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Report Symptoms</div>
                  <div className={styles.actionDesc}>Share how you're feeling</div>
                </div>
              </div>

              <div className={styles.quickActionItem} onClick={() => sendQuickMessage('medication')}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1zm11 0H3v14h10V1z"/>
                    <path d="M5 3h6v1H5V3zm0 2h6v1H5V5zm0 2h6v1H5V7zm0 2h6v1H5V9z"/>
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Medication Question</div>
                  <div className={styles.actionDesc}>Ask about prescriptions</div>
                </div>
              </div>

              <div className={styles.quickActionItem} onClick={() => sendQuickMessage('appointment')}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Schedule Appointment</div>
                  <div className={styles.actionDesc}>Request a visit</div>
                </div>
              </div>

              <div className={styles.quickActionItem} onClick={() => sendQuickMessage('emergency')}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Urgent Issue</div>
                  <div className={styles.actionDesc}>Report urgent concerns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientChat;