# PDF Talent Report

The main new deliverable from the brief: a 5-page printable report that
a user downloads after completing the test. Designed in Russian, *ты*
voice, mapped from the English original (Togzhan's report) that came with
the brief.

## Pages

1. **Cover** — name, lead sentence, full six-gear row with top two highlighted, the "Ведущие таланты" callout card.
2. **Overview** — explanation of the model, arrow flow of the 6 types, grid of definitions.
3. **Working Geniuses** — 🟢 green accent. Top-2 pair in detail.
4. **Working Competencies** — 🟡 amber accent. Middle pair.
5. **Working Frustrations** — 🔴 red accent. Bottom pair.

## Files

- `index.html` — full 5-page doc, print-ready (A4).
- `GearSVG.jsx` — gear graphic shared across pages.
- `ReportShell.jsx` — page frame, header, footer, side monogram.
- `CoverPage.jsx`, `OverviewPage.jsx`, `ResultsPages.jsx` — the pages.

Open and press ⌘P / Ctrl+P → Save as PDF.

## Visual choices vs the dark website

The report inverts the system: warm paper (`#faf8f3`) canvas, dark ink
(`#1a1d24`), flat cards with hairline borders, no glass, no blur. Each
results page still gets an accent color (green / amber / red) tying the
report to the website's color vocabulary. The Unbounded + Manrope pairing
is preserved.
