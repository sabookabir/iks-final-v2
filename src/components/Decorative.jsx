/**
 * IKS Study Helper — Decorative Visual Components
 * StarField, MandalaRings, Sanskrit glyphs, badges, loaders, etc.
 */

/* ── Star Field ─────────────────────────────────────────────────── */
export function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 73.1) % 100,
    size: (i % 3) + 0.8,
    opacity: 0.2 + (i % 5) * 0.12,
    delay: (i % 5) * 0.9,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background: i % 5 === 0 ? '#D4A017' : '#EDE8FF',
          opacity: s.opacity,
          animation: `pulse ${2 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}
    </div>
  )
}

/* ── Rotating Mandala Ring ──────────────────────────────────────── */
export function MandalaRing({ size, opacity, speed = 30, reverse = false, color = '#D4A017' }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1px solid ${color}33`,
      animation: `${reverse ? 'rotateRev' : 'rotate'} ${speed}s linear infinite`,
      position: 'absolute',
      opacity,
      boxShadow: `inset 0 0 ${size / 4}px ${color}11, 0 0 ${size / 8}px ${color}11`,
    }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: color,
          opacity: 0.6,
          transform: `rotate(${i * 45}deg) translateX(${size / 2 - 4}px) translateY(-50%)`,
        }} />
      ))}
    </div>
  )
}

/* ── Sanskrit Ambient Glyph ─────────────────────────────────────── */
export function SanskritGlyph({ char, style = {} }) {
  return (
    <div style={{
      fontFamily: 'serif',
      fontSize: 64,
      color: '#D4A01715',
      lineHeight: 1,
      userSelect: 'none',
      pointerEvents: 'none',
      fontWeight: 400,
      ...style,
    }}>{char}</div>
  )
}

/* ── Horizontal Glow Line ───────────────────────────────────────── */
export function GlowLine({ vertical = false }) {
  return (
    <div style={{
      background: vertical
        ? 'linear-gradient(to bottom, transparent, #D4A01766, transparent)'
        : 'linear-gradient(to right, transparent, #D4A01766, transparent)',
      [vertical ? 'width' : 'height']: 1,
      [vertical ? 'height' : 'width']: '100%',
      opacity: 0.5,
      margin: '16px 0',
    }} />
  )
}

/* ── Badge ──────────────────────────────────────────────────────── */
export function Badge({ children, color = '#D4A017' }) {
  return (
    <span style={{
      background: `${color}20`,
      border: `1px solid ${color}44`,
      color,
      borderRadius: 20,
      padding: '3px 12px',
      fontSize: 11,
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: 1.2,
      fontWeight: 400,
      textTransform: 'uppercase',
      display: 'inline-block',
    }}>{children}</span>
  )
}

/* ── Animated Loading Wave ──────────────────────────────────────── */
export function LoadingWave({ color = '#D4A017' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {[0, 0.15, 0.3].map((d, i) => (
        <div key={i} style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color,
          animation: 'bounce 1s ease-in-out infinite',
          animationDelay: `${d}s`,
        }} />
      ))}
    </div>
  )
}
