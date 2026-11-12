'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Shyiramo logic yawe yo kwinjira hano
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="xm-wrapper">
      <style>{`
        .xm-wrapper {
          min-height: 100vh;
          background-color: #f4f6f9;
          color: #1f2937;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .xm-wrapper * {
          box-sizing: border-box;
        }
        /* Top Dark Navbar (XM Style) */
        .xm-header {
          background-color: #0b0f1a;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }
        .xm-logo {
          color: #ffffff;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-decoration: none;
        }
        .xm-logo span {
          color: #1553bd;
        }
        .xm-back-link {
          color: #d1d5db;
          font-size: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .xm-back-link:hover {
          color: #ffffff;
        }
        /* Main Center Container */
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
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          padding: 36px 32px;
        }
        .xm-badge {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #1553bd;
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
          margin: 0 0 28px 0;
        }
        /* Form Inputs */
        .xm-form-group {
          margin-bottom: 20px;
        }
        .xm-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .xm-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #374151;
          display: block;
          margin-bottom: 6px;
        }
        .xm-label-row .xm-label {
          margin-bottom: 0;
        }
        .xm-forgot {
          font-size: 12px;
          font-weight: 600;
          color: #1553bd;
          text-decoration: none;
        }
        .xm-forgot:hover {
          text-decoration: underline;
        }
        .xm-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .xm-icon {
          position: absolute;
          left: 14px;
          color: #9ca3af;
          display: flex;
          pointer-events: none;
        }
        .xm-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          outline: none;
          transition: all 0.2s;
        }
        .xm-input:focus {
          background-color: #ffffff;
          border-color: #1553bd;
          box-shadow: 0 0 0 3px rgba(21, 83, 189, 0.15);
        }
        .xm-input-pass {
          padding-right: 65px;
        }
        .xm-show-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          font-size: 11px;
          font-weight: 700;
          color: #6b7280;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 6px;
        }
        .xm-show-btn:hover {
          color: #111827;
        }
        /* Submit Button */
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          box-shadow: 0 4px 12px rgba(21, 83, 189, 0.25);
          transition: background-color 0.2s, transform 0.1s;
        }
        .xm-submit-btn:hover {
          background-color: #104299;
        }
        .xm-submit-btn:active {
          transform: scale(0.99);
        }
        /* Card Footer */
        .xm-card-footer {
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid #f3f4f6;
          text-align: center;
        }
        .xm-new-text {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 6px 0;
        }
        .xm-create-link {
          font-size: 14px;
          font-weight: 700;
          color: #1553bd;
          text-decoration: none;
        }
        .xm-create-link:hover {
          text-decoration: underline;
        }
        /* Bottom Page Footer */
        .xm-footer {
          background-color: #ffffff;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          padding: 16px;
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>

      {/* Top Header Bar */}
      <header className="xm-header">
        <Link href="/" className="xm-logo">
          RE<span>TRADE</span>
        </Link>
        <Link href="/" className="xm-back-link">
          <span>←</span> Back to homepage
        </Link>
      </header>

      {/* Main Content */}
      <main className="xm-main">
        <div className="xm-card">
          <span className="xm-badge">Secure Account Access</span>
          <h1 className="xm-title">Sign in to ReTrade</h1>
          <p className="xm-subtitle">Sign in to manage your trading rewards.</p>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="xm-form-group">
              <label className="xm-label" htmlFor="email">
                Email address
              </label>
              <div className="xm-input-wrap">
                <span className="xm-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  className="xm-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="xm-form-group">
              <div className="xm-label-row">
                <label className="xm-label" htmlFor="password">
                  Password
                </label>
                <Link href="/forgot-password" className="xm-forgot">
                  Forgot password?
                </Link>
              </div>
              <div className="xm-input-wrap">
                <span className="xm-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="xm-input xm-input-pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="xm-show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="xm-submit-btn">
              <span>Sign In</span>
              <span>→</span>
            </button>
          </form>

          {/* Register Footer */}
          <div className="xm-card-footer">
            <p className="xm-new-text">New to ReTrade?</p>
            <Link href="/register" className="xm-create-link">
              Create an account
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="xm-footer">
        © 2026 ReTrade. All rights reserved.
      </footer>
    </div>
  );
}
