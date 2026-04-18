# 6 Geniuses · Divergents Design System

The **6 Geniuses Team Test** is a single-page Russian-language assessment by
**Divergents** (Kazakhstan). A visitor enters their name + email, answers 42
statements (agree / sometimes / disagree), and receives a visual report: a
radar chart, ranked list of their 6 talent scores, and a three-page printable
PDF breakdown of their Working Geniuses, Competencies, and Frustrations. The
methodology is derived from Patrick Lencioni's *The Six Types of Working
Genius* (The Table Group), localized to Russian with Kazakh-style warmth.

> Divergents.kz · est. 2020

## The six types (Russian / English)

| Key | Russian | English | Glyph | Color |
|-----|---------|---------|-------|-------|
| W | Задумка | Wonder | ✦ | Violet `#8b5cf6` |
| I | Изобретение | Invention | ✸ | Amber `#f59e0b` |
| D | Оценка | Discernment | ◈ | Teal `#14b8a6` |
| G | Гальванизация | Galvanizing | ▲ | Red `#ef4444` |
| E | Поддержка | Enablement | ♥ | Emerald `#10b981` |
| T | Доводка | Tenacity | ◆ | Blue `#3b82f6` |

## Sources this system was built from

- **GitHub repo:** `xaaknazar/6-gen-divergents` (imported into `source/`)
  - `index.html`, `styles.css`, `script.js` — the live product
  - `geniuses.js` — canonical names, colors, icons, descriptions
  - `questions.js` — full Russian question bank
- **Attached brief:** the English-language *Working Genius Assessment Report*
  PDF (Togzhan's report) — used as the structural template for the printable
  PDF report in Russian.

## Index

- `README.md` — this file
- `colors_and_type.css` — CSS custom properties: palette, type scale, radii,
  shadows, semantic roles. **Import this first** in anything you build.
- `fonts/` — (Google Fonts reference — `Manrope` + `Unbounded`; loaded via
  `<link>` since they're free webfonts)
- `assets/` — logo wordmark, genius glyphs, background motifs
- `preview/` — design-system preview cards (colors, type, components)
- `ui_kits/site/` — React recreation of the one-page test site
- `pdf_report/` — redesigned 5-page printable talent report (Cover ·
  Overview · Geniuses · Competencies · Frustrations). This is the main new
  deliverable requested in the brief.
- `source/` — verbatim copy of the `xaaknazar/6-gen-divergents` repo for
  reference. Do not edit; this is the upstream.
- `SKILL.md` — machine-readable skill manifest (works as an Agent Skill)

---

## CONTENT FUNDAMENTALS

**Language.** Russian, informal *ты* throughout. The product speaks directly
to the user like a thoughtful coach, not a corporation. English is only used
as a quiet subtitle under Russian labels (`Задумка / Wonder`) to anchor the
methodology for readers familiar with the original Lencioni framework.

**Tone.** Warm, precise, slightly poetic. Sentences are short and declarative.
Psychology-adjacent without being clinical. No hype, no corporate softeners.
No exclamation marks in body copy.

**Casing.**
- Headlines: sentence case in Russian (`Найди свой рабочий талант`).
- Short uppercase eyebrows with wide tracking for section labels:
  `РЕЗУЛЬТАТ`, `OV ERV IEW`, `RESULTS` — lean on letter-spacing to give
  presence rather than making text big.
- Genius names on PDF page headings: UPPERCASE (`ЗАДУМКА`, `ПОДДЕРЖКА`).

**Pronouns.** Always second-person singular *ты / тебе / твой*. Never *вы*.
This is the biggest voice decision — the product feels like a trusted friend
speaking, not a formal assessment tool.

**Emoji.** None. Six typographic glyphs (`✦ ✸ ◈ ▲ ♥ ◆`) do the work of icons.
Unicode geometry, not emoji.

**Example copy (verbatim from product):**

> *Найди свой **рабочий талант***
> 42 утверждения · 5–7 минут
>
> *Твои рабочие таланты*
> По результатам теста, твои рабочие таланты — **Задумка** и **Поддержка**.
> Это деятельность, которая приносит тебе радость, энергию и страсть.
>
> *Сила:* Замечаете возможности, которых не видят другие.
> *Тень:* Иногда застреваете в размышлениях без действий.

Note the "Сила / Тень" (Strength / Shadow) pairing — every genius has both. A
strength is never described without naming its shadow side. That duality is
the voice of the product.

**Button labels.** Imperative, short, no period:
`Начать тест`, `Скачать PDF`, `Скопировать результат`, `Пройти заново`.

**Microcopy.** Hints use light gray text, lowercase, full sentence:
`Нажмите на вариант, чтобы продолжить`.

---

## VISUAL FOUNDATIONS

**Mood.** Late-night cosmic study hall. Deep navy canvas, glassy translucent
cards, a soft lavender-peach sunrise glowing from the top of the page. It
should feel introspective, not clinical; warm in its cool palette.

**Colors.**
- Canvas: `#0a0e1a` (near-black navy) with a faint soft variant `#111831`.
- Surfaces: white-on-black alpha — `rgba(255,255,255,0.04)` for resting
  cards, `0.07` for raised. Borders `rgba(255,255,255,0.09 / 0.16)`.
- Text: `#eef2ff` primary, `#a6b0cf` secondary, `#6f7896` muted.
- Signature accent gradient (used on the primary button, progress bar,
  gradient text, radar outline):
  `linear-gradient(135deg, #7c9cff 0%, #b794ff 45%, #ffb199 100%)`.
- Six talent colors — each genius owns its hue; used at full saturation for
  pips/dots and at 15% alpha for backgrounds behind glyph marks.
- Semantic: success `#10b981` (reuses Enablement green), error `#f87171`.

**Type.**
- **Display — Unbounded** (weights 500 / 700). Used for: hero title,
  question text, results title, detail card titles, PDF page titles, the
  brand wordmark, score numbers. Slightly rounded geometric display face
  with a modern Cyrillic cut. Always paired with negative letter-spacing
  (-0.01 to -0.02em) to keep it tight.
- **Body — Manrope** (weights 400 / 500 / 600 / 700 / 800). Everything
  else. Excellent Cyrillic support, friendly humanist proportions, neutral
  enough to sit quietly behind Unbounded.
- Sizes: hero `clamp(36px, 6vw, 62px)`, results title `clamp(30px, 5vw,
  48px)`, question `clamp(20px, 2.8vw, 26px)`, detail card title 20px,
  body 16px, small 13px, eyebrow 12px.
- Eyebrow labels use `letter-spacing: 0.12em; text-transform: uppercase`.

**Backgrounds.** Two fixed, full-viewport decorative layers behind
everything:
1. **Grid** — 56px × 56px pale-white grid, 3.5% alpha, masked with a
   radial fade from the top-center so the grid dissolves into black around
   the edges.
2. **Glow** — a 900×700px soft double-radial (indigo over lavender),
   top-center, `filter: blur(40px)`. Mimics a low-pressure aurora.

Cards float above this with `backdrop-filter: blur(14px)`, giving the
glassmorphism quality that's central to the brand. PDF/print replaces this
with flat white.

**Animation.** Restrained and purposeful, never bouncy.
- View transitions: 400ms fade + 8px rise.
- Question card enter: 350ms slide-up, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Progress bar: 400ms width transition on the same easing.
- Button hover: 150ms `transform: translateY(-1px)` + `filter:
  brightness(1.08)`. Never scale > 1.02.
- Answer button hover: border turns accent-indigo + 3px rightward nudge.
  No bounce, no shadow swell.

**Hover / press.**
- Primary button: hover brightens 8% and lifts 1px; press returns to rest.
  Arrow glyph nudges 3px right on hover.
- Ghost button: surface brightens from 4% to 7% alpha, border deepens.
- Answer button: border → indigo, background tints indigo at 8% alpha,
  nudges right 3px. Selected state fills the dot with the accent color.

**Borders.** Hairline 1px borders at 9–16% white. No drop-shadows visible
on light surfaces. One heavy ambient shadow on top-level cards:
`0 30px 80px -20px rgba(0,0,0,0.6)` — it reads as depth, not a drop.

**Corners.** Two radii only:
- `--radius: 18px` for large surfaces (cards, hero).
- `--radius-sm: 12px` for inputs, buttons, pills, inner marks.
- Small square chips (legend swatches, genius marks) use `10px` or `3px`.

**Transparency / blur.** Glass cards (`rgba(255,255,255,0.04)` +
`backdrop-filter: blur(14px)`) are the system's signature. Use them for
anything that should feel like it's floating. The grid + glow show
through. Never stack more than two glass layers.

**Layout.** Generous vertical rhythm. Max content widths are mood-specific:
720px for the test (one question deep-focus), 1040px for results
(dashboard breadth), 760px for intro. Center-aligned hero; left-aligned
forms.

**Iconography.** See `ICONOGRAPHY` below. TL;DR: six Unicode glyphs, no
icon font, no SVG library.

**Imagery.** None. This is a content-free visual system — no photography,
no illustration. The six colored glyphs + the gradient glow + the radar
chart carry all the visual weight. Resist the urge to add stock imagery.

**Print vs screen.** The PDF report inverts the system: white background,
black type, flat cards with 1px gray borders, no blur, no grid, no glow.
The gear SVG (rendered in `script.js`) becomes the hero visual. Each PDF
page is a section header with an accent color (green for Geniuses, amber
for Competencies, red for Frustrations) — the only place the system
leaves the navy canvas.

---

## ICONOGRAPHY

**Approach:** minimalist typographic. The brand has **no icon library and no
logo mark** — only a wordmark (`Divergents`) in Unbounded 700.

**The six genius glyphs are Unicode characters**, chosen for geometric
distinctiveness rather than semantic meaning:

- **W · Wonder** — `✦` (U+2726, black four-pointed star)
- **I · Invention** — `✸` (U+2738, heavy eight-pointed teardrop-spoked asterisk)
- **D · Discernment** — `◈` (U+25C8, white diamond containing black diamond)
- **G · Galvanizing** — `▲` (U+25B2, black up-pointing triangle)
- **E · Enablement** — `♥` (U+2665, black heart suit)
- **T · Tenacity** — `◆` (U+25C6, black diamond)

They're rendered in `Unbounded` at display sizes and always colored with
their genius hue, usually on a 15% alpha background chip. The monogram
letters (W/I/D/G/E/T) are an alternate encoding used inside the PDF gear
graphic.

**Other icons in the product:** none. The arrow in the primary button is a
literal `→` glyph. The check mark in the save-status is `✓`. Back arrow is
`←`. Progress uses a plain gradient bar, not a spinner.

**If you need additional icons** (e.g. for new screens): use **Lucide**
stroke icons at 1.5px stroke weight, monochrome `var(--text-dim)`. They sit
well next to the geometric glyphs without competing. Flag to the brand owner
before adding — the no-icon rule is a feature.

**Emoji:** never.
