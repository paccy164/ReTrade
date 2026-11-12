
"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type Tab =
  | "overview"
  | "brokers"
  | "accounts"
  | "transactions"
  | "referrals"
  | "payout";

const LOGO_URL =
  "https://i.postimg.cc/2yRW0mVm/Photoroom-20261112-085347.png";

const brokers = [
  {
    name: "XM",
    logo: "https://www.google.com/s2/favicons?domain=xm.com&sz=128",
  },
  {
    name: "HFM",
    logo: "https://www.google.com/s2/favicons?domain=hfm.com&sz=128",
  },
  {
    name: "JustMarkets",
    logo: "https://www.google.com/s2/favicons?domain=justmarkets.com&sz=128",
  },
{
    id: "HFM",
    name: "HFM",
    image: "https://logo.clearbit.com/hfm.com",
    description: "Register or access your HFM account using a partner link.",
    link: "https://www.hfm.com/sv/en/?refid=30486859",
    alternativeLink: "https://affs.click/XwgFJ",
    code: "CDHQR",
    availability: "New and existing clients",
  },
  {
    id: "JustMarkets",
    name: "JustMarkets",
    image: "https://logo.clearbit.com/justmarkets.com",
    description: "Partner registration link for new users.",
    link: "https://one.justmarkets.link/a/lkpf70rgxi",
    code: "lkpf70rgxi",
    availability: "New users only",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const [selectedBroker, setSelectedBroker] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountMessage, setAccountMessage] = useState("");
  const [accountError, setAccountError] = useState("");

  const [payoutAmount, setPayoutAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("TRC20");
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState("");
  const [payoutError, setPayoutError] = useState("");

  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email || "");
      setUserId(data.user.id);

      const { data: accountData } = await supabase
        .from("trading_accounts")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      if (mounted) {
        setAccounts(accountData || []);
        setLoading(false);
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  async function submitAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setAccountMessage("");
    setAccountError("");

    if (!selectedBroker || !accountId.trim()) {
      setAccountError("Please select a broker and enter your account ID.");
      return;
    }

    setAccountLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("trading_accounts")
        .insert({
          user_id: userId,
          broker: selectedBroker,
          account_id: accountId.trim(),
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      setAccounts((previous) => [data, ...previous]);
      setAccountMessage(
        "Congratulations! Your trading account has been submitted successfully. Your account is Pending Approval. Our admin will review it within 12 hours."
      );

      setAccountId("");
      setSelectedBroker("");
    } catch (error: any) {
      setAccountError(
        error.message || "Unable to submit your account. Please try again."
      );
    } finally {
      setAccountLoading(false);
    }
  }

  async function submitPayout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPayoutMessage("");
    setPayoutError("");

    const amount = Number(payoutAmount);

    if (!Number.isFinite(amount) || amount < 5) {
      setPayoutError("Minimum payout amount is $5.");
      return;
    }

    if (!walletAddress.trim()) {
      setPayoutError("Please enter your USDT wallet address.");
      return;
    }

    setPayoutLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("payout_requests")
        .insert({
          user_id: userId,
          amount,
          wallet_address: walletAddress.trim(),
          network,
          status: "pending",
        });

      if (error) throw error;

      setPayoutMessage(
        "Your payout request has been submitted successfully and is Pending Review."
      );

      setPayoutAmount("");
      setWalletAddress("");
    } catch (error: any) {
      setPayoutError(
        error.message || "Unable to submit payout request."
      );
    } finally {
      setPayoutLoading(false);
    }
  }

  const referralCode = userId
    ? userId.replace(/-/g, "").slice(0, 10).toUpperCase()
    : "";

  const referralLink =
    typeof window !== "undefined" && referralCode
      ? `${window.location.origin}/signup?ref=${referralCode}`
      : "";

  async function copyReferral() {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    } catch {
      alert("Unable to copy referral link.");
    }
  }

  const navigation: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "brokers", label: "Explore Brokers", icon: "◇" },
    { id: "accounts", label: "Trading Accounts", icon: "▣" },
    { id: "transactions", label: "Transactions", icon: "⇄" },
    { id: "referrals", label: "Referrals", icon: "♧" },
    { id: "payout", label: "Payout", icon: "$" },
  ];

  if (loading) {
    return (
      <div className="loading-page">
        <img src={LOGO_URL} alt="ReTrade" />
        <div className="spinner" />
        <p>Loading your dashboard...</p>

        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 18px;
            background: #f4f6f9;
            color: #64748b;
            font-family: Arial, sans-serif;
          }
          img {
            width: 260px;
            max-width: 80vw;
            height: 110px;
            object-fit: contain;
          }
          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #dbe4f2;
            border-top-color: #1553bd;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          font-family: Arial, sans-serif;
          background: #f4f6f9;
        }
        button,
        input,
        select {
          font: inherit;
        }
      `}</style>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          color: #111827;
          background: #f4f6f9;
        }

        .header {
          width: 100%;
          min-height: 100px;
          padding: 10px 4%;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .logo {
          display: block;
          width: 280px;
          max-width: 55%;
          height: 85px;
          object-fit: contain;
          object-position: left center;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
          min-width: 0;
        }

        .email {
          color: #64748b;
          font-size: 13px;
          overflow-wrap: anywhere;
        }

        .logout {
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          border-radius: 8px;
          padding: 10px 15px;
          cursor: pointer;
          white-space: nowrap;
        }

        .layout {
          width: 100%;
          max-width: 1450px;
          margin: auto;
          padding: 28px 4%;
          display: grid;
          grid-template-columns: 235px minmax(0, 1fr);
          gap: 25px;
        }

        .sidebar {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 18px 12px;
          height: fit-content;
          min-width: 0;
        }

        .side-heading {
          padding: 8px 12px 15px;
          color: #9ca3af;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .navigation {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          border: none;
          border-radius: 8px;
          padding: 13px 12px;
          background: transparent;
          color: #64748b;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
        }

        .nav-button.active {
          background: #edf3ff;
          color: #1553bd;
          font-weight: 700;
        }

        .nav-button:hover {
          background: #f1f5f9;
        }

        .nav-icon {
          width: 20px;
          text-align: center;
          font-size: 18px;
        }

        .main {
          min-width: 0;
          width: 100%;
        }

        .welcome {
          margin-bottom: 25px;
        }

        .welcome h1 {
          margin: 0 0 8px;
          font-size: 27px;
        }

        .welcome p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .section-title {
          font-size: 19px;
          margin: 0 0 17px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 24px;
        }

        .stat,
        .card {
          min-width: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .stat {
          padding: 20px;
        }

        .stat-label {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 13px;
        }

        .stat-value {
          font-size: 25px;
          font-weight: 800;
          margin-bottom: 7px;
          overflow-wrap: anywhere;
        }

        .stat-note {
          color: #9ca3af;
          font-size: 12px;
        }

        .card {
          padding: 23px;
          margin-bottom: 20px;
        }

        .empty {
          text-align: center;
          padding: 30px 12px;
        }

        .empty-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin: 0 auto 14px;
          background: #edf3ff;
          color: #1553bd;
          font-size: 23px;
        }

        .empty h3 {
          margin: 0 0 9px;
          font-size: 16px;
        }

        .empty p {
          max-width: 440px;
          margin: auto;
          color: #64748b;
          font-size: 13px;
          line-height: 1.7;
        }

        .primary {
          display: inline-block;
          padding: 12px 18px;
          margin-top: 17px;
          border: none;
          border-radius: 8px;
          background: #1553bd;
          color: white;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        .primary:hover {
          background: #10449f;
        }

        .broker-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .broker-card {
          min-width: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 13px;
          padding: 20px;
        }

        .broker-heading {
          display: flex;
          align-items: center;
          gap: 15px;
          min-width: 0;
          margin-bottom: 17px;
        }

        .broker-logo-box {
          width: 85px;
          height: 75px;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 8px;
          overflow: hidden;
        }

        .broker-logo-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .broker-heading h3 {
          font-size: 20px;
          margin: 0 0 7px;
          overflow-wrap: anywhere;
        }

        .broker-heading span {
          color: #64748b;
          font-size: 12px;
        }

        .broker-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .broker-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .broker-link {
          display: inline-block;
          background: #1553bd;
          color: white;
          text-decoration: none;
          padding: 11px 13px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
        }

        .broker-code {
          color: #64748b;
          font-size: 13px;
          margin: 16px 0;
          overflow-wrap: anywhere;
        }

        .outline-button {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 11px 15px;
          background: white;
          color: #111827;
          cursor: pointer;
          font-weight: 600;
        }

        .form {
          max-width: 600px;
        }

        .field {
          margin-bottom: 17px;
        }

        .field label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .field input,
        .field select {
          display: block;
          width: 100%;
          min-width: 0;
          height: 48px;
          padding: 0 13px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: white;
          color: #111827;
          outline: none;
        }

        .field input:focus,
        .field select:focus {
          border-color: #1553bd;
        }

        .notice {
          padding: 14px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }

        .error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .referral-rule {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          padding: 19px;
          border-radius: 10px;
        }

        .referral-rule span {
          display: block;
          color: #64748b;
          font-size: 13px;
          margin-bottom: 9px;
        }

        .referral-rule strong {
          color: #1553bd;
          font-size: 27px;
        }

        .referral-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .referral-link {
          display: flex;
          gap: 8px;
          min-width: 0;
          margin-top: 12px;
        }

        .referral-link input {
          width: 100%;
          min-width: 0;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #f8fafc;
          color: #334155;
          font-size: 12px;
        }

        .account-row {
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .account-row:last-child {
          border-bottom: none;
        }

        .account-row strong {
          display: block;
          margin-bottom: 6px;
        }

        .account-row small {
          color: #64748b;
          overflow-wrap: anywhere;
        }

        .status {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 20px;
          background: #fff7ed;
          color: #9a3412;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .footer {
          text-align: center;
          color: #9ca3af;
          padding: 25px 12px;
          font-size: 12px;
        }

        @media (max-width: 850px) {
          .layout {
            grid-template-columns: 1fr;
            padding: 20px 3%;
            gap: 16px;
          }

          .sidebar {
            padding: 10px;
          }

          .side-heading {
            display: none;
          }

          .navigation {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: thin;
          }

          .nav-button {
            width: auto;
            flex-shrink: 0;
            padding: 12px;
            font-size: 12px;
          }

          .nav-icon {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .header {
            min-height: 76px;
            padding: 5px 12px;
          }

          .logo {
            width: 210px;
            max-width: 62%;
            height: 68px;
          }

          .email {
            display: none;
          }

          .header-right {
            gap: 5px;
          }

          .logout {
            padding: 9px 10px;
            font-size: 12px;
          }

          .welcome h1 {
            font-size: 23px;
          }

          .stats {
            grid-template-columns: 1fr;
            gap: 11px;
          }

          .stat {
            padding: 17px;
          }

          .broker-grid {
            grid-template-columns: 1fr;
          }

          .card {
            padding: 16px;
          }

          .referral-grid {
            grid-template-columns: 1fr;
          }

          .referral-link {
            flex-direction: column;
          }

          .referral-link button {
            width: 100%;
          }

          .account-row {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <header className="header">
        <img className="logo" src={LOGO_URL} alt="ReTrade Logo" />

        <div className="header-right">
          <span className="email">{email}</span>
          <button
            className="logout"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="side-heading">MAIN MENU</div>

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

        <main className="main">
          <section className="welcome">
            <h1>
              {activeTab === "overview"
                ? "Welcome to ReTrade"
                : navigation.find((item) => item.id === activeTab)?.label}
            </h1>
            <p>
              Manage your broker accounts, referrals and cashback payouts.
            </p>
          </section>

          {activeTab === "overview" && (
            <>
              <h2 className="section-title">Account Overview</h2>

              <div className="stats">
                <div className="stat">
                  <div className="stat-label">Total Cashback</div>
                  <div className="stat-value">$0.00</div>
                  <div className="stat-note">Verified cashback</div>
                </div>

                <div className="stat">
                  <div className="stat-label">Available Balance</div>
                  <div className="stat-value">$0.00</div>
                  <div className="stat-note">Available for payout</div>
                </div>

                <div className="stat">
                  <div className="stat-label">Trading Accounts</div>
                  <div className="stat-value">{accounts.length}</div>
                  <div className="stat-note">Submitted accounts</div>
                </div>
              </div>

              <div className="card">
                <h2 className="section-title">Get Started</h2>
                <div className="empty">
                  <div className="empty-icon">＋</div>
                  <h3>Welcome to your ReTrade dashboard</h3>
                  <p>
                    Explore supported brokers, register using the relevant
                    partner link, then submit your trading account for review.
                  </p>
                  <button
                    className="primary"
                    onClick={() => setActiveTab("brokers")}
                  >
                    Explore Brokers
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "brokers" && (
            <div className="card">
              <h2 className="section-title">Explore Supported Brokers</h2>

              <div className="broker-grid">
                {BROKERS.map((broker) => (
                  <div className="broker-card" key={broker.id}>
                    <div className="broker-heading">
                      <div className="broker-logo-box">
                        <img
                          src={broker.image}
                          alt={`${broker.name} logo`}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      <div>
                        <h3>{broker.name}</h3>
                        <span>{broker.availability}</span>
                      </div>
                    </div>

                    <p className="broker-description">
                      {broker.description}
                    </p>

                    <div className="broker-actions">
                      <a
                        className="broker-link"
                        href={broker.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {broker.id === "JustMarkets"
                          ? "Register as a new user"
                          : "New and existing clients"}
                      </a>

                      {broker.alternativeLink && (
                        <a
                          className="broker-link"
                          href={broker.alternativeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Alternative new-client link
                        </a>
                      )}
                    </div>

                    <div className="broker-code">
                      Partner code: <strong>{broker.code}</strong>
                    </div>

                    <button
                      className="outline-button"
                      onClick={() => {
                        setSelectedBroker(broker.id);
                        setAccountMessage("");
                        setAccountError("");
                        setActiveTab("accounts");
                      }}
                    >
                      Add {broker.name} account
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "accounts" && (
            <div className="card">
              <h2 className="section-title">Add Trading Account</h2>

              {accountMessage && (
                <div className="notice success">
                  <strong>Congratulations!</strong>
                  <br />
                  {accountMessage}
                </div>
              )}

              {accountError && (
                <div className="notice error">{accountError}</div>
              )}

              <form className="form" onSubmit={submitAccount}>
                <div className="field">
                  <label>Select Broker</label>
                  <select
                    value={selectedBroker}
                    onChange={(e) => setSelectedBroker(e.target.value)}
                    required
                  >
                    <option value="">Choose a broker</option>
                    {BROKERS.map((broker) => (
                      <option key={broker.id} value={broker.id}>
                        {broker.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Trading Account ID</label>
                  <input
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="Enter your trading account ID"
                    required
                  />
                </div>

                <button
                  className="primary"
                  type="submit"
                  disabled={accountLoading}
                >
                  {accountLoading ? "Submitting..." : "Submit Account"}
                </button>
              </form>

              <p className="broker-description">
                After submission, your account will be marked Pending Approval.
                An administrator will review it within 12 hours.
              </p>

              <hr />

              <h2 className="section-title">My Submitted Accounts</h2>

              {accounts.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">▣</div>
                  <h3>No accounts submitted yet</h3>
                  <p>Your submitted broker accounts will appear here.</p>
                </div>
              ) : (
                accounts.map((account) => (
                  <div className="account-row" key={account.id}>
                    <div>
                      <strong>{account.broker}</strong>
                      <small>Account ID: {account.account_id}</small>
                    </div>
                    <span className="status">
                      {account.status || "Pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="card">
              <h2 className="section-title">Transactions</h2>
              <div className="empty">
                <div className="empty-icon">⇄</div>
                <h3>No transactions yet</h3>
                <p>
                  Your verified cashback credits and wallet transactions
                  will appear here.
                </p>
              </div>
            </div>
          )}

          {activeTab === "referrals" && (
            <div className="card">
              <h2 className="section-title">Referral Program</h2>

              <p className="broker-description">
                Earn rewards when clients you refer generate eligible,
                verified company profit through their trading activity.
              </p>

              <div className="referral-grid">
                <div className="referral-rule">
                  <span>Referral commission</span>
                  <strong>10%</strong>
                </div>

                <div className="referral-rule">
                  <span>Maximum lifetime earnings</span>
                  <strong>$500</strong>
                </div>
              </div>

              <h3>Your Referral Link</h3>

              <div className="referral-link">
                <input readOnly value={referralLink} />
                <button className="primary" onClick={copyReferral}>
                  Copy Link
                </button>
              </div>

              <p className="broker-description">
                Your referral code: <strong>{referralCode}</strong>
              </p>

              <p className="broker-description">
                Your reward is calculated from verified company profit,
                not from the referred client's cashback. Reversed or
                invalidated company profit is excluded. The $500 limit
                applies to each referrer over their lifetime.
              </p>

              <div className="empty">
                <div className="empty-icon">♧</div>
                <h3>Your referrals will appear here</h3>
                <p>
                  Referral activity and eligible rewards will appear
                  here once they are recorded and verified.
                </p>
              </div>
            </div>
          )}

          {activeTab === "payout" && (
            <div className="card">
              <h2 className="section-title">Request a Payout</h2>

              <p className="broker-description">
                Minimum payout: <strong>$5</strong>. Payments are requested
                in USDT.
              </p>

              {payoutMessage && (
                <div className="notice success">{payoutMessage}</div>
              )}

              {payoutError && (
                <div className="notice error">{payoutError}</div>
              )}

              <form className="form" onSubmit={submitPayout}>
                <div className="field">
                  <label>Amount (USD)</label>
                  <input
                    type="number"
                    min="5"
                    step="0.01"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="Minimum $5"
                    required
                  />
                </div>

                <div className="field">
                  <label>USDT Network</label>
                  <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <option value="TRC20">USDT TRC20</option>
                    <option value="BEP20">USDT BEP20</option>
                  </select>
                </div>

                <div className="field">
                  <label>USDT Wallet Address</label>
                  <input
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your USDT wallet address"
                    required
                  />
                </div>

                <button
                  className="primary"
                  type="submit"
                  disabled={payoutLoading}
                >
                  {payoutLoading ? "Submitting..." : "Request Payout"}
                </button>
              </form>

              <p className="broker-description">
                Please double-check your wallet address and network before
                submitting. Your request will be reviewed by an administrator.
              </p>
            </div>
          )}
        </main>
      </div>

      <footer className="footer">
        © 2026 ReTrade. All rights reserved.
      </footer>
    </div>
  );
}
