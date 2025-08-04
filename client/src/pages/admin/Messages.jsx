import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './Messages.module.css';

const Messages = () => {
  return (
    <div className={styles.adminMessages}>
      <div className={styles.messagesHeader}>
        <div className={styles.headerLeft}>
          <h1>Messages</h1>
          <p>Manage platform-wide messages and communications</p>
        </div>
      </div>
      <div className={styles.messagesContent}>
        <div className={styles.placeholderMessage}>
          <h2>Message Management</h2>
          <p>This page will contain message management features for administrators.</p>
          <p>Features will include:</p>
          <ul>
            <li>System notifications</li>
            <li>Broadcast messages</li>
            <li>Message templates</li>
            <li>Communication logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Messages; 