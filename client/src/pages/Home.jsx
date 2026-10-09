import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  LogOut,
  ShieldCheck,
  Database,
  Key,
  UserCheck,
  Activity,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { authApi } from '../services/api';

export const Home = () => {
  const { user, token, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null);

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVerifySession = async () => {
    setVerifying(true);
    setVerifyStatus(null);
    try {
      const res = await authApi.getProfile();
      setVerifyStatus({
        type: 'success',
        message: `Verified! Session valid for: ${res.data.user.email}`
      });
    } catch (err) {
      setVerifyStatus({
        type: 'error',
        message: err.message || 'Session verification failed'
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Navbar */}
      <header className="glass-panel" style={{
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Compass size={24} color="var(--accent-cyan)" />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.02em',
              color: 'var(--text-main)',
              display: 'block'
            }}>
              NAVAL SOLUTION
            </span>
            <span style={{
              fontSize: '0.78rem',
              color: 'var(--accent-teal)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-teal)',
                boxShadow: '0 0 8px var(--accent-teal)'
              }} />
              OPERATIONAL • AUTHENTICATED
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(8, 14, 27, 0.7)',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem'
          }}>
            <UserCheck size={16} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{user?.email}</span>
          </div>

          <button
            onClick={logout}
            id="logout-button"
            className="btn-secondary"
            title="Log out from session"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Command Deck */}
      <main>
        {/* Welcome Banner */}
        <div className="glass-panel" style={{
          padding: '36px',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(16, 24, 42, 0.9), rgba(14, 30, 56, 0.75))'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(56, 189, 248, 0.1)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '999px',
              marginBottom: '14px'
            }}>
              Protected Route Active
            </span>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '12px',
              color: 'var(--text-main)',
              letterSpacing: '-0.02em'
            }}>
              Welcome to the Command Hub
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              You have successfully authenticated via JWT and Mongoose MongoDB. This homepage is strictly protected by the <code style={{ color: 'var(--accent-cyan)' }}>ProtectedRoute</code> router component.
            </p>
          </div>
        </div>

        {/* Status Grid Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}>
          {/* Card 1: User Profile */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                background: 'rgba(56, 189, 248, 0.12)',
                padding: '10px',
                borderRadius: '10px'
              }}>
                <UserCheck size={22} color="var(--accent-cyan)" />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Authenticated User</h2>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>EMAIL</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{user?.email}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>OBJECT ID</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-main)' }}>{user?._id}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Security & JWT */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                background: 'rgba(99, 102, 241, 0.12)',
                padding: '10px',
                borderRadius: '10px'
              }}>
                <ShieldCheck size={22} color="var(--accent-indigo)" />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Security Protocol</h2>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>ENCRYPTION</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Bcrypt (Salt 10 Rounds)</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>TOKEN STANDARD</span>
                <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>JSON Web Token (HMAC SHA256)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Database & Backend */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                background: 'rgba(20, 184, 166, 0.12)',
                padding: '10px',
                borderRadius: '10px'
              }}>
                <Database size={22} color="var(--accent-teal)" />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Database Status</h2>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>ENGINE</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Local MongoDB via Mongoose</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>PORT / HOST</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>127.0.0.1:27017</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Inspection & Interactive Actions */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key size={20} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Bearer Token</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleVerifySession}
                disabled={verifying}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              >
                <RefreshCw size={14} className={verifying ? 'animate-spin' : ''} />
                <span>{verifying ? 'Verifying...' : 'Test /api/auth/me'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyToken}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              >
                {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Token'}</span>
              </button>
            </div>
          </div>

          <div style={{
            background: 'rgba(6, 10, 20, 0.85)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            color: 'var(--accent-cyan)',
            wordBreak: 'break-all',
            lineHeight: 1.5
          }}>
            {token}
          </div>

          {verifyStatus && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              background: verifyStatus.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
              border: `1px solid ${verifyStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              color: verifyStatus.type === 'success' ? '#6ee7b7' : '#fca5a5',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Activity size={16} />
              <span>{verifyStatus.message}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
