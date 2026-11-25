import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ambience, TRACKS, type TrackId } from '../lib/ambience'
import { EASE } from './motion'

const KEY = 'ambience'

type Saved = { track: TrackId; on: boolean }

function load(): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || '')
    if (TRACKS.some((t) => t.id === s.track)) return { track: s.track, on: !!s.on }
  } catch {
    /* first visit */
  }
  return { track: TRACKS[0].id, on: false }
}

function Bars({ playing }: { playing: boolean }) {
  return (
    <span className={`bars${playing ? ' playing' : ''}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

function Arrow({ dir }: { dir: 1 | -1 }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d={dir < 0 ? 'M8.5 3 4.5 7l4 4' : 'M5.5 3l4 4-4 4'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Bottom-left player: the middle toggles sound on and off, the arrows step through
// the recordings. Switching with an arrow also turns sound on.
export function SoundDock() {
  const [saved] = useState(load)
  const [index, setIndex] = useState(() => TRACKS.findIndex((t) => t.id === saved.track))
  const [on, setOn] = useState(false)
  const [step, setStep] = useState<1 | -1>(1)
  const track = TRACKS[index]

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ track: track.id, on }))
  }, [track, on])

  // If sound was on last visit, pick it back up on the first click or key press
  // (browsers block audio until then).
  useEffect(() => {
    if (!saved.on) return
    const resume = () => {
      ambience.play(saved.track)
      setOn(true)
    }
    window.addEventListener('pointerdown', resume, { once: true })
    window.addEventListener('keydown', resume, { once: true })
    return () => {
      window.removeEventListener('pointerdown', resume)
      window.removeEventListener('keydown', resume)
    }
  }, [saved])

  const toggle = () => {
    if (on) ambience.stop()
    else ambience.play(track.id)
    setOn(!on)
  }

  const go = (dir: 1 | -1) => {
    const next = (index + dir + TRACKS.length) % TRACKS.length
    setStep(dir)
    setIndex(next)
    setOn(true)
    ambience.play(TRACKS[next].id)
  }

  return (
    <div className="dock" role="group" aria-label="Background sound">
      <button className="dock-arrow" aria-label="Previous sound" onClick={() => go(-1)}>
        <Arrow dir={-1} />
      </button>
      <button className="dock-main" aria-pressed={on} onClick={toggle} aria-label={on ? `Pause ${track.label}` : `Play ${track.label}`}>
        <Bars playing={on} />
        <span className="dock-text">
          <small>{on ? 'Now playing' : 'Sound off'}</small>
          <AnimatePresence mode="popLayout" initial={false} custom={step}>
            <motion.strong
              key={track.id}
              custom={step}
              initial={{ opacity: 0, x: step * 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: step * -14 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {track.label}
            </motion.strong>
          </AnimatePresence>
        </span>
      </button>
      <button className="dock-arrow" aria-label="Next sound" onClick={() => go(1)}>
        <Arrow dir={1} />
      </button>
    </div>
  )
}
