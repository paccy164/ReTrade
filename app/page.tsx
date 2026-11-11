
const faqs = [
  {
    q: "What is Retrade?",
    a: "Retrade is a trading cashback platform designed to help traders track and receive cashback based on verified broker commissions."
  },
  {
    q: "How does cashback work?",
    a: "You connect an eligible XM trading account. Once the related broker commission is received and verified, eligible cashback can be credited to your Retrade wallet."
  },
  {
    q: "Is cashback paid instantly?",
    a: "No. Cashback is credited after the corresponding broker commission has been received and verified."
  },
  {
    q: "Which broker does Retrade support?",
    a: "We are starting with XM. Additional brokers may be introduced in future updates."
  },
  {
    q: "Do I need to share my MT4 or MT5 password?",
    a: "No. Retrade will never ask you for your trading password or investor password."
  },
  {
    q: "How can I withdraw my cashback?",
    a: "Eligible users can request a withdrawal from their Retrade wallet once they meet the minimum withdrawal requirement of $5."
  },
  {
    q: "Can I connect multiple trading accounts?",
    a: "Our platform is designed to support multiple eligible trading accounts under one Retrade profile."
  },
  {
    q: "Is Retrade affiliated with XM?",
    a: "Retrade is an independent cashback platform. Broker participation and commission arrangements are subject to applicable partner agreements."
  }
];

export default function Home() {
  return (
    <main className="site">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #07111e; }
        .site {
          background: #07111e;
          color: #f4f8ff;
          min-height: 100vh;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }
        .container { width: min(1120px, 90%); margin: auto; }
        .nav {
          display: flex; justify-content: space-between;
          align-items: center; padding: 25px 0;
          border-bottom: 1px solid #ffffff12;
        }
        .logo { font-size: 26px; font-weight: 900; letter-spacing: -1px; }
        .logo span { color: #39e6b0; }
        .navlinks { display: flex; gap: 27px; align-items: center; }
        .nav a { color: #c4cfdf; text-decoration: none; font-size: 14px; }
        .nav .navbtn, .primary {
          background: #39e6b0; color: #06151b;
          border-radius: 9px; padding: 13px 20px;
          font-weight: 800; text-decoration: none;
          display: inline-block;
        }
        .hero {
          padding: 100px 0 95px;
          display: grid; grid-template-columns: 1.15fr .85fr;
          align-items: center; gap: 45px;
        }
        .eyebrow {
          color: #39e6b0; font-size: 12px;
          font-weight: 800; letter-spacing: 2px;
        }
        h1 {
          font-size: clamp(43px, 6vw, 72px);
          line-height: 1.04; letter-spacing: -3px;
          margin: 20px 0;
        }
        h1 span { color: #39e6b0; }
        .sub {
          color: #a9b7c9; line-height: 1.8;
          font-size: 17px; max-width: 550px;
        }
        .actions { display: flex; gap: 14px; margin-top: 30px; flex-wrap: wrap; }
        .secondary {
          border: 1px solid #ffffff2a; color: white;
          border-radius: 9px; padding: 13px 20px;
          text-decoration: none; font-weight: 700;
        }
        .visual {
          background: radial-gradient(circle at 70% 10%, #176d6255, transparent 45%), #101e30;
          border: 1px solid #ffffff17; border-radius: 25px;
          padding: 28px; box-shadow: 0 25px 80px #0005;
        }
        .visualtop { display: flex; justify-content: space-between; color: #a9b7c9; font-size: 13px; }
        .cash { font-size: 44px; font-weight: 900; margin: 35px 0 8px; }
        .green { color: #39e6b0; }
        .line {
          height: 8px; background: #24384b;
          border-radius: 20px; margin: 22px 0;
        }
        .line span { display: block; width: 70%; height: 100%; background: #39e6b0; border-radius: 20px; }
        .visualfoot { display: flex; justify-content: space-between; color: #a9b7c9; font-size: 12px; }
        .section { padding: 75px 0; }
        .center { text-align: center; }
        h2 { font-size: clamp(29px, 4vw, 42px); letter-spacing: -1.3px; margin: 12px 0; }
        .muted { color: #9eafc3; line-height: 1.8; }
        .cards {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 18px; margin-top: 38px;
        }
        .card {
          background: #101e30; border: 1px solid #ffffff13;
          padding: 27px; border-radius: 17px;
        }
        .symbol {
          width: 45px; height: 45px; display: grid;
          place-items: center; background: #39e6b01c;
          color: #39e6b0; border-radius: 12px;
          font-size: 22px; margin-bottom: 20px;
        }
        .card h3 { font-size: 19px; margin: 0 0 12px; }
        .card p { color: #9eafc3; line-height: 1.7; font-size: 14px; margin: 0; }
        .broker {
          background: linear-gradient(120deg, #102b35, #102033);
          border: 1px solid #39e6b044; border-radius: 22px;
          padding: 35px; margin-top: 35px;
          display: flex; justify-content: space-between;
          align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .xm {
          font-size: 30px; font-weight: 900; color: white;
          letter-spacing: -1px;
        }
        .pill {
          background: #39e6b01c; color: #39e6b0;
          border-radius: 30px; padding: 8px 13px;
          font-size: 12px; font-weight: 800;
        }
        .steps {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 18px; margin-top: 40px;
        }
        .stepnum { color: #39e6b0; font-size: 14px; font-weight: 900; margin-bottom: 18px; }
        .faq { max-width: 800px; margin: 35px auto 0; text-align: left; }
        details {
          background: #101e30; border: 1px solid #ffffff14;
          border-radius: 12px; margin-bottom: 12px; padding: 20px;
        }
        summary { cursor: pointer; font-weight: 700; list-style: none; }
        summary::-webkit-details-marker { display: none; }
        summary:after { content: "+"; color: #39e6b0; float: right; font-size: 20px; }
        details[open] summary:after { content: "−"; }
        details p { color: #a9b7c9; line-height: 1.8; font-size: 14px; }
        .cta {
          text-align: center; padding: 55px 25px;
          background: linear-gradient(120deg, #123b3c, #102338);
          border: 1px solid #39e6b033; border-radius: 22px;
        }
        footer {
          border-top: 1px solid #ffffff14;
          margin-top: 75px; padding: 30px 0;
          color: #8293a8; font-size: 13px;
          display: flex; justify-content: space-between;
          gap: 15px; flex-wrap: wrap;
        }
        @media(max-width: 750px) {
          .navlinks { gap: 12px; }
          .navlinks a:not(.navbtn) { display: none; }
          .hero { grid-template-columns: 1fr; padding: 65px 0; }
          h1 { letter-spacing: -2px; }
          .cards, .steps { grid-template-columns: 1fr; }
          .section { padding: 55px 0; }
          .visual { padding: 22px; }
        }
      `}</style>

      <div className="container">
        <nav className="nav">
          <div className="logo">RE<span>TRADE</span></div>
          <div className="navlinks">
            <a href="#how">How it works</a>
            <a href="#brokers">Broker</a>
            <a href="#faq">FAQ</a>
            <a href="#how" className="navbtn">Get started</a>
          </div>
        </nav>

        <section className="hero">
          <div>
            <div className="eyebrow">YOUR TRADING. YOUR REWARDS.</div>
            <h1>Trade smart.<br /><span>Get more back.</span></h1>
            <p className="sub">
              Your trading activity deserves more value.
              Track eligible cashback and manage your rewards
              from one simple platform.
            </p>
            <div className="actions">
              <a href="#how" className="primary">Explore Retrade ↗</a>
              <a href="#faq" className="secondary">Learn more</a>
            </div>
            <p className="muted" style={{fontSize:12, marginTop:22}}>
              Starting with XM. More broker options planned.
            </p>
          </div>

          <div className="visual">
            <div className="visualtop">
              <span>RETRADE WALLET</span>
              <span className="green">● Platform preview</span>
            </div>
            <div className="cash">$ --.--</div>
            <div className="muted" style={{fontSize:13}}>Your verified cashback balance</div>
            <div className="line"><span /></div>
            <div className="visualfoot">
              <span>Cashback tracking</span>
              <span>XM first</span>
            </div>
            <p className="muted" style={{fontSize:12, marginTop:25}}>
              Illustrative dashboard preview. No live balance is shown here.
            </p>
          </div>
        </section>

        <section className="section center" id="how">
          <div className="eyebrow">SIMPLE. CLEAR. TRANSPARENT.</div>
          <h2>How Retrade works</h2>
          <p className="muted">A straightforward way to manage your eligible trading cashback.</p>
          <div className="steps">
            <div className="card">
              <div className="stepnum">STEP 01</div>
              <h3>Create your account</h3>
              <p>Set up your personal Retrade profile securely.</p>
            </div>
            <div className="card">
              <div className="stepnum">STEP 02</div>
              <h3>Connect your XM account</h3>
              <p>Submit your eligible trading account details for verification. Never share your trading password.</p>
            </div>
            <div className="card">
              <div className="stepnum">STEP 03</div>
              <h3>Track your cashback</h3>
              <p>Eligible cashback is credited after the related broker commission is received and verified.</p>
            </div>
          </div>
        </section>

        <section className="section" id="brokers">
          <div className="center">
            <div className="eyebrow">OUR FIRST BROKER</div>
            <h2>Starting with XM</h2>
            <p className="muted">We are building the first broker connection around XM.</p>
          </div>
          <div className="broker">
            <div>
              <div className="xm">XM</div>
              <p className="muted">Our first broker for the Retrade platform.</p>
            </div>
            <span className="pill">FIRST BROKER</span>
          </div>
        </section>

        <section className="section">
          <div className="center">
            <div className="eyebrow">WHY RETRADE</div>
            <h2>More clarity. More control.</h2>
          </div>
          <div className="cards">
            <div className="card">
              <div className="symbol">◈</div>
              <h3>One dashboard</h3>
              <p>Keep your cashback activity and account information organized in one place.</p>
            </div>
            <div className="card">
              <div className="symbol">✓</div>
              <h3>Verified cashback</h3>
              <p>Cashback is based on broker commissions actually received and verified.</p>
            </div>
            <div className="card">
              <div className="symbol">♧</div>
              <h3>Account privacy</h3>
              <p>Your MT4 and MT5 trading passwords are not needed to use Retrade.</p>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="center">
            <div className="eyebrow">NEED TO KNOW?</div>
            <h2>Frequently asked questions</h2>
            <p className="muted">Clear answers to common questions about Retrade.</p>
          </div>
          <div className="faq">
            {faqs.map((item, index) => (
              <details key={index}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="eyebrow">YOUR CASHBACK JOURNEY STARTS HERE</div>
          <h2>Make every eligible trade count.</h2>
          <p className="muted">Discover a clearer way to track your trading rewards.</p>
          <a href="#how" className="primary">Explore how it works ↗</a>
        </section>

        <footer>
          <div>© 2026 Retrade. All rights reserved.</div>
          <div>Independent cashback platform. Trading involves risk.</div>
        </footer>
      </div>
    </main>
  );
}
