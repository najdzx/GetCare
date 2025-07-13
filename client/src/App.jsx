import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorLayout from './components/doctor/DoctorLayout';
import Dashboard from './pages/doctor/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

// 👇 Add these imports for the sub-pages
import Appointments from './pages/doctor/Appointments';
import Patients from './pages/doctor/Patients';
import Notes from './pages/doctor/Notes';
import Chat from './pages/doctor/Chat';
import Files from './pages/doctor/Files';
import Analytics from './pages/doctor/Analytics';
import Engagement from './pages/doctor/Engagement';
import MyClinic from './pages/doctor/MyClinic';

import PatientLayout from './components/patient/PatientLayout';
import PatientDashboard from './pages/patient/Dashboard';
import PatientAppointments from './pages/patient/Appointments';
import PatientDoctors from './pages/patient/Doctors';
import PatientAnalytics from './pages/patient/Analytics';
import PatientEngagement from './pages/patient/Engagement';
import PatientFiles from './pages/patient/Files';
import PatientDiagnostics from './pages/patient/Diagnostics';
import PatientNotes from './pages/patient/Notes';
import PatientChat from './pages/patient/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Nested route under Doctor layout */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Dashboard />} /> {/* 👈 shows at /doctor */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-clinic" element={<MyClinic />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="notes" element={<Notes />} />
          <Route path="chat" element={<Chat />} />
          <Route path="files" element={<Files />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="engagement" element={<Engagement />} />
        </Route>
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="diagnostics" element={<PatientDiagnostics />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="doctors" element={<PatientDoctors />} />
          <Route path="notes" element={<PatientNotes />} />
          <Route path="chat" element={<PatientChat />} />
          <Route path="files" element={<PatientFiles />} />
          <Route path="analytics" element={<PatientAnalytics />} />
          <Route path="engagement" element={<PatientEngagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;