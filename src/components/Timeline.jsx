import { Badge, GlowLine } from './Decorative.jsx'
import { TIMELINE_DATA } from '../data.js'

/**
 * Timeline — visual alternating timeline of Indian Knowledge Systems history.
 */
export default function Timeline() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 760, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Badge>Knowledge Through Time</Badge>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 700,
          color: 'var(--gold)',
          marginTop: 16,
          animation: 'glow 3s ease infinite',
        }}>
          From Palm Leaves to Pixels
        </h2>
        <p style={{
          color: 'var(--text-muted)', marginTop: 8, fontSize: 15,
          fontFamily: "'Crimson Pro', serif",
        }}>
          5,000 years of unbroken Indian knowledge — scrolling through time
        </p>
      </div>

      <GlowLine />

      {/* Timeline */}
      <div style={{ position: 'relative', marginTop: 32 }}>

        {/* Central Glow Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0, bottom: 0,
          width: 1,
          background: 'linear-gradient(to bottom, transparent, #D4A01766 8%, #D4A01766 92%, transparent)',
          transform: 'translateX(-50%)',
        }} />

        {TIMELINE_DATA.map((item, i) => (
          <div key={i} className="card-hover" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 52px 1fr',
            gap: 0,
            marginBottom: 28,
            animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
          }}>

            {/* Left Side */}
            {i % 2 === 0 ? (
              <div style={{
                background: 'var(--glass)',
                borderRadius: '14px 0 0 14px',
                border: '1px solid var(--border)',
                borderRight: 'none',
                padding: '20px 24px',
                textAlign: 'right',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: item.color, marginBottom: 6,
                  letterSpacing: 0.5,
                }}>{item.year}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 14, color: 'var(--text)',
                  marginBottom: 8, fontWeight: 600,
                }}>{item.title}</div>
                <div style={{
                  color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.65,
                  fontFamily: "'Crimson Pro', serif",
                }}>{item.desc}</div>
                <div style={{
                  marginTop: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: 'var(--text-dim)',
                  textTransform: 'uppercase', letterSpacing: 1,
                }}>{item.era}</div>
              </div>
            ) : (
              <div />
            )}

            {/* Center Dot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
                border: `2px solid ${item.color}77`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: item.icon === '∞' ? 24 : 18,
                boxShadow: `0 0 20px ${item.color}33`,
                color: item.icon === '∞' ? item.color : undefined,
                fontFamily: item.icon === '∞' ? 'serif' : undefined,
              }}>{item.icon}</div>
            </div>

            {/* Right Side */}
            {i % 2 === 1 ? (
              <div style={{
                background: 'var(--glass)',
                borderRadius: '0 14px 14px 0',
                border: '1px solid var(--border)',
                borderLeft: 'none',
                padding: '20px 24px',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: item.color, marginBottom: 6,
                  letterSpacing: 0.5,
                }}>{item.year}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 14, color: 'var(--text)',
                  marginBottom: 8, fontWeight: 600,
                }}>{item.title}</div>
                <div style={{
                  color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.65,
                  fontFamily: "'Crimson Pro', serif",
                }}>{item.desc}</div>
                <div style={{
                  marginTop: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: 'var(--text-dim)',
                  textTransform: 'uppercase', letterSpacing: 1,
                }}>{item.era}</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        ))}

        {/* End Cap */}
        <div style={{ textAlign: 'center', padding: '24px 0', animation: 'fadeUp 0.5s ease 0.7s both' }}>
          <div style={{
            display: 'inline-block',
            padding: '12px 28px',
            borderRadius: 30,
            border: '1px solid #D4A01744',
            background: '#D4A01710',
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            color: 'var(--gold)',
            letterSpacing: 1,
          }}>
            ∞ The journey continues...
          </div>
        </div>
      </div>
    </div>
  )
}
