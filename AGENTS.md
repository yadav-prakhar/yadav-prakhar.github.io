# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-29
**Commit:** 600bc1e
**Branch:** main

## OVERVIEW

Static portfolio website for Prakhar Yadav. Vanilla TypeScript + Tailwind CSS with GSAP animations. Deployed to GitHub Pages.

## STRUCTURE

```
/
├── index.html          # Single-page site (1219 lines)
├── js/main.ts          # TypeScript source → compiles to main.js
├── css/styles.css      # Tailwind CSS (built in-place)
├── images/             # Static assets (4 files)
└── .github/workflows/  # GitHub Pages deployment
```

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Theme toggle logic | `js/main.ts:21-57` |
| Terminal widget animation | `js/main.ts:91-256` |
| GSAP scroll animations | `js/main.ts:258-349` |
| Intersection observer (fade) | `js/main.ts:351-366` |
| Tailwind theme colors | `tailwind.config.js:15-29` |
| Dark mode strategy | `tailwind.config.js:3` |

## CONVENTIONS

- **TypeScript**: Non-strict mode (`"strict": false`)
- **Dark mode**: Dual strategy — `class` + `[data-theme="dark"]`
- **Colors**: Custom `accent` (green) and `accent-alt` (amber) palettes
- **Fonts**: Instrument Serif (display), Source Serif 4 (body), JetBrains Mono (code)
- **GSAP**: Loaded via CDN, typed as `any` (no @types/gsap)
- **Build**: TypeScript compiles in-place (`js/main.ts` → `js/main.js`)

## ANTI-PATTERNS (THIS PROJECT)

- No `src/` or `dist/` separation — source and compiled files in same directories
- `dev` script only watches CSS, not JS — must manually rebuild TypeScript
- No linting or formatting configured

## COMMANDS

```bash
npm run build        # Build CSS + JS
npm run build:css    # Tailwind CSS (minified)
npm run build:js     # TypeScript → JS (non-strict)
npm run dev          # Watch CSS only
```

## NOTES

- GSAP + ScrollTrigger loaded from CDN in `index.html`
- `prefers-reduced-motion` respected in JS (line 89)
- Newsletter form has client-side only handler (no backend)
- Terminal widget simulates CLI commands with typing animation
