'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data?.user?.email) {
          setUserEmail(data.user.email);
        }
      } catch (err) {
        console.error('Auth error:', err);
      }
    }
    getUser();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
    router.refresh();
  }

  // Amabuto 5 ya mobile bottom navigation n'ya desktop sidebar
  const navItems = [
    { name: 'Home', href: '/dashboard', icon: '🏠' },
    { name: 'Brokers', href: '/dashboard/brokers', icon: '📊' },
    { name: 'Add Linking', href: '/dashboard/accounts', icon: '🔗' },
    { name: 'Referral', href: '/dashboard/referrals', icon: '👥' },
    { name: 'Payment', href: '/dashboard/withdrawals', icon: '💳' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080B12', color: '#ffffff', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', flex: 1, position: 'relative', paddingBottom: '70px' }} className="md:pb-0">
        
        {/* Sidebar Desktop */}
        <aside style={{
          width: '260px',
          backgroundColor: '#111722',
          borderRight: '1px solid #1e293b',
          display: 'none',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 40,
        }} className="md:flex">
          
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ width: '28px', height: '28px', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ color: '#000', fontWeight: '900', fontSize: '16px', lineHeight: 1 }}>R</span>
                <span style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', position: 'absolute', bottom: '4px', left: '4px' }}></span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '1px', color: '#ffffff' }}>Re<span style={{ color: '#2878f0' }}>Trade</span></span>
            </Link>
            <span style={{ fontSize: '10px', background: '#1e293b', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8', fontWeight: 700 }}>PRO</span>
          </div>

          <nav style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: isActive ? '#ffffff' : '#98a5b8',
                    backgroundColor: isActive ? '#2878f0' : 'transparent',
                    textDecoration: 'none',
                    boxShadow: isActive ? '0 4px 12px rgba(40, 120, 240, 0.3)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, marginLeft: '0', display: 'flex', flexDirection: 'column', minWidth: '0' }} className="md:ml-[260px]">
          
          <header style={{
            height: '70px',
            backgroundColor: '#111722',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="md:hidden">
                <span style={{ color: '#000', fontWeight: '900', fontSize: '14px' }}>R</span>
                <span style={{ width: '5px', height: '5px', background: '#ef4444', borderRadius: '50%', position: 'absolute', bottom: '3px', left: '3px' }}></span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                Trader Workspace
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {userEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#080B12', padding: '6px 12px', borderRadius: '20px', border: '1px solid #1e293b', fontSize: '13px', color: '#cbd5e1' }} className="hidden sm:flex">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                  <span>{userEmail}</span>
                </div>
              )}
              <button 
                onClick={handleLogout}
                style={{ background: '#1e293b', color: '#f87171', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Log Out
              </button>
            </div>
          </header>

          <main style={{ padding: '24px', flex: '1' }}>
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation Bar (Nk'uko wabisabye) */}
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65px',
          backgroundColor: '#111722',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 50,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }} className="md:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItem: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  color: isActive ? '#2878f0' : '#98a5b8',
                  fontSize: '11px',
                  fontWeight: isActive ? '700' : '500',
                  gap: '4px',
                  flex: 1,
                  textAlign: 'center',
                  padding: '6px 0',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
