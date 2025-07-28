import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import './Patients.css';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data
  const patients = [
    { id: 1, name: 'John Doe', email: 'john@email.com', phone: '+1234567890', doctor: 'Dr. Smith', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', phone: '+1234567891', doctor: 'Dr. Johnson', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', phone: '+1234567892', doctor: 'Dr. Brown', status: 'Inactive' },
    { id: 4, name: 'Sarah Davis', email: 'sarah@email.com', phone: '+1234567893', doctor: 'Dr. Smith', status: 'Active' },
    { id: 5, name: 'Tom Anderson', email: 'tom@email.com', phone: '+1234567894', doctor: 'Dr. Johnson', status: 'Active' },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || patient.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="admin-patients">
        <div className="patients-header">
          <div className="header-left">
            <h1>Patients</h1>
            <p>Manage all patients across GetCare platform</p>
          </div>
          <button className="add-patient-btn">
            <MdAdd />
            <span>Add Patient</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="patients-controls">
          <div className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search patients..."
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

        {/* Patients Table */}
        <div className="patients-table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Assigned Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.doctor}</td>
                  <td>
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
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

export default Patients; 