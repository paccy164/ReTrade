
"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type Tab = "overview" | "accounts" | "transactions" | "referrals";

const LOGO_URL =
  "https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:good,f_jpg/cloudinary-tools-uploads/j0pisgjqiohus12nsqm3";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function checkUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          if (mounted) window.location.href = "/login";
          return;
        }

        if (mounted) {
          setEmail(data.user.email || "");
          setLoading(false);
        }
      } catch {
        if (mounted) window.location.href = "/login";
      }
    }

    checkUser();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch {
      setSigningOut(false);
    }
  }

  const navigation = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "accounts", label: "Trading Accounts", icon: "▣" },
    { id: "transactions", label: "Transactions", icon: "⇄" },
    { id: "referrals", label: "Referrals", icon: "♧" },
  ] as const;

  if (loading) {
    return (
      <div className="dashboard-loading">
        <img src={LOGO_URL} alt="ReTrade" className="loading-logo" />
        <div className="loading-spinner" />
        <p>Loading your dashboard...</p>

        <style jsx>{`
          .dashboard-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #f4f6f9;
            font-family: Arial, sans-serif;
            color: #64748b;
            gap: 18px;
          }
          .loading-logo {
            width: 170px;
            max-width: 65vw;
            height: 48px;
            object-fit: contain;
          }
          .loading-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #dbe4f2;
            border-top-color: #1553bd;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f4f6f9;
        }
        button,
        a {
          font-family: inherit;
        }
      `}</style>

      <style jsx>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: #f4f6f9;
          color: #111827;
        }

        .top-header {
          height: 68px;
          background: #0b0f1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          color: white;
        }

        .logo-image {
          height: 43px;
          width: auto;
          max-width: 175px;
          object-fit: contain;
          display: block;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .user-email {
          font-size: 13px;
          color: #cbd5e1;
        }

        .logout-button {
          border: 1px solid #374151;
          background: transparent;
          color: white;
          padding: 9px 15px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 13px;
        }

        .logout-button:hover {
          background: #1f2937;
        }

        .logout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .dashboard-layout {
          max-width: 1440px;
          margin: auto;
          padding: 30px 5%;
          display: grid;
          grid-template-columns: 230px minmax(0, 1fr);
          gap: 25px;
        }

        .sidebar {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px 13px;
          height: fit-content;
        }

        .sidebar-heading {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 5px 12px 15px;
        }

        .nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: none;
          background: transparent;
          color: #64748b;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .nav-button:hover {
          background: #f4f6f9;
          color: #1553bd;
        }

        .nav-button.active {
          background: #edf3ff;
          color: #1553bd;
          font-weight: 700;
        }

        .nav-icon {
          width: 20px;
          font-size: 19px;
          text-align: center;
        }

        .main-content {
          min-width: 0;
        }

        .welcome-section {
          margin-bottom: 25px;
        }

        .welcome-section h1 {
          margin: 0 0 8px;
          font-size: 26px;
          color: #111827;
        }

        .welcome-section p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }

        .section-title {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 15px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 11px;
          padding: 20px;
          min-width: 0;
        }

        .stat-label {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 14px;
        }

        .stat-value {
          font-size: 25px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 7px;
        }

        .stat-note {
          color: #9ca3af;
          font-size: 12px;
        }

        .content-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 11px;
          padding: 23px;
          margin-bottom: 20px;
        }

        .empty-state {
          text-align: center;
          padding: 32px 15px;
        }

        .empty-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #edf3ff;
          color: #1553bd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          margin: 0 auto 14px;
        }

        .empty-state h3 {
          font-size: 16px;
          margin: 0 0 8px;
        }

        .empty-state p {
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
          margin: 0 auto;
          max-width: 360px;
        }

        .primary-button {
          display: inline-block;
          background: #1553bd;
          color: white;
          border: none;
          border-radius: 7px;
          padding: 11px 18px;
          margin-top: 18px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        .primary-button:hover {
          background: #10449f;
        }

        .dashboard-footer {
          text-align: center;
          padding: 20px;
          color: #9ca3af;
          font-size: 12px;
        }

        @media (max-width: 800px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
            padding: 20px 4%;
            gap: 18px;
          }

          .sidebar {
            padding: 12px;
          }

          .sidebar-heading {
            display: none;
          }

          .navigation {
            display: flex;
            gap: 5px;
            overflow-x: auto;
          }

          .nav-button {
            width: auto;
            white-space: nowrap;
            margin: 0;
            padding: 11px 12px;
            font-size: 12px;
          }

          .nav-icon {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .top-header {
            height: 62px;
            padding: 0 4%;
          }

          .logo-image {
            height: 35px;
            max-width: 140px;
          }

          .header-right {
            gap: 8px;
          }

          .user-email {
            display: none;
          }

          .logout-button {
            padding: 8px 11px;
            font-size: 12px;
          }

          .welcome-section h1 {
            font-size: 23px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 11px;
          }

          .stat-card {
            padding: 17px;
          }

          .stat-value {
            font-size: 23px;
          }

          .content-card {
            padding: 16px;
          }
        }
      `}</style>

      <header className="top-header">
        <img
          src={LOGO_URL}
          alt="ReTrade Logo"
          className="logo-image"
        />

        <div className="header-right">
          <span className="user-email">{email}</span>
          <button
            className="logout-button"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-heading">MAIN MENU</div>

          <nav className="navigation">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`nav-button ${
                  activeTab === item.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <section className="welcome-section">
            <h1>
              {activeTab === "overview"
                ? "Welcome to ReTrade"
                : navigation.find((item) => item.id === activeTab)?.label}
            </h1>
            <p>
              Manage your trading accounts and track your cashback activity.
            </p>
          </section>

          {activeTab === "overview" && (
            <>
              <h2 className="section-title">Account Overview</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Total Cashback</div>
                  <div className="stat-value">$0.00</div>
                  <div className="stat-note">No cashback recorded yet</div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Available Balance</div>
                  <div className="stat-value">$0.00</div>
                  <div className="stat-note">Your wallet balance</div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Trading Accounts</div>
                  <div className="stat-value">0</div>
                  <div className="stat-note">Connected accounts</div>
                </div>
              </div>

              <div className="content-card">
                <h2 className="section-title">Get Started</h2>

                <div className="empty-state">
                  <div className="empty-icon">＋</div>
                  <h3>Welcome to your ReTrade dashboard</h3>
                  <p>
                    Your dashboard is ready. Once your trading accounts are
                    connected and eligible trading activity is verified,
                    your cashback information will appear here.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => setActiveTab("accounts")}
                  >
                    View Trading Accounts
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "accounts" && (
            <div className="content-card">
              <h2 className="section-title">Trading Accounts</h2>
              <div className="empty-state">
                <div className="empty-icon">▣</div>
                <h3>No trading accounts connected</h3>
                <p>
                  Your eligible broker trading accounts will appear here
                  after they have been connected and verified.
                </p>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="content-card">
              <h2 className="section-title">Transactions</h2>
              <div className="empty-state">
                <div className="empty-icon">⇄</div>
                <h3>No transactions yet</h3>
                <p>
                  Your cashback credits and wallet transactions will
                  appear here when they become available.
                </p>
              </div>
            </div>
          )}

          {activeTab === "referrals" && (
            <div className="content-card">
              <h2 className="section-title">Referral Program</h2>
              <div className="empty-state">
                <div className="empty-icon">♧</div>
                <h3>Your referrals will appear here</h3>
                <p>
                  Track your referred clients and eligible referral
                  rewards from this section.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="dashboard-footer">
        © 2026 ReTrade. All rights reserved.
      </footer>
    </div>
  );
}
