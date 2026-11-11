export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#080d18",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "40px 7%"
    }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ color: "#38d9a9" }}>RETRADE</h2>
        <a href="/login" style={{ color: "white" }}>Login</a>
      </nav>

      <section style={{ maxWidth: "750px", marginTop: "100px" }}>
        <p style={{ color: "#38d9a9" }}>
          MULTI-BROKER CASHBACK PLATFORM
        </p>

        <h1 style={{ fontSize: "clamp(40px, 7vw, 68px)" }}>
          Trade more. Get more back.
        </h1>

        <p style={{ color: "#aab4c5", fontSize: "18px", lineHeight: 1.7 }}>
          Connect your trading accounts, track your cashback
          and manage your rewards from one simple dashboard.
        </p>

        <a href="/register" style={{
          display: "inline-block",
          background: "#38d9a9",
          color: "#08111c",
          padding: "15px 28px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          marginTop: "20px"
        }}>
          Get Started
        </a>
      </section>

      <footer style={{ marginTop: "120px", color: "#718096" }}>
        © 2026 Retrade. All rights reserved.
      </footer>
    </main>
  );
}
