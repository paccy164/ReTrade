'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      window.location.href = '/dashboard';
    } catch (err: any) {
      setErrorMsg(err.message || 'Habaye ikibazo mu kwinjira.');
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
      `}</style>

      <header className="xm-header">
        <Link href="/" className="xm-logo">RE<span>TRADE</span></Link>
        <Link href="/" className="xm-back-link">← Back to homepage</Link>
      </header>

      <main className="xm-main">
        <div className="xm-card">
          <span className="xm-badge">Secure Account Access</span>
          <h1 className="xm-title">Sign in to ReTrade</h1>
          <p className="xm-subtitle">Sign in to manage your trading rewards.</p>

          {errorMsg && <div className="xm-error">{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="xm-form-group">
              <label className="xm-label">Email address</label>
              <input
                type="email"
                className="xm-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="xm-form-group">
              <label className="xm-label">Password</label>
              <input
                type="password"
                className="xm-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="xm-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="xm-card-footer">
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>NEW TO RETRADE?</p>
            <Link href="/signup" className="xm-create-link">Create an account</Link>
          </div>
        </div>
      </main>

      <footer className="xm-footer">© 2026 ReTrade. All rights reserved.</footer>
    </div>
  );
}
