import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface KPICardProps {
  label: string
  value: string
  change: number
  icon?: React.ReactNode
  delay?: number
  accent?: 'green' | 'orange'
}

export default function KPICard({ label, value, change, icon, delay = 0, accent = 'green' }: KPICardProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isPos = change >= 0
  const accentColor = accent === 'orange' ? 'var(--orange)' : 'var(--green)'
  const accentDim = accent === 'orange' ? 'var(--orange-dim)' : 'var(--green-dim)'

  return (
    <div ref={ref} className="card" style={{
      padding: '24px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ${delay}s var(--ease), transform 0.5s ${delay}s var(--ease)`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--white-60)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {icon && (
          <div style={{ width: 32, height: 32, borderRadius: 8, background: accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3,
          color: isPos ? 'var(--green)' : 'var(--red)',
          fontSize: 12, fontWeight: 600,
        }}>
          {isPos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {isPos ? '+' : ''}{change}%
        </div>
        <span style={{ fontSize: 12, color: 'var(--white-30)' }}>vs last period</span>
      </div>
    </div>
  )
}
