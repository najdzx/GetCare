import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdEdit, MdDelete, MdPerson, MdSchedule, MdEvent } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import './Appointments.css';

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
    <AdminLayout>
      <div className="admin-appointments">
        <div className="appointments-header">
          <div className="header-left">
            <h1>Appointments Management</h1>
            <p>Manage appointments for all doctors across GetCare platform</p>
          </div>
          <button className="add-appointment-btn" onClick={handleAddAppointment}>
            <MdAdd />
            <span>Add Appointment</span>
          </button>
        </div>

        {/* Doctor Selection */}
        <div className="doctor-selection">
          <label htmlFor="doctor-select">Select Doctor:</label>
          <select
            id="doctor-select"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="doctor-select"
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
        <div className="appointments-controls">
          <div className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <MdFilterList className="filter-icon" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="appointments-table-container">
          <table className="appointments-table">
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
                    <div className="doctor-info">
                      <MdPerson className="doctor-avatar" />
                      <span>{getDoctorName(appointment.doctorId)}</span>
                    </div>
                  </td>
                  <td>{appointment.patientName}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.duration} min</td>
                  <td>{appointment.type}</td>
                  <td>
                    <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit"
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <MdEdit />
                      </button>
                      <button 
                        className="action-btn delete"
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
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Appointment</h2>
                <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className="modal-content">
                <div className="form-group">
                  <label>Doctor</label>
                  <select className="form-input">
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Patient Name</label>
                  <input type="text" className="form-input" placeholder="Enter patient name" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" className="form-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" className="form-input" placeholder="30" />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select className="form-input">
                      <option value="consultation">Consultation</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="procedure">Procedure</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-input">
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="modal-btn save">
                  Add Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Appointment Modal */}
        {showEditModal && selectedAppointment && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Appointment</h2>
                <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
              </div>
              <div className="modal-content">
                <div className="form-group">
                  <label>Doctor</label>
                  <select className="form-input" defaultValue={selectedAppointment.doctorId}>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedAppointment.patientName}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-input" defaultValue={selectedAppointment.date} />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" className="form-input" defaultValue={selectedAppointment.time} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" className="form-input" defaultValue={selectedAppointment.duration} />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select className="form-input" defaultValue={selectedAppointment.type.toLowerCase()}>
                      <option value="consultation">Consultation</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="procedure">Procedure</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-input" defaultValue={selectedAppointment.status.toLowerCase()}>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn cancel" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="modal-btn save">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Appointments; 