
const faqs = [
  {
    q: "What is Retrade?",
    a: "Retrade is a trading cashback platform designed to help eligible traders receive a share of broker commissions generated from their trading activity."
  },
  {
    q: "How does cashback work?",
    a: "When eligible trading activity generates broker commission, Retrade verifies the commission received and calculates the trader's cashback share."
  },
  {
    q: "Do I need to change my broker?",
    a: "You may be able to register through a Retrade referral link or transfer an existing account where the broker permits it."
  },
  {
    q: "When is cashback credited?",
    a: "Cashback is credited after the corresponding broker commission has been received and verified. Processing times may vary."
  },
  {
    q: "Can I connect multiple trading accounts?",
    a: "Yes. Retrade is designed to support multiple eligible trading accounts under one user profile."
  },
  {
    q: "Is Retrade affiliated with XM?",
    a: "Retrade is an independent cashback platform. Broker names and trademarks belong to their respective owners."
  }
];

const benefits = [
  {
    number: "01",
    title: "Earn while you trade",
    description: "Receive cashback from eligible trading activity without changing the way you approach the markets.",
    icon: "↗"
  },
  {
    number: "02",
    title: "One clear wallet",
    description: "Keep your verified cashback and withdrawal history organized in one place.",
    icon: "◈"
  },
  {
    number: "03",
    title: "Full transparency",
    description: "Follow your cashback transactions with a clear record of credits and withdrawals.",
    icon: "◎"
  }
];

const steps = [
  {
    n: "01",
    title: "Create your account",
    description: "Sign up with Retrade and create your personal cashback profile."
  },
  {
    n: "02",
    title: "Connect your broker",
    description: "Register through an eligible referral route or link an existing account where supported."
  },
  {
    n: "03",
    title: "Trade as usual",
    description: "Continue trading through your eligible broker account."
  },
  {
    n: "04",
    title: "Receive cashback",
    description: "Once broker commissions are received and verified, eligible cashback is credited to your wallet."
  }
];

export default function Home() {
  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050505; color: #fff; font-family: 'DM Sans', sans-serif; }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; }

        .rt {
          --bg: #050505;
          --panel: #101010;
          --panel2: #161616;
          --line: rgba(255,255,255,.10);
          --muted: #999;
          --blue: #2478ff;
          --white: #fff;
          overflow: hidden;
          background: var(--bg);
        }

        .container { width: min(1160px, calc(100% - 48px)); margin: auto; }

        .nav {
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        /* RETRADE LOGO */
        .brand-logo {
          display: flex;
          align-items: center;
          width: 190px;
          flex-shrink: 0;
        }

        .brand-logo img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 58px;
          object-fit: contain;
        }

        .nav-links { display: flex; align-items: center; gap: 32px; color: #aaa; font-size: 13px; }
        .nav-links a:hover { color: white; }
        .nav-actions { display: flex; align-items: center; gap: 20px; font-size: 13px; }
        .login { color: #ccc; }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--blue);
          color: white;
          padding: 14px 21px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid var(--blue);
          transition: .2s ease;
          cursor: pointer;
        }

        .btn:hover { background: #1265ed; transform: translateY(-2px); }
        .btn-outline { background: transparent; border-color: rgba(255,255,255,.24); }
        .btn-outline:hover { background: rgba(255,255,255,.08); border-color: white; }
        .eyebrow { color: #65a0ff; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }

        .hero { padding: 88px 0 95px; position: relative; }

        .hero:before {
          content: '';
          position: absolute;
          width: 650px;
          height: 500px;
          right: -170px;
          top: -80px;
          background: radial-gradient(ellipse,rgba(20,91,210,.19),transparent 68%);
          pointer-events: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 65px;
          position: relative;
        }

        h1,h2,h3,p { margin-top: 0; }

        h1 {
          font: 800 clamp(43px,6vw,70px)/1.08 Manrope,sans-serif;
          letter-spacing: -3.7px;
          margin: 23px 0;
        }

        h1 span { color: #6ca5ff; }
        .hero-copy { color: #aaa; font-size: 16px; line-height: 1.85; max-width: 480px; }
        .hero-actions { display: flex; gap: 13px; margin-top: 32px; flex-wrap: wrap; }
        .hero-note { margin-top: 25px; color: #777; font-size: 11px; }

        .hero-visual {
          position: relative;
          padding: 24px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 16px;
          background: linear-gradient(145deg,#171717,#090909);
          box-shadow: 0 30px 90px rgba(0,0,0,.5);
        }

        .visual-top { display: flex; justify-content: space-between; align-items: center; color: #aaa; font-size: 11px; }
        .live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #3bd18a; margin-right: 7px; }
        .balance-label { color: #888; font-size: 12px; margin-top: 28px; }
        .balance { font: 800 39px Manrope,sans-serif; letter-spacing: -1.5px; margin: 7px 0; }
        .balance-sub { font-size: 11px; color: #5bd99a; }
        .chart { width: 100%; height: 145px; margin: 24px 0 10px; }
        .chart svg { width: 100%; height: 100%; overflow: visible; }

        .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .stat {
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 9px;
          padding: 15px;
        }

        .stat small { display: block; color: #888; font-size: 10px; margin-bottom: 8px; }
        .stat strong { font: 700 19px Manrope,sans-serif; }
        .visual-foot { display: flex; justify-content: space-between; color: #777; font-size: 10px; margin-top: 18px; }

        .floating {
          position: absolute;
          right: -25px;
          bottom: 45px;
          padding: 14px 18px;
          border-radius: 10px;
          background: #202020;
          border: 1px solid #343434;
          box-shadow: 0 12px 35px #0008;
          font-size: 11px;
        }

        .floating strong { display: block; color: #5bd99a; font-size: 16px; margin-top: 5px; }

        .trust-strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 25px 0; }
        .trust-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .trust-label { color: #777; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
        .trust-item { color: #bbb; font-size: 13px; font-weight: 700; }
        .trust-item span { color: #666; font-weight: 400; margin-left: 7px; }

        .section { padding: 105px 0; }
        .section-head { max-width: 650px; margin-bottom: 48px; }

        .section-head h2 {
          font: 800 clamp(30px,4vw,45px)/1.18 Manrope,sans-serif;
          letter-spacing: -1.8px;
          margin: 16px 0;
        }

        .section-head p { color: var(--muted); font-size: 14px; line-height: 1.8; }
        .benefit-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 17px; }

        .benefit {
          min-height: 240px;
          padding: 28px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: linear-gradient(145deg,#151515,#0b0b0b);
          transition: .25s ease;
        }

        .benefit:hover { transform: translateY(-5px); border-color: rgba(36,120,255,.55); }

        .benefit-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(36,120,255,.13);
          color: #6ca5ff;
          font-size: 22px;
        }

        .benefit-num { color: #666; font-size: 10px; margin-top: 28px; }
        .benefit h3 { font: 700 19px Manrope,sans-serif; margin: 12px 0; }
        .benefit p { color: #929292; font-size: 13px; line-height: 1.8; margin: 0; }

        .how { background: #0c0c0c; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        .step { padding: 23px 19px; border-top: 1px solid #333; }
        .step-number { color: #5796ff; font: 800 13px Manrope,sans-serif; }
        .step h3 { font: 700 17px Manrope,sans-serif; margin: 22px 0 10px; }
        .step p { color: #929292; font-size: 12px; line-height: 1.8; }

        .broker-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 50px;
          padding: 48px;
          border-radius: 16px;
          border: 1px solid var(--line);
          background: radial-gradient(circle at 90% 20%,rgba(36,120,255,.12),transparent 38%),#101010;
        }

        .broker-box h2 { font: 800 36px Manrope,sans-serif; letter-spacing: -1.5px; margin: 16px 0; }
        .broker-box p { color: #999; line-height: 1.8; font-size: 13px; }

        .broker-logo {
          min-height: 190px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(145deg,#191919,#090909);
          border: 1px solid #292929;
        }

        .xm-word { font: 800 64px Manrope,sans-serif; letter-spacing: -5px; color: white; }
        .xm-word span { color: #e22d3c; }
        .broker-caption { color: #777; font-size: 10px; margin-top: 9px; letter-spacing: 2px; }

        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .faq-item {
          border: 1px solid var(--line);
          border-radius: 9px;
          background: #101010;
          padding: 21px;
        }

        .faq-item summary {
          cursor: pointer;
          list-style: none;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary:after { content: '+'; color: #65a0ff; font-size: 18px; }
        .faq-item[open] summary:after { content: '−'; }
        .faq-item p { color: #999; font-size: 12px; line-height: 1.8; margin: 15px 0 0; }

        .cta { padding: 0 0 100px; }

        .cta-box {
          padding: 65px 30px;
          text-align: center;
          border-radius: 16px;
          border: 1px solid rgba(60,130,255,.28);
          background: radial-gradient(ellipse at center,rgba(30,92,190,.2),transparent 65%),#101010;
        }

        .cta-box h2 { font: 800 clamp(30px,4vw,44px) Manrope,sans-serif; letter-spacing: -1.7px; margin: 17px 0; }
        .cta-box p { color: #999; font-size: 13px; line-height: 1.8; }
        .cta-box .btn { margin-top: 16px; }

        footer { border-top: 1px solid var(--line); padding: 40px 0 25px; }
        .footer-top { display: flex; justify-content: space-between; gap: 35px; flex-wrap: wrap; }
        .footer-desc { color: #777; max-width: 300px; font-size: 12px; line-height: 1.8; margin-top: 15px; }
        .footer-links { display: flex; gap: 25px; color: #999; font-size: 12px; flex-wrap: wrap; }
        .footer-bottom { border-top: 1px solid var(--line); margin-top: 30px; padding-top: 20px; color: #666; font-size: 10px; line-height: 1.8; }

        @media(max-width:850px) {
          .nav-links { display: none; }
          .hero-grid { grid-template-columns: 1fr; gap: 55px; }
          .hero { padding: 65px 0 75px; }
          .hero-visual { max-width: 600px; }
          .benefit-grid { grid-template-columns: 1fr 1fr; }
          .steps { grid-template-columns: 1fr 1fr; }
          .broker-box { grid-template-columns: 1fr; padding: 30px; }
        }

        @media(max-width:560px) {
          .container { width: min(100% - 34px,1160px); }
          .nav { height: 70px; }

          .brand-logo { width: 145px; }
          .brand-logo img { max-height: 48px; }

          .nav-actions { gap: 12px; }
          .nav-actions .login { display: none; }
          .nav-actions .btn { padding: 11px 14px; font-size: 11px; }
          h1 { font-size: 46px; letter-spacing: -2.5px; }
          .hero-copy { font-size: 14px; }
          .hero { padding: 55px 0 65px; }
          .hero-visual { padding: 18px; }
          .balance { font-size: 32px; }
          .floating { right: -7px; bottom: 28px; }
          .trust-inner { justify-content: flex-start; }
          .trust-item { width: calc(50% - 12px); }
          .section { padding: 75px 0; }
          .benefit-grid { grid-template-columns: 1fr; }
          .benefit { min-height: auto; }
          .steps { grid-template-columns: 1fr; gap: 23px; }
          .step { padding: 15px 4px; }
          .faq-grid { grid-template-columns: 1fr; }
          .broker-box { padding: 24px; }
          .broker-box h2 { font-size: 30px; }
          .xm-word { font-size: 54px; }
          .cta { padding-bottom: 70px; }
          .cta-box { padding: 45px 20px; }
          .footer-top { flex-direction: column; }
          .footer-links { gap: 17px; }
        }
      `}</style>

      <div className="rt">
        <div className="container">
          <nav className="nav">
            <a href="#" className="brand-logo">
              <img
                src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png"
                alt="Retrade"
              />
            </a>

            <div className="nav-links">
              <a href="#benefits">Why Retrade</a>
              <a href="#how">How it works</a>
              <a href="#brokers">Brokers</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="nav-actions">
              <a href="/login" className="login">Log in</a>
              <a href="/signup" className="btn">Get started <span>↗</span></a>
            </div>
          </nav>
        </div>

        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">A smarter way to trade</div>
              <h1>Make every trade <span>count.</span></h1>
              <p className="hero-copy">
                Your trading activity can do more. Retrade helps eligible traders
                turn broker commissions into cashback, with a clearer way to
                track what they earn.
              </p>
              <div className="hero-actions">
                <a href="/signup" className="btn">Start earning cashback <span>↗</span></a>
                <a href="#how" className="btn btn-outline">Discover how it works</a>
              </div>
              <div className="hero-note">
                Independent cashback platform · Transparent commission verification
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-top">
                <span>RETRADE WALLET</span>
                <span><i className="live-dot"></i>Illustrative preview</span>
              </div>
              <div className="balance-label">Example cashback balance</div>
              <div className="balance">$125.80</div>
              <div className="balance-sub">↑ Example verified cashback</div>

              <div className="chart">
                <svg viewBox="0 0 500 145" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2478ff" stopOpacity=".35"/>
                      <stop offset="100%" stopColor="#2478ff" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0 115 C35 110 42 90 75 99 S120 105 150 78 S195 91 225 68 S270 83 300 52 S350 65 380 36 S440 49 500 10 L500 145 L0 145 Z" fill="url(#area)"/>
                  <path d="M0 115 C35 110 42 90 75 99 S120 105 150 78 S195 91 225 68 S270 83 300 52 S350 65 380 36 S440 49 500 10" fill="none" stroke="#438cff" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="stat-row">
                <div className="stat">
                  <small>Example cashback earned</small>
                  <strong>$184.50</strong>
                </div>
                <div className="stat">
                  <small>Example withdrawals</small>
                  <strong>$58.70</strong>
                </div>
              </div>
              <div className="visual-foot">
                <span>Illustrative figures only</span>
                <span>Personal wallet preview</span>
              </div>
              <div className="floating">
                Cashback status
                <strong>Commission verified ✓</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="trust-strip">
          <div className="container trust-inner">
            <div className="trust-label">Built around transparency</div>
            <div className="trust-item">01 <span>Verified commissions</span></div>
            <div className="trust-item">02 <span>One cashback wallet</span></div>
            <div className="trust-item">03 <span>Clear transaction history</span></div>
          </div>
        </div>

        <section className="section" id="benefits">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">The Retrade advantage</div>
              <h2>More value from the way you already trade.</h2>
              <p>
                A simple, transparent cashback experience designed to make
                your trading activity more rewarding.
              </p>
            </div>

            <div className="benefit-grid">
              {benefits.map((item) => (
                <div className="benefit" key={item.number}>
                  <div className="benefit-icon">{item.icon}</div>
                  <div className="benefit-num">{item.number} / BENEFIT</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section how" id="how">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Simple by design</div>
              <h2>Four steps. One smarter experience.</h2>
              <p>
                Getting started with Retrade is straightforward.
                Here is how the cashback journey works.
              </p>
            </div>

            <div className="steps">
              {steps.map((step) => (
                <div className="step" key={step.n}>
                  <div className="step-number">{step.n}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="brokers">
          <div className="container">
            <div className="broker-box">
              <div>
                <div className="eyebrow">Our broker network</div>
                <h2>Start with a broker you know.</h2>
                <p>
                  Retrade is beginning with XM. Eligible account connections
                  and cashback depend on broker requirements, referral
                  attribution and verified commission records.
                </p>
                <a href="/signup" className="btn">Get started <span>↗</span></a>
              </div>

              <div className="broker-logo">
                <div style={{textAlign:"center"}}>
                  <div className="xm-word">X<span>M</span></div>
                  <div className="broker-caption">INITIAL BROKER SUPPORT</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Questions, answered</div>
              <h2>Everything you need to know.</h2>
              <p>Some helpful answers before you get started with Retrade.</p>
            </div>

            <div className="faq-grid">
              {faqs.map((faq) => (
                <details className="faq-item" key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-box">
              <div className="eyebrow">Your trading. More value.</div>
              <h2>Ready to make your trades count?</h2>
              <p>
                Join Retrade and discover a clearer way to track eligible
                trading cashback.
              </p>
              <a href="/signup" className="btn">Create your account <span>↗</span></a>
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="footer-top">
              <div>
                <a href="#" className="brand-logo">
                  <img
                    src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png"
                    alt="Retrade"
                  />
                </a>
                <p className="footer-desc">
                  A smarter cashback experience for eligible traders.
                  Built around clarity, transparency and verified commissions.
                </p>
              </div>

              <div className="footer-links">
                <a href="#benefits">Why Retrade</a>
                <a href="#how">How it works</a>
                <a href="#brokers">Brokers</a>
                <a href="#faq">FAQ</a>
                <a href="/login">Log in</a>
              </div>
            </div>

            <div className="footer-bottom">
              © {new Date().getFullYear()} Retrade. All rights reserved.
              <br/>
              Retrade is an independent cashback platform and is not a broker.
              Trading involves risk. Cashback eligibility is subject to broker
              terms, commission receipt and verification. Broker names and
              trademarks belong to their respective owners.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
