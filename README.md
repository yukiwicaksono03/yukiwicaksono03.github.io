# Yuki Wicaksono — Personal Branding Website

Personal branding / portfolio site for Yuki Wicaksono, Full Stack Developer.
Built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
```

## Structure

```
app/
  layout.tsx     # fonts (Instrument Sans, JetBrains Mono) + metadata
  page.tsx       # renders the site component
  globals.css    # resets, reveal animations, hover states, responsive rules
  favicon.ico    # browser tab icon (the "Yk" mark)
components/
  YukiPortfolioSite.tsx   # the whole site (client component)
public/
  logo.png       # "Yk" logo used in the nav and footer
```

## Editing content

Everything lives in the `TEXT` object at the top of `components/YukiPortfolioSite.tsx`,
with a full `en` and `id` translation pair. Edit the copy, projects, and stack there.

Tweakable constants, same file:

| Constant | Purpose |
| --- | --- |
| `ACCENT` | Accent color (default `#c9bba5`) |
| `ALTERNATE_ROWS` | Alternate the left/right layout of the "How I work" rows |
| `STATUS_TEXT_OVERRIDE` | Override the "Available for work" status line |

## Features

- Sections: hero + terminal, How I work, Projects (live + open source), Stack, Contact
- **EN / ID** language toggle
- **⌘K / Ctrl+K** command palette for jumping between sections
- Scroll-spy navigation and scroll-reveal animations (respects `prefers-reduced-motion`)
- Responsive down to 390px; fonts self-hosted via `next/font` — no external requests
- "Yk" logo in the nav and footer, served through `next/image` (same mark as the favicon)
- Fully static: both routes prerender at build time

## Notes

- Styling is inline (ported from the design export); `app/globals.css` holds the
  keyframes, hover states, and the media queries that stack the two-column grids
  and collapse the nav links below 720px / 860px.
- Deploys as-is to Vercel, or any host that runs `npm run build && npm start`.
