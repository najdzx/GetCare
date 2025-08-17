import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { AuthService } from '../../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // Use AuthService instead of direct Supabase calls
      const result = await AuthService.signUp({
        email: email,
        password: password,
        role: 'patient'
      });

      if (result.success) {
        alert('Account created successfully! You can now log in.');
        navigate('/login');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleHelp = () => {
    alert('Need help? Contact our support team at support@yourapp.com or call 1-800-HELP for assistance with creating your account.');
  };

  return (
    <div className="signup-page">
      {/* Main Container */}
      <div className="signup-container">
        
        {/* Left Side - Welcome Section */}
        <div className="signup-welcome-section">
          {/* Gradient Overlay */}
          <div className="signup-welcome-overlay"></div>
          
          {/* Decorative Circles */}
          <div className="signup-circle-decoration signup-circle1"></div>
          <div className="signup-circle-decoration signup-circle2"></div>
          <div className="signup-circle-decoration signup-circle3"></div>
          
          {/* Welcome Content */}
          <div className="signup-welcome-content">
            {/* Logo */}
            <div className="signup-welcome-logo">
              <div className="signup-logo-text">GetCare</div>
            </div>
            
            {/* Main Content */}
            <div>
              <h1 className="signup-welcome-heading">Join GetCare</h1>
              <p className="signup-welcome-subtext">
                Create your patient account to access healthcare services, book appointments, and manage your medical records.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-section">
          {/* Header */}
          <div className="signup-header">
            <h2 className="signup-title">Create Patient Account</h2>
            <p className="signup-subtitle">Fill in your details to join GetCare as a patient</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="signup-form">
            {/* Error Message */}
            {error && (
              <div className="error-alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                {error}
              </div>
            )}
            
            {/* Name Fields */}
            
            {/* Email Field */}
            <div className="signup-form-group">
              <label htmlFor="email" className="signup-form-label">Email Address</label>
              <div className="signup-form-input-wrapper">
                <svg className="signup-form-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="signup-form-input"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Password Fields */}
            <div className="signup-form-group">
              <label className="signup-form-label">
                Password
              </label>
              <div className="signup-form-input-wrapper">
                <svg className="signup-form-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password" 
                  name="password" 
                  required
                  className="signup-form-input"
                  placeholder="Create a password"
                  style={{paddingRight:'40px'}}
                />
                <button type="button" onClick={togglePasswordVisibility} className="signupPasswordToggle" style={{position:'absolute',top:'50%',right:'10px',transform:'translateY(-50%)',background:'none',border:'none',padding:0,cursor:'pointer'}}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{color:'#999'}}>
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{color:'#999'}}>
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="signup-form-group">
              <label className="signup-form-label">
                Confirm Password
              </label>
              <div className="signup-form-input-wrapper">
                <svg className="signup-form-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword" 
                  name="confirmPassword" 
                  required
                  className="signup-form-input"
                  placeholder="Confirm your password"
                  style={{paddingRight:'40px'}}
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="signupPasswordToggle" style={{position:'absolute',top:'50%',right:'10px',transform:'translateY(-50%)',background:'none',border:'none',padding:0,cursor:'pointer'}}>
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{color:'#999'}}>
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{color:'#999'}}>
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="form-checkbox-group">
              <input type="checkbox" id="terms" className="form-checkbox" required disabled={loading} />
              <label htmlFor="terms" className="form-checkbox-label">
                I agree to the <a href="#" className="checkbox-link">Terms of Service</a> and <a href="#" className="checkbox-link">Privacy Policy</a>
              </label>
            </div>
            
            {/* Submit Button */}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="signup-footer">
            <p className="signup-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="signup-footer-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button onClick={handleHelp} className="signupHelpFloatingButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

export default RegisterPage;
