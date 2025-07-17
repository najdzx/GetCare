import React, { useEffect, useState, useRef } from 'react';
import { 
  MdMic, 
  MdAttachFile, 
  MdStickyNote2, 
  MdMicOff,
  MdPlayArrow,
  MdCheck,
  MdDoneAll,
  MdClose,
  MdImage,
  MdDescription,
  MdVideoLibrary,
  MdAudiotrack,
  MdAdd
} from 'react-icons/md';
import { TbGif } from 'react-icons/tb';
import './ChatMessenger.css';

const ChatWindow = ({ patient, socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isPatientOnline, setIsPatientOnline] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if (!patient) return;

    // Join the room for this conversation
    const room = `doctor_1_patient_${patient.id}`; // Replace doctor_1 with actual doctor ID
    socket.emit('joinRoom', room);

    // Listen for messages
    socket.on('receiveMessage', (msg) => {
      const messageWithStatus = { ...msg, status: msg.status || 'received' };
      setMessages(prev => [...prev, messageWithStatus]);
    });

    // Listen for file messages
    socket.on('receiveFile', (fileMsg) => {
      const messageWithStatus = { ...fileMsg, status: fileMsg.status || 'received' };
      setMessages(prev => [...prev, messageWithStatus]);
    });

    // Listen for voice messages
    socket.on('receiveVoice', (voiceMsg) => {
      const messageWithStatus = { ...voiceMsg, status: voiceMsg.status || 'received' };
      setMessages(prev => [...prev, messageWithStatus]);
    });

    // Listen for read receipts
    socket.on('messageRead', (messageId) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
    });

    // Listen for delivered receipts
    socket.on('messageDelivered', (messageId) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'delivered' } : msg
      ));
    });

    // Simulate patient online status (replace with actual socket events)
    setIsPatientOnline(true);

    // Optionally fetch previous messages here

    // Cleanup
    return () => {
      socket.emit('leaveRoom', room);
      socket.off('receiveMessage');
      socket.off('receiveFile');
      socket.off('receiveVoice');
      socket.off('messageRead');
      socket.off('messageDelivered');
      setMessages([]);
      setIsPatientOnline(false);
    };
  }, [patient, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).filter(file => {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return false;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        alert('File type not supported. Please upload images (JPEG, PNG, GIF, WebP), PDF, or text files.');
        return false;
      }

      return true;
    });

    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <MdImage size={16} />;
    if (fileType === 'application/pdf') return <MdDescription size={16} />;
    if (fileType.startsWith('video/')) return <MdVideoLibrary size={16} />;
    if (fileType.startsWith('audio/')) return <MdAudiotrack size={16} />;
    return <MdAttachFile size={16} />;
  };

  const getFileCategory = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'Document';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.startsWith('audio/')) return 'Audio';
    if (fileType === 'text/plain') return 'Text';
    return 'File';
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if ((input.trim() || selectedFiles.length > 0) && patient) {
      const room = `doctor_1_patient_${patient.id}`;
      const messageId = Date.now().toString();
      
      // Send text message if there's text
      if (input.trim()) {
        const message = {
          id: messageId,
          room,
          text: input,
          sender: 'doctor',
          timestamp: new Date().toISOString(),
          status: 'sent'
        };

        socket.emit('sendMessage', message);
        setMessages(prev => [...prev, message]);
        setInput('');

        // Simulate message delivery and read status
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, status: 'delivered' } : msg
          ));
          socket.emit('messageDelivered', messageId);
        }, 1000);

        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, status: 'read' } : msg
          ));
          socket.emit('messageRead', messageId);
        }, 2000);
      }

      // Send files if there are any
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          const fileMessageId = `${messageId}_file_${index}`;
          uploadFile(file, fileMessageId);
        });
        setSelectedFiles([]);
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const uploadFile = async (file, messageId) => {
    if (!patient) return;

    setIsUploading(true);
    setUploadProgress(0);
    const room = `doctor_1_patient_${patient.id}`;

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Convert file to base64 for socket transmission
      const base64 = await fileToBase64(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      const fileMessage = {
        id: messageId,
        room,
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
          category: getFileCategory(file.type)
        },
        sender: 'doctor',
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      socket.emit('sendFile', fileMessage);
      setMessages(prev => [...prev, fileMessage]);
      
      // Simulate file message delivery and read status
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'delivered' } : msg
        ));
        socket.emit('messageDelivered', messageId);
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        ));
        socket.emit('messageRead', messageId);
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        sendVoiceMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendVoiceMessage = async (audioBlob) => {
    if (!patient) return;

    const room = `doctor_1_patient_${patient.id}`;
    const messageId = Date.now().toString();
    
    try {
      const base64 = await fileToBase64(audioBlob);
      
      const voiceMessage = {
        id: messageId,
        room,
        voice: {
          data: base64,
          duration: 0, // You can calculate actual duration if needed
          type: 'audio/wav'
        },
        sender: 'doctor',
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      socket.emit('sendVoice', voiceMessage);
      setMessages(prev => [...prev, voiceMessage]);

      // Simulate voice message delivery and read status
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'delivered' } : msg
        ));
        socket.emit('messageDelivered', messageId);
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        ));
        socket.emit('messageRead', messageId);
      }, 2000);
      
    } catch (error) {
      console.error('Error sending voice message:', error);
      alert('Failed to send voice message. Please try again.');
    }
  };

  const handleStickerClick = () => {
    // TODO: Implement sticker picker
    alert('Sticker picker coming soon!');
  };

  const handleGifClick = () => {
    // TODO: Implement GIF picker
    alert('GIF picker coming soon!');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <MdCheck size={16} />;
      case 'delivered':
        return <MdDoneAll size={16} />;
      case 'read':
        return <MdDoneAll size={16} style={{ color: '#434bb8' }} />;
      case 'received':
        return null; // No status indicator for received messages
      default:
        return <MdCheck size={16} />; // Default to sent status
    }
  };

  const renderMessage = (msg, idx) => {
    if (msg.voice) {
      // Render voice message
      return (
        <div key={idx} className={`messenger-chat-message ${msg.sender === 'doctor' ? 'sent' : 'received'} voice-message`}>
          <div className="voice-info">
            <div className="voice-icon">
              <MdMic size={20} />
            </div>
            <div className="voice-details">
              <div className="voice-label">Voice Message</div>
              <div className="voice-duration">0:15</div>
            </div>
            <button className="play-voice-btn">
              <MdPlayArrow size={18} />
            </button>
          </div>
          {msg.sender === 'doctor' && (
            <div className="message-status">
              <span className="message-time">{formatTime(msg.timestamp)}</span>
              {renderMessageStatus(msg.status)}
            </div>
          )}
        </div>
      );
    } else if (msg.file) {
      // Render file message
      return (
        <div key={idx} className={`messenger-chat-message ${msg.sender === 'doctor' ? 'sent' : 'received'} file-message`}>
          <div className="file-info">
            <div className="file-icon">
              {getFileIcon(msg.file.type)}
            </div>
            <div className="file-details">
              <div className="file-category">{msg.file.category || getFileCategory(msg.file.type)}</div>
              <div className="file-name">{msg.file.name}</div>
              <div className="file-size">{formatFileSize(msg.file.size)}</div>
            </div>
          </div>
          {msg.file.type.startsWith('image/') && (
            <div className="file-preview">
              <img src={msg.file.data} alt={msg.file.name} />
            </div>
          )}
          {msg.sender === 'doctor' && (
            <div className="message-status">
              <span className="message-time">{formatTime(msg.timestamp)}</span>
              {renderMessageStatus(msg.status)}
            </div>
          )}
        </div>
      );
    } else {
      // Render text message
      return (
        <div key={idx} className={`messenger-chat-message ${msg.sender === 'doctor' ? 'sent' : 'received'}`}>
          <div className="message-content">{msg.text}</div>
          {msg.sender === 'doctor' && (
            <div className="message-status">
              <span className="message-time">{formatTime(msg.timestamp)}</span>
              {renderMessageStatus(msg.status)}
            </div>
          )}
        </div>
      );
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="messenger-chat-window">
      <div className="messenger-chat-header">
        <div className="header-content">
          <div className="patient-info">
            <span className="patient-name">{patient ? patient.name : 'Select a conversation'}</span>
            {patient && (
              <div className="patient-status">
                <span className={`status-dot ${isPatientOnline ? 'online' : 'offline'}`}></span>
                <span className="status-text">{isPatientOnline ? 'Online' : 'Offline'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!patient ? (
        <div className="messenger-chat-empty">
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No conversation selected</h3>
            <p>Choose a patient from the sidebar to start chatting</p>
          </div>
        </div>
      ) : (
        <>
          <div 
            className={`messenger-chat-messages ${dragActive ? 'drag-active' : ''}`}
            ref={dropZoneRef}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {dragActive && (
              <div className="drag-overlay">
                <div className="drag-message">
                  <MdAttachFile size={48} />
                  <p>Drop file here to upload</p>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => renderMessage(msg, idx))}
            <div ref={messagesEndRef} />
          </div>

          {/* File Upload Progress */}
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="progress-text">Uploading... {uploadProgress}%</span>
            </div>
          )}

          {/* File preview chips above input field */}
          {selectedFiles.length > 0 && (
            <div className="file-chips-above-input">
              {selectedFiles.map((file, idx) => (
                <div className="file-preview-item" key={idx}>
                  <span className="file-preview-icon">{getFileIcon(file.type)}</span>
                  <span className="file-preview-name">{file.name}</span>
                  <span className="file-preview-size">{formatFileSize(file.size)}</span>
                  <button className="file-preview-remove" onClick={() => removeFile(idx)} title="Remove">
                    <MdClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={sendMessage} className="messenger-chat-form">
            <div className="chat-input-container">
              <div className="chat-toolbar">
                <button 
                  type="button" 
                  className="toolbar-btn voice-btn"
                  onMouseDown={startVoiceRecording}
                  onMouseUp={stopVoiceRecording}
                  onMouseLeave={stopVoiceRecording}
                  disabled={isUploading}
                >
                  {isRecording ? <MdMicOff size={20} /> : <MdMic size={20} />}
                </button>
                <button 
                  type="button" 
                  className="toolbar-btn file-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <MdAttachFile size={20} />
                </button>
                <button 
                  type="button" 
                  className="toolbar-btn sticker-btn"
                  onClick={handleStickerClick}
                  disabled={isUploading}
                >
                  <MdStickyNote2 size={20} />
                </button>
                <button 
                  type="button" 
                  className="toolbar-btn gif-btn"
                  onClick={handleGifClick}
                  disabled={isUploading}
                >
                  <TbGif size={24} />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.txt"
                style={{ display: 'none' }}
              />
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="new-chat-input"
              />
              <button type="submit" disabled={isUploading || isRecording}>
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWindow; 