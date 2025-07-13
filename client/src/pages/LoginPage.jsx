import './LoginPage.css';
import { Link } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // eye icons
import { useState } from 'react';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Hello!</h2>
          <p>Welcome to GetCare.</p>
        </div>

        <div className="login-right">
          <form className="login-form">
            <h2>Login</h2>

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
                Enter your password
              </label>
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="forgot-password">
              <Link to="/forgot">Forgot password?</Link>
            </div>

            <button className="primary-btn" type="submit">
              Submit
            </button>

            <div className="signup-link">
              No account yet? <Link to="/register">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
