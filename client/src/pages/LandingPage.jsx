import React from 'react';
import heroImage from '../assets/hands4.jpg'; // adjust path
import './LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="landing-logo"><span className="green">Get</span><span className="blue">Care</span></h1>

        <nav className="nav">
          <button>ABOUT</button>
          <Link to="/login"><button>LOGIN</button></Link>
  <Link to="/register"><button>REGISTER</button></Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="text-content">
          <h2>
            YOUR <span className="green">ONLINE</span><br />
            <span className="blue">HEALTH</span> TEAM
          </h2>
          <p>
            We aim to be the leading provider of proactive, convenient, and comprehensive specialist healthcare
            for young adults in the Philippines, empowering them to manage their health effectively through a
            seamless, tech-enabled experience.
          </p>
          <div className="buttons">
            <button className="primary-btn">GET STARTED</button>
          </div>
        </div>

        <div className="image-container" />
      </main>
    </div>
  );
}
