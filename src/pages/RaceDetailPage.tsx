import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, ChevronLeft, Zap, Wind, Thermometer, Droplets } from 'lucide-react'
import { getRaceBySlug } from '../data/races'

export default function RaceDetailPage() {
  const { raceId } = useParams<{ raceId: string }>()
  const race = getRaceBySlug(raceId ?? '')

  if (!race) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="display" style={{ fontSize: 32, color: 'var(--white-40)', marginBottom: 12 }}>RACE NOT FOUND</div>
        <Link to="/calendrier" className="btn btn-outline-green" style={{ fontSize: 11 }}>← BACK TO CALENDAR</Link>
      </div>
    )
  }

  const isUpcoming = race.status === 'upcoming' || race.status === 'locked'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Back nav */}
      <Link to="/calendrier" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--white-40)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', transition: 'color var(--dur) var(--ease)' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--green)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--white-40)'}
      >
        <ChevronLeft size={12} /> BACK TO CALENDAR
      </Link>

      {/* ── HERO ── */}
      <div className="animate-up" style={{
        borderRadius: 8, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(160deg, rgba(10,10,10,0.8) 0%, rgba(20,20,20,0.7) 60%, rgba(12,26,14,0.9) 100%), url('https://images.unsplash.com/photo-1532986756855-32219eec920b?auto=format&fit=crop&w=2000&q=80') center/cover`,
        border: '1px solid var(--border)',
        minHeight: 200,
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,229,160,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,0.03) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {race.type === 'sprint' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--orange) 0%, transparent 100%)' }} />
        )}
        <div style={{ position: 'relative', padding: '28px 32px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="badge badge-orange" style={{ fontSize: 9 }}>ROUND {String(race.round).padStart(2,'0')} / 2026</span>
            {race.type === 'sprint' && <span className="badge badge-orange" style={{ fontSize: 9 }}><Zap size={8}/> SPRINT WEEKEND</span>}
            <span className="badge" style={{
              background: race.status === 'completed' ? 'var(--green-dim)' : 'var(--orange-dim)',
              color: race.status === 'completed' ? 'var(--green)' : 'var(--orange)',
              border: `1px solid ${race.status === 'completed' ? 'rgba(0,229,160,0.25)' : 'rgba(255,107,0,0.25)'}`,
              fontSize: 9,
            }}>
              {race.status.toUpperCase()}
            </span>
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(32px,5vw,52px)', color: 'var(--white)', marginBottom: 10, lineHeight: 1 }}>
            {race.city} GP
          </h1>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--white-40)' }}>
              <MapPin size={12} color="var(--green)" /> {race.circuit}, {race.country}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--white-40)' }}>
              <Calendar size={12} color="var(--green)" /> {race.dateRange}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 PANEL ROW ── */}
      <div className="grid-3 animate-up d1">

        {/* Telemetry Core */}
        <div className="card card-green-border" style={{ padding: '18px' }}>
          <div className="label" style={{ marginBottom: 12, color: 'var(--green)' }}>TELEMETRY_CORE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            {[
              { label: 'CIRCUIT', val: `${race.distance} KM` },
              { label: 'RACE LAPS', val: `${race.laps} LAPS` },
              { label: 'FORMAT', val: race.type === 'sprint' ? 'SPRINT' : 'STANDARD', highlight: race.type === 'sprint' },
              { label: 'MAX VELOCITY', val: `${race.topSpeed} KM/H` },
            ].map(({ label, val, highlight }) => (
              <div key={label}>
                <div className="label" style={{ marginBottom: 3 }}>{label}</div>
                <div className={`tele-value`} style={{ fontSize: 14, color: highlight ? 'var(--orange)' : 'var(--green)' }}>{val}</div>
              </div>
            ))}
          </div>
          <div className="label" style={{ marginBottom: 6 }}>CIRCUIT LOAD PROGRESS</div>
          <div className="progress-bar" style={{ marginBottom: 4 }}>
            <div className="progress-bar-fill" style={{ width: race.status === 'completed' ? '100%' : '54%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 8, color: 'var(--white-40)' }}>SIMULATION DATA</span>
            <span className="mono" style={{ fontSize: 8, color: 'var(--green)' }}>{race.status === 'completed' ? '100%' : '54%'}</span>
          </div>
        </div>

        {/* Circuit Layout */}
        <div className="card" style={{ padding: '18px', display: 'flex', flexDirection: 'column' }}>
          <div className="label" style={{ marginBottom: 12 }}>LAYOUT_VISUALIZATION_V2.0</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
            <svg viewBox="0 0 100 100" width="160" height="140" fill="none">
              <path d={race.circuitPath} stroke="var(--green)" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="50" cy="20" r="3" fill="var(--orange)" />
            </svg>
          </div>
          <div className="label" style={{ textAlign: 'center', marginTop: 8 }}>
            ELEVATION DELTA: {race.elevation}M
          </div>
        </div>

        {/* Engineering Brief */}
        <div className="card" style={{ padding: '18px', display: 'flex', flexDirection: 'column' }}>
          <div className="label" style={{ marginBottom: 12 }}>ENGINEERING_BRIEF</div>
          <p style={{ fontSize: 13, color: 'var(--white-70)', lineHeight: 1.7, flex: 1 }}>
            The {race.city} circuit represents a {race.type === 'sprint' ? 'fast-paced sprint' : 'technical'} challenge with {race.corners} corners. Engine mode: <span style={{ color: 'var(--green)', fontWeight: 600 }}>{race.engineMode}</span>. Recommended tyre strategy: <span style={{ color: 'var(--orange)' }}>{race.tyreStrategy}</span>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            <button className="btn btn-orange" style={{ fontSize: 11, justifyContent: 'center' }}>
              BOOK GRANDSTAND
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 11, justifyContent: 'center' }}>
              VIP HOSPITALITY
            </button>
          </div>
        </div>
      </div>

      {/* ── CIRCUIT META ── */}
      <div className="card animate-up d2" style={{ padding: '16px 18px' }}>
        <div className="label" style={{ marginBottom: 10 }}>CIRCUIT_META</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: '#HYBRID_STREET', active: race.type === 'sprint' },
            { label: '#ATT_C1CORNER' },
            { label: `#DRS_ZONES_${race.drsZones}`, active: true },
          ].map(({ label, active }) => (
            <span key={label} className={`badge ${active ? 'badge-green' : 'badge-muted'}`} style={{ fontSize: 9 }}>{label}</span>
          ))}
        </div>
      </div>

      {/* ── WEATHER ROW ── */}
      <div className="animate-up d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {[
          { icon: Thermometer, label: 'TEMP_AMBIENT', val: `${race.weather.ambient}°C`, color: 'var(--orange)' },
          { icon: Thermometer, label: 'TEMP_TRACK',   val: `${race.weather.track}°C`,   color: 'var(--red)' },
          { icon: Droplets,    label: 'AIR_HUMIDITY', val: `${race.weather.humidity}%`,  color: 'var(--green)' },
          { icon: Wind,        label: 'WIND_SPEED',   val: `${race.weather.wind} KM/H`,  color: 'var(--white-40)' },
        ].map(({ icon: Icon, label, val, color }) => (
          <div key={label} className="card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon size={16} color={color} />
            <div>
              <div className="label" style={{ marginBottom: 2 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── RESULTS (if completed) ── */}
      {race.status === 'completed' && race.winner && (
        <div className="card animate-up d4" style={{ padding: '18px' }}>
          <div className="label" style={{ marginBottom: 12 }}>RACE_RESULTS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { lbl: '🏆 WINNER', val: race.winner },
              { lbl: '🏁 POLE POSITION', val: race.polePosition ?? '—' },
              { lbl: '⚡ FASTEST LAP', val: race.fastestLap ?? '—' },
            ].map(({ lbl, val }) => (
              <div key={lbl} style={{ padding: '12px', background: 'var(--surface-3)', borderRadius: 6 }}>
                <div className="label" style={{ marginBottom: 6 }}>{lbl}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
