// AllDoctors.jsx
import React, { useState, useEffect } from 'react';
import styles from './Doctors.module.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.adminContent}>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Error</h1>
                <p className={styles.pageSubtitle}>Something went wrong. Please refresh the page.</p>
              </div>
              <button 
                className={styles.backButton} 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Doctors = () => {
  // Page navigation state
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'availability'
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  // State for doctors data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      initials: 'DS',
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@hospital.com',
      specialization: 'Cardiology',
      patients: 247,
      status: 'active',
      statusText: 'Active'
    },
    {
      id: 2,
      initials: 'MD',
      name: 'Dr. Michael Davis',
      email: 'michael.davis@hospital.com',
      specialization: 'Neurology',
      patients: 189,
      status: 'active',
      statusText: 'Active'
    },
    {
      id: 3,
      initials: 'EJ',
      name: 'Dr. Emily Johnson',
      email: 'emily.johnson@hospital.com',
      specialization: 'Pediatrics',
      patients: 312,
      status: 'on-leave',
      statusText: 'On Leave'
    },
    {
      id: 4,
      initials: 'RW',
      name: 'Dr. Robert Wilson',
      email: 'robert.wilson@hospital.com',
      specialization: 'Orthopedics',
      patients: 156,
      status: 'active',
      statusText: 'Active'
    },
    {
      id: 5,
      initials: 'LB',
      name: 'Dr. Lisa Brown',
      email: 'lisa.brown@hospital.com',
      specialization: 'Dermatology',
      patients: 98,
      status: 'inactive',
      statusText: 'Inactive'
    },
    {
      id: 6,
      initials: 'JM',
      name: 'Dr. James Miller',
      email: 'james.miller@hospital.com',
      specialization: 'Psychiatry',
      patients: '-',
      status: 'pending',
      statusText: 'Pending'
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('ftf');

  // Doctor data for view modal
  const doctorData = {
    1: {
      doctorId: 'DOC-2024-001',
      firstName: 'Sarah',
      middleName: 'Jane',
      lastName: 'Smith',
      sex: 'Female',
      dateOfBirth: 'March 15, 1985',
      age: '39 years old',
      phoneNumber: '+1 (555) 123-4567',
      email: 'sarah.smith@hospital.com',
      prcLicense: 'PRC-123456789',
      ptrLicense: 'PTR-987654321',
      specialization: 'Cardiology',
      experience: '15 years',
      hospital: 'St. Mary\'s Medical Center',
      training: [
        { title: 'Medical Degree', institution: 'Harvard Medical School', period: '2003-2007' }
      ],
      certifications: [
        { title: 'Board Certified in Cardiovascular Disease', year: '2014' }
      ]
    },
    2: {
      doctorId: 'DOC-2024-002',
      firstName: 'Michael',
      middleName: 'James',
      lastName: 'Davis',
      sex: 'Male',
      dateOfBirth: 'August 22, 1980',
      age: '44 years old',
      phoneNumber: '+1 (555) 234-5678',
      email: 'michael.davis@hospital.com',
      prcLicense: 'PRC-234567890',
      ptrLicense: 'PTR-876543210',
      specialization: 'Neurology',
      experience: '18 years',
      hospital: 'City General Hospital',
      training: [
        { title: 'Medical Degree', institution: 'Johns Hopkins Medical School', period: '2000-2004' }
      ],
      certifications: [
        { title: 'Board Certified in Neurology', year: '2010' }
      ]
    },
    3: {
      doctorId: 'DOC-2024-003',
      firstName: 'Emily',
      middleName: 'Rose',
      lastName: 'Johnson',
      sex: 'Female',
      dateOfBirth: 'December 10, 1988',
      age: '36 years old',
      phoneNumber: '+1 (555) 345-6789',
      email: 'emily.johnson@hospital.com',
      prcLicense: 'PRC-345678901',
      ptrLicense: 'PTR-765432109',
      specialization: 'Pediatrics',
      experience: '12 years',
      hospital: 'Children\'s Medical Center',
      training: [
        { title: 'Medical Degree', institution: 'Stanford Medical School', period: '2006-2010' }
      ],
      certifications: [
        { title: 'Board Certified in Pediatrics', year: '2015' }
      ]
    },
    4: {
      doctorId: 'DOC-2024-004',
      firstName: 'Robert',
      middleName: 'William',
      lastName: 'Wilson',
      sex: 'Male',
      dateOfBirth: 'April 5, 1982',
      age: '42 years old',
      phoneNumber: '+1 (555) 456-7890',
      email: 'robert.wilson@hospital.com',
      prcLicense: 'PRC-456789012',
      ptrLicense: 'PTR-654321098',
      specialization: 'Orthopedics',
      experience: '16 years',
      hospital: 'Sports Medicine Clinic',
      training: [
        { title: 'Medical Degree', institution: 'UCLA Medical School', period: '2002-2006' }
      ],
      certifications: [
        { title: 'Board Certified in Orthopedic Surgery', year: '2012' }
      ]
    },
    5: {
      doctorId: 'DOC-2024-005',
      firstName: 'Lisa',
      middleName: 'Marie',
      lastName: 'Brown',
      sex: 'Female',
      dateOfBirth: 'September 18, 1990',
      age: '34 years old',
      phoneNumber: '+1 (555) 567-8901',
      email: 'lisa.brown@hospital.com',
      prcLicense: 'PRC-567890123',
      ptrLicense: 'PTR-543210987',
      specialization: 'Dermatology',
      experience: '8 years',
      hospital: 'Skin Care Center',
      training: [
        { title: 'Medical Degree', institution: 'NYU Medical School', period: '2008-2012' }
      ],
      certifications: [
        { title: 'Board Certified in Dermatology', year: '2018' }
      ]
    },
    6: {
      doctorId: 'DOC-2024-006',
      firstName: 'James',
      middleName: 'Robert',
      lastName: 'Miller',
      sex: 'Male',
      dateOfBirth: 'June 12, 1987',
      age: '37 years old',
      phoneNumber: '+1 (555) 678-9012',
      email: 'james.miller@hospital.com',
      prcLicense: 'PRC-678901234',
      ptrLicense: 'PTR-432109876',
      specialization: 'Psychiatry',
      experience: '10 years',
      hospital: 'Mental Health Institute',
      training: [
        { title: 'Medical Degree', institution: 'University of Chicago Medical School', period: '2005-2009' }
      ],
      certifications: [
        { title: 'Board Certified in Psychiatry', year: '2016' }
      ]
    }
  };

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !specializationFilter || doctor.specialization === specializationFilter;
    const matchesStatus = !statusFilter || doctor.status === statusFilter;
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  // Handle view doctor
  const handleViewDoctor = (id) => {
    setSelectedDoctorId(id);
    setCurrentView('details');
  };

  // Handle edit doctor (availability)
  const handleEditDoctor = (id) => {
    setSelectedDoctorId(id);
    setCurrentView('availability');
  };

  // Handle back to list
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDoctorId(null);
  };

  // Helper function to calculate age from date of birth
  const getAge = (dob) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Get current doctor data
  const getCurrentDoctor = () => {
    if (!selectedDoctorId) {
      console.warn('No selectedDoctorId provided');
      return null;
    }
    
    const doctor = doctorData[selectedDoctorId];
    if (!doctor) {
      console.warn(`No doctor data found for ID: ${selectedDoctorId}`);
      return null;
    }
    
    return doctor;
  };

  // Doctor Details View Component
  const DoctorDetailsView = () => {
    console.log('DoctorDetailsView - Starting render');
    
    let doctor;
    try {
      doctor = getCurrentDoctor();
      console.log('DoctorDetailsView - doctor:', doctor);
    } catch (error) {
      console.error('Error getting current doctor:', error);
      return (
        <div className={styles.doctorDetailsContainer}>
          <div className={styles.doctorDetailsWrapper}>
            <div className={styles.doctorDetailsHeader}>
              <button className={styles.backButton} onClick={handleBackToList}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back to Doctors
              </button>
            </div>
            <div className={styles.doctorDetailsContent}>
              <div className={styles.doctorDetailsSection}>
                <h2 className={styles.doctorDetailsSectionTitle}>Error</h2>
                <p>Error loading doctor data. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Error handling - if no doctor found, show error message
    if (!doctor) {
      return (
        <div className={styles.doctorDetailsContainer}>
          <div className={styles.doctorDetailsWrapper}>
            <div className={styles.doctorDetailsHeader}>
              <button className={styles.backButton} onClick={handleBackToList}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back to Doctors
              </button>
            </div>
            <div className={styles.doctorDetailsContent}>
              <div className={styles.doctorDetailsSection}>
                <h2 className={styles.doctorDetailsSectionTitle}>Error</h2>
                <p>Doctor information not found. Please go back and try again.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    console.log('DoctorDetailsView - About to render with doctor:', doctor.firstName);

    try {
      const doctorName = doctor.firstName || doctor.lastName 
        ? `Dr. ${doctor.firstName || ''} ${doctor.middleName || ''} ${doctor.lastName || ''}`.replace(/\s+/g, ' ').trim()
        : 'Dr. [Name]';

      return (
        <div className={styles.doctorDetailsContainer}>
          <div className={styles.doctorDetailsWrapper}>
            {/* Header Section */}
            <div className={styles.doctorDetailsHeader}>
              <button className={styles.backButton} onClick={handleBackToList}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back to Doctors
              </button>
              
              <div className={styles.doctorDetailsProfileHeader}>
                <div className={styles.doctorDetailsProfilePicContainer}>
                  <div className={styles.doctorDetailsProfilePic}>
                    👨‍⚕️
                  </div>
                </div>
                
                <div className={styles.doctorDetailsBasicInfo}>
                  <h1>{doctorName}</h1>
                  <p>{doctor.specialization || '[Specialization]'}</p>
                  <p>{doctor.hospital || '[Hospital]'}</p>
                  <p>{doctor.experience || '[Experience]'}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={styles.doctorDetailsContent}>
              {/* Personal Information */}
              <div className={styles.doctorDetailsSection}>
                <h2 className={styles.doctorDetailsSectionTitle}>Personal Information</h2>
                <div className={styles.doctorDetailsFieldsGrid}>
                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Doctor ID</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.doctorId || '[ID]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>First Name</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.firstName || '[First Name]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Middle Name</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.middleName || '[Middle Name]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Last Name</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.lastName || '[Last Name]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Sex</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.sex || '[Sex]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Date of Birth</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.dateOfBirth || '[Date of Birth]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Age</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.age || '[Age]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Phone Number</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.phoneNumber || '[Phone Number]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Email</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.email || '[Email]'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className={styles.doctorDetailsSection}>
                <h2 className={styles.doctorDetailsSectionTitle}>Professional Information</h2>
                <div className={styles.doctorDetailsFieldsGrid}>
                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>PRC License Number</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.prcLicense || '[PRC License]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>PTR License Number</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.ptrLicense || '[PTR License]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Specialization</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.specialization || '[Specialization]'}
                    </div>
                  </div>

                  <div className={styles.doctorDetailsField}>
                    <label className={styles.doctorDetailsFieldLabel}>Years of Experience</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.experience || '[Experience]'}
                    </div>
                  </div>

                  <div className={`${styles.doctorDetailsField} ${styles.doctorDetailsFieldFull}`}>
                    <label className={styles.doctorDetailsFieldLabel}>Affiliated Hospital</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.hospital || '[Hospital]'}
                    </div>
                  </div>

                  <div className={`${styles.doctorDetailsField} ${styles.doctorDetailsFieldFull}`}>
                    <label className={styles.doctorDetailsFieldLabel}>Training</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.training && doctor.training.length > 0 
                        ? doctor.training.map(t => `${t.title} - ${t.institution} (${t.period})`).join(', ')
                        : '[Training]'
                      }
                    </div>
                  </div>

                  <div className={`${styles.doctorDetailsField} ${styles.doctorDetailsFieldFull}`}>
                    <label className={styles.doctorDetailsFieldLabel}>Certifications</label>
                    <div className={styles.doctorDetailsFieldValue}>
                      {doctor.certifications && doctor.certifications.length > 0 
                        ? doctor.certifications.map(c => `${c.title} (${c.year})`).join(', ')
                        : '[Certifications]'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (renderError) {
      console.error('Error during render:', renderError);
      return (
        <div className={styles.doctorDetailsContainer}>
          <div className={styles.doctorDetailsWrapper}>
            <div className={styles.doctorDetailsHeader}>
              <button className={styles.backButton} onClick={handleBackToList}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back to Doctors
              </button>
            </div>
            <div className={styles.doctorDetailsContent}>
              <div className={styles.doctorDetailsSection}>
                <h2 className={styles.doctorDetailsSectionTitle}>Error</h2>
                <p>Error rendering doctor details. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // Doctor Availability View Component
  const DoctorAvailabilityView = () => {
    const doctor = getCurrentDoctor();

    // Days state for checkboxes (for clinics tab)
    const [clinicDaysChecked, setClinicDaysChecked] = useState({
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: false,
      Friday: true,
      Saturday: false,
      Sunday: false
    });

    // Separate state for each clinic
    const [clinic2DaysChecked, setClinic2DaysChecked] = useState({
      Monday: false,
      Tuesday: true,
      Wednesday: false,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false
    });

    const [clinic3DaysChecked, setClinic3DaysChecked] = useState({
      Monday: true,
      Tuesday: false,
      Wednesday: true,
      Thursday: false,
      Friday: false,
      Saturday: true,
      Sunday: false
    });

    // Days state for checkboxes (for online tab)
    const [onlineDaysChecked, setOnlineDaysChecked] = useState({
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false
    });

    // State for multi-slot scheduling for each clinic
    const [clinicScheduleSlots, setClinicScheduleSlots] = useState({
      Monday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
      Tuesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
      Wednesday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
      Thursday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
      Friday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
      Saturday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }],
      Sunday: [{ start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
    });

    const [clinic2ScheduleSlots, setClinic2ScheduleSlots] = useState({
      Monday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }],
      Tuesday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }],
      Wednesday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }],
      Thursday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }],
      Friday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }],
      Saturday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }],
      Sunday: [{ start: '13:00', end: '18:00', availability: 'appointments', notes: '' }]
    });

    const [clinic3ScheduleSlots, setClinic3ScheduleSlots] = useState({
      Monday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }],
      Tuesday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }],
      Wednesday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }],
      Thursday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }],
      Friday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }],
      Saturday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }],
      Sunday: [{ start: '07:00', end: '15:00', availability: 'both', notes: '' }]
    });

    const [onlineScheduleSlots, setOnlineScheduleSlots] = useState({
      Monday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
      Tuesday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
      Wednesday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
      Thursday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
      Friday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
      Saturday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }],
      Sunday: [{ start: '08:00', end: '20:00', availability: 'appointments', notes: '' }]
    });

    // Handler functions for multi-slot scheduling
    const handleSlotChange = (clinicType, day, slotIndex, field, value) => {
      const setterMap = {
        'clinic1': setClinicScheduleSlots,
        'clinic2': setClinic2ScheduleSlots,
        'clinic3': setClinic3ScheduleSlots,
        'online': setOnlineScheduleSlots
      };
      
      const setter = setterMap[clinicType];
      if (setter) {
        setter(prev => ({
          ...prev,
          [day]: prev[day].map((slot, index) => 
            index === slotIndex 
              ? { ...slot, [field]: value }
              : slot
          )
        }));
      }
    };

    const handleAddNewSlot = (clinicType, day) => {
      const setterMap = {
        'clinic1': setClinicScheduleSlots,
        'clinic2': setClinic2ScheduleSlots,
        'clinic3': setClinic3ScheduleSlots,
        'online': setOnlineScheduleSlots
      };
      
      const setter = setterMap[clinicType];
      if (setter) {
        setter(prev => ({
          ...prev,
          [day]: [...prev[day], { start: '09:00', end: '17:00', availability: 'appointments', notes: '' }]
        }));
      }
    };

    const handleRemoveSlot = (clinicType, day, slotIndex) => {
      const setterMap = {
        'clinic1': setClinicScheduleSlots,
        'clinic2': setClinic2ScheduleSlots,
        'clinic3': setClinic3ScheduleSlots,
        'online': setOnlineScheduleSlots
      };
      
      const setter = setterMap[clinicType];
      if (setter) {
        setter(prev => ({
          ...prev,
          [day]: prev[day].filter((_, index) => index !== slotIndex)
        }));
      }
    };

    const getScheduleSlots = (clinicType) => {
      const slotsMap = {
        'clinic1': clinicScheduleSlots,
        'clinic2': clinic2ScheduleSlots,
        'clinic3': clinic3ScheduleSlots,
        'online': onlineScheduleSlots
      };
      return slotsMap[clinicType] || {};
    };

    // Error handling - if no doctor found, show error message
    if (!doctor) {
      return (
        <div className={styles.doctorAvailabilityContainer}>
          <div className={styles.doctorAvailabilityWrapper}>
            <div className={styles.doctorAvailabilityHeader}>
              <button className={styles.backButton} onClick={handleBackToList}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back to Doctors
              </button>
            </div>
            <div className={styles.doctorAvailabilityContent}>
              <div className={styles.availabilitySectionHeader}>
                <h3>Error</h3>
              </div>
              <p>Doctor information not found. Please go back and try again.</p>
            </div>
          </div>
        </div>
      );
    }

    // Handler for clinic day checkbox
    const handleClinicDayChange = (day) => {
      setClinicDaysChecked(prev => ({ ...prev, [day]: !prev[day] }));
    };

    // Handler for clinic 2 day checkbox
    const handleClinic2DayChange = (day) => {
      setClinic2DaysChecked(prev => ({ ...prev, [day]: !prev[day] }));
    };

    // Handler for clinic 3 day checkbox
    const handleClinic3DayChange = (day) => {
      setClinic3DaysChecked(prev => ({ ...prev, [day]: !prev[day] }));
    };

    // Handler for online day checkbox
    const handleOnlineDayChange = (day) => {
      setOnlineDaysChecked(prev => ({ ...prev, [day]: !prev[day] }));
    };

    return (
      <div className={styles.doctorAvailabilityContainer}>
        <div className={styles.doctorAvailabilityWrapper}>
          {/* Header Section */}
          <div className={styles.doctorAvailabilityHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Doctors
            </button>
            
            <h1 className={styles.doctorAvailabilityTitle}>
              Edit Availability - Dr. {doctor.firstName || ''} {doctor.lastName || ''}
            </h1>
          </div>

          {/* Content Section */}
          <div className={styles.doctorAvailabilityContent}>
            <div className={styles.availabilityTabs}>
              <button 
                className={`${styles.availabilityTabBtn} ${activeTab === 'ftf' ? styles.active : ''}`} 
                onClick={() => setActiveTab('ftf')}
              >
                Clinics
              </button>
              <button 
                className={`${styles.availabilityTabBtn} ${activeTab === 'online' ? styles.active : ''}`} 
                onClick={() => setActiveTab('online')}
              >
                Online Consultations
              </button>
            </div>

            {/* Clinics Availability */}
            {activeTab === 'ftf' && (
              <div className={styles.availabilityTabContent}>
                {/* Multiple Clinics List */}
                <div className={styles.clinicsList}>
                  {/* Clinic 1 */}
                  <div className={styles.clinicCard}>
                    <div className={styles.clinicCardHeader}>
                      <div className={styles.clinicInfo}>
                        <h4>St. Mary's Medical Center - Main Campus</h4>
                        <p>123 Medical Drive, Downtown • Cardiology Department</p>
                      </div>
                    </div>

                    <div className={styles.clinicAvailabilityScheduleSection}>
                      {/* Days checkboxes */}
                      <div className={styles.clinicScheduleDays}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <label key={day} className={styles.clinicScheduleDayLabel}>
                            <span>{day.slice(0,3).toUpperCase()}</span>
                            <input
                              type="checkbox"
                              checked={clinicDaysChecked[day]}
                              onChange={() => handleClinicDayChange(day)}
                            />
                          </label>
                        ))}
                      </div>

                      {/* Schedule details */}
                      <div className={styles.clinicScheduleDetails}>
                        {/* Header labels */}
                        <div className={`${styles.clinicScheduleRow}`}>
                          <div className={styles.clinicScheduleRowLabel}></div>
                          <label className={styles.clinicScheduleLabel}>Start Time</label>
                          <label className={styles.clinicScheduleLabel}>End Time</label>
                          <label className={styles.clinicScheduleLabel}>Availability</label>
                          <label className={styles.clinicScheduleLabel}>Schedule Notes</label>
                          <div style={{ width: 120 }}></div>
                        </div>

                        {/* Schedule rows for checked days only */}
                        <div className={styles.clinicScheduleRowsWrapper}>
                          {Object.entries(clinicDaysChecked).filter(([day, checked]) => checked).map(([day]) => (
                            <div key={day}>
                              {getScheduleSlots('clinic1')[day]?.map((slot, slotIndex) => (
                                <div className={styles.clinicScheduleRow} key={`${day}-${slotIndex}`}>
                                  <div className={styles.clinicScheduleRowLabel}>
                                    {slotIndex === 0 ? day : ''}
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.start}
                                      onChange={(e) => handleSlotChange('clinic1', day, slotIndex, 'start', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.end}
                                      onChange={(e) => handleSlotChange('clinic1', day, slotIndex, 'end', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <select 
                                      value={slot.availability}
                                      onChange={(e) => handleSlotChange('clinic1', day, slotIndex, 'availability', e.target.value)}
                                    >
                                      <option value="appointments">Appointments Only</option>
                                      <option value="walkins">Walk-ins</option>
                                      <option value="both">Both</option>
                                    </select>
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="text" 
                                      className={styles.clinicScheduleNotesInput}
                                      placeholder="Schedule notes..."
                                      value={slot.notes}
                                      onChange={(e) => handleSlotChange('clinic1', day, slotIndex, 'notes', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <div className={styles.clinicScheduleButtons}>
                                      {getScheduleSlots('clinic1')[day]?.length > 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleRemoveSlot('clinic1', day, slotIndex)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                      {slotIndex === getScheduleSlots('clinic1')[day]?.length - 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleAddNewSlot('clinic1', day)}
                                        >
                                          Add New
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )) || []}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clinic 2 */}
                  <div className={styles.clinicCard}>
                    <div className={styles.clinicCardHeader}>
                      <div className={styles.clinicInfo}>
                        <h4>General Hospital - Satellite Branch</h4>
                        <p>456 Health Street, Uptown • Cardiology Outpatient</p>
                      </div>
                    </div>

                    <div className={styles.clinicAvailabilityScheduleSection}>
                      {/* Days checkboxes */}
                      <div className={styles.clinicScheduleDays}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <label key={`clinic2-${day}`} className={styles.clinicScheduleDayLabel}>
                            <span>{day.slice(0,3).toUpperCase()}</span>
                            <input
                              type="checkbox"
                              checked={clinic2DaysChecked[day]}
                              onChange={() => handleClinic2DayChange(day)}
                            />
                          </label>
                        ))}
                      </div>

                      {/* Schedule details */}
                      <div className={styles.clinicScheduleDetails}>
                        {/* Header labels */}
                        <div className={`${styles.clinicScheduleRow}`}>
                          <div className={styles.clinicScheduleRowLabel}></div>
                          <label className={styles.clinicScheduleLabel}>Start Time</label>
                          <label className={styles.clinicScheduleLabel}>End Time</label>
                          <label className={styles.clinicScheduleLabel}>Availability</label>
                          <label className={styles.clinicScheduleLabel}>Schedule Notes</label>
                          <div style={{ width: 120 }}></div>
                        </div>

                        {/* Schedule rows for checked days only */}
                        <div className={styles.clinicScheduleRowsWrapper}>
                          {Object.entries(clinic2DaysChecked).filter(([day, checked]) => checked).map(([day]) => (
                            <div key={`clinic2-${day}`}>
                              {getScheduleSlots('clinic2')[day]?.map((slot, slotIndex) => (
                                <div className={styles.clinicScheduleRow} key={`clinic2-${day}-${slotIndex}`}>
                                  <div className={styles.clinicScheduleRowLabel}>
                                    {slotIndex === 0 ? day : ''}
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.start}
                                      onChange={(e) => handleSlotChange('clinic2', day, slotIndex, 'start', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.end}
                                      onChange={(e) => handleSlotChange('clinic2', day, slotIndex, 'end', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <select 
                                      value={slot.availability}
                                      onChange={(e) => handleSlotChange('clinic2', day, slotIndex, 'availability', e.target.value)}
                                    >
                                      <option value="appointments">Appointments Only</option>
                                      <option value="walkins">Walk-ins</option>
                                      <option value="both">Both</option>
                                    </select>
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="text" 
                                      className={styles.clinicScheduleNotesInput}
                                      placeholder="Schedule notes..."
                                      value={slot.notes}
                                      onChange={(e) => handleSlotChange('clinic2', day, slotIndex, 'notes', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <div className={styles.clinicScheduleButtons}>
                                      {getScheduleSlots('clinic2')[day]?.length > 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleRemoveSlot('clinic2', day, slotIndex)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                      {slotIndex === getScheduleSlots('clinic2')[day]?.length - 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleAddNewSlot('clinic2', day)}
                                        >
                                         ADD NEW
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )) || []}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clinic 3 */}
                  <div className={styles.clinicCard}>
                    <div className={styles.clinicCardHeader}>
                      <div className={styles.clinicInfo}>
                        <h4>City Medical Plaza - Cardiac Center</h4>
                        <p>789 Heart Avenue, Midtown • Specialized Cardiac Care</p>
                      </div>
                    </div>

                    <div className={styles.clinicAvailabilityScheduleSection}>
                      {/* Days checkboxes */}
                      <div className={styles.clinicScheduleDays}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <label key={`clinic3-${day}`} className={styles.clinicScheduleDayLabel}>
                            <span>{day.slice(0,3).toUpperCase()}</span>
                            <input
                              type="checkbox"
                              checked={clinic3DaysChecked[day]}
                              onChange={() => handleClinic3DayChange(day)}
                            />
                          </label>
                        ))}
                      </div>

                      {/* Schedule details */}
                      <div className={styles.clinicScheduleDetails}>
                        {/* Header labels */}
                        <div className={`${styles.clinicScheduleRow}`}>
                          <div className={styles.clinicScheduleRowLabel}></div>
                          <label className={styles.clinicScheduleLabel}>Start Time</label>
                          <label className={styles.clinicScheduleLabel}>End Time</label>
                          <label className={styles.clinicScheduleLabel}>Availability</label>
                          <label className={styles.clinicScheduleLabel}>Schedule Notes</label>
                          <div style={{ width: 120 }}></div>
                        </div>

                        {/* Schedule rows for checked days only */}
                        <div className={styles.clinicScheduleRowsWrapper}>
                          {Object.entries(clinic3DaysChecked).filter(([day, checked]) => checked).map(([day]) => (
                            <div key={`clinic3-${day}`}>
                              {getScheduleSlots('clinic3')[day]?.map((slot, slotIndex) => (
                                <div className={styles.clinicScheduleRow} key={`clinic3-${day}-${slotIndex}`}>
                                  <div className={styles.clinicScheduleRowLabel}>
                                    {slotIndex === 0 ? day : ''}
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.start}
                                      onChange={(e) => handleSlotChange('clinic3', day, slotIndex, 'start', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="time" 
                                      className={styles.clinicScheduleTimeInput}
                                      value={slot.end}
                                      onChange={(e) => handleSlotChange('clinic3', day, slotIndex, 'end', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <select 
                                      value={slot.availability}
                                      onChange={(e) => handleSlotChange('clinic3', day, slotIndex, 'availability', e.target.value)}
                                    >
                                      <option value="appointments">Appointments Only</option>
                                      <option value="walkins">Walk-ins</option>
                                      <option value="both">Both</option>
                                    </select>
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <input 
                                      type="text" 
                                      className={styles.clinicScheduleNotesInput}
                                      placeholder="Schedule notes..."
                                      value={slot.notes}
                                      onChange={(e) => handleSlotChange('clinic3', day, slotIndex, 'notes', e.target.value)}
                                    />
                                  </div>
                                  <div className={styles.clinicScheduleCell}>
                                    <div className={styles.clinicScheduleButtons}>
                                      {getScheduleSlots('clinic3')[day]?.length > 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleRemoveSlot('clinic3', day, slotIndex)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                      {slotIndex === getScheduleSlots('clinic3')[day]?.length - 1 && (
                                        <button 
                                          type="button" 
                                          className="global-btn secondary"
                                          onClick={() => handleAddNewSlot('clinic3', day)}
                                        >
                                         ADD NEW
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )) || []}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Online Availability */}
            {activeTab === 'online' && (
              <div className={styles.availabilityTabContent}>
                <div className={styles.availabilityScheduleSection}>
                  {/* Days checkboxes */}
                  <div className={styles.scheduleDays}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <label key={day} className={styles.scheduleDayLabel}>
                        <span>{day.slice(0,3).toUpperCase()}</span>
                        <input
                          type="checkbox"
                          checked={onlineDaysChecked[day]}
                          onChange={() => handleOnlineDayChange(day)}
                        />
                      </label>
                    ))}
                  </div>

                  {/* Schedule details */}
                  <div className={styles.scheduleDetails}>
                    {/* Header labels */}
                    <div className={`${styles.scheduleRow}`}>
                      <div className={styles.scheduleRowLabel}></div>
                      <label className={styles.scheduleLabel}>Start Time</label>
                      <label className={styles.scheduleLabel}>End Time</label>
                      <label className={styles.scheduleLabel}>Availability</label>
                      <label className={styles.scheduleLabel}>Schedule Notes</label>
                      <div style={{ width: 120 }}></div>
                    </div>

                    {/* Schedule rows for checked days only */}
                    <div className={styles.scheduleRowsWrapper}>
                      {Object.entries(onlineDaysChecked).filter(([day, checked]) => checked).map(([day]) => (
                        <div key={day}>
                          {getScheduleSlots('online')[day]?.map((slot, slotIndex) => (
                            <div className={styles.scheduleRow} key={`${day}-${slotIndex}`}>
                              <div className={styles.scheduleRowLabel}>
                                {slotIndex === 0 ? day : ''}
                              </div>
                              <div className={styles.scheduleCell}>
                                <input 
                                  type="time" 
                                  className={styles.scheduleTimeInput}
                                  value={slot.start}
                                  onChange={(e) => handleSlotChange('online', day, slotIndex, 'start', e.target.value)}
                                />
                              </div>
                              <div className={styles.scheduleCell}>
                                <input 
                                  type="time" 
                                  className={styles.scheduleTimeInput}
                                  value={slot.end}
                                  onChange={(e) => handleSlotChange('online', day, slotIndex, 'end', e.target.value)}
                                />
                              </div>
                              <div className={styles.scheduleCell}>
                                <select 
                                  value={slot.availability}
                                  onChange={(e) => handleSlotChange('online', day, slotIndex, 'availability', e.target.value)}
                                >
                                  <option value="appointments">Appointments</option>
                                  <option value="follow-up">Follow up</option>
                                </select>
                              </div>
                              <div className={styles.scheduleCell}>
                                <input 
                                  type="text" 
                                  className={styles.scheduleNotesInput}
                                  placeholder="Schedule notes..."
                                  value={slot.notes}
                                  onChange={(e) => handleSlotChange('online', day, slotIndex, 'notes', e.target.value)}
                                />
                              </div>
                              <div className={styles.scheduleCell}>
                                <div className={styles.scheduleButtons}>
                                  {getScheduleSlots('online')[day]?.length > 1 && (
                                    <button 
                                      type="button" 
                                      className="global-btn secondary"
                                      onClick={() => handleRemoveSlot('online', day, slotIndex)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                  {slotIndex === getScheduleSlots('online')[day]?.length - 1 && (
                                    <button 
                                      type="button" 
                                      className="global-btn secondary"
                                      onClick={() => handleAddNewSlot('online', day)}
                                    >
                                     ADD NEW
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )) || []}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Handle delete doctor
  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  // Handle approve doctor
  const handleApproveDoctor = (id) => {
    if (window.confirm('Are you sure you want to approve this doctor?')) {
      setDoctors(doctors.map(doctor => {
        if (doctor.id === id) {
          return { ...doctor, status: 'active', statusText: 'Active' };
        }
        return doctor;
      }));
    }
  };

  // Handle reject doctor
  const handleRejectDoctor = (id) => {
    if (window.confirm('Are you sure you want to reject this doctor application?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  // Handle form submission
  const handleSubmitDoctorForm = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Doctor added successfully!');
    setShowAddModal(false);
  };

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showAddModal && e.target.classList.contains(styles.modal)) {
        setShowAddModal(false);
      }
      if (showViewModal && e.target.classList.contains(styles.modal)) {
        setShowViewModal(false);
      }
      if (showAvailabilityModal && e.target.classList.contains(styles.modal)) {
        setShowAvailabilityModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showAddModal, showViewModal, showAvailabilityModal]);

  // Render different views based on current state
  if (currentView === 'details') {
    return (
      <ErrorBoundary>
        <DoctorDetailsView />
      </ErrorBoundary>
    );
  }

  if (currentView === 'availability') {
    return (
      <ErrorBoundary>
        <DoctorAvailabilityView />
      </ErrorBoundary>
    );
  }

  // Default: Doctors List View
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.adminContent}>
          {/* Header Section */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>All Doctors</h1>
            <p className={styles.pageSubtitle}>View and manage registered doctors</p>
          </div>

          {/* Search and Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBox}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search doctors..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterControls}>
              <select 
                className={styles.filterSelect} 
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                <option value="">All Specializations</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Psychiatry">Psychiatry</option>
              </select>
              <select 
                className={styles.filterSelect} 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
                <option value="pending">Pending</option>
              </select>
              <button 
                className={styles.addDoctorBtn} 
                onClick={() => setShowAddModal(true)}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Doctor
              </button>
            </div>
          </div>

          {/* Doctors Table */}
          <div className={styles.doctorsTable}>
            {/* Header Row */}
            <div className={styles.tableHeader}>
              <div className={styles.colDoctor}>Doctor</div>
              <div className={styles.colSpecialization}>Specialization</div>
              <div className={styles.colPatients}>Patients</div>
              <div className={styles.colStatus}>Status</div>
              <div className={styles.colActions}>Actions</div>
            </div>
            
            {/* Doctor Rows */}
            <div className={styles.tableBody}>
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className={styles.doctorRow}>
                  <div className={styles.colDoctor}>
                    <div className={styles.doctorAvatar}>{doctor.initials}</div>
                    <div className={styles.doctorInfo}>
                      <div className={styles.doctorName}>{doctor.name}</div>
                      <div className={styles.doctorEmail}>{doctor.email}</div>
                    </div>
                  </div>
                  <div className={styles.colSpecialization}>
                    <span className={`${styles.specializationTag} ${styles[doctor.specialization.toLowerCase()]}`}>
                      {doctor.specialization}
                    </span>
                  </div>
                  <div className={styles.colPatients}>
                    <span className={styles.patientCount}>{doctor.patients}</span>
                  </div>
                  <div className={styles.colStatus}>
                    <span className={`${styles.statusBadge} ${styles[doctor.status]}`}>
                      {doctor.statusText}
                    </span>
                  </div>
                  <div className={styles.colActions}>
                    {doctor.status === 'pending' ? (
                      <>
                        <button 
                          className={`${styles.actionBtn} ${styles.approve}`} 
                          onClick={() => handleApproveDoctor(doctor.id)}
                          title="Approve"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                          </svg>
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.view}`} 
                          onClick={() => handleViewDoctor(doctor.id)}
                          title="View Details"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.reject}`} 
                          onClick={() => handleRejectDoctor(doctor.id)}
                          title="Reject"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className={`${styles.actionBtn} ${styles.view}`} 
                          onClick={() => handleViewDoctor(doctor.id)}
                          title="View Details"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.edit}`} 
                          onClick={() => handleEditDoctor(doctor.id)}
                          title="Edit"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9l-3-3L2.5 11.707V14.5h2.793L11.207 9z"/>
                          </svg>
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.delete}`} 
                          onClick={() => handleDeleteDoctor(doctor.id)}
                          title="Delete"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Add New Doctor</h2>
              <button 
                className={styles.closeBtn} 
                onClick={() => setShowAddModal(false)}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <form id="addDoctorForm" onSubmit={handleSubmitDoctorForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name <span className={styles.required}>*</span></label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="middleName">Middle Name</label>
                    <input type="text" id="middleName" name="middleName" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name <span className={styles.required}>*</span></label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="sex">Sex</label>
                    <select id="sex" name="sex">
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="specialization">Specialization <span className={styles.required}>*</span></label>
                    <select id="specialization" name="specialization" required>
                      <option value="">Select Specialization</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Surgery">Surgery</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="prcLicense">PRC License Number <span className={styles.required}>*</span></label>
                    <input type="text" id="prcLicense" name="prcLicense" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="ptyLicense">PTY License Number <span className={styles.required}>*</span></label>
                    <input type="text" id="ptyLicense" name="ptyLicense" required />
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelBtn} 
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitBtn}>Add Doctor</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Doctor Details Modal */}
      {showViewModal && currentDoctor && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 id="viewDoctorFullName">Dr. {currentDoctor.firstName} {currentDoctor.lastName}</h2>
              <button 
                className={styles.closeBtn} 
                onClick={() => setShowViewModal(false)}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.doctorDetails}>
                {/* Basic Information Section */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Basic Information</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Doctor ID</label>
                      <div className={styles.readonlyInput}>{currentDoctor.doctorId}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>First Name</label>
                      <div className={styles.readonlyInput}>{currentDoctor.firstName}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Middle Name</label>
                      <div className={styles.readonlyInput}>{currentDoctor.middleName || '-'}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Last Name</label>
                      <div className={styles.readonlyInput}>{currentDoctor.lastName}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Sex</label>
                      <div className={styles.readonlyInput}>{currentDoctor.sex}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Date of Birth</label>
                      <div className={styles.readonlyInput}>{currentDoctor.dateOfBirth}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Age</label>
                      <div className={styles.readonlyInput}>{currentDoctor.age}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <div className={styles.readonlyInput}>{currentDoctor.phoneNumber}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email Address</label>
                      <div className={styles.readonlyInput}>{currentDoctor.email}</div>
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Professional Information</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>PRC License Number</label>
                      <div className={styles.readonlyInput}>{currentDoctor.prcLicense}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>PTR License Number</label>
                      <div className={styles.readonlyInput}>{currentDoctor.ptrLicense}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Specialization</label>
                      <div className={styles.readonlyInput}>{currentDoctor.specialization}</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Years of Experience</label>
                      <div className={styles.readonlyInput}>{currentDoctor.experience}</div>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Affiliated Hospital</label>
                      <div className={styles.readonlyInput}>{currentDoctor.hospital}</div>
                    </div>
                  </div>
                </div>

                {/* Training Section */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Education</h3>
                  <div className={styles.educationList}>
                    {currentDoctor.training.map((edu, index) => (
                      <div key={index} className={styles.formGroup}>
                        <label>Education {index + 1}</label>
                        <div className={styles.readonlyInput}>
                          {edu.title} - {edu.institution} ({edu.period})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications Section */}
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitle}>Certifications</h3>
                  <div className={styles.certificationsList}>
                    {currentDoctor.certifications.map((cert, index) => (
                      <div key={index} className={styles.formGroup}>
                        <label>Certification {index + 1}</label>
                        <div className={styles.readonlyInput}>
                          {cert.title} ({cert.year})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Doctor Availability Modal */}
      {showAvailabilityModal && currentDoctor && (
        <div className={styles.modal}>
          <div className={`${styles.modalContent} ${styles.largeModal}`}>
            <div className={styles.modalHeader}>
              <h2>Edit Availability - Dr. {currentDoctor.name}</h2>
              <button 
                className={styles.closeBtn} 
                onClick={() => setShowAvailabilityModal(false)}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.availabilityTabs}>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'ftf' ? styles.active : ''}`} 
                  onClick={() => setActiveTab('ftf')}
                >
                  Clinics
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'online' ? styles.active : ''}`} 
                  onClick={() => setActiveTab('online')}
                >
                  Online Consultations
                </button>
              </div>

              {/* Clinics Availability - Dynamic */}
              <div id="ftfTab" className={`${styles.tabContent} ${activeTab === 'ftf' ? styles.active : ''}`}> 
                <div className={styles.clinicsSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Clinic Availability</h3>
                  </div>
                  <div id="clinicsList">
                    {currentDoctor.clinics && currentDoctor.clinics.length > 0 ? (
                      currentDoctor.clinics.map((clinic, idx) => (
                        <div className={styles.clinicCard} key={clinic.id || idx}>
                          <div className={styles.clinicHeader}>
                            <div className={styles.clinicInfo}>
                              <h4>{clinic.name}</h4>
                              <p>{clinic.address}</p>
                            </div>
                          </div>
                          {/* Schedule Table */}
                          <div className={styles.scheduleTable}>
                            {/* Days Selection */}
                            <div className={styles.weekdaysHeader}>
                              {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
                                <div className={styles.weekdayCheckbox} key={day}>
                                  <label className={styles.weekdayLabel}>
                                    <input type="checkbox" defaultChecked={clinic.schedule[day]?.enabled} /> {day.charAt(0) + day.slice(1).toLowerCase()}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {/* Schedule Content */}
                            <div className={styles.scheduleContent}>
                              <div className={styles.scheduleHeaders} id="mainScheduleHeaders">
                                <div className={`${styles.headerCell} ${styles.dayHeader}`}>Day</div>
                                <div className={styles.headerCell}>Start Time</div>
                                <div className={styles.headerCell}>End Time</div>
                                <div className={styles.headerCell}>Availability</div>
                                <div className={styles.headerCell}>Add</div>
                              </div>
                              {/* Schedule rows for checked days */}
                              {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
                                clinic.schedule[day]?.enabled ? (
                                  <div className={styles.dayScheduleSection} key={day}>
                                    <div className={styles.scheduleRows}>
                                      {clinic.schedule[day].slots.map((slot, slotIndex) => (
                                        <div className={styles.scheduleRow} key={slotIndex}>
                                          <div className={`${styles.cell} ${styles.dayCell}`}>{slotIndex === 0 ? day : ''}</div>
                                          <div className={styles.cell}>
                                            <input type="time" value={slot.start} readOnly />
                                          </div>
                                          <div className={styles.cell}>
                                            <input type="time" value={slot.end} readOnly />
                                          </div>
                                          <div className={styles.cell}>
                                            <select value={slot.availability} disabled>
                                              <option value="appointments">Appointments Only</option>
                                              <option value="walkins">Walk-ins</option>
                                              <option value="both">Both</option>
                                            </select>
                                          </div>
                                          <div className={styles.cell}>
                                            <button className={styles.addNewBtn} disabled>
                                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                              </svg>
                                              Add New
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : null
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No clinics found for this doctor.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Online Availability */}
              <div id="onlineTab" className={`${styles.tabContent} ${activeTab === 'online' ? styles.active : ''}`}>
                <div className={styles.onlineSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Online Consultation Availability</h3>
                    <div className={styles.onlineStatus}>
                      <label className={styles.toggleSwitch}>
                        <input type="checkbox" id="onlineEnabled" defaultChecked />
                        <span className={styles.slider}></span>
                      </label>
                      <span>Enable Online Consultations</span>
                    </div>
                  </div>
                  
                  <div className={styles.onlineSchedule}>
                    <div className={styles.scheduleGrid}>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" defaultChecked /> Monday
                        </label>
                        <div className={styles.timeSlots}>
                          <input type="time" defaultValue="08:00" />
                          <span>to</span>
                          <input type="time" defaultValue="20:00" />
                        </div>
                      </div>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" defaultChecked /> Tuesday
                        </label>
                        <div className={styles.timeSlots}>
                          <input type="time" defaultValue="08:00" />
                          <span>to</span>
                          <input type="time" defaultValue="20:00" />
                        </div>
                      </div>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" defaultChecked /> Wednesday
                        </label>
                        <div className={styles.timeSlots}>
                          <input type="time" defaultValue="08:00" />
                          <span>to</span>
                          <input type="time" defaultValue="20:00" />
                        </div>
                      </div>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" defaultChecked /> Thursday
                        </label>
                        <div className={styles.timeSlots}>
                          <input type="time" defaultValue="08:00" />
                          <span>to</span>
                          <input type="time" defaultValue="20:00" />
                        </div>
                      </div>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" defaultChecked /> Friday
                        </label>
                        <div className={styles.timeSlots}>
                          <input type="time" defaultValue="08:00" />
                          <span>to</span>
                          <input type="time" defaultValue="20:00" />
                        </div>
                      </div>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" defaultChecked /> Saturday
                        </label>
                        <div className={styles.timeSlots}>
                          <input type="time" defaultValue="10:00" />
                          <span>to</span>
                          <input type="time" defaultValue="16:00" />
                        </div>
                      </div>
                      <div className={styles.daySchedule}>
                        <label className={styles.dayLabel}>
                          <input type="checkbox" /> Sunday
                        </label>
                        <div className={`${styles.timeSlots} ${styles.disabled}`}>
                          <input type="time" disabled />
                          <span>to</span>
                          <input type="time" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.consultationSettings}>
                      <h4>Consultation Settings</h4>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Consultation Duration (minutes)</label>
                          <select>
                            <option value="15">15 minutes</option>
                            <option value="30" selected>30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label>Buffer Time Between Consultations (minutes)</label>
                          <select>
                            <option value="0">No buffer</option>
                            <option value="5" selected>5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Maximum Daily Online Consultations</label>
                          <input type="number" defaultValue="20" min="1" max="50" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Advance Booking Limit (days)</label>
                          <input type="number" defaultValue="30" min="1" max="90" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelBtn} 
                  onClick={() => setShowAvailabilityModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className={styles.submitBtn} 
                  onClick={() => {
                    alert('Availability settings have been saved successfully!');
                    setShowAvailabilityModal(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;