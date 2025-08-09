import React, { useState, useEffect } from 'react';
import styles from './EmailVerification.module.css';

const EmailVerification = () => {
  const [generatedCode] = useState('123456');
  const [userEmail] = useState('patient@example.com');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [codeInputs, setCodeInputs] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    // Start initial resend timer
    startResendTimer();
  }, []);

  useEffect(() => {
    if (resendCountdown <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendCountdown(resendCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleInputChange = (index, value) => {
    const newCodeInputs = [...codeInputs];
    newCodeInputs[index] = value;
    setCodeInputs(newCodeInputs);

    // Move to next input if current is filled
    if (value && index < 5) {
      document.getElementById(`codeInput-${index + 1}`).focus();
    }

    // Auto-verify when all digits are entered
    checkAutoVerify(newCodeInputs);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !codeInputs[index] && index > 0) {
      e.preventDefault();
      document.getElementById(`codeInput-${index - 1}`).focus();
    }
  };

  const checkAutoVerify = (inputs) => {
    const enteredCode = inputs.join('');
    if (enteredCode.length === 6) {
      setTimeout(() => verifyEmail(enteredCode), 500);
    }
  };

  const verifyEmail = (enteredCode) => {
    if (enteredCode.length !== 6) {
      showEmailError('Please enter all 6 digits.');
      return;
    }

    if (enteredCode === generatedCode) {
      hideEmailError();
      showEmailSuccess();
      console.log('Email verified successfully!');
    } else {
      showEmailError('Invalid verification code. Please try again.');
      // Clear inputs
      setCodeInputs(['', '', '', '', '', '']);
      document.getElementById('codeInput-0').focus();
    }
  };

  const startResendTimer = () => {
    setResendCountdown(60);
  };

  const resendCode = () => {
    if (resendCountdown > 0) return;

    // Clear inputs
    setCodeInputs(['', '', '', '', '', '']);
    document.getElementById('codeInput-0').focus();

    // Show success feedback
    hideEmailError();
    showEmailSuccess();
    setTimeout(() => hideEmailSuccess(), 2000);

    // Start countdown timer
    startResendTimer();
    console.log('New verification code sent!');
  };

  const showEmailError = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setShowSuccess(false);
  };

  const hideEmailError = () => {
    setShowError(false);
  };

  const showEmailSuccess = () => {
    setShowSuccess(true);
    setShowError(false);
  };

  const hideEmailSuccess = () => {
    setShowSuccess(false);
  };

  const showHelp = () => {
    alert('Help: Enter your email address and we\'ll send you a verification code. Make sure to check your spam folder if you don\'t see the email.');
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        {/* Left Side - Welcome Section */}
        <div className={styles.signupWelcomeSection}>
          <div className={styles.signupWelcomeOverlay}></div>
          
          {/* Decorative Circles */}
          <div className={`${styles.signupCircleDecoration} ${styles.signupCircle1}`}></div>
          <div className={`${styles.signupCircleDecoration} ${styles.signupCircle2}`}></div>
          <div className={`${styles.signupCircleDecoration} ${styles.signupCircle3}`}></div>
          
          <div className={styles.signupWelcomeContent}>
            <div className={styles.signupWelcomeLogo}>
              <div className={styles.signupLogoText}>GetCare</div>
            </div>
            
            <h1 className={styles.signupWelcomeHeading}>Welcome to GetCare</h1>
            <p className={styles.signupWelcomeSubtext}>
              Your trusted healthcare platform with secure access and reliable support.
            </p>

            {/* Feature Highlights */}
            <div className={styles.featureHighlights}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4A2,2 0 0,0 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10A2,2 0 0,0 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z"/>
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Secure Access</h3>
                  <p className={styles.featureDescription}>Your data is protected with advanced security</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Always On Support</h3>
                  <p className={styles.featureDescription}>24/7 support when you need it most</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Easy Access</h3>
                  <p className={styles.featureDescription}>Simple and intuitive for everyone</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className={styles.signupSection}>
          <div className={styles.signupHeader}>
            <div className={styles.emailIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
              </svg>
            </div>
            <h2 className={styles.signupTitle}>Verify Your Email</h2>
            <p className={styles.signupSubtitle}>
              We've sent a 6-digit verification code to your email address.<br />
              Enter the code below to complete your registration.
            </p>
            <p className={styles.emailSentInfo}>
              Code sent to: <span className={styles.emailHighlight}>{userEmail}</span>
            </p>
          </div>

          {/* Error Message */}
          {showError && (
            <div className={`${styles.signupErrorMessage} ${styles.signupMessageVisible}`}>
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className={`${styles.signupSuccessMessage} ${styles.signupMessageVisible}`}>
              Verification code sent successfully!
            </div>
          )}

          {/* Verification Code Input */}
          <div className={styles.signupFormGroup}>
            <div className={styles.verificationCodeContainer}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  id={`codeInput-${index}`}
                  type="text"
                  className={`${styles.verificationCodeInput} ${codeInputs[index] ? styles.filled : ''}`}
                  maxLength="1"
                  value={codeInputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </div>

          <button onClick={() => verifyEmail(codeInputs.join(''))} className={styles.signupButton} id="verifyBtn">
            Verify Email
          </button>

          <div className={styles.signupFooter}>
            <p className={styles.signupFooterText}>
              Didn't receive the code? 
              <button 
                onClick={resendCode} 
                className={styles.resendLink} 
                id="resendBtn"
                disabled={resendCountdown > 0}
              >
                Resend Code
              </button>
            </p>
            {resendCountdown > 0 && (
              <p className={styles.resendTimer} id="resendTimer">
                Resend available in <span id="countdown">{resendCountdown}</span> seconds
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className={styles.signupHelpFloatingButton} onClick={showHelp}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      </button>
    </div>
  );
};

export default EmailVerification;