
import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className={styles["landing-page"]}>
    <header className={styles.header}>
      <h1 className={styles["landing-logo"]}><span className={styles.green}>Get</span><span className={styles.blue}>Care</span></h1>
      <button className={styles["mobile-menu-btn"]} id="mobileMenuBtn">
        <svg viewBox="0 0 24 24">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
      <nav className={styles.nav} id="navMenu">
        <button className={styles["nav-btn"]} role="button">ABOUT</button>
        <Link to="/login" className={styles["nav-btn"]} role="button">LOGIN</Link>
        <Link to="/register" className={styles["nav-btn"]} role="button">REGISTER</Link>
      </nav>
    </header>
    <main className={styles["main-content"]}>
      <div className={`${styles.shape} ${styles["shape-1"]}`}></div>
      <div className={`${styles.shape} ${styles["shape-2"]}`}></div>
      <div className={styles["text-content"]}>
        <h2 className={styles["hero-title"]}>
          YOUR <span className={styles.green}>ONLINE</span><br />
          <span className={styles.blue}>HEALTH</span> TEAM
        </h2>
        <p className={styles["hero-description"]}>
          We aim to be the leading provider of proactive, convenient, and comprehensive specialist healthcare
          for young adults in the Philippines, empowering them to manage their health effectively through a
          seamless, tech-enabled experience.
        </p>
        <div className={styles.buttons}>
          <button className={styles["primary-btn1"]}>GET STARTED</button>
          <button className={styles["secondary-btn1"]}>LEARN MORE</button>
        </div>
      </div>
      <div className={styles["image-container"]}>
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Healthcare professionals" className={`${styles["hero-image"]} ${styles.floating}`} />
      </div>
    </main>
    <section className={styles.features}>
      <h2 className={styles["section-title"]}>Why Choose <span className={styles.blue}>GetCare</span>?</h2>
      <p className={styles["section-subtitle"]}>Experience healthcare like never before with our innovative approach to online medical services.</p>
      <div className={styles["features-grid"]}>
        <div className={styles["feature-card"]}>
          <div className={styles["feature-icon"]}>
            <svg viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
            </svg>
          </div>
          <h3 className={styles["feature-title"]}>24/7 Access</h3>
          <p className={styles["feature-description"]}>Connect with healthcare professionals anytime, anywhere through our secure platform.</p>
        </div>
        <div className={styles["feature-card"]}>
          <div className={styles["feature-icon"]}>
            <svg viewBox="0 0 24 24">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
            </svg>
          </div>
          <h3 className={styles["feature-title"]}>Specialist Care</h3>
          <p className={styles["feature-description"]}>Access a network of qualified specialists tailored to your specific health needs.</p>
        </div>
        <div className={styles["feature-card"]}>
          <div className={styles["feature-icon"]}>
            <svg viewBox="0 0 24 24">
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
            </svg>
          </div>
          <h3 className={styles["feature-title"]}>Comfort of Home</h3>
          <p className={styles["feature-description"]}>Receive professional medical advice without leaving the comfort of your home.</p>
        </div>
      </div>
    </section>
    <section className={styles.cta}>
      <h2 className={styles["cta-title"]}>Ready to take control of your health?</h2>
      <p className={styles["cta-description"]}>Join thousands of young adults who have transformed their healthcare experience with GetCare.</p>
      <Link to="/register" className={styles["cta-btn"]} role="button">CREATE YOUR ACCOUNT</Link>
    </section>
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <div>
          <h3 className={styles["footer-logo"]}><span className={styles.green}>Get</span><span className={styles.blue}>Care</span></h3>
          <p className={styles["footer-description"]}>
            Empowering young adults to take control of their health through innovative technology and expert care.
          </p>
          <div className={styles["social-links"]}>
            <a href="#" className={styles["social-link"]}>
              <svg viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
            </a>
            <a href="#" className={styles["social-link"]}>
              <svg viewBox="0 0 24 24">
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
              </svg>
            </a>
            <a href="#" className={styles["social-link"]}>
              <svg viewBox="0 0 24 24">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className={styles["footer-title"]}>Company</h4>
          <ul className={styles["footer-links"]}>
            <li className={styles["footer-link"]}><a href="#">About Us</a></li>
            <li className={styles["footer-link"]}><a href="#">Our Team</a></li>
            <li className={styles["footer-link"]}><a href="#">Careers</a></li>
            <li className={styles["footer-link"]}><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className={styles["footer-title"]}>Services</h4>
          <ul className={styles["footer-links"]}>
            <li className={styles["footer-link"]}><a href="#">Teleconsultation</a></li>
            <li className={styles["footer-link"]}><a href="#">Specialist Referrals</a></li>
            <li className={styles["footer-link"]}><a href="#">Health Monitoring</a></li>
            <li className={styles["footer-link"]}><a href="#">Prescription Delivery</a></li>
          </ul>
        </div>
        <div>
          <h4 className={styles["footer-title"]}>Support</h4>
          <ul className={styles["footer-links"]}>
            <li className={styles["footer-link"]}><a href="#">Help Center</a></li>
            <li className={styles["footer-link"]}><a href="#">FAQs</a></li>
            <li className={styles["footer-link"]}><a href="#">Privacy Policy</a></li>
            <li className={styles["footer-link"]}><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} GetCare. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default LandingPage;
