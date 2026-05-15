import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plus, ChevronRight, Trash2, Eye } from 'lucide-react'
import { races } from '../data/races'

const INITIAL_FAVORITES = ['bahrain-2026', 'jeddah-2026', 'miami-2026']

export default function GaragePage() {
  const [favorites, setFavorites] = useState<string[]>(INITIAL_FAVORITES)
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all')

  const favRaces = races.filter(r => favorites.includes(r.id))
  const filtered = favRaces.filter(r => filter === 'all' || r.status === filter)
  const remove = (id: string) => setFavorites(f => f.filter(i => i !== id))

  const systemCapacity = Math.round((favorites.length / 30) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div className="animate-up" style={{
        background: 'linear-gradient(160deg, var(--surface-2) 0%, #0a0e0b 100%)',
        border: '1px solid var(--border)', borderRadius: 8,
        padding: '24px 24px 20px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="badge badge-muted" style={{ fontSize: 9 }}>ACTIVE_FILTERS:</span>
          <span className="badge badge-green" style={{ fontSize: 9 }}>{filter.toUpperCase()}_ONLY</span>
        </div>

        <div className="label" style={{ marginBottom: 8 }}>GARAGE ARCHIVE</div>
        <h1 className="display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1, marginBottom: 16, color: 'var(--white)' }}>
          Personal Archive
        </h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['all', 'completed', 'upcoming'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 14px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
              background: filter === f ? 'var(--green)' : 'var(--surface-3)',
              color: filter === f ? '#000' : 'var(--white-40)',
              border: filter === f ? 'none' : '1px solid var(--border)',
              transition: 'all var(--dur) var(--ease)',
            }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Heart size={40} style={{ margin: '0 auto 12px', color: 'var(--white-20)' }} />
          <div className="display" style={{ fontSize: 22, color: 'var(--white-40)', marginBottom: 8 }}>NO RACES SAVED</div>
          <p className="mono" style={{ fontSize: 10, color: 'var(--white-40)', marginBottom: 16 }}>ADD RACES FROM THE CALENDAR</p>
          <Link to="/calendrier" className="btn btn-outline-green" style={{ fontSize: 11 }}>
            OPEN CALENDAR <ChevronRight size={12} />
          </Link>
        </div>
      )}

      {/* Favorite race cards */}
      {filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {filtered.map((race, i) => (
            <div key={race.id} className="card" style={{
              overflow: 'hidden',
              animation: `fadeUp 0.4s ${i * 0.07}s var(--ease) both`,
            }}>
              {/* Race image area */}
              <div style={{
                height: 140, position: 'relative',
                background: race.status === 'completed'
                  ? 'linear-gradient(160deg, #0c1a0f 0%, #081410 100%)'
                  : 'linear-gradient(160deg, #1a0c00 0%, #100808 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 100 100" width="110" height="90" fill="none" opacity={0.6}>
                  <path d={race.circuitPath} stroke={race.status === 'completed' ? 'var(--green)' : 'var(--orange)'} strokeWidth="3" fill="none" strokeLinejoin="round" />
                </svg>

                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <span className={`badge ${race.status === 'completed' ? 'badge-green' : race.status === 'upcoming' ? 'badge-orange' : 'badge-muted'}`} style={{ fontSize: 9 }}>
                    {race.status.toUpperCase()}
                  </span>
                </div>

                {/* Remove button */}
                <button onClick={() => remove(race.id)}
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 26, height: 26, borderRadius: 4,
                    background: 'rgba(225,6,0,0.15)', border: '1px solid rgba(225,6,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--red)', transition: 'all var(--dur) var(--ease)',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(225,6,0,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(225,6,0,0.15)'}
                >
                  <Trash2 size={12} />
                </button>

                {/* Race date */}
                <div style={{ position: 'absolute', bottom: 8, right: 10, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--white-40)' }}>
                  {race.date}
                </div>
              </div>

              {/* Card content */}
              <div style={{ padding: '14px' }}>
                <div className="display" style={{ fontSize: 17, marginBottom: 4 }}>{race.name}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
                  <div>
                    <div className="label" style={{ marginBottom: 2 }}>WINNER</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--white)' }}>{race.winner ?? 'TBD'}</div>
                  </div>
                  <div>
                    <div className="label" style={{ marginBottom: 2 }}>POLE POSITION</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--white)' }}>{race.polePosition ?? 'TBD'}</div>
                  </div>
                </div>

                <Link to={`/calendrier/${race.slug}`}
                  className={`btn ${race.status === 'upcoming' ? 'btn-orange' : 'btn-ghost'}`}
                  style={{ width: '100%', justifyContent: 'center', fontSize: 11, padding: '9px 0' }}>
                  {race.status === 'completed' ? <><Eye size={12}/> VIEW REPLAY & DATA</> : 'PRE-RACE ANALYTICS'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System status bar */}
      <div className="card animate-up d3" style={{
        padding: '12px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: 3, background: 'var(--green-dim)', border: '1px solid rgba(0,229,160,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={10} color="var(--green)" />
          </div>
          <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)' }}>GARAGE_CAPACITY</span>
          <span className="mono" style={{ fontSize: 9, color: 'var(--white)' }}>{String(favorites.length).padStart(2,'0')} / 30 UNITS LOADED</span>
        </div>
        <div>
          <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)' }}>DATA_REDUNDANCY  </span>
          <span className="mono" style={{ fontSize: 9, color: 'var(--green)' }}>OPTIMAL ({systemCapacity}%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ fontSize: 9, color: 'var(--white-40)' }}>TIME_STATUS</span>
          <div className="progress-bar" style={{ width: 60, height: 4 }}>
            <div className="progress-bar-fill" style={{ width: '100%', background: 'var(--green)' }} />
          </div>
          <span className="mono" style={{ fontSize: 9, color: 'var(--green)' }}>ENCRYPTED</span>
        </div>
      </div>

      {/* Add more CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/calendrier" className="btn btn-green" style={{ fontSize: 11 }}>
          <Plus size={14} /> ADD RACE
        </Link>
      </div>
    </div>
  )
}
