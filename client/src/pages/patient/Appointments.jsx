import React, { useState, useEffect } from 'react';
import styles from './Appointments.module.css';

const Appointments = () => {
  // Sample data
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "cardiology",
      experience: "15 years",
      rating: 4.9,
      reviews: 234,
      avatar: "SJ",
      available: true,
      clinics: [
        {
          id: 1,
          name: "Heart Care Center - Main",
          address: "123 Medical Plaza, Building A, Floor 3",
          hours: "Mon-Fri: 8:00 AM - 6:00 PM"
        },
        {
          id: 2,
          name: "Heart Care Center - Downtown",
          address: "456 Downtown Ave, Suite 200",
          hours: "Mon-Wed-Fri: 9:00 AM - 5:00 PM"
        }
      ]
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "neurology",
        experience: "12 years",
        rating: 4.8,
        reviews: 189,
        avatar: "MC",
        available: true,
        clinics: [
            {
                id: 3,
                name: "Neuro Wellness Clinic",
                address: "789 Health Street, Building B, Floor 2",
                hours: "Mon-Fri: 7:30 AM - 5:30 PM"
            }
        ]
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "pediatrics",
        experience: "10 years",
        rating: 4.9,
        reviews: 312,
        avatar: "ER",
        available: true,
        clinics: [
            {
                id: 4,
                name: "Children's Health Center",
                address: "321 Kids Way, Building C, Floor 1",
                hours: "Mon-Sat: 8:00 AM - 7:00 PM"
            },
            {
                id: 5,
                name: "Pediatric Care Plus",
                address: "654 Family Blvd, Suite 150",
                hours: "Tue-Thu-Sat: 9:00 AM - 4:00 PM"
            }
        ]
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "orthopedics",
        experience: "18 years",
        rating: 4.7,
        reviews: 156,
        avatar: "JW",
        available: true,
        clinics: [
            {
                id: 6,
                name: "Bone & Joint Institute",
                address: "987 Sports Medicine Dr, Building A, Floor 2",
                hours: "Mon-Fri: 6:00 AM - 8:00 PM"
            }
        ]
    },
    {
        id: 5,
        name: "Dr. Lisa Thompson",
        specialty: "dermatology",
        experience: "8 years",
        rating: 4.8,
        reviews: 198,
        avatar: "LT",
        available: true,
        clinics: [
            {
                id: 7,
                name: "Skin Health Center",
                address: "456 Beauty Lane, Suite 300",
                hours: "Tue-Sat: 9:00 AM - 6:00 PM"
            },
            {
                id: 8,
                name: "Advanced Dermatology Clinic",
                address: "789 Wellness Blvd, Building D, Floor 1",
                hours: "Mon-Wed-Fri: 8:00 AM - 4:00 PM"
            }
        ]
    },
    {
        id: 6,
        name: "Dr. Robert Martinez",
        specialty: "psychiatry",
        experience: "14 years",
        rating: 4.9,
        reviews: 267,
        avatar: "RM",
        available: true,
        clinics: [
            {
                id: 9,
                name: "Mental Wellness Center",
                address: "321 Mindful Way, Building E, Floor 4",
                hours: "Mon-Fri: 8:00 AM - 7:00 PM"
            }
        ]
    }
  ];

  // State variables
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filteredDoctors, setFilteredDoctors] = useState([...doctorsData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [appointmentNotes, setAppointmentNotes] = useState('');

  // Initialize the page
  useEffect(() => {
    updateCalendar();
  }, [currentMonth, currentYear]);

  // Doctor selection functions
  const renderDoctors = () => {
    return filteredDoctors.map(doctor => (
      <div 
        key={doctor.id}
        className={`${styles.doctorCard} ${selectedDoctor?.id === doctor.id ? styles.selected : ''}`}
        onClick={() => selectDoctor(doctor)}
      >
        <div className={styles.doctorHeader}>
          <div className={styles.doctorAvatar}>{doctor.avatar}</div>
          <div className={styles.doctorInfo}>
            <h4>{doctor.name}</h4>
            <div className={styles.doctorSpecialty}>
              {doctor.specialty.charAt(0).toUpperCase() + doctor.specialty.slice(1)}
            </div>
          </div>
        </div>
        <div className={styles.doctorDetails}>
          <div className={styles.detailItem}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
            <span>{doctor.experience} experience</span>
          </div>
          <div className={styles.detailItem}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
            </svg>
            <span>{doctor.clinics.length} clinic{doctor.clinics.length > 1 ? 's' : ''} available</span>
          </div>
        </div>
        <div className={styles.doctorRating}>
          <div className={styles.stars}>
            {'★'.repeat(Math.floor(doctor.rating))}
            {doctor.rating % 1 ? '☆' : ''}
          </div>
          <span className={styles.ratingText}>{doctor.rating} ({doctor.reviews} reviews)</span>
        </div>
      </div>
    ));
  };

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    updateStepNavigation();
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = doctorsData.filter(doctor => 
      doctor.name.toLowerCase().includes(term) ||
      doctor.specialty.toLowerCase().includes(term)
    );
    
    setFilteredDoctors(filtered);
  };

  const filterBySpecialty = (specialty) => {
    setActiveSpecialty(specialty);
    
    if (specialty === 'all') {
      setFilteredDoctors([...doctorsData]);
    } else {
      const filtered = doctorsData.filter(doctor => doctor.specialty === specialty);
      setFilteredDoctors(filtered);
    }
  };

  // Appointment type selection
  const selectAppointmentType = (type) => {
    setSelectedAppointmentType(type);
    setSelectedClinic(null);
    updateStepNavigation();
  };

  const renderClinics = () => {
    if (!selectedDoctor) return null;
    
    return selectedDoctor.clinics.map(clinic => (
      <div 
        key={clinic.id}
        className={`${styles.clinicCard} ${selectedClinic?.id === clinic.id ? styles.selected : ''}`}
        onClick={() => selectClinic(clinic)}
      >
        <h5>{clinic.name}</h5>
        <p>{clinic.address}</p>
        <div className={styles.clinicHours}>{clinic.hours}</div>
      </div>
    ));
  };

  const selectClinic = (clinic) => {
    setSelectedClinic(clinic);
    updateStepNavigation();
  };

  // Calendar functions
  const updateCalendar = () => {
    // This would be implemented in the render method
  };

  const previousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const nextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const selectDate = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    generateTimeSlots();
    updateStepNavigation();
  };

  const generateTimeSlots = () => {
    // This would be implemented in the render method
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    updateStepNavigation();
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      updateStepNavigation();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      updateStepNavigation();
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    updateStepNavigation();
  };

  const updateStepDisplay = () => {
    // This is handled in the render method
  };

  const updateStepNavigation = () => {
    // This is handled by the state and conditional rendering
  };

  const showSelectedDoctorInfo = () => {
    if (!selectedDoctor) return null;
    
    return (
      <div className={styles.selectedDoctorInfo}>
        <div className={styles.doctorAvatar}>{selectedDoctor.avatar}</div>
        <div className={styles.doctorInfo}>
          <h4>{selectedDoctor.name}</h4>
          <div className={styles.doctorSpecialty}>
            {selectedDoctor.specialty.charAt(0).toUpperCase() + selectedDoctor.specialty.slice(1)}
          </div>
          <div style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>
            {selectedDoctor.experience} experience
          </div>
        </div>
      </div>
    );
  };

  const showAppointmentSummaryMini = () => {
    if (!selectedDoctor || !selectedAppointmentType) return null;
    
    let typeText = selectedAppointmentType === 'online' ? 'Online Consultation' : 'Face-to-Face';
    let locationText = '';
    
    if (selectedAppointmentType === 'face-to-face' && selectedClinic) {
      locationText = ` at ${selectedClinic.name}`;
    } else if (selectedAppointmentType === 'online') {
      locationText = ' via Google Meet';
    }
    
    return (
      <div className={styles.appointmentSummaryMini}>
        <div className={styles.doctorAvatar}>{selectedDoctor.avatar}</div>
        <div className={styles.doctorInfo}>
          <h4>{selectedDoctor.name}</h4>
          <div style={{fontSize: '12px', color: '#666'}}>
            {typeText}{locationText}
          </div>
        </div>
      </div>
    );
  };

  const showAppointmentSummary = () => {
    if (!selectedDoctor || !selectedAppointmentType || !selectedDate || !selectedTime) return null;
    
    const dateStr = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    let typeText = selectedAppointmentType === 'online' ? 'Online Consultation' : 'Face-to-Face Consultation';
    let locationText = '';
    
    if (selectedAppointmentType === 'face-to-face' && selectedClinic) {
      locationText = selectedClinic.name;
    } else if (selectedAppointmentType === 'online') {
      locationText = 'Google Meet (Link will be provided)';
    }
    
    return (
      <div className={styles.appointmentSummary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Doctor:</span>
          <span className={styles.summaryValue}>{selectedDoctor.name}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Specialty:</span>
          <span className={styles.summaryValue}>
            {selectedDoctor.specialty.charAt(0).toUpperCase() + selectedDoctor.specialty.slice(1)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Appointment Type:</span>
          <span className={styles.summaryValue}>{typeText}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Location:</span>
          <span className={styles.summaryValue}>{locationText}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Date:</span>
          <span className={styles.summaryValue}>{dateStr}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Time:</span>
          <span className={styles.summaryValue}>{selectedTime}</span>
        </div>
      </div>
    );
  };

  const confirmAppointment = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const viewAppointments = () => {
    alert('Redirecting to your appointments page...');
    closeModal();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedDoctor(null);
    setSelectedAppointmentType(null);
    setSelectedClinic(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setAppointmentNotes('');
    setSearchTerm('');
    setActiveSpecialty('all');
    setFilteredDoctors([...doctorsData]);
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create empty days for days before month starts
    const emptyDays = [];
    for (let i = 0; i < firstDay; i++) {
      emptyDays.push(<div key={`empty-${i}`} className={`${styles.calendarDay} ${styles.disabled}`}></div>);
    }
    
    // Create days of the month
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const isToday = dayDate.toDateString() === new Date().toDateString();
      const isPast = dayDate < today.setHours(0, 0, 0, 0);
      const isSelected = selectedDate && dayDate.toDateString() === selectedDate.toDateString();
      
      let dayClass = styles.calendarDay;
      if (isToday) dayClass += ` ${styles.today}`;
      if (isSelected) dayClass += ` ${styles.selected}`;
      if (isPast) dayClass += ` ${styles.disabled}`;
      
      days.push(
        <div 
          key={`day-${day}`}
          className={dayClass}
          onClick={!isPast ? () => selectDate(day) : null}
        >
          {day}
        </div>
      );
    }
    
    return (
      <>
        {dayHeaders.map(day => (
          <div key={`header-${day}`} className={styles.dayHeader}>{day}</div>
        ))}
        {emptyDays}
        {days}
      </>
    );
  };

  // Render time slots
  const renderTimeSlots = () => {
    if (!selectedDate) return null;
    
    const timeSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];
    
    const unavailableSlots = ['10:30 AM', '11:30 AM', '03:00 PM'];
    
    return timeSlots.map(time => {
      const isUnavailable = unavailableSlots.includes(time);
      const isSelected = selectedTime === time;
      
      let slotClass = styles.timeSlot;
      if (isUnavailable) slotClass += ` ${styles.unavailable}`;
      if (isSelected) slotClass += ` ${styles.selected}`;
      
      return (
        <div 
          key={time}
          className={slotClass}
          onClick={!isUnavailable ? () => selectTime(time) : null}
        >
          {time}
        </div>
      );
    });
  };

  // Render modal content
  const renderModalContent = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return null;
    
    const dateStr = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    let meetingLink = null;
    if (selectedAppointmentType === 'online') {
      const meetId = Math.random().toString(36).substring(2, 15);
      meetingLink = (
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Google Meet Link:</span>
          <span className={styles.summaryValue} style={{color: '#1a1a1a', textDecoration: 'underline'}}>
            meet.google.com/{meetId}
          </span>
        </div>
      );
    }
    
    return (
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.successIcon}>
            <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
          </div>
          <h2>Appointment Confirmed!</h2>
          <p>Your appointment has been successfully booked.</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.appointmentSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Appointment ID:</span>
              <span className={styles.summaryValue}>#APT{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Doctor:</span>
              <span className={styles.summaryValue}>{selectedDoctor.name}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Date & Time:</span>
              <span className={styles.summaryValue}>{dateStr} at {selectedTime}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Type:</span>
              <span className={styles.summaryValue}>
                {selectedAppointmentType === 'online' ? 'Online Consultation' : 'Face-to-Face'}
              </span>
            </div>
            {selectedAppointmentType === 'face-to-face' && selectedClinic && (
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Location:</span>
                <span className={styles.summaryValue}>{selectedClinic.name}</span>
              </div>
            )}
            {selectedAppointmentType === 'online' && meetingLink}
          </div>
          {selectedAppointmentType === 'online' && (
            <div style={{background: '#f0f9ff', padding: '12px', borderRadius: '6px', marginTop: '16px', fontSize: '12px', color: '#0369a1'}}>
              📧 Meeting details and Google Meet link have been sent to your email.<br />
              📱 You'll also receive an SMS reminder 30 minutes before your appointment.
            </div>
          )}
        </div>
        <div className={styles.modalActions}>
          <button className={styles.btnSecondary} onClick={closeModal}>Close</button>
          <button className={styles.btnPrimary} onClick={viewAppointments}>View My Appointments</button>
        </div>
      </div>
    );
  };

  // Determine if next button should be enabled
  const isNextEnabled = () => {
    if (currentStep === 1) return selectedDoctor !== null;
    if (currentStep === 2) {
      if (selectedAppointmentType === 'online') return true;
      if (selectedAppointmentType === 'face-to-face') return selectedClinic !== null;
      return false;
    }
    if (currentStep === 3) return selectedDate !== null && selectedTime !== null;
    return false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <main className={styles.mainContent}>
          <div className={styles.bookingContainer}>
            {/* Step Indicator */}
            <div className={styles.stepIndicator}>
              {[1, 2, 3, 4].map(step => {
                let stepClass = styles.step;
                if (step === currentStep) stepClass += ` ${styles.active}`;
                if (step < currentStep) stepClass += ` ${styles.completed}`;
                
                return (
                  <div key={step} className={stepClass} data-step={step}>
                    <div className={styles.stepNumber}>{step}</div>
                    <span>
                      {step === 1 && 'Select Doctor'}
                      {step === 2 && 'Appointment Type'}
                      {step === 3 && 'Date & Time'}
                      {step === 4 && 'Confirm'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step 1: Doctor Selection */}
            <div className={`${styles.stepContent} ${currentStep === 1 ? styles.active : ''}`} id="step1">
              <div className={styles.sectionHeader}>
                <h3>Select Your Doctor</h3>
                <p>Choose from your assigned doctors or search for a specialist</p>
              </div>

              <div className={styles.searchFilter}>
                <div className={styles.searchBox}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search doctors by name or specialty..." 
                    id="doctorSearch" 
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className={styles.filterButtons}>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'all' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('all')}
                  >
                    All Doctors
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'cardiology' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('cardiology')}
                  >
                    Cardiology
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'neurology' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('neurology')}
                  >
                    Neurology
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'orthopedics' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('orthopedics')}
                  >
                    Orthopedics
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'pediatrics' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('pediatrics')}
                  >
                    Pediatrics
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'dermatology' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('dermatology')}
                  >
                    Dermatology
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${activeSpecialty === 'psychiatry' ? styles.active : ''}`} 
                    onClick={() => filterBySpecialty('psychiatry')}
                  >
                    Psychiatry
                  </button>
                </div>
              </div>

              <div className={styles.doctorsGrid}>
                {renderDoctors()}
              </div>
            </div>

            {/* Step 2: Appointment Type Selection */}
            <div className={`${styles.stepContent} ${currentStep === 2 ? styles.active : ''}`} id="step2">
              <div className={styles.sectionHeader}>
                <h3>Choose Appointment Type</h3>
                <p>Select how you'd like to meet with your doctor</p>
              </div>

              {selectedDoctor && showSelectedDoctorInfo()}

              <div className={styles.appointmentTypes}>
                <div 
                  className={`${styles.typeCard} ${selectedAppointmentType === 'face-to-face' ? styles.selected : ''}`}
                  onClick={() => selectAppointmentType('face-to-face')}
                >
                  <div className={styles.typeIcon}>
                    <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                    </svg>
                  </div>
                  <h4>Face-to-Face</h4>
                  <p>Visit the doctor at their clinic for in-person consultation</p>
                  <div className={styles.typeBenefits}>
                    <span>• Physical examination</span>
                    <span>• Direct interaction</span>
                    <span>• Complete assessment</span>
                  </div>
                </div>

                <div 
                  className={`${styles.typeCard} ${selectedAppointmentType === 'online' ? styles.selected : ''}`}
                  onClick={() => selectAppointmentType('online')}
                >
                  <div className={styles.typeIcon}>
                    <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                    </svg>
                  </div>
                  <h4>Online Consultation</h4>
                  <p>Connect with your doctor via secure video call from home</p>
                  <div className={styles.typeBenefits}>
                    <span>• Convenient from home</span>
                    <span>• No travel required</span>
                    <span>• Secure video call</span>
                  </div>
                </div>
              </div>

              {/* Clinic Selection (shown when face-to-face is selected) */}
              {selectedAppointmentType === 'face-to-face' && (
                <div className={styles.clinicSelection}>
                  <h4>Select Clinic Location</h4>
                  <p>Choose which clinic you'd like to visit</p>
                  <div className={styles.clinicsGrid}>
                    {renderClinics()}
                  </div>
                </div>
              )}

              {/* Online Meeting Info (shown when online is selected) */}
              {selectedAppointmentType === 'online' && (
                <div className={styles.onlineInfo}>
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
                </div>
              )}
            </div>

            {/* Step 3: Date & Time Selection */}
            <div className={`${styles.stepContent} ${currentStep === 3 ? styles.active : ''}`} id="step3">
              <div className={styles.sectionHeader}>
                <h3>Choose Date & Time</h3>
                <p>Select your preferred appointment date and available time slot</p>
              </div>

              {showAppointmentSummaryMini()}

              <div className={styles.datetimeSelection}>
                <div className={styles.datePicker}>
                  <h4>Select Date</h4>
                  <div className={styles.calendarContainer}>
                    <div className={styles.calendarHeader}>
                      <button className={styles.navBtn} onClick={previousMonth}>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      </button>
                      <span className={styles.monthYear}>
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                      </span>
                      <button className={styles.navBtn} onClick={nextMonth}>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </button>
                    </div>
                    <div className={styles.calendarGrid}>
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
            <div className={`${styles.stepContent} ${currentStep === 4 ? styles.active : ''}`} id="step4">
              <div className={styles.sectionHeader}>
                <h3>Confirm Your Appointment</h3>
                <p>Please review your appointment details before confirming</p>
              </div>

              {showAppointmentSummary()}

              <div className={styles.additionalInfo}>
                <h4>Additional Information</h4>
                <textarea 
                  placeholder="Please describe your symptoms or reason for visit (optional)" 
                  id="appointmentNotes" 
                  rows="4"
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                ></textarea>
              </div>

              <div className={styles.confirmationActions}>
                <button className={styles.btnSecondary} onClick={() => goToStep(3)}>Back to Date & Time</button>
                <button className={styles.btnPrimary} onClick={confirmAppointment}>Confirm Appointment</button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className={styles.stepNavigation}>
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
        </main>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          {renderModalContent()}
        </div>
      )}
    </div>
  );
};

export default Appointments;