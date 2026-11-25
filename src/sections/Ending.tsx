import { motion, useReducedMotion, useTransform } from 'framer-motion'
import ferryArt from '../assets/art/ending/ferry.webp'
import lakeArt from '../assets/art/ending/lake.webp'
import { ENDING, LINKS } from '../data'
import { clamp, usePager } from '../lib/pager'
import { EASE } from './motion'

function SignIcon({ name }: { name: (typeof ENDING.signs)[number]['icon'] }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true }
  switch (name) {
    case 'resume':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M6 2.5h8l4 4v15H6z" />
          <path d="M14 2.5v4h4M9 12h6M9 16h6" />
        </svg>
      )
    case 'github':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common} fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      )
  }
}

// The lake from the reference's footer: generated art, with the boat and the campfire's
// glow animated on top. Positions are % of the art's canvas.
function LakeScene({ reduce }: { reduce: boolean }) {
  return (
    <div className="ending-canvas">
      <img
        src={lakeArt}
        alt="Illustration of a purple lake at sunset with a tent and a small campfire on the shore, and someone poling a white boat"
        draggable={false}
      />
      <span className="fire-glow" aria-hidden="true" />
      <motion.div
        className="ferry"
        aria-hidden="true"
        animate={reduce ? undefined : { x: ['0%', '-140%', '0%'] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          src={ferryArt}
          alt=""
          draggable={false}
          animate={reduce ? undefined : { y: [0, -3, 0], rotate: [0, -1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="ferry-wake" />
      </motion.div>
    </div>
  )
}

// The last screen: the day ends at a campfire by the lake. A short sign-off and three
// signposts: resume, GitHub, LinkedIn.
export function Ending() {
  const reduce = useReducedMotion()
  const { pos, count, index } = usePager()
  const here = index === count - 1
  // The scene rises a little as the page arrives.
  const sceneY = useTransform(pos, (p) => (reduce ? 0 : (1 - clamp(p - (count - 2), 0, 1)) * 90))

  return (
    <section className="ending" aria-labelledby="end-title">
      <motion.div className="ending-scene" data-cursor="light" style={{ y: sceneY }}>
        <LakeScene reduce={!!reduce} />
      </motion.div>

      <div className="wrap ending-copy">
        <motion.p
          className="ending-tag"
          initial={false}
          animate={{ opacity: here ? 1 : 0, y: here ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          {ENDING.tag}
        </motion.p>
        <motion.h2
          id="end-title"
          initial={false}
          animate={{ opacity: here ? 1 : 0, y: here ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
        >
          {ENDING.title}
        </motion.h2>
        <motion.p
          className="ending-body"
          initial={false}
          animate={{ opacity: here ? 1 : 0, y: here ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        >
          {ENDING.body}
        </motion.p>
        <ul className="signs">
          {ENDING.signs.map((s, i) => (
            <motion.li
              key={s.label}
              initial={false}
              animate={{ opacity: here ? 1 : 0, y: here ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.07, ease: EASE }}
            >
              <a
                className="sign"
                href={s.href}
                {...(s.href.startsWith('http') || s.icon === 'resume' ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="sign-icon">
                  <SignIcon name={s.icon} />
                </span>
                <span className="sign-text">
                  <strong>{s.label}</strong>
                  <small>{s.note}</small>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <footer className="ending-foot" data-cursor="light">
        <span>© 2026 Ivan Xie · Toronto</span>
        <span className="ending-foot-links">
          <a href="#top">Back to the lake ↑</a>
          <a href={LINKS.archive2025}>2025 site</a>
          <a href="/audio/CREDITS.md" target="_blank" rel="noreferrer">
            Sound credits
          </a>
        </span>
      </footer>
    </section>
  )
}
