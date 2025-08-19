import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdEdit, MdDelete, MdPerson, MdSchedule, MdEvent } from 'react-icons/md';
// ...existing code...
import styles from './Appointments.module.css';

const Appointments = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample doctors data
  const doctors = [
    { id: 1, name: 'Dr. John Smith', specialization: 'Cardiology', clinic: 'Heart Clinic' },
    { id: 2, name: 'Dr. Sarah Johnson', specialization: 'Pediatrics', clinic: 'Children\'s Clinic' },
    { id: 3, name: 'Dr. Mike Brown', specialization: 'Dermatology', clinic: 'Skin Clinic' },
    { id: 4, name: 'Dr. Emily Davis', specialization: 'Neurology', clinic: 'Brain Clinic' },
    { id: 5, name: 'Dr. Robert Wilson', specialization: 'Orthopedics', clinic: 'Bone Clinic' },
  ];

  // Sample appointments data
  const appointments = [
    { id: 1, doctorId: 1, patientName: 'John Doe', date: '2024-01-15', time: '09:00', duration: 30, type: 'Consultation', status: 'Confirmed' },
    { id: 2, doctorId: 1, patientName: 'Jane Smith', date: '2024-01-15', time: '10:00', duration: 45, type: 'Follow-up', status: 'Confirmed' },
    { id: 3, doctorId: 2, patientName: 'Mike Johnson', date: '2024-01-15', time: '14:00', duration: 30, type: 'Consultation', status: 'Pending' },
    { id: 4, doctorId: 3, patientName: 'Sarah Wilson', date: '2024-01-16', time: '11:00', duration: 60, type: 'Procedure', status: 'Confirmed' },
    { id: 5, doctorId: 4, patientName: 'David Brown', date: '2024-01-16', time: '15:30', duration: 30, type: 'Consultation', status: 'Cancelled' },
  ];

  // Filter appointments based on selected doctor and search
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDoctor = !selectedDoctor || appointment.doctorId === parseInt(selectedDoctor);
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || appointment.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesDoctor && matchesSearch && matchesFilter;
  });

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const handleAddAppointment = () => {
    setShowAddModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      // Handle delete logic here
      console.log('Deleting appointment:', appointmentId);
    }
  };

  return (
    <div className={styles.adminAppointments}>
        <div className={styles.appointmentsHeader}>
          <div className={styles.headerLeft}>
            <h1>Appointments Management</h1>
            <p>Manage appointments for all doctors across GetCare platform</p>
          </div>
          <button className={styles.addAppointmentBtn} onClick={handleAddAppointment}>
            <MdAdd />
            <span>Add Appointment</span>
          </button>
        </div>

        {/* Doctor Selection */}
        <div className={styles.doctorSelection}>
          <label htmlFor="doctor-select">Select Doctor:</label>
          <select
            id="doctor-select"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className={styles.doctorSelect}
          >
            <option value="">All Doctors</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Search and Filter */}
        <div className={styles.appointmentsControls}>
          <div className={styles.searchContainer}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterContainer}>
            <MdFilterList className={styles.filterIcon} />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className={styles.appointmentsTableContainer}>
          <table className={styles.appointmentsTable}>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <div className={styles.doctorInfo}>
                      <MdPerson className={styles.doctorAvatar} />
                      <span>{getDoctorName(appointment.doctorId)}</span>
                    </div>
                  </td>
                  <td>{appointment.patientName}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.duration} min</td>
                  <td>{appointment.type}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[appointment.status.toLowerCase()]}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        className={`${styles.actionBtn} ${styles.edit}`}
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <MdEdit />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.delete}`}
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Appointment Modal */}
        {showAddModal && (
          <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Add New Appointment</h2>
                <button className={styles.modalClose} onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.formGroup}>
                  <label>Doctor</label>
                  <select className={styles.formInput}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Patient Name</label>
                  <input type="text" className={styles.formInput} placeholder="Enter patient name" />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Date</label>
                    <input type="date" className={styles.formInput} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Time</label>
                    <input type="time" className={styles.formInput} />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Duration (minutes)</label>
                    <input type="number" className={styles.formInput} placeholder="30" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Type</label>
                    <select className={styles.formInput}>
                      <option value="consultation">Consultation</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="procedure">Procedure</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select className={styles.formInput}>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={`${styles.modalBtn} ${styles.cancel}`} onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className={`${styles.modalBtn} ${styles.save}`}>
                  Add Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Appointment Modal */}
        {showEditModal && selectedAppointment && (
          <div className={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Edit Appointment</h2>
                <button className={styles.modalClose} onClick={() => setShowEditModal(false)}>×</button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.formGroup}>
                  <label>Doctor</label>
                  <select className={styles.formInput} defaultValue={selectedAppointment.doctorId}>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    defaultValue={selectedAppointment.patientName}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Date</label>
                    <input type="date" className={styles.formInput} defaultValue={selectedAppointment.date} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Time</label>
                    <input type="time" className={styles.formInput} defaultValue={selectedAppointment.time} />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Duration (minutes)</label>
                    <input type="number" className={styles.formInput} defaultValue={selectedAppointment.duration} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Type</label>
                    <select className={styles.formInput} defaultValue={selectedAppointment.type.toLowerCase()}>
                      <option value="consultation">Consultation</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="procedure">Procedure</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select className={styles.formInput} defaultValue={selectedAppointment.status.toLowerCase()}>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={`${styles.modalBtn} ${styles.cancel}`} onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className={`${styles.modalBtn} ${styles.save}`}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Appointments; 