import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdEdit, MdDelete, MdPerson } from 'react-icons/md';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './Doctors.module.css';

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
      <div className={styles.adminDoctors}>
        <div className={styles.doctorsHeader}>
          <div className={styles.headerLeft}>
            <h1>Doctors</h1>
            <p>Manage all doctors across GetCare platform</p>
          </div>
          <button className={styles.addDoctorBtn}>
            <MdAdd />
            <span>Add Doctor</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className={styles.doctorsControls}>
          <div className={styles.searchContainer}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search doctors..."
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

        {/* Doctors Table */}
        <div className={styles.doctorsTableContainer}>
          <table className={styles.doctorsTable}>
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
                    <div className={styles.doctorInfo}>
                      <div className={styles.doctorAvatar}>
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
                    <span className={`${styles.statusBadge} ${styles[doctor.status.toLowerCase()]}`}>
                      {doctor.status}
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

export default Doctors; 