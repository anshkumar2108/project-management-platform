'use client';

import React, { useActionState, useState } from 'react';
import styles from './Register.module.css';
import Image from 'next/image';
import { handleSignup } from '../actions/auth';
export default function Register() {
  // Track which view to show: 'initial' or 'email'
  const [step, setStep] = useState('initial');
  const [state, formAction, pending] = useActionState(handleSignup, undefined);

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.modal}>

        {/* Close Button (Always visible on the top right) */}
        <button className={styles.closeButton} aria-label="Close">
          &times;
        </button>

        {/* --- INITIAL VIEW: Social Buttons --- */}
        {step === 'initial' && (
          <>
            <div className={styles.logoCircle}></div>
            <h1 className={styles.heading}>
              Unlimited free access<br />to our resources
            </h1>
            <p className={styles.subheading}>Sign up to see more</p>

            {/* Clicking this changes the state to 'email' */}
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

        {/* --- EMAIL FORM VIEW --- */}
        {step === 'email' && (
          <>
            {/* Go Back Button (Top Left) */}
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
              {state?.errors?.fname && <p>{state?.errors?.fname}</p>}
              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input name="lname" type="text" className={styles.input} required />
              </div>
              {state?.errors?.lname && <p>{state?.errors?.lname}</p>}
              <div className={styles.inputGroup}>
                <label>Email address</label>
                <input name="email" type="email" className={styles.input} required />
              </div>
              {state?.errors?.email && <p>{state?.errors?.email}</p>}

              <div className={styles.inputGroup}>
                <label>Password</label>
                <input name="password" type="password" className={styles.input} required />
              </div>
              {state?.errors?.password && <p>{state?.errors?.password}</p>}

              {/* Reusing your primary button style for the submit button */}
              <button disabled={pending} type="submit" className={styles.primaryButton}>
                Register
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}