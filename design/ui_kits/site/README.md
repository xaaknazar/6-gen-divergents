# Divergents · 6 Geniuses Website UI Kit

Clickable recreation of the single-page Divergents test site. Cycle through
the three views with the top-right switcher: `Intro → Test → Results`.

## Files

- `index.html` — mounts `<App>` with view switcher; renders the three screens.
- `tokens.js` — `window.dsTokens` (colors, fonts, shadows) + `window.dsGeniuses`
  (full 6-type metadata, same shape as `source/geniuses.js`).
- `Chrome.jsx` — `SiteBackground`, `TopBar`, `Footer`, `PrimaryButton`,
  `GhostButton`, `Eyebrow`.
- `IntroView.jsx` — hero, name + email form, six-genius preview grid.
- `TestView.jsx` — progress bar, question card, three-option answer buttons.
- `ResultsView.jsx` — radar chart (Chart.js), ranked pill lists, detail cards,
  action row.

## What's faithful to the real site

- Layout, spacing, and typography match `source/styles.css` line-for-line
- Colors, backgrounds (grid + glow), and glass cards are identical
- Radar chart uses the same Chart.js config
- All Russian copy is drawn from the production `geniuses.js` / `questions.js`

## What's shortened

- Question bank is 5 questions on a loop (real site is 42)
- Demo results use a fixed score pattern (W/E-dominant profile)
- Google Sheets submission is stubbed
- PDF printing is replaced by the standalone `pdf_report/` deliverable
