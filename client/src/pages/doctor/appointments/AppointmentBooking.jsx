import React, { useState, useEffect } from 'react';
import styles from './Appointments.module.css';
import { showToast } from '../../../components/Layout/toast';

const AppointmentBooking = ({ onClose, onAppointmentCreated, rescheduleTarget }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Google Meet integration state
  const [isCreatingMeetLink, setIsCreatingMeetLink] = useState(false);
  const [meetLinkError, setMeetLinkError] = useState('');
  const [googleMeetLink, setGoogleMeetLink] = useState(null);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);

  // Mock patient data (in real app, this would come from API)
  const patients = [
    { id: 1, name: 'John Smith', phone: '(555) 123-4567', email: 'john@email.com', lastVisit: '2024-11-15', condition: 'Diabetes' },
    { id: 2, name: 'Mary Johnson', phone: '(555) 234-5678', email: 'mary@email.com', lastVisit: '2024-11-10', condition: 'Hypertension' },
    { id: 3, name: 'Robert Brown', phone: '(555) 345-6789', email: 'robert@email.com', lastVisit: '2024-11-08', condition: 'Cardiology' },
    { id: 4, name: 'Sarah Davis', phone: '(555) 456-7890', email: 'sarah@email.com', lastVisit: '2024-11-05', condition: 'Orthopedics' },
    { id: 5, name: 'Michael Wilson', phone: '(555) 567-8901', email: 'michael@email.com', lastVisit: '2024-11-01', condition: 'Neurology' },
    { id: 6, name: 'Lisa Anderson', phone: '(555) 678-9012', email: 'lisa@email.com', lastVisit: '2024-10-28', condition: 'Dermatology' },
    { id: 7, name: 'David Miller', phone: '(555) 789-0123', email: 'david@email.com', lastVisit: '2024-10-25', condition: 'Pediatrics' },
    { id: 8, name: 'Emily Garcia', phone: '(555) 890-1234', email: 'emily@email.com', lastVisit: '2024-10-22', condition: 'Psychiatry' }
  ];

  const appointmentTypes = [
    {
      id: 'face-to-face',
      name: 'Face-to-Face',
      description: 'Visit the patient at the clinic for in-person consultation',
      icon: (
        <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
        </svg>
      ),
      benefits: ['Physical examination', 'Direct interaction', 'Complete assessment']
    },
    {
      id: 'online',
      name: 'Online Consultation',
      description: 'Connect with the patient via secure video call',
      icon: (
        <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
      ),
      benefits: ['Convenient for patient', 'No travel required', 'Secure video call']
    }
  ];

  const clinics = [
    { id: 1, name: 'Main Clinic', address: '123 Medical Center Dr', phone: '(555) 100-1000' },
    { id: 2, name: 'Downtown Medical Center', address: '456 Downtown St', phone: '(555) 200-2000' },
    { id: 3, name: 'Emergency Clinic', address: '789 Emergency Ave', phone: '(555) 300-3000' }
  ];

  const goToStep = (step) => {
    // During reschedule, only allow steps 3 and 4
    if (rescheduleTarget) {
      if (step >= 3 && step <= 4) {
        setCurrentStep(step);
      }
    } else {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    // When rescheduling, user should only change date/time and confirm
    if (rescheduleTarget) {
      if (currentStep === 3) setCurrentStep(4);
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    // Disable going back to previous steps during reschedule
    if (rescheduleTarget) return;
    
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextEnabled = () => {
    if (currentStep === 1) return selectedPatient !== null;
    if (currentStep === 2) return selectedAppointmentType !== null;
    if (currentStep === 3) return selectedDate && selectedTime && selectedTime.trim() !== '';
    return false;
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const selectAppointmentType = (type) => {
    setSelectedAppointmentType(type);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Google authentication functions (copied from patient system)
  const checkGoogleAuthStatus = async (notify = false) => {
    try {
      const response = await fetch('http://localhost:5000/auth/status', {
        credentials: 'include'
      });
      const data = await response.json();
      setIsGoogleAuthenticated(data.authenticated || false);
      if (notify) {
        if (data.authenticated) {
          showToast('Google account connected', 'success');
        } else {
          showToast('Google not connected', 'warning');
        }
      }
    } catch (error) {
      setIsGoogleAuthenticated(false);
      if (notify) showToast('Failed to check Google auth status', 'error');
    }
  };

  // Check Google auth status when component loads
  useEffect(() => {
    checkGoogleAuthStatus();
  }, []);

  // Handle reschedule target - pre-fill form data
  useEffect(() => {
    if (rescheduleTarget) {
      // Pre-fill the form with existing appointment data
      setSelectedPatient({
        id: rescheduleTarget.patientId || 1,
        name: rescheduleTarget.patientName || rescheduleTarget.patient,
        condition: rescheduleTarget.condition || 'General consultation'
      });
      setSelectedAppointmentType(rescheduleTarget.meetingType || 'face-to-face');
      setAppointmentNotes(rescheduleTarget.notes || '');
      setSelectedClinic(rescheduleTarget.location || '');
      
      // Parse the original date and time
      const originalDate = new Date(rescheduleTarget.originalDate);
      setSelectedDate(originalDate); // Use the Date object, not the string
      setSelectedTime(rescheduleTarget.time);
      
      // Start at step 3 (date/time selection) for rescheduling
      setCurrentStep(3);
    }
  }, [rescheduleTarget]);

  const handleGoogleAuth = async () => {
    try {
      const popup = window.open('http://localhost:5000/auth/google', 'google-auth', 'width=500,height=600');
      if (!popup) {
        showToast('Popup blocked. Please allow popups and try again.', 'error');
        window.location.href = 'http://localhost:5000/auth/google';
        return;
      }

      const pollTimer = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(pollTimer);
            checkGoogleAuthStatus(true);
          }
        } catch (error) {
          clearInterval(pollTimer);
          checkGoogleAuthStatus(true);
        }
      }, 1000);
    } catch (error) {
      showToast('Error during Google authentication', 'error');
      console.error('Authentication error:', error);
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className={`${styles.calendarDay} ${styles.disabled}`}></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < today.setHours(0, 0, 0, 0);
      
      days.push(
        <div
          key={day}
          className={`${styles.calendarDay} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''} ${isPast ? styles.disabled : ''}`}
          onClick={() => !isPast && setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Helper function to parse time string and create event title
  const parseTime24h = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  const buildEventTitle = (patientName, dateTime, timeStr) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateStr = dateTime.toLocaleDateString('en-US', options);
    return `Medical Appointment - ${patientName} | ${dateStr} at ${timeStr}`;
  };

  const createGoogleMeetLink = async () => {
    setIsCreatingMeetLink(true);
    setMeetLinkError('');

    try {
      // Prepare appointment data using current selected values
      const startDateTime = new Date(selectedDate);
      const { hours, minutes } = parseTime24h(selectedTime);
      startDateTime.setHours(hours, minutes, 0, 0);
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 1); // 1 hour appointment

      const title = buildEventTitle(selectedPatient?.name, startDateTime, selectedTime);
      console.log('Creating appointment with title:', title);

      const response = await fetch('http://localhost:5000/api/create-meet-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          description: `Medical appointment scheduled via GetCare platform - Doctor's appointment with ${selectedPatient?.name}`,
          attendees: [], // Doctor will invite patient separately
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
        })
      });

      const data = await response.json();

      if (data.success) {
        const preferredLink = data.meetLink || data.eventLink;
        setGoogleMeetLink(preferredLink);
        showToast('Google Meet link created successfully!', 'success');
        console.log('Google Meet link created successfully:', preferredLink);
        return { link: preferredLink, eventId: data.eventId, meetLink: data.meetLink, eventLink: data.eventLink };
      } else {
        setMeetLinkError(data.error || 'Failed to create Google Meet link');
        showToast('Failed to create Google Meet link', 'error');
        console.error('Failed to create Google Meet link:', data.error);
        return null;
      }
    } catch (err) {
      setMeetLinkError('Error creating Google Meet link: ' + err.message);
      showToast('Error creating Google Meet link', 'error');
      console.error('Error creating Google Meet link:', err);
      return null;
    } finally {
      setIsCreatingMeetLink(false);
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const renderPatients = () => {
    return filteredPatients.map(patient => (
      <div
        key={patient.id}
        className={`${styles.doctorCard} ${selectedPatient?.id === patient.id ? styles.selected : ''}`}
        onClick={() => selectPatient(patient)}
      >
        <div className={styles.doctorHeader}>
          <div className={styles.doctorAvatar}>{patient.name.charAt(0)}</div>
          <div className={styles.doctorInfo}>
            <h4>{patient.name}</h4>
            <span className={styles.doctorSpecialty}>{patient.condition}</span>
          </div>
        </div>
        <div className={styles.doctorDetails}>
          <div className={styles.detailItem}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.6a6.5 6.5 0 0 1-1.747-.075l-.105-.025a.678.678 0 0 1-.155-.08l-4.125-2.649a.678.678 0 0 1-.155-.08L2.565 6.9a.678.678 0 0 0-.58-.122L.191 7.572a.678.678 0 0 0-.063 1.015l1.794 2.307a.678.678 0 0 0 1.015.063l1.034-1.034c.484-.483.661-1.169.45-1.77a17.568 17.568 0 0 0-4.168-6.608z"/>
            </svg>
            {patient.phone}
          </div>
          <div className={styles.detailItem}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
            </svg>
            {patient.email}
          </div>
          <div className={styles.detailItem}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            Last visit: {patient.lastVisit}
          </div>
        </div>
      </div>
    ));
  };

  const confirmAppointment = async () => {
    const appointmentDate = selectedDate;
    
    // If rescheduling an existing appointment
    if (rescheduleTarget) {
      // Compute new start/end times
      const startDateTime = new Date(selectedDate);
      const { hours, minutes } = parseTime24h(selectedTime);
      startDateTime.setHours(hours, minutes, 0, 0);
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 1);

      // If it's an online appointment with Google Meet and we have eventId
      if (rescheduleTarget.meetingType === 'online' && rescheduleTarget.eventId && isGoogleAuthenticated) {
        try {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
          const startISO = startDateTime.toISOString();
          const endISO = endDateTime.toISOString();
          const title = buildEventTitle(rescheduleTarget.patientName, startDateTime, selectedTime);
          
          const resp = await fetch('http://localhost:5000/api/update-meet-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              eventId: rescheduleTarget.eventId,
              startTime: startISO,
              endTime: endISO,
              timeZone,
              title
            })
          });
          
          const data = await resp.json();
          if (!resp.ok || !data.success) throw new Error(data.error || 'Update failed');
          
          // Update appointment with new date/time and updated meet link
          const updatedAppointment = {
            ...rescheduleTarget,
            time: selectedTime,
            notes: appointmentNotes,
            meetLink: (data.meetLink || data.eventLink) ? (data.meetLink || data.eventLink).replace('https://', '') : rescheduleTarget.meetLink
          };
          
          onAppointmentCreated(appointmentDate, updatedAppointment);
          showToast('Appointment rescheduled with updated Google Meet link!', 'success');
          return;
        } catch (e) {
          console.error('Failed to update Google Calendar event:', e);
          // Fallback: just update local date/time
          const updatedAppointment = {
            ...rescheduleTarget,
            time: selectedTime,
            notes: appointmentNotes
          };
          onAppointmentCreated(appointmentDate, updatedAppointment);
          showToast('Rescheduled locally (calendar update failed)', 'warning');
          return;
        }
      } else {
        // Face-to-face or missing event id: update locally
        const updatedAppointment = {
          ...rescheduleTarget,
          time: selectedTime,
          notes: appointmentNotes,
          location: rescheduleTarget.meetingType === 'face-to-face' ? (selectedClinic || rescheduleTarget.location) : undefined
        };
        onAppointmentCreated(appointmentDate, updatedAppointment);
        showToast('Appointment rescheduled successfully!', 'success');
        return;
      }
    }
    
    // If it's an online appointment and Google is authenticated, create Google Meet link
    if (selectedAppointmentType === 'online' && isGoogleAuthenticated) {
      setIsCreatingMeetLink(true);
      try {
        const creation = await createGoogleMeetLink();
        const link = creation?.link || null;
        const eventId = creation?.eventId || null;
        
        const newAppointment = {
          time: selectedTime, // This is already in HH:MM format from the time input
          patient: selectedPatient.name,
          patientName: selectedPatient.name,
          type: 'consultation', // Default for doctor-created appointments
          meetingType: selectedAppointmentType,
          notes: appointmentNotes,
          meetLink: link, // Keep full URL for proper linking
          eventId: eventId
        };

        onAppointmentCreated(appointmentDate, newAppointment);
        showToast('Appointment created successfully with Google Meet link!', 'success');
        console.log('Appointment created with Google Meet link:', link);
      } catch (error) {
        console.error('Failed to create Google Meet link:', error);
        // Still create appointment but without meet link
        const newAppointment = {
          time: selectedTime,
          patient: selectedPatient.name,
          patientName: selectedPatient.name,
          type: 'consultation',
          meetingType: selectedAppointmentType,
          notes: appointmentNotes,
          meetLink: null
        };
        onAppointmentCreated(appointmentDate, newAppointment);
        showToast('Appointment created (Google Meet link will be available once authenticated)', 'warning');
      } finally {
        setIsCreatingMeetLink(false);
      }
    } else if (selectedAppointmentType === 'online') {
      // Online appointment but Google auth not available - create with placeholder
      console.log('Creating online appointment without Google authentication');
      const newAppointment = {
        time: selectedTime,
        patient: selectedPatient.name,
        patientName: selectedPatient.name,
        type: 'consultation',
        meetingType: selectedAppointmentType,
        notes: appointmentNotes,
        meetLink: 'meet.google.com/xxx-xxxx-xxx', // Placeholder link
        needsGoogleAuth: true
      };
      onAppointmentCreated(appointmentDate, newAppointment);
    } else {
      // For face-to-face appointments
      const newAppointment = {
        time: selectedTime,
        patient: selectedPatient.name,
        patientName: selectedPatient.name,
        type: 'consultation',
        meetingType: selectedAppointmentType,
        notes: appointmentNotes,
        location: selectedClinic || 'Main Clinic'
      };

      onAppointmentCreated(appointmentDate, newAppointment);
      showToast('Face-to-face appointment created successfully!', 'success');
    }
    
    onClose();
  };

  return (
    <div className={styles.bookingContainer}>
      {/* Step Indicator */}
      <div className={styles.stepIndicator}>
        {[1, 2, 3, 4].map(step => {
          let stepClass = styles.step;
          if (step === currentStep) stepClass += ` ${styles.active}`;
          if (step < currentStep) stepClass += ` ${styles.completed}`;
          
          return (
            <div key={step} className={stepClass} data-step={step} onClick={() => goToStep(step)}>
              <div className={styles.stepNumber}>{step}</div>
              <span>
                {step === 1 && 'Select Patient'}
                {step === 2 && 'Appointment Type'}
                {step === 3 && 'Date & Time'}
                {step === 4 && 'Confirm'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Content with Scrolling */}
      <div className={styles.mainContent}>
        {/* Step 1: Patient Selection */}
        <div className={`${styles.stepContent} ${currentStep === 1 ? styles.active : ''}`}>
          <div className={styles.sectionHeader}>
            <h3>Select Patient</h3>
            <p>Choose the patient for this appointment</p>
          </div>

          <div className={styles.searchFilter}>
            <div className={styles.searchBox}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search patients by name or condition..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className={styles.doctorsGrid}>
            {renderPatients()}
          </div>
        </div>

      {/* Step 2: Appointment Type Selection */}
      <div className={`${styles.stepContent} ${currentStep === 2 ? styles.active : ''}`}>
        <div className={styles.sectionHeader}>
          <h3>Choose Appointment Type</h3>
          <p>Select how you'd like to meet with the patient</p>
        </div>

        <div className={styles.appointmentTypes}>
          {appointmentTypes.map(type => (
            <div
              key={type.id}
              className={`${styles.typeCard} ${selectedAppointmentType === type.id ? styles.selected : ''}`}
              onClick={() => selectAppointmentType(type.id)}
            >
              <div className={styles.typeIcon}>{type.icon}</div>
              <h4>{type.name}</h4>
              <p>{type.description}</p>
              <div className={styles.typeBenefits}>
                {type.benefits.map((benefit, index) => (
                  <span key={index}>• {benefit}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clinic Selection (shown when face-to-face is selected) */}
        {selectedAppointmentType === 'face-to-face' && (
          <div className={styles.clinicSelection}>
            <h4>Select Clinic Location</h4>
            <p>Choose which clinic for the appointment</p>
            <div className={styles.clinicsGrid}>
              {clinics.map(clinic => (
                <div
                  key={clinic.id}
                  className={`${styles.clinicCard} ${selectedClinic === clinic.name ? styles.selected : ''}`}
                  onClick={() => setSelectedClinic(clinic.name)}
                >
                  <h5>{clinic.name}</h5>
                  <p>{clinic.address}</p>
                  <span>{clinic.phone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google Meet Integration (shown when online is selected) */}
        {selectedAppointmentType === 'online' && (
          <div className={styles.onlineInfo}>
            {!isGoogleAuthenticated ? (
              <div className={styles.googleAuthCard}>
                <div className={styles.authIcon}>
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                  </svg>
                </div>
                <h4>Google Meet Integration Required</h4>
                <p>To create secure Google Meet links for your online appointments, please authenticate with your Google account.</p>
                <p style={{fontSize: '12px', color: '#666', marginBottom: '12px'}}>
                  Status: {isGoogleAuthenticated ? '✅ Connected' : '❌ Not connected'}
                </p>
                <button 
                  type="button"
                  className="global-btn primary"
                  onClick={(e) => { e.preventDefault(); handleGoogleAuth(); }}
                  style={{ marginTop: '1rem' }}
                >
                  Connect with Google
                </button>
                <button 
                  type="button"
                  className="global-btn secondary"
                  onClick={(e) => { e.preventDefault(); checkGoogleAuthStatus(true); }}
                  style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
                >
                  Check Status
                </button>
              </div>
            ) : (
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                </div>
                <h4>Google Meet Link Ready</h4>
                <p>A secure Google Meet link will be automatically generated for your appointment. You'll receive the meeting details via email and SMS before your scheduled time.</p>
                <div className={styles.meetingFeatures}>
                  <div className={styles.feature}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className={styles.feature}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
                    </svg>
                    <span>HD video quality</span>
                  </div>
                  <div className={styles.feature}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    <span>Screen sharing available</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Step 3: Date & Time Selection */}
      <div className={`${styles.stepContent} ${currentStep === 3 ? styles.active : ''}`}>
        <div className={styles.sectionHeader}>
          <h3>Choose Date & Time</h3>
          <p>Select your preferred appointment date and available time slot</p>
        </div>
        
        <div className={styles.datetimeSelection}>
          <div className={styles.datePicker}>
            <h4>Select Date</h4>
            <div className={styles.calendarContainer}>
              <div className={styles.calendarHeader}>
                <button className={styles.navBtn} onClick={previousMonth}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <span className={styles.monthYear}>
                  {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </span>
                <button className={styles.navBtn} onClick={nextMonth}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
              <div className={styles.calendarGrid}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={styles.dayHeader}>{day}</div>
                ))}
                {renderCalendarDays()}
              </div>
            </div>
          </div>
          
          <div className={styles.timePicker}>
            <h4>Select Time</h4>
            <div className={styles.customTimeInput}>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={styles.timeInput}
                min="06:00"
                max="22:00"
              />
              <p className={styles.timeHelp}>
                Select any time between 6:00 AM and 10:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Confirmation */}
      <div className={`${styles.stepContent} ${currentStep === 4 ? styles.active : ''}`}>
        <div className={styles.sectionHeader}>
          <h3>Confirm Your Appointment</h3>
          <p>Please review your appointment details before confirming</p>
        </div>

        {/* Appointment Summary */}
        <div className={styles.appointmentSummaryClean}>
          <div className={styles.summaryItemClean}>
            <span className={styles.summaryLabelClean}>Patient:</span>
            <span className={styles.summaryValueClean}>{selectedPatient?.name}</span>
          </div>
          <div className={styles.summaryItemClean}>
            <span className={styles.summaryLabelClean}>Condition:</span>
            <span className={styles.summaryValueClean}>{selectedPatient?.condition}</span>
          </div>
          <div className={styles.summaryItemClean}>
            <span className={styles.summaryLabelClean}>Appointment Type:</span>
            <span className={styles.summaryValueClean}>
              {appointmentTypes.find(t => t.id === selectedAppointmentType)?.name}
            </span>
          </div>
          {selectedAppointmentType === 'face-to-face' && selectedClinic && (
            <div className={styles.summaryItemClean}>
              <span className={styles.summaryLabelClean}>Location:</span>
              <span className={styles.summaryValueClean}>{selectedClinic}</span>
            </div>
          )}
          {selectedAppointmentType === 'online' && (
            <div className={styles.summaryItemClean}>
              <span className={styles.summaryLabelClean}>Location:</span>
              <span className={styles.summaryValueClean}>Google Meet (Link will be provided)</span>
            </div>
          )}
          <div className={styles.summaryItemClean}>
            <span className={styles.summaryLabelClean}>Date:</span>
            <span className={styles.summaryValueClean}>
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : ''}
            </span>
          </div>
          <div className={styles.summaryItemClean}>
            <span className={styles.summaryLabelClean}>Time:</span>
            <span className={styles.summaryValueClean}>
              {selectedTime ? new Date(`1970-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }) : ''}
            </span>
          </div>
        </div>

        {/* Additional Information */}
        <div className={styles.additionalInfo}>
          <h4>Additional Information</h4>
          <textarea
            placeholder="Any additional information or specific notes about this appointment..."
            rows="4"
            value={appointmentNotes}
            onChange={(e) => setAppointmentNotes(e.target.value)}
          />
          {meetLinkError && (
            <div className={styles.errorMessage}>
              {meetLinkError}
            </div>
          )}
        </div>

        <div className={styles.confirmationActions}>
          <button className={styles.btnSecondary} onClick={() => goToStep(3)}>Back to Date & Time</button>
          <button 
            className={styles.btnPrimary} 
            onClick={confirmAppointment}
            disabled={isCreatingMeetLink}
          >
            {isCreatingMeetLink ? 'Creating Google Meet Link...' : 'Confirm Appointment'}
          </button>
        </div>
        </div>

      </div> {/* End mainContent */}

      {/* Navigation Buttons */}
      <div className={styles.stepNavigation}>
        <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
        <div>
          {currentStep > 1 && (
            <button className={styles.btnSecondary} onClick={previousStep}>Previous</button>
          )}
          {currentStep < 4 && (
            <button 
              className={styles.btnPrimary} 
              onClick={nextStep}
              disabled={!isNextEnabled()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
