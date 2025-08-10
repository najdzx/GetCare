import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';
import styles from '../maincontent.module.css';

const PatientLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) {
      console.log('PatientLayout - Still loading auth...');
      return;
    }

    // Check if user is new and hasn't completed profile
    if (user) {
      console.log('PatientLayout - User:', user);
      console.log('PatientLayout - User metadata:', user.user_metadata);
      console.log('PatientLayout - Current pathname:', location.pathname);
      
      // Check if user has profile_completed flag set to true
      // For new users, user_metadata might be empty or profile_completed might be undefined
      const hasCompletedProfile = user.user_metadata?.profile_completed === true;
      console.log('PatientLayout - Has completed profile:', hasCompletedProfile);
      
      // If user hasn't completed profile and is not already on the complete profile page
      if (!hasCompletedProfile && location.pathname !== '/setup-profile/complete') {
        console.log('PatientLayout - Redirecting to complete profile');
        navigate('/setup-profile/complete');
      }
    }
  }, [user, loading, navigate, location.pathname]);

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <TopNav collapsed={collapsed} />
      <main
        className={styles['main-content']}
                style={{
                  marginLeft: collapsed ? '80px' : '240px',
                }}
      >
        <Outlet /> {/* 👈 This renders the nested route like Dashboard */}
      </main>
    </>
  );
};

export default PatientLayout;