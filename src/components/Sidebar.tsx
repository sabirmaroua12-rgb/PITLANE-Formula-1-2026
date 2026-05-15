import { NavLink } from 'react-router-dom'
import { Grid2x2, Calendar, Heart, BookOpen, Settings, HelpCircle, Flag } from 'lucide-react'

const navItems = [
  { to: '/',            label: 'Paddock',   icon: Grid2x2,  end: true },
  { to: '/calendrier',  label: 'Calendar',  icon: Calendar, end: false },
  { to: '/mongarage',   label: 'My Garage', icon: Heart,    end: false },
  { to: '/masaison',    label: 'My Season', icon: BookOpen, end: false },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '18px 14px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flag size={14} color="var(--green)" strokeWidth={2.5} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18, fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--green)',
            textTransform: 'uppercase',
          }}>
            Pitlane
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--white-40)', letterSpacing: '0.12em', marginTop: 3 }}>
          F1 · 2026 · SEASON
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 10px',
              borderRadius: 6,
              textDecoration: 'none',
              background: isActive ? 'var(--green)' : 'transparent',
              color: isActive ? '#000' : 'var(--white-40)',
              transition: 'all var(--dur) var(--ease)',
            })}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              if (!el.style.background.includes('var(--green)') && !el.style.background.includes('229')) {
                el.style.background = 'var(--white-10)'
                el.style.color = 'var(--white)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              if (!el.classList.contains('active') && !el.getAttribute('aria-current')) {
                el.style.background = 'transparent'
                el.style.color = 'var(--white-40)'
              }
            }}
          >
            {({ isActive }) => (
              <>
                <Icon size={15} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#000' : undefined} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13, fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: isActive ? '#000' : undefined,
                }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, marginBottom: 2 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 4,
            background: 'var(--green)', color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.05em', flexShrink: 0,
          }}>
            E1
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--white)', letterSpacing: '0.08em' }}>ENGINEER_01</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--white-40)', letterSpacing: '0.06em' }}>Technical Director</div>
          </div>
        </div>

        {[
          { icon: Settings, label: 'Settings' },
          { icon: HelpCircle, label: 'Support' },
        ].map(({ icon: Icon, label }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '8px 10px', borderRadius: 6,
            background: 'none', color: 'var(--white-40)',
            transition: 'all var(--dur) var(--ease)',
            marginBottom: 1,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--white)'; (e.currentTarget as HTMLElement).style.background = 'var(--white-10)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--white-40)'; (e.currentTarget as HTMLElement).style.background = 'none' }}
          >
            <Icon size={13} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
