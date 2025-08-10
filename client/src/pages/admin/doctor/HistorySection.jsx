import React, { useState } from 'react';
import styles from './Doctors.module.css';

const HistorySection = ({ doctor }) => {
  // History state for tracking all changes
  const [doctorHistory, setDoctorHistory] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      action: 'EDIT_APPOINTMENT',
      description: 'Updated appointment time for John Smith',
      details: {
        appointmentId: 1,
        patientName: 'John Smith',
        changes: 'Time changed from 08:00 to 09:00',
        reason: 'Patient requested schedule change'
      },
      adminUser: 'Admin User'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      action: 'DELETE_APPOINTMENT',
      description: 'Cancelled appointment for Jane Doe',
      details: {
        appointmentId: 15,
        patientName: 'Jane Doe',
        appointmentDate: '2025-08-05',
        appointmentTime: '14:00',
        reason: 'Doctor unavailable',
        notificationSent: true
      },
      adminUser: 'Admin User'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      action: 'MESSAGE_SENT',
      description: 'Sent message to Maria Garcia',
      details: {
        patientName: 'Maria Garcia',
        patientEmail: 'maria.garcia@email.com',
        subject: 'Appointment Reminder',
        priority: 'normal'
      },
      adminUser: 'Admin User'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      action: 'EDIT_APPOINTMENT',
      description: 'Changed appointment status for Robert Johnson',
      details: {
        appointmentId: 3,
        patientName: 'Robert Johnson',
        changes: 'Status: Pending → Confirmed',
        reason: 'Patient confirmation received'
      },
      adminUser: 'Admin User'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      action: 'DELETE_APPOINTMENT',
      description: 'Cancelled appointment for Emily Davis',
      details: {
        appointmentId: 4,
        patientName: 'Emily Davis',
        appointmentDate: '2025-08-02',
        appointmentTime: '16:00',
        reason: 'Emergency surgery scheduled',
        notificationSent: true
      },
      adminUser: 'Admin User'
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      action: 'MESSAGE_SENT',
      description: 'Sent urgent message to David Brown',
      details: {
        patientName: 'David Brown',
        patientEmail: 'david.brown@email.com',
        subject: 'Lab Results Available',
        priority: 'urgent'
      },
      adminUser: 'Admin User'
    }
  ]);

  // Filter states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Format date and time functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Filter history based on selected criteria
  const filteredHistory = doctorHistory.filter(entry => {
    const dateMatch = !selectedDate || entry.timestamp.startsWith(selectedDate);
    const actionMatch = selectedAction === 'all' || entry.action === selectedAction;
    const searchMatch = !searchTerm || 
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.adminUser.toLowerCase().includes(searchTerm.toLowerCase());
    
    return dateMatch && actionMatch && searchMatch;
  });

  // Group history by date
  const groupedHistory = filteredHistory.reduce((groups, entry) => {
    const date = entry.timestamp.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {});

  return (
    <div className={styles.availabilityTabContent}>
      <div className={styles.historySection}>
        {/* Filters */}
        <div className={styles.historyFilters}>
          <div className={styles.filterGroup}>
            <label htmlFor="historySearchFilter">Search:</label>
            <input
              id="historySearchFilter"
              type="text"
              placeholder="Search patient, admin, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="historyDateFilter">Filter by Date:</label>
            <input
              id="historyDateFilter"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles.filterInput}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="historyActionFilter">Action Type:</label>
            <select
              id="historyActionFilter"
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Actions</option>
              <option value="EDIT_APPOINTMENT">Edit Appointment</option>
              <option value="DELETE_APPOINTMENT">Delete Appointment</option>
              <option value="MESSAGE_SENT">Message Sent</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <button
              className="global-btn secondary"
              onClick={() => {
                setSearchTerm('');
                setSelectedDate('');
                setSelectedAction('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>


        {/* History List */}
        <div className={styles.historyList}>
          {Object.keys(groupedHistory).length === 0 ? (
            <div className={styles.noHistory}>
              <p>No activity history found matching the selected criteria.</p>
            </div>
          ) : (
            Object.entries(groupedHistory)
              .sort(([a], [b]) => new Date(b) - new Date(a)) // Sort by date, newest first
              .map(([date, entries]) => (
                <div key={date} className={styles.historyDateGroup}>
                  <div className={styles.historyDateHeader}>
                    <h4>{formatDate(date)}</h4>
                    <span className={styles.historyCount}>
                      {entries.length} activit{entries.length !== 1 ? 'ies' : 'y'}
                    </span>
                  </div>
                  
                  <div className={styles.historyEntries}>
                    {entries
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by time, newest first
                      .map(entry => (
                        <div key={entry.id} className={styles.historyEntry}>
                          <div className={styles.historyIcon}>
                            {entry.action === 'EDIT_APPOINTMENT' && (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {entry.action === 'DELETE_APPOINTMENT' && (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {entry.action === 'MESSAGE_SENT' && (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          
                          <div className={styles.historyContent}>
                            <div className={styles.historyEntryHeader}>
                              <h5>{entry.description}</h5>
                              <span className={styles.historyTimestamp}>
                                {new Date(entry.timestamp).toLocaleDateString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            
                            <div className={styles.historyDetails}>
                              <div className={styles.historyDetailRow}>
                                <strong>Action:</strong> 
                                <span className={`${styles.actionBadge} ${styles[`action${entry.action}`]}`}>
                                  {entry.action.replace('_', ' ')}
                                </span>
                              </div>
                              
                              {entry.details.patientName && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Patient:</strong> {entry.details.patientName}
                                </div>
                              )}
                              
                              {entry.details.changes && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Changes:</strong> {entry.details.changes}
                                </div>
                              )}
                              
                              {entry.details.reason && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Reason:</strong> {entry.details.reason}
                                </div>
                              )}
                              
                              {entry.details.appointmentDate && entry.details.appointmentTime && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Original Appointment:</strong> 
                                  {formatDate(entry.details.appointmentDate)} at {formatTime(entry.details.appointmentTime)}
                                </div>
                              )}
                              
                              {entry.details.subject && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Subject:</strong> {entry.details.subject}
                                </div>
                              )}
                              
                              {entry.details.priority && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Priority:</strong> 
                                  <span className={`${styles.priorityBadge} ${styles[`priority${entry.details.priority.charAt(0).toUpperCase() + entry.details.priority.slice(1)}`]}`}>
                                    {entry.details.priority}
                                  </span>
                                </div>
                              )}
                              
                              {entry.details.notificationSent && (
                                <div className={styles.historyDetailRow}>
                                  <strong>Notification:</strong> 
                                  <span className={styles.notificationSent}>✓ Sent to patient</span>
                                </div>
                              )}
                              
                              <div className={styles.historyDetailRow}>
                                <strong>Admin:</strong> {entry.adminUser}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
