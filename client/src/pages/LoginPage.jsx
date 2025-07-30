import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login attempt with:\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleSignIn = () => {
    alert('Signing in with Google...');
  };

  const handleHelp = () => {
    alert('Need help? Contact our support team at support@getcare.com or call us at 1-800-GETCARE');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password reset functionality would be implemented here.');
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    alert('Registration page would be shown here.');
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginWelcomeSection">
          <div className="loginWelcomeOverlay"></div>
          <div className="loginCircleDecoration loginCircle1"></div>
          <div className="loginCircleDecoration loginCircle2"></div>
          <div className="loginCircleDecoration loginCircle3"></div>
          <div className="loginWelcomeContent">
            <div className="loginWelcomeLogo">
              <span className="loginLogoText">GetCare</span>
            </div>
            <div className="loginWelcomeHeading">Welcome Back!</div>
            <div className="loginWelcomeSubtext">
              Access your healthcare dashboard to manage appointments, view medical records, and connect with your doctors.
            </div>
          </div>
        </div>

        <div className="loginSection">
          <div className="loginHeader">
            <h2 className="loginTitle">Sign in to GetCare</h2>
            <p className="loginSubtitle">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="loginFormGroup">
              <label className="loginFormLabel" htmlFor="email">Email Address</label>
              <div className="loginFormInputWrapper">
                <div className="loginFormInputIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="loginFormInput"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="loginFormGroup">
              <div className="loginPasswordRow">
                <label className="loginFormLabel" htmlFor="password">Password</label>
                <a href="#" className="loginForgotLink" onClick={handleForgotPassword}>Forgot password?</a>
              </div>
              <div className="loginFormInputWrapper">
                <div className="loginFormInputIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="loginFormInput"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={togglePasswordVisibility} className="loginPasswordToggle">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="loginCheckboxGroup">
              <input type="checkbox" id="remember" className="loginCheckboxInput" />
              <label htmlFor="remember" className="loginCheckboxLabel">Remember me for 30 days</label>
            </div>

            <button type="submit" className="loginButton">Sign in</button>
          </form>

          <div className="loginSeparator">
            <div className="loginSeparatorLine"></div>
            <span className="loginSeparatorText">or</span>
            <div className="loginSeparatorLine"></div>
          </div>

          <button onClick={handleGoogleSignIn} className="loginGoogleButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Sign in with Google
          </button>

          <p className="loginSignupText">
            Don't have an account?{' '}
            <a href="#" className="loginSignupLink" onClick={handleCreateAccount}>
              Create an account
            </a>
          </p>
        </div>

        <button className="loginHelpFloatingButton" onClick={handleHelp}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
