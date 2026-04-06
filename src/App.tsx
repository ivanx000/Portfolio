import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import img1 from './assets/7C1DE476-39B7-4387-B12F-14946513A7ED.png'
import img2 from './assets/b506f63c187f4fc202625926de4521d9.png'
import img3 from './assets/a674e89510dec10ad745903bb5ad2cf3.png'
import img4 from './assets/cb3c0c581819c13a5449d8c85e4e2ba1.png'
import img5 from './assets/c51f25b8109b842c8c12b8df3b1ad426.png'
import img6 from './assets/ffcdaf47af95d309bbe74e70128d0b95.png'
import img7 from './assets/78ca28acbabff21940dbf6f1fad4648e.png'

// ─── Animation timing (ms) ────────────────────────────────
const IMAGE_STAGGER   = 100   // each image appears 100 ms after the last
const TEXT_DELAY      = 500   // "Hey,", nav, label fade in after 500 ms
const SPREAD_START    = 900   // images begin flying to final positions at 900 ms
const IMAGE_SIZE      = '9%'  // slightly smaller cards for cleaner separation
const HEY_OFFSET_X    = '-2.2%' // visual centering correction (left)
const HEY_OFFSET_Y    = '-3.6%' // visual centering correction (up)

// ─── Cluster centre ───────────────────────────────────────
// All images are held at ~(46 %, 50 %) of the viewport before spreading.
// Each image is absolutely positioned at its FINAL location; a CSS transform
// offset (ox, oy) moves it to the cluster while in the "holding" phase.
const CX = 46 // cluster centre x, in vw
const CY = 50 // cluster centre y, in vh

// ─── Image configuration ──────────────────────────────────
// Positions measured from reference frames (795 × 503 px viewport).
// All images use a uniform size to match the first image in the sequence.
const imageConfigs = [
  { src: img1, left: '16%', top: '12%', zi: 20 },
  { src: img2, left: '31%', top: '34%', zi: 20 },
  { src: img3, left: '62%', top: '12%', zi: 20 },
  { src: img4, left: '84%', top: '41%', zi: 20 },
  { src: img5, left:  '6%', top: '65%', zi: 20 },
  { src: img6, left: '52%', top: '70%', zi: 20 },
  { src: img7, left: '74%', top: '72%', zi: 20 },
]

// Derive the transform offset that places each image's top-left corner
// at the cluster centre point.
function clusterOffset(left: string, top: string) {
  const l = parseFloat(left)  // e.g. 17
  const t = parseFloat(top)   // e.g. 11
  return { ox: `${CX - l}vw`, oy: `${CY - t}vh` }
}

// ─── Spread easing ───────────────────────────────────────
const SPREAD_EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Component ───────────────────────────────────────────
function App() {
  // How many images are currently showing at the cluster centre
  const [visibleCount, setVisibleCount] = useState(0)
  // Whether images have started flying to their final positions
  const [spreading, setSpreading] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // Stagger each image appearing at the cluster centre
    for (let i = 0; i < imageConfigs.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * IMAGE_STAGGER))
    }

    // Trigger the spread after text has had time to fade in
    timers.push(setTimeout(() => setSpreading(true), SPREAD_START))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* ── Top navigation ─────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 20px',
          fontSize: '11px',
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 400,
          color: '#000',
        }}
      >
        <span>Ivan Xie</span>
        <span>Software Engineer</span>
        <span style={{ fontWeight: 700 }}>University of Toronto</span>
      </motion.nav>

      {/* ── Portfolio / 2026 — left centre ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          fontSize: '11px',
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 400,
          lineHeight: 1.4,
          color: '#000',
        }}
      >
        <div>Portfolio</div>
        <div>2026</div>
      </motion.div>

      {/* ── "Hey," headline ────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.9, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50vh',
          left: '50vw',
          transform: `translate3d(calc(-50% + ${HEY_OFFSET_X}), calc(-50% + ${HEY_OFFSET_Y}), 0)`,
          zIndex: 40,
          margin: 0,
          fontFamily: "'Denton', 'Denton Expressive', 'Denton Text', 'Iowan Old Style', 'Baskerville', serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 'clamp(9rem, 22vw, 28rem)',
          lineHeight: 0.82,
          letterSpacing: '-0.012em',
          whiteSpace: 'nowrap',
          color: '#000',
          userSelect: 'none',
        }}
      >
        Hey,
      </motion.h1>

      {/* ── Scattered images ───────────────────────────────── */}
      {imageConfigs.map(({ src, left, top, zi }, i) => {
        const { ox, oy } = clusterOffset(left, top)

        return (
          <motion.img
            key={i}
            src={src}
            alt=""
            // Start: offset to cluster centre, invisible
            initial={{ x: ox, y: oy, opacity: 0, filter: 'grayscale(0%)' }}
            // Phase A (not spreading): appear one-by-one at cluster centre in full colour
            // Phase B (spreading): fly to final position, turn grey, reduce opacity
            animate={
              spreading
                ? { x: 0, y: 0, opacity: 0.7, filter: 'grayscale(100%)' }
                : { x: ox, y: oy, opacity: i < visibleCount ? 1 : 0, filter: 'grayscale(0%)' }
            }
            transition={
              spreading
                ? { duration: 0.9, ease: SPREAD_EASE }
                : {
                    opacity: { duration: 0.15, ease: 'easeOut' },
                    x: { duration: 0 },
                    y: { duration: 0 },
                  }
            }
            style={{
              position: 'absolute',
              left,
              top,
              width: IMAGE_SIZE,
              aspectRatio: '2 / 3',
              zIndex: zi,
              display: 'block',
              objectFit: 'cover',
            }}
          />
        )
      })}
    </div>
  )
}

export default App
