
"use client";

import React, { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setSuccess(
        "Your account has been created. Please check your email to confirm your account before signing in."
      );

      setPassword("");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#080B12",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#111722",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
          boxSizing: "border-box",
        }}
      >
        {/* Logo & Brand */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "16px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#ffffff",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  color: "#000000",
                  fontWeight: 900,
                  fontSize: "18px",
                  lineHeight: 1,
                }}
              >
                R
              </span>

              <span
                style={{
                  width: "7px",
                  height: "7px",
                  background: "#ef4444",
                  borderRadius: "50%",
                  position: "absolute",
                  bottom: "4px",
                  left: "4px",
                }}
              />
            </div>

            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "1px",
                color: "#ffffff",
              }}
            >
              Re<span style={{ color: "#2878f0" }}>Trade</span>
            </span>
          </Link>

          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              margin: "0 0 8px",
              color: "#ffffff",
            }}
          >
            Create your account
          </h1>

          <p
            style={{
              color: "#98a5b8",
              fontSize: "14px",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Start tracking your broker cashback & rewards
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            style={{
              background: "#7f1d1d",
              border: "1px solid #ef4444",
              color: "#fca5a5",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "20px",
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div
            role="status"
            style={{
              background: "#064e3b",
              border: "1px solid #10b981",
              color: "#a7f3d0",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "20px",
              lineHeight: 1.6,
            }}
          >
            {success}
          </div>
        )}

        {/* Signup Form */}
        <form
          onSubmit={handleSignUp}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="signup-email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#cbd5e1",
                marginBottom: "7px",
              }}
            >
              Email Address
            </label>

            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@example.com"
              disabled={loading}
              style={{
                width: "100%",
                background: "#080B12",
                border: "1px solid #334155",
                borderRadius: "9px",
                padding: "14px 15px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signup-password"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#cbd5e1",
                marginBottom: "7px",
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#080B12",
                  border: "1px solid #334155",
                  borderRadius: "9px",
                  padding: "14px 65px 14px 15px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#60a5fa",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <p
              style={{
                color: "#64748b",
                fontSize: "11px",
                margin: "7px 0 0",
              }}
            >
              Use at least 8 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#1d4ed8" : "#2878f0",
              color: "#ffffff",
              border: "none",
              borderRadius: "9px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "7px",
              opacity: loading ? 0.75 : 1,
              transition: "0.2s",
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p
          style={{
            textAlign: "center",
            color: "#98a5b8",
            fontSize: "13px",
            margin: "24px 0 0",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#2878f0",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Log In
          </Link>
        </p>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "11px",
            margin: "22px 0 0",
          }}
        >
          Secure account registration · ReTrade
        </p>
      </div>
    </main>
  );
}
