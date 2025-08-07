import React from 'react';
import styles from './Doctors.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.adminContent}>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Error</h1>
                <p className={styles.pageSubtitle}>Something went wrong. Please refresh the page.</p>
              </div>
              <button 
                className={styles.backButton} 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
