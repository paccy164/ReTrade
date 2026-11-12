
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

type Tab = "overview" | "referrals" | "accounts" | "transactions";

export default function DashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      setUserEmail(data.user.email ?? "");
      setUserId(data.user.id);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  async function copyReferralLink() {
    const link = `${window.location.origin}/signup?ref=${userId}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Unable to copy the referral link. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader" />
        <p>Loading your Retrade dashboard...</p>
        <style>{`
          .loading-screen {
            min-height: 100vh;
            background: #080b11;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 18px;
            font-family: Arial, sans-serif;
          }
          .loader {
            width: 38px;
            height: 38px;
            border: 3px solid #26364d;
            border-top-color: #247bff;
            border-radius: 50%;
            animation: spin .8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </main>
    );
  }

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/signup?ref=${userId}`
      : "";

  return (
    <main className="dashboard">
      <style>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: #080b11;
        }

        .dashboard {
          min-height: 100vh;
          background: #080b11;
          color: #f7f9fc;
          font-family: Arial, sans-serif;
        }

        .topbar {
          height: 76px;
          padding: 0 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ffffff12;
          background: #0c111a;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .brand span { color: #247bff; }

        .top-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .user-email {
          color: #94a3b8;
          font-size: 12px;
        }

        .logout {
          border: 1px solid #ffffff20;
          color: #cbd5e1;
          background: transparent;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
        }

        .layout {
          display: grid;
          grid-template-columns: 235px minmax(0, 1fr);
          min-height: calc(100vh - 76px);
        }

        .sidebar {
          border-right: 1px solid #ffffff12;
          padding: 28px 16px;
          background: #0c111a;
        }

        .nav-label {
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 0 12px;
          margin-bottom: 14px;
        }

        .nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 12px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #94a3b8;
          text-align: left;
          font-size: 13px;
          cursor: pointer;
          margin-bottom: 5px;
        }

        .nav-button.active {
          background: #162d4d;
          color: #69a8ff;
          font-weight: 700;
        }

        .nav-icon {
          width: 20px;
          text-align: center;
          font-size: 16px;
        }

        .main {
          padding: 36px;
          max-width: 1450px;
          width: 100%;
          margin: auto;
        }

        .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 30px;
        }

        .page-heading h1 {
          font-size: 27px;
          margin: 0 0 9px;
          letter-spacing: -1px;
        }

        .page-heading p {
          color: #94a3b8;
          font-size: 13px;
          margin: 0;
        }

        .date-label {
          color: #94a3b8;
          font-size: 11px;
          padding: 10px 13px;
          border: 1px solid #ffffff18;
          border-radius: 8px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 25px;
        }

        .stat-card {
          padding: 22px;
          border: 1px solid #ffffff13;
          background: #111925;
          border-radius: 13px;
          min-width: 0;
        }

        .stat-top {
          color: #94a3b8;
          font-size: 12px;
          margin-bottom: 17px;
        }

        .stat-value {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }

        .stat-note {
          color: #64748b;
          font-size: 11px;
        }

        .blue { color: #58a0ff; }
        .green { color: #43d69a; }

        .content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(260px, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .panel {
          border: 1px solid #ffffff13;
          background: #111925;
          border-radius: 13px;
          padding: 24px;
          min-width: 0;
        }

        .panel h2 {
          font-size: 16px;
          margin: 0 0 8px;
        }

        .panel-description {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0 0 22px;
        }

        .wallet-value {
          font-size: 35px;
          font-weight: 800;
          letter-spacing: -1.5px;
          margin: 15px 0 8px;
        }

        .wallet-caption {
          font-size: 11px;
          color: #94a3b8;
        }

        .blue-line {
          height: 4px;
          width: 100%;
          border-radius: 10px;
          background: linear-gradient(90deg, #247bff, #64b5ff);
          margin-top: 25px;
        }

        .referral-panel {
          background: linear-gradient(145deg, #142b49, #111925 75%);
          border-color: #247bff40;
        }

        .referral-rate {
          font-size: 40px;
          font-weight: 900;
          color: #68a9ff;
          letter-spacing: -2px;
          margin: 12px 0;
        }

        .referral-rule {
          color: #cbd5e1;
          font-size: 12px;
          line-height: 1.7;
        }

        .referral-link {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }

        .referral-link input {
          min-width: 0;
          flex: 1;
          background: #080e18;
          border: 1px solid #ffffff20;
          color: #94a3b8;
          padding: 12px;
          border-radius: 8px;
          font-size: 11px;
        }

        .copy-button {
          border: 0;
          border-radius: 8px;
          padding: 12px 15px;
          background: #247bff;
          color: white;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
        }

        .section-title {
          font-size: 16px;
          margin: 0 0 18px;
        }

        .empty-state {
          padding: 35px 15px;
          text-align: center;
          color: #64748b;
          font-size: 12px;
          line-height: 1.7;
          border: 1px dashed #ffffff20;
          border-radius: 10px;
        }

        .empty-icon {
          font-size: 28px;
          margin-bottom: 12px;
        }

        .notice {
          color: #94a3b8;
          background: #0b1523;
          border: 1px solid #247bff30;
          padding: 13px 15px;
          border-radius: 9px;
          font-size: 11px;
          line-height: 1.7;
          margin-top: 18px;
        }

        .error-message {
          color: #ff9ba8;
          font-size: 12px;
          margin-top: 12px;
        }

        .table-wrap { overflow-x: auto; }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 450px;
        }

        .table th {
          text-align: left;
          color: #64748b;
          font-size: 10px;
          font-weight: 700;
          padding: 14px 10px;
          border-bottom: 1px solid #ffffff13;
        }

        .table td {
          color: #94a3b8;
          font-size: 12px;
          padding: 17px 10px;
          border-bottom: 1px solid #ffffff0c;
        }

        .footer-note {
          text-align: center;
          color: #475569;
          font-size: 10px;
          padding: 25px 0 5px;
        }

        @media(max-width: 1000px) {
          .stats { grid-template-columns: repeat(2, 1fr); }
          .content-grid { grid-template-columns: 1fr; }
        }

        @media(max-width: 700px) {
          .topbar { padding: 0 16px; height: 65px; }
          .brand { font-size: 19px; }
          .user-email { display: none; }

          .layout {
            grid-template-columns: 1fr;
            min-height: calc(100vh - 65px);
          }

          .sidebar {
            display: flex;
            overflow-x: auto;
            gap: 5px;
            padding: 12px 10px;
            border-right: 0;
            border-bottom: 1px solid #ffffff12;
          }

          .nav-label { display: none; }

          .nav-button {
            width: auto;
            flex-shrink: 0;
            padding: 11px 13px;
            margin: 0;
            font-size: 11px;
          }

          .main { padding: 25px 15px; }
          .page-heading h1 { font-size: 23px; }
          .date-label { display: none; }
          .stat-card { padding: 17px; }
          .stat-value { font-size: 23px; }
          .panel { padding: 19px; }
        }

        @media(max-width: 380px) {
          .stats { gap: 9px; }
          .stat-card { padding: 13px; }
          .stat-value { font-size: 20px; }
          .nav-button { padding: 10px; }
        }
      `}</style>

      <header className="topbar">
        <div className="brand">
          re<span>trade</span>
        </div>

        <div className="top-right">
          <span className="user-email">{userEmail}</span>
          <button className="logout" onClick={handleLogout}>
            Log out ↗
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="nav-label">MENU</div>

          <button
            className={`nav-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="nav-icon">▦</span> Overview
          </button>

          <button
            className={`nav-button ${activeTab === "referrals" ? "active" : ""}`}
            onClick={() => setActiveTab("referrals")}
          >
            <span className="nav-icon">♧</span> Referrals
          </button>

          <button
            className={`nav-button ${activeTab === "accounts" ? "active" : ""}`}
            onClick={() => setActiveTab("accounts")}
          >
            <span className="nav-icon">◎</span> Trading Accounts
          </button>

          <button
            className={`nav-button ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            <span className="nav-icon">⇄</span> Transactions
          </button>
        </aside>

        <section className="main">
          <div className="page-heading">
            <div>
              <h1>
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "referrals" && "Referral Program"}
                {activeTab === "accounts" && "Trading Accounts"}
                {activeTab === "transactions" && "Transactions"}
              </h1>
              <p>Welcome back. Here's your Retrade account overview.</p>
            </div>

            <div className="date-label">RETRADE ACCOUNT</div>
          </div>

          {activeTab === "overview" && (
            <>
              <div className="stats">
                <div className="stat-card">
                  <div className="stat-top">Available Balance</div>
                  <div className="stat-value">$0.00</div>
                  <div className="stat-note">Ready for withdrawal</div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">Total Cashback</div>
                  <div className="stat-value green">$0.00</div>
                  <div className="stat-note">Verified cashback</div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">Referral Earnings</div>
                  <div className="stat-value blue">$0.00</div>
                  <div className="stat-note">Verified referral commission</div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">Trading Accounts</div>
                  <div className="stat-value">0</div>
                  <div className="stat-note">Connected accounts</div>
                </div>
              </div>

              <div className="content-grid">
                <div className="panel">
                  <h2>My Wallet</h2>
                  <p className="panel-description">
                    Your combined Retrade wallet balance.
                  </p>
                  <div className="wallet-value">$0.00</div>
                  <div className="wallet-caption">
                    Available balance · USD
                  </div>
                  <div className="blue-line" />
                </div>

                <div className="panel referral-panel">
                  <h2>Refer & Earn</h2>
                  <div className="referral-rate">10%</div>
                  <p className="referral-rule">
                    Earn 10% of the verified company profit generated by
                    your referred clients.
                  </p>
                  <p className="referral-rule">
                    Maximum lifetime referral earnings: <strong>$1,000</strong>.
                  </p>
                  <button
                    className="copy-button"
                    onClick={copyReferralLink}
                  >
                    {copied ? "Copied ✓" : "Copy referral link"}
                  </button>
                </div>
              </div>

              <div className="panel">
                <h2 className="section-title">Recent Activity</h2>
                <div className="empty-state">
                  <div className="empty-icon">⇄</div>
                  No transactions yet.
                  <br />
                  Your verified cashback and referral activity will appear here.
                </div>
              </div>
            </>
          )}

          {activeTab === "referrals" && (
            <>
              <div className="stats">
                <div className="stat-card">
                  <div className="stat-top">Referral Rate</div>
                  <div className="stat-value blue">10%</div>
                  <div className="stat-note">Of verified company profit</div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">Total Referral Earnings</div>
                  <div className="stat-value green">$0.00</div>
                  <div className="stat-note">Maximum $1,000</div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">Total Referrals</div>
                  <div className="stat-value">0</div>
                  <div className="stat-note">People invited by you</div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">Company Profit Generated</div>
                  <div className="stat-value">$0.00</div>
                  <div className="stat-note">From your referrals</div>
                </div>
              </div>

              <div className="panel">
                <h2>Invite Friends & Earn</h2>
                <p className="panel-description">
                  Share your personal referral link. When your invited
                  clients generate verified company profit, you earn 10%.
                </p>

                <div className="referral-link">
                  <input
                    readOnly
                    value={referralLink}
                    aria-label="Your referral link"
                  />
                  <button
                    className="copy-button"
                    onClick={copyReferralLink}
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="notice">
                  Example: If a referred client generates $33 in verified
                  company profit, your referral commission is $3.30.
                  Referral earnings stop when your lifetime total reaches
                  $1,000.
                </div>
              </div>

              <div className="panel" style={{ marginTop: 20 }}>
                <h2 className="section-title">Referral History</h2>
                <div className="empty-state">
                  <div className="empty-icon">♧</div>
                  No referrals yet.
                  <br />
                  Your invited clients and commissions will appear here.
                </div>
              </div>
            </>
          )}

          {activeTab === "accounts" && (
            <div className="panel">
              <h2 className="section-title">Connected Trading Accounts</h2>
              <div className="empty-state">
                <div className="empty-icon">◎</div>
                No trading accounts connected yet.
                <br />
                Your eligible broker accounts will appear here.
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="panel">
              <h2 className="section-title">Transaction History</h2>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>DESCRIPTION</th>
                      <th>TYPE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        No transactions available yet.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="footer-note">
            © Retrade. All rights reserved.
          </div>
        </section>
      </div>
    </main>
  );
}
