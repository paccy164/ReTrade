
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

type Broker = {
  id: string;
  name: string;
  slug: string;
  cashback_rate: number;
  is_active: boolean;
};

type BrokerAccount = {
  id: string;
  broker_id: string;
  account_number: string;
  verification_status: "pending" | "verified" | "rejected";
  created_at: string;
};

type CashbackTransaction = {
  id: string;
  cashback_amount: number;
  status: string;
  created_at: string;
};

const LOGO_URL =
  "https://i.postimg.cc/2yRW0mVm/Photoroom-20261112-085347.png";

const BROKER_CONFIG = [
  {
    slug: "xm",
    name: "XM",
    initials: "XM",
    link: "https://affs.click/XwgFJ",
    code: "CDHQR",
    audience: "New and existing clients",
  },
  {
    slug: "hfm",
    name: "HFM",
    initials: "HFM",
    link: "https://www.hfm.com/sv/en/?refid=30486859",
    code: "",
    audience: "New and existing clients",
  },
  {
    slug: "justmarkets",
    name: "JustMarkets",
    initials: "JM",
    link: "https://one.justmarkets.link/a/lkpf70rgxi",
    code: "lkpf70rgxi",
    audience: "New clients only",
  },
];

const NAVIGATION: {
  id: Tab;
  label: string;
  icon: string;
}[] = [
  { id: "overview", label: "Overview", icon: "⌂" },
  { id: "brokers", label: "Explore Brokers", icon: "◎" },
  { id: "accounts", label: "Trading Accounts", icon: "▣" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "referrals", label: "Referrals", icon: "♧" },
  { id: "payout", label: "Payout", icon: "↗" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [accounts, setAccounts] = useState<BrokerAccount[]>([]);
  const [transactions, setTransactions] = useState<CashbackTransaction[]>([]);

  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);

  const [selectedBroker, setSelectedBroker] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [submittingAccount, setSubmittingAccount] = useState(false);
  const [accountMessage, setAccountMessage] = useState("");
  const [accountError, setAccountError] = useState("");

  const [dataError, setDataError] = useState("");

  const supabase = createClient();

  async function loadDashboard(id: string) {
    const [
      brokerResult,
      accountResult,
      walletResult,
      transactionResult,
    ] = await Promise.all([
      supabase
        .from("brokers")
        .select("id, name, slug, cashback_rate, is_active")
        .eq("is_active", true)
        .order("name"),

      supabase
        .from("broker_accounts")
        .select(
          "id, broker_id, account_number, verification_status, created_at"
        )
        .eq("user_id", id)
        .order("created_at", { ascending: false }),

      supabase
        .from("wallets")
        .select("available_balance, pending_balance")
        .eq("user_id", id)
        .maybeSingle(),

      supabase
        .from("cashback_transactions")
        .select("id, cashback_amount, status, created_at")
        .eq("user_id", id)
        .order("created_at", { ascending: false }),
    ]);

    if (brokerResult.error) {
      setDataError(brokerResult.error.message);
    } else {
      setBrokers((brokerResult.data || []) as Broker[]);
    }

    if (accountResult.error) {
      setDataError(accountResult.error.message);
    } else {
      setAccounts((accountResult.data || []) as BrokerAccount[]);
    }

    if (walletResult.error) {
      setDataError(walletResult.error.message);
    } else {
      setAvailableBalance(
        Number(walletResult.data?.available_balance || 0)
      );
      setPendingBalance(
        Number(walletResult.data?.pending_balance || 0)
      );
    }

    if (transactionResult.error) {
      setDataError(transactionResult.error.message);
    } else {
      setTransactions(
        (transactionResult.data || []) as CashbackTransaction[]
      );
    }
  }

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          if (mounted) window.location.href = "/login";
          return;
        }

        if (!mounted) return;

        setEmail(data.user.email || "");
        setUserId(data.user.id);

        await loadDashboard(data.user.id);

        if (mounted) setLoading(false);
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
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch {
      setSigningOut(false);
    }
  }

  async function submitAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAccountMessage("");
    setAccountError("");

    if (!selectedBroker) {
      setAccountError("Please select a broker.");
      return;
    }

    const selected = brokers.find(
      (broker) => broker.slug === selectedBroker
    );

    if (!selected) {
      setAccountError("This broker is currently unavailable.");
      return;
    }

    const cleanAccountNumber = accountNumber.trim();

    if (cleanAccountNumber.length < 3 || cleanAccountNumber.length > 40) {
      setAccountError("Please enter a valid trading Account ID.");
      return;
    }

    setSubmittingAccount(true);

    try {
      const { data: existing, error: checkError } = await supabase
        .from("broker_accounts")
        .select("id")
        .eq("user_id", userId)
        .eq("broker_id", selected.id)
        .eq("account_number", cleanAccountNumber)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existing) {
        setAccountError(
          "This trading account has already been submitted."
        );
        setSubmittingAccount(false);
        return;
      }

      const { error } = await supabase
        .from("broker_accounts")
        .insert({
          user_id: userId,
          broker_id: selected.id,
          account_number: cleanAccountNumber,
          verification_status: "pending",
        });

      if (error) throw error;

      setAccountNumber("");
      setAccountMessage(
        "Congratulations! Your account is submitted."
      );

      await loadDashboard(userId);
      setActiveTab("accounts");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit your account. Please try again.";

      setAccountError(message);
    } finally {
      setSubmittingAccount(false);
    }
  }

  function openBroker(link: string) {
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function copyText(value: string) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert("Copied successfully.");
      })
      .catch(() => {
        alert("Unable to copy. Please copy it manually.");
      });
  }

  const totalCashback = transactions.reduce(
    (total, item) => total + Number(item.cashback_amount || 0),
    0
  );

  const verifiedAccounts = accounts.filter(
    (account) => account.verification_status === "verified"
  ).length;

  const pendingAccounts = accounts.filter(
    (account) => account.verification_status === "pending"
  ).length;

  const money = (value: number) =>
    `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

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
            color: #64748b;
            gap: 18px;
            font-family: Arial, sans-serif;
          }

          .loading-logo {
            width: 220px;
            max-width: 75vw;
            height: 75px;
            object-fit: contain;
          }

          .loading-spinner {
            width: 32px;
            height: 32px;
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

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
          font-family: Arial, Helvetica, sans-serif;
          background: #f4f6f9;
        }

        button,
        input,
        select {
          font-family: inherit;
        }
      `}</style>

      <style jsx>{`
        .dashboard-wrapper {
          min-height: 100vh;
          width: 100%;
          background: #f4f6f9;
          color: #111827;
          overflow-x: hidden;
        }

        .top-header {
          width: 100%;
          min-height: 82px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
        }

        .logo-image {
          height: 62px;
          width: auto;
          max-width: 240px;
          object-fit: contain;
          display: block;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 18px;
          min-width: 0;
        }

        .user-email {
          font-size: 13px;
          color: #64748b;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 230px;
        }

        .logout-button {
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          white-space: nowrap;
        }

        .logout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .dashboard-layout {
          width: 100%;
          max-width: 1440px;
          margin: auto;
          padding: 30px 5%;
          display: grid;
          grid-template-columns: 235px minmax(0, 1fr);
          gap: 25px;
        }

        .sidebar {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 13px;
          padding: 20px 12px;
          height: fit-content;
        }

        .sidebar-heading {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 5px 12px 15px;
        }

        .navigation {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 12px;
          border: none;
          background: transparent;
          color: #64748b;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          font-size: 13px;
          white-space: nowrap;
        }

        .nav-button:hover,
        .nav-button.active {
          background: #edf3ff;
          color: #1553bd;
        }

        .nav-button.active {
          font-weight: 700;
        }

        .nav-icon {
          width: 20px;
          font-size: 19px;
          text-align: center;
          flex-shrink: 0;
        }

        .main-content {
          min-width: 0;
          width: 100%;
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
          line-height: 1.6;
          color: #64748b;
        }

        .section-title {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
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
          overflow-wrap: anywhere;
        }

        .stat-note {
          color: #9ca3af;
          font-size: 12px;
        }

        .content-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 23px;
          margin-bottom: 20px;
          min-width: 0;
        }

        .empty-state {
          text-align: center;
          padding: 32px 15px;
        }

        .empty-icon {
          width: 49px;
          height: 49px;
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
          line-height: 1.7;
          margin: 0 auto;
          max-width: 400px;
        }

        .primary-button {
          display: inline-block;
          background: #1553bd;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 18px;
          margin-top: 18px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        .primary-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .secondary-button {
          background: #edf3ff;
          color: #1553bd;
          border: 1px solid #dbe7ff;
          border-radius: 8px;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
        }

        .broker-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .broker-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 19px;
          background: #ffffff;
          min-width: 0;
        }

        .broker-top {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 15px;
        }

        .broker-mark {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #edf3ff;
          color: #1553bd;
          font-size: 17px;
          font-weight: 800;
        }

        .broker-name {
          font-size: 17px;
          font-weight: 800;
          margin: 0 0 5px;
        }

        .broker-audience {
          font-size: 12px;
          color: #64748b;
          line-height: 1.5;
        }

        .broker-code {
          border: 1px dashed #cbd5e1;
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          margin: 14px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 13px;
        }

        .broker-code strong {
          color: #1553bd;
          overflow-wrap: anywhere;
        }

        .broker-actions {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
        }

        .broker-join {
          flex: 1;
          min-width: 120px;
          background: #1553bd;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .account-form {
          display: grid;
          gap: 14px;
          max-width: 500px;
          margin-top: 22px;
          text-align: left;
        }

        .form-label {
          display: block;
          color: #374151;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 7px;
        }

        .form-input {
          width: 100%;
          min-height: 46px;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #ffffff;
          color: #111827;
          font-size: 14px;
          outline: none;
        }

        .form-input:focus {
          border-color: #1553bd;
          box-shadow: 0 0 0 3px #1553bd18;
        }

        .message {
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.6;
          margin-top: 12px;
          overflow-wrap: anywhere;
        }

        .success-message {
          color: #166534;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }

        .error-message {
          color: #b91c1c;
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        .account-list {
          display: grid;
          gap: 12px;
        }

        .account-row {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .account-number {
          font-size: 14px;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .account-date {
          color: #9ca3af;
          font-size: 11px;
          margin-top: 5px;
        }

        .status {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status-pending {
          background: #fff7ed;
          color: #c2410c;
        }

        .status-verified {
          background: #f0fdf4;
          color: #15803d;
        }

        .status-rejected {
          background: #fef2f2;
          color: #b91c1c;
        }

        .referral-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          margin-top: 22px;
        }

        .referral-rule {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 18px;
        }

        .referral-rule span {
          display: block;
          color: #64748b;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .referral-rule strong {
          display: block;
          color: #1553bd;
          font-size: 25px;
        }

        .referral-note {
          color: #64748b;
          font-size: 13px;
          line-height: 1.7;
          margin: 12px 0;
        }

        .payout-minimum {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 18px;
          margin-top: 15px;
        }

        .payout-minimum strong {
          display: block;
          font-size: 25px;
          color: #1553bd;
          margin-top: 7px;
        }

        .transaction-row {
          padding: 14px 0;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .transaction-row:last-child {
          border-bottom: none;
        }

        .transaction-date {
          color: #9ca3af;
          font-size: 11px;
          margin-top: 5px;
        }

        .transaction-amount {
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
        }

        .dashboard-footer {
          text-align: center;
          padding: 22px 15px;
          color: #9ca3af;
          font-size: 12px;
        }

        .data-warning {
          color: #b45309;
          background: #fffbeb;
          border: 1px solid #fde68a;
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          margin-bottom: 15px;
          overflow-wrap: anywhere;
        }

        @media (max-width: 900px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
            padding: 20px 3%;
            gap: 16px;
          }

          .sidebar {
            padding: 10px;
          }

          .sidebar-heading {
            display: none;
          }

          .navigation {
            flex-direction: row;
            gap: 6px;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 2px;
          }

          .navigation::-webkit-scrollbar {
            display: none;
          }

          .nav-button {
            width: auto;
            flex: 0 0 auto;
            white-space: nowrap;
            margin: 0;
            padding: 11px 13px;
            font-size: 12px;
          }

          .nav-icon {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .top-header {
            min-height: 72px;
            padding: 0 12px;
            width: 100%;
          }

          .logo-image {
            height: 52px;
            max-width: 175px;
          }

          .header-right {
            gap: 7px;
          }

          .user-email {
            display: none;
          }

          .logout-button {
            padding: 9px 11px;
            font-size: 12px;
          }

          .dashboard-layout {
            width: 100%;
            padding: 16px 12px;
            gap: 14px;
          }

          .welcome-section h1 {
            font-size: 23px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
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

          .broker-grid {
            grid-template-columns: 1fr;
          }

          .referral-details {
            grid-template-columns: 1fr;
          }

          .account-row {
            align-items: flex-start;
          }

          .transaction-row {
            align-items: flex-start;
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
            {NAVIGATION.map((item) => (
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
                : NAVIGATION.find((item) => item.id === activeTab)?.label}
            </h1>

            <p>
              Manage your trading accounts and track your cashback activity.
            </p>
          </section>

          {dataError && (
            <div className="data-warning">
              Some dashboard information could not be loaded: {dataError}
            </div>
          )}

          {activeTab === "overview" && (
            <>
              <h2 className="section-title">Account Overview</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Total Cashback</div>
                  <div className="stat-value">
                    {money(totalCashback)}
                  </div>
                  <div className="stat-note">
                    Recorded cashback transactions
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Available Balance</div>
                  <div className="stat-value">
                    {money(availableBalance)}
                  </div>
                  <div className="stat-note">Your wallet balance</div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Verified Accounts</div>
                  <div className="stat-value">
                    {verifiedAccounts}
                  </div>
                  <div className="stat-note">
                    {pendingAccounts} pending approval
                  </div>
                </div>
              </div>

              <div className="content-card">
                <h2 className="section-title">Get Started</h2>

                <div className="empty-state">
                  <div className="empty-icon">＋</div>
                  <h3>Welcome to your ReTrade dashboard</h3>
                  <p>
                    Explore our supported brokers, connect your trading
                    account and wait for verification. Eligible cashback
                    activity will appear here when recorded.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => setActiveTab("brokers")}
                  >
                    Explore Brokers
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "brokers" && (
            <>
              <div className="content-card">
                <h2 className="section-title">Explore Our Brokers</h2>

                <p className="referral-note">
                  Choose one of our supported brokers. Use the ReTrade
                  referral link before registering or logging in.
                </p>

                <div className="broker-grid">
                  {BROKER_CONFIG.map((config) => {
                    const broker = brokers.find(
                      (item) => item.slug === config.slug
                    );

                    return (
                      <div className="broker-card" key={config.slug}>
                        <div className="broker-top">
                          <div className="broker-mark">
                            {config.initials}
                          </div>

                          <div>
                            <h3 className="broker-name">
                              {config.name}
                            </h3>

                            <div className="broker-audience">
                              {config.audience}
                            </div>
                          </div>
                        </div>

                        {config.code && (
                          <div className="broker-code">
                            <span>Referral code</span>
                            <strong>{config.code}</strong>

                            <button
                              className="secondary-button"
                              onClick={() => copyText(config.code)}
                            >
                              Copy
                            </button>
                          </div>
                        )}

                        <div className="broker-actions">
                          <button
                            className="broker-join"
                            onClick={() => openBroker(config.link)}
                            disabled={!broker}
                          >
                            {broker ? "Join Broker" : "Unavailable"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="content-card">
                <h2 className="section-title">
                  Connect Your Trading Account
                </h2>

                <p className="referral-note">
                  After visiting your broker, return here and submit your
                  trading Account ID. Do not enter your MT4/MT5 password
                  or investor password.
                </p>

                <form
                  className="account-form"
                  onSubmit={submitAccount}
                >
                  <div>
                    <label className="form-label">
                      Select Broker
                    </label>

                    <select
                      className="form-input"
                      value={selectedBroker}
                      onChange={(event) =>
                        setSelectedBroker(event.target.value)
                      }
                      required
                    >
                      <option value="">Choose a broker</option>

                      {BROKER_CONFIG.map((config) => {
                        const available = brokers.some(
                          (broker) => broker.slug === config.slug
                        );

                        if (!available) return null;

                        return (
                          <option
                            key={config.slug}
                            value={config.slug}
                          >
                            {config.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">
                      Trading Account ID
                    </label>

                    <input
                      className="form-input"
                      type="text"
                      value={accountNumber}
                      onChange={(event) =>
                        setAccountNumber(event.target.value)
                      }
                      placeholder="Enter your trading Account ID"
                      minLength={3}
                      maxLength={40}
                      required
                    />
                  </div>

                  <button
                    className="primary-button"
                    type="submit"
                    disabled={submittingAccount}
                  >
                    {submittingAccount
                      ? "Submitting..."
                      : "Submit Account"}
                  </button>
                </form>

                {accountMessage && (
                  <div className="message success-message">
                    {accountMessage}
                  </div>
                )}

                {accountError && (
                  <div className="message error-message">
                    {accountError}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "accounts" && (
            <div className="content-card">
              <h2 className="section-title">Your Trading Accounts</h2>

              {accounts.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">▣</div>
                  <h3>No trading accounts connected</h3>
                  <p>
                    Connect your broker account to begin the verification
                    process.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => setActiveTab("brokers")}
                  >
                    Connect Account
                  </button>
                </div>
              ) : (
                <div className="account-list">
                  {accounts.map((account) => {
                    const broker = brokers.find(
                      (item) => item.id === account.broker_id
                    );

                    return (
                      <div className="account-row" key={account.id}>
                        <div>
                          <div className="account-number">
                            {broker?.name || "Broker"} —{" "}
                            {account.account_number}
                          </div>

                          <div className="account-date">
                            Submitted{" "}
                            {new Date(
                              account.created_at
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        <span
                          className={`status status-${account.verification_status}`}
                        >
                          {account.verification_status === "verified"
                            ? "Approved"
                            : account.verification_status === "pending"
                              ? "Pending Approval"
                              : "Rejected"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="referral-note">
                Account verification is handled by the ReTrade admin team.
                The expected review time is within 12 hours.
              </p>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="content-card">
              <h2 className="section-title">Transactions</h2>

              {transactions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">⇄</div>
                  <h3>No transactions yet</h3>
                  <p>
                    Your recorded cashback transactions will appear here.
                  </p>
                </div>
              ) : (
                transactions.map((transaction) => (
                  <div
                    className="transaction-row"
                    key={transaction.id}
                  >
                    <div>
                      <strong>Cashback</strong>
                      <div className="transaction-date">
                        {new Date(
                          transaction.created_at
                        ).toLocaleDateString()}
                      </div>
                      <div className="transaction-date">
                        Status: {transaction.status}
                      </div>
                    </div>

                    <div className="transaction-amount">
                      {money(Number(transaction.cashback_amount))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "referrals" && (
            <div className="content-card">
              <h2 className="section-title">Referral Program</h2>

              <p className="referral-note">
                Earn rewards when clients you refer generate eligible,
                verified company profit through their trading activity.
              </p>

              <div className="referral-details">
                <div className="referral-rule">
                  <span>Referral commission</span>
                  <strong>10%</strong>
                </div>

                <div className="referral-rule">
                  <span>Maximum lifetime earnings</span>
                  <strong>$500</strong>
                </div>
              </div>

              <p className="referral-note">
                Your reward is calculated from verified company profit,
                not from the referred client's cashback. Reversed or
                invalidated company profit is excluded. The $500 limit
                applies to each referrer over their lifetime.
              </p>

              <div className="empty-state">
                <div className="empty-icon">♧</div>
                <h3>Your referral link is being prepared</h3>
                <p>
                  Your personal referral link and referral activity will
                  appear here once the referral tracking system is enabled.
                </p>
              </div>
            </div>
          )}

          {activeTab === "payout" && (
            <div className="content-card">
              <h2 className="section-title">Wallet & Payout</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Available Balance</div>
                  <div className="stat-value">
                    {money(availableBalance)}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Pending Balance</div>
                  <div className="stat-value">
                    {money(pendingBalance)}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Minimum Payout</div>
                  <div className="stat-value">$5.00</div>
                </div>
              </div>

              <div className="payout-minimum">
                <span className="stat-label">
                  Minimum withdrawal amount
                </span>

                <strong>$5.00</strong>

                <p className="referral-note">
                  Your available balance must be at least $5 before
                  requesting a payout.
                </p>
              </div>

              <div className="message success-message">
                Wallet balance is displayed from your ReTrade account.
                Payout requests will be enabled after the secure withdrawal
                process and supported payment methods are configured.
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
