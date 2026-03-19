import { useState, useRef, useEffect } from 'react'
import { callClaudeChat } from '../api.js'
import { LoadingWave, Badge } from './Decorative.jsx'
import { CHAT_STARTERS } from '../data.js'

/**
 * BharatGPT — full multi-turn AI chat specialized for Indian Knowledge Systems.
 */
export default function BharatGPT() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return

    setInput('')
    const updated = [...messages, { role: 'user', content }]
    setMessages(updated)
    setLoading(true)

    try {
      const reply = await callClaudeChat(updated)
      setMessages(m => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'प्रणाली दोष। System error — please try again.\n\n' + (err?.message || ''),
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => setMessages([])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 130px)',
      minHeight: 500,
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: '20px 28px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(135deg, var(--surface), var(--glass))',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4A017, #F0C040)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontFamily: 'serif', color: '#0A0812',
            boxShadow: '0 0 20px #D4A01755',
          }}>ॐ</div>
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 12, height: 12, borderRadius: '50%',
            background: '#00E5A0',
            border: '2px solid var(--surface)',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: '#F0C040' }}>
            BharatGPT
          </div>
          <div style={{ fontSize: 12, color: '#00E5A0', fontFamily: "'JetBrains Mono', monospace" }}>
            ● Online · Indian Knowledge AI
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Badge color="#00E5A0">5000+ Years of Wisdom</Badge>
          {messages.length > 0 && (
            <button onClick={clearChat} title="Clear chat" style={{
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}>Clear ✕</button>
          )}
        </div>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 24px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>

        {/* Empty State */}
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            animation: 'fadeIn 0.6s ease',
          }}>
            <div style={{ fontSize: 52, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>ॐ</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: 'var(--gold)', marginBottom: 8 }}>
              Namaste! I am BharatGPT
            </div>
            <div style={{
              color: 'var(--text-muted)',
              fontSize: 15, lineHeight: 1.8,
              maxWidth: 440, margin: '0 auto 28px',
              fontFamily: "'Crimson Pro', serif",
            }}>
              Ask me anything about Indian Knowledge Systems — philosophy, science, history, arts, medicine, mathematics, and more.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {CHAT_STARTERS.map(s => (
                <button key={s} className="topic-chip" onClick={() => sendMessage(s)} style={{
                  padding: '8px 16px', borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: 'var(--glass)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: 13,
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 12,
            flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
            animation: 'fadeUp 0.3s ease',
          }}>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              flexShrink: 0, marginTop: 2,
              background: m.role === 'user'
                ? 'linear-gradient(135deg, #00D4FF, #0096BB)'
                : 'linear-gradient(135deg, #D4A017, #F0C040)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: m.role === 'user' ? 16 : 18,
              fontFamily: 'serif',
              color: '#0A0812',
              boxShadow: m.role === 'user'
                ? '0 0 12px #00D4FF44'
                : '0 0 12px #D4A01744',
            }}>
              {m.role === 'user' ? '👤' : 'ॐ'}
            </div>

            {/* Bubble */}
            <div style={{
              maxWidth: '75%',
              background: m.role === 'user'
                ? 'linear-gradient(135deg, #00D4FF18, #00D4FF08)'
                : 'var(--glass)',
              border: `1px solid ${m.role === 'user' ? '#00D4FF33' : 'var(--border)'}`,
              borderRadius: m.role === 'user'
                ? '18px 4px 18px 18px'
                : '4px 18px 18px 18px',
              padding: '14px 18px',
            }}>
              <div style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: 15,
                color: 'var(--text)',
                lineHeight: 1.85,
                whiteSpace: 'pre-wrap',
              }}>{m.content}</div>
              <div style={{
                fontSize: 10,
                color: 'var(--text-dim)',
                marginTop: 6,
                fontFamily: "'JetBrains Mono', monospace",
                textAlign: m.role === 'user' ? 'right' : 'left',
              }}>
                {m.role === 'assistant' ? 'BharatGPT' : 'You'}
              </div>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', gap: 12, animation: 'fadeUp 0.3s ease' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4A017, #F0C040)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontFamily: 'serif', color: '#0A0812',
              boxShadow: '0 0 12px #D4A01744',
            }}>ॐ</div>
            <div style={{
              background: 'var(--glass)',
              border: '1px solid var(--border)',
              borderRadius: '4px 18px 18px 18px',
              padding: '16px 20px',
            }}>
              <LoadingWave color="#D4A017" />
              <div style={{
                fontSize: 11, color: 'var(--text-dim)', marginTop: 6,
                fontFamily: "'JetBrains Mono', monospace",
              }}>consulting ancient wisdom...</div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input Area ── */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <div style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          background: 'var(--glass)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '10px 14px',
        }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about Dharma, Karma, Vedas, Ayurveda, Indian history..."
            rows={1}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)',
              fontFamily: "'Crimson Pro', serif",
              fontSize: 15, resize: 'none', lineHeight: 1.6, maxHeight: 100, overflowY: 'auto',
            }}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 38, height: 38, borderRadius: 10,
              border: '1px solid #D4A01744',
              background: input.trim() && !loading
                ? 'linear-gradient(135deg,#D4A017,#F0C040)'
                : 'transparent',
              color: input.trim() && !loading ? '#0A0812' : 'var(--text-dim)',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>↑</button>
        </div>
        <div style={{
          textAlign: 'center', fontSize: 11,
          color: 'var(--text-dim)', marginTop: 8,
          fontFamily: "'JetBrains Mono', monospace",
        }}>Enter to send · Shift+Enter for new line</div>
      </div>
    </div>
  )
}
