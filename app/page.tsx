

"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is Retrade?",
    a: "Retrade is a platform designed to help eligible traders receive and manage cashback rewards linked to broker commissions."
  },
  {
    q: "How do I earn cashback?",
    a: "Eligible trading activity may generate broker commissions. Cashback is credited after the corresponding commission has been received and verified."
  },
  {
    q: "Which broker is supported?",
    a: "XM is the initial broker planned for the Retrade launch. Additional broker integrations may be introduced later."
  },
  {
    q: "When will my cashback be credited?",
    a: "Cashback timing depends on broker reporting, commission confirmation and settlement."
  },
  {
    q: "Can I withdraw my cashback?",
    a: "Eligible verified cashback can be requested for withdrawal subject to the platform's withdrawal rules and minimum amount."
  },
  {
    q: "Does Retrade guarantee trading profits?",
    a: "No. Retrade is a cashback platform, not an investment service. Forex and CFD trading involve risk and can result in losses."
  }
];

const styles = `
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#07152b;color:#fff;font-family:Arial,sans-serif}
a{text-decoration:none;color:inherit}
button{font-family:inherit}
.site{background:#07152b;min-height:100vh;overflow:hidden}
.container{width:min(1160px,90%);margin:auto}
.nav{height:82px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ffffff18}
.logo{font-size:27px;font-weight:900;letter-spacing:-1.5px}
.logo span{color:#3b82f6}
.navlinks{display:flex;align-items:center;gap:28px;font-size:14px;color:#cbd5e1}
.navlinks a:hover{color:#60a5fa}
.btn{display:inline-flex;align-items:center;justify-content:center;background:#2563eb;color:white;padding:14px 23px;border-radius:6px;font-weight:800;font-size:14px;border:1px solid #2563eb;transition:.2s;cursor:pointer}
.btn:hover{background:#3b82f6;transform:translateY(-2px)}
.btn-outline{border:1px solid #ffffff45;background:transparent}
.hero{padding:105px 0 100px;display:grid;grid-template-columns:1.05fr .95fr;gap:55px;align-items:center}
.eyebrow{color:#60a5fa;font-size:12px;letter-spacing:2.5px;font-weight:800;text-transform:uppercase}
h1{font-size:clamp(43px,6vw,70px);line-height:1.05;letter-spacing:-3px;margin:22px 0}
h1 span{color:#60a5fa}
.hero p{color:#b6c5d8;font-size:17px;line-height:1.8;max-width:540px}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}
.trustline{margin-top:35px;color:#91a4bd;font-size:12px;letter-spacing:1px}
.hero-card{background:linear-gradient(145deg,#12345d,#0b2140);border:1px solid #31517a;border-radius:18px;padding:30px;box-shadow:0 30px 90px #0005}
.card-head{display:flex;justify-content:space-between;align-items:center;color:#b6c5d8;font-size:13px;gap:10px}
.live{color:#60a5fa;font-size:11px;font-weight:800}
.balance{font-size:43px;font-weight:900;margin:32px 0 5px}
.balance-label{font-size:13px;color:#9eb1ca}
.chart{height:105px;margin:30px 0 22px;display:flex;align-items:end;gap:9px}
.chart i{display:block;flex:1;background:linear-gradient(180deg,#3b82f6,#2563eb55);border-radius:4px 4px 0 0}
.chart i:nth-child(1){height:30%}.chart i:nth-child(2){height:45%}.chart i:nth-child(3){height:38%}.chart i:nth-child(4){height:62%}.chart i:nth-child(5){height:55%}.chart i:nth-child(6){height:76%}.chart i:nth-child(7){height:68%}.chart i:nth-child(8){height:95%}
.card-foot{border-top:1px solid #ffffff20;padding-top:20px;display:flex;justify-content:space-between;color:#a9bad0;font-size:12px;gap:10px}
.section{padding:90px 0}
.section-light{background:#0b1e38}
.center{text-align:center}
h2{font-size:clamp(30px,4vw,45px);letter-spacing:-1.5px;margin:15px 0}
.section-intro{color:#aebed2;line-height:1.8;max-width:650px;margin:0 auto}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.feature{background:#102847;border:1px solid #ffffff16;border-radius:12px;padding:30px;transition:.2s}
.feature:hover{border-color:#3b82f6;transform:translateY(-4px)}
.iconbox{height:48px;width:48px;border-radius:10px;background:#2563eb22;color:#60a5fa;display:grid;place-items:center;font-size:22px;margin-bottom:23px}
.feature h3{font-size:19px;margin:0 0 12px}
.feature p{font-size:14px;line-height:1.8;color:#aebed2;margin:0}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;margin-top:48px;text-align:left}
.step{border-top:2px solid #2563eb;padding-top:23px}
.stepnum{font-size:13px;color:#60a5fa;font-weight:900;letter-spacing:2px}
.step h3{font-size:20px;margin:15px 0 10px}
.step p{color:#aebed2;font-size:14px;line-height:1.8}
.broker-panel{margin-top:45px;padding:38px;background:linear-gradient(110deg,#102f54,#0d2340);border:1px solid #31517a;border-radius:16px;display:flex;align-items:center;justify-content:space-between;gap:25px;flex-wrap:wrap;text-align:left}
.broker-name{font-size:34px;font-weight:900;letter-spacing:-1px}
.broker-name span{color:#60a5fa}
.broker-tag{font-size:12px;color:#aebed2;margin-top:8px}
.status{background:#2563eb22;color:#93c5fd;border:1px solid #2563eb66;padding:9px 14px;border-radius:30px;font-size:12px;font-weight:800}
.split{display:grid;grid-template-columns:1fr 1fr;gap:55px;align-items:center}
.checklist{display:grid;gap:18px;margin-top:28px}
.check{display:flex;gap:14px;align-items:flex-start;color:#d5e0ee;font-size:14px;line-height:1.7}
.check b{color:#60a5fa;font-size:18px}
.info-panel{background:#102847;border:1px solid #ffffff18;border-radius:15px;padding:35px}
.info-panel h3{font-size:24px;margin-top:0}
.info-panel p{color:#aebed2;line-height:1.8;font-size:14px}
.faq{max-width:820px;margin:45px auto 0;text-align:left}
details{background:#102847;border:1px solid #ffffff18;padding:22px;border-radius:9px;margin-bottom:12px}
summary{cursor:pointer;font-weight:700;list-style:none}
summary::-webkit-details-marker{display:none}
summary:after{content:"+";float:right;color:#60a5fa;font-size:21px}
details[open] summary:after{content:"−"}
details p{color:#aebed2;font-size:14px;line-height:1.8;margin-bottom:0}
.cta{padding:75px 25px;text-align:center;background:linear-gradient(120deg,#12345d,#102847);border:1px solid #31517a;border-radius:16px}
.cta p{color:#b6c5d8;line-height:1.8;max-width:570px;margin:15px auto 28px}
footer{padding:38px 0;border-top:1px solid #ffffff18;margin-top:80px}
.footerrow{display:flex;justify-content:space-between;gap:25px;flex-wrap:wrap}
.footertext{font-size:13px;color:#91a4bd;line-height:1.8;max-width:400px}
.footerlinks{display:flex;gap:22px;flex-wrap:wrap;color:#b6c5d8;font-size:13px}
.footerlinks a:hover{color:#60a5fa}
.disclaimer{margin-top:28px;padding-top:20px;border-top:1px solid #ffffff15;color:#71849d;font-size:11px;line-height:1.7}
@media(max-width:800px){
.nav{height:auto;min-height:75px}
.navlinks{gap:13px}
.navlinks a:not(.navbtn){display:none}
.hero{grid-template-columns:1fr;padding:70px 0;gap:40px}
.grid3,.steps{grid-template-columns:1fr}
.split{grid-template-columns:1fr;gap:30px}
.section{padding:65px 0}
h1{letter-spacing:-2px}
.broker-panel{padding:27px}
}
`;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <main className="site">
        <div className="container">
          <nav className="nav">
            <a href="#" className="logo">RE<span>TRADE</span></a>
            <div className="navlinks">
              <a href="#benefits">Benefits</a>
              <a href="#how">How it works</a>
              <a href="#brokers">Brokers</a>
              <a href="#faq">FAQ</a>
              <a href="#how" className="btn navbtn">Get Started</a>
            </div>
          </nav>

          <section className="hero">
            <div>
              <div className="eyebrow">A smarter way to trade</div>
              <h1>Trade more.<br/><span>Get rewarded.</span></h1>
              <p>
                Turn your trading activity into cashback rewards.
                Retrade helps eligible traders receive a share of
                broker commissions through a simple, transparent platform.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#how">Start earning cashback →</a>
                <a className="btn btn-outline" href="#benefits">Discover Retrade</a>
              </div>
              <div className="trustline">TRANSPARENCY · SIMPLICITY · TRADER REWARDS</div>
            </div>

            <div className="hero-card">
              <div className="card-head">
                <span>Retrade Cashback Overview</span>
                <span className="live">● DEMO</span>
              </div>
              <div className="balance">$125.80</div>
              <div className="balance-label">Illustrative cashback balance — not a live account</div>
              <div className="chart">
                <i/><i/><i/><i/><i/><i/><i/><i/>
              </div>
              <div className="card-foot">
                <span>Trading rewards</span>
                <span>Illustrative example</span>
              </div>
            </div>
          </section>
        </div>

        <section className="section section-light" id="benefits">
          <div className="container center">
            <div className="eyebrow">Why Retrade</div>
            <h2>Your trading deserves more.</h2>
            <p className="section-intro">
              A straightforward cashback experience designed to make
              broker rewards easier to understand and manage.
            </p>
            <div className="grid3">
              <article className="feature">
                <div className="iconbox">↗</div>
                <h3>Earn cashback</h3>
                <p>Receive eligible cashback based on verified broker commissions generated by your trading activity.</p>
              </article>
              <article className="feature">
                <div className="iconbox">◎</div>
                <h3>One wallet</h3>
                <p>Keep track of your eligible rewards in one convenient Retrade account.</p>
              </article>
              <article className="feature">
                <div className="iconbox">⌁</div>
                <h3>Clear records</h3>
                <p>Follow your cashback history and understand the status of your rewards and withdrawals.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container center">
            <div className="eyebrow">Simple process</div>
            <h2>How Retrade works</h2>
            <p className="section-intro">
              Three simple steps to get started with eligible trading cashback.
            </p>
            <div className="steps">
              <article className="step">
                <div className="stepnum">STEP 01</div>
                <h3>Create your account</h3>
                <p>Register with Retrade and follow the instructions for linking an eligible broker account.</p>
              </article>
              <article className="step">
                <div className="stepnum">STEP 02</div>
                <h3>Trade with your broker</h3>
                <p>Trade through an eligible linked account under the applicable broker partnership terms.</p>
              </article>
              <article className="step">
                <div className="stepnum">STEP 03</div>
                <h3>Receive verified rewards</h3>
                <p>Eligible cashback is credited after the corresponding broker commission is received and verified.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-light" id="brokers">
          <div className="container center">
            <div className="eyebrow">Broker network</div>
            <h2>Our supported brokers</h2>
            <p className="section-intro">
              We are starting with XM. More broker integrations may be introduced as partnerships become available.
            </p>
            <div className="broker-panel">
              <div>
                <div className="broker-name">XM <span>Partner</span></div>
                <div className="broker-tag">Initial broker launch</div>
              </div>
              <span className="status">INITIAL LAUNCH BROKER</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container split">
            <div>
              <div className="eyebrow">Built around traders</div>
              <h2>A clearer cashback experience.</h2>
              <p className="section-intro" style={{margin:"0",textAlign:"left"}}>
                Retrade is designed to make tracking eligible rewards
                simple, with clear records and a single place to manage
                your cashback activity.
              </p>
              <div className="checklist">
                <div className="check"><b>✓</b><span>One account to manage your Retrade activity.</span></div>
                <div className="check"><b>✓</b><span>Clear cashback transaction history.</span></div>
                <div className="check"><b>✓</b><span>Commission verification before cashback is credited.</span></div>
                <div className="check"><b>✓</b><span>Withdrawal requests with transparent status tracking.</span></div>
              </div>
            </div>
            <div className="info-panel">
              <div className="eyebrow">Our commitment</div>
              <h3>Rewards with transparency.</h3>
              <p>
                Cashback depends on broker commission arrangements,
                account eligibility, trading conditions and successful
                commission settlement. Retrade does not guarantee
                trading profits or returns.
              </p>
              <a href="#faq" className="btn">Learn more</a>
            </div>
          </div>
        </section>

        <section className="section section-light" id="faq">
          <div className="container center">
            <div className="eyebrow">Need answers?</div>
            <h2>Frequently asked questions</h2>
            <p className="section-intro">A few things to know before getting started.</p>
            <div className="faq">
              {faqs.map((faq, index) => (
                <details key={index}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="cta">
              <div className="eyebrow">Make every eligible trade count</div>
              <h2>Ready for a smarter reward experience?</h2>
              <p>
                Discover how Retrade aims to make broker cashback
                clearer, simpler and easier to manage.
              </p>
              <a href="#how" className="btn">Explore how it works →</a>
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="footerrow">
              <div>
                <a href="#" className="logo">RE<span>TRADE</span></a>
                <p className="footertext">
                  A smarter way to track and manage eligible trading cashback.
                </p>
              </div>
              <div className="footerlinks">
                <a href="#benefits">Benefits</a>
                <a href="#how">How it works</a>
                <a href="#brokers">Brokers</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
            <div className="disclaimer">
              Risk warning: Forex and CFD trading involves significant risk
              and may not be suitable for all investors. Cashback is subject
              to eligibility, broker terms, commission receipt and verification.
              Retrade is an independent platform and is not affiliated with
              or endorsed by XM unless a formal partnership is established.
              Broker names are used for identification purposes only.
              <br/><br/>
              © {new Date().getFullYear()} Retrade. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
