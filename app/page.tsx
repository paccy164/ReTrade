
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
      <style>{` }
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
