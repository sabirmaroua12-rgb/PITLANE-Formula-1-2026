import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Lock, Zap } from 'lucide-react'
import { races, type Continent, type RaceType } from '../data/races'

type ContinentFilter = 'all' | Continent
type TypeFilter = 'all' | RaceType

const CONTINENTS: { val: ContinentFilter; label: string }[] = [
  { val: 'all', label: 'ALL' },
  { val: 'europe', label: 'EUROPE' },
  { val: 'americas', label: 'AMERICAS' },
  { val: 'asia', label: 'ASIA' },
  { val: 'middle-east', label: 'MIDDLE EAST' },
  { val: 'oceania', label: 'OCEANIA' },
]



function RaceCard({ race }: { race: typeof races[0] }) {
  const isLocked  = race.status === 'locked'
  const isUpcoming = race.status === 'upcoming'

  return (
    <div className="card" style={{
      overflow: 'hidden',
      opacity: isLocked ? 0.6 : 1,
      transition: 'all var(--dur) var(--ease)',
      position: 'relative',
    }}>
      {/* Track image placeholder */}
      <div style={{
        height: 100,
        background: isLocked
          ? 'linear-gradient(160deg, #111 0%, #1a1a1a 100%)'
          : `linear-gradient(160deg, rgba(10,26,15,0.8) 0%, rgba(15,32,24,0.7) 50%, rgba(10,10,10,0.9) 100%), url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80') center/cover`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Circuit path SVG */}
        {!isLocked && (
          <svg width="90" height="70" viewBox="0 0 100 100" fill="none" opacity={0.5}>
            <path d={race.circuitPath} stroke="var(--green)" strokeWidth="3" fill="none" strokeLinejoin="round" />
          </svg>
        )}
        {isLocked && <Lock size={24} color="rgba(255,255,255,0.15)" />}

        {/* Round badge */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
          color: 'var(--white-40)',
        }}>
          ROUND {String(race.round).padStart(2, '0')}
        </div>

        {/* Date */}
        <div style={{
          position: 'absolute', top: 8, right: 8,
          fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--white-40)',
        }}>
          {race.dateRange}
        </div>

        {/* Sprint badge */}
        {race.type === 'sprint' && !isLocked && (
          <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <span className="badge badge-orange" style={{ fontSize: 8 }}><Zap size={8} /> SPRINT</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '14px' }}>
        <div className="display" style={{ fontSize: 18, marginBottom: 2, color: isLocked ? 'var(--white-40)' : 'var(--white)' }}>
          {race.city}
        </div>
        <div style={{ fontSize: 11, color: 'var(--white-40)', marginBottom: 10, fontFamily: 'var(--font-body)' }}>
          {race.country}
        </div>

        {!isLocked && (
          <>
            {/* Condition bars */}
            {(() => {
              const bars = race.status === 'completed'
                ? [{ label: 'SIMULATION AWARENESS', val: 85 }, { label: 'DATA PROCESSED', val: 100 }]
                : [{ label: 'WEATHER STABILITY', val: 60 }, { label: 'TELEMETRY RELIABILITY', val: 78 }]
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                  {bars.map(({ label, val }) => (
                    <div key={label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span className="label">{label}</span>
                        <span className="mono" style={{ fontSize: 8, color: 'var(--green)' }}>{val}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${val}%`, background: isUpcoming ? 'var(--orange)' : 'var(--green)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}

            <Link to={`/calendrier/${race.slug}`} className={`btn ${isUpcoming ? 'btn-orange' : 'btn-outline-green'}`}
              style={{ width: '100%', justifyContent: 'center', fontSize: 11, padding: '9px 0' }}>
              ANALYZE <ChevronRight size={12} />
            </Link>
          </>
        )}

        {isLocked && (
          <div style={{
            border: '1px solid var(--border)', borderRadius: 4,
            padding: '9px 0', textAlign: 'center',
            fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.08em', color: 'var(--white-20)',
          }}>
            LOCKED
          </div>
        )}
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const [continent, setContinent] = useState<ContinentFilter>('all')
  const [type, setType] = useState<TypeFilter>('all')

  const filtered = races.filter(r => {
    const matchCont = continent === 'all' || r.continent === continent
    const matchType = type === 'all' || r.type === type
    return matchCont && matchType
  })

  const lockedRaces = 24 - races.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="display" style={{ fontSize: 26, marginBottom: 4 }}>
            Season Calendar 2026
          </div>
          <div className="label">{filtered.length} ROUNDS DISPLAYED · 24 TOTAL</div>
        </div>
        {/* Progress */}
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--white-40)', marginBottom: 4 }}>
            SEASON PROGRESS — {races.filter(r => r.status === 'completed').length}/24
          </div>
          <div className="progress-bar" style={{ width: 160, height: 4 }}>
            <div className="progress-bar-fill" style={{ width: `${(races.filter(r => r.status === 'completed').length / 24) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)', marginRight: 4, alignSelf: 'center' }}>CONTINENT:</span>
          {CONTINENTS.map(({ val, label }) => (
            <button key={val} onClick={() => setContinent(val)} style={{
              padding: '5px 12px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
              background: continent === val ? 'var(--green)' : 'var(--surface-3)',
              color: continent === val ? '#000' : 'var(--white-40)',
              border: continent === val ? 'none' : '1px solid var(--border)',
              transition: 'all var(--dur) var(--ease)',
            }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)', marginRight: 4, alignSelf: 'center' }}>TYPE:</span>
          {[{ val: 'all', label: 'ALL' }, { val: 'standard', label: 'STANDARD' }, { val: 'sprint', label: 'SPRINT' }].map(({ val, label }) => (
            <button key={val} onClick={() => setType(val as TypeFilter)} style={{
              padding: '5px 12px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
              background: type === val ? 'var(--green)' : 'var(--surface-3)',
              color: type === val ? '#000' : 'var(--white-40)',
              border: type === val ? 'none' : '1px solid var(--border)',
              transition: 'all var(--dur) var(--ease)',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Race grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
        {filtered.map((race, i) => (
          <div key={race.id} style={{ animation: `fadeUp 0.4s ${i * 0.05}s var(--ease) both` }}>
            <RaceCard race={race} />
          </div>
        ))}
      </div>

      {/* Locked rounds placeholder */}
      {lockedRaces > 0 && continent === 'all' && type === 'all' && (
        <div style={{
          border: '1px dashed var(--border)', borderRadius: 8,
          padding: '32px', textAlign: 'center',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--white-20)', marginBottom: 8 }}>[ ]</div>
          <div className="mono" style={{ color: 'var(--white-40)', fontSize: 10 }}>
            Rounds {races.length + 1}–24 Data Streaming...
          </div>
        </div>
      )}
    </div>
  )
}


