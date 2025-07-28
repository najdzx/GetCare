import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import './Clinics.css';

const Clinics = () => {
  return (
    <AdminLayout>
      <div className="admin-clinics">
        <div className="clinics-header">
          <div className="header-left">
            <h1>Clinics</h1>
            <p>Manage all clinics across GetCare platform</p>
          </div>
        </div>
        
        <div className="clinics-content">
          <div className="placeholder-message">
            <h2>Clinics Management</h2>
            <p>This page will contain clinic management features for administrators.</p>
            <p>Features will include:</p>
            <ul>
              <li>View all registered clinics</li>
              <li>Manage clinic information</li>
              <li>Monitor clinic performance</li>
              <li>Generate clinic reports</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Clinics; 