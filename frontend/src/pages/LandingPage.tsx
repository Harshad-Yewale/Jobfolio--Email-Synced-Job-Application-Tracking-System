import { Link } from 'react-router-dom';

const pipelineStages = [
  { color: 'var(--st-applied)' },
  { color: 'var(--st-received)' },
  { color: 'var(--st-assessment)' },
  { color: 'var(--st-interview)' },
  { color: 'var(--st-offer)' },
  { color: 'var(--st-accepted)' },
];

const mockColumns: { label: string; color: string; cards: { company: string; role: string }[] }[] = [
  { label: 'Applied', color: 'var(--st-applied)', cards: [{ company: 'Infosys', role: 'SDE Intern' }, { company: 'Zoho', role: 'Java Developer' }] },
  { label: 'Interview', color: 'var(--st-interview)', cards: [{ company: 'TCS', role: 'App Developer' }] },
  { label: 'Offer', color: 'var(--st-offer)', cards: [{ company: 'BNP Paribas', role: 'Java Developer' }] },
];

function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav — full width bar */}
      <header style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19, display: 'flex', gap: 8, alignItems: 'center' }}>
            <img src="/logo.png" alt="Jobfolio logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            Jobfolio
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/login" style={{ padding: '8px 16px', fontSize: 13, color: 'var(--ink)', textDecoration: 'none' }}>Log in</Link>
            <Link to="/register" style={{ padding: '8px 16px', fontSize: 13, background: 'var(--accent)', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — full-bleed subtle gradient band */}
      <section style={{ background: 'linear-gradient(180deg, var(--accent-soft) 0%, var(--bg) 65%)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' }}>
              Built for developers who apply to a lot of jobs
            </div>
            <h1 style={{ fontSize: 44, lineHeight: 1.15, marginBottom: 18 }}>
              Stop losing track of where you applied.
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 30, lineHeight: 1.6, maxWidth: 440 }}>
              Jobfolio finds jobs, tracks every application through your pipeline, and
              picks up interview invites and rejections straight from your Gmail — so
              your spreadsheet finally stops lying to you.
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              <Link to="/register" style={{ padding: '13px 26px', background: 'var(--accent)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Get started free
              </Link>
              <Link to="/login" style={{ padding: '13px 26px', background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)', borderRadius: 8, fontSize: 14, textDecoration: 'none' }}>
                I have an account
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 6, height: 48, alignItems: 'flex-end' }}>
              {pipelineStages.map((stage, i) => (
                <div key={i} style={{ width: 32, height: '100%', background: stage.color, borderRadius: 4, transformOrigin: 'bottom', animation: `pipeline-pulse 2.4s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 8 }}>
              applied → received → assessment → interview → offer → accepted
            </div>
          </div>

          <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 14, padding: 20, boxShadow: '0 16px 40px rgba(20,23,31,0.10)' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--st-rejected)' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--st-assessment)' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--st-offer)' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {mockColumns.map((col) => (
                <div key={col.label} style={{ flex: 1, background: 'var(--bg)', borderRadius: 8, padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10, padding: '0 2px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.color }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-soft)' }}>{col.label}</span>
                  </div>
                  {col.cards.map((card, i) => (
                    <div key={i} style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 6, padding: 9, marginBottom: 7 }}>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{card.company}</div>
                      <div style={{ fontSize: 10, color: 'var(--ink-soft)' }}>{card.role}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features — full-bleed panel background */}
      <section style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontSize: 24, textAlign: 'center', marginBottom: 48 }}>Everything the spreadsheet was missing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { title: 'Track every application', desc: 'A Kanban board built for job hunting — drag cards from Applied through Interview to Offer, with a lock so nothing moves by accident.', color: 'var(--st-interview)' },
              { title: 'Search live listings', desc: 'Pull real, current postings from Indeed and LinkedIn without leaving the app, and log one with a single click.', color: 'var(--st-received)' },
              { title: 'Let Gmail catch the updates', desc: 'Connect your inbox once. Interview invites, rejections, and offers get detected and logged automatically.', color: 'var(--st-offer)' },
            ].map((f) => (
              <div key={f.title} style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12, padding: 26 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: f.color, marginBottom: 16 }} />
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spreadsheet vs Jobfolio */}
      <section style={{ padding: '90px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontSize: 24, textAlign: 'center', marginBottom: 8 }}>You could keep using a spreadsheet.</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', textAlign: 'center', marginBottom: 40 }}>Here's what it's not doing for you.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 26 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--ink-soft)' }}>Spreadsheet</div>
              {['You update it manually, or you don\'t', 'Rejection emails get missed in the inbox', 'No view of where things are stuck', 'Searching jobs happens in a separate tab'].map((line) => (
                <div key={line} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>
                  <span style={{ color: 'var(--st-rejected)' }}>✕</span>{line}
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 12, padding: 26 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--accent)' }}>Jobfolio</div>
              {['Gmail updates your pipeline for you', 'Every status change is auto-detected and badged', 'A funnel view shows exactly where you\'re losing momentum', 'Search and apply without leaving the tracker'].map((line) => (
                <div key={line} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink)', marginBottom: 12 }}>
                  <span style={{ color: 'var(--st-offer)' }}>✓</span>{line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — full-bleed panel background */}
      <section style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '90px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontSize: 24, textAlign: 'center', marginBottom: 48 }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              { n: '01', title: 'Search or add a job', desc: 'Find something in Search, or log one manually if you applied elsewhere.' },
              { n: '02', title: 'Drag it through your pipeline', desc: 'Unlock the board and move cards as things progress — nothing changes status by accident while it\'s locked.' },
              { n: '03', title: 'Let Gmail catch the rest', desc: 'Once connected, replies get matched to the right application and logged automatically, with a badge showing what was auto-detected.' },
            ].map((step) => (
              <div key={step.n} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div className="mono" style={{ fontSize: 22, color: 'var(--accent)', fontWeight: 600, width: 44, flexShrink: 0 }}>{step.n}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 5 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — full-bleed dark band */}
      <section style={{ background: 'var(--sidebar)', padding: '90px 0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, color: '#fff', marginBottom: 12 }}>Your next application deserves better than a spreadsheet row.</h2>
          <p style={{ fontSize: 14, color: 'var(--sidebar-text)', marginBottom: 28 }}>Free to use. Takes under a minute to set up.</p>
          <Link to="/register" style={{ padding: '13px 30px', background: 'var(--accent)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            Get started free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 48px', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
          Jobfolio — Spring Boot, React, and a FastAPI scraper doing the boring parts.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;