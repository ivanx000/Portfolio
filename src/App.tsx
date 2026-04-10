import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import gif1 from './assets/pinterest-video-ezgif.com-video-to-gif-converter.gif'
import img1 from './assets/7C1DE476-39B7-4387-B12F-14946513A7ED.png'
import img2 from './assets/5707407d232260009be728094431c59f.jpg'
import img3 from './assets/a674e89510dec10ad745903bb5ad2cf3.png'
import img4 from './assets/cb3c0c581819c13a5449d8c85e4e2ba1.png'
import img5 from './assets/92e7f07961f1f0ed08a64bb1923904f5.jpg'
import img6 from './assets/ffcdaf47af95d309bbe74e70128d0b95.png'
import img7 from './assets/78ca28acbabff21940dbf6f1fad4648e.png'

// ─── Animation timing (ms) ────────────────────────────────
const IMG_FADE_DUR    = 15    // each image fades in over this long
const IMG_RISE_DUR    = 28    // each image rises over this long
const IMG_CYCLE       = IMG_FADE_DUR + IMG_RISE_DUR  // ~43ms per image → 7 × 43 ≈ 300ms
const ALL_IMAGES_DONE = 300   // 0.3s for all images
const HEY_FADE_DUR    = 600   // ms — Hey, fade duration (used to calc spread timing)
const TEXT_DELAY      = ALL_IMAGES_DONE          // text starts right after images done
const SPREAD_START    = ALL_IMAGES_DONE + HEY_FADE_DUR / 2  // spread at halfway through text fade
const IMAGE_SIZE      = '9%'
const HEY_OFFSET_X    = '-2.2%'
const HEY_OFFSET_Y    = '-3.6%'

// ─── Cluster centre ───────────────────────────────────────
const CX = 46
const CY = 50

// ─── Image configuration ──────────────────────────────────
const imageConfigs = [
  { src: img1, left: '16%', top: '4%', zi: 20 },
  { src: img2, left: '28%', top: '34%', zi: 20 },
  { src: img3, left: '65%', top: '4%', zi: 20 },
  { src: img4, left: '84%', top: '34%', zi: 20 },
  { src: img5, left:  '6%', top: '70%', zi: 20 },
  { src: img6, left: '52%', top: '70%', zi: 20 },
  { src: img7, left: '74%', top: '70%', zi: 20 },
]

function clusterOffset(left: string, top: string) {
  const l = parseFloat(left)
  const t = parseFloat(top)
  const ox = (CX - l) / 100 * window.innerWidth
  const oy = (CY - t) / 100 * window.innerHeight
  return { ox, oy }
}

const SPREAD_EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Language colours (GitHub palette) ───────────────────
const langColors: Record<string, string> = {
  TypeScript:  '#3178c6',
  Python:      '#3572A5',
  Go:          '#00ADD8',
  JavaScript:  '#f1e05a',
  Java:        '#b07219',
  'C++':       '#f34b7d',
  Kotlin:      '#A97BFF',
}

// ─── Project data ─────────────────────────────────────────
interface Repo {
  name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  forks: number
  fork: boolean
}

const projects: Repo[] = [
  { name: 'Pipeline',              description: 'A Custom CI/CD Pipeline',                                                               url: 'https://github.com/ivanx000/Pipeline',              language: 'Go',          stars: 0, forks: 0, fork: false },
  { name: 'githelp',               description: 'Terminal-native AI Git assistant with safety checks and approval workflows',             url: 'https://github.com/ivanx000/githelp',               language: 'Python',      stars: 0, forks: 0, fork: false },
  { name: 'sami',                  description: 'Mobile self-improvement app focused on reducing distractions and building discipline',   url: 'https://github.com/ivanx000/sami',                  language: 'TypeScript',  stars: 0, forks: 0, fork: false },
  { name: 'ca.bot',                description: 'Cryptocurrency arbitrage bot detecting price differences across exchanges in real-time', url: 'https://github.com/ivanx000/ca.bot',                language: 'C++',         stars: 0, forks: 0, fork: false },
  { name: 'Parker',                description: 'Mobile app tracking parking locations with navigation assistance',                       url: 'https://github.com/ivanx000/Parker',                language: 'TypeScript',  stars: 0, forks: 0, fork: false },
  { name: 'CalendarApp',           description: 'An AI powered calendar app',                                                            url: 'https://github.com/ivanx000/CalendarApp',           language: 'TypeScript',  stars: 0, forks: 0, fork: false },
  { name: 'ShopOut',               description: 'AI-powered shopping cart assembly based on user descriptions',                          url: 'https://github.com/ivanx000/ShopOut',               language: 'TypeScript',  stars: 0, forks: 0, fork: false },
  { name: 'NL2SQL',                description: 'Natural Language to SQL queries using AI',                                              url: 'https://github.com/ivanx000/NL2SQL',                language: 'Python',      stars: 0, forks: 0, fork: false },
  { name: 'Nourish',               description: null,                                                                                    url: 'https://github.com/ivanx000/Nourish',               language: 'TypeScript',  stars: 0, forks: 0, fork: false },
  { name: 'StretchApp',            description: 'Android stretch reminder application',                                                  url: 'https://github.com/ivanx000/StretchApp',            language: 'Kotlin',      stars: 0, forks: 0, fork: false },
  { name: 'NBA-Shot-Analysis-Tool',description: 'Python script to analyze NBA shot data',                                                url: 'https://github.com/ivanx000/NBA-Shot-Analysis-Tool',language: 'Python',      stars: 0, forks: 0, fork: false },
  { name: 'CSC316-A3',             description: 'NBA shot selection visualization using synthetic data',                                 url: 'https://github.com/ivanx000/CSC316-A3',             language: 'JavaScript',  stars: 0, forks: 0, fork: false },
  { name: 'MWE',                   description: 'Minecraft Forge 1.8.9 mod for PVP players with Mega Walls features',                    url: 'https://github.com/ivanx000/MWE',                   language: 'Java',        stars: 0, forks: 0, fork: true  },
  { name: 'Portfolio',             description: 'Personal Portfolio Website',                                                            url: 'https://github.com/ivanx000/Portfolio',             language: 'TypeScript',  stars: 0, forks: 0, fork: false },
  { name: 'skills',                description: 'Public repository for Agent Skills',                                                    url: 'https://github.com/ivanx000/skills',                language: null,          stars: 0, forks: 0, fork: true  },
  { name: 'ry-cha/sleepi',         description: 'hack western 2025',                                                                    url: 'https://github.com/ry-cha/sleepi',                  language: 'JavaScript',  stars: 0, forks: 0, fork: false },
]

// ─── Skills data (20 skills, 5 cols × 4 rows) ────────────
interface Skill { name: string; icon: string | null; cycleDuration: number; phaseDelay: number }
const skillsData: Skill[] = ([
  { name: 'Java',         icon: 'java'             },
  { name: 'Python',       icon: 'python'           },
  { name: 'JavaScript',   icon: 'javascript'       },
  { name: 'Go',           icon: 'go'               },
  { name: 'C++',          icon: 'cplusplus'        },
  { name: 'React',        icon: 'react'            },
  { name: 'Node.js',      icon: 'nodedotjs'        },
  { name: 'Next.js',      icon: 'nextdotjs'        },
  { name: 'FastAPI',      icon: 'fastapi'          },
  { name: 'Tailwind CSS', icon: 'tailwindcss'      },
  { name: 'React Native', icon: 'react'            },
  { name: 'Django',       icon: 'django'           },
  { name: 'AWS',          icon: 'amazonaws'        },
  { name: 'MongoDB',      icon: 'mongodb'          },
  { name: 'Docker',       icon: 'docker'           },
  { name: 'OpenAI API',   icon: 'openai'           },
  { name: 'GraphQL',      icon: 'graphql'          },
  { name: 'Git',          icon: 'git'              },
  { name: 'GitHub',       icon: 'github'           },
  { name: 'VS Code',      icon: 'visualstudiocode' },
] as { name: string; icon: string | null }[]).map(s => {
  const cycleDuration = 8 + Math.random() * 5
  return { ...s, cycleDuration, phaseDelay: -(Math.random() * cycleDuration) }
})

// ─── Repo card (GitHub-style) ─────────────────────────────
function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const dotColor = repo.language ? (langColors[repo.language] ?? '#8b949e') : null

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.2, delay: (index % 2) * 0.06, ease: 'easeOut' }}
    >
      <div
        style={{
          border: '1px solid #d0d7de',
          borderRadius: '6px',
          padding: '16px',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          height: '100%',
          boxSizing: 'border-box',
          cursor: 'pointer',
          transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#000'
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#d0d7de'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Repo icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="#57606a" style={{ flexShrink: 0 }}>
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          {/* Name */}
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            color: '#0969da',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {repo.name}
          </span>
          {/* Public badge */}
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            color: '#57606a',
            border: '1px solid #d0d7de',
            borderRadius: '2em',
            padding: '0 7px',
            lineHeight: '18px',
            flexShrink: 0,
          }}>
            {repo.fork ? 'Forked' : 'Public'}
          </span>
        </div>

        {/* Description */}
        {repo.description && (
          <p style={{
            margin: 0,
            fontFamily: "'Barlow', sans-serif",
            fontSize: '12px',
            color: '#57606a',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {repo.description}
          </p>
        )}

        {/* Footer */}
        {(repo.language || repo.stars > 0 || repo.forks > 0) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
            {repo.language && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Barlow', sans-serif", fontSize: '12px', color: '#57606a' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: dotColor ?? '#8b949e', display: 'inline-block', flexShrink: 0 }} />
                {repo.language}
              </span>
            )}
            {repo.stars > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Barlow', sans-serif", fontSize: '12px', color: '#57606a' }}>
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
                {repo.stars}
              </span>
            )}
            {repo.forks > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Barlow', sans-serif", fontSize: '12px', color: '#57606a' }}>
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z"/></svg>
                {repo.forks}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.a>
  )
}

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
  const [shownCount, setShownCount] = useState(0)   // how many images have faded in
  const [risenCount, setRisenCount] = useState(0)   // how many images have risen to cluster
  const [spreading, setSpreading] = useState(false) // all fly to final positions
  const [featured] = useState(() =>
    [...projects].sort(() => Math.random() - 0.5).slice(0, 6)
  )

  const { scrollY } = useScroll()

  // Hero text fades as content scrolls up from below
  const heroOpacity = useTransform(scrollY, [0, window.innerHeight * 0.5], [1, 0])

  // "Hey," zooms toward viewer and blurs as it exits
  const heyScale = useTransform(scrollY, [0, window.innerHeight * 0.5], [1, 1.15])
  const heyBlurNum = useTransform(scrollY, [0, window.innerHeight * 0.5], [0, 10])
  const heyFilter = useTransform(heyBlurNum, (v) => `blur(${v}px)`)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < 7; i++) {
      const fadeAt = i * IMG_CYCLE
      const riseAt = fadeAt + IMG_FADE_DUR
      timers.push(setTimeout(() => setShownCount(i + 1), fadeAt))
      timers.push(setTimeout(() => setRisenCount(i + 1), riseAt))
    }
    timers.push(setTimeout(() => setSpreading(true), SPREAD_START))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      {/* ── Fixed hero — background stays put while content scrolls ── */}
      <div style={{ position: 'fixed', inset: 0, background: '#fff', overflow: 'hidden', zIndex: 0 }}>

        {/* ── Top navigation ─────────────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0, y: 17 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: HEY_FADE_DUR / 1000, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
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

        {/* ── Hero text — fades as content scrolls up ─────────── */}
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
            initial={{ opacity: 0, y: 17 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: HEY_FADE_DUR / 1000, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
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
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: HEY_FADE_DUR / 1000, delay: TEXT_DELAY / 1000, ease: 'easeOut' }}
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
                initial={{ x: ox, y: oy + 60, opacity: 0, filter: 'grayscale(0%)' }}
                animate={
                  spreading
                    ? { x: 0, y: 0, opacity: 0.22, filter: 'grayscale(100%)' }
                    : i < risenCount
                    ? { x: ox, y: oy, opacity: 1, filter: 'grayscale(0%)' }
                    : i < shownCount
                    ? { x: ox, y: oy + 60, opacity: 1, filter: 'grayscale(0%)' }
                    : { x: ox, y: oy + 60, opacity: 0, filter: 'grayscale(0%)' }
                }
                transition={
                  spreading
                    ? { duration: 0.9, ease: SPREAD_EASE }
                    : i < risenCount
                    ? { y: { duration: IMG_RISE_DUR / 1000, ease: 'easeOut' }, opacity: { duration: 0 }, x: { duration: 0 } }
                    : { opacity: { duration: IMG_FADE_DUR / 1000, ease: 'easeOut' }, y: { duration: 0 }, x: { duration: 0 } }
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
      </div>

      {/* ── Scrollable content — slides up over the fixed hero ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Spacer so hero is fully visible at scroll=0 */}
        <div style={{ height: '100vh' }} />

        {/* ── About section ──────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '5% 4% 0 12.35%',
          }}
        >
          {/* pfp + text row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ flexShrink: 0 }}
            >
              <GooglePfp size={160} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
              style={{
                margin: 0,
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4.0vw, 5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.022em',
                color: '#000',
              }}
            >
              I'm Ivan, a Computer Science<br />
              student at the University of Toronto.<br />
              I like to build things.
            </motion.p>
          </div>

          {/* ── Separator line ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
            style={{
              marginTop: '32px',
              width: '77.8%',
              marginLeft: '200px',
              height: '1px',
              background: '#000000',
            }}
          />
        </div>

        {/* ── About / Experience section ─────────────────────── */}
        <div style={{ padding: '60px 0 80px 0', position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
          {/* "About" label */}
          <div style={{
            position: 'absolute',
            left: '150px',
            top: '60px',
            fontSize: '11px',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#111',
            zIndex: 2,
          }}>
            <div>About</div>
            <div style={{ marginTop: '275px' }}>Experience</div>
          </div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 1,
              margin: 0,
              paddingLeft: '28%',
              paddingRight: '22%',
              paddingBottom: '80px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
              lineHeight: 1.75,
              color: '#000',
            }}
          >
            I love to build high-impact technical projects that solve real problems. I bridge the gap between complex backend architecture and seamless, user-centric frontends. My work focuses on engineering robust full-stack applications that people actually enjoy using. I am currently based in Toronto and collaborate with innovative teams to ship scalable, production-ready code. Have a challenging project in mind? I am always on the lookout for ambitious software engineering collaborations!
          </motion.p>

          {/* Work experience grid */}
          {(() => {
            type Experience = { bullet?: boolean; title: string; period: string; org: string; location: string } | null

            const experiences: Experience[] = [
              { bullet: true, title: 'University of Toronto \nSt. George', period: '2024 - Present', org: '', location: '' },
              { title: 'Software Engineer Intern', period: 'May 2025 - Aug 2025', org: 'Project: Human City', location: 'Toronto, ON' },
              { title: 'Software Engineer Intern', period: 'Jan 2025 - Apr 2025', org: 'Connecting Youth In Med', location: 'Markham, ON' },
              null,
              null,
              { title: 'Research Lead', period: '2026', org: 'Owning My - RiipenLabs', location: 'Toronto, ON' },
            ]

            return (
              <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 220px)',
                gap: '28px 56px',
                marginLeft: 'calc(50% - 295px)',
              }}>
                {experiences.map((item, i) =>
                  item === null ? (
                    <div key={i} />
                  ) : (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.2, delay: (i % 3) * 0.06, ease: 'easeOut' }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}
                    >
                      {item.bullet
                        ? <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '22px', fontWeight: 900, color: '#111', marginTop: '-3px', flexShrink: 0, lineHeight: 1 }}>•</span>
                        : <span style={{ width: '16px', flexShrink: 0 }} />
                      }
                      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: '11px', color: '#111', lineHeight: 1.5 }}>
                        <div style={{ fontWeight: 500, whiteSpace: 'pre-line' }}>{item.title}</div>
                        <div>{item.period}</div>
                        {item.org      && <div>{item.org}</div>}
                        {item.location && <div>{item.location}</div>}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            )
          })()}
        </div>

        {/* ── Projects section ───────────────────────────────── */}
        <div style={{ padding: '20px 0 80px 0', position: 'relative' }}>
          {/* "Projects" label — ~150px from left edge, matching Portfolio/2026 style */}
          <div style={{
            position: 'absolute',
            left: '150px',
            top: '20px',
            fontSize: '11px',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#111',
          }}>
            <div>Projects</div>
          </div>

          {/* "Reload to / shuffle Projects" — mirrored on the right */}
          <div style={{
            position: 'absolute',
            right: '150px',
            top: '20px',
            fontSize: '11px',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#111',
            textAlign: 'left',
          }}>
            <div>Reload to</div>
            <div>shuffle Projects</div>
          </div>

          {/* 2-column cards grid, horizontally centered */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '360px 360px',
            gap: '12px',
            margin: '0 auto',
            width: '732px',
          }}>
            {featured.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        </div>

        {/* ── Interests section ──────────────────────────────── */}
        <div style={{ padding: '20px 0 80px 0', position: 'relative' }}>
          {/* "Interests" label */}
          <div style={{
            position: 'absolute',
            left: '150px',
            top: '20px',
            fontSize: '11px',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#111',
          }}>
            <div>Interests</div>
          </div>

          {(() => {
            type Interest = { bullet?: boolean; title: string; period: string; org: string; location: string } | null

            // Grid fills left-to-right, top-to-bottom in 3 columns.
            // Use null for an empty cell so items align to a specific column.
            const interests: Interest[] = [
              { bullet: true, title: 'Coding', period: 'VS Code, Anti Gravity', org: 'Claude, GitHub Copilot', location: '',           },
              {               title: 'Video Games',             period: 'Minecraft 2015 - Present',   org: 'Fortnite 2018 - 2020', location: 'Clash Royale 2024 - Present' },
              {               title: 'Basketball',                            period: 'League: NBA',          org: 'Favorite Player: Lebron James',      location: 'Favorite Team: Lakers'  },
              null,  // empty cell — keeps Interactive Designer in column 2 (under Art Director)
              {               title: 'Video Editing',                       period: 'Sony Vegas 2019 - Present',   org: 'Capcut 2026',        location: '' },
              {               title: 'Health & Fitness',                                period: 'Food, Cooking',   org: 'Gym',   location: '' },
            ]

            return (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 220px)',
                gap: '28px 56px',
                marginLeft: 'calc(50% - 295px)',
              }}>
                {interests.map((item, i) =>
                  item === null ? (
                    <div key={i} />
                  ) : (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.2, delay: (i % 3) * 0.06, ease: 'easeOut' }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}
                    >
                      {item.bullet
                        ? <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '22px', fontWeight: 900, color: '#111', marginTop: '-3px', flexShrink: 0, lineHeight: 1 }}>•</span>
                        : <span style={{ width: '16px', flexShrink: 0 }} />
                      }
                      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: '11px', color: '#111', lineHeight: 1.5 }}>
                        <div style={{ fontWeight: 500 }}>{item.title}</div>
                        <div>{item.period}</div>
                        {item.org      && <div>{item.org}</div>}
                        {item.location && <div>{item.location}</div>}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            )
          })()}
        </div>

        {/* ── Skills + Gif section ─────────────────────────────── */}
        <div style={{ padding: '20px 0 200px 0' }}>
          {/* "Skills" label — normal flow, aligned with Interests at 150px */}
          <div style={{
            paddingLeft: '150px',
            paddingBottom: '14px',
            fontSize: '11px',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            color: '#111',
          }}>
            Skills
          </div>

          {/* Content row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', paddingLeft: '150px', paddingRight: '120px' }}>
            {/* Skills rectangle — 5 cols × 4 rows, evenly spaced */}
            <div style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              alignContent: 'space-evenly',
              justifyItems: 'start',
              height: '380px',
            }}>
              {skillsData.map(skill => (
                <motion.div
                  key={skill.name}
                  animate={{ opacity: [0, 1, 1, 0, 0] }}
                  transition={{
                    duration: skill.cycleDuration,
                    delay: skill.phaseDelay,
                    repeat: Infinity,
                    repeatType: 'loop',
                    times: [0, 0.06, 0.15, 0.21, 1],
                    ease: 'easeInOut',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#111',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {skill.icon && (
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}`}
                      width="19"
                      height="19"
                      alt=""
                      style={{ flexShrink: 0 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  {skill.name}
                </motion.div>
              ))}
            </div>

            {/* Gif */}
            <motion.img
              src={gif1}
              alt=""
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ display: 'block', width: '220px', flexShrink: 0 }}
            />
          </div>
        </div>

        {/* ── Footer bar ──────────────────────────────────────── */}
        <div style={{
          padding: '8px 20px 16px',
          fontSize: '11px',
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 500,
          color: '#111',
        }}>
          {/* Let's talk. + icons row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginBottom: '8px' }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(9rem, 15vw, 15rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: '#222',
              userSelect: 'none',
            }}>
              Let's talk.
            </span>
            <motion.a
              href="https://www.linkedin.com/in/xieivan/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.18, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ display: 'inline-flex', paddingBottom: '20px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://github.com/ivanx000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.18, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ display: 'inline-flex', paddingBottom: '20px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                <path fill="#000" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* email · location · stack */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>ivanxie101@gmail.com</span>
            <span>Toronto, ON</span>
            <span>React · Vite · Framer Motion</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
