import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdEventNote,
  MdPeople,
  MdPersonAdd,
  MdNote,
  MdAdd,
  MdSchedule,
  MdPerson,
  MdMessage,
  MdNotifications,
  MdTrendingUp,
  MdAccessTime,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdArrowForward,
  MdAssignmentInd,
  MdGroupAdd,
  MdShare,
} from 'react-icons/md';
import './Dashboard.css';
import '../../../components/Layout/Scrollbar.css';

const mockPatients = [
  { id: 1, name: 'John Doe', status: 'Active', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', status: 'Critical', avatar: 'JS' },
  { id: 3, name: 'Michael Chen', status: 'Discharged', avatar: 'MC' },
  { id: 4, name: 'Sarah Wilson', status: 'Active', avatar: 'SW' },
];

const mockReferrals = [
  { id: 1, patient: 'Alice Brown', specialist: 'Dr. Wilson', status: 'Pending' },
  { id: 2, patient: 'John Doe', specialist: 'Dr. Davis', status: 'Accepted' },
  { id: 3, patient: 'Maria Garcia', specialist: 'Dr. Lee', status: 'Declined' },
];

const mockNotes = [
  { id: 1, type: 'Consultation', title: 'Initial Consultation', content: 'Discussed lifestyle modifications.' },
  { id: 2, type: 'Progress', title: 'Follow-up', content: 'Patient reports improvement.' },
  { id: 3, type: 'Lab Result', title: 'Lab Results', content: 'Blood sugar levels improved.' },
  { id: 4, type: 'Consultation', title: 'Specialist Review', content: 'Cardiology consult completed.' },
];

const Dashboard = () => {
  const [filter, setFilter] = useState('Today');
  const [metrics, setMetrics] = useState({
    appointments: 12,
    assignedPatients: 34,
    referredPatients: 8,
    sharedNotes: [
      { doctor: 'Dr. Ramos', patient: 'John D.' },
      { doctor: 'Dr. Lee', patient: 'Patient #1293' },
      { doctor: 'Dr. Cruz', patient: 'Maria S.' },
    ],
  });

  const navigate = useNavigate();

  // Mock data for enhanced cards
  const nextAppointment = {
    patient: 'John Doe',
    time: '2:00 PM',
    type: 'Telehealth',
  };
  const appointmentStatus = { upcoming: 8, completed: 3, cancelled: 1 };
  const patientStatus = { active: 2, discharged: 1, critical: 1 };
  const referralStatus = { pending: 1, accepted: 1, declined: 1 };
  const recentReferral = mockReferrals[0];
  const noteTypeCounts = mockNotes.reduce((acc, note) => {
    acc[note.type] = (acc[note.type] || 0) + 1;
    return acc;
  }, {});
  const recentNote = mockNotes[0];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'note',
      title: 'Added note for John Doe',
      description: 'Updated diabetes management plan',
      timestamp: '2 hours ago',
      icon: <MdNote />,
      color: '#434bb8'
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Appointment scheduled',
      description: 'Follow-up with Sarah Wilson at 2:00 PM',
      timestamp: '3 hours ago',
      icon: <MdSchedule />,
      color: '#28a745'
    },
    {
      id: 3,
      type: 'invitation',
      title: 'Specialist invited',
      description: 'Dr. Johnson invited for cardiac consultation',
      timestamp: '5 hours ago',
      icon: <MdPersonAdd />,
      color: '#ffc107'
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from patient',
      description: 'Alice Brown sent a message about symptoms',
      timestamp: '1 day ago',
      icon: <MdMessage />,
      color: '#17a2b8'
    },
    {
      id: 5,
      type: 'patient',
      title: 'New patient assigned',
      description: 'Michael Chen added to your patient list',
      timestamp: '1 day ago',
      icon: <MdPerson />,
      color: '#6f42c1'
    }
  ];

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

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addNote':
        navigate('/doctor/notes');
        break;
      case 'scheduleAppointment':
        navigate('/doctor/appointments');
        break;
      case 'inviteSpecialist':
        navigate('/doctor/invitations');
        break;
      case 'viewSchedule':
        navigate('/doctor/appointments', { state: { focus: 'today' } });
        break;
      case 'addPatient':
        navigate('/doctor/patients');
        break;
      case 'referPatient':
        navigate('/doctor/patients');
        break;
      case 'shareNote':
        navigate('/doctor/notes');
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Main Dashboard Grid */}
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
          <div className="dashboard-card-preview">
            <div className="next-appointment">
              <MdAccessTime /> Next: <b>John Doe</b>, 2:00 PM
            </div>
          </div>
          <button className="dashboard-view-btn" onClick={() => navigate('/doctor/appointments')}>
            View
          </button>
        </div>

        {/* My Patients */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="dashboard-card-title">
              <MdPeople className="dashboard-card-icon" />
              <h3>My Patients</h3>
            </div>
          </div>
          <p className="dashboard-card-number">{metrics.assignedPatients}</p>
          <button className="dashboard-view-btn" onClick={() => navigate('/doctor/patients')}>
            View
          </button>
        </div>

        {/* Shared Cases */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="dashboard-card-title">
              <MdPersonAdd className="dashboard-card-icon" />
              <h3>Shared Cases</h3>
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
          <p className="dashboard-card-number">{metrics.sharedNotes.length}</p>
          <button className="dashboard-view-btn" onClick={() => navigate('/doctor/notes')}>
            View
          </button>
        </div>
      </div>

      {/* Quick Actions Panel - Moved below cards */}
      <div className="quick-actions-panel">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-btn" onClick={() => handleQuickAction('addNote')}><MdAdd /><span>Add Note</span></button>
          <button className="quick-action-btn" onClick={() => handleQuickAction('scheduleAppointment')}><MdSchedule /><span>Schedule Appointment</span></button>
          <button className="quick-action-btn" onClick={() => handleQuickAction('inviteSpecialist')}><MdPersonAdd /><span>Invite Specialist</span></button>
          <button className="quick-action-btn" onClick={() => handleQuickAction('viewSchedule')}><MdEventNote /><span>View Today's Schedule</span></button>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="recent-activity-panel">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="activity-list custom-scrollbar">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon" style={{ color: activity.color }}>
                {activity.icon}
              </div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-description">{activity.description}</div>
                <div className="activity-timestamp">{activity.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
