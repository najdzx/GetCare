// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

// Formatting utilities
export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim();
};

export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// String utilities
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const initials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${first}${last}`;
};

// Role utilities
export const getRoleBadgeColor = (role) => {
  switch (role) {
    case 'admin':
      return '#dc3545'; // Red
    case 'doctor':
      return '#28a745'; // Green
    case 'patient':
      return '#007bff'; // Blue
    default:
      return '#6c757d'; // Gray
  }
};

export const getRoleDisplayName = (role) => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'doctor':
      return 'Doctor';
    case 'patient':
      return 'Patient';
    default:
      return 'User';
  }
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Loading state utilities
export const createLoadingState = () => ({
  loading: false,
  error: null,
  data: null
});

export const setLoading = (state) => ({
  ...state,
  loading: true,
  error: null
});

export const setSuccess = (state, data) => ({
  ...state,
  loading: false,
  error: null,
  data
});

export const setError = (state, error) => ({
  ...state,
  loading: false,
  error: getErrorMessage(error),
  data: null
});

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
