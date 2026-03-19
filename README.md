# ॐ IKS Study Helper — AI Platform for Indian Knowledge Systems

> **Ancient Wisdom × Modern AI** — Hackathon 2026

A production-ready, AI-powered web application that helps students understand and revise Indian Knowledge Systems including Vedas, Bhagavad Gita, Ayurveda, Chanakya Niti, and more.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📜 **AI Notes Generator** | Structured, scholarly study notes for any IKS topic |
| ⚡ **Quiz Generator** | 6 MCQs with scoring, feedback, and retry |
| ✨ **Explain Simply (ELI-10)** | Complex topics explained like you're 10 years old |
| ⟁ **BharatGPT Chat** | Full multi-turn AI chat specialized for Indian Knowledge Systems |
| ⌛ **Knowledge Timeline** | Visual history from 5000 BCE → Present |
| ⬇️ **Download Notes** | Save notes as TXT |
| 🖨️ **Print / Save PDF** | Print-styled notes for offline use |

---

## 🚀 Quick Start (Vite + React)

### Prerequisites
- Node.js 18+ installed
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

### 1. Install Dependencies

```bash
cd iks-study-helper
npm install
```

### 2. Add Your API Key

The app calls the Anthropic API directly from the browser (fine for hackathon/demo).
Open `src/api.js` and replace or add your key logic. For a quick demo, you can
add it directly as a header (not recommended for production):

```js
// In src/api.js, add to baseHeaders:
'x-api-key': 'sk-ant-YOUR-KEY-HERE',
```

> ⚠️ For production, route API calls through a backend server to keep your key secret.

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app opens automatically.

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
iks-study-helper/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json
├── README.md
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component (Hero + Nav + Tab routing)
    ├── api.js                  # All Anthropic API calls
    ├── data.js                 # Static data (topics, timeline, etc.)
    ├── styles.js               # Global CSS + design tokens
    └── components/
        ├── Decorative.jsx      # StarField, MandalaRing, Badge, LoadingWave, etc.
        ├── StudyTab.jsx        # Main study tab (input + actions)
        ├── NotesView.jsx       # Notes display + download/print
        ├── QuizView.jsx        # MCQ quiz with scoring
        ├── SimpleView.jsx      # ELI-10 explanation display
        ├── BharatGPT.jsx       # Multi-turn AI chat
        └── Timeline.jsx        # Visual history timeline
```

---

## 🎨 Design System

- **Theme:** Deep cosmic black + ancient gold — "Temple carved in space"
- **Fonts:** Cinzel (headings) · Crimson Pro (body) · JetBrains Mono (code/labels)
- **Palette:** `#D4A017` gold · `#00D4FF` cyan · `#FF6B2B` orange · `#00E5A0` green
- **Effects:** Rotating mandala rings · Star field · Shimmer gradients · Scan lines

---

## 🏆 Hackathon Demo Script

1. **Land on the Hero** — wow factor, rotating mandalas, star field
2. **Click BharatGPT** → ask *"What is the meaning of Dharma?"*
3. **Click Timeline** → scroll through 5,000 years of Indian knowledge
4. **Click Study** → select *"Bhagavad Gita"* chip → Generate Notes
5. **Click Quiz** → answer questions → show score + Sanskrit feedback
6. **Show ELI-10** → "Explain Simply" on any topic
7. **Download notes** as TXT / Print as PDF

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 5
- **AI:** Claude claude-sonnet-4-20250514 (Anthropic)
- **Styling:** Inline styles + CSS-in-JS (zero dependencies for styling)
- **Fonts:** Google Fonts (Cinzel, Crimson Pro, JetBrains Mono)

---

## 📜 Topics Covered

Vedas · Upanishads · Bhagavad Gita · Ramayana · Mahabharata · Ayurveda ·
Yoga Sutras · Chanakya Niti · Arthashastra · Natya Shastra · Sanskrit ·
Indian Mathematics · Astronomy · Architecture · Music (Raga) · Dance Forms

---

*Built with 🧡 for Indian Knowledge Systems · Hackathon 2026*
