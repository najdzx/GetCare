import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdEdit, MdDelete, MdPerson } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import './Doctors.css';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data
  const doctors = [
    { id: 1, name: 'Dr. John Smith', email: 'john.smith@getcare.com', specialization: 'Cardiology', clinic: 'Heart Clinic', status: 'Active', patients: 45 },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@getcare.com', specialization: 'Pediatrics', clinic: 'Children\'s Clinic', status: 'Active', patients: 32 },
    { id: 3, name: 'Dr. Mike Brown', email: 'mike.brown@getcare.com', specialization: 'Dermatology', clinic: 'Skin Clinic', status: 'Inactive', patients: 28 },
    { id: 4, name: 'Dr. Emily Davis', email: 'emily.davis@getcare.com', specialization: 'Neurology', clinic: 'Brain Clinic', status: 'Active', patients: 19 },
    { id: 5, name: 'Dr. Robert Wilson', email: 'robert.wilson@getcare.com', specialization: 'Orthopedics', clinic: 'Bone Clinic', status: 'Active', patients: 67 },
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || doctor.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="admin-doctors">
        <div className="doctors-header">
          <div className="header-left">
            <h1>Doctors</h1>
            <p>Manage all doctors across GetCare platform</p>
          </div>
          <button className="add-doctor-btn">
            <MdAdd />
            <span>Add Doctor</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="doctors-controls">
          <div className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search doctors..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="doctors-table-container">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Clinic</th>
                <th>Patients</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    <div className="doctor-info">
                      <div className="doctor-avatar">
                        <MdPerson />
                      </div>
                      <span>{doctor.name}</span>
                    </div>
                  </td>
                  <td>{doctor.email}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.clinic}</td>
                  <td>{doctor.patients}</td>
                  <td>
                    <span className={`status-badge ${doctor.status.toLowerCase()}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit">
                        <MdEdit />
                      </button>
                      <button className="action-btn delete">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">Previous</button>
          <div className="page-numbers">
            <span className="page-number active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
          </div>
          <button className="pagination-btn">Next</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Doctors; 