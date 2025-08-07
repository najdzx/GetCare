import React, { useState } from 'react';
import styles from './Doctors.module.css';

const AppointmentsSection = ({ doctor }) => {
  // Dynamic appointments data based on the doctor
  const [appointmentsData, setAppointmentsData] = useState([
    {
      id: 1,
      doctorId: doctor?.id || 1,
      patientId: "P001",
      patientName: "John Smith",
      patientEmail: "john.smith@email.com",
      appointmentDate: "2025-08-07",
      appointmentTime: "09:00",
      duration: "30 min",
      type: "Consultation",
      clinic: "St. Mary's Medical Center",
      status: "Confirmed",
      notes: "Regular checkup for hypertension",
      isOnline: false,
      // Patient Details
      firstName: "John",
      lastName: "Smith",
      suffix: "",
      nickName: "Johnny",
      dateOfBirth: "1980-03-12",
      age: "44 years old",
      sex: "Male",
      bloodType: "O+",
      civilStatus: "Married",
      philHealthNo: "12-345678901-1",
      phone: "+1 (555) 123-4567",
      primaryMobile: "+1 (555) 123-4567",
      medicalConditions: "Hypertension\nHigh Cholesterol",
      allergies: "None Known",
      previousSurgeries: "None",
      familyHistory: "Father: Heart Disease\nMother: Diabetes",
      currentMedications: "Lisinopril 10mg - Once daily\nAtorvastatin 20mg - Once daily",
      supplements: "Multivitamin - Daily"
    },
    {
      id: 2,
      doctorId: doctor?.id || 1,
      patientId: "P002",
      patientName: "Maria Garcia",
      patientEmail: "maria.garcia@email.com",
      appointmentDate: "2025-08-07",
      appointmentTime: "10:30",
      duration: "45 min",
      type: "Follow-up",
      clinic: "St. Mary's Medical Center",
      status: "Confirmed",
      notes: "Diabetes monitoring and medication review",
      isOnline: false
    },
    {
      id: 3,
      doctorId: doctor?.id || 1,
      patientId: "P003",
      patientName: "Robert Johnson",
      patientEmail: "robert.j@email.com",
      appointmentDate: "2025-08-08",
      appointmentTime: "14:00",
      duration: "30 min",
      type: "Online Consultation",
      clinic: "Online",
      status: "Pending",
      notes: "Cardiac consultation via video call",
      isOnline: true,
      meetLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 4,
      doctorId: doctor?.id || 1,
      patientId: "P004",
      patientName: "Emily Davis",
      patientEmail: "emily.davis@email.com",
      appointmentDate: "2025-08-08",
      appointmentTime: "16:00",
      duration: "60 min",
      type: "Consultation",
      clinic: "Downtown Health Clinic",
      status: "Confirmed",
      notes: "Initial consultation for chronic pain",
      isOnline: false
    },
    {
      id: 5,
      doctorId: doctor?.id || 1,
      patientId: "P005",
      patientName: "Sarah Wilson",
      patientEmail: "sarah.wilson@email.com",
      appointmentDate: "2025-08-09",
      appointmentTime: "11:00",
      duration: "30 min",
      type: "Follow-up",
      clinic: "St. Mary's Medical Center",
      status: "Completed",
      notes: "Post-surgery follow-up",
      isOnline: false
    },
    {
      id: 6,
      doctorId: doctor?.id || 1,
      patientId: "P006",
      patientName: "David Brown",
      patientEmail: "david.brown@email.com",
      appointmentDate: "2025-08-10",
      appointmentTime: "09:30",
      duration: "45 min",
      type: "Online Consultation",
      clinic: "Online",
      status: "Confirmed",
      notes: "Second opinion consultation",
      isOnline: true,
      meetLink: "https://meet.google.com/xyz-uvwx-yz1"
    },
    {
      id: 7,
      doctorId: doctor?.id || 1,
      patientId: "P007",
      patientName: "Amanda Thompson",
      patientEmail: "amanda.t@email.com",
      appointmentDate: "2025-08-10",
      appointmentTime: "15:00",
      duration: "30 min",
      type: "Consultation",
      clinic: "St. Mary's Medical Center",
      status: "Cancelled",
      notes: "Patient requested rescheduling",
      isOnline: false
    },
    {
      id: 8,
      doctorId: doctor?.id || 1,
      patientId: "P008",
      patientName: "Michael Chen",
      patientEmail: "michael.chen@email.com",
      appointmentDate: "2025-08-11",
      appointmentTime: "13:00",
      duration: "30 min",
      type: "Online Consultation",
      clinic: "Online",
      status: "Confirmed",
      notes: "Follow-up telemedicine session",
      isOnline: true,
      meetLink: "https://meet.google.com/lmn-opqr-stu"
    },
    {
      id: 9,
      doctorId: doctor?.id || 1,
      patientId: "P009",
      patientName: "James Wilson",
      patientEmail: "james.wilson@email.com",
      appointmentDate: "2025-08-12",
      appointmentTime: "10:00",
      duration: "45 min",
      type: "Online Consultation",
      clinic: "Online",
      status: "Confirmed",
      notes: "Mental health consultation via video call",
      isOnline: true,
      meetLink: "https://meet.google.com/def-ghi-jkl"
    },
    {
      id: 10,
      doctorId: doctor?.id || 1,
      patientId: "P010",
      patientName: "Lisa Martinez",
      patientEmail: "lisa.martinez@email.com",
      appointmentDate: "2025-08-12",
      appointmentTime: "14:30",
      duration: "30 min",
      type: "Follow-up",
      clinic: "St. Mary's Medical Center",
      status: "Confirmed",
      notes: "Thyroid function test results review",
      isOnline: false
    }
  ]);

  // Filter states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatientForDetails, setSelectedPatientForDetails] = useState(null);
  const [editFormData, setEditFormData] = useState({
    patientId: '',
    patientName: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    duration: '',
    type: '',
    clinic: '',
    status: '',
    notes: '',
    isOnline: false,
    meetLink: ''
  });
  const [messageFormData, setMessageFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [adminNotes, setAdminNotes] = useState('');

  // Function to generate Google Meet link based on appointment details
  const generateMeetLink = (date, time, doctorId, patientId) => {
    // Create a unique identifier based on appointment details
    const appointmentHash = btoa(`${date}-${time}-${doctorId}-${patientId}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
    return `https://meet.google.com/${appointmentHash.substring(0, 3)}-${appointmentHash.substring(3, 7)}-${appointmentHash.substring(7, 11)}`;
  };

  // Handler functions
  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    const meetLink = appointment.isOnline 
      ? generateMeetLink(appointment.appointmentDate, appointment.appointmentTime, appointment.doctorId, appointment.patientId)
      : '';
    
    setEditFormData({
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      duration: appointment.duration,
      type: appointment.type,
      clinic: appointment.clinic,
      status: appointment.status,
      notes: appointment.notes || '',
      isOnline: appointment.isOnline,
      meetLink: meetLink
    });
    setAdminNotes('');
    setShowEditModal(true);
  };

  const handleMessagePatient = (appointment) => {
    setSelectedAppointment(appointment);
    setMessageFormData({
      subject: `Regarding your appointment on ${appointment.appointmentDate}`,
      message: '',
      priority: 'normal'
    });
    setShowMessageModal(true);
  };

  const handleSaveAppointment = () => {
    const updatedAppointments = appointmentsData.map(apt => {
      if (apt.id === selectedAppointment.id) {
        // Auto-generate meet link if appointment is online
        const meetLink = editFormData.isOnline 
          ? generateMeetLink(editFormData.appointmentDate, editFormData.appointmentTime, apt.doctorId, apt.patientId)
          : '';
        
        return {
          ...apt,
          ...editFormData,
          meetLink: meetLink,
          lastModified: new Date().toISOString(),
          adminNotes: adminNotes ? `${new Date().toLocaleDateString()}: ${adminNotes}${apt.adminNotes ? '\n' + apt.adminNotes : ''}` : apt.adminNotes
        };
      }
      return apt;
    });
    setAppointmentsData(updatedAppointments);
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = () => {
    if (window.confirm('Are you sure you want to delete this appointment? A notification will be sent to the patient.')) {
      // Create deletion notification message
      const deletionNote = `Your appointment scheduled for ${new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })} at ${selectedAppointment.appointmentTime} has been cancelled by the medical staff.`;
      
      // Send notification to patient (in real app, this would be an API call)
      console.log('Sending deletion notification:', {
        to: selectedAppointment.patientEmail,
        subject: 'Appointment Cancellation Notice',
        message: deletionNote,
        priority: 'high',
        appointmentId: selectedAppointment.id,
        reason: adminNotes || 'No reason provided'
      });

      // Delete the appointment
      const updatedAppointments = appointmentsData.filter(apt => apt.id !== selectedAppointment.id);
      setAppointmentsData(updatedAppointments);

      // Show success message
      alert(`Appointment deleted successfully. Notification sent to ${selectedAppointment.patientEmail}`);
      
      setShowEditModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleSendMessage = () => {
    // Here you would integrate with your messaging system
    console.log('Sending message:', {
      to: selectedAppointment.patientEmail,
      subject: messageFormData.subject,
      message: messageFormData.message,
      priority: messageFormData.priority
    });
    alert('Message sent successfully!');
    setShowMessageModal(false);
    setSelectedAppointment(null);
  };

  // Patient details handlers
  const handleViewPatientDetails = (appointment) => {
    setSelectedPatientForDetails(appointment);
    setShowPatientDetailsModal(true);
  };

  const closePatientDetailsModal = () => {
    setShowPatientDetailsModal(false);
    setSelectedPatientForDetails(null);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowMessageModal(false);
    setSelectedAppointment(null);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter appointments based on selected criteria and doctor
  const doctorId = doctor?.id || 1;
  const filteredAppointments = appointmentsData.filter(appointment => {
    const doctorMatch = appointment.doctorId === doctorId || appointment.doctorId === 1;
    
    // Improved date matching - normalize both dates for comparison
    const dateMatch = !selectedDate || appointment.appointmentDate === selectedDate;
    
    const statusMatch = selectedStatus === 'all' || appointment.status.toLowerCase() === selectedStatus;
    const typeMatch = selectedType === 'all' || appointment.type.toLowerCase().includes(selectedType.toLowerCase());
    const locationMatch = selectedLocation === 'all' || 
      (selectedLocation === 'online' && appointment.isOnline) ||
      (selectedLocation === 'clinic' && !appointment.isOnline);
    
    return doctorMatch && dateMatch && statusMatch && typeMatch && locationMatch;
  });

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const date = appointment.appointmentDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(appointment);
    return groups;
  }, {});

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return styles.statusConfirmed;
      case 'pending':
        return styles.statusPending;
      case 'completed':
        return styles.statusCompleted;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'consultation':
        return styles.typeConsultation;
      case 'follow-up':
        return styles.typeFollowUp;
      case 'online consultation':
        return styles.typeOnline;
      default:
        return styles.typeDefault;
    }
  };

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

  return (
    <div className={styles.availabilityTabContent}>
      <div className={styles.appointmentsSection}>
        {/* Filters */}
        <div className={styles.appointmentsFilters}>
          <div className={styles.filterGroup}>
            <label htmlFor="dateFilter">Filter by Date:</label>
            <input
              id="dateFilter"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles.filterInput}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="statusFilter">Status:</label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="typeFilter">Type:</label>
            <select
              id="typeFilter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="online">Online Consultation</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="locationFilter">Location:</label>
            <select
              id="locationFilter"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Locations</option>
              <option value="clinic">In-Clinic</option>
              <option value="online">Online</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <button
              className="global-btn secondary"
              onClick={() => {
                setSelectedDate('');
                setSelectedStatus('all');
                setSelectedType('all');
                setSelectedLocation('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Appointments Summary */}
        <div className={styles.appointmentsSummary}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryNumber}>{filteredAppointments.length}</span>
            <span className={styles.summaryLabel}>Total Appointments</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryNumber}>
              {filteredAppointments.filter(apt => apt.status === 'Confirmed').length}
            </span>
            <span className={styles.summaryLabel}>Confirmed</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryNumber}>
              {filteredAppointments.filter(apt => apt.status === 'Pending').length}
            </span>
            <span className={styles.summaryLabel}>Pending</span>
          </div>
        </div>

        {/* Appointments List */}
        <div className={styles.appointmentsList}>
          {Object.keys(groupedAppointments).length === 0 ? (
            <div className={styles.noAppointments}>
              <p>No appointments found matching the selected criteria.</p>
            </div>
          ) : (
            Object.entries(groupedAppointments)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([date, appointments]) => (
                <div key={date} className={styles.appointmentDateGroup}>
                  <div className={styles.appointmentDateHeader}>
                    <h4>{formatDate(date)}</h4>
                    <span className={styles.appointmentCount}>
                      {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className={styles.appointmentCards}>
                    {appointments
                      .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
                      .map(appointment => (
                        <div key={appointment.id} className={styles.appointmentCard}>
                          <div className={styles.appointmentCardHeader}>
                            <div className={styles.appointmentTime}>
                              <span className={styles.time}>{formatTime(appointment.appointmentTime)}</span>
                              <span className={styles.duration}>({appointment.duration})</span>
                            </div>
                            <div className={styles.appointmentBadges}>
                              <span className={`${styles.typeBadge} ${getTypeBadgeClass(appointment.type)}`}>
                                {appointment.type}
                              </span>
                              <span className={`${styles.statusBadge} ${getStatusBadgeClass(appointment.status)}`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className={styles.appointmentContent}>
                            <div className={styles.patientInfo}>
                              <h5>{appointment.patientName}</h5>
                              <span className={styles.patientEmail}>{appointment.patientEmail}</span>
                            </div>
                            
                            <div className={styles.appointmentDetails}>
                              <div className={styles.appointmentDetailRow}>
                                <label>Clinic:</label>
                                <span>{appointment.clinic}</span>
                              </div>
                              {appointment.isOnline && appointment.meetLink && (
                                <div className={styles.appointmentDetailRow}>
                                  <label>Meeting Link:</label>
                                  <div className={styles.meetLinkContainer}>
                                    <a 
                                      href={appointment.meetLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className={styles.meetLink}
                                    >
                                      {appointment.meetLink}
                                    </a>
                                    <button
                                      className={styles.copyLinkBtn}
                                      onClick={() => navigator.clipboard.writeText(appointment.meetLink)}
                                      title="Copy link"
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}
                              {appointment.notes && (
                                <div className={styles.appointmentDetailRow}>
                                  <label>Notes:</label>
                                  <span>{appointment.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className={styles.appointmentActions}>
                            <button 
                              className="global-btn secondary" 
                              title="View Patient Details"
                              onClick={() => handleViewPatientDetails(appointment)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button 
                              className="global-btn secondary" 
                              title="Edit Appointment"
                              onClick={() => handleEditAppointment(appointment)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button 
                              className="global-btn secondary" 
                              title="Message Patient"
                              onClick={() => handleMessagePatient(appointment)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            {appointment.status === 'Pending' && (
                              <button className="global-btn" title="Confirm Appointment">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Edit Appointment Modal */}
      {showEditModal && (
        <div className={styles.appointmentModalOverlay} onClick={closeModals}>
          <div className={styles.appointmentModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.appointmentModalHeader}>
              <h3>Edit Appointment</h3>
              <button className={styles.appointmentCloseModal} onClick={closeModals}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.appointmentModalContent}>
              <div className={styles.appointmentModalForm}>
                <div className={styles.appointmentFormRow}>
                  <div className={styles.appointmentFormGroup}>
                    <label>Patient ID</label>
                    <input
                      type="text"
                      value={editFormData.patientId}
                      className={`${styles.appointmentFormInput} ${styles.appointmentDisabledInput}`}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className={styles.appointmentFormGroup}>
                    <label>Patient Name</label>
                    <input
                      type="text"
                      value={editFormData.patientName}
                      className={`${styles.appointmentFormInput} ${styles.appointmentDisabledInput}`}
                      disabled
                      readOnly
                    />
                  </div>
                </div>

                <div className={styles.appointmentFormRow}>
                  <div className={styles.appointmentFormGroup}>
                    <label>Patient Email *</label>
                    <input
                      type="email"
                      value={editFormData.patientEmail}
                      onChange={(e) => setEditFormData({...editFormData, patientEmail: e.target.value})}
                      className={styles.appointmentFormInput}
                      required
                    />
                  </div>
                </div>

                <div className={styles.appointmentFormRow}>
                  <div className={styles.appointmentFormGroup}>
                    <label>Date *</label>
                    <input
                      type="date"
                      value={editFormData.appointmentDate}
                      onChange={(e) => setEditFormData({...editFormData, appointmentDate: e.target.value})}
                      className={styles.appointmentFormInput}
                      required
                    />
                  </div>
                  <div className={styles.appointmentFormGroup}>
                    <label>Time *</label>
                    <input
                      type="time"
                      value={editFormData.appointmentTime}
                      onChange={(e) => setEditFormData({...editFormData, appointmentTime: e.target.value})}
                      className={styles.appointmentFormInput}
                      required
                    />
                  </div>
                  <div className={styles.appointmentFormGroup}>
                    <label>Duration *</label>
                    <select
                      value={editFormData.duration}
                      onChange={(e) => setEditFormData({...editFormData, duration: e.target.value})}
                      className={styles.appointmentFormSelect}
                      required
                    >
                      <option value="">Select Duration</option>
                      <option value="15 min">15 minutes</option>
                      <option value="30 min">30 minutes</option>
                      <option value="45 min">45 minutes</option>
                      <option value="60 min">1 hour</option>
                      <option value="90 min">1.5 hours</option>
                      <option value="120 min">2 hours</option>
                    </select>
                  </div>
                </div>

                <div className={styles.appointmentFormRow}>
                  <div className={styles.appointmentFormGroup}>
                    <label>Type *</label>
                    <select
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({...editFormData, type: e.target.value})}
                      className={styles.appointmentFormSelect}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Online Consultation">Online Consultation</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Check-up">Check-up</option>
                    </select>
                  </div>
                  <div className={styles.appointmentFormGroup}>
                    <label>Status *</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                      className={styles.appointmentFormSelect}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="No Show">No Show</option>
                    </select>
                  </div>
                </div>

                <div className={styles.appointmentFormGroup}>
                  <div className={styles.appointmentCheckboxLabel}>
                    <input
                      type="checkbox"
                      checked={editFormData.isOnline}
                      onChange={(e) => {
                        const isOnline = e.target.checked;
                        const meetLink = isOnline 
                          ? generateMeetLink(editFormData.appointmentDate, editFormData.appointmentTime, selectedAppointment?.doctorId, selectedAppointment?.patientId)
                          : '';
                        setEditFormData({
                          ...editFormData, 
                          isOnline: isOnline, 
                          clinic: isOnline ? 'Online' : '',
                          meetLink: meetLink
                        });
                      }}
                      className={styles.appointmentFormCheckbox}
                    />
                    <span>Online Appointment</span>
                  </div>
                </div>

                {editFormData.isOnline ? (
                  <div className={styles.appointmentFormGroup}>
                    <label>Google Meet Link (Auto-generated)</label>
                    <input
                      type="url"
                      value={editFormData.meetLink}
                      className={`${styles.appointmentFormInput} ${styles.appointmentDisabledInput}`}
                      disabled
                      readOnly
                    />
                    <small className={styles.appointmentFormHint}>Google Meet link is automatically generated based on appointment details.</small>
                  </div>
                ) : (
                  <div className={styles.appointmentFormGroup}>
                    <label>Clinic/Location *</label>
                    <select
                      value={editFormData.clinic}
                      onChange={(e) => setEditFormData({...editFormData, clinic: e.target.value})}
                      className={styles.appointmentFormSelect}
                      required
                    >
                      <option value="">Select Clinic</option>
                      <option value="St. Mary's Medical Center">St. Mary's Medical Center</option>
                      <option value="Downtown Health Clinic">Downtown Health Clinic</option>
                      <option value="Westside Medical Plaza">Westside Medical Plaza</option>
                      <option value="Community Health Center">Community Health Center</option>
                    </select>
                  </div>
                )}

                <div className={styles.appointmentFormGroup}>
                  <label>Patient Notes</label>
                  <textarea
                    value={editFormData.notes}
                    onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                    className={styles.appointmentFormTextarea}
                    rows="3"
                    placeholder="Add any notes about this appointment..."
                  />
                </div>

                <div className={styles.appointmentFormGroup}>
                  <label>Admin Notes (Internal)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className={styles.appointmentFormTextarea}
                    rows="2"
                    placeholder="Add internal notes about changes made..."
                  />
                  <small className={styles.appointmentFormHint}>These notes will be saved with timestamp and are for internal use only.</small>
                </div>

                {selectedAppointment?.adminNotes && (
                  <div className={styles.appointmentFormGroup}>
                    <label>Previous Admin Notes</label>
                    <div className={styles.appointmentPreviousNotes}>
                      {selectedAppointment.adminNotes}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.appointmentModalFooter}>
              <button 
                className="global-btn danger" 
                onClick={handleDeleteAppointment}
                style={{ marginRight: 'auto' }}
              >
                Delete Appointment
              </button>
              <button className="global-btn secondary" onClick={closeModals}>
                Cancel
              </button>
              <button className="global-btn" onClick={handleSaveAppointment}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Patient Modal */}
      {showMessageModal && (
        <div className={styles.messageModalOverlay} onClick={closeModals}>
          <div className={styles.messageModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.messageModalHeader}>
              <h3>Send Message to {selectedAppointment?.patientName}</h3>
              <button className={styles.messageCloseModal} onClick={closeModals}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.messageModalContent}>
              <div className={styles.messageInfo}>
                <div className={styles.messageInfoRow}>
                  <strong>To:</strong> {selectedAppointment?.patientEmail}
                </div>
                <div className={styles.messageInfoRow}>
                  <strong>Appointment:</strong> {selectedAppointment && formatDate(selectedAppointment.appointmentDate)} at {selectedAppointment && formatTime(selectedAppointment.appointmentTime)}
                </div>
              </div>

              <div className={styles.messageModalForm}>
                <div className={styles.messageFormRow}>
                  <div className={styles.messageFormGroup}>
                    <label>Priority</label>
                    <select
                      value={messageFormData.priority}
                      onChange={(e) => setMessageFormData({...messageFormData, priority: e.target.value})}
                      className={styles.messageFormSelect}
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className={styles.messageFormGroup}>
                  <label>Subject *</label>
                  <input
                    type="text"
                    value={messageFormData.subject}
                    onChange={(e) => setMessageFormData({...messageFormData, subject: e.target.value})}
                    className={styles.messageFormInput}
                    required
                  />
                </div>

                <div className={styles.messageFormGroup}>
                  <label>Message *</label>
                  <textarea
                    value={messageFormData.message}
                    onChange={(e) => setMessageFormData({...messageFormData, message: e.target.value})}
                    className={styles.messageFormTextarea}
                    rows="6"
                    placeholder="Type your message here..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.messageModalFooter}>
              <button className="global-btn secondary" onClick={closeModals}>
                Cancel
              </button>
              <button className="global-btn" onClick={handleSendMessage}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientDetailsModal && selectedPatientForDetails && (
        <div className={styles.patientModalOverlay} onClick={closePatientDetailsModal}>
          <div className={styles.patientModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.patientModalHeader}>
              <h2>{selectedPatientForDetails.firstName || selectedPatientForDetails.patientName.split(' ')[0]} {selectedPatientForDetails.lastName || selectedPatientForDetails.patientName.split(' ')[1]}</h2>
              <button className={styles.patientCloseBtn} onClick={closePatientDetailsModal}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.patientModalBody}>
              <div className={styles.patientDetailsContainer}>
                {/* Basic Information Section */}
                <div className={styles.patientDetailsSection}>
                  <h3 className={styles.patientSectionTitle}>Basic Information</h3>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Patient ID</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.patientId}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>First Name</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.firstName || selectedPatientForDetails.patientName.split(' ')[0]}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Middle Name</label>
                      <div className={styles.patientReadonlyInput}>-</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Last Name</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.lastName || selectedPatientForDetails.patientName.split(' ')[1]}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Sex</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.sex || '-'}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Date of Birth</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.dateOfBirth 
                          ? new Date(selectedPatientForDetails.dateOfBirth).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : '-'
                        }
                      </div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Age</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.age || '-'}</div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Blood Type</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.bloodType || '-'}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Phone Number</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.primaryMobile || selectedPatientForDetails.phone || '-'}</div>
                    </div>
                    <div className={styles.patientFormGroup}>
                      <label>Email Address</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.patientEmail}</div>
                    </div>
                  </div>
                  
                </div>

                {/* Medical Background */}
                <div className={styles.patientDetailsSection}>
                  <h3 className={styles.patientSectionTitle}>Medical Background</h3>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Known Medical Conditions</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.medicalConditions ? 
                          selectedPatientForDetails.medicalConditions.split('\n').map((condition, index) => (
                            <div key={index}>{condition}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Allergies</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.allergies && selectedPatientForDetails.allergies !== 'None Known' ? 
                          selectedPatientForDetails.allergies.split('\n').map((allergy, index) => (
                            <div key={index}>{allergy}</div>
                          )) : 
                          'None recorded'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Previous Surgeries</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.previousSurgeries && selectedPatientForDetails.previousSurgeries !== 'None' ? 
                          selectedPatientForDetails.previousSurgeries.split('\n').map((surgery, index) => (
                            <div key={index}>{surgery}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Family History</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.familyHistory ? 
                          selectedPatientForDetails.familyHistory.split('\n').map((history, index) => (
                            <div key={index}>{history}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Current Medications</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.currentMedications ? 
                          selectedPatientForDetails.currentMedications.split('\n').map((med, index) => (
                            <div key={index}>{med}</div>
                          )) : 
                          'None recorded'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Supplements</label>
                      <div className={styles.patientReadonlyInput}>
                        {selectedPatientForDetails.supplements ? 
                          selectedPatientForDetails.supplements.split('\n').map((supplement, index) => (
                            <div key={index}>{supplement}</div>
                          )) : 
                          '-'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Concern */}
                <div className={styles.patientDetailsSection}>
                  <h3 className={styles.patientSectionTitle}>Concern</h3>
                  
                  <div className={styles.patientFormRow}>
                    <div className={styles.patientFormGroup}>
                      <label>Current Concern</label>
                      <div className={styles.patientReadonlyInput}>{selectedPatientForDetails.notes || '-'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsSection;
