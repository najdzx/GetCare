import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Hide any existing messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    // Simulate sending reset email
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSuccessMessage('Password reset link has been sent to your email address. Please check your inbox and follow the instructions.');
      setIsSubmitting(false);
      setEmail('');
    }, 1500);
  };
  
  // Removed goBackToLogin function

  const showHelp = () => {
    alert('Need help? Contact our support team at support@secureapp.com or call 1-800-HELP');
  };

  return (
    <div className={styles.forgotPage}>
      <div className={styles.forgotContainer}>
        {/* Welcome Section */}
        <div className={styles.forgotWelcomeSection}>
          <div className={styles.forgotWelcomeOverlay}></div>
          
          {/* Decorative circles */}
          <div className={`${styles.forgotCircleDecoration} ${styles.forgotCircle1}`}></div>
          <div className={`${styles.forgotCircleDecoration} ${styles.forgotCircle2}`}></div>
          <div className={`${styles.forgotCircleDecoration} ${styles.forgotCircle3}`}></div>
          
          <div className={styles.forgotWelcomeContent}>
            <div className={styles.forgotWelcomeLogo}>
              <div className={styles.forgotLogoIcon}>🔐</div>
              <div className={styles.forgotLogoText}>SecureApp</div>
            </div>
            
            <div>
              <h1 className={styles.forgotWelcomeHeading}>Don't worry!</h1>
              <p className={styles.forgotWelcomeSubtext}>
                Password recovery is simple and secure. We'll send you a reset link to get you back into your account quickly and safely.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.forgotSection}>
          <div className={styles.forgotHeader}>
            <h2 className={styles.forgotTitle}>Reset Password</h2>
            <p className={styles.forgotSubtitle}>Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {/* Removed Back to Login button */}

          {errorMessage && (
            <div className={`${styles.forgotErrorMessage} ${styles.forgotMessageVisible}`}>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className={`${styles.forgotSuccessMessage} ${styles.forgotMessageVisible}`}>
              {successMessage}
            </div>
          )}

          <form id="forgotPasswordForm" onSubmit={handleSubmit}>
            <div className={styles.forgotFormGroup}>
              <label htmlFor="email" className={styles.forgotFormLabel}>Email Address</label>
              <div className={styles.forgotFormInputWrapper}>
                <svg className={styles.forgotFormInputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className={styles.forgotFormInput} 
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.forgotButton} 
              disabled={isSubmitting}
              style={{ backgroundColor: isSubmitting ? '#999' : '#434bb8' }}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className={styles.forgotFooter}>
            <p className={styles.forgotFooterText}>
              Remember your password? 
              <Link to="/login" className={styles.forgotFooterLink}>Log in here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className={styles.forgotHelpFloatingButton} onClick={showHelp}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default ForgotPassword;