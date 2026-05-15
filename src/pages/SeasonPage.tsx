import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plus, CheckCircle2, Circle, ChevronDown, Edit3 } from 'lucide-react'
import { races } from '../data/races'

interface WatchEntry {
  raceId: string
  watched: boolean
  rating: number
  notes: string
}

const INITIAL_WATCHED: WatchEntry[] = [
  { raceId: 'bahrain-2026', watched: true,  rating: 5, notes: 'Incredible overtake by Verstappen in lap 42. Perfect strategy call by the team.' },
  { raceId: 'jeddah-2026',  watched: true,  rating: 4, notes: 'Norris holding off the pack in the final 10 laps was breathtaking.' },
  { raceId: 'miami-2026',   watched: true,  rating: 5, notes: 'Sprint format worked perfectly here. Leclerc dominant all weekend.' },
]

const UPCOMING_WATCHES: WatchEntry[] = [
  { raceId: 'madrid-2026', watched: false, rating: 0, notes: '' },
]

export default function SeasonPage() {
  const [entries, setEntries] = useState<WatchEntry[]>([...INITIAL_WATCHED])
  const [editingId, setEditingId] = useState<string | null>('madrid-2026')
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({})

  const watchedCount = entries.filter(e => e.watched).length
  const totalRaces = 24

  const getRace = (id: string) => races.find(r => r.id === id)

  const saveNote = (raceId: string) => {
    setEntries(e => e.map(en => en.raceId === raceId ? { ...en, notes: notesDraft[raceId] ?? en.notes } : en))
    setEditingId(null)
  }

  const stats = [
    { label: 'Track Time Logged', val: `${watchedCount * 1.6 + 45.3} hrs`, color: 'var(--green)' },
    { label: 'Notes Recorded', val: `${entries.filter(e => e.notes).length * 4} entries`, color: 'var(--green)' },
    { label: 'Points Accuracy', val: '82%', color: 'var(--orange)' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div className="animate-up" style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8,
        padding: '20px 22px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="label" style={{ marginBottom: 4, color: 'var(--white-40)' }}>MISSION STATUS</div>
            <h1 className="display" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--white)', marginBottom: 10 }}>
              Season Journal
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--white-40)', marginBottom: 4 }}>
              <span style={{ color: 'var(--green)', fontSize: 16 }}>{watchedCount}/{totalRaces}</span> ROUNDS WATCHED
            </div>
            <div className="progress-bar" style={{ width: 180, height: 5 }}>
              <div className="progress-bar-fill" style={{ width: `${(watchedCount / totalRaces) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        {/* Left: Journal entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Upcoming/active race (featured) */}
          {UPCOMING_WATCHES.map(entry => {
            const race = getRace(entry.raceId)
            if (!race) return null
            return (
              <div key={entry.raceId} className="card" style={{
                overflow: 'hidden', border: '1px solid rgba(255,107,0,0.3)',
                animation: 'fadeUp 0.4s var(--ease) both',
              }}>
                {/* Image area */}
                <div style={{
                  height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(160deg, #1a0c00 0%, #0f0a00 100%)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <svg viewBox="0 0 100 100" width="90" height="80" fill="none" opacity={0.5}>
                    <path d={race.circuitPath} stroke="var(--orange)" strokeWidth="3" fill="none" strokeLinejoin="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6) 100%)' }} />
                  <div style={{ position: 'absolute', top: 8, left: 8 }}>
                    <span className="mono" style={{ fontSize: 8, color: 'var(--white-40)' }}>ROUND {String(race.round).padStart(2,'0')}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    <span className="badge badge-orange" style={{ fontSize: 9 }}>NEXT UP</span>
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <div className="display" style={{ fontSize: 20, marginBottom: 6 }}>{race.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--white-40)', marginBottom: 14 }}>
                    {race.circuit} · {race.dateRange}
                  </div>

                  {/* Notes textarea */}
                  <div className="label" style={{ marginBottom: 6 }}>PRE-RACE NOTES & PREDICTIONS</div>
                  <textarea
                    placeholder="Enter engineering notes or race predictions..."
                    value={notesDraft[entry.raceId] ?? entry.notes}
                    onChange={e => setNotesDraft(d => ({ ...d, [entry.raceId]: e.target.value }))}
                    style={{
                      width: '100%', minHeight: 80, padding: '10px 12px',
                      background: 'var(--surface-3)', border: '1px solid var(--border)',
                      borderRadius: 6, color: 'var(--white-70)', fontSize: 12,
                      resize: 'vertical', outline: 'none', lineHeight: 1.6,
                      transition: 'border var(--dur) var(--ease)',
                    }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--orange)'}
                    onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>
            )
          })}

          {/* Watched races */}
          {entries.map((entry, i) => {
            const race = getRace(entry.raceId)
            if (!race) return null
            const isEditing = editingId === entry.raceId

            return (
              <div key={entry.raceId} className="card" style={{
                overflow: 'hidden',
                animation: `fadeUp 0.4s ${(i + 1) * 0.07}s var(--ease) both`,
              }}>
                <div style={{ display: 'flex', gap: 0 }}>
                  {/* Status stripe */}
                  <div style={{ width: 3, background: 'var(--green)', flexShrink: 0 }} />

                  {/* Thumbnail */}
                  <div style={{
                    width: 120, flexShrink: 0,
                    background: 'linear-gradient(160deg, #0c1a0f 0%, #081410 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <svg viewBox="0 0 100 100" width="70" height="60" fill="none" opacity={0.55}>
                      <path d={race.circuitPath} stroke="var(--green)" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
                    </svg>
                    <div style={{ position: 'absolute', top: 6, left: 6 }}>
                      <span className="mono" style={{ fontSize: 7, color: 'var(--white-40)' }}>R{race.round}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="display" style={{ fontSize: 15, marginBottom: 2 }}>{race.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--white-40)', marginBottom: 8 }}>
                          WINNER: <span style={{ color: 'var(--white)', fontWeight: 600 }}>{race.winner ?? '—'}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <span className="badge badge-green" style={{ fontSize: 8 }}>WATCHED</span>
                        <button onClick={() => { setEditingId(isEditing ? null : entry.raceId); setNotesDraft(d => ({ ...d, [entry.raceId]: entry.notes })) }}
                          style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--surface-3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white-40)' }}>
                          <Edit3 size={11} />
                        </button>
                      </div>
                    </div>

                    {isEditing ? (
                      <div>
                        <textarea
                          value={notesDraft[entry.raceId] ?? entry.notes}
                          onChange={e => setNotesDraft(d => ({ ...d, [entry.raceId]: e.target.value }))}
                          style={{ width: '100%', minHeight: 60, padding: '8px 10px', background: 'var(--surface-3)', border: '1px solid var(--green)', borderRadius: 5, color: 'var(--white-70)', fontSize: 11, resize: 'vertical', outline: 'none' }}
                        />
                        <button onClick={() => saveNote(entry.raceId)} className="btn btn-green" style={{ fontSize: 10, padding: '6px 12px', marginTop: 6 }}>
                          SAVE NOTE
                        </button>
                      </div>
                    ) : (
                      entry.notes && (
                        <p style={{ fontSize: 11, color: 'var(--white-40)', lineHeight: 1.6, fontStyle: 'italic' }}>
                          "{entry.notes}"
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Load more */}
          <button className="btn btn-ghost" style={{ alignSelf: 'center', fontSize: 11, marginTop: 4 }}>
            <ChevronDown size={13} /> LOAD PREVIOUS ROUNDS
          </button>
        </div>

        {/* Right: Stats panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Season stats */}
          <div className="card animate-up d1" style={{ padding: '16px' }}>
            <div className="label" style={{ marginBottom: 12 }}>SEASON TELEMETRY</div>
            {stats.map(({ label, val, color }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span className="label">{label}</span>
                  <span className="tele-value" style={{ fontSize: 12, color }}>{val}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '78%', background: color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Most liked */}
          <div className="card animate-up d2" style={{ padding: '16px' }}>
            <div className="label" style={{ marginBottom: 10 }}>MOST LIKED</div>
            {entries.filter(e => e.rating >= 5).slice(0, 1).map(entry => {
              const race = getRace(entry.raceId)
              if (!race) return null
              return (
                <div key={entry.raceId}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: '#000' }}>
                      R{race.round}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{race.city} GP</div>
                      <div className="mono" style={{ fontSize: 8, color: 'var(--white-40)' }}>{race.date}</div>
                    </div>
                  </div>
                  <Link to={`/calendrier/${race.slug}`} className="btn btn-green" style={{ width: '100%', justifyContent: 'center', fontSize: 10, padding: '8px 0' }}>
                    SEE AGAIN
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Season checklist */}
          <div className="card animate-up d3" style={{ padding: '16px' }}>
            <div className="label" style={{ marginBottom: 10 }}>ROUND TRACKER</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {races.slice(0, 6).map(race => {
                const isWatched = entries.some(e => e.raceId === race.id && e.watched)
                return (
                  <div key={race.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isWatched
                      ? <CheckCircle2 size={13} color="var(--green)" />
                      : <Circle size={13} color="var(--white-20)" />}
                    <span style={{ fontSize: 11, color: isWatched ? 'var(--white)' : 'var(--white-40)', fontFamily: 'var(--font-body)' }}>
                      R{race.round} · {race.city}
                    </span>
                  </div>
                )
              })}
              <div style={{ fontSize: 10, color: 'var(--white-20)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                + {24 - 6} MORE ROUNDS...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
