# AMG-GEO-Mineral Website — Technical Architecture

## Overview
Multi-page static marketing website for AMG-GEO-Mineral, an AI-native GEO (Generative Engine Optimization) digital marketing agency. Built with vanilla HTML5, CSS3, and vanilla JS. No framework dependencies — deployable from any static host.

## Pages
1. **Landing Page** (`index.html`) — Hero, value proposition, featured services, industry stats, GEO definition, CTA
2. **About Page** (`pages/about.html`) — Company story, GEO methodology, why GEO section
3. **Services Page** (`pages/services.html`) — 3-tier GEO service catalog (Diagnostic, Standard, Enterprise)
4. **Contact Page** (`pages/contact.html`) — Contact form with validation, company info, map placeholder

## Design Direction
- **Tone**: Professional, modern, AI-driven — a digital marketing agency
- **Color Palette**: Deep navy/charcoal base, blue accent (AI/tech), purple-gold highlights, clean whites
- **Typography**: IBM Plex Sans (body), Crimson Pro (serif headings for authority), IBM Plex Mono (data)
- **Layout**: Full-width sections with generous whitespace, sticky nav, footer

## Tech Stack
- HTML5 semantic markup
- CSS3 (custom properties, flexbox, grid, responsive breakpoints)
- Vanilla JavaScript (form validation, smooth scroll, mobile nav toggle)
- No build step — direct deploy to any static host

## File Structure
```
amg-geo-site/
├── index.html              # Landing page
├── pages/
│   ├── about.html          # About page
│   ├── services.html       # Services page
│   └── contact.html        # Contact page
├── assets/
│   ├── css/
│   │   └── main.css        # Global styles (shared across all pages)
│   ├── js/
│   │   └── main.js         # Shared JS (nav, form validation, utilities)
│   └── images/             # Image assets (logos, favicon)
├── ARCHITECTURE.md         # This file
└── vercel.json             # Vercel deployment config
```

## Brand Identity
- **Company**: AMG-GEO-Mineral
- **Service**: GEO (Generative Engine Optimization) — 生成式引擎优化
- **Target Market**: Chinese enterprises with digital marketing needs (SaaS, education, healthcare, local services)
- Colors defined as CSS custom properties in `:root` in `main.css`

## Assignment
- **Content Team**: Write Chinese-language marketing copy for all pages targeting Chinese enterprise clients
- **Frontend Developer**: Build all HTML/CSS/JS files per this architecture. Implement responsive design, semantic HTML, form validation.
- **Senior Developer**: Review output for code quality, accessibility, performance, and security. Ensure cross-browser compatibility.
