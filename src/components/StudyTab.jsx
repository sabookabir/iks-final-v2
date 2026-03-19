import { useState, useRef } from 'react'
import { generateNotes, generateQuiz, generateSimpleExplanation } from '../api.js'
import { LoadingWave, Badge } from './Decorative.jsx'
import NotesView from './NotesView.jsx'
import QuizView from './QuizView.jsx'
import SimpleView from './SimpleView.jsx'
import { TOPICS, FEATURE_CARDS } from '../data.js'

/**
 * StudyTab — topic input + three action modes: Notes, Quiz, Simple.
 */
export default function StudyTab() {
  const [topic, setTopic] = useState('')
  const [mode, setMode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')
  const [quiz, setQuiz] = useState(null)
  const [simple, setSimple] = useState('')
  const resultRef = useRef(null)

  const generate = async (type) => {
    const t = topic.trim()
    if (!t) { setError('Please enter a topic first!'); return }
    setError(''); setLoading(true); setMode(type)

    try {
      if (type === 'notes') {
        setNotes(await generateNotes(t))
      } else if (type === 'quiz') {
        setQuiz(await generateQuiz(t))
      } else {
        setSimple(await generateSimpleExplanation(t))
      }
    } catch (e) {
      setError('Something went wrong. Please try again.')
      console.error(e)
    } finally {
      setLoading(false)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
    }
  }

  const ACTIONS = [
    { type: 'notes',  icon: '📜', label: 'Generate Notes',  sub: 'Structured study material', color: '#D4A017' },
    { type: 'quiz',   icon: '⚡', label: 'Take a Quiz',     sub: 'MCQs with scoring',         color: '#00D4FF' },
    { type: 'simple', icon: '✨', label: 'Explain Simply',  sub: 'ELI-10 explanation',        color: '#FF6B2B' },
  ]

  const hasResult = !loading && mode && (notes || quiz || simple)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px' }}>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 36, animation: 'fadeUp 0.5s ease' }}>
        <Badge>AI-Powered Study Assistant</Badge>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(20px, 4vw, 30px)',
          color: 'var(--gold)', marginTop: 14, fontWeight: 700,
        }}>
          Explore Ancient Wisdom
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 15, fontFamily: "'Crimson Pro', serif" }}>
          Generate notes, quizzes, and simple explanations for any IKS topic
        </p>
      </div>

      {/* Input Card */}
      <div style={{
        background: 'var(--surface)', borderRadius: 20, padding: '28px',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 40px #00000040',
        marginBottom: 24, position: 'relative', overflow: 'hidden',
        animation: 'fadeUp 0.5s ease 0.1s both',
      }}>
        {/* Ambient Om */}
        <div style={{
          position: 'absolute', top: -16, right: -8, opacity: 0.05,
          pointerEvents: 'none', fontSize: 90, fontFamily: 'serif',
          color: 'var(--gold)', userSelect: 'none',
        }}>ॐ</div>

        <label style={{
          display: 'block', fontSize: 11,
          color: 'var(--text-muted)', marginBottom: 10,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: 1.2, textTransform: 'uppercase',
        }}>Enter Topic</label>

        {/* Text Input */}
        <div style={{ position: 'relative' }}>
          <input
            value={topic}
            onChange={e => { setTopic(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && generate('notes')}
            placeholder="Bhagavad Gita, Ayurveda, Chanakya Niti, Yoga Sutras..."
            style={{
              width: '100%', padding: '14px 44px 14px 18px',
              borderRadius: 12,
              border: `1.5px solid ${error ? '#FF4466' : topic ? '#D4A01766' : 'var(--border)'}`,
              background: 'var(--glass)', color: 'var(--text)',
              fontFamily: "'Crimson Pro', serif", fontSize: 16,
              outline: 'none', transition: 'border-color 0.2s',
            }}
          />
          {topic && (
            <button onClick={() => { setTopic(''); setError('') }} style={{
              position: 'absolute', right: 14, top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none',
              color: 'var(--text-dim)', cursor: 'pointer', fontSize: 20,
            }}>×</button>
          )}
        </div>

        {error && (
          <div style={{ color: '#FF4466', fontSize: 12, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>
            ⚠ {error}
          </div>
        )}

        {/* Quick Topic Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
          {TOPICS.map(t => (
            <button key={t.label} className="topic-chip" onClick={() => setTopic(t.label)} style={{
              padding: '5px 12px', borderRadius: 20,
              border: `1px solid ${topic === t.label ? '#D4A01766' : 'var(--border)'}`,
              background: topic === t.label ? '#D4A01720' : 'transparent',
              color: topic === t.label ? 'var(--gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: "'Crimson Pro', serif", fontSize: 13,
            }}>{t.emoji} {t.label}</button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginTop: 20,
        }}>
          {ACTIONS.map(btn => {
            const isActive = mode === btn.type && !loading
            return (
              <button key={btn.type} className="action-btn"
                onClick={() => generate(btn.type)}
                disabled={loading}
                style={{
                  padding: '16px 14px', borderRadius: 14,
                  border: `1px solid ${isActive ? btn.color + '66' : 'var(--border)'}`,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  background: isActive ? `${btn.color}15` : 'var(--glass)',
                  textAlign: 'left',
                  opacity: loading && !isActive ? 0.5 : 1,
                }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{btn.icon}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 12,
                  color: isActive ? btn.color : 'var(--text)',
                  fontWeight: 600, marginBottom: 2,
                }}>{btn.label}</div>
                <div style={{
                  fontSize: 11, color: 'var(--text-dim)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{btn.sub}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Result Area */}
      <div ref={resultRef}>
        {loading && (
          <div style={{
            background: 'var(--surface)', borderRadius: 20,
            padding: '52px 32px', border: '1px solid var(--border)',
            textAlign: 'center', animation: 'fadeUp 0.3s ease',
          }}>
            <div style={{ fontSize: 44, marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>
              {mode === 'notes' ? '📜' : mode === 'quiz' ? '⚡' : '✨'}
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 18,
              color: 'var(--gold)', marginBottom: 16,
            }}>
              {mode === 'notes'  ? 'Scribing the scrolls...' :
               mode === 'quiz'   ? 'Forging your challenge...' :
                                   'Simplifying the cosmos...'}
            </div>
            <LoadingWave color="#D4A017" />
            <div style={{
              color: 'var(--text-dim)', fontSize: 12, marginTop: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}>consulting ancient texts on "{topic}"</div>
          </div>
        )}

        {hasResult && (
          <div style={{
            background: 'var(--surface)', borderRadius: 20, padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 40px #00000040',
            animation: 'fadeUp 0.4s ease',
          }}>
            {mode === 'notes'  && notes  && <NotesView notes={notes}  topic={topic} />}
            {mode === 'quiz'   && quiz   && <QuizView  data={quiz} />}
            {mode === 'simple' && simple && <SimpleView text={simple} />}
          </div>
        )}
      </div>

      {/* Feature Cards (only when no result yet) */}
      {!mode && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 14, marginTop: 24,
        }}>
          {FEATURE_CARDS.map(f => (
            <div key={f.title} className="card-hover" style={{
              background: 'var(--glass)', borderRadius: 14, padding: '18px',
              border: `1px solid ${f.color}22`,
              boxShadow: `0 4px 20px ${f.color}08`,
              animation: 'fadeUp 0.5s ease 0.3s both',
              cursor: 'pointer',
            }} onClick={() => setTopic(f.topic)}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 12,
                color: f.color, marginBottom: 4,
              }}>{f.title}</div>
              <div style={{
                color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.6,
                fontFamily: "'Crimson Pro', serif",
              }}>{f.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
