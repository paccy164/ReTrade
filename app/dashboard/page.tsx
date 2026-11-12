
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  image: string;
  description: string;
  links: { label: string; url: string; code?: string }[];
  newUsersOnly?: boolean;
};

type TradingAccount = {
  id: string;
  broker: string;
  account_id: string;
  status: string;
  created_at: string;
};

type Payout = {
  id: string;
  amount: number;
  network: string;
  wallet_address: string;
  status: string;
  created_at: string;
};

const LOGO_URL =
  "https://i.postimg.cc/2yRW0mVm/Photoroom-20261112-085347.png";

const BROKERS: Broker[] = [
  {
    id: "xm",
    name: "XM",
    image: "https://logo.clearbit.com/xm.com",
    description: "Open or access your XM trading account.",
    links: [
      { label: "Visit XM", url: "https://www.xm.com/" },
    ],
  },
  {
    id: "hfm",
    name: "HFM",
    image: "https://logo.clearbit.com/hfm.com",
    description: "Register or access your HFM account using the applicable partner link.",
    links: [
      {
        label: "New and existing clients",
        url: "https://www.hfm.com/sv/en/?refid=30486859",
      },
      {
        label: "Alternative new-client link",
        url: "https://affs.click/XwgFJ",
        code: "CDHQR",
      },
    ],
  },
  {
    id: "justmarkets",
    name: "JustMarkets",
    image: "https://logo.clearbit.com/justmarkets.com",
    description: "Partner registration link for new users only.",
    links: [
      {
        label: "Register as a new user",
        url: "https://one.justmarkets.link/a/lkpf70rgxi",
        code: "lkpf70rgxi",
      },
    ],
    newUsersOnly: true,
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function DashboardPage() {
  const supabase = useMemo(() => createClient(), []);

  const [tab, setTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");

  const [notice, setNotice] = useState("");
  const [accountBroker, setAccountBroker] = useState("XM");
  const [accountId, setAccountId] = useState("");
  const [accountSubmitting, setAccountSubmitting] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  const [amount, setAmount] = useState("5");
  const [network, setNetwork] = useState("USDT BEP20");
  const [wallet, setWallet] = useState("");
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const loadData = useCallback(
    async (uid: string) => {
      const profileResult = await supabase
        .from("profiles")
        .select("role, referral_code")
        .eq("id", uid)
        .maybeSingle();

      const admin = profileResult.data?.role === "admin";
      setIsAdmin(admin);

      const accountQuery = supabase
        .from("trading_accounts")
        .select("id, broker, account_id, status, created_at")
        .order("created_at", { ascending: false });

      const payoutQuery = supabase
        .from("payout_requests")
        .select("id, amount, network, wallet_address, status, created_at")
        .order("created_at", { ascending: false });

      if (!admin) {
        accountQuery.eq("user_id", uid);
        payoutQuery.eq("user_id", uid);
      }

      const [accountResult, payoutResult] = await Promise.all([
        accountQuery,
        payoutQuery,
      ]);

      if (accountResult.error) {
        setNotice("Could not load trading accounts: " + accountResult.error.message);
      } else {
        setAccounts((accountResult.data || []) as TradingAccount[]);
      }

      if (payoutResult.error) {
        setNotice("Could not load payout requests: " + payoutResult.error.message);
      } else {
        setPayouts((payoutResult.data || []) as Payout[]);
      }

      const code =
        profileResult.data?.referral_code ||
        uid.slice(0, 8).toUpperCase();

      setReferralCode(code);
      setReferralLink(
        `${window.location.origin}/signup?ref=${encodeURIComponent(code)}`
      );
    },
    [supabase]
  );

  useEffect(() => {
    let alive = true;

    async function init() {
      const { data, error } = await supabase.auth.getUser();

      if (!alive) return;

      if (error || !data.user) {
        window.location.assign("/login");
        return;
      }

      setEmail(data.user.email || "");
      setUserId(data.user.id);

      await loadData(data.user.id);

      if (alive) setLoading(false);
    }

    init();

    return () => {
      alive = false;
    };
  }, [loadData, supabase]);

  async function signOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.assign("/login");
  }

  async function submitAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("");
    setAccountSuccess(false);

    if (!accountId.trim()) {
      setNotice("Please enter your broker trading account ID.");
      return;
    }

    setAccountSubmitting(true);

    const { error } = await supabase.from("trading_accounts").insert({
      user_id: userId,
      broker: accountBroker,
      account_id: accountId.trim(),
      status: "pending",
    });

    setAccountSubmitting(false);

    if (error) {
      setNotice("Could not submit account: " + error.message);
      return;
    }

    setAccountId("");
    setAccountSuccess(true);
    await loadData(userId);
  }

  async function submitPayout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("");
    setPayoutSuccess(false);

    const parsed = Number(amount);

    if (!Number.isFinite(parsed) || parsed < 5) {
      setNotice("Minimum payout request is $5.");
      return;
    }

    if (!wallet.trim()) {
      setNotice("Please enter your USDT wallet address.");
      return;
    }

    setPayoutSubmitting(true);

    const { error } = await supabase.from("payout_requests").insert({
      user_id: userId,
      amount: parsed,
      network,
      wallet_address: wallet.trim(),
      status: "pending",
    });

    setPayoutSubmitting(false);

    if (error) {
      setNotice("Could not submit payout: " + error.message);
      return;
    }

    setWallet("");
    setPayoutSuccess(true);
    await loadData(userId);
  }

  async function updateStatus(
    table: "trading_accounts" | "payout_requests",
    id: string,
    status: "approved" | "rejected" | "paid"
  ) {
    setNotice("");

    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq("id", id);

    if (error) {
      setNotice("Update failed: " + error.message);
    } else {
      await loadData(userId);
      setNotice("Status updated successfully.");
    }
  }

  const nav: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "brokers", label: "Explore Brokers", icon: "◈" },
    { id: "accounts", label: "Trading Accounts", icon: "▣" },
    { id: "transactions", label: "Transactions", icon: "⇄" },
    { id: "referrals", label: "Referrals", icon: "♧" },
    { id: "payout", label: "Payout", icon: "↗" },
  ];

  if (loading) {
    return (
      <div className="loading">
        <img src={LOGO_URL} alt="ReTrade logo" />
        <div className="spinner" />
        <p>Loading your dashboard...</p>
        <style jsx>{`
          .loading {
            min-height: 100svh;
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
            width: min(330px, 85vw);
            height: 145px;
            object-fit: contain;
          }
          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #dbe4f2;
            border-top-color: #1553bd;
            border-radius: 50%;
            animation: spin .8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app">
      <style jsx global>{`
        * { box-sizing: border-box; }
        html, body {
          margin: 0;
          padding: 0;
          background: #f4f6f9;
          font-family: Arial, sans-serif;
        }
        button, input, select { font: inherit; }
        button { cursor: pointer; }
      `}</style>

      <style jsx>{`
        .app {
          min-height: 100svh;
          color: #111827;
          background: #f4f6f9;
          overflow-x: hidden;
        }
        .header {
          min-height: 105px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 10px clamp(14px, 4vw, 56px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .brand {
          display: flex;
          align-items: center;
          min-width: 0;
        }
        .brand img {
          width: min(300px, 42vw);
          height: 90px;
          object-fit: contain;
          display: block;
        }
        .headright {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .email {
          font-size: 13px;
          color: #64748b;
          overflow-wrap: anywhere;
        }
        .logout, .secondary {
          border: 1px solid #d1d5db;
          background: #fff;
          color: #111827;
          padding: 10px 14px;
          border-radius: 8px;
        }
        .layout {
          width: 100%;
          max-width: 1500px;
          margin: auto;
          padding: 26px clamp(12px, 4vw, 56px);
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 24px;
        }
        .sidebar, .card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
        }
        .sidebar {
          padding: 14px;
          height: max-content;
          position: sticky;
          top: 16px;
        }
        .sideheading {
          padding: 8px 10px 14px;
          color: #9ca3af;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .nav { display: grid; gap: 5px; }
        .nav button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          text-align: left;
          border: 0;
          background: transparent;
          color: #64748b;
          border-radius: 9px;
          padding: 12px;
          font-size: 14px;
        }
        .nav button.active, .nav button:hover {
          background: #edf3ff;
          color: #1553bd;
          font-weight: 700;
        }
        .main { min-width: 0; }
        .welcome { margin: 0 0 22px; }
        .welcome h1 {
          font-size: clamp(22px, 3vw, 29px);
          margin: 0 0 7px;
        }
        .welcome p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }
        .title { font-size: 18px; margin: 0 0 15px; }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }
        .stat { padding: 20px; }
        .muted { color: #64748b; font-size: 13px; }
        .value {
          font-size: 26px;
          font-weight: 800;
          margin: 10px 0 5px;
        }
        .card {
          padding: 22px;
          margin-bottom: 18px;
          min-width: 0;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .broker {
          padding: 18px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          min-width: 0;
        }
        .brokerhead {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }
        .brokerlogo {
          width: 100px;
          height: 75px;
          flex: 0 0 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          padding: 8px;
        }
        .brokerlogo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .broker h3 { margin: 0 0 5px; font-size: 18px; }
        .broker p, .help {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .linkbtn, .primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: #1553bd;
          color: #fff;
          border: 0;
          border-radius: 8px;
          padding: 10px 13px;
          font-size: 13px;
          font-weight: 700;
        }
        .primary:disabled { opacity: .6; cursor: wait; }
        .formgrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 13px;
        }
        label {
          display: grid;
          gap: 7px;
          color: #475569;
          font-size: 13px;
          font-weight: 600;
        }
        input, select {
          width: 100%;
          min-width: 0;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 12px;
          background: #fff;
          color: #111827;
        }
        .formactions { margin-top: 14px; }
        .notice {
          padding: 12px 14px;
          border-radius: 9px;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 13px;
          margin: 12px 0;
          line-height: 1.6;
        }
        .tablewrap { width: 100%; overflow-x: auto; }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 560px;
        }
        th, td {
          text-align: left;
          padding: 12px 10px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 13px;
        }
        th { color: #64748b; font-weight: 700; }
        .status {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 99px;
          background: #fff7ed;
          color: #9a3412;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }
        .actions { display: flex; gap: 6px; }
        .actions button {
          padding: 7px 9px;
          border: 1px solid #d1d5db;
          background: #fff;
          border-radius: 7px;
          font-size: 12px;
        }
        .empty {
          text-align: center;
          padding: 28px 12px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }
        .rules {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin: 16px 0;
        }
        .rule {
          padding: 16px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
        }
        .rule strong {
          display: block;
          color: #1553bd;
          font-size: 24px;
          margin-top: 7px;
        }
        .footer {
          text-align: center;
          padding: 18px;
          color: #9ca3af;
          font-size: 12px;
        }
        @media(max-width:850px) {
          .layout {
            grid-template-columns: 1fr;
            padding-top: 16px;
          }
          .sidebar {
            position: static;
            padding: 10px;
          }
          .sideheading { display: none; }
          .nav {
            display: flex;
            overflow-x: auto;
            gap: 5px;
          }
          .nav button {
            width: auto;
            white-space: nowrap;
            flex: 0 0 auto;
          }
          .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media(max-width:560px) {
          .header { min-height: 88px; padding: 7px 12px; }
          .brand img {
            width: 190px;
            max-width: 55vw;
            height: 72px;
          }
          .email { display: none; }
          .headright { gap: 7px; }
          .logout { padding: 9px 10px; font-size: 12px; }
          .layout { padding: 13px 10px; gap: 12px; }
          .nav button { font-size: 12px; padding: 10px; }
          .stats, .grid, .formgrid, .rules { grid-template-columns: 1fr; }
          .card { padding: 15px; }
          .stat { padding: 16px; }
          .value { font-size: 23px; }
          .broker { padding: 14px; }
        }
      `}</style>

      <header className="header">
        <div className="brand">
          <img src={LOGO_URL} alt="ReTrade logo" />
        </div>
        <div className="headright">
          <span className="email">{email}</span>
          <button className="logout" onClick={signOut} disabled={signingOut}>
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sideheading">MAIN MENU</div>
          <nav className="nav">
            {nav.map(item => (
              <button
                key={item.id}
                className={tab === item.id ? "active" : ""}
                onClick={() => {
                  setTab(item.id);
                  setNotice("");
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="main">
          <section className="welcome">
            <h1>
              {tab === "overview"
                ? "Welcome to ReTrade"
                : nav.find(n => n.id === tab)?.label}
            </h1>
            <p>Manage your broker accounts, referrals and cashback payouts.</p>
          </section>

          {notice && <div className="notice">{notice}</div>}

          {tab === "overview" && (
            <>
              <h2 className="title">Account Overview</h2>
              <div className="stats">
                <div className="card stat">
                  <div className="muted">Total Cashback</div>
                  <div className="value">$0.00</div>
                  <div className="muted">Verified cashback</div>
                </div>
                <div className="card stat">
                  <div className="muted">Available Balance</div>
                  <div className="value">$0.00</div>
                  <div className="muted">Available for payout</div>
                </div>
                <div className="card stat">
                  <div className="muted">Trading Accounts</div>
                  <div className="value">{accounts.length}</div>
                  <div className="muted">Submitted accounts</div>
                </div>
              </div>

              <div className="card">
                <h2 className="title">Get Started</h2>
                <p className="help">
                  Explore supported brokers, register using the relevant partner
                  link, then submit your trading account ID for review.
                </p>
                <button className="primary" onClick={() => setTab("brokers")}>
                  Explore Brokers
                </button>
              </div>
            </>
          )}

          {tab === "brokers" && (
            <div className="card">
              <h2 className="title">Supported Brokers</h2>
              <div className="grid">
                {BROKERS.map(b => (
                  <article className="broker" key={b.id}>
                    <div className="brokerhead">
                      <div className="brokerlogo">
                        <img
                          src={b.image}
                          alt={`${b.name} logo`}
                          onError={e => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.textContent = b.name;
                              parent.style.fontSize = "24px";
                              parent.style.fontWeight = "800";
                              parent.style.color = "#1553bd";
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h3>{b.name}</h3>
                        <span className="muted">
                          {b.newUsersOnly ? "New users only" : "Supported broker"}
                        </span>
                      </div>
                    </div>

                    <p>{b.description}</p>

                    <div className="links">
                      {b.links.map(link => (
                        <a
                          className="linkbtn"
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>

                    {b.links.some(l => l.code) && (
                      <p>
                        {b.links.filter(l => l.code).map(l => (
                          <span key={l.url}>
                            Partner code: <strong>{l.code}</strong>{" "}
                          </span>
                        ))}
                      </p>
                    )}

                    <button
                      className="secondary"
                      onClick={() => {
                        setAccountBroker(b.name);
                        setAccountSuccess(false);
                        setTab("accounts");
                      }}
                    >
                      Add {b.name} account
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {tab === "accounts" && (
            <>
              <div className="card">
                <h2 className="title">Add Trading Account</h2>
                <p className="help">
                  After registering with a supported broker, enter your trading
                  account ID below. Your submission will remain pending until
                  reviewed by the ReTrade admin.
                </p>

                {accountSuccess && (
                  <div className="notice">
                    Congratulations! Your trading account was submitted
                    successfully. Status: Pending admin approval. The admin
                    will review it within 12 hours.
                  </div>
                )}

                <form onSubmit={submitAccount}>
                  <div className="formgrid">
                    <label>
                      Broker
                      <select
                        value={accountBroker}
                        onChange={e => setAccountBroker(e.target.value)}
                      >
                        {BROKERS.map(b => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Trading Account ID
                      <input
                        value={accountId}
                        onChange={e => setAccountId(e.target.value)}
                        placeholder="Enter your broker account ID"
                        required
                      />
                    </label>
                  </div>

                  <div className="formactions">
                    <button className="primary" disabled={accountSubmitting}>
                      {accountSubmitting ? "Submitting..." : "Submit Account"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="card">
                <h2 className="title">My Trading Accounts</h2>
                {accounts.length === 0 ? (
                  <div className="empty">No trading accounts submitted yet.</div>
                ) : (
                  <div className="tablewrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Broker</th>
                          <th>Account ID</th>
                          <th>Date submitted</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.map(a => (
                          <tr key={a.id}>
                            <td>{a.broker}</td>
                            <td>{a.account_id}</td>
                            <td>{new Date(a.created_at).toLocaleDateString()}</td>
                            <td><span className="status">{a.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "payout" && (
            <>
              <div className="card">
                <h2 className="title">Request a Payout</h2>
                <p className="help">
                  Minimum payout request is $5. Make sure the network selected
                  matches your wallet address.
                </p>

                {payoutSuccess && (
                  <div className="notice">
                    Your payout request has been submitted and is pending admin review.
                  </div>
                )}

                <form onSubmit={submitPayout}>
                  <div className="formgrid">
                    <label>
                      Amount (USD)
                      <input
                        type="number"
                        min="5"
                        step="0.01"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Payment network
                      <select
                        value={network}
                        onChange={e => setNetwork(e.target.value)}
                      >
                        <option>USDT BEP20</option>
                        <option>USDT TRC20</option>
                      </select>
                    </label>

                    <label style={{ gridColumn: "1 / -1" }}>
                      USDT wallet address
                      <input
                        value={wallet}
                        onChange={e => setWallet(e.target.value)}
                        placeholder="Paste your wallet address"
                        required
                      />
                    </label>
                  </div>

                  <div className="formactions">
                    <button className="primary" disabled={payoutSubmitting}>
                      {payoutSubmitting ? "Submitting..." : "Submit Payout Request"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="card">
                <h2 className="title">Payout History</h2>
                {payouts.length === 0 ? (
                  <div className="empty">No payout requests yet.</div>
                ) : (
                  <div className="tablewrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>Network</th>
                          <th>Wallet address</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payouts.map(p => (
                          <tr key={p.id}>
                            <td>{money(p.amount)}</td>
                            <td>{p.network}</td>
                            <td>{p.wallet_address}</td>
                            <td>{new Date(p.created_at).toLocaleDateString()}</td>
                            <td><span className="status">{p.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "referrals" && (
            <div className="card">
              <h2 className="title">Referral Program</h2>
              <p className="help">
                Earn rewards from eligible, verified company profit generated
                by clients you refer. Rewards are not calculated from the
                referred client's cashback.
              </p>

              <div className="rules">
                <div className="rule">
                  <span className="muted">Referral commission</span>
                  <strong>10%</strong>
                </div>
                <div className="rule">
                  <span className="muted">Maximum lifetime earnings</span>
                  <strong>$500</strong>
                </div>
              </div>

              <label>
                Your referral link
                <input
                  readOnly
                  value={referralLink || "Referral link is being prepared"}
                />
              </label>

              <div className="links">
                <button
                  className="primary"
                  onClick={() => {
                    if (referralLink) {
                      navigator.clipboard?.writeText(referralLink);
                      setNotice("Referral link copied.");
                    }
                  }}
                >
                  Copy referral link
                </button>
              </div>

              <p className="help">
                Referral code: {referralCode || "Loading…"}. Only verified
                eligible company profit qualifies. Reversed or invalidated
                profit is excluded.
              </p>
            </div>
          )}

          {tab === "transactions" && (
            <div className="card">
              <h2 className="title">Transactions</h2>
              <div className="empty">
                Verified cashback credits and wallet transactions will appear
                here when transaction records are connected.
              </div>
            </div>
          )}

          {isAdmin && (
            <>
              <div className="card">
                <h2 className="title">Admin Review</h2>
                <p className="help">
                  Review submitted trading accounts. Approve or reject each
                  submission after verification.
                </p>

                <h3>Trading account submissions</h3>

                {accounts.length === 0 ? (
                  <p className="empty">No account submissions.</p>
                ) : (
                  <div className="tablewrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Record ID</th>
                          <th>Broker</th>
                          <th>Account ID</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.map(a => (
                          <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.broker}</td>
                            <td>{a.account_id}</td>
                            <td>{a.status}</td>
                            <td>
                              <div className="actions">
                                <button
                                  onClick={() =>
                                    updateStatus("trading_accounts", a.id, "approved")
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus("trading_accounts", a.id, "rejected")
                                  }
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="card">
                <h2 className="title">Admin Payout Review</h2>

                {payouts.length === 0 ? (
                  <p className="empty">No payout requests.</p>
                ) : (
                  <div className="tablewrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Request ID</th>
                          <th>Amount</th>
                          <th>Network</th>
                          <th>Wallet</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payouts.map(p => (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{money(p.amount)}</td>
                            <td>{p.network}</td>
                            <td>{p.wallet_address}</td>
                            <td>{p.status}</td>
                            <td>
                              <div className="actions">
                                <button
                                  onClick={() =>
                                    updateStatus("payout_requests", p.id, "approved")
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus("payout_requests", p.id, "rejected")
                                  }
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus("payout_requests", p.id, "paid")
                                  }
                                >
                                  Mark paid
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="footer">
        © 2026 ReTrade. All rights reserved.
      </footer>
    </div>
  );
}
