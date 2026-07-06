'use client';
import React from 'react';
import styles from './Login.module.css';
import Image from 'next/image';
import { login } from '../actions/auth';
import { useActionState } from 'react';

export default function SignIn() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className={styles.container}>

      {/* ── Left Panel ─────────────────────────────────────── */}
      <div className={styles.leftPanel}>

        {/* Logo mark — styled as ProjectFlow icon via CSS */}
        <div className={styles.logoCircle}></div>

        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.description}>
          ProjectFlow brings your team's work together — tasks, timelines,
          and conversations, all in one place. Sign in to pick up where you left off.
        </p>

        {/* Social proof strip at bottom */}
        <div className={styles.leftPanelFooter}>
          <div className={styles.leftPanelAvatars}>
            {['AS', 'MK', 'PL', 'JR'].map((i) => (
              <div key={i} className={styles.leftPanelAvatar}>{i}</div>
            ))}
          </div>
          <p className={styles.leftPanelStat}>
            <strong>2,400+ teams</strong> already onboarded
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────── */}
      <div className={styles.rightPanel}>

        <div className={styles.topRightNav}>
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </div>

        <div className={styles.formContainer}>

          {/* Brand mark */}
          <div className={styles.formBrand}>
            <div className={styles.formBrandIcon}>PF</div>
            <span className={styles.formBrandName}>ProjectFlow</span>
          </div>

          <h2 className={styles.formTitle}>Sign in</h2>
          <p className={styles.formSubtitle}>Enter your credentials to access your workspace.</p>

          {/* OAuth Buttons */}
          <button className={styles.oauthButton}>
            <Image src="/images/google-icon.png" alt="Google" width={20} height={20} />
            Continue with Google
          </button>
          <button className={styles.oauthButton}>
            <Image src="/images/facebook-icon.png" alt="Facebook" width={20} height={20} />
            Continue with Facebook
          </button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          {/* ── Form ─────────────────────────────────────────── */}
          <form className={styles.form} action={formAction}>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Username or email address</label>
              <input
                name="email"
                type="text"
                id="email"
                className={styles.input}
                placeholder="you@company.com"
              />
            </div>
            {state?.errors?.email && <p className={styles.errorMessage}>{state?.errors?.email}</p>}

            <div className={styles.inputGroup}>
              <div className={styles.passwordLabelRow}>
                <label htmlFor="password">Password</label>
                <button type="button" className={styles.hideToggle}>
                  Show
                </button>
              </div>
              <input
                name="password"
                type="password"
                id="password"
                className={styles.input}
                placeholder="Enter your password"
              />
            </div>
            {state?.errors?.password && (
              <div className={styles.errorList}>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.forgotPassword}>
              <a href="/forgot">Forgot your password?</a>
            </div>

            <button disabled={pending} type="submit" className={styles.submitButton}>
              {pending ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <div className={styles.mobileBottomNav}>
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
