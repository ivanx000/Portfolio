import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LakeMap } from '../art/scenes'
import { JOBS } from '../data'
import { usePager } from '../lib/pager'
import { EASE, reveal } from './motion'

const START = JOBS.findIndex((j) => j.id === 'bc')
const STEP_MS = 4600
const PAGE = 3 // this section's index in the pager

function Check() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
      <path d="M1 5.2 L4.4 8.4 L11 1.4" stroke="#ec3a6d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Experience() {
  const [index, setIndex] = useState(START)
  const [paused, setPaused] = useState(false)
  const { index: page } = usePager()
  const reduce = useReducedMotion()
  const job = JOBS[index]

  // Tour the map on its own while this section is on screen, like the reference's map.
  useEffect(() => {
    if (page !== PAGE || paused || reduce) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % JOBS.length), STEP_MS)
    return () => clearTimeout(t)
  }, [page, paused, reduce, index])

  const select = (i: number) => {
    setIndex(i)
    setPaused(true)
  }

  return (
    <section className="experience" aria-labelledby="exp-title">
      <div className="wrap">
        <motion.h2 id="exp-title" className="section-title" {...reveal()}>
          Where I&rsquo;ve worked
        </motion.h2>
        <div className="exp-grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div
            className="lake-map"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <LakeMap jobs={JOBS} active={index} onSelect={select} />
          </motion.div>
          <div className="exp-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3>{job.company}</h3>
                <p className="exp-role">
                  {job.role} · {job.dates}
                </p>
                <ul className="checks">
                  {job.points.map((pt, i) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE }}
                    >
                      <Check />
                      <span>{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="exp-tabs" role="tablist" aria-label="Roles">
              {JOBS.map((j, i) => (
                <button
                  key={j.id}
                  className="exp-tab"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={j.company}
                  onClick={() => select(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
