import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const navSections = [
  {
    label: 'Overview',
    links: [{ to: '/dashboard', label: 'Dashboard' }],
  },
  {
    label: 'Pipeline',
    links: [
      { to: '/search', label: 'Search' },
      { to: '/applications', label: 'Applications' },
      { to: '/saved-jobs', label: 'Saved Jobs' },
    ],
  },
  {
    label: 'Account',
    links: [{ to: '/settings', label: 'Settings' }],
  },
];

function Layout() {
  const { user, logout } = useAuthStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 220,
          background: 'var(--sidebar)',
          color: 'var(--sidebar-text)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          position: 'fixed',
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff', padding: '0 8px' }}>
          Jobfolio
        </div>

        {navSections.map((section) => (
          <div key={section.label}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, padding: '0 8px 8px', opacity: 0.6 }}>
              {section.label}
            </div>
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '8px 8px',
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : 'var(--sidebar-text)',
                  background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 'auto', padding: '0 8px' }}>
          <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>{user?.fullName}</div>
          <div style={{ fontSize: 12, marginBottom: 12 }}>{user?.email}</div>
          <button
            onClick={() => logout()}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--sidebar-text)',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: 13,
              width: '100%',
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: 220, flex: 1, padding: '28px 32px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;