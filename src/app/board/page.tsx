'use client'; // Required for using hooks in Next.js App Router

import React, { useState, useEffect } from 'react';
import styles from './Board.module.css';

// Sample initial data structure
const initialTasks = {
  todo: [
    { id: '1', title: 'Fix Navbar', priority: 'High', priorityClass: 'high' },
    { id: '2', title: 'Create Auth API', priority: 'Medium', priorityClass: 'medium' }
  ],
  progress: [
    { id: '3', title: 'Design Database Schema', priority: 'High', priorityClass: 'high' }
  ],
  review: [
    { id: '4', title: 'Update User Profile UI', priority: 'Low', priorityClass: 'low' }
  ],
  done: [
    { id: '5', title: 'Setup Next.js Project', priority: 'High', priorityClass: 'high' }
  ]
};

export default function BoardPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isMounted, setIsMounted] = useState(false);

  // Load tasks from local storage on initial render
// 1. Safely mark the component as mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Sync with localStorage ONLY after the component has mounted
  useEffect(() => {
    if (isMounted) {
      const savedTasks = localStorage.getItem('workspace_tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, [isMounted]);

  // 3. Save to localStorage whenever tasks change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('workspace_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  // Prevent UI rendering until the client has fully taken over
  if (!isMounted) {
    return <div className={styles.loading}>Loading Board...</div>;
  }
  return (
    <div className={styles.container}>
      
      {/* Sidebar (Keeping consistency) */}
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

      {/* Main Board Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Development Sprint</h1>
          <button className={styles.addTaskBtn}>+ Add Task</button>
        </header>

        {/* Kanban Board Container */}
        <div className={styles.boardContainer}>
          
          {/* Column: To Do */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <h2>Todo</h2>
              <span className={styles.taskCount}>{tasks.todo.length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks.todo.map(task => (
                <div key={task.id} className={styles.card}>
                  <h4>{task.title}</h4>
                  <span className={`${styles.priorityTag} ${styles[task.priorityClass]}`}>
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column: In Progress */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <h2>Progress</h2>
              <span className={styles.taskCount}>{tasks.progress.length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks.progress.map(task => (
                <div key={task.id} className={styles.card}>
                  <h4>{task.title}</h4>
                  <span className={`${styles.priorityTag} ${styles[task.priorityClass]}`}>
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Review */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <h2>Review</h2>
              <span className={styles.taskCount}>{tasks.review.length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks.review.map(task => (
                <div key={task.id} className={styles.card}>
                  <h4>{task.title}</h4>
                  <span className={`${styles.priorityTag} ${styles[task.priorityClass]}`}>
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Done */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <h2>Done</h2>
              <span className={styles.taskCount}>{tasks.done.length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks.done.map(task => (
                <div key={task.id} className={styles.card}>
                  <h4>{task.title}</h4>
                  <span className={`${styles.priorityTag} ${styles[task.priorityClass]}`}>
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}