---
name: 6-geniuses-divergents
description: >
  Design system and content guide for Divergents.kz — the Russian-language
  "6 Types of Working Genius" team assessment. Use for any new screen, email,
  PDF, social post, or feature that should feel like part of the Divergents
  product.
---

# 6 Geniuses · Divergents

Russian-language talent-assessment product (Kazakhstan) based on Patrick
Lencioni's *The Six Types of Working Genius*. The visitor enters their name,
answers 42 statements (agree / sometimes / disagree), and receives a visual
report plus a printable 5-page PDF.

## Before you design anything

1. **Read `README.md`** — it is the long-form brand book. Content voice,
   colors, type, animation rules, iconography.
2. **Import `colors_and_type.css`** — CSS custom properties for the full
   palette, type scale, radii and elevation. Don't redefine tokens; reuse.
3. **Look at `preview/`** — every token rendered as a card. Colors, type,
   buttons, answer buttons, form fields, detail cards, pills, elevation.
4. **Copy from `ui_kits/site/`** for web screens. From `pdf_report/` for
   printed / PDF output. Both are production-quality references.

## Core rules

- **Voice:** Russian, *ты* (informal you), short declarative sentences,
  warm but precise. Never *вы*, never exclamation marks in body copy.
- **Every strength has a shadow.** "Сила" is always paired with "Тень" when
  describing a genius. That duality is the voice.
- **Two typefaces only:** Unbounded (display, -0.01 to -0.02em tracking)
  and Manrope (body). Both have strong Cyrillic support.
- **No emoji.** Six Unicode glyphs do icon duty: ✦ ✸ ◈ ▲ ♥ ◆.
- **Dark web, light print.** Navy glass + gradient glow on screen. Warm
  paper (#faf8f3) + flat hairline borders in PDFs.
- **Each of the six geniuses owns a hue.** Keep those assignments fixed.

| Key | Russian | English | Color |
|---|---|---|---|
| W | Задумка | Wonder | `#8b5cf6` |
| I | Изобретение | Invention | `#f59e0b` |
| D | Оценка | Discernment | `#14b8a6` |
| G | Гальванизация | Galvanizing | `#ef4444` |
| E | Поддержка | Enablement | `#10b981` |
| T | Доводка | Tenacity | `#3b82f6` |

## When something is unclear

- Is it a new screen on the site? → match `ui_kits/site/`.
- Is it a printed / email / PDF artifact? → match `pdf_report/`.
- Is it an ad or social post? → use the cosmic glass aesthetic from the
  site, crop to the hero sunrise glow, keep the wordmark small.
- Is it a new icon? → flag to the brand owner. Default is "no icon".
