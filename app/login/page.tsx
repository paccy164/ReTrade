
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
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#080B12] text-white flex items-center justify-center px-5 py-12">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Brand */}
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
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-blue-300">
                Secure Account Access
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Sign in to manage your trading rewards.
            </p>
          </div>
        </div>

        {/* Login panel */}
        <section className="rounded-3xl border border-white/[0.09] bg-[#111722]/95 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

          <div className="mb-7">
            <h2 className="text-xl font-semibold">
              Sign in to ReTrade
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter your registered account details.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
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
                  className="h-14 w-full rounded-xl border border-[#293548] bg-[#090E17] pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
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
                  className="h-14 w-full rounded-xl border border-[#293548] bg-[#090E17] pl-12 pr-20 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold tracking-wide text-blue-400 hover:text-blue-300"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:brightness-110 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-xs text-slate-500">
              NEW TO RETRADE?
            </span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          {/* Signup */}
          <Link
            href="/signup"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-[#34445c] bg-white/[0.02] text-sm font-semibold text-white transition hover:border-blue-500 hover:bg-blue-500/10"
          >
            Create an account
          </Link>

        </section>

        {/* Footer */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 transition hover:text-blue-400"
          >
            ← Back to homepage
          </Link>

          <p className="mt-4 text-[11px] text-slate-600">
            © 2026 ReTrade. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}
