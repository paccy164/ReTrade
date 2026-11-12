"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUser() {
    setLoading(true);
    setError("");

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    try {
      const supabase = createClient();

      // Twifashishije getUser() isanzwe yemewe na @supabase/ssr muri Next.js client
      const authCheck = supabase.auth.getUser();

      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error("Connection timed out. Please try again.")),
          12000
        );
      });

      const { data, error } = await Promise.race([
        authCheck,
        timeout,
      ]);

      if (error) throw error;

      const user = data?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(
        typeof user.email === "string" ? user.email : "ReTrade User"
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify your account."
      );
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p>Loading your ReTrade dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={styles.page}>
        <div style={styles.errorCard}>
          <h2>Dashboard could not load</h2>
          <p>{error}</p>
          <button style={styles.button} onClick={loadUser}>
            Try Again
          </button>
          <button
            style={styles.secondary}
            onClick={() => router.replace("/login")}
          >
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>ReTrade<span>.</span></h1>
        <button style={styles.logout} onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <section style={styles.content}>
        <p style={styles.eyebrow}>TRADER DASHBOARD</p>
        <h2 style={styles.title}>Welcome to ReTrade</h2>
        <p style={styles.muted}>{email}</p>

        <div style={styles.card}>
          <p style={styles.muted}>Account status</p>
          <h3 style={styles.active}>Account Connected</h3>
          <p style={styles.muted}>
            Your ReTrade account is ready. Verified cashback
            transactions will appear here.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <p style={styles.muted}>Cashback Balance</p>
            <h2>$0.00</h2>
          </div>

          <div style={styles.card}>
            <p style={styles.muted}>Trading Accounts</p>
            <h2>0</h2>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    background: "#080b11",
    color: "#ffffff",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #202a3a",
    paddingBottom: "20px",
  },
  logo: {
    fontSize: "26px",
    fontWeight: 800,
  },
  logout: {
    background: "#182438",
    color: "#ffffff",
    border: "1px solid #30415a",
    borderRadius: "8px",
    padding: "11px 18px",
    cursor: "pointer",
  },
  content: {
    maxWidth: "1100px",
    margin: "45px auto",
  },
  eyebrow: {
    color: "#438cff",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "2px",
  },
  title: {
    fontSize: "30px",
    margin: "10px 0",
  },
  muted: {
    color: "#98a5b8",
    lineHeight: 1.6,
  },
  card: {
    background: "#101722",
    border: "1px solid #202d40",
    borderRadius: "14px",
    padding: "24px",
    marginTop: "22px",
    minWidth: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  active: {
    color: "#52d69b",
  },
  center: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#aab6c8",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #26354a",
    borderTop: "3px solid #2878f0",
    borderRadius: "50%",
    marginBottom: "15px",
  },
  errorCard: {
    maxWidth: "420px",
    margin: "100px auto",
    padding: "25px",
    background: "#101722",
    border: "1px solid #303d50",
    borderRadius: "14px",
  },
  button: {
    background: "#2878f0",
    color: "#fff",
    border: 0,
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    marginRight: "8px",
  },
  secondary: {
    background: "#26354a",
    color: "#fff",
    border: 0,
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
