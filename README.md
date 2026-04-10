# Portfolio

A single-page animated portfolio built with React, TypeScript, Vite, and Framer Motion. Features scroll-driven animations, a staggered image reveal on load, and sections covering experience, projects, skills, and contact info.

**Live site:** https://portfolio-virid-eight-c249f95trb.vercel.app/

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion 12
- Google Fonts (Barlow, Cormorant Garamond, Instrument Serif)
- Devicon CDN (skill icons)

## Sections

- **Hero** — Animated image cluster that spreads on scroll, with a large "Hey," headline
- **About** — Short bio and profile picture
- **Experience** — Education and internship timeline (UofT, Project: Human City, Connecting Youth In Med, RiipenLabs)
- **Projects** — Randomly selected GitHub repos rendered as language-colored cards
- **Interests** — Personal interests in a 3-column grid
- **Skills** — 16 cycling skill icons (Python, JS, React, Docker, AWS, etc.)
- **Footer** — "Let's talk." with LinkedIn, GitHub, and email links

## Project Structure

```text
src/
  App.tsx       # All sections, animations, and layout
  main.tsx      # App entry point
  index.css     # Global styles and font imports
  assets/       # PNGs and GIF used in the hero animation
```

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start Vite dev server                |
| `pnpm build`   | Type-check and build for production  |
| `pnpm preview` | Preview production build locally     |
| `pnpm lint`    | Run ESLint                           |

## Deployment

Hosted on Vercel. Pushing to `main` triggers an automatic deployment. Production files are output to `dist/`.
