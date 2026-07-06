'use client';

import React, { useActionState, useState } from 'react';
import styles from './Register.module.css';
import Image from 'next/image';
import { handleSignup } from '../actions/auth';

export default function Register() {
  const [step, setStep] = useState('initial');
  const [state, formAction, pending] = useActionState(handleSignup, undefined);

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.modal}>

        {/* Close Button */}
        <button className={styles.closeButton} aria-label="Close">
          &times;
        </button>

        {/* ── INITIAL VIEW ─────────────────────────────────────── */}
        {step === 'initial' && (
          <>
            <div className={styles.logoCircle}></div>
            <h1 className={styles.heading}>
              Unlimited free access<br />to our resources
            </h1>
            <p className={styles.subheading}>Sign up to see more</p>

            <button
              className={styles.primaryButton}
              onClick={() => setStep('email')}
            >
              Continue with email
            </button>

            <button className={styles.socialButton}>
              <Image src="/images/facebook-icon.png" alt="Facebook" width={20} height={20} />
              Continue with Facebook
            </button>

            <button className={styles.socialButton}>
              <Image src="/images/google-icon.png" alt="Google" width={20} height={20} />
              Continue with Google
            </button>

            <p className={styles.disclaimer}>
              By continuing, you agree to the <a href="/terms">Terms of Service</a><br />
              and acknowledge you&apos;ve read our <a href="/privacy">Privacy Policy</a>.
            </p>

            <div className={styles.loginLink}>
              Already a member? <a href="/login">Log in</a>
            </div>
          </>
        )}

        {/* ── EMAIL FORM VIEW ───────────────────────────────────── */}
        {step === 'email' && (
          <>
            <button
              className={styles.backButton}
              onClick={() => setStep('initial')}
            >
              &larr; Back
            </button>

            <div className={styles.logoCircle}></div>
            <h1 className={styles.heading}>Create an account</h1>
            <p className={styles.subheading}>Enter your details below</p>

            <form className={styles.form} action={formAction}>

              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input name="fname" type="text" className={styles.input} required />
              </div>
              {state?.errors?.fname && (
                <p className={styles.errorMessage}>{state.errors.fname}</p>
              )}

              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input name="lname" type="text" className={styles.input} required />
              </div>
              {state?.errors?.lname && (
                <p className={styles.errorMessage}>{state.errors.lname}</p>
              )}

              <div className={styles.inputGroup}>
                <label>Email address</label>
                <input name="email" type="email" className={styles.input} required />
              </div>
              {state?.errors?.email && (
                <p className={styles.errorMessage}>{state.errors.email}</p>
              )}

              <div className={styles.inputGroup}>
                <label>Password</label>
                <input name="password" type="password" className={styles.input} required />
              </div>
              {state?.errors?.password && (
                <p className={styles.errorMessage}>{state.errors.password}</p>
              )}

              <button disabled={pending} type="submit" className={styles.primaryButton}>
                {pending ? 'Creating account…' : 'Create account →'}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
