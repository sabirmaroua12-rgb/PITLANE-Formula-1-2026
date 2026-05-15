import { NavLink } from 'react-router-dom'
import { TrendingUp, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const links = {
  Platform: [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Properties', to: '/properties' },
    { label: 'Reports', to: '/reports' },
    { label: 'Workspace', to: '/workspace' },
  ],
  Analytics: [
    { label: 'Market Trends', to: '/dashboard' },
    { label: 'Price Forecasts', to: '/reports' },
    { label: 'ROI Calculator', to: '/workspace' },
    { label: 'Heatmaps', to: '/dashboard' },
  ],
  Company: [
    { label: 'About', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
    { label: 'Contact', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black-2)', borderTop: '1px solid var(--border)', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, var(--green), #007a4e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <TrendingUp size={18} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em' }}>
                Inti<span style={{ color: 'var(--green)' }}>Gravity</span>
              </span>
            </div>
            <p style={{ color: 'var(--white-60)', fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
              The world's most advanced real estate business intelligence platform. Data-driven decisions for the modern investor.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--white-60)', transition: 'all var(--dur) var(--ease)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--green)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--white-60)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-30)', marginBottom: 16 }}>
                {section}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(({ label, to }) => (
                  <NavLink key={label} to={to} style={{ fontSize: 14, color: 'var(--white-60)', transition: 'color var(--dur) var(--ease)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--white)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--white-60)'}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'var(--white-30)' }}>© 2026 IntiGravity. All rights reserved.</p>
          <p style={{ fontSize: 13, color: 'var(--white-30)' }}>
            Market data for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
