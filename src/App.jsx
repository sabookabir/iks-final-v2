import { useState, useEffect } from 'react'
import { injectGlobalStyles } from './styles.js'
import { NAV_TABS } from './data.js'
import { StarField, MandalaRing, SanskritGlyph, Badge, GlowLine } from './components/Decorative.jsx'
import StudyTab from './components/StudyTab.jsx'
import BharatGPT from './components/BharatGPT.jsx'
import Timeline from './components/Timeline.jsx'

export default function App() {
  const [tab, setTab] = useState('home')

  useEffect(() => {
    injectGlobalStyles()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cosmic)' }}>

      {/* ══ HERO (only on Study tab) ══════════════════════════════════════ */}
      {tab === 'home' && (
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 420,
          background: 'linear-gradient(160deg, #0D0B20 0%, #0A0812 40%, #140810 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px 48px',
        }}>
          {/* Star Field */}
          <StarField />

          {/* Mandala Rings */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}>
            <div style={{ position: 'relative', width: 500, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MandalaRing size={480} opacity={0.10} speed={70} color="#D4A017" />
              <MandalaRing size={360} opacity={0.09} speed={45} reverse color="#00D4FF" />
              <MandalaRing size={240} opacity={0.13} speed={28} color="#D4A017" />
              <MandalaRing size={120} opacity={0.17} speed={16} reverse color="#F0C040" />
            </div>
          </div>

          {/* Sanskrit Ambient */}
          <div style={{ position: 'absolute', top: 12, left: 16, pointerEvents: 'none' }}>
            <SanskritGlyph char="ॐ" style={{ fontSize: 110 }} />
          </div>
          <div style={{ position: 'absolute', bottom: 8, right: 24, pointerEvents: 'none' }}>
            <SanskritGlyph char="स" style={{ fontSize: 80 }} />
          </div>
          <div style={{ position: 'absolute', top: '30%', right: '8%', pointerEvents: 'none' }}>
            <SanskritGlyph char="ज्ञ" style={{ fontSize: 48 }} />
          </div>

          {/* Scan Line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #D4A01733, transparent)',
            animation: 'scanline 7s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* Hero Content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 700 }}>
            <div style={{ marginBottom: 20 }}>
              <Badge>Indian Knowledge Systems · AI</Badge>
            </div>

            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(26px, 6vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 18,
              background: 'linear-gradient(135deg, #F0C040 0%, #D4A017 35%, #FFFFFF 55%, #D4A017 75%, #F0C040 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite, glow 3s ease infinite',
            }}>
              Where Ancient Wisdom<br />Meets Modern AI
            </h1>

            <p style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: 'clamp(14px, 2vw, 18px)',
              color: '#8B85B0',
              lineHeight: 1.85,
              maxWidth: 520,
              margin: '0 auto 32px',
            }}>
              AI-powered notes, quizzes & explanations for Vedas, Bhagavad Gita, Ayurveda,
              Chanakya Niti & more — plus BharatGPT for anything you want to ask.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="action-btn" onClick={() => setTab('home')} style={{
                padding: '12px 28px', borderRadius: 30, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#D4A017,#F0C040)',
                color: '#0A0812',
                fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 12, letterSpacing: 1.2,
              }}>START STUDYING ◈</button>
              <button className="action-btn" onClick={() => setTab('chat')} style={{
                padding: '12px 28px', borderRadius: 30,
                border: '1px solid #D4A01744', cursor: 'pointer',
                background: 'transparent', color: 'var(--gold)',
                fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 1.2,
              }}>CHAT WITH AI ⟁</button>
            </div>
          </div>
        </section>
      )}

      {/* ══ NAVIGATION ═══════════════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#0A081299',
        backdropFilter: 'blur(20px) saturate(1.5)',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'linear-gradient(135deg,#D4A017,#F0C040)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'serif', fontSize: 16, color: '#0A0812',
            boxShadow: '0 0 14px #D4A01766',
          }}>ॐ</div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700, color: '#F0C040' }}>IKS</span>
          <span style={{ color: 'var(--text-dim)', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            Study Helper
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_TABS.map(t => (
            <button key={t.id} className="nav-link" onClick={() => setTab(t.id)} style={{
              padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: tab === t.id ? '#D4A01720' : 'transparent',
              color: tab === t.id ? '#F0C040' : 'var(--text-muted)',
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 0.8,
              borderBottom: tab === t.id ? '1px solid #D4A01766' : '1px solid transparent',
              transition: 'all 0.2s',
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </nav>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════════ */}
      <main>
        {tab === 'home'     && <StudyTab />}
        {tab === 'chat'     && <BharatGPT />}
        {tab === 'timeline' && <Timeline />}
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
        background: 'var(--deep)',
      }}>
        <div style={{ fontFamily: 'serif', fontSize: 28, color: '#D4A01766', marginBottom: 10 }}>ॐ</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: 'var(--gold)' }}>
          IKS Study Helper
        </div>
        <GlowLine />
        <div style={{
          color: 'var(--text-dim)', fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace", marginTop: 4,
        }}>
          Powered by Claude AI · Bridging 5,000 years of wisdom with technology · Hackathon 2026
        </div>
      </footer>
    </div>
  )
}
