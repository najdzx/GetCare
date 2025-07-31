import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './Patients.module.css';

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
      <div className={styles.adminPatients}>
        <div className={styles.patientsHeader}>
          <div className={styles.headerLeft}>
            <h1>Patients</h1>
            <p>Manage all patients across GetCare platform</p>
          </div>
          <button className={styles.addPatientBtn}>
            <MdAdd />
            <span>Add Patient</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className={styles.patientsControls}>
          <div className={styles.searchContainer}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search patients..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Patients Table */}
        <div className={styles.patientsTableContainer}>
          <table className={styles.patientsTable}>
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
                    <span className={`${styles.statusBadge} ${styles[patient.status.toLowerCase()]}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={`${styles.actionBtn} ${styles.edit}`}>
                        <MdEdit />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.delete}`}>
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
        <div className={styles.pagination}>
          <button className={styles.paginationBtn}>Previous</button>
          <div className={styles.pageNumbers}>
            <span className={`${styles.pageNumber} ${styles.active}`}>1</span>
            <span className={styles.pageNumber}>2</span>
            <span className={styles.pageNumber}>3</span>
          </div>
          <button className={styles.paginationBtn}>Next</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Patients; 