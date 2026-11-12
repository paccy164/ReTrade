
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again."
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
          background: radial-gradient(
            ellipse at 50% 0%,
            #17345d 0%,
            #090d15 48%,
            #07090d 100%
          );
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

        .auth-logo {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-logo img {
          width: 190px;
          height: 75px;
          object-fit: contain;
        }

        .auth-card h1 {
          font-size: 28px;
          text-align: center;
          margin-bottom: 10px;
        }

        .subtitle {
          text-align: center;
          color: #94a3b8;
          font-size: 13px;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .field { margin-bottom: 18px; }

        .field label {
          display: block;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .field input {
          width: 100%;
          padding: 14px 13px;
          border-radius: 9px;
          border: 1px solid #ffffff20;
          background: #080e18;
          color: white;
          outline: none;
          font-size: 14px;
        }

        .field input:focus {
          border-color: #247bff;
        }

        .submit {
          width: 100%;
          padding: 15px;
          border: 0;
          border-radius: 9px;
          background: #247bff;
          color: white;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 8px;
        }

        .submit:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .error {
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 1.6;
          margin-bottom: 16px;
          background: #451e25;
          color: #ff9ba8;
        }

        .auth-bottom {
          text-align: center;
          color: #94a3b8;
          font-size: 13px;
          margin-top: 24px;
        }

        .auth-bottom a,
        .back {
          color: #65a5ff;
          font-weight: 700;
          text-decoration: none;
        }

        .back {
          display: block;
          text-align: center;
          color: #94a3b8;
          font-size: 12px;
          margin-top: 22px;
          font-weight: 400;
        }

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

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Log in to your Retrade account and manage your trading cashback.
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <div className="auth-bottom">
          Don't have an account?{" "}
          <Link href="/signup">Create account</Link>
        </div>

        <Link href="/" className="back">
          ← Back to Retrade
        </Link>
      </div>
    </main>
  );
}
