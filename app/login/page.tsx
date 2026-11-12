
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
    <main className="min-h-screen w-full bg-[#080b11] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-9">
          <Link href="/">
            <img
              src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png"
              alt="ReTrade"
              className="h-14 mx-auto mb-6 object-contain"
            />
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Welcome back
          </h1>

          <p className="text-gray-400 mt-2">
            Sign in to your ReTrade account
          </p>
        </div>

        <div className="bg-[#101722] border border-[#263244] rounded-2xl p-6 sm:p-8">

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email address
              </label>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-xl bg-[#080b11] border border-[#303b4d] text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 pr-20 rounded-xl bg-[#080b11] border border-[#303b4d] text-white outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-7">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 font-semibold hover:text-blue-300"
            >
              Create account
            </Link>
          </p>

        </div>

        <p className="text-center text-gray-600 text-xs mt-7">
          © 2026 ReTrade. All rights reserved.
        </p>

      </div>
    </main>
  );
}
