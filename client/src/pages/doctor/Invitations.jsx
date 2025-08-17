import React, { useState } from 'react';
import styles from './Invitations.module.css';

const Invitations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cases, setCases] = useState([
    {
      id: 'case1',
      status: 'pending',
      priority: 'urgent',
      time: '2 hours ago',
      requestingDoctor: {
        initials: 'DC',
        name: 'Dr. Lisa Chen',
        specialty: 'Cardiology • City General Hospital'
      },
      patient: {
        name: 'Sarah Johnson (F, 45)',
        description: 'Complex case involving chest pain with abnormal ECG findings. Patient has history of diabetes and hypertension. Requesting internal medicine consultation for comprehensive metabolic evaluation and medication management.',
        details: [
          { label: 'Symptoms', value: 'Chest pain, shortness of breath, fatigue' },
          { label: 'Duration', value: '3 weeks' },
          { label: 'Tests Done', value: 'ECG, Chest X-ray, Basic metabolic panel' }
        ],
        attachments: ['ECG_Results.pdf', 'Lab_Results.pdf']
      }
    },
    {
      id: 'case2',
      status: 'pending',
      priority: 'normal',
      time: '5 hours ago',
      requestingDoctor: {
        initials: 'DJ',
        name: 'Dr. Michael Johnson',
        specialty: 'Orthopedics • Metro Medical Center'
      },
      patient: {
        name: 'Robert Martinez (M, 62)',
        description: 'Post-surgical patient with delayed wound healing. Patient has diabetes and requires internal medicine input for glycemic control optimization to improve healing outcomes.',
        details: [
          { label: 'Procedure', value: 'Knee replacement surgery (2 weeks ago)' },
          { label: 'Complication', value: 'Delayed wound healing, elevated glucose' },
          { label: 'Current HbA1c', value: '9.2% (needs optimization)' }
        ]
      }
    },
    {
      id: 'case3',
      status: 'accepted',
      time: 'Yesterday',
      requestingDoctor: {
        initials: 'DP',
        name: 'Dr. Priya Patel',
        specialty: 'Dermatology • Skin Care Clinic'
      },
      patient: {
        name: 'Emma Thompson (F, 38)',
        description: 'Managing patient with autoimmune skin condition. Coordinating systemic treatment approach with immunosuppressive therapy.',
        statusUpdates: [
          { label: 'Last Update', value: 'Treatment plan revised - see shared notes' },
          { label: 'Next Review', value: 'In 2 weeks' }
        ]
      }
    },
    {
      id: 'case4',
      status: 'declined',
      time: '2 days ago',
      requestingDoctor: {
        initials: 'DS',
        name: 'Dr. Sarah Williams',
        specialty: 'Psychiatry • Mental Health Center'
      },
      patient: {
        name: 'James Wilson (M, 29)',
        description: 'Outside scope of practice - referred to endocrinology specialist instead.',
        declineReason: 'Case requires specialized endocrine expertise. Recommended Dr. Anderson at Diabetes Center.'
      }
    }
  ]);

  const filterCases = (status) => {
    setActiveTab(status);
  };

  const acceptCase = (caseId) => {
    if (window.confirm('Accept this collaboration request? You will be added to the patient\'s care team.')) {
      alert(`Case ${caseId} accepted! You can now access shared patient notes and communicate with the requesting doctor.`);
      // In a real app, you would update the state here
    }
  };

  const declineCase = (caseId) => {
    const reason = window.prompt('Please provide a reason for declining (optional):');
    if (reason !== null) {
      alert(`Case ${caseId} declined. The requesting doctor will be notified.`);
      // In a real app, you would update the state here
    }
  };

  const viewFullCase = (caseId) => {
    alert(`Opening detailed view for case ${caseId}`);
  };

  const openChat = (caseId) => {
    alert(`Opening secure chat for case ${caseId}`);
  };

  const viewSharedNotes = (caseId) => {
    alert(`Opening shared notes for case ${caseId}`);
  };

  const viewDeclineDetails = (caseId) => {
    alert(`Viewing decline details for case ${caseId}`);
  };

  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(caseItem => caseItem.status === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.doctorInfo}>
            <div className={styles.doctorAvatar}>
              <span>DR</span>
            </div>
            <div className={styles.doctorDetails}>
              <h1>Shared Cases</h1>
              <p>Dr. Maria Rodriguez • Internal Medicine</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>8</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24</span>
              <span className={styles.statLabel}>Active</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>156</span>
              <span className={styles.statLabel}>Total</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`} 
            onClick={() => filterCases('all')}
          >
            All Requests
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'pending' ? styles.active : ''}`} 
            onClick={() => filterCases('pending')}
          >
            Pending (8)
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'accepted' ? styles.active : ''}`} 
            onClick={() => filterCases('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'declined' ? styles.active : ''}`} 
            onClick={() => filterCases('declined')}
          >
            Declined
          </button>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Cases List */}
          <div className={styles.casesContainer}>
            {filteredCases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className={`${styles.caseCard} ${styles[caseItem.status]}`} 
                data-status={caseItem.status}
              >
                <div className={styles.caseHeader}>
                  {caseItem.status === 'pending' ? (
                    <div className={`${styles.casePriority} ${styles[caseItem.priority]}`}>
                      {caseItem.priority === 'urgent' ? (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                      )}
                      {caseItem.priority === 'urgent' ? 'Urgent' : 'Normal'}
                    </div>
                  ) : (
                    <div className={`${styles.caseStatus} ${styles[caseItem.status]}`}>
                      {caseItem.status === 'accepted' ? (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                      )}
                      {caseItem.status === 'accepted' ? 'Accepted' : 'Declined'}
                    </div>
                  )}
                  <div className={styles.caseTime}>{caseItem.time}</div>
                </div>
                
                <div className={styles.caseContent}>
                  <div className={styles.requestingDoctor}>
                    <div className={`${styles.doctorAvatar} ${styles.small}`}>
                      <span>{caseItem.requestingDoctor.initials}</span>
                    </div>
                    <div className={styles.doctorInfo}>
                      <div className={styles.doctorName}>{caseItem.requestingDoctor.name}</div>
                      <div className={styles.doctorSpecialty}>{caseItem.requestingDoctor.specialty}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientInfo}>
                    <h3>Patient: {caseItem.patient.name}</h3>
                    <p className={styles.caseDescription}>
                      <strong>
                        {caseItem.status === 'pending' ? 'Collaboration Request:' : 
                         caseItem.status === 'accepted' ? 'Active Collaboration:' : 'Declined:'}
                      </strong> {caseItem.patient.description}
                    </p>
                  </div>
                  
                  {caseItem.status === 'pending' || caseItem.status === 'accepted' ? (
                    <div className={caseItem.status === 'accepted' ? styles.collaborationStatus : styles.caseDetails}>
                      {(caseItem.patient.details || caseItem.patient.statusUpdates)?.map((item, index) => (
                        <div key={index} className={styles.detailItem}>
                          <span className={styles.label}>{item.label}:</span>
                          <span className={styles.value}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.declineReason}>
                      <span className={styles.label}>Reason:</span>
                      <span className={styles.value}>{caseItem.patient.declineReason}</span>
                    </div>
                  )}
                  
                  {caseItem.patient.attachments && (
                    <div className={styles.attachments}>
                      {caseItem.patient.attachments.map((attachment, index) => (
                        <div key={index} className={styles.attachmentItem}>
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                          </svg>
                          {attachment}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={styles.caseActions}>
                  {caseItem.status === 'pending' ? (
                    <>
                      <button className={styles.btnSecondary} onClick={() => viewFullCase(caseItem.id)}>View Details</button>
                      <button className={styles.btnDecline} onClick={() => declineCase(caseItem.id)}>Decline</button>
                      <button className={styles.btnPrimary} onClick={() => acceptCase(caseItem.id)}>Accept Collaboration</button>
                    </>
                  ) : caseItem.status === 'accepted' ? (
                    <>
                      <button className={styles.btnSecondary} onClick={() => openChat(caseItem.id)}>Open Chat</button>
                      <button className={styles.btnPrimary} onClick={() => viewSharedNotes(caseItem.id)}>View Shared Notes</button>
                    </>
                  ) : (
                    <button className={styles.btnSecondary} onClick={() => viewDeclineDetails(caseItem.id)}>View Details</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitations;