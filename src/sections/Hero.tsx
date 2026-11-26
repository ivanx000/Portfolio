import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { SkyLayer } from '../art/hero'
import farArt from '../assets/art/hero-far.webp'
import frontArt from '../assets/art/hero-front.webp'
import lakeArt from '../assets/art/hero-lake.webp'
import glint1Art from '../assets/art/hero/glint-1.webp'
import glint2Art from '../assets/art/hero/glint-2.webp'
import glint3Art from '../assets/art/hero/glint-3.webp'
import glint4Art from '../assets/art/hero/glint-4.webp'
import glint5Art from '../assets/art/hero/glint-5.webp'
import hikerArt from '../assets/art/hero/hiker.webp'
import leavesLArt from '../assets/art/hero/leaves-l.webp'
import leavesRArt from '../assets/art/hero/leaves-r.webp'
import pinesArt from '../assets/art/hero/pines.webp'
import rocksArt from '../assets/art/hero/rocks.webp'
import stickArt from '../assets/art/hero/stick.webp'
import { NAV } from '../data'
import { clamp, usePager } from '../lib/pager'

const EASE = [0.22, 1, 0.36, 1] as const

export function Logo() {
  return <span className="logo">Ivan Xie</span>
}

function Nav() {
  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
    >
      <a href="#top">
        <Logo />
      </a>
      <ul className="nav-links">
        {NAV.map((item) => (
          <li key={item.label}>
            <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

// Pieces cut from the art that move on their own, like the reference: the tall pines
// bend and the leaves sway from their base, the hiker breathes, the light on the water
// drifts and shimmers. Boxes are % of the art.
type Piece = {
  src: string
  box: [left: number, top: number, width: number, height: number]
  origin: [number, number]
  motion: 'sway' | 'bend' | 'breathe' | 'glint' | 'still'
  amount: number // degrees (px for a glint)
  period: number // seconds
  delay: number
}

// The three tall pines, whole from tip to foot, bend together in the wind from the ground up.
// Pieces that touch an edge of the picture are drawn past it, so moving never shows a cut.
const PINES: Piece[] = [
  { src: pinesArt, box: [83.529, 22.266, 24.284, 54.492], origin: [33.9, 100], motion: 'bend', amount: 3, period: 4.6, delay: -1.2 },
]

const FRONT: Piece[] = [
  { src: hikerArt, box: [22.656, 48.926, 15.885, 35.938], origin: [37.7, 98.1], motion: 'breathe', amount: 0.8, period: 3.6, delay: 0 },
  // the walking stick rocks from the hand
  { src: stickArt, box: [33.854, 63.281, 3.125, 21.387], origin: [12.5, 0], motion: 'sway', amount: 6.5, period: 3.6, delay: -1 },
  { src: leavesLArt, box: [-7.812, 69.043, 30.339, 42.676], origin: [57.9, 72.5], motion: 'sway', amount: 5, period: 4.6, delay: -2 },
  { src: leavesRArt, box: [82.812, 88.379, 25, 23.34], origin: [43.8, 49.8], motion: 'sway', amount: 6, period: 4.1, delay: -4.5 },
]

// Light on the water. Glints that run off an edge are drawn past it.
const WATER: Piece[] = [
  { src: glint1Art, box: [27.539, 78.418, 38.411, 4.785], origin: [50, 50], motion: 'glint', amount: 70, period: 6.5, delay: -2 },
  { src: glint2Art, box: [87.695, 78.418, 25.326, 1.562], origin: [50, 50], motion: 'glint', amount: 55, period: 5.5, delay: -4 },
  { src: glint3Art, box: [62.565, 79.688, 30.208, 5.176], origin: [50, 50], motion: 'glint', amount: 80, period: 7.5, delay: -1 },
  { src: glint4Art, box: [93.62, 80.957, 19.401, 2.148], origin: [50, 50], motion: 'glint', amount: 50, period: 5, delay: -3 },
  { src: glint5Art, box: [-13.021, 81.738, 39.128, 3.223], origin: [50, 50], motion: 'glint', amount: 65, period: 6, delay: -5 },
  // the same glints again, nearer and larger, on the open water
  { src: glint1Art, box: [46, 87.5, 32, 4.2], origin: [50, 50], motion: 'glint', amount: 90, period: 7, delay: -3.5 },
  { src: glint3Art, box: [66, 92, 28, 4.8], origin: [50, 50], motion: 'glint', amount: 100, period: 8, delay: -6 },
  { src: glint2Art, box: [40, 96.2, 24, 1.5], origin: [50, 50], motion: 'glint', amount: 80, period: 6.2, delay: -1.5 },
  // the rocks sit above the moving light
  { src: rocksArt, box: [39.518, 78.516, 57.552, 14.941], origin: [50, 50], motion: 'still', amount: 0, period: 0, delay: 0 },
]

function Stage({ base, pieces = [], alt = '' }: { base: string; pieces?: Piece[]; alt?: string }) {
  return (
    <div className="hero-stage">
      <img className="hero-img" src={base} alt={alt} draggable={false} />
      {pieces.map((p) => (
        <img
          key={`${p.src}${p.box[0]}`}
          className={`hero-piece ${p.motion}`}
          src={p.src}
          alt=""
          draggable={false}
          style={
            {
              left: `${p.box[0]}%`,
              top: `${p.box[1]}%`,
              width: `${p.box[2]}%`,
              height: `${p.box[3]}%`,
              transformOrigin: `${p.origin[0]}% ${p.origin[1]}%`,
              '--amount': p.motion === 'glint' ? `${p.amount}px` : `${p.amount}deg`,
              animationDuration: `${p.period}s`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

// A small flock of white gulls crossing the sky, drawn as simple wing strokes.
const FLOCK = [
  { x: 0, y: 92, s: 1 },
  { x: 54, y: 66, s: 0.9 },
  { x: 108, y: 74, s: 0.85 },
  { x: 132, y: 34, s: 0.95 },
  { x: 176, y: 44, s: 0.8 },
  { x: 214, y: 10, s: 0.85 },
  { x: 256, y: 0, s: 0.75 },
]
const WINGS_UP = 'M0 6 Q 7 -4 14 5 Q 21 -4 28 6'
const WINGS_DOWN = 'M0 1 Q 7 7 14 5 Q 21 7 28 1'

function Birds({ reduce }: { reduce: boolean }) {
  return (
    <div className="birds" aria-hidden="true">
      <motion.div
        className="flock"
        initial={{ x: '-30vw', y: '6vh' }}
        animate={reduce ? { x: '58vw', y: '0vh' } : { x: ['-30vw', '120vw'], y: ['6vh', '-8vh'] }}
        transition={reduce ? { duration: 0 } : { duration: 42, repeat: Infinity, repeatDelay: 7, ease: 'linear', delay: 1.5 }}
      >
        {FLOCK.map((b, i) => (
          <motion.svg
            key={i}
            className="bird"
            viewBox="-2 -6 32 16"
            style={{ left: b.x, top: b.y, width: 28 * b.s }}
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.path
              initial={{ d: WINGS_UP }}
              animate={reduce ? undefined : { d: [WINGS_UP, WINGS_DOWN, WINGS_UP] }}
              transition={{ duration: 0.9 + (i % 3) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }}
            />
          </motion.svg>
        ))}
      </motion.div>
    </div>
  )
}

// One depth layer. As the page turns away from the hero (`out` 0 -> 1) the far layers
// hang back while the near ones leave with the page, like the reference's parallax.
function Layer({
  out,
  lag,
  intro,
  delay,
  children,
}: {
  out: MotionValue<number>
  lag: number
  intro: { y?: string; scale?: number }
  delay: number
  children: ReactNode
}) {
  const { vh } = usePager()
  const y = useTransform(out, (t) => t * vh * lag)
  return (
    <motion.div className="hero-layer" style={{ y }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ y: intro.y ?? '0%', scale: intro.scale ?? 1, opacity: 0.001 }}
        animate={{ y: '0%', scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const { pos, vh } = usePager()
  const out = useTransform(pos, (p) => (reduce ? 0 : clamp(p, 0, 1)))
  const copyY = useTransform(out, (t) => t * vh * 0.45)
  const copyOpacity = useTransform(out, [0, 0.5], [1, 0])

  return (
    <header className="hero">
      <Nav />
      <Layer out={out} lag={0.7} intro={{ scale: 1.08 }} delay={0}>
        <SkyLayer />
      </Layer>
      {/* Every layer is one canvas (.hero-stage), so they stay lined up at any size. */}
      <Layer out={out} lag={0.6} intro={{}} delay={0.3}>
        <Birds reduce={!!reduce} />
      </Layer>
      <Layer out={out} lag={0.45} intro={{ y: '6%' }} delay={0.1}>
        <Stage base={farArt} pieces={PINES} />
      </Layer>
      <Layer out={out} lag={0.22} intro={{ y: '3%' }} delay={0.2}>
        <Stage base={lakeArt} pieces={WATER} />
      </Layer>
      <Layer out={out} lag={0} intro={{ y: '8%' }} delay={0.25}>
        <Stage
          base={frontArt}
          pieces={FRONT}
          alt="Illustration of a hiker on a lakeshore looking across the water at mountains and the Toronto skyline"
        />
      </Layer>

      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <h1>
          <motion.span
            className="line"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Hi, I&rsquo;m Ivan.
          </motion.span>
          <motion.strong
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            I build software.
          </motion.strong>
        </h1>
        <motion.a
          className="btn"
          href="#projects"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.95 }}
        >
          See my work
        </motion.a>
      </motion.div>
    </header>
  )
}
