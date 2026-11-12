
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      setErrorMsg('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.session) {
        window.location.href = '/dashboard';
        return;
      }

      setSuccessMsg(
        'Registration successful. Please check your email to confirm your account before signing in.'
      );

      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      console.error('Signup error:', err);
      setErrorMsg('Habaye ikibazo mu kwiyandikisha. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xm-wrapper">
      <style>{`
        .xm-wrapper {
          min-height: 100vh;
          background-color: #f4f6f9;
          color: #1f2937;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .xm-wrapper * { box-sizing: border-box; }
        .xm-header {
          background-color: #0b0f1a;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .xm-logo {
          color: #ffffff;
          font-size: 24px;
          font-weight: 900;
          text-decoration: none;
        }
        .xm-logo span { color: #1553bd; }
        .xm-back-link {
          color: #d1d5db;
          font-size: 14px;
          text-decoration: none;
        }
        .xm-main {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
        }
        .xm-card {
          background-color: #ffffff;
          width: 100%;
          max-width: 430px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 36px 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .xm-badge {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #1553bd;
          display: block;
          margin-bottom: 6px;
        }
        .xm-title {
          font-size: 26px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 6px 0;
        }
        .xm-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 24px 0;
        }
        .xm-error {
          background-color: #fee2e2;
          color: #991b1b;
          padding: 10px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 16px;
          text-align: center;
        }
        .xm-success {
          background-color: #dcfce7;
          color: #166534;
          padding: 12px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 16px;
          text-align: center;
          line-height: 1.5;
        }
        .xm-form-group { margin-bottom: 20px; }
        .xm-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #374151;
          display: block;
          margin-bottom: 6px;
        }
        .xm-input {
          width: 100%;
          padding: 12px 14px;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        .xm-input:focus {
          border-color: #1553bd;
          background-color: #fff;
        }
        .xm-submit-btn {
          width: 100%;
          background-color: #1553bd;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }
        .xm-submit-btn:hover { background-color: #104299; }
        .xm-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .xm-card-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #f3f4f6;
          text-align: center;
        }
        .xm-create-link {
          font-size: 14px;
          font-weight: 700;
          color: #1553bd;
          text-decoration: none;
        }
        .xm-footer {
          background-color: #ffffff;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          padding: 16px;
          font-size: 12px;
          color: #6b7280;
        }
        @media (max-width: 480px) {
          .xm-header {
            padding: 16px;
          }
          .xm-card {
            padding: 30px 22px;
          }
          .xm-title {
            font-size: 24px;
          }
          .xm-back-link {
            font-size: 12px;
          }
        }
      `}</style>

      <header className="xm-header">
        <Link href="/" className="xm-logo">
          RE<span>TRADE</span>
        </Link>
        <Link href="/" className="xm-back-link">
          ← Back to homepage
        </Link>
      </header>

      <main className="xm-main">
        <div className="xm-card">
          <span className="xm-badge">Secure Account Registration</span>

          <h1 className="xm-title">Create your ReTrade account</h1>

          <p className="xm-subtitle">
            Join ReTrade and start managing your trading rewards.
          </p>

          {errorMsg && (
            <div className="xm-error" role="alert">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="xm-success" role="status">
              {successMsg}
              <div style={{ marginTop: '10px' }}>
                <Link href="/login" className="xm-create-link">
                  Go to Sign In →
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="xm-form-group">
              <label className="xm-label" htmlFor="signup-email">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                className="xm-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            <div className="xm-form-group">
              <label className="xm-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="xm-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={loading}
              />
            </div>

            <div className="xm-form-group">
              <label className="xm-label" htmlFor="confirm-password">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                className="xm-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={loading}
              />
            </div>

            <div style={{ marginTop: '-10px', marginBottom: '16px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '12px',
                  color: '#6b7280',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  disabled={loading}
                />
                Show passwords
              </label>
            </div>

            <button
              type="submit"
              className="xm-submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <div className="xm-card-footer">
            <p
              style={{
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '6px',
              }}
            >
              ALREADY HAVE AN ACCOUNT?
            </p>
            <Link href="/login" className="xm-create-link">
              Sign in to your account
            </Link>
          </div>
        </div>
      </main>

      <footer className="xm-footer">
        © 2026 ReTrade. All rights reserved.
      </footer>
    </div>
  );
}
