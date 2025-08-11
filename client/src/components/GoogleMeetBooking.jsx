import React, { useState } from 'react';
import styles from './GoogleMeetBooking.module.css';

const GoogleMeetBooking = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointment, setAppointment] = useState({
    title: '',
    date: '',
    time: '',
    duration: 30,
    description: '',
    doctorEmail: '',
    patientEmail: ''
  });
  const [meetLink, setMeetLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth-status');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (err) {
      console.error('Error checking auth status:', err);
    }
  };

  // Handle Google authentication
  const handleGoogleAuth = () => {
    window.location.href = '/auth/google';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create Google Meet link
  const createMeetLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const startDateTime = new Date(`${appointment.date}T${appointment.time}`);
      const endDateTime = new Date(startDateTime.getTime() + (appointment.duration * 60000));

      const response = await fetch('/api/create-meet-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookies
        body: JSON.stringify({
          title: appointment.title || 'Medical Appointment',
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          description: appointment.description,
          attendees: [
            ...(appointment.doctorEmail ? [{ email: appointment.doctorEmail }] : []),
            ...(appointment.patientEmail ? [{ email: appointment.patientEmail }] : [])
          ]
        })
      });

      const data = await response.json();

      if (data.success) {
        setMeetLink(data.meetLink);
        setError('');
      } else {
        setError(data.error || 'Failed to create Google Meet link');
      }
    } catch (err) {
      setError('Error creating Google Meet link: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Copy Meet link to clipboard
  const copyMeetLink = () => {
    navigator.clipboard.writeText(meetLink);
    alert('Google Meet link copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Book Appointment with Google Meet</h2>

        {!isAuthenticated ? (
          <div className={styles.authSection}>
            <p className={styles.authText}>
              Please authenticate with Google to create Google Meet links for appointments.
            </p>
            <button 
              onClick={handleGoogleAuth}
              className={styles.authButton}
            >
              Sign in with Google
            </button>
            <button 
              onClick={checkAuthStatus}
              className={styles.checkButton}
            >
              Check Authentication Status
            </button>
          </div>
        ) : (
          <form onSubmit={createMeetLink} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Appointment Title</label>
              <input
                type="text"
                name="title"
                value={appointment.title}
                onChange={handleInputChange}
                placeholder="e.g., Consultation with Dr. Smith"
                className={styles.input}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={appointment.date}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Time</label>
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Duration (minutes)</label>
              <select
                name="duration"
                value={appointment.duration}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Doctor Email (optional)</label>
                <input
                  type="email"
                  name="doctorEmail"
                  value={appointment.doctorEmail}
                  onChange={handleInputChange}
                  placeholder="doctor@example.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Patient Email (optional)</label>
                <input
                  type="email"
                  name="patientEmail"
                  value={appointment.patientEmail}
                  onChange={handleInputChange}
                  placeholder="patient@example.com"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description (optional)</label>
              <textarea
                name="description"
                value={appointment.description}
                onChange={handleInputChange}
                placeholder="Additional notes about the appointment..."
                rows={3}
                className={styles.textarea}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !appointment.date || !appointment.time}
              className={styles.createButton}
            >
              {loading ? 'Creating Google Meet Link...' : 'Create Google Meet Link'}
            </button>
          </form>
        )}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {meetLink && (
          <div className={styles.success}>
            <h3 className={styles.successTitle}>Google Meet Link Created Successfully!</h3>
            <div className={styles.meetLinkContainer}>
              <input
                type="text"
                value={meetLink}
                readOnly
                className={styles.meetLinkInput}
              />
              <button 
                onClick={copyMeetLink}
                className={styles.copyButton}
              >
                Copy Link
              </button>
            </div>
            <a 
              href={meetLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.joinButton}
            >
              Join Meeting
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMeetBooking;
