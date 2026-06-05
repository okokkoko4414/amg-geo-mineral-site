# AMG-GEO-Mineral Website — Technical Architecture

## Overview
Professional multi-page static website for AMG-GEO-Mineral, a mining/geology services company. Built with vanilla HTML5, CSS3, and vanilla JS. No framework dependencies — deployable from any static host.

## Pages
1. **Landing Page** (`index.html`) — Hero, value proposition, featured services, company stats, CTA
2. **Services Page** (`pages/services.html`) — Detailed service catalog with geology/mining focus
3. **Contact Page** (`pages/contact.html`) — Contact form with validation, company info, map placeholder

## Design Direction
- **Tone**: Professional, industrial, trustworthy — a mining/geology company
- **Color Palette**: Earth tones (deep greens, browns, warm golds/ambers) with clean white
- **Typography**: System font stack for performance; serif headings for authority
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
│   ├── services.html       # Services page
│   └── contact.html        # Contact page
├── assets/
│   ├── css/
│   │   └── main.css        # Global styles (shared across all pages)
│   ├── js/
│   │   └── main.js         # Shared JS (nav, form validation, utilities)
│   └── images/             # Image assets (placeholders initially)
└── ARCHITECTURE.md         # This file
```

## Brand Identity
Brand assets pending. Use CSS custom properties for colors/fonts so brand values can be swapped in a single place (`:root` in `main.css`).

## Assignment
- **Frontend Developer**: Build all HTML/CSS/JS files per this architecture. Implement responsive design, semantic HTML, form validation.
- **Senior Developer**: Review output for code quality, accessibility, performance, and security. Ensure cross-browser compatibility.
