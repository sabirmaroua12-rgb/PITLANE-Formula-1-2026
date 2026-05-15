import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BarChart2, Home, Building2, FileText, LayoutDashboard, Bell, User, Menu, X, TrendingUp } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/workspace', label: 'Workspace', icon: BarChart2 },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-h)',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 300ms var(--ease)',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--green), #007a4e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px var(--green-glow)',
            }}>
              <TrendingUp size={18} color="#000" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                Inti<span style={{ color: 'var(--green)' }}>Gravity</span>
              </div>
              <div style={{ fontSize: 9, color: 'var(--white-60)', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 }}>
                PropTech Intelligence
              </div>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
                padding: '8px 16px', borderRadius: 8,
                fontSize: 13, fontWeight: 500,
                color: isActive ? 'var(--white)' : 'var(--white-60)',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'all var(--dur) var(--ease)',
                letterSpacing: '0.01em',
              })}
              onMouseEnter={e => { if (!(e.currentTarget as HTMLElement).style.background.includes('0.08')) (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={e => { if (!(e.currentTarget as HTMLElement).style.background.includes('0.08')) (e.currentTarget as HTMLElement).style.color = 'var(--white-60)' }}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--white-60)', transition: 'all var(--dur) var(--ease)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = 'var(--white-60)' }}
            >
              <Bell size={16} />
            </button>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--orange), #cc5500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 2px 10px var(--orange-glow)',
            }}>
              JP
            </div>
            <button
              style={{ display: 'none', background: 'none', color: 'var(--white)' }}
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 999,
          background: 'rgba(17,17,17,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)', padding: '16px 0',
          animation: 'fadeIn 0.2s var(--ease)',
        }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 24px',
                color: isActive ? 'var(--green)' : 'var(--white-60)',
                fontSize: 15, fontWeight: 500,
                borderLeft: isActive ? '2px solid var(--green)' : '2px solid transparent',
              })}
            >
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
