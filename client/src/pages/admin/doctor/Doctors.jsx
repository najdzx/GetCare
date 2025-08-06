import React, { useState, useEffect } from 'react';
import styles from './Doctors.module.css';
import {
  ErrorBoundary,
  DoctorFilters,
  DoctorTable,
  AddDoctorModal,
  ViewDoctorModal,
  AvailabilityModal,
  DoctorDetailsView,
  DoctorAvailabilityView
} from ".";

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
      ],
      clinics: [
        {
          id: 1,
          name: 'St. Mary\'s Medical Center',
          address: '123 Medical Drive, Downtown',
          schedule: {
            MON: {
              enabled: true,
              slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }]
            },
            TUE: {
              enabled: true,
              slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }]
            },
            WED: {
              enabled: false,
              slots: []
            },
            THU: {
              enabled: true,
              slots: [{ start: '09:00', end: '17:00', availability: 'both' }]
            },
            FRI: {
              enabled: true,
              slots: [{ start: '09:00', end: '17:00', availability: 'appointments' }]
            },
            SAT: {
              enabled: false,
              slots: []
            },
            SUN: {
              enabled: false,
              slots: []
            }
          }
        }
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
    const doctor = doctorData[id];
    if (doctor) {
      setCurrentDoctor(doctor);
      setSelectedDoctorId(id);
      setCurrentView('details');
    }
  };

  // Handle edit doctor (availability)
  const handleEditDoctor = (id) => {
    const doctor = doctorData[id];
    if (doctor) {
      setCurrentDoctor({...doctor, name: doctors.find(d => d.id === id)?.name || ''});
      setSelectedDoctorId(id);
      setCurrentView('availability');
    }
  };

  // Handle back to list
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDoctorId(null);
    setCurrentDoctor(null);
  };

  // Get current doctor data
  const getCurrentDoctor = () => {
    if (!selectedDoctorId) {
      console.log('getCurrentDoctor - No selectedDoctorId');
      return null;
    }
    
    const doctor = doctorData[selectedDoctorId];
    console.log('getCurrentDoctor - selectedDoctorId:', selectedDoctorId, 'doctor:', doctor);
    return doctor;
  };

  // Handle delete doctor
  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
      alert('Doctor deleted successfully!');
    }
  };

  // Handle approve doctor
  const handleApproveDoctor = (id) => {
    if (window.confirm('Are you sure you want to approve this doctor?')) {
      setDoctors(doctors.map(doctor => 
        doctor.id === id 
          ? { ...doctor, status: 'active', statusText: 'Active' }
          : doctor
      ));
      alert('Doctor approved successfully!');
    }
  };

  // Handle reject doctor
  const handleRejectDoctor = (id) => {
    if (window.confirm('Are you sure you want to reject this doctor application?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
      alert('Doctor application rejected!');
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
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showAddModal, showViewModal, showAvailabilityModal]);

  // Render different views based on current state
  if (currentView === 'details') {
    return (
      <ErrorBoundary>
        <DoctorDetailsView 
          getCurrentDoctor={getCurrentDoctor}
          handleBackToList={handleBackToList}
        />
      </ErrorBoundary>
    );
  }

  if (currentView === 'availability') {
    return (
      <ErrorBoundary>
        <DoctorAvailabilityView 
          getCurrentDoctor={getCurrentDoctor}
          handleBackToList={handleBackToList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
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
          <DoctorFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            specializationFilter={specializationFilter}
            setSpecializationFilter={setSpecializationFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setShowAddModal={setShowAddModal}
          />

          {/* Doctors Table */}
          <DoctorTable 
            filteredDoctors={filteredDoctors}
            handleViewDoctor={handleViewDoctor}
            handleEditDoctor={handleEditDoctor}
            handleDeleteDoctor={handleDeleteDoctor}
            handleApproveDoctor={handleApproveDoctor}
            handleRejectDoctor={handleRejectDoctor}
          />
        </div>
      </div>

      {/* Modals */}
      <AddDoctorModal 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        handleSubmitDoctorForm={handleSubmitDoctorForm}
      />

      <ViewDoctorModal 
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        currentDoctor={currentDoctor}
      />

      <AvailabilityModal 
        showAvailabilityModal={showAvailabilityModal}
        setShowAvailabilityModal={setShowAvailabilityModal}
        currentDoctor={currentDoctor}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Doctors;
