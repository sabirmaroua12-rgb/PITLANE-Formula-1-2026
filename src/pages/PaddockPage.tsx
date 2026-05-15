import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ChevronRight, ArrowRight } from 'lucide-react'
import { nextRace, completedRaces, races } from '../data/races'

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate])
  return time
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function PaddockPage() {
  const countdown = useCountdown(nextRace?.date ?? '2026-12-31')
  const lastRace = completedRaces[completedRaces.length - 1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── HERO ── */}
      <div className="animate-up" style={{
        position: 'relative', borderRadius: 8, overflow: 'hidden',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #141414 40%, #0c1a10 100%)',
        border: '1px solid var(--border)',
        minHeight: 300,
      }}>
        {/* Dark F1 car silhouette bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%), url('https://images.unsplash.com/photo-1541348263662-e06836264b98?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Green grid lines overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Orange bar left */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--orange)' }} />

        <div style={{ position: 'relative', padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            {/* Live status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              <span className="mono" style={{ color: 'var(--orange)', fontSize: 9 }}>LIVE STATUS: STANDBY</span>
            </div>

            {/* Race name */}
            <h1 className="display" style={{ fontSize: 'clamp(36px, 6vw, 58px)', color: 'var(--white)', marginBottom: 14, lineHeight: 1 }}>
              {nextRace?.name.replace('Grand Prix', '').trim()}<br />
              <span style={{ color: 'var(--green)' }}>Grand Prix</span>
            </h1>
            <p style={{ fontSize: 13, color: 'var(--white-40)', maxWidth: 380, lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: 20 }}>
              Le circuit de {nextRace?.circuit} attend les ingénieurs. Préparez la télémétrie pour l'ouverture de la saison à {nextRace?.city}.
            </p>

            <Link to={`/calendrier/${nextRace?.slug}`} className="btn btn-orange" style={{ fontSize: 11 }}>
              <Zap size={12} /> TRACK PRE-LOAD
            </Link>
          </div>

          {/* Countdown */}
          <div>
            <div className="label" style={{ marginBottom: 8, color: 'var(--orange)' }}>COUNTDOWN TO R{nextRace?.round}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {[
                { val: pad(countdown.d), lbl: 'DAYS' },
                { val: pad(countdown.h), lbl: 'HRS' },
                { val: pad(countdown.m), lbl: 'MIN' },
              ].map(({ val, lbl }, i) => (
                <div key={lbl} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 700, color: 'var(--white)', letterSpacing: '0.04em',
                    background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: 4,
                    border: '1px solid var(--border-2)', minWidth: 52, textAlign: 'center',
                  }}>{val}</div>
                  <div className="label" style={{ marginTop: 4 }}>{lbl}</div>
                  {i < 2 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: 'var(--white-20)', position: 'absolute', marginLeft: -20, marginTop: -32 }}>:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CIRCUIT STATS ROW ── */}
      <div className="grid-3 animate-up d1">
        {/* Circuit card */}
        <div className="card" style={{ 
          padding: '18px', gridColumn: '1',
          background: `linear-gradient(160deg, rgba(10,26,15,0.85) 0%, rgba(15,32,24,0.8) 50%, rgba(10,10,10,0.95) 100%), url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80') center/cover`,
        }}>
          <div className="label" style={{ marginBottom: 8 }}>COURSE À LA UNE</div>
          <div className="display" style={{ fontSize: 22, marginBottom: 2 }}>{nextRace?.city} Circuit</div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            <div>
              <div className="label">DISTANCE</div>
              <div className="tele-value" style={{ fontSize: 13 }}>{nextRace?.distance} KM</div>
            </div>
            <div>
              <div className="label">LAPS</div>
              <div className="tele-value" style={{ fontSize: 13 }}>{nextRace?.laps}</div>
            </div>
          </div>
          <div className="progress-bar" style={{ marginBottom: 4 }}>
            <div className="progress-bar-fill" style={{ width: '72%' }} />
          </div>
          <div className="label">CIRCUIT ANALYSIS: 72%</div>
        </div>

        {/* Lap record */}
        <div className="card" style={{ 
          padding: '18px',
          background: `linear-gradient(160deg, rgba(10,26,15,0.85) 0%, rgba(15,32,24,0.8) 50%, rgba(10,10,10,0.95) 100%), url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80') center/cover`,
        }}>
          <div className="label" style={{ marginBottom: 8 }}>LAP RECORD</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'var(--green)', marginBottom: 4 }}>
            {lastRace?.lapRecord ?? '1:20.235'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--white-40)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
            {lastRace?.lapRecordHolder ?? 'S. Perez'} ({lastRace?.lapRecordYear ?? 2023})
          </div>
          {/* Mini circuit SVG */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60 }}>
            <svg width="80" height="60" viewBox="0 0 100 100" fill="none">
              <path d={nextRace?.circuitPath} stroke="var(--green)" strokeWidth="3" fill="none" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="label" style={{ textAlign: 'center', marginTop: 4 }}>AVG SPEED: {nextRace?.topSpeed ?? 237} KM/H</div>
        </div>

        {/* System telemetry */}
        <div className="card card-green-border" style={{ 
          padding: '18px',
          background: `linear-gradient(160deg, rgba(10,26,15,0.85) 0%, rgba(15,32,24,0.8) 50%, rgba(10,10,10,0.95) 100%), url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80') center/cover`,
        }}>
          <div className="label" style={{ marginBottom: 10 }}>SYSTEM TELEMETRY</div>
          {[
            { label: 'ENGINE SYNC', val: '——', color: 'var(--green)' },
            { label: 'TYRE TEMP', val: 'OPTIMAL', color: 'var(--green)' },
            { label: 'AERO FLOW', val: 'ACTIVE', color: 'var(--green)' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)' }}>{label}</span>
              <span className="mono" style={{ fontSize: 10, color, fontWeight: 700 }}>{val}</span>
            </div>
          ))}
          <div className="divider" style={{ margin: '10px 0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span className="mono" style={{ fontSize: 9, color: 'var(--green)' }}>ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>

      {/* ── RECENT RESULTS + UPDATES ── */}
      <div className="grid-2 animate-up d2">
        {/* Last race result */}
        {lastRace && (
          <div className="card" style={{ 
            padding: '18px',
            background: `linear-gradient(160deg, rgba(10,26,15,0.85) 0%, rgba(15,32,24,0.8) 50%, rgba(10,10,10,0.95) 100%), url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80') center/cover`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div className="label">DERNIÈRE COURSE · R{lastRace.round}</div>
              <span className="badge badge-green">FINISHED</span>
            </div>
            <div className="display" style={{ fontSize: 20, marginBottom: 6 }}>{lastRace.name}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[
                { lbl: 'WINNER', val: lastRace.winner ?? '—' },
                { lbl: 'POLE', val: lastRace.polePosition ?? '—' },
                { lbl: 'FASTEST LAP', val: lastRace.fastestLap ?? '—' },
                { lbl: 'LAP RECORD', val: lastRace.lapRecord },
              ].map(({ lbl, val }) => (
                <div key={lbl}>
                  <div className="label" style={{ marginBottom: 2 }}>{lbl}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>{val}</div>
                </div>
              ))}
            </div>
            <Link to={`/calendrier/${lastRace.slug}`} className="btn btn-outline-green" style={{ fontSize: 11, width: '100%', justifyContent: 'center' }}>
              VIEW RACE DATA <ChevronRight size={12} />
            </Link>
          </div>
        )}

        {/* Technical update */}
        <div className="card" style={{ padding: '18px', background: 'linear-gradient(135deg, var(--surface-2) 0%, #0c1a10 100%)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)' }} />
          <div className="badge badge-orange" style={{ marginBottom: 12 }}>TECHNICAL UPDATE</div>
          <div className="display" style={{ fontSize: 22, marginBottom: 10, lineHeight: 1.1 }}>
            NEW SIDEPOD<br />GEOMETRY FOR R01
          </div>
          <p style={{ fontSize: 12, color: 'var(--white-40)', lineHeight: 1.65, marginBottom: 16 }}>
            Analysis of the new wind tunnel results showing a 0.3s gain in high-speed corners. Full CFD data now available for all registered engineers.
          </p>
          <button className="btn btn-ghost" style={{ fontSize: 11, padding: '7px 14px' }}>
            VIEW FULL SPEC <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── SEASON SNAPSHOT ── */}
      <div className="card animate-up d3" style={{ padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div className="label">2026 SEASON SNAPSHOT</div>
          <Link to="/calendrier" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
            FULL CALENDAR <ChevronRight size={11} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {races.map((r) => (
            <Link key={r.id} to={`/calendrier/${r.slug}`} title={`R${r.round} · ${r.city}`}
              style={{
                width: 28, height: 28, borderRadius: 3,
                background: r.status === 'completed' ? 'var(--green)' : r.status === 'upcoming' ? 'var(--orange)' : r.status === 'live' ? 'var(--red)' : 'var(--surface-3)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700,
                color: r.status === 'completed' ? '#000' : r.status === 'upcoming' ? '#fff' : 'var(--white-40)',
                transition: 'transform var(--dur) var(--ease)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
            >
              {r.round}
            </Link>
          ))}
          {/* Remaining locked slots */}
          {Array.from({ length: 24 - races.length }).map((_, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 3, background: 'var(--surface-3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--white-20)' }}>
              {races.length + i + 1}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          {[
            { color: 'var(--green)', label: 'Completed', count: completedRaces.length },
            { color: 'var(--orange)', label: 'Upcoming', count: races.filter(r => r.status === 'upcoming').length },
            { color: 'var(--surface-3)', label: 'Locked', count: 24 - races.filter(r => r.status !== 'locked').length },
          ].map(({ color, label, count }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: color, display: 'inline-block' }} />
              <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)' }}>{count} {label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
