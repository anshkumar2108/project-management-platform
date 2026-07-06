'use client'
// import React from 'react';
import { useState } from 'react';
import styles from './Dashboard.module.css';
import { logout } from '../actions/auth';

export default function DashboardLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const handleLogout = async () => {
    // 1. Wait for the server to destroy the session cookie
    await logout();
    // This completely wipes Next.js's client-side memory and the browser cache.
    window.location.href = '/login';
  };
  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    
    // Process the form data
    console.log({ name: workspaceName, description });

    // Reset and close
    setWorkspaceName('');
    setDescription('');
    setIsModalOpen(false);
  };
return (
    <div className={styles.container}>

      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}></div>
          MyLogo
        </div>

        <nav className={styles.nav}>
          <a href="/dashboard" className={styles.active}>Dashboard</a>
          <a href="/workspaces">Workspaces</a>
          <a href="/settings">Settings</a>
          <form action={handleLogout}>
            <button type="submit" className={styles.logoutButton}>Logout</button>
          </form>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
        </header>

        {/* Workspace Cards Grid */}
        <div className={styles.cardGrid}>

          {/* Card 1 */}
          <div className={styles.card}>
            <h3>Design Project</h3>
            <p>Last updated 2 hours ago</p>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <h3>Development Environment</h3>
            <p>Last updated yesterday</p>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <h3>Marketing Assets</h3>
            <p>Last updated 3 days ago</p>
          </div>

          {/* "Add New" Card Placeholder */}
          <div 
            className={`${styles.card} ${styles.addCard}`}
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
          >
            <h3>+ Create Workspace</h3>
          </div>

        </div>
      </main>

      {/* ─── NEXT.JS COMPATIBLE MODAL ───────────────────────────── */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Create New Workspace</h2>
              <button 
                className={styles.closeButton} 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreateWorkspace} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="workspaceName">Workspace Name</label>
                <input 
                  type="text" 
                  id="workspaceName" 
                  placeholder="e.g., Q3 Launch Campaign" 
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="workspaceDesc">Description <span className={styles.optional}>(Optional)</span></label>
                <textarea 
                  id="workspaceDesc" 
                  placeholder="What is this workspace for?"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton} 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}