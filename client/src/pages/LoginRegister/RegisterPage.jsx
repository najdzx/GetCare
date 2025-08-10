import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './RegisterPage.css';

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
    
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
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
      // Step 1: Sign up with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            role: 'patient' // Default role
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Step 2: Save additional user data to our custom users table
      if (data.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: email,
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`,
              role: 'patient',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (dbError) {
          console.error('Database error:', dbError);
          // Even if database insert fails, auth user was created successfully
          setError('Account created but there was an issue saving additional data. You can still log in.');
        }
      }

      // Success
      alert('Account created successfully! You can now log in.');
      navigate('/login');
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
              <h1 className="signup-welcome-heading">Join GetCare as a Patient</h1>
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
          <form id="signupForm" onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}
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

            {/* Submit Button */}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
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