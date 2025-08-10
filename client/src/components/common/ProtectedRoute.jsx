import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Protected route component that requires authentication
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="loading-spinner">
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if required
  if (requiredRole) {
    const userRole = user?.user_metadata?.role;
    
    if (userRole !== requiredRole) {
      // Redirect to appropriate dashboard based on actual role
      if (userRole === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (userRole === 'doctor') {
        return <Navigate to="/doctor/dashboard" replace />;
      } else {
        return <Navigate to="/patient/dashboard" replace />;
      }
    }
  }

  return children;
};

// Admin-only route
export const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="admin">
      {children}
    </ProtectedRoute>
  );
};

// Doctor-only route
export const DoctorRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="doctor">
      {children}
    </ProtectedRoute>
  );
};

// Patient-only route
export const PatientRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="patient">
      {children}
    </ProtectedRoute>
  );
};

// Public route (redirects to dashboard if already logged in)
export const PublicRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div>Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    const role = user?.user_metadata?.role;
    
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else {
      return <Navigate to="/patient/dashboard" replace />;
    }
  }

  return children;
};
