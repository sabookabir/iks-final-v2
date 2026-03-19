/**
 * IKS Study Helper — Groq API (100% FREE, No billing needed)
 * Model: llama-3.3-70b-versatile
 */

const GROQ_KEY = import.meta.env.VITE_GROQ_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

// ── Core fetch wrapper ─────────────────────────────────────────────
async function callGroq(systemPrompt, userPrompt, maxTokens = 1000) {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt   },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? 'No response received.'
}

// ── Multi-turn chat for BharatGPT ──────────────────────────────────
async function callGroqChat(messages, maxTokens = 800) {
  const SYSTEM = `You are BharatGPT — an AI deeply rooted in Indian Knowledge Systems, culture, philosophy, and history.
You are wise, warm, and precise. You answer questions about:
- Vedas, Upanishads, Bhagavad Gita, Ramayana, Mahabharata
- Ayurveda, Yoga, Tantra, Pranayama
- Chanakya Niti, Arthashastra, Indian statecraft
- Indian mathematics, astronomy, architecture
- Sanskrit language and literature
- Indian history, dynasties, culture, arts
- Natya Shastra, music (Raga system), dance forms

For non-IKS questions, gently redirect with wisdom.
Use occasional Sanskrit terms with their translations in parentheses.
Be concise but profound. Format responses with clear line breaks.
Use ▸ for section headings and • for bullet points.
Never be preachy — be conversational, warm, and illuminating.`

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      temperature: 0.8,
      messages: [
        { role: 'system', content: SYSTEM },
        ...messages,
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? 'No response received.'
}

// ── Exported functions (same interface — nothing else needs changing) ─

export async function callClaude(system, user, maxTokens = 1000) {
  return callGroq(system, user, maxTokens)
}

export async function callClaudeChat(messages, maxTokens = 800) {
  return callGroqChat(messages, maxTokens)
}

export async function generateNotes(topic) {
  return callGroq(
    `You are an expert teacher of Indian Knowledge Systems. Create beautifully structured study notes.
Use ▸ for headings, • for bullets, ◦ for sub-bullets.
Include Sanskrit terms with translations in parentheses.
Make it scholarly yet accessible. Max 600 words.`,
    `Create comprehensive study notes for: "${topic}"

Structure:
▸ Overview & Origin
▸ Core Concepts
▸ Key Texts or Figures
▸ Main Teachings / Principles
▸ Modern Relevance
▸ Quick Revision (5 key points)`
  )
}

export async function generateQuiz(topic) {
  const raw = await callGroq(
    `You are a quiz creator for Indian Knowledge Systems.
Respond ONLY with valid JSON. No markdown, no explanation, no preamble whatsoever.
Format exactly: {"questions":[{"question":"...","options":["A","B","C","D"],"correct":0}]}
"correct" is the 0-based index of the right answer.`,
    `Create 6 multiple-choice questions about "${topic}". Mix easy and hard questions. Return ONLY JSON.`
  )

  try {
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  } catch {
    return { questions: [] }
  }
}

export async function generateSimpleExplanation(topic) {
  return callGroq(
    `You are a warm, friendly teacher explaining to a curious 10-year-old child.
Use relatable stories, fun analogies, everyday modern examples.
Avoid jargon entirely. Be enthusiastic and encouraging.
Use emojis naturally. Max 250 words.`,
    `Explain this in the simplest way for a child: "${topic}"
Use a story or analogy from everyday modern life.`
  )
}
