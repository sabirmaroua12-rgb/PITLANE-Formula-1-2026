import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Building2, DollarSign, Activity, Globe, BarChart2, Zap, Shield, ChevronRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import KPICard from '../components/KPICard'
import { priceHistory, kpiData, regionalData } from '../data/marketData'

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return { count, ref }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-2)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ fontSize: 12, color: 'var(--white-60)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)' }}>${payload[0].value}K</div>
    </div>
  )
}

export default function HomePage() {
  const c1 = useCounter(1830)
  const c2 = useCounter(94)
  const c3 = useCounter(6800)

  return (
    <div className="page">
      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,168,107,0.12) 0%, transparent 70%), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1541348263662-e06836264b98?auto=format&fit=crop&q=80') center/cover`,
        position: 'relative', overflow: 'hidden', paddingTop: 80,
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,168,107,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <div className="animate-up" style={{ marginBottom: 20 }}>
              <span className="tag tag-green" style={{ fontSize: 11 }}>
                <Activity size={10} /> Live Market Intelligence Platform
              </span>
            </div>
            <h1 className="animate-up delay-1" style={{
              fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 24,
            }}>
              Real Estate
              <span style={{ display: 'block', color: 'var(--green)' }}>Intelligence,</span>
              Redefined.
            </h1>
            <p className="animate-up delay-2" style={{
              fontSize: 18, color: 'var(--white-60)', lineHeight: 1.7,
              maxWidth: 560, margin: '0 auto 40px',
            }}>
              IntiGravity delivers institutional-grade market analytics, property intelligence, and investment insights for the world's most demanding real estate professionals.
            </p>
            <div className="animate-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
                Open Dashboard <ArrowRight size={16} />
              </Link>
              <Link to="/properties" className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 28px' }}>
                Explore Properties <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Mini KPI strip */}
          <div className="animate-up delay-4" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
            maxWidth: 720, margin: '72px auto 0',
          }}>
            {[
              { ref: c1.ref, count: c1.count, prefix: '$', suffix: 'B+', label: 'Market Volume Tracked', color: 'var(--green)' },
              { ref: c2.ref, count: c2.count, prefix: '', suffix: '%', label: 'Forecast Accuracy', color: 'var(--orange)' },
              { ref: c3.ref, count: c3.count, prefix: '', suffix: '+', label: 'Properties Indexed', color: 'var(--green)' },
            ].map(({ ref, count, prefix, suffix, label, color }) => (
              <div key={label} ref={ref} style={{
                textAlign: 'center', padding: '24px 16px',
                background: 'rgba(255,255,255,0.04)', borderRadius: 16,
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', color, lineHeight: 1 }}>
                  {prefix}{count.toLocaleString()}{suffix}
                </div>
                <div style={{ fontSize: 12, color: 'var(--white-60)', marginTop: 8, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET OVERVIEW */}
      <section className="section" style={{ background: 'var(--black-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="tag tag-green" style={{ marginBottom: 12 }}>Market Overview</div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Key Performance<br />Indicators
              </h2>
            </div>
            <Link to="/dashboard" className="btn btn-ghost" style={{ fontSize: 13 }}>
              Full Dashboard <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 32 }}>
            <KPICard label={kpiData.avgPrice.label} value={kpiData.avgPrice.value} change={kpiData.avgPrice.change} icon={<DollarSign size={15} />} delay={0} />
            <KPICard label={kpiData.totalVolume.label} value={kpiData.totalVolume.value} change={kpiData.totalVolume.change} icon={<Activity size={15} />} delay={0.1} />
            <KPICard label={kpiData.avgYield.label} value={kpiData.avgYield.value} change={kpiData.avgYield.change} icon={<TrendingUp size={15} />} delay={0.2} />
          </div>

          {/* Price trend chart */}
          <div className="card" style={{ padding: '28px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Average Price Trend</h3>
                <p style={{ fontSize: 13, color: 'var(--white-60)' }}>12-month property price index (USD thousands)</p>
              </div>
              <span className="tag tag-green">+8.4% YTD</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={priceHistory} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00A86B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00A86B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="price" stroke="#00A86B" strokeWidth={2.5} fill="url(#priceGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* REGIONAL HIGHLIGHTS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag tag-orange" style={{ marginBottom: 12 }}>Regional Intelligence</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Top Performing Markets
            </h2>
          </div>
          <div className="grid-3">
            {regionalData.map((r, i) => (
              <div key={r.region} className="card" style={{
                padding: '24px', animation: `fadeUp 0.5s ${i * 0.08}s var(--ease) both`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{r.region}</h3>
                    <div style={{ fontSize: 12, color: 'var(--white-60)' }}>Avg. ${r.value}M · Cap {r.cap}%</div>
                  </div>
                  <span className="tag tag-green" style={{ fontSize: 11 }}>+{r.growth}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: `${(r.growth / 20) * 100}%`,
                    background: r.growth > 15 ? 'var(--orange)' : 'var(--green)',
                    transition: 'width 1s 0.5s var(--ease)',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--white-30)' }}>YoY Growth</span>
                  <span style={{ fontSize: 11, color: r.growth > 15 ? 'var(--orange)' : 'var(--green)', fontWeight: 600 }}>{r.growth}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: 'var(--black-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag tag-green" style={{ marginBottom: 12 }}>Platform Capabilities</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Built for the Smartest<br />Investors on the Planet
            </h2>
          </div>
          <div className="grid-3">
            {[
              { icon: BarChart2, color: 'var(--green)', title: 'Advanced Analytics', desc: 'Institutional-grade BI dashboards with 50+ KPI metrics, real-time price indices, and custom reporting modules.' },
              { icon: Globe, color: 'var(--orange)', title: 'Market Intelligence', desc: 'Coverage across 200+ US markets with hyper-local price data, rental yield forecasts, and demand signals.' },
              { icon: Zap, color: 'var(--green)', title: 'ROI Optimization', desc: 'AI-powered investment scoring system that ranks properties by risk-adjusted return potential and market timing.' },
              { icon: Building2, color: 'var(--orange)', title: 'Property Database', desc: 'Access to 6,800+ indexed commercial and residential properties with full performance history and comparable analysis.' },
              { icon: Shield, color: 'var(--green)', title: 'Risk Assessment', desc: 'Portfolio-level stress testing, market cycle positioning, and downside scenario modeling for informed decisions.' },
              { icon: TrendingUp, color: 'var(--orange)', title: 'Forecasting Engine', desc: 'Proprietary price forecast models with 94% accuracy, powered by 40+ macroeconomic and local market variables.' },
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <div key={title} className="card" style={{ padding: '28px 24px', animation: `fadeUp 0.5s ${i * 0.07}s var(--ease) both` }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: color === 'var(--green)' ? 'var(--green-dim)' : 'var(--orange-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18, color,
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--white-60)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div style={{
            borderRadius: 28, padding: 'clamp(48px, 6vw, 80px)',
            background: 'linear-gradient(135deg, rgba(0,168,107,0.15) 0%, rgba(255,107,0,0.1) 100%)',
            border: '1px solid rgba(0,168,107,0.25)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,168,107,0.15), transparent 70%)', pointerEvents: 'none' }} />
            <div className="tag tag-green" style={{ marginBottom: 20 }}>Start Today</div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.1 }}>
              Ready to invest with<br />
              <span style={{ color: 'var(--green)' }}>data-driven confidence?</span>
            </h2>
            <p style={{ fontSize: 17, color: 'var(--white-60)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Join 2,400+ investors and analysts using IntiGravity to find better deals, faster.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
                Access Dashboard <ArrowRight size={16} />
              </Link>
              <Link to="/reports" className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 32px' }}>
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
