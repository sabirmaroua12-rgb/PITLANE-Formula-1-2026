import { properties } from '../data/marketData'
import { TrendingUp, MapPin, Maximize2 } from 'lucide-react'

const typeColors: Record<string, string> = {
  'Commercial': 'var(--orange)',
  'Luxury Residential': '#a78bfa',
  'Residential': '#60a5fa',
  'Mixed Use': 'var(--green)',
  'Industrial': '#f59e0b',
}

const typeBg: Record<string, string> = {
  'Commercial': 'var(--orange-dim)',
  'Luxury Residential': 'rgba(167,139,250,0.12)',
  'Residential': 'rgba(96,165,250,0.12)',
  'Mixed Use': 'var(--green-dim)',
  'Industrial': 'rgba(245,158,11,0.12)',
}

const scoreColor = (s: number) => s >= 90 ? 'var(--green)' : s >= 80 ? 'var(--orange)' : 'var(--white-60)'

interface PropertyCardProps {
  prop: typeof properties[0]
  delay?: number
}

export default function PropertyCard({ prop, delay = 0 }: PropertyCardProps) {
  const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`

  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden',
      animation: `fadeUp 0.5s ${delay}s var(--ease) both`,
    }}>
      {/* Property visual */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Property image */}
        <img 
          src={`/images/${prop.img}.png`} 
          alt={prop.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 0 }} 
        />
        {/* Overlay gradient for better text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)', zIndex: 1 }} />

        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <span className="tag" style={{
            background: typeBg[prop.type] || 'rgba(255,255,255,0.1)',
            color: typeColors[prop.type] || 'var(--white)',
          }}>
            {prop.tag}
          </span>
        </div>
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          borderRadius: 8, padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 13, fontWeight: 700, color: scoreColor(prop.score),
        }}>
          {prop.score}
          <span style={{ fontSize: 10, color: 'var(--white-60)', fontWeight: 400 }}>/ 100</span>
        </div>
        {prop.status === 'Hot Deal' && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
            background: 'linear-gradient(90deg, var(--orange) 0%, transparent 100%)',
            height: 3,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 22px' }}>
        <div style={{ marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: typeColors[prop.type] || 'var(--white-60)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {prop.type}
          </span>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>{prop.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--white-60)', fontSize: 13, marginBottom: 16 }}>
          <MapPin size={12} />
          {prop.city}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Yield', value: `${prop.yield}%`, good: prop.yield > 6 },
            { label: 'ROI', value: `${prop.roi}%`, good: prop.roi > 15 },
          ].map(({ label, value, good }) => (
            <div key={label} style={{ background: 'var(--black-2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: 'var(--white-30)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: good ? 'var(--green)' : 'var(--white)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {good && <TrendingUp size={12} />}{value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{fmt(prop.price)}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--white-60)' }}>
              <Maximize2 size={11} />{prop.size.toLocaleString()} sq.ft
            </div>
          </div>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 12 }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
