'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <span style={{ color: '#2878f0', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Trader Dashboard
        </span>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '6px 0 8px 0' }}>
          Welcome back, Trader
        </h1>
        <p style={{ color: '#98a5b8', fontSize: '14px', margin: 0 }}>
          XM Broker Ecosystem Connected & Ready
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Available Balance</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#22c55e', margin: 0 }}>$0.00</h2>
        </div>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Total Cashback</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: 0 }}>$0.00</h2>
        </div>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Pending Cashback</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#38bdf8', margin: 0 }}>$0.00</h2>
        </div>
      </div>
    </div>
  );
}
