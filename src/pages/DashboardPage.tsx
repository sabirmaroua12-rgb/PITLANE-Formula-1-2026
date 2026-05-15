import { useState } from 'react'
import heroBg from '../assets/f1_hero_bg.png'

export default function DashboardPage() {
  return (
    <div className="page" style={{ background: 'var(--black)', minHeight: '100vh', color: 'var(--white)' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '600px',
        width: '100%',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        {/* Gradient overlay for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Content container */}
        <div className="container" style={{ position: 'relative', padding: '40px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Left Info */}
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4500', boxShadow: '0 0 8px rgba(255,69,0,0.6)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, color: '#FF4500', fontWeight: 700, letterSpacing: '0.1em' }}>LIVE STATUS: STANDBY</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(48px, 6vw, 72px)', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              marginBottom: 16,
              textTransform: 'uppercase',
              fontStyle: 'italic',
              lineHeight: 1
            }}>
              GP D'AUSTRALIE
            </h1>
            
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.5, maxWidth: '480px' }}>
              Le circuit de l'Albert Park attend les ingénieurs. Préparez la télémétrie pour l'ouverture de la saison à Melbourne.
            </p>
          </div>

          {/* Right Countdown Box */}
          <div style={{ 
            background: 'rgba(20,20,20,0.85)', 
            border: '1px solid #FF4500', 
            borderRadius: 4,
            padding: '24px',
            minWidth: '300px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: 12, color: '#FF4500', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 16 }}>
              COUNTDOWN TO Q1
            </div>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1, fontFamily: 'Space Mono, monospace' }}>08</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.1em' }}>DAYS</div>
              </div>
              <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.3)', marginTop: -14 }}>:</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1, fontFamily: 'Space Mono, monospace' }}>14</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.1em' }}>HRS</div>
              </div>
              <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.3)', marginTop: -14 }}>:</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1, fontFamily: 'Space Mono, monospace' }}>32</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.1em' }}>MIN</div>
              </div>
            </div>
            
            <button style={{
              width: '100%',
              background: '#FF4500',
              color: '#000',
              border: 'none',
              padding: '14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'background 0.2s',
              textTransform: 'uppercase'
            }}>
              Track Pre-Load
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Rest of the content area placeholder */}
      <div className="container" style={{ padding: '32px' }}>
         <div style={{ height: '400px', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', background: 'var(--black-2)' }}>
            Telemetry Modules Standby...
         </div>
      </div>
    </div>
  )
}
