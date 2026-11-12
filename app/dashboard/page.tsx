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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Trading Accounts', href: '/dashboard/accounts', icon: '🔗' },
    { name: 'Cashback', href: '/dashboard/cashback', icon: '💰' },
    { name: 'Transactions', href: '/dashboard/transactions', icon: '📄' },
    { name: 'Withdrawals', href: '/dashboard/withdrawals', icon: '💸' },
    { name: 'Referrals', href: '/dashboard/referrals', icon: '👥' },
    { name: 'Profile & Settings', href: '/dashboard/settings', icon: '⚙️' },
    { name: 'Help & Support', href: '/dashboard/support', icon: '🎧' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080B12', color: '#ffffff', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 35 }}
          />
        )}

        {/* Sidebar */}
        <aside style={{
          width: '260px',
          backgroundColor: '#111722',
          borderRight: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 40,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }} className="lg:translate-x-0">
          
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
                  onClick={() => setMobileMenuOpen(false)}
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
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, marginLeft: '0', display: 'flex', flexDirection: 'column', minWidth: 0 }} className="lg:ml-[260px]">
          
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
                className="lg:hidden"
              >
                ☰
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                Trader Workspace
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {userEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#080B12', padding: '6px 12px', borderRadius: '20px', border: '1px solid #1e293b', fontSize: '13px', color: '#cbd5e1' }}>
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

          <main style={{ padding: '32px', flex: '1' }} className="p-4 md:p-8">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}
