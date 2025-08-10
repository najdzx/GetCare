// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PATIENT: 'patient'
};

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PATIENTS: '/admin/patients',
    DOCTORS: '/admin/doctors',
    APPOINTMENTS: '/admin/appointments',
    MESSAGES: '/admin/messages',
    CLINICS: '/admin/clinics',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings'
  },
  
  // Doctor routes
  DOCTOR: {
    DASHBOARD: '/doctor/dashboard',
    MY_CLINIC: '/doctor/my-clinic',
    APPOINTMENTS: '/doctor/appointments',
    PATIENTS: '/doctor/patients',
    NOTES: '/doctor/notes',
    CHAT: '/doctor/chat',
    FILES: '/doctor/files',
    ANALYTICS: '/doctor/analytics',
    ENGAGEMENT: '/doctor/engagement',
    INVITATIONS: '/doctor/invitations',
    PROFILE: '/doctor/profile',
    AVAILABILITY: '/doctor/availability'
  },
  
  // Patient routes
  PATIENT: {
    DASHBOARD: '/patient/dashboard',
    DIAGNOSTICS: '/patient/diagnostics',
    APPOINTMENTS: '/patient/appointments',
    DOCTORS: '/patient/doctors',
    NOTES: '/patient/notes',
    CHAT: '/patient/chat',
    FILES: '/patient/files',
    ANALYTICS: '/patient/analytics',
    ENGAGEMENT: '/patient/engagement',
    PROFILE: '/patient/profile'
  }
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  }
};

// Application settings
export const APP_CONFIG = {
  NAME: 'GetCare',
  VERSION: '1.0.0',
  DESCRIPTION: 'Healthcare Management System'
};
