'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
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
    <div className="retrade-layout">
      <style>{`
        .retrade-layout {
          min-height: 100vh;
          background-color: #080B12;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          flex-direction: column;
        }
        .retrade-body {
          display: flex;
          flex: 1;
          position: relative;
        }
        .retrade-sidebar {
          width: 260px;
          background-color: #111722;
          border-right: 1px solid #1e293b;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 40;
          transition: transform 0.3s ease;
        }
        .sidebar-brand {
          padding: 20px 24px;
          border-bottom: 1px solid #1e293b;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sidebar-nav {
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          overflow-y: auto;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #98a5b8;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-link:hover {
          background-color: #1a2332;
          color: #ffffff;
        }
        .nav-link.active {
          background-color: #2878f0;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(40, 120, 240, 0.3);
        }
        .retrade-main-content {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .retrade-header {
          height: 70px;
          background-color: #111722;
          border-bottom: 1px solid #1e293b;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .user-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #080B12;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #1e293b;
          font-size: 13px;
          color: #cbd5e1;
        }
        .logout-btn {
          background: #1e293b;
          color: #f87171;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: #7f1d1d;
          color: #ffffff;
        }
        .content-container {
          padding: 32px;
          flex: 1;
        }
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 35;
        }

        @media (max-width: 1024px) {
          .retrade-sidebar {
            transform: translateX(-100%);
          }
          .retrade-sidebar.open {
            transform: translateX(0);
          }
          .retrade-main-content {
            margin-left: 0;
          }
          .mobile-menu-btn {
            display: block;
          }
          .mobile-overlay.open {
            display: block;
          }
          .retrade-header {
            padding: 0 16px;
          }
          .content-container {
            padding: 16px;
          }
        }
      `}</style>

      <div className="retrade-body">
        <div 
          className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <aside className={`retrade-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-brand">
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image 
                src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png" 
                alt="ReTrade Logo" 
                width={130} 
                height={35} 
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
                priority
              />
            </Link>
            <span style={{ fontSize: '10px', background: '#1e293b', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8', fontWeight: 700 }}>PRO</span>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="retrade-main-content">
          <header className="retrade-header">
            <div className="header-left">
              <button 
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                Trader Workspace
              </h2>
            </div>
            <div className="header-right">
              {userEmail && (
                <div className="user-pill">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                  <span className="hidden sm:inline">{userEmail}</span>
                </div>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </header>

          <main className="content-container">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
