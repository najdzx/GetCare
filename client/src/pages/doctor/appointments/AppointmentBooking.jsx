import React, { useState } from 'react';
import styles from './Appointments.module.css';

const AppointmentBooking = ({ onClose, onAppointmentCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

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
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextEnabled = () => {
    if (currentStep === 1) return selectedPatient !== null;
    if (currentStep === 2) return selectedAppointmentType !== null;
    if (currentStep === 3) return selectedDate && selectedTime;
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

  const renderTimeSlots = () => {
    if (!selectedDate) {
      return <p className={styles.selectDateFirst}>Please select a date first</p>;
    }

    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 17 && minute === 30) break; // Stop at 5:00 PM
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        slots.push(
          <div
            key={time}
            className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''}`}
            onClick={() => setSelectedTime(time)}
          >
            {displayTime}
          </div>
        );
      }
    }

    return <div className={styles.timeSlots}>{slots}</div>;
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

  const confirmAppointment = () => {
    const appointmentDate = selectedDate;
    const newAppointment = {
      time: selectedTime,
      patient: selectedPatient.name,
      type: 'consultation', // Default for doctor-created appointments
      meetingType: selectedAppointmentType,
      notes: appointmentNotes
    };

    // Add location for face-to-face or generate meet link for online
    if (newAppointment.meetingType === 'face-to-face') {
      newAppointment.location = selectedClinic || 'Main Clinic';
    } else {
      // Generate a meet link for online appointments
      newAppointment.meetLink = `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`;
    }

    onAppointmentCreated(appointmentDate, newAppointment);
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
            <h4>Available Time Slots</h4>
            <div className={styles.timeSlots}>
              {renderTimeSlots()}
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Confirmation */}
      <div className={`${styles.stepContent} ${currentStep === 4 ? styles.active : ''}`}>
        <div className={styles.sectionHeader}>
          <h3>Confirm Your Appointment</h3>
          <p>Please review your appointment details</p>
        </div>

        {/* Appointment Summary */}
        <div className={styles.appointmentSummary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Patient:</span>
            <span className={styles.summaryValue}>{selectedPatient?.name}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Type:</span>
            <span className={styles.summaryValue}>
              {appointmentTypes.find(t => t.id === selectedAppointmentType)?.name}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Date:</span>
            <span className={styles.summaryValue}>
              {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : ''}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Time:</span>
            <span className={styles.summaryValue}>
              {selectedTime ? new Date(`1970-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }) : ''}
            </span>
          </div>
          {selectedAppointmentType === 'face-to-face' && selectedClinic && (
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Location:</span>
              <span className={styles.summaryValue}>{selectedClinic}</span>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className={styles.additionalInfo}>
          <h4>Additional Notes (Optional)</h4>
          <textarea
            placeholder="Any additional information or specific notes about this appointment..."
            rows="4"
            value={appointmentNotes}
            onChange={(e) => setAppointmentNotes(e.target.value)}
          />
        </div>

        <div className={styles.confirmationActions}>
          <button className={styles.btnSecondary} onClick={() => goToStep(3)}>Back to Date & Time</button>
          <button className={styles.btnPrimary} onClick={confirmAppointment}>Confirm Appointment</button>
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
