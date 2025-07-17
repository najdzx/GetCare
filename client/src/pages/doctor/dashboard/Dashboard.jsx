import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdEventNote,
  MdPeople,
  MdPersonAdd,
  MdNote,
} from 'react-icons/md';
import './Dashboard.css';

const Dashboard = () => {
  const [filter, setFilter] = useState('Today');
  const [metrics, setMetrics] = useState({
    appointments: 0,
    assignedPatients: 0,
    referredPatients: 0,
    sharedNotes: [],
  });

  const navigate = useNavigate();

  // Simulate fetching data from backend
  useEffect(() => {
    // Replace this with real API call later
    const fetchData = async () => {
      const data = {
        appointments: 12,
        assignedPatients: 34,
        referredPatients: 8,
        sharedNotes: [
          { doctor: 'Dr. Ramos', patient: 'John D.' },
          { doctor: 'Dr. Lee', patient: 'Patient #1293' },
          { doctor: 'Dr. Cruz', patient: 'Maria S.' },
        ],
      };
      setMetrics(data);
    };

    fetchData();
  }, [filter]); // You can use filter if you want dynamic appointment results

  return (
    <div className="dashboard-grid">

      {/* Appointments */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div className="dashboard-card-title">
            <MdEventNote className="dashboard-card-icon" />
            <h3>Appointments</h3>
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Today</option>
            <option>This Week</option>
            <option>Next 7 Days</option>
            <option>This Month</option>
          </select>
        </div>
        <p className="dashboard-card-number">{metrics.appointments}</p>
        <button className="dashboard-view-btn" onClick={() => navigate('/doctor/appointments')}>
          View
        </button>
      </div>

      {/* Assigned Patients */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div className="dashboard-card-title">
            <MdPeople className="dashboard-card-icon" />
            <h3>Assigned Patients</h3>
          </div>
        </div>
        <p className="dashboard-card-number">{metrics.assignedPatients}</p>
        <button className="dashboard-view-btn" onClick={() => navigate('/doctor/patients')}>
          View
        </button>
      </div>

      {/* Referred Patients */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div className="dashboard-card-title">
            <MdPersonAdd className="dashboard-card-icon" />
            <h3>Referred Patients</h3>
          </div>
        </div>
        <p className="dashboard-card-number">{metrics.referredPatients}</p>
        <button className="dashboard-view-btn" onClick={() => navigate('/doctor/patients')}>
          View
        </button>
      </div>

      {/* Shared Notes */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div className="dashboard-card-title">
            <MdNote className="dashboard-card-icon" />
            <h3>Shared Notes</h3>
          </div>
        </div>
        <ul className="dashboard-notes-list">
          {metrics.sharedNotes.map((note, idx) => (
            <li key={idx}>
              {note.doctor} → {note.patient}
            </li>
          ))}
        </ul>
        <button className="dashboard-view-btn" onClick={() => navigate('/doctor/notes')}>
          View
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
