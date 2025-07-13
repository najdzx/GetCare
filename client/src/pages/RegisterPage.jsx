import './LoginPage.css'; // reuse the same CSS
import { Link } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // <-- New state

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Welcome!</h2>
          <p>Create your account</p>
        </div>

        <div className="login-right">
          <form className="login-form">
            <h2>Register</h2>

            <div className="input-group">
              <input type="email" id="email" required placeholder=" " />
              <label htmlFor="email">
                <MdEmail className="icon" />
                Enter your email
              </label>
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                placeholder=" "
              />
              <label htmlFor="password">
                <MdLock className="icon" />
                Create your password
              </label>
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="input-group password-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                required
                placeholder=" "
              />
              <label htmlFor="confirmPassword">
                <MdLock className="icon" />
                Confirm your password
              </label>
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="primary-btn" type="submit">
              Register
            </button>

            <div className="signup-link">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
