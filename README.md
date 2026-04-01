# Portfolio

A single-page portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

The site features a full-screen video hero and section-based navigation for:

- Home
- Skills (continuous marquee rows)
- Projects
- Experience
- Interests

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion (text/section animation)
- Lucide React (icons)
- hls.js support via reusable video component

## Project Structure

```text
src/
  App.tsx                 # Main single-page layout and section content
  index.css               # Global styles, theme tokens, component utilities
  assets/
    hero.mp4
    hero2.mp4             # Current hero video used on home section
  components/
    BlurText.tsx          # Animated text reveal
    HLSVideo.tsx          # Video player wrapper with HLS support
    HeroSection.tsx       # Alternate hero component (not currently mounted)
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start local development server:

```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - run Vite dev server
- `pnpm build` - type-check and build for production
- `pnpm preview` - preview the production build locally
- `pnpm lint` - run ESLint

## Build Output

Production artifacts are generated in `build/`.

## Notes

- The home hero video currently points to `src/assets/hero2.mp4`.
- Navigation links are anchor-based (`#home`, `#skills`, `#projects`, `#experience`, `#interests`).
