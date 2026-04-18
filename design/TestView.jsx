:root {
  --bg: #0a0e1a;
  --bg-soft: #111831;
  --surface: rgba(255, 255, 255, 0.04);
  --surface-strong: rgba(255, 255, 255, 0.07);
  --border: rgba(255, 255, 255, 0.09);
  --border-strong: rgba(255, 255, 255, 0.16);
  --text: #eef2ff;
  --text-dim: #a6b0cf;
  --text-muted: #6f7896;
  --accent: #7c9cff;
  --accent-2: #b794ff;
  --accent-3: #ffb199;
  --success: #10b981;
  --error: #f87171;
  --radius: 18px;
  --radius-sm: 12px;
  --shadow-lg: 0 30px 80px -20px rgba(0, 0, 0, 0.6);
  --font-body: 'Manrope', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  --font-display: 'Unbounded', 'Manrope', system-ui, sans-serif;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  min-height: 100%;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
}

button, input { font-family: inherit; }
button { cursor: pointer; border: 0; background: none; color: inherit; }

/* ===== Background ===== */
.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 0%, black 0%, transparent 80%);
  pointer-events: none;
  z-index: 0;
}

.bg-glow {
  position: fixed;
  top: -250px; left: 50%;
  transform: translateX(-50%);
  width: 900px; height: 700px;
  background:
    radial-gradient(closest-side, rgba(124,156,255,0.35), transparent 70%),
    radial-gradient(closest-side, rgba(183,148,255,0.25) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

/* ===== Layout ===== */
.topbar {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.02em;
  color: inherit;
  text-decoration: none;
}
.brand-wordmark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: var(--text);
}
.brand-divider { color: var(--text-muted); font-weight: 400; font-size: 18px; }
.brand-sub { color: var(--text-dim); font-weight: 500; font-size: 17px; }

@media (max-width: 640px) {
  .brand { gap: 10px; }
  .brand-wordmark { font-size: 19px; }
  .brand-sub { font-size: 14px; }
}
@media (max-width: 440px) {
  .brand-divider, .brand-sub { display: none; }
}

main {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 28px 80px;
}

.view { animation: fadeIn 0.4s ease; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 24px;
  color: var(--text-muted);
  font-size: 13px;
}

/* ===== Hero / Intro ===== */
.hero {
  max-width: 760px;
  margin: 24px auto 0;
  text-align: center;
}
.hero-eyebrow {
  display: inline-block;
  padding: 6px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 22px;
  background: var(--surface);
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 62px);
  line-height: 1.05;
  margin: 0 0 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.grad-text {
  background: linear-gradient(135deg, #7c9cff 0%, #b794ff 45%, #ffb199 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-sub {
  font-size: 17px;
  color: var(--text-dim);
  max-width: 560px;
  margin: 0 auto 36px;
}

.hero-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-lg);
  text-align: left;
}

.field {
  display: block;
  margin-bottom: 14px;
}
.field-label {
  display: block;
  font-size: 13px;
  color: var(--text-dim);
  margin-bottom: 8px;
  font-weight: 500;
}
.field .muted { color: var(--text-muted); font-weight: 400; }

.field input {
  width: 100%;
  padding: 14px 16px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.field input:focus {
  border-color: var(--accent);
  background: rgba(0, 0, 0, 0.4);
}

/* ===== Buttons ===== */
.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 22px;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #7c9cff, #b794ff);
  color: #0a0e1a;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.01em;
  transition: transform 0.15s, filter 0.15s, box-shadow 0.2s;
  box-shadow: 0 8px 24px -8px rgba(124, 156, 255, 0.6);
}
.primary-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.primary-btn:active { transform: translateY(0); }
.primary-btn .arrow { font-size: 18px; transition: transform 0.2s; }
.primary-btn:hover .arrow { transform: translateX(3px); }

.ghost-btn {
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-dim);
  font-weight: 600;
  font-size: 14px;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.ghost-btn:hover:not(:disabled) {
  background: var(--surface-strong);
  color: var(--text);
  border-color: var(--border-strong);
}
.ghost-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.error {
  color: var(--error);
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0;
}

/* ===== Hero Geniuses Preview ===== */
.hero-geniuses {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 32px;
}
.hero-genius {
  padding: 14px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  text-align: center;
  font-size: 12px;
  color: var(--text-dim);
  transition: transform 0.2s, border-color 0.2s;
}
.hero-genius:hover { transform: translateY(-2px); border-color: var(--border-strong); }
.hero-genius .g-icon { font-size: 20px; display: block; margin-bottom: 4px; }
.hero-genius .g-name { font-weight: 600; color: var(--text); font-size: 13px; }

@media (max-width: 640px) {
  .hero-geniuses { grid-template-columns: repeat(3, 1fr); }
}

/* ===== Test View ===== */
.view-test { max-width: 720px; margin: 20px auto 0; }

.progress-wrap { margin-bottom: 28px; }
.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-dim);
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
}
.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c9cff, #b794ff);
  width: 2%;
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  border-radius: 999px;
}

.question-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px 32px;
  margin-bottom: 20px;
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-lg);
  animation: slideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

.question-number {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
  font-weight: 600;
}
.question-text {
  font-family: var(--font-display);
  font-size: clamp(20px, 2.8vw, 26px);
  font-weight: 500;
  line-height: 1.35;
  margin: 0 0 30px;
  letter-spacing: -0.01em;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border-strong);
  background: rgba(0, 0, 0, 0.18);
  color: var(--text);
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.18s;
}
.answer-btn:hover {
  border-color: var(--accent);
  background: rgba(124, 156, 255, 0.08);
  transform: translateX(3px);
}
.answer-btn.selected {
  border-color: var(--accent);
  background: rgba(124, 156, 255, 0.15);
}
.answer-btn .dot {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--border-strong);
  flex-shrink: 0;
  transition: all 0.18s;
  position: relative;
}
.answer-btn:hover .dot,
.answer-btn.selected .dot {
  border-color: var(--accent);
}
.answer-btn.selected .dot::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--accent);
}

.test-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}
.hint { color: var(--text-muted); font-size: 13px; }

/* ===== Results View ===== */
.view-results { max-width: 1040px; margin: 10px auto 0; }

.results-header {
  text-align: center;
  margin-bottom: 40px;
}
.results-eyebrow {
  display: inline-block;
  padding: 6px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 18px;
  background: var(--surface);
}
.results-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 5vw, 48px);
  margin: 0 0 10px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.results-sub {
  color: var(--text-dim);
  font-size: 16px;
  margin: 0;
}

.results-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}
@media (max-width: 860px) { .results-grid { grid-template-columns: 1fr; } }

.chart-card, .top-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  backdrop-filter: blur(14px);
}
.card-title {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
  margin-bottom: 18px;
}
.chart-box {
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 460px;
  margin: 0 auto;
}
.legend {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 16px;
  margin-top: 22px;
  font-size: 13px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-dim);
}
.legend-item .swatch {
  width: 12px; height: 12px; border-radius: 3px;
  flex-shrink: 0;
}
.legend-item .score {
  margin-left: auto;
  color: var(--text);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.top-list, .mid-list, .low-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.genius-pill {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-strong);
}
.genius-pill .g-mark {
  width: 40px; height: 40px;
  display: grid; place-items: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}
.genius-pill .g-info {
  flex: 1;
  min-width: 0;
}
.genius-pill .g-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  margin-bottom: 2px;
}
.genius-pill .g-tag {
  color: var(--text-muted);
  font-size: 12px;
}
.genius-pill .g-score {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* Details */
.results-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}
@media (max-width: 720px) { .results-details { grid-template-columns: 1fr; } }

.detail-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  position: relative;
  overflow: hidden;
}
.detail-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--g-color, var(--accent));
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}
.detail-mark {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
}
.detail-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 2px;
}
.detail-sub {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
}
.detail-score {
  margin-left: auto;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
}
.detail-desc {
  color: var(--text-dim);
  font-size: 14.5px;
  line-height: 1.6;
  margin: 0 0 14px;
}
.detail-meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  font-size: 13px;
}
.detail-meta .meta-row {
  display: flex; gap: 8px;
}
.detail-meta .meta-label {
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 11px;
  font-weight: 700;
  width: 72px;
  flex-shrink: 0;
  padding-top: 3px;
}
.detail-meta .meta-value {
  color: var(--text);
}

.results-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.results-actions .primary-btn {
  width: auto;
  min-width: 180px;
}
.save-status {
  text-align: center;
  margin: 16px 0 0;
  font-size: 13px;
  color: var(--text-muted);
}
.save-status.success { color: var(--success); }
.save-status.error { color: var(--error); }

.print-footer { display: none; }

/* ===== Print / PDF ===== */
@page { size: A4; margin: 6mm 14mm 18mm; }

@media print {
  .bg-grid, .bg-glow, .footer, .results-actions, #restartBtn, .results-eyebrow { display: none !important; }
  body { background: white; color: black; }
  .view-results { max-width: 100%; }

  .topbar {
    display: flex !important;
    justify-content: center !important;
    padding: 0 0 10px !important;
    max-width: 100% !important;
    border-bottom: 1px solid #ddd;
    margin: 0 0 14px !important;
  }
  .topbar-actions { display: none !important; }
  .brand { gap: 12px !important; }
  .brand-wordmark, .brand-sub, .brand-divider {
    font-family: var(--font-display) !important;
    color: #111 !important;
  }
  .brand-wordmark { font-size: 20px !important; font-weight: 700 !important; }
  .brand-divider { font-size: 18px !important; font-weight: 500 !important; color: #666 !important; }
  .brand-sub { font-size: 19px !important; font-weight: 600 !important; color: #222 !important; }

  .results-header { margin-bottom: 26px !important; }

  .chart-card, .top-card, .detail-card {
    background: white !important;
    border: 1px solid #ccc !important;
    box-shadow: none !important;
    break-inside: avoid;
  }
  .card-title, .detail-sub, .detail-meta .meta-label, .hint, .legend-item { color: #555 !important; }
  .results-title, .results-sub, .question-text, .genius-pill .g-name, .detail-title { color: #111 !important; }
  main { padding: 0; }

  .print-footer {
    display: block !important;
    position: fixed;
    bottom: 6mm;
    left: 14mm;
    font-family: var(--font-body);
    font-size: 11px;
    color: #666;
    letter-spacing: 0.02em;
  }
}

/* ===== Mobile ===== */
@media (max-width: 540px) {
  .topbar { padding: 18px 18px; }
  main { padding: 12px 18px 60px; }
  .hero-card { padding: 20px; }
  .question-card { padding: 24px 20px; }
  .chart-card, .top-card { padding: 20px; }
}
