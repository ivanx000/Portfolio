# Portfolio

Ivan Xie's personal site. React, TypeScript, Vite and Framer Motion.

**Live site:** https://portfolio-virid-eight-c249f95trb.vercel.app/

## Two sites, one build

| Path     | Source                          | What it is                                   |
| -------- | ------------------------------- | -------------------------------------------- |
| `/`      | `index.html`, `src/`            | 2026 design: illustrated lake world          |
| `/2025/` | `2025/index.html`, `2025/src/`  | The 2025 site, archived as it was (tag `v2025`) |

`vite.config.ts` builds both pages into `dist/`.

## 2026 design

A single page of five full-screen sections in a flat illustration style, after a day outdoors: morning at the lake, out on the canoe, a map of the lake world, and evening on the lake. The art is ChatGPT image generation made from the reference video's frames; code places and animates it.

- **Section paging** (`src/sections/Pager.tsx`, `src/lib/wheel.ts`): the page never scrolls freely. One swipe, wheel notch, key press (arrows, Page Up/Down, Space, Home/End) or phone swipe turns exactly one section, however long a trackpad's momentum lasts; a swipe made mid-transition plays when it lands. Dots on the right jump between sections.
- **Hero**: layered lake scene (mountains, Toronto skyline, pines, hiker) that settles in on load and separates by depth as the page turns. The sky and sun come from the reference's sky, and each wind streak drifts with the wind on its own timing (`src/assets/art/sky/`). The tall pines bend from their feet, the leaves and walking stick sway, the hiker breathes, light glints drift across the lake and a flock of gulls crosses the sky (pieces cut from the art, in `src/assets/art/hero/`)
- **About**: bio beside a canoe seen from above (the oars row, lily pads bob), circled by a slow school of fish
- **Projects**: five cards whose tops are windows onto one shared layer, so each project's fish swims from card to card (a swipeable row on phones). Only projects with 100+ commits, on the resume, or live.
- **Experience**: a flat map of the lake world, like the reference's US map, with one region per role; the selected role's region fills red with its short name, and the tour advances by itself (outlines in `src/art/lake-map.ts`)
- **Ending** (`src/sections/Ending.tsx`): the purple lake from the reference footer, with a tent, a flickering campfire and someone poling a boat across; a sign-off with three signposts (resume, GitHub, LinkedIn) and a link to the 2025 site
- **Background sounds** (`src/sections/SoundDock.tsx`, `src/lib/ambience.ts`): bottom-left player with four looping nature recordings (rain, Lake Ontario waves, a night pond, a campfire), crossfades and volume, remembered between visits. Credits are in the player and in `public/audio/CREDITS.md`.
- **Cursor**: a ring with a centre dot that turns pink over anything clickable (mouse and trackpad only)

Respects `prefers-reduced-motion`.

```text
public/
  audio/         # Looping ambience (MP3) + CREDITS.md
  resume.pdf
src/
  data.ts        # All copy: about, projects, jobs, ending
  styles.css     # Tokens and layout
  lib/           # Pager context, wheel gestures, ambience engine
  art/           # Illustrations
  sections/      # One component per section, plus Pager, Cursor, SectionDots, SoundDock
2025/            # Archived 2025 site (Tailwind)
```

## Getting started

```bash
pnpm install
pnpm dev
```

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Start Vite dev server               |
| `pnpm build`   | Type-check and build both pages     |
| `pnpm preview` | Preview production build locally    |
| `pnpm lint`    | Run ESLint                          |

## Deployment

Hosted on Vercel. Pushing to `main` triggers a deploy from `dist/`.
