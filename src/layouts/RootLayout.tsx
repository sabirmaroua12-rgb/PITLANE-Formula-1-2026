import { Outlet, useLocation } from 'react-router-dom'
import { Bell, User } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const breadcrumbs: Record<string, string> = {
  '/':           'DASHBOARD / LE PADDOCK',
  '/calendrier': 'DASHBOARD / CALENDRIER',
  '/mongarage':  'DASHBOARD / MON GARAGE',
  '/masaison':   'DASHBOARD / MA SAISON',
}

export default function RootLayout() {
  const { pathname } = useLocation()
  const basePath = '/' + pathname.split('/')[1]
  const crumb = breadcrumbs[basePath] ?? 'DASHBOARD'

  return (
    <div className="app-shell dot-grid">
      <Sidebar />
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9, letterSpacing: '0.12em',
            color: 'var(--white-40)',
            textTransform: 'uppercase',
          }}>
            {crumb}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[Bell, User].map((Icon, i) => (
              <button key={i} style={{
                width: 28, height: 28, borderRadius: 4,
                background: 'var(--surface-3)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--white-40)', transition: 'all var(--dur) var(--ease)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--green)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--white-40)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
              >
                <Icon size={13} />
              </button>
            ))}
          </div>
        </header>

        {/* Page */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
