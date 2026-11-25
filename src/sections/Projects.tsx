import { motion, useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { Mascot } from '../art/scenes'
import { PROJECTS } from '../data'
import { EASE, reveal } from './motion'

// Geometry of each card's window relative to its row, so every window can show
// the same wide "aquarium" offset to its own position. Mascots then appear to swim
// from one card into the next.
type Geo = { rowWidth: number; offset: number; width: number; row: number }[]

const CYCLE = 11 // seconds per swim loop

function Swimmer({ index, home, reduce }: { index: number; home: number; reduce: boolean }) {
  const project = PROJECTS[index]
  const dir = index % 2 === 0 ? 1 : -1
  const out = dir > 0 ? (1 - home + 0.2) * 100 : -(home + 0.2) * 100
  const back = dir > 0 ? -(home + 0.2) * 100 : (1 - home + 0.2) * 100

  return (
    <motion.div
      className="swimmer"
      animate={reduce ? undefined : { x: ['0%', '0%', `${out}%`, `${back}%`, '0%'] }}
      transition={{
        duration: CYCLE,
        times: [0, 0.42, 0.7, 0.7001, 1],
        ease: ['linear', 'easeIn', 'linear', 'easeOut'],
        repeat: Infinity,
        delay: 1.2 + index * 1.6,
      }}
    >
      <motion.div
        className="swimmer-body"
        style={{ left: `${home * 100}%`, scaleX: dir }}
        animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 2.6 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Mascot kind={project.creature} />
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geo>([])
  const reduce = !!useReducedMotion()

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const measure = () => {
      // The window sits at the top-left of each card, so card offsets locate it.
      // Cards are direct children of .cards (position: relative).
      const cards = Array.from(grid.children) as HTMLElement[]
      const tops = [...new Set(cards.map((c) => c.offsetTop))]
      setGeo(
        cards.map((c) => ({ rowWidth: grid.scrollWidth, offset: c.offsetLeft, width: c.offsetWidth, row: tops.indexOf(c.offsetTop) })),
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [])

  // Each mascot lives at the centre of its own card's window.
  const homes = geo.map((g) => (g.rowWidth ? (g.offset + g.width / 2) / g.rowWidth : 0.5))

  return (
    <section className="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <motion.h2 id="projects-title" className="section-title" {...reveal()}>
          Projects
        </motion.h2>
        <div className="cards" ref={gridRef}>
          {PROJECTS.map((p, i) => {
            const g = geo[i]
            return (
              <motion.article
                key={p.name}
                className="card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              >
                <div className="card-window" aria-hidden="true">
                  {g && (
                    <div className="aquarium" style={{ width: g.rowWidth, left: -g.offset }}>
                      {PROJECTS.map((_, j) =>
                        geo[j]?.row === g.row ? <Swimmer key={j} index={j} home={homes[j]} reduce={reduce} /> : null,
                      )}
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h3>{p.name}</h3>
                  <span className="card-meta">{p.commits}</span>
                  <p>{p.blurb}</p>
                  <span className="card-stack">{p.stack.join(' · ')}</span>
                  <div className="card-links">
                    {p.private && (
                      <span className="private">
                        <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                          <rect x="1" y="5" width="8" height="6.5" rx="1.5" fill="currentColor" />
                          <path d="M3 5 V3.5 a2 2 0 0 1 4 0 V5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                        </svg>
                        private repo
                      </span>
                    )}
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
