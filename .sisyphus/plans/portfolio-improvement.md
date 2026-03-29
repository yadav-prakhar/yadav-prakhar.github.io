# Portfolio Improvement Plan: yadav-prakhar.github.io

## Status
- **Phase**: PLANNED (not started)
- **Date**: 2026-03-29
- **Author**: Sisyphus planning agent

---

## Executive Summary

The current portfolio suffers from **generic "AI slop" aesthetics** common to thousands of developer portfolios:
- Overused Inter font + purple gradient clichés
- Predictable layouts with no distinctive personality
- GSAP loaded but underutilized
- Shallow content that doesn't differentiate

The goal: Transform into a **memorable, distinctive portfolio** that reflects MCP expertise and AI/ML skills while remaining professional.

---

## Phase 1: Design System Overhaul (Highest Impact)

### 1.1 Typography — Replace Inter + Jakarta Sans

**Problem**: Inter is the #1 most overused font in AI-generated content. Jakarta Sans is also generic.

**Solution**: Choose distinctive, characterful fonts:

| Role | Current | Recommended | Why |
|------|---------|-------------|-----|
| Display | Plus Jakarta Sans | **Instrument Serif** or **Fraunces** | Distinctive editorial quality, memorable |
| Body | Inter | **Source Serif 4** or **Literata** | Readable, warm, differentiates from typical sans-serif bodies |
| Mono/Code | (none) | **JetBrains Mono** or **Fira Code** | For code snippets and tech badges |

**Implementation**:
```html
<!-- Replace Google Fonts line -->
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Update CSS**:
```css
--font-display: 'Instrument Serif', Georgia, serif;
--font-body: 'Source Serif 4', Georgia, serif;
--font-mono: 'JetBrains Mono', monospace;
```

### 1.2 Color System — Escape Purple Gradient Prison

**Problem**: Purple (#8b5cf6) primary + green secondary is the hallmark of AI-generated portfolios.

**Solution**: Choose a distinctive palette. Options:

| Theme | Direction | Colors |
|-------|-----------|--------|
| **Warm Minimalist** | Editorial, paper-like | Warm off-white (#FAF7F2), deep charcoal (#1A1A1A), terracotta accent (#C4673A) |
| **Dark Brutalist** | Bold, technical | Near-black (#0D0D0D), stark white (#FFFFFF), electric blue (#0066FF) |
| **Organic Luxe** | Refined, premium | Cream (#F5F0E8), forest (#1B4332), gold accent (#B8860B) |
| **Terminal Luxe** | Developer-focused | Dark (#0A0A0A), phosphor green (#00FF41), amber (#FFB000) |

**Recommendation**: **Terminal Luxe** — reflects developer identity, MCP expertise, and stands out from purple-gradient portfolios.

**Implementation**:
```css
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #141414;
  --text-primary: #E5E5E5;
  --text-secondary: #888888;
  --accent: #00FF41; /* Phosphor green */
  --accent-alt: #FFB000; /* Amber */
  --border: #2A2A2A;
}

[data-theme="light"] {
  --bg-primary: #F5F5F0;
  --bg-secondary: #FFFFFF;
  --text-primary: #1A1A1A;
  --text-secondary: #666666;
  --accent: #00AA30;
  --accent-alt: #CC8800;
  --border: #E0E0E0;
}
```

### 1.3 Spatial System — Break the Grid

**Problem**: Standard card grids, predictable hero layouts.

**Solution**: Asymmetric, editorial layouts:

| Section | Current | Improved |
|---------|---------|----------|
| Hero | 50/50 split with floating image | Full-width typography-dominant, image as accent element in corner |
| About | 2/3 text + 1/3 image | Full-bleed image left, text overlapping on right (magazine style) |
| Projects | 3-column grid | Alternating 2-column + 1-column, some cards break grid intentionally |
| Skills | 4 equal cards | Staggered masonry-like layout with varied card heights |

**Implementation**: Remove equal-width grids, use CSS Grid with `grid-template-areas` for asymmetric layouts.

### 1.4 Motion Philosophy — Use GSAP Properly

**Problem**: GSAP loaded but barely used. Only basic IntersectionObserver fades.

**Solution**: Implement **scroll-triggered storytelling**:

| Element | Animation | GSAP Approach |
|---------|-----------|---------------|
| Hero headline | Characters/words reveal sequentially | `SplitText` + ScrollTrigger |
| Section headings | Slide in from left with stagger | `gsap.from()` with `ScrollTrigger` |
| Project cards | Cards scale and rotate slightly on scroll | `ScrollTrigger` scrub |
| Floating badges | Parallax movement | `ScrollTrigger` with `scrub: true` |
| Timeline | Line draws as you scroll | SVG `stroke-dashoffset` animation |
| Skill bars | Fill animation triggered on view | `ScrollTrigger` with `once: true` |

**Example Hero Animation** (GSAP):
```javascript
// Hero text reveal
gsap.from('.hero-headline .word', {
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out',
  ScrollTrigger: {
    trigger: '.hero-headline',
    start: 'top 80%',
  }
});

// Floating elements parallax
gsap.to('.floating-badge', {
  y: -50,
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});
```

---

## Phase 2: Content Enhancement

### 2.1 Hero Section

**Current Issues**:
- "Open to new opportunities" badge (generic)
- Standard headline: "Building modern human-centered digital products"
- 3 CTA buttons (View Projects, Contact Me, Resume)

**Recommended Changes**:

1. **Replace badge** with something authentic:
   - "Building AI-native tools" if focusing on MCP work
   - "5+ years shipping production code"
   - "MCP server enthusiast"

2. **Stronger headline** with personality:
   - "I build servers that run inside AI models" (specific to MCP)
   - "Making AI agents actually useful, one MCP server at a time"
   - "From prototype to production—without the buzzwords"

3. **Reduce CTAs** to 2 max:
   - Primary: "See my work" (links to projects)
   - Secondary: "Let's talk" (links to contact)

4. **Social links**: Add GitHub stats, stars count, or "MCP servers built" counter

### 2.2 About Section

**Current Issues**:
- Generic bio: "I specialize in building web applications..."
- Only lists tech stack badges
- Sparse personal details

**Recommended Changes**:

1. **First-person narrative** that sounds human:
   ```
   "I got into development through gaming—modding XML files taught me
   that code could shape experiences. Now I build tools that let AI
   models do the same: extend their reach through well-designed interfaces.

   When I'm not scaffolding MCP servers, I'm probably on GitHub debugging
   something at 2am or writing about what I learned."
   ```

2. **Add personal element**:
   - Photo in non-corporate setting
   - "Currently: Building [X] | Reading [Y] | Location: [Z]"

3. **Meaningful stats** (real numbers):
   - "12 MCP servers shipped" not "Advanced TypeScript"
   - "Serving N requests/month" if public
   - "Open source contributor to X projects"

### 2.3 Experience Section

**Current Issues**:
- Only 2 entries (AnoTech + MCP Maker)
- Sparse bullet points
- Timeline feels incomplete

**Recommended Changes**:

1. **Add more entries** if available:
   - Internships, freelance, academic projects
   - Even small projects count if described meaningfully

2. **Expand bullet points** with metrics:
   - "Built component library" → "Built 40+ component library used by 5 teams, reducing dev time by 25%"
   - Use **bold** for impact words: "Led", "Built", "Scaled", "Reduced"

3. **Add "What I learned"** section per role

### 2.4 Projects Section

**Current Issues**:
- No real project images (just gradient placeholders)
- MCP Maker description is sparse
- 3 projects shown, no variety

**Recommended Changes**:

1. **Add real screenshots/GIFs**:
   - Terminal recording of CLI in action
   - Web app screenshots
   - Architecture diagrams

2. **Better project cards**:
   - Live demo link (if applicable)
   - GitHub stars count
   - Tech stack as interactive badges
   - "Key achievement" line

3. **Expand to 4-6 projects**:
   - MCP-related projects first
   - Mix of CLI tools and web apps
   - Include any interesting experiments

### 2.5 Skills Section

**Current Issues**:
- Progress bars are clichéd and meaningless (who rates themselves 85%?)
- Categorization is generic (Languages, Frontend, Backend, AI/ML)

**Recommended Changes**:

1. **Remove progress bars** entirely—they're meaningless

2. **Group by "What I build with"** instead:
   - "AI Integrations (MCP, OpenAI, LangChain)"
   - "Frontend (React, TypeScript, CSS)"
   - "Backend (Node.js, REST APIs)"
   - "Tools (Git, Docker, CLI)"

3. **Add actual proficiency indicators**:
   - "Daily driver" for technologies used constantly
   - "Exploring" for new additions
   - No percentage numbers

### 2.6 Contact Section

**Current Issues**:
- Formspree action has placeholder "your-id"
- Generic "Let's work together"

**Recommended Changes**:

1. **Fix Formspree integration**:
   - Create actual Formspree account
   - Replace `your-id` with real form ID
   - Test that submissions work

2. **More engaging copy**:
   - "Got a project? Let's build something."
   - " reach out at [email] or use the form below"
   - Response time expectation: "I reply within 48 hours"

3. **Alternative contact methods**:
   - Calendly link for scheduling
   - Discord handle if active
   - Twitter DMs open

---

## Phase 3: Technical Improvements

### 3.1 Build Process

**Current**: CDN Tailwind, inline config, no build step.

**Target**: Proper build pipeline for production optimization.

| Change | Benefit |
|--------|---------|
| Add PostCSS + Tailwind CLI | Tree-shaking, unused CSS removal |
| Add `tailwindcss-build` script | ~70% smaller CSS bundle |
| Minify HTML | Faster page load |
| Add `perflint` or Lighthouse CI | Performance monitoring |

**Implementation**:
```bash
# Install
npm install -D tailwindcss postcss autoprefixer

# Config files
npx tailwindcss init -p

# Add to package.json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./css/styles.css --minify",
    "build": "npm run build:css"
  }
}
```

### 3.2 TypeScript Migration

**Current**: Vanilla JS

**Target**: TypeScript for better maintainability

| File | Current | Target |
|------|---------|--------|
| js/main.js | JavaScript | ts/main.ts |

**Phased approach**:
1. Add TypeScript config (`tsconfig.json`)
2. Rename `main.js` → `main.ts`
3. Add types gradually
4. Consider component extraction

### 3.3 OG Image Generation

**Issue**: `og-cover.png` referenced but likely missing/not optimized.

**Solution**:
1. Create `og-image.png` (1200x630)
2. Use services like:
   - `og.untitled.dev` for programmatic generation
   - Figma template for static
   - `satori` for React-based

**Implementation**:
```html
<meta property="og:image" content="https://yadav-prakhar.github.io/og-cover.png" />
```

### 3.4 Performance Optimization

| Metric | Current | Target |
|--------|---------|--------|
| First Contentful Paint | ~2s | <1.5s |
| Largest Contentful Paint | ~3s | <2.5s |
| Total Blocking Time | unknown | <200ms |

**Quick wins**:
1. Add `loading="lazy"` to below-fold images
2. Add `font-display: swap` to Google Fonts
3. Preconnect to critical origins
4. Inline critical CSS (above-fold styles)
5. Defer non-critical JS (GSAP can load async)

### 3.5 Accessibility

| Issue | Fix |
|-------|-----|
| Color contrast | Ensure 4.5:1 for text, 3:1 for large text |
| Focus indicators | Add visible focus styles for keyboard nav |
| ARIA labels | Improve button/link descriptions |
| Reduced motion | Respect `prefers-reduced-motion` |

---

## Phase 4: Differentiation (Memorable Factor)

### 4.1 MCP-Specific Section

**Current**: MCP Maker is just one project among three.

**Target**: Dedicated MCP showcase section or prominent positioning.

**Ideas**:
1. **"MCP Server Gallery"** section:
   - List of MCP servers built
   - Architecture diagrams
   - Live demo links

2. **"How I built X"** blog posts linked from portfolio

3. **Terminal-style interactive** element:
   - Type `mcp-maker --help` to see CLI help
   - Animated in hero section

### 4.2 Interactive Terminal Hero

**Current**: Static hero with floating image.

**Target**: Replace/augment with CLI-inspired terminal widget.

**Implementation**:
```html
<div class="terminal-widget">
  <div class="terminal-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="terminal-title">~/prakhar</span>
  </div>
  <div class="terminal-body">
    <p class="prompt">$ <span class="cursor">|</span></p>
  </div>
</div>
```

**Animation**:
- Type out commands on load
- Show help output for MCP commands
- Blinking cursor

### 4.3 Unique Section: "Now Building"

**Add a time-sensitive section** showing current projects:
```html
<div class="now-section">
  <h3>Now Building</h3>
  <p>Real-time look at what I'm working on:</p>
  <div class="current-project">
    <span class="tag">In Progress</span>
    <span class="name">mcp-server-template-v2</span>
    <span class="desc">Better DX for scaffolding MCP servers</span>
  </div>
</div>
```

This adds authenticity and shows active development.

---

## Implementation Phases

### Phase A: Quick Wins (1-2 days)
- [ ] Replace Inter + Jakarta Sans fonts
- [ ] Update color scheme to Terminal Luxe
- [ ] Fix Formspree form ID
- [ ] Add real project screenshots
- [ ] Add OG image

### Phase B: Design Refresh (3-5 days)
- [ ] Redesign hero with terminal widget
- [ ] Implement GSAP scroll animations
- [ ] Break the grid with asymmetric layouts
- [ ] Redesign skill section (remove progress bars)
- [ ] Improve About section content

### Phase C: Content Enhancement (2-3 days)
- [ ] Rewrite all section copy
- [ ] Add MCP showcase section
- [ ] Expand experience with more entries
- [ ] Add "Now Building" section
- [ ] Improve project descriptions

### Phase D: Technical Debt (2-3 days)
- [ ] Set up proper Tailwind build
- [ ] TypeScript migration
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Add Lighthouse CI

---

## Files to Modify

| File | Changes |
|------|---------|
| index.html | Full redesign: sections, copy, structure |
| css/styles.css | New design system: colors, typography, animations |
| js/main.js | GSAP animations, TypeScript migration |
| package.json | Add Tailwind build scripts |
| tailwind.config.js | New color palette, font config |

## Files to Create

| File | Purpose |
|------|---------|
| og-cover.png | Social sharing image |
| ts/main.ts | TypeScript version of main.js |
| postcss.config.js | PostCSS configuration |
| tsconfig.json | TypeScript configuration |

---

## Success Metrics

After implementation:

1. **Lighthouse Performance**: 90+ on mobile
2. **Unique visitors increase**: Track via analytics
3. **GitHub profile views**: Increase after MCP focus
4. **Contact form submissions**: Working form with real responses
5. **Feedback**: "Your portfolio is different—how did you build that terminal thing?"

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Design overhaul too drastic | Phase it, get feedback after each phase |
| GSAP animations hurt performance | Use `will-change`, limit to hero section |
| Terminal widget distracts | Keep it subtle, optional for users |
| Color scheme alienates existing visitors | A/B test or keep light mode as default |
