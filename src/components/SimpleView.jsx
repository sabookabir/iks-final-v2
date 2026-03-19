/**
 * SimpleView — displays ELI-10 (Explain Like I'm 10) explanation.
 */
export default function SimpleView({ text }) {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: '#00D4FF20',
          border: '1px solid #00D4FF44',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>✨</div>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 600, color: 'var(--cyan)' }}>
            Simple Explanation
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
            ELI-10 Mode · No jargon
          </div>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #00D4FF08, #00D4FF04)',
        borderRadius: 14,
        padding: '28px 32px',
        border: '1px solid #00D4FF22',
        lineHeight: 2,
        fontFamily: "'Crimson Pro', serif",
        color: 'var(--text)',
        fontSize: 16,
        whiteSpace: 'pre-wrap',
        maxHeight: 480,
        overflowY: 'auto',
        letterSpacing: 0.3,
      }}>{text}</div>
    </div>
  )
}
