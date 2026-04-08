import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import img1 from './assets/7C1DE476-39B7-4387-B12F-14946513A7ED.png'
import img2 from './assets/b506f63c187f4fc202625926de4521d9.png'
import img3 from './assets/a674e89510dec10ad745903bb5ad2cf3.png'
import img4 from './assets/cb3c0c581819c13a5449d8c85e4e2ba1.png'
import img5 from './assets/c51f25b8109b842c8c12b8df3b1ad426.png'
import img6 from './assets/ffcdaf47af95d309bbe74e70128d0b95.png'
import img7 from './assets/78ca28acbabff21940dbf6f1fad4648e.png'

// ─── Animation timing (ms) ────────────────────────────────
const IMAGE_STAGGER   = 100
const TEXT_DELAY      = 500
const SPREAD_START    = 900
const IMAGE_SIZE      = '9%'
const HEY_OFFSET_X    = '-2.2%'
const HEY_OFFSET_Y    = '-3.6%'

// ─── Cluster centre ───────────────────────────────────────
const CX = 46
const CY = 50

// ─── Image configuration ──────────────────────────────────
const imageConfigs = [
  { src: img1, left: '16%', top: '12%', zi: 20 },
  { src: img2, left: '35%', top: '34%', zi: 20 },
  { src: img3, left: '62%', top: '12%', zi: 20 },
  { src: img4, left: '84%', top: '34%', zi: 20 },
  { src: img5, left:  '6%', top: '61%', zi: 20 },
  { src: img6, left: '52%', top: '70%', zi: 20 },
  { src: img7, left: '74%', top: '70%', zi: 20 },
]

function clusterOffset(left: string, top: string) {
  const l = parseFloat(left)
  const t = parseFloat(top)
  return { ox: `${CX - l}vw`, oy: `${CY - t}vh` }
}

const SPREAD_EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Google Profile Picture ───────────────────────────────
function GooglePfp({ size = 140 }: { size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const ringMidR = size * 0.47
  const ringW = size * 0.025
  const circleR = size * 0.42

  const gapDeg = 5
  const segDeg = (360 - 4 * gapDeg) / 4
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853']

  const toRad = (d: number) => (d * Math.PI) / 180
  const arcPath = (startDeg: number, endDeg: number) => {
    const sx = cx + ringMidR * Math.cos(toRad(startDeg))
    const sy = cy + ringMidR * Math.sin(toRad(startDeg))
    const ex = cx + ringMidR * Math.cos(toRad(endDeg))
    const ey = cy + ringMidR * Math.sin(toRad(endDeg))
    return `M${sx} ${sy} A${ringMidR} ${ringMidR} 0 0 1 ${ex} ${ey}`
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {colors.map((color, i) => {
          const startDeg = -90 + gapDeg / 2 + i * (segDeg + gapDeg)
          const endDeg = startDeg + segDeg
          return (
            <path
              key={i}
              d={arcPath(startDeg, endDeg)}
              fill="none"
              stroke={color}
              strokeWidth={ringW}
              strokeLinecap="butt"
            />
          )
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: circleR * 2,
          height: circleR * 2,
          borderRadius: '50%',
          background: '#33691f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: `${size * 0.46}px`,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400,
          userSelect: 'none',
        }}
      >
        I
      </div>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────
function App() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [spreading, setSpreading] = useState(false)

  // useScroll() with no args tracks window scroll
  // The outer div is 200vh tall, so scrollY goes from 0 to 100vh (one viewport)
  const { scrollY } = useScroll()

  // Hero text fades out over the first 40% of the scrollable distance (0.4 * 100vh)
  const heroOpacity = useTransform(scrollY, [0, window.innerHeight * 0.4], [1, 0])

  // "Hey," zooms toward viewer and blurs as it exits
  const heyScale = useTransform(scrollY, [0, window.innerHeight * 0.4], [1, 1.15])
  const heyBlurNum = useTransform(scrollY, [0, window.innerHeight * 0.4], [0, 10])
  const heyFilter = useTransform(heyBlurNum, (v) => `blur(${v}px)`)

  // About section slides up from below — fully in view at 85% of 100vh scroll
  const aboutY = useTransform(scrollY, [0, window.innerHeight * 0.85], ['0vh', '-100vh'])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < imageConfigs.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * IMAGE_STAGGER))
    }
    timers.push(setTimeout(() => setSpreading(true), SPREAD_START))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    // Outer div gives the page its scrollable height (200vh = 100vh of scroll)
    <div style={{ height: '200vh' }}>

      {/* Sticky viewport — all visual content lives here */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#fff',
        }}
      >

        {/* ── Top navigation ─────────────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            zIndex: 50,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 20px',
            fontSize: '11px',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            color: '#111',
          }}
        >
          <span>Ivan Xie</span>
          <span style={{ marginRight: '8%' }}>Software Engineer</span>
          <span style={{ fontWeight: 700 }}>University of Toronto</span>
        </motion.nav>

        {/* ── Hero fade wrapper — fades out on scroll ────────── */}
        {/*    position: absolute; inset: 0 so children can use  */}
        {/*    absolute positioning relative to this container.   */}
        <motion.div
          style={{
            opacity: heroOpacity,
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 35,
          }}
        >
          {/* ── Portfolio / 2026 — left centre ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '11px',
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 500,
              lineHeight: 1.4,
              color: '#111',
            }}
          >
            <div>Portfolio</div>
            <div>2026</div>
          </motion.div>

          {/* ── "Hey," headline ────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: '50vh',
              left: '50vw',
              transform: `translate3d(calc(-50% + ${HEY_OFFSET_X}), calc(-50% + ${HEY_OFFSET_Y}), 0)`,
            }}
          >
            <motion.div style={{ scale: heyScale, filter: heyFilter, transformOrigin: 'center center' }}>
            <div style={{ transform: 'scaleX(0.88)', transformOrigin: 'center center' }}>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.90, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: 'clamp(11rem, 27vw, 34rem)',
                lineHeight: 0.82,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                color: '#000',
                userSelect: 'none',
              }}
            >
              Hey,
            </motion.h1>
            </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scattered images ───────────────────────────────── */}
        <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
          {imageConfigs.map(({ src, left, top }, i) => {
            const { ox, oy } = clusterOffset(left, top)
            return (
              <motion.img
                key={i}
                src={src}
                alt=""
                initial={{ x: ox, y: oy, opacity: 0, filter: 'grayscale(0%)' }}
                animate={
                  spreading
                    ? { x: 0, y: 0, opacity: 0.35, filter: 'grayscale(100%)' }
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
                  display: 'block',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
              />
            )
          })}
        </motion.div>

        {/* ── About section — slides up from below on scroll ─── */}
        <motion.div
          style={{
            y: aboutY,
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '100%',
            background: 'transparent',
            zIndex: 45,
            display: 'flex',
            alignItems: 'flex-start',
            padding: '5% 10% 0 10%',
            gap: '40px',
          }}
        >
          <GooglePfp size={160} />
          <p
            style={{
              margin: 0,
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4.2vw, 5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.022em',
              color: '#000',
            }}
          >
            I'm Ivan, a Computer Science student at the University of Toronto. I like to build things.
          </p>
        </motion.div>

      </div>
    </div>
  )
}

export default App
