import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Success
    alert('Account created successfully! Welcome aboard! 🎉');
    e.target.reset();
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
              <div className="signup-logo-text">YourApp</div>
            </div>
            
            {/* Main Content */}
            <div>
              <h1 className="signup-welcome-heading">Join Us Today!</h1>
              <p className="signup-welcome-subtext">
                Create your account and unlock access to amazing features and a vibrant community.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-section">
          {/* Header */}
          <div className="signup-header">
            <h2 className="signup-title">Create Account</h2>
            <p className="signup-subtitle">Fill in your details to get started</p>
          </div>
          
          {/* Form */}
          <form id="signupForm" onSubmit={handleSubmit}>
            {/* Name Fields Row */}
            <div className="signup-form-group">
              <div className="signup-name-row">
                {/* First Name */}
                <div className="signup-name-field">
                  <label className="signup-form-label">
                    First Name
                  </label>
                  <div className="signup-form-input-wrapper">
                    <svg className="signup-form-input-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      required
                      className="signup-form-input"
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="signup-name-field">
                  <label className="signup-form-label">
                    Last Name
                  </label>
                  <div className="signup-form-input-wrapper">
                    <svg className="signup-form-input-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      required
                      className="signup-form-input"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="signup-form-group">
              <label className="signup-form-label">
                Email
              </label>
              <div className="signup-form-input-wrapper">
                <svg className="signup-form-input-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="signup-form-input"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password */}
            <div className="signup-form-group">
              <label className="signup-form-label">
                Password
              </label>
              <div className="signup-form-input-wrapper">
                <svg className="signup-form-input-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required
                  className="signup-form-input"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="signup-form-group">
              <label className="signup-form-label">
                Confirm Password
              </label>
              <div className="signup-form-input-wrapper">
                <svg className="signup-form-input-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  required
                  className="signup-form-input"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="signup-button">
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="signup-footer">
            <p className="signup-footer-text">
              Already have an account? 
              <Link to="/login" className="signup-footer-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <button className="signupHelpFloatingButton" onClick={handleHelp}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};
  export default RegisterPage;