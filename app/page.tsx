
"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is Retrade?",
    a: "Retrade is a trading cashback platform that helps eligible forex traders receive a share of verified broker commissions.",
  },
  {
    q: "How does cashback work?",
    a: "Eligible cashback is calculated after the corresponding broker commission has been received and verified.",
  },
  {
    q: "Can I connect multiple accounts?",
    a: "Yes. You can connect multiple eligible trading accounts under one Retrade profile.",
  },
  {
    q: "What is the minimum withdrawal?",
    a: "The minimum withdrawal amount is $5.",
  },
  {
    q: "Do you need my MT5 password?",
    a: "No. Retrade will never ask for your MT4 or MT5 trading password.",
  },
];

const benefits = [
  ["↗", "Earn while you trade", "Receive a share of eligible broker commissions."],
  ["◈", "One simple wallet", "Track your cashback balance in one place."],
  ["◎", "Multiple accounts", "Connect eligible trading accounts to one profile."],
  ["⌁", "Transparent tracking", "Follow your cashback transactions clearly."],
];

const steps = [
  ["01", "Create your account", "Sign up and create your Retrade profile."],
  ["02", "Connect your broker", "Link your eligible XM trading account."],
  ["03", "Trade as usual", "Continue trading while eligible commissions are tracked."],
  ["04", "Receive cashback", "Verified cashback is credited to your wallet."],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #07090d;
          color: #f7f9fc;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        .site {
          min-height: 100vh;
          background: radial-gradient(ellipse at 75% 8%, rgba(36,123,255,.13), transparent 35%), #07090d;
          overflow: hidden;
        }
        .container { width: min(1160px, calc(100% - 48px)); margin: auto; }
        .navbar {
          height: 88px; display: flex; align-items: center;
          justify-content: space-between; border-bottom: 1px solid #ffffff12;
          position: relative; z-index: 5;
        }
        .brand-logo {
          display: flex; align-items: center; width: 210px;
          height: 68px; flex-shrink: 0; overflow: visible;
        }
        .brand-logo img {
          display: block; width: 100%; height: 100%;
          object-fit: contain; transform: scale(1.15);
          transform-origin: left center;
        }
        .nav-links { display: flex; gap: 28px; color: #aab4c4; font-size: 13px; }
        .nav-links a:hover { color: white; }
        .nav-actions { display: flex; align-items: center; gap: 18px; font-size: 13px; font-weight: 700; }
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 14px 22px; border-radius: 9px;
          font-size: 13px; font-weight: 800; transition: .2s;
        }
        .btn-primary { background: #247bff; color: white; box-shadow: 0 8px 25px #247bff30; }
        .btn-primary:hover { background: #1268ee; transform: translateY(-2px); }
        .btn-outline { border: 1px solid #ffffff2b; color: white; }
        .btn-outline:hover { border-color: #247bff; }
        .hero {
          padding: 95px 0; display: grid; grid-template-columns: 1.05fr .95fr;
          align-items: center; gap: 55px;
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 8px 13px; border: 1px solid #247bff55;
          border-radius: 30px; background: #247bff12;
          color: #80b5ff; font-size: 10px; font-weight: 800;
          letter-spacing: 1.2px; margin-bottom: 24px;
        }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: #398aff; }
        h1, h2, h3 { font-family: 'Manrope', sans-serif; }
        .hero h1 { font-size: clamp(43px, 5.5vw, 67px); line-height: 1.1; letter-spacing: -3px; }
        .gradient {
          background: linear-gradient(95deg, #65adff, #247bff 65%, #9bcaff);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hero-description { color: #929bad; font-size: 15px; line-height: 1.9; max-width: 490px; margin-top: 23px; }
        .hero-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; }
        .hero-note { color: #778398; font-size: 11px; margin-top: 20px; }
        .dashboard {
          padding: 25px; border: 1px solid #ffffff1b; border-radius: 21px;
          background: linear-gradient(145deg, #151e2c, #0b1019);
          box-shadow: 0 30px 80px #0008, 0 0 60px #247bff12;
          position: relative; overflow: hidden;
        }
        .dashboard:before {
          content: ""; position: absolute; width: 220px; height: 220px;
          background: #247bff22; filter: blur(80px); top: -100px; right: -70px;
        }
        .visual-top { display: flex; justify-content: space-between; position: relative; }
        .visual-label { color: #a2aec0; font-size: 12px; }
        .status { color: #65dca6; font-size: 10px; }
        .balance-label { color: #a2aec0; font-size: 12px; margin-top: 30px; position: relative; }
        .balance { font-size: 43px; font-weight: 800; margin-top: 5px; position: relative; }
        .balance-change { color: #55d99b; font-size: 11px; margin-top: 5px; }
        .chart-area { border-top: 1px solid #ffffff14; margin-top: 25px; padding-top: 15px; }
        .chart-caption { display: flex; justify-content: space-between; color: #8995a8; font-size: 10px; margin-bottom: 10px; }
        .chart { width: 100%; height: 120px; display: block; }
        .visual-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 15px; }
        .visual-stat { padding: 14px; border: 1px solid #ffffff13; background: #ffffff06; border-radius: 11px; }
        .visual-stat small { display: block; color: #8995a8; font-size: 10px; margin-bottom: 8px; }
        .visual-stat strong { font-size: 17px; }
        .trust-strip { border-top: 1px solid #ffffff12; border-bottom: 1px solid #ffffff12; padding: 23px 0; }
        .trust-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 18px; }
        .trust-item { color: #aab4c4; font-size: 12px; }
        .trust-item b { color: white; }
        .trust-icon { color: #60a5ff; margin-right: 7px; font-size: 17px; }
        .section { padding: 95px 0; }
        .section-heading { text-align: center; max-width: 650px; margin: 0 auto 48px; }
        .kicker { color: #60a5ff; font-size: 10px; font-weight: 800; letter-spacing: 2px; margin-bottom: 15px; }
        .section-heading h2 { font-size: clamp(30px, 4vw, 43px); line-height: 1.2; letter-spacing: -1.5px; }
        .section-heading p { color: #929bad; font-size: 14px; line-height: 1.8; margin-top: 16px; }
        .benefit-grid, .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .benefit-card, .step-card {
          padding: 25px 21px; border: 1px solid #ffffff12;
          border-radius: 15px; background: linear-gradient(145deg, #121a27, #0b1017);
          transition: .2s;
        }
        .benefit-card:hover, .step-card:hover { transform: translateY(-4px); border-color: #247bff66; }
        .benefit-icon {
          width: 43px; height: 43px; display: grid; place-items: center;
          background: #247bff20; border-radius: 12px; color: #70adff;
          font-size: 22px; margin-bottom: 21px;
        }
        .benefit-card h3, .step-card h3 { font-size: 15px; margin-bottom: 11px; }
        .benefit-card p, .step-card p { color: #929bad; font-size: 12px; line-height: 1.8; }
        .how-section { background: linear-gradient(180deg, transparent, #111e312e, transparent); }
        .step-number { color: #4b96ff; font-size: 27px; font-weight: 800; margin-bottom: 23px; }
        .broker-panel {
          display: grid; grid-template-columns: .8fr 1.2fr; gap: 45px;
          align-items: center; border: 1px solid #ffffff16;
          background: linear-gradient(120deg, #111a29, #0c111a);
          border-radius: 21px; padding: 42px;
        }
        .broker-logo {
          width: 145px; height: 78px; display: grid; place-items: center;
          background: white; color: #111; border-radius: 12px;
          font-size: 33px; font-weight: 900; font-style: italic; margin-bottom: 22px;
        }
        .broker-panel h2 { font-size: 32px; margin-bottom: 13px; }
        .broker-panel p { color: #929bad; font-size: 13px; line-height: 1.8; }
        .broker-features { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .broker-feature { padding: 17px; border: 1px solid #ffffff13; background: #ffffff06; border-radius: 11px; }
        .broker-feature span { display: block; color: #64a7ff; font-size: 19px; margin-bottom: 9px; }
        .broker-feature strong { font-size: 12px; }
        .broker-feature small { display: block; color: #929bad; font-size: 10px; line-height: 1.6; margin-top: 7px; }
        .faq-wrap { max-width: 800px; margin: auto; }
        .faq-item { border-bottom: 1px solid #ffffff17; }
        .faq-question {
          width: 100%; padding: 21px 4px; background: transparent;
          border: 0; color: white; text-align: left; display: flex;
          justify-content: space-between; align-items: center;
          gap: 15px; font-size: 14px; font-weight: 700; cursor: pointer;
        }
        .faq-plus { color: #64a7ff; font-size: 22px; }
        .faq-answer { color: #929bad; font-size: 13px; line-height: 1.8; padding: 0 35px 21px 4px; }
        .cta-panel {
          text-align: center; padding: 70px 25px; border: 1px solid #247bff44;
          border-radius: 21px;
          background: radial-gradient(ellipse at 50% 110%, #247bff33, transparent 65%), #101827;
        }
        .cta-panel h2 { font-size: clamp(30px, 4vw, 43px); letter-spacing: -1.5px; }
        .cta-panel p { color: #929bad; font-size: 14px; line-height: 1.8; max-width: 500px; margin: 16px auto 25px; }
        footer { padding: 48px 0 25px; border-top: 1px solid #ffffff12; margin-top: 90px; }
        .footer-top { display: flex; justify-content: space-between; gap: 35px; padding-bottom: 38px; }
        .footer-description { max-width: 300px; color: #929bad; font-size: 12px; line-height: 1.8; margin-top: 12px; }
        .footer-links { display: flex; gap: 48px; }
        .footer-column strong { display: block; font-size: 12px; margin-bottom: 16px; }
        .footer-column a { display: block; color: #929bad; font-size: 12px; margin-top: 12px; }
        .footer-column a:hover { color: white; }
        .footer-bottom { padding-top: 21px; border-top: 1px solid #ffffff12; display: flex; justify-content: space-between; gap: 15px; color: #778398; font-size: 10px; line-height: 1.7; }

        @media(max-width: 950px) {
          .hero { gap: 30px; }
          .benefit-grid, .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .nav-links { gap: 10px; }
          .broker-panel { gap: 25px; padding: 30px; }
        }
        @media(max-width: 700px) {
          .container { width: calc(100% - 36px); }
          .navbar { height: 75px; }
          .brand-logo {
  width: 190px;
  height: 62px;
}

.brand-logo img {
  transform: scale(1.18);
  transform-origin: left center;
}
          .nav-links { display: none; }
          .nav-actions { gap: 12px; font-size: 12px; }
          .nav-actions .btn { padding: 10px 13px; }
          .hero { grid-template-columns: 1fr; padding: 65px 0; gap: 45px; }
          .hero h1 { font-size: clamp(42px, 11vw, 57px); letter-spacing: -2px; }
          .hero-description { font-size: 14px; }
          .hero-buttons .btn { flex: 1; }
          .section { padding: 72px 0; }
          .trust-inner { justify-content: center; }
          .broker-panel { grid-template-columns: 1fr; padding: 25px; }
          .footer-top { flex-direction: column; }
          .footer-links { width: 100%; justify-content: space-between; gap: 15px; }
          footer { margin-top: 65px; }
          .floating { display: none; }
        }
        @media(max-width: 420px) {
          .container { width: calc(100% - 30px); }
          .brand-logo {
  width: 165px;
  height: 58px;
}
          .nav-actions { gap: 9px; }
          .nav-actions .btn { padding: 9px 10px; font-size: 11px; }
          .benefit-grid, .steps-grid { grid-template-columns: 1fr; }
          .broker-features { gap: 9px; }
          .broker-feature { padding: 12px; }
          .footer-links { gap: 10px; }
          .footer-bottom { flex-direction: column; }
        }
      `}</style>

      <div className="site">
        <div className="container">
          <nav className="navbar">
            <a href="#" className="brand-logo">
              <img
                src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png"
                alt="Retrade"
              />
            </a>

            <div className="nav-links">
              <a href="#benefits">Benefits</a>
              <a href="#how">How it works</a>
              <a href="#brokers">Brokers</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="nav-actions">
              <a href="/login">Login</a>
              <a href="/signup" className="btn btn-primary">Get Started →</a>
            </div>
          </nav>

          <section className="hero">
            <div>
              <div className="eyebrow"><span className="dot" /> SMARTER TRADING. EXTRA REWARDS.</div>
              <h1>Trade More.<br />Get More <span className="gradient">Back.</span></h1>
              <p className="hero-description">
                Turn your trading activity into extra rewards. Retrade helps
                eligible forex traders earn cashback from broker commissions
                while trading as usual.
              </p>
              <div className="hero-buttons">
                <a href="/signup" className="btn btn-primary">Start earning cashback →</a>
                <a href="#how" className="btn btn-outline">Discover how it works</a>
              </div>
              <p className="hero-note">Free to join · No MT4/MT5 password required</p>
            </div>

            <div className="dashboard">
              <div className="visual-top">
                <span className="visual-label">Retrade Wallet</span>
                <span className="status">● Active</span>
              </div>
              <div className="balance-label">Illustrative cashback balance</div>
              <div className="balance">$1,622.80</div>
              <div className="balance-change">↑ Example wallet activity</div>
              <div className="chart-area">
                <div className="chart-caption">
                  <span>Cashback activity</span><span>Illustrative data</span>
                </div>
                <svg className="chart" viewBox="0 0 500 130" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#247bff" stopOpacity=".3" />
                      <stop offset="100%" stopColor="#247bff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 105 C35 100 45 80 80 88 S125 65 155 77 S205 45 240 61 S290 30 320 49 S370 22 405 35 S460 12 500 15 L500 130 L0 130 Z" fill="url(#chartFill)" />
                  <path d="M0 105 C35 100 45 80 80 88 S125 65 155 77 S205 45 240 61 S290 30 320 49 S370 22 405 35 S460 12 500 15" fill="none" stroke="#398bff" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="visual-stats">
                <div className="visual-stat"><small>Example earned cashback</small><strong>$184.50</strong></div>
                <div className="visual-stat"><small>Example transactions</small><strong>24</strong></div>
              </div>
            </div>
          </section>
        </div>

        <div className="trust-strip">
          <div className="container trust-inner">
            <div className="trust-item"><span className="trust-icon">◈</span><b>One wallet</b> for your cashback</div>
            <div className="trust-item"><span className="trust-icon">◎</span><b>Multiple accounts</b></div>
            <div className="trust-item"><span className="trust-icon">⌁</span><b>Verified commissions</b></div>
            <div className="trust-item"><span className="trust-icon">✓</span><b>$5</b> minimum withdrawal</div>
          </div>
        </div>

        <section className="section" id="benefits">
          <div className="container">
            <div className="section-heading">
              <div className="kicker">WHY RETRADE</div>
              <h2>Your trading deserves<br /><span className="gradient">something extra.</span></h2>
              <p>A smarter way to make your trading activity work harder for you, with cashback tracking designed around transparency.</p>
            </div>
            <div className="benefit-grid">
              {benefits.map((item) => (
                <div className="benefit-card" key={item[1]}>
                  <div className="benefit-icon">{item[0]}</div>
                  <h3>{item[1]}</h3>
                  <p>{item[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section how-section" id="how">
          <div className="container">
            <div className="section-heading">
              <div className="kicker">SIMPLE PROCESS</div>
              <h2>Start earning in<br /><span className="gradient">four simple steps.</span></h2>
              <p>Connect your eligible trading account and let verified commissions do the rest.</p>
            </div>
            <div className="steps-grid">
              {steps.map((item) => (
                <div className="step-card" key={item[0]}>
                  <div className="step-number">{item[0]}</div>
                  <h3>{item[1]}</h3>
                  <p>{item[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="brokers">
          <div className="container">
            <div className="broker-panel">
              <div>
                <div className="broker-logo">XM</div>
                <div className="kicker">SUPPORTED BROKER</div>
                <h2>Start with <span className="gradient">XM.</span></h2>
                <p>Retrade is starting with XM. Connect an eligible account through the supported process and track your verified cashback from one place.</p>
                <br />
                <a href="/signup" className="btn btn-primary">Get started →</a>
              </div>
              <div className="broker-features">
                <div className="broker-feature"><span>◈</span><strong>Account linking</strong><small>Connect eligible trading accounts.</small></div>
                <div className="broker-feature"><span>⌁</span><strong>Commission tracking</strong><small>Track commissions after verification.</small></div>
                <div className="broker-feature"><span>◎</span><strong>Wallet overview</strong><small>View cashback activity in one place.</small></div>
                <div className="broker-feature"><span>✓</span><strong>Secure approach</strong><small>No MT4/MT5 password required.</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <div className="section-heading">
              <div className="kicker">GOT QUESTIONS?</div>
              <h2>Frequently asked<br /><span className="gradient">questions.</span></h2>
              <p>Everything you need to know before getting started with Retrade.</p>
            </div>
            <div className="faq-wrap">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={faq.q}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                    {faq.q}
                    <span className="faq-plus">{openFaq === index ? "−" : "+"}</span>
                  </button>
                  {openFaq === index && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container">
          <div className="cta-panel">
            <div className="kicker">YOUR TRADING. EXTRA VALUE.</div>
            <h2>Ready to get more from<br /><span className="gradient">every trade?</span></h2>
            <p>Create your Retrade account and take the first step toward earning cashback on eligible trading activity.</p>
            <a href="/signup" className="btn btn-primary">Create free account →</a>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="footer-top">
              <div>
                <a href="#" className="brand-logo">
                  <img src="https://i.ibb.co/VWm9XpLT/Photoroom-20261112-010447.png" alt="Retrade" />
                </a>
                <p className="footer-description">Retrade helps eligible forex traders receive cashback from verified broker commissions.</p>
              </div>
              <div className="footer-links">
                <div className="footer-column">
                  <strong>Platform</strong>
                  <a href="#benefits">Benefits</a>
                  <a href="#how">How it works</a>
                  <a href="#brokers">Brokers</a>
                </div>
                <div className="footer-column">
                  <strong>Support</strong>
                  <a href="#faq">FAQs</a>
                  <a href="mailto:support@retrade.com">Contact</a>
                  <a href="/login">Login</a>
                </div>
                <div className="footer-column">
                  <strong>Account</strong>
                  <a href="/signup">Create account</a>
                  <a href="/login">Dashboard</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Retrade. All rights reserved.</span>
              <span>Trading involves risk. Cashback is subject to eligibility and verified broker commissions.</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
