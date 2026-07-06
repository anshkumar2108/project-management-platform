import React from 'react';
import styles from './Workspaces.module.css';

export default function Workspaces() {
  return (
    <div className={styles.container}>
      
      {/* Sidebar Navigation (Consistent with Dashboard) */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}></div>
          MyLogo
        </div>
        
        <nav className={styles.nav}>
          <a href="/dashboard">Dashboard</a>
          <a href="/workspaces" className={styles.active}>Workspaces</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      {/* Workspace Main Content */}
      <main className={styles.mainContent}>
        
        {/* Workspace Header */}
        <header className={styles.header}>
          <div>
            <h1>Design Team Workspace</h1>
            <p className={styles.workspaceDesc}>Manage all design projects and assets.</p>
          </div>
          <button className={styles.primaryBtn}>+ New Project</button>
        </header>

        {/* Members Section */}
        <section className={styles.membersSection}>
          <h2>Members</h2>
          <div className={styles.memberList}>
            <div className={styles.avatar}>AK</div>
            <div className={styles.avatar}>JD</div>
            <div className={styles.avatar}>SM</div>
            <button className={styles.inviteBtn}>+ Invite</button>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Projects Grid */}
        <section>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.projectsGrid}>
            
            {/* Project Card 1 */}
            <div className={styles.projectCard}>
              <div className={styles.cardContent}>
                <h3>Website Redesign</h3>
                <p>Complete overhaul of the main landing page and authentication flows.</p>
              </div>
              <a href="/projects/website" className={styles.openProjectBtn}>
                Open Project
              </a>
            </div>

            {/* Project Card 2 */}
            <div className={styles.projectCard}>
              <div className={styles.cardContent}>
                <h3>Mobile App UI</h3>
                <p>Wireframes and high-fidelity mockups for the new iOS release.</p>
              </div>
              <a href="/projects/mobile" className={styles.openProjectBtn}>
                Open Project
              </a>
            </div>

            {/* Project Card 3 */}
            <div className={styles.projectCard}>
              <div className={styles.cardContent}>
                <h3>Marketing Campaign</h3>
                <p>Social media assets and email templates for Q3.</p>
              </div>
              <a href="/projects/marketing" className={styles.openProjectBtn}>
                Open Project
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}