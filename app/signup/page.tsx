
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signupError) throw signupError;

      if (data.session) {
        setMessage("Your account has been created. You can now log in.");
      } else {
        setMessage("Account created! Please check your email to confirm your address before logging in.");
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <style>{`
        * { box-sizing: border-box; }
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px 18px;
          background: radial-gradient(ellipse at 50% 0%, #17345d 0%, #090d15 48%, #07090d 100%);
          color: #f7f9fc;
          font-family: Arial, sans-serif;
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 38px;
          background: #111925;
          border: 1px solid #ffffff18;
          border-radius: 20px;
          box-shadow: 0 25px 70px #0008;
        }
        .auth-logo { text-align: center; margin-bottom: 30px; }
        .auth-logo img { width: 190px; height: 75px; object-fit: contain; }
        .auth-card h1 { font-size: 28px; text-align: center; margin-bottom: 10px; }
        .subtitle { text-align: center; color: #94a3b8; font-size: 13px; margin-bottom: 28px; line-height: 1.6; }
        .field { margin-bottom: 17px; }
        .field label { display: block; color: #cbd5e1; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
        .field input {
          width: 100%; padding: 14px 13px; border-radius: 9px;
          border: 1px solid #ffffff20; background: #080e18;
          color: white; outline: none; font-size: 14px;
        }
        .field input:focus { border-color: #247bff; }
        .submit {
          width: 100%; padding: 15px; border: 0; border-radius: 9px;
          background: #247bff; color: white; font-size: 14px;
          font-weight: 800; cursor: pointer; margin-top: 8px;
        }
        .submit:disabled { opacity: .6; cursor: not-allowed; }
        .message, .error {
          padding: 12px; border-radius: 8px; font-size: 12px;
          line-height: 1.6; margin-bottom: 16px;
        }
        .message { background: #123a2b; color: #8ce5b8; }
        .error { background: #451e25; color: #ff9ba8; }
        .auth-bottom { text-align: center; color: #94a3b8; font-size: 13px; margin-top: 24px; }
        .auth-bottom a { color: #65a5ff; font-weight: 700; text-decoration: none; }
        .back { display: block; text-align: center; color: #94a3b8; font-size: 12px; margin-top: 22px; text-decoration: none; }
        @media(max-width: 480px) {
          .auth-card { padding: 28px 21px; }
        }
      `}</style>

      <div className="auth-card">
        <div className="auth-logo">
          <Link href="/">
            <img
              src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png"
              alt="Retrade"
            />
          </Link>
        </div>

        <h1>Create your account</h1>
        <p className="subtitle">
          Join Retrade and start earning cashback on eligible trading activity.
        </p>

        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="field">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button className="submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account →"}
          </button>
        </form>

        <div className="auth-bottom">
          Already have an account? <Link href="/login">Log in</Link>
        </div>

        <Link href="/" className="back">← Back to Retrade</Link>
      </div>
    </main>
  );
}
