import { useState } from 'react'

/**
 * QuizView — renders MCQ quiz with scoring, feedback, retry.
 * Props: data { questions: [{question, options, correct}] }
 */
export default function QuizView({ data }) {
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const total = data.questions?.length || 0

  const handleSubmit = () => {
    let s = 0
    data.questions.forEach((q, i) => {
      if (selected[i] === q.correct) s++
    })
    setScore(s)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelected({})
    setSubmitted(false)
    setScore(0)
  }

  const pct = submitted ? Math.round((score / total) * 100) : 0

  const scoreMessage =
    pct === 100 ? 'परिपूर्ण! Perfect mastery.' :
    pct >= 70  ? 'उत्तम! Great understanding.' :
    pct >= 50  ? 'सामान्य। Keep practising.' :
                 'पुनः अध्ययन। Review notes and try again.'

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>

      {/* Score Banner */}
      {submitted && (
        <div style={{
          background: 'linear-gradient(135deg, #16132A, #1E1B35)',
          border: `1px solid ${pct >= 50 ? '#00E5A044' : '#FF446644'}`,
          borderRadius: 16,
          padding: '28px 32px',
          marginBottom: 24,
          textAlign: 'center',
          boxShadow: `0 0 40px ${pct >= 50 ? '#00E5A015' : '#FF446615'}`,
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👏' : '📚'}
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 42,
            fontWeight: 700,
            color: pct >= 50 ? '#00E5A0' : '#FF4466',
            lineHeight: 1,
          }}>
            {score}
            <span style={{ fontSize: 20, color: 'var(--text-muted)' }}>/{total}</span>
          </div>
          <div style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 15, fontFamily: "'Crimson Pro', serif" }}>
            {scoreMessage}
          </div>
          {/* Progress Bar */}
          <div style={{ marginTop: 16, height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              borderRadius: 3,
              width: `${pct}%`,
              background: pct >= 50
                ? 'linear-gradient(90deg,#00E5A0,#00D4FF)'
                : 'linear-gradient(90deg,#FF4466,#FF6B2B)',
              transition: 'width 1s ease',
            }} />
          </div>
        </div>
      )}

      {/* Questions */}
      {data.questions?.map((q, i) => {
        const isRight = submitted && selected[i] === q.correct
        const isWrong = submitted && selected[i] !== undefined && selected[i] !== q.correct
        return (
          <div key={i} style={{
            background: 'var(--glass)',
            borderRadius: 14,
            padding: '20px 22px',
            marginBottom: 14,
            border: `1px solid ${isRight ? '#00E5A044' : isWrong ? '#FF446644' : 'var(--border)'}`,
            transition: 'border-color 0.3s',
          }}>
            <div style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: 16,
              color: 'var(--text)',
              marginBottom: 14,
              lineHeight: 1.5,
            }}>
              <span style={{
                color: 'var(--gold)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                marginRight: 10,
              }}>Q{i + 1}</span>
              {q.question}
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              {q.options?.map((opt, j) => {
                const isThisCorrect = submitted && j === q.correct
                const isThisWrong = submitted && selected[i] === j && j !== q.correct
                return (
                  <label key={j} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 10,
                    cursor: submitted ? 'default' : 'pointer',
                    border: `1px solid ${
                      isThisCorrect ? '#00E5A066' :
                      isThisWrong   ? '#FF446666' :
                      selected[i] === j ? '#D4A01766' :
                      'var(--border)'
                    }`,
                    background:
                      isThisCorrect ? '#00E5A010' :
                      isThisWrong   ? '#FF446610' :
                      selected[i] === j && !submitted ? '#D4A01710' :
                      'transparent',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={selected[i] === j}
                      onChange={() => !submitted && setSelected(p => ({ ...p, [i]: j }))}
                      style={{ accentColor: 'var(--gold)', width: 14, height: 14 }}
                    />
                    <span style={{ color: 'var(--text)', fontSize: 14, flex: 1 }}>{opt}</span>
                    {isThisCorrect && <span style={{ color: '#00E5A0', fontSize: 16 }}>✓</span>}
                    {isThisWrong   && <span style={{ color: '#FF4466',  fontSize: 16 }}>✗</span>}
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Action */}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {!submitted ? (
          <button onClick={handleSubmit} className="action-btn" style={{
            flex: 1, padding: 14, borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#D4A017,#F0C040)',
            color: '#0A0812',
            fontFamily: "'Cinzel', serif",
            fontWeight: 700, fontSize: 13, letterSpacing: 1,
          }}>SUBMIT ANSWERS</button>
        ) : (
          <button onClick={handleReset} className="action-btn" style={{
            flex: 1, padding: 14, borderRadius: 12,
            border: '1px solid var(--border)', cursor: 'pointer',
            background: 'transparent', color: 'var(--text-muted)',
            fontFamily: "'Cinzel', serif", fontSize: 13,
          }}>TRY AGAIN ↺</button>
        )}
      </div>
    </div>
  )
}
