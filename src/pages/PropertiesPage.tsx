import { useState } from 'react'
import { Search, SlidersHorizontal, Building2, TrendingUp, ArrowUpRight } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import PropertyCard from '../components/PropertyCard'
import { properties, regionalData } from '../data/marketData'

const TYPES = ['All Types', 'Commercial', 'Luxury Residential', 'Residential', 'Mixed Use', 'Industrial']
const SORTS = ['Investment Score', 'Price: Low–High', 'Price: High–Low', 'ROI', 'Yield']

const radarData = [
  { metric: 'Price Growth', value: 82 },
  { metric: 'Yield', value: 76 },
  { metric: 'Liquidity', value: 68 },
  { metric: 'Risk Score', value: 85 },
  { metric: 'Demand', value: 90 },
  { metric: 'Supply', value: 72 },
]

export default function PropertiesPage() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [sort, setSort] = useState('Investment Score')
  const [minScore, setMinScore] = useState(0)

  const filtered = properties
    .filter(p => {
      const matchType = typeFilter === 'All Types' || p.type === typeFilter
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.city.toLowerCase().includes(query.toLowerCase())
      const matchScore = p.score >= minScore
      return matchType && matchQuery && matchScore
    })
    .sort((a, b) => {
      if (sort === 'Investment Score') return b.score - a.score
      if (sort === 'Price: Low–High') return a.price - b.price
      if (sort === 'Price: High–Low') return b.price - a.price
      if (sort === 'ROI') return b.roi - a.roi
      if (sort === 'Yield') return b.yield - a.yield
      return 0
    })

  return (
    <div className="page" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '32px 32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <div className="tag tag-orange" style={{ marginBottom: 12 }}><Building2 size={10} /> Property Intelligence</div>
              <h1 style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>
                Property Insights
              </h1>
              <p style={{ color: 'var(--white-60)', fontSize: 14 }}>
                {filtered.length} properties · Ranked by investment potential
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--green-dim)', border: '1px solid rgba(0,168,107,0.3)', borderRadius: 12, padding: '12px 18px' }}>
              <TrendingUp size={16} color="var(--green)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>Avg. ROI:</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--white)' }}>
                {(properties.reduce((s, p) => s + p.roi, 0) / properties.length).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Search + filters */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
              <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--white-60)' }} />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search by name or city..."
                style={{
                  width: '100%', padding: '11px 14px 11px 40px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                  borderRadius: 10, color: 'var(--white)', fontSize: 13,
                  outline: 'none', transition: 'border var(--dur) var(--ease)',
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--green)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
              />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--white)', fontSize: 13, outline: 'none' }}>
              {TYPES.map(t => <option key={t} value={t} style={{ background: '#1e1e1e' }}>{t}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--white)', fontSize: 13, outline: 'none' }}>
              {SORTS.map(s => <option key={s} value={s} style={{ background: '#1e1e1e' }}>{s}</option>)}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, padding: '0 14px', fontSize: 13, color: 'var(--white-60)' }}>
              <SlidersHorizontal size={14} />
              Score ≥ {minScore}
              <input type="range" min={0} max={90} step={10} value={minScore} onChange={e => setMinScore(Number(e.target.value))}
                style={{ width: 80, accentColor: 'var(--green)' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 32px' }}>
        {/* Analytics row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          {/* Radar - market health */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Market Health Radar</h3>
            <p style={{ fontSize: 12, color: 'var(--white-60)', marginBottom: 16 }}>Composite scoring across 6 investment dimensions</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <Radar dataKey="value" stroke="#00A86B" fill="#00A86B" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {/* Bar - ROI by region */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>YoY Growth by Market</h3>
            <p style={{ fontSize: 12, color: 'var(--white-60)', marginBottom: 16 }}>Annual appreciation rate (%)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={regionalData} barSize={20} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="region" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip formatter={(v: any) => [`${v}%`, 'Growth']} contentStyle={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Bar dataKey="growth" fill="#FF6B00" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Building2 size={48} style={{ color: 'var(--white-30)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No properties found</h3>
            <p style={{ color: 'var(--white-60)' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {filtered.map((p, i) => <PropertyCard key={p.id} prop={p} delay={i * 0.06} />)}
          </div>
        )}
      </div>
    </div>
  )
}
