import React from 'react';
import styles from './Doctors.module.css';

const DoctorFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  specializationFilter, 
  setSpecializationFilter, 
  statusFilter, 
  setStatusFilter, 
  setShowAddModal 
}) => {
  return (
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
  );
};

export default DoctorFilters;
