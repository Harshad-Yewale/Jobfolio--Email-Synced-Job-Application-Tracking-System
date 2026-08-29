import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <Link to="/" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: 'var(--ink)', textDecoration: 'none', marginBottom: 28 }}>
          Jobfolio
        </Link>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 14, padding: 32 }}>
          <h2 style={{ fontSize: 19, marginBottom: 4 }}>Welcome back</h2>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 24 }}>Log in to your pipeline.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, display: 'block', marginBottom: 5 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, display: 'block', marginBottom: 5 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            {error && <p style={{ color: 'var(--st-rejected)', fontSize: 13, marginBottom: 14 }}>{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ width: '100%', padding: 11, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ink-soft)' }}>
          No account? <Link to="/register" style={{ color: 'var(--accent)' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;