/**
 * IKS Study Helper — Global Styles & Design Tokens
 */

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400&display=swap');

*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Core Palette */
  --gold: #D4A017;
  --gold-light: #F0C040;
  --gold-dim: #8B6914;

  /* Backgrounds */
  --cosmic: #0A0812;
  --deep: #110F1E;
  --surface: #16132A;
  --glass: #1E1B35;

  /* Borders */
  --border: #2A2550;
  --border-glow: #3D3870;

  /* Accents */
  --cyan: #00D4FF;
  --cyan-dim: #0096BB;
  --orange: #FF6B2B;
  --orange-dim: #C04A10;

  /* Text */
  --text: #EDE8FF;
  --text-muted: #8B85B0;
  --text-dim: #4A4670;

  /* State */
  --red: #FF4466;
  --green: #00E5A0;
}

body {
  background: var(--cosmic);
  color: var(--text);
  font-family: 'Crimson Pro', serif;
  overflow-x: hidden;
}

::selection { background: #D4A01733; color: #F0C040; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

/* ── Keyframes ─────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes glow {
  0%,100% { text-shadow: 0 0 20px #D4A01755; }
  50%      { text-shadow: 0 0 40px #D4A017AA, 0 0 80px #D4A01733; }
}
@keyframes rotate    { to { transform: rotate(360deg); } }
@keyframes rotateRev { to { transform: rotate(-360deg); } }
@keyframes pulse {
  0%,100% { opacity: 0.5; transform: scale(1); }
  50%     { opacity: 1;   transform: scale(1.05); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes float {
  0%,100% { transform: translateY(0px);  }
  50%     { transform: translateY(-8px); }
}
@keyframes bounce {
  0%,80%,100% { transform: translateY(0);   }
  40%         { transform: translateY(-8px); }
}
@keyframes scanline {
  0%   { top: -20%; }
  100% { top: 110%; }
}
@keyframes ripple {
  0%   { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}

/* ── Utility Classes ───────────────────────────────────── */
.nav-link {
  transition: color 0.2s, border-color 0.2s;
}
.nav-link:hover {
  color: var(--gold) !important;
  border-color: var(--gold) !important;
}

.action-btn {
  transition: transform 0.2s, box-shadow 0.3s, background 0.2s !important;
}
.action-btn:hover:not(:disabled) {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 40px #D4A01733 !important;
}
.action-btn:active:not(:disabled) {
  transform: translateY(0) !important;
}

.topic-chip {
  transition: all 0.2s;
  cursor: pointer;
}
.topic-chip:hover {
  background: #D4A01722 !important;
  border-color: var(--gold) !important;
  color: var(--gold) !important;
  transform: translateY(-2px);
}

.card-hover {
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px #D4A01720 !important;
  border-color: var(--border-glow) !important;
}

.send-btn { transition: all 0.2s; }
.send-btn:hover:not(:disabled) {
  background: var(--gold) !important;
  color: var(--cosmic) !important;
  transform: scale(1.05);
}
`

export const injectGlobalStyles = () => {
  if (!document.getElementById('iks-global-styles')) {
    const style = document.createElement('style')
    style.id = 'iks-global-styles'
    style.textContent = GLOBAL_CSS
    document.head.appendChild(style)
  }
}
