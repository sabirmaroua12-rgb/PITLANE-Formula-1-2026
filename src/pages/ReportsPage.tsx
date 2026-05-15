import { useState } from 'react'
import { FileText, Download, Search, TrendingUp, ArrowRight, BarChart2, Globe, Zap } from 'lucide-react'
import {
  ComposedChart, Bar, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { marketReports, forecastData } from '../data/marketData'

const CATEGORIES = ['All', 'National', 'Luxury', 'Commercial', 'Regional', 'Analytics']

const typeIcons: Record<string, typeof FileText> = {
  'Market Report': BarChart2,
  'Investment Guide': TrendingUp,
  'Forecast': Zap,
  'Regional Analysis': Globe,
  'BI Report': BarChart2,
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { dataKey: string; name: string; color?: string; value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{label}</div>
      {payload.map((p: { dataKey: string; name: string; color?: string; value: number }) => (
        <div key={p.dataKey} style={{ fontSize: 14, fontWeight: 700, color: p.color }}>
          {p.name}: {p.value ? `$${p.value}K` : '—'}
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = marketReports.filter(r => {
    const matchCat = category === 'All' || r.category === category
    const matchQ = r.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="page" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '32px 32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="tag tag-orange" style={{ marginBottom: 12 }}><FileText size={10} /> Intelligence Center</div>
              <h1 style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>
                Reports Center
              </h1>
              <p style={{ color: 'var(--white-60)', fontSize: 14 }}>
                Institutional-grade market research · {marketReports.length} reports available
              </p>
            </div>
            <button className="btn btn-orange" style={{ fontSize: 13 }}>
              <Download size={15} /> Download All Reports
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 32px' }}>
        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 28 }}>
          {/* Forecast chart */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Price Forecast 2026–2027</h3>
                <p style={{ fontSize: 12, color: 'var(--white-60)' }}>Proprietary model · 94% historical accuracy</p>
              </div>
              <span className="tag tag-green">+8.5% forecast</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="quarter" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} domain={[530, 640]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="actual" name="Actual" fill="#00A86B" radius={[4, 4, 0, 0]} opacity={0.9} />
                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#FF6B00" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: '#FF6B00', r: 4, strokeWidth: 0 }} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
              {[
                { color: '#00A86B', label: 'Actual price' },
                { color: '#FF6B00', label: 'Forecast (model)', dashed: true },
              ].map(({ color, label, dashed }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--white-60)' }}>
                  <div style={{ width: 20, height: 2, background: color, borderTop: dashed ? '2px dashed' : 'none', borderColor: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* BI summary cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Reports Published', value: '48', sub: 'In 2026 YTD', color: 'var(--green)' },
              { label: 'Markets Covered', value: '200+', sub: 'US metro areas', color: 'var(--orange)' },
              { label: 'Data Points', value: '2.4M', sub: 'Updated daily', color: 'var(--green)' },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--white-60)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color }}>{value}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--white-30)', textAlign: 'right' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search + filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--white-60)' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search reports..."
              style={{ width: '100%', padding: '11px 14px 11px 40px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--white)', fontSize: 13, outline: 'none' }}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--green)'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                background: category === c ? 'var(--orange-dim)' : 'transparent',
                color: category === c ? 'var(--orange)' : 'var(--white-60)',
                border: category === c ? '1px solid rgba(255,107,0,0.4)' : '1px solid var(--border)',
                transition: 'all var(--dur) var(--ease)',
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Reports list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((report, i) => {
            const Icon = typeIcons[report.type] || FileText
            return (
              <div key={report.id} className="card" style={{
                padding: '24px 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 16, flexWrap: 'wrap',
                animation: `fadeUp 0.4s ${i * 0.06}s var(--ease) both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span className="tag tag-muted" style={{ fontSize: 10 }}>{report.type}</span>
                      <span className="tag tag-orange" style={{ fontSize: 10 }}>{report.category}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>{report.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <TrendingUp size={11} /> {report.highlight}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--white-30)', marginBottom: 2 }}>{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div style={{ fontSize: 12, color: 'var(--white-60)' }}>{report.pages} pages</div>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 12, gap: 6, flexShrink: 0 }}>
                    <Download size={13} /> Download
                  </button>
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 12, gap: 6, flexShrink: 0 }}>
                    Read <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
