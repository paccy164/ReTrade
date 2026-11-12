
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070a10] flex items-center justify-center px-5 py-12">

      {/* Background effects */}
      <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Logo */}
        <div className="text-center mb-9">
          <Link href="/" className="inline-flex items-center justify-center">
            <img
              src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png"
              alt="ReTrade"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="mt-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[2px] text-blue-300 uppercase">
                Member Access
              </span>
            </div>

            <h1 className="text-[32px] font-bold tracking-tight text-white">
              Welcome back
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              Sign in to access your trading rewards.
            </p>
          </div>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/[0.09] bg-[#111722]/90 backdrop-blur-xl p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

          <div className="mb-7">
            <h2 className="text-xl font-semibold text-white">
              Sign in
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your account details below.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-slate-300 mb-2">
                Email address
              </label>

              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-[54px] pl-12 pr-4 rounded-xl bg-[#080d16] border border-[#293548] text-white text-sm placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] font-medium text-slate-300">
                  Password
                </label>
              </div>

              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[54px] pl-12 pr-16 rounded-xl bg-[#080d16] border border-[#293548] text-white text-sm placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Sign in */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-[54px] overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition hover:shadow-blue-500/30 hover:brightness-110 disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Signing in..." : "Sign In"}
                {!loading && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </span>
            </button>

          </form>

          {/* Signup */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#111722] px-4 text-xs text-slate-500">
                New to ReTrade?
              </span>
            </div>
          </div>

          <Link
            href="/signup"
            className="flex h-[52px] items-center justify-center rounded-xl border border-[#34445c] bg-white/[0.02] text-sm font-semibold text-white transition hover:border-blue-500 hover:bg-blue-500/10"
          >
            Create an account
          </Link>

        </div>

        {/* Footer */}
        <div className="text-center mt-7">
          <p className="text-xs text-slate-600">
            Secure access · ReTrade Account Portal
          </p>
          <Link href="/" className="inline-block mt-3 text-xs text-slate-500 hover:text-blue-400">
            ← Back to homepage
          </Link>
        </div>

      </div>
    </main>
  );
}
