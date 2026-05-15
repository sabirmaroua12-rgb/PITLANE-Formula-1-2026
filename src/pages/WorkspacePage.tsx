import { useState } from 'react'
import { Star, Bell, BellOff, TrendingUp, TrendingDown, Plus, Trash2, Eye, BarChart2, FileText, Bookmark } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { watchlistData, marketReports, kpiData, priceHistory } from '../data/marketData'

const savedReports = marketReports.slice(0, 3)

const activityFeed = [
  { type: 'price', text: 'One Manhattan West price updated +2.1%', time: '2h ago', icon: TrendingUp, color: 'var(--green)' },
  { type: 'alert', text: 'Brickell Heights hit your price alert threshold', time: '5h ago', icon: Bell, color: 'var(--orange)' },
  { type: 'report', text: 'New report: Sunbelt Growth Markets Deep Dive', time: '1d ago', icon: FileText, color: 'var(--white-60)' },
  { type: 'price', text: 'Austin Tech Hub up 5.8% — above market avg', time: '2d ago', icon: TrendingUp, color: 'var(--green)' },
  { type: 'save', text: 'You saved "Q4 2025 US Real Estate Market Outlook"', time: '3d ago', icon: Bookmark, color: 'var(--white-60)' },
]

const portfolioMetrics = [
  { label: 'Tracked Properties', value: '3', change: null },
  { label: 'Avg. Watchlist ROI', value: '17.7%', change: 2.3 },
  { label: 'Total Est. Value', value: '$6.97M', change: 3.1 },
  { label: 'Reports Saved', value: '3', change: null },
]

export default function WorkspacePage() {
  const [watchlist, setWatchlist] = useState(watchlistData)
  const [alerts, setAlerts] = useState<Record<number, boolean>>({ 1: true, 2: false, 3: true })
  const [activeTab, setActiveTab] = useState<'watchlist' | 'reports' | 'activity'>('watchlist')

  const removeFromWatchlist = (id: number) => setWatchlist(w => w.filter(p => p.id !== id))
  const toggleAlert = (id: number) => setAlerts(a => ({ ...a, [id]: !a[id] }))

  const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`

  return (
    <div className="page" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '32px 32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, var(--orange), #cc5500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, boxShadow: '0 4px 16px var(--orange-glow)' }}>
                JP
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--white-60)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Personal Workspace</div>
                <h1 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  Jordan Park
                </h1>
                <p style={{ fontSize: 13, color: 'var(--white-60)' }}>Senior Investment Analyst · Pro Plan</p>
              </div>
            </div>
            <button className="btn btn-primary" style={{ fontSize: 13 }}>
              <Plus size={15} /> Add Property to Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 32px' }}>
        {/* Portfolio metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {portfolioMetrics.map(({ label, value, change }) => (
            <div key={label} className="card" style={{ padding: '20px 22px' }}>
              <div style={{ fontSize: 11, color: 'var(--white-60)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>{value}</div>
              {change !== null && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: change >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                  {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {change >= 0 ? '+' : ''}{change}% this month
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main workspace layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          {/* Left panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
              {(['watchlist', 'reports', 'activity'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '10px 20px', fontSize: 13, fontWeight: 600,
                  background: 'none', color: activeTab === tab ? 'var(--white)' : 'var(--white-60)',
                  borderBottom: activeTab === tab ? '2px solid var(--green)' : '2px solid transparent',
                  textTransform: 'capitalize', transition: 'all var(--dur) var(--ease)',
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Watchlist */}
            {activeTab === 'watchlist' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {watchlist.map(p => (
                  <div key={p.id} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{fmt(p.price)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: p.change >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700, fontSize: 15, marginBottom: 8, justifyContent: 'flex-end' }}>
                        {p.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {p.change >= 0 ? '+' : ''}{p.change}%
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button title={alerts[p.id] ? 'Disable alert' : 'Enable alert'}
                          onClick={() => toggleAlert(p.id)}
                          style={{ width: 30, height: 30, borderRadius: 7, background: alerts[p.id] ? 'var(--orange-dim)' : 'rgba(255,255,255,0.06)', border: `1px solid ${alerts[p.id] ? 'rgba(255,107,0,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: alerts[p.id] ? 'var(--orange)' : 'var(--white-60)' }}>
                          {alerts[p.id] ? <Bell size={13} /> : <BellOff size={13} />}
                        </button>
                        <button title="Remove" onClick={() => removeFromWatchlist(p.id)}
                          style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,59,59,0.08)', border: '1px solid rgba(255,59,59,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {watchlist.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--white-60)' }}>
                    <Star size={36} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                    <p style={{ fontSize: 14 }}>Your watchlist is empty.</p>
                  </div>
                )}
              </div>
            )}

            {/* Saved Reports */}
            {activeTab === 'reports' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {savedReports.map(r => (
                  <div key={r.id} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                      <FileText size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{r.title}</h4>
                      <p style={{ fontSize: 11, color: 'var(--white-60)' }}>{r.pages} pages · {r.category}</p>
                    </div>
                    <button style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white-60)' }}>
                      <Eye size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Activity */}
            {activeTab === 'activity' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activityFeed.map(({ text, time, icon: Icon, color }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 10, transition: 'background var(--dur) var(--ease)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0, marginTop: 2 }}>
                      <Icon size={14} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: 'var(--white)', marginBottom: 3, lineHeight: 1.4 }}>{text}</p>
                      <span style={{ fontSize: 11, color: 'var(--white-30)' }}>{time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Mini price chart */}
            <div className="card" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontWeight: 700, fontSize: 14 }}>Your Portfolio vs Market</h3>
                <span className="tag tag-green" style={{ fontSize: 10 }}>Outperforming</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={priceHistory.slice(-6)}>
                  <defs>
                    <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A86B" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#00A86B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
                  <Tooltip contentStyle={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="price" stroke="#00A86B" strokeWidth={2} fill="url(#wg)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick KPIs */}
            <div className="card" style={{ padding: '22px' }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Market Snapshot</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {Object.values(kpiData).slice(0, 4).map(({ label, value, change }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--white-60)' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{value}</span>
                      <span style={{ fontSize: 11, color: change >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                        {change >= 0 ? '+' : ''}{change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic insight */}
            <div style={{ borderRadius: 16, padding: '22px', background: 'linear-gradient(135deg, rgba(0,168,107,0.12), rgba(255,107,0,0.08))', border: '1px solid rgba(0,168,107,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <BarChart2 size={16} color="var(--green)" />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Strategic Insight</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--white)', lineHeight: 1.65, marginBottom: 16 }}>
                Your watchlist is outperforming the national average by <strong style={{ color: 'var(--green)' }}>+4.3%</strong>. Austin Tech Hub shows the strongest momentum with an investment score of 95/100.
              </p>
              <button className="btn btn-primary" style={{ fontSize: 12, padding: '10px 18px' }}>
                View Full Analysis <TrendingUp size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
