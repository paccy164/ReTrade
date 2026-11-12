'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [stats] = useState({
    balance: 0,
    totalCashback: 0,
    pendingCashback: 0,
    withdrawn: 0,
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  if (loading) {
    return (
      <div style={{ color: '#98a5b8', textAlign: 'center', padding: '40px' }}>
        Loading overview...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <span style={{ color: '#2878f0', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Trader Dashboard
        </span>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '6px 0 8px 0' }}>
          Welcome back, Trader
        </h1>
        <p style={{ color: '#98a5b8', fontSize: '14px', margin: 0 }}>
          {userEmail} • XM Broker Ecosystem Connected
        </p>
      </div>

      {/* Financial Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Available Balance</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#22c55e', margin: 0 }}>${stats.balance.toFixed(2)}</h2>
        </div>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Total Cashback</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: 0 }}>${stats.totalCashback.toFixed(2)}</h2>
        </div>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Pending Cashback</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#38bdf8', margin: 0 }}>${stats.pendingCashback.toFixed(2)}</h2>
        </div>
        <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#98a5b8', fontSize: '13px', margin: '0 0 8px 0' }}>Total Withdrawn</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: 0 }}>${stats.withdrawn.toFixed(2)}</h2>
        </div>
      </div>

      {/* Connected Trading Accounts */}
      <div style={{ background: '#111722', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Connected Trading Accounts</h3>
          <button style={{ background: '#2878f0', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            + Link Account
          </button>
        </div>
        <p style={{ color: '#98a5b8', fontSize: '14px', margin: 0 }}>
          No trading accounts linked yet. Connect your broker account to start tracking commissions.
        </p>
      </div>
    </div>
  );
}
