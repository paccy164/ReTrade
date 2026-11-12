'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Shyiramo logic yawe yo kwinjira (Authentication) hano
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans flex flex-col justify-between">
      
      {/* Top Header Bar (XM Dark Style) */}
      <header className="w-full bg-[#0B0F1A] py-4 px-6 flex justify-between items-center shadow-md">
        <Link href="/" className="flex items-center space-x-1">
          <span className="text-white text-2xl font-black tracking-wider">
            RE<span className="text-[#1553BD]">TRADE</span>
          </span>
        </Link>
        <Link 
          href="/" 
          className="text-gray-300 text-sm hover:text-white transition flex items-center gap-1.5"
        >
          <span>←</span> Back to homepage
        </Link>
      </header>

      {/* Main Content Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          
          {/* Title Section */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1553BD]">
              Secure Account Access
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              Sign in to ReTrade
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to manage your trading rewards.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label 
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5" 
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1553BD] focus:border-transparent focus:bg-white transition"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label 
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700" 
                  htmlFor="password"
                >
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-[#1553BD] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-16 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1553BD] focus:border-transparent focus:bg-white transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wide"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1553BD] hover:bg-[#104299] text-white font-semibold py-3 px-4 rounded-lg text-sm transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In</span>
              <span>→</span>
            </button>
          </form>

          {/* Register Link Footer inside Card */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              NEW TO RETRADE?
            </p>
            <Link 
              href="/register" 
              className="text-sm font-bold text-[#1553BD] hover:underline mt-1.5 inline-block"
            >
              Create an account
            </Link>
          </div>

        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="w-full text-center py-4 text-xs text-gray-500 border-t border-gray-200 bg-white">
        © 2026 ReTrade. All rights reserved.
      </footer>
    </div>
  );
}
