import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { clamp, PagerContext, usePager } from '../lib/pager'
import { WheelGestures } from '../lib/wheel'

// Full-page sections: the document never scrolls freely. One wheel/trackpad gesture,
// key press or swipe moves exactly one section, so you can never stop between two.
const DURATION = 0.85
const EASE = [0.65, 0, 0.35, 1] as const // smooth start and landing
const WHEEL_THRESHOLD = 10 // px of scroll a gesture needs before it turns the page
const SWIPE_THRESHOLD = 46

type Section = { id: string; node: ReactNode; parallax?: boolean }

// A scrollable area inside a section (e.g. a tall section on a small phone)
// gets to scroll before the page turns.
function canScroll(el: EventTarget | null, dir: 1 | -1) {
  const box = el instanceof Element ? (el.closest('.page-inner') as HTMLElement | null) : null
  if (!box || box.scrollHeight <= box.clientHeight + 1) return false
  return dir > 0 ? box.scrollTop + box.clientHeight < box.scrollHeight - 1 : box.scrollTop > 1
}

function Page({ i, id, parallax = true, children }: { i: number; id: string; parallax?: boolean; children: ReactNode }) {
  const { pos } = usePager()
  // While a section slides away its content trails behind and fades, which gives
  // the transition depth instead of a flat slide.
  const y = useTransform(pos, (p) => (parallax ? `${clamp(p - i, -1, 1) * 26}%` : '0%'))
  const opacity = useTransform(pos, (p) => (parallax ? 1 - Math.min(1, Math.abs(p - i)) * 0.7 : 1))
  const scale = useTransform(pos, (p) => (parallax ? 1 - Math.min(1, Math.abs(p - i)) * 0.04 : 1))
  return (
    // data-section, not id: an id matching the URL hash would make the browser
    // scroll the pager container itself and knock every section out of place.
    <div className="page" data-section={id}>
      <motion.div className="page-inner" style={{ y, opacity, scale }}>
        {children}
      </motion.div>
    </div>
  )
}

export function Pager({ sections, children }: { sections: Section[]; children?: ReactNode }) {
  const count = sections.length
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const reduce = !!useReducedMotion()
  // Start on the section named in the URL (#projects etc.), if any.
  const [start] = useState(() => Math.max(0, ids.indexOf(window.location.hash.slice(1))))
  const pos = useMotionValue(start)
  const [index, setIndex] = useState(start)
  const [vh, setVh] = useState(() => window.innerHeight)
  const current = useRef(start)
  const moving = useRef(false)
  const endedAt = useRef(0)
  const queued = useRef<0 | 1 | -1>(0) // a swipe made mid-transition, played when it lands
  const goToRef = useRef<(i: number) => void>(() => {})

  const goTo = useCallback(
    (target: number) => {
      const next = clamp(target, 0, count - 1)
      if (next === current.current) return
      current.current = next
      setIndex(next)
      moving.current = true
      animate(pos, next, {
        duration: reduce ? 0 : DURATION,
        ease: EASE,
        onComplete: () => {
          moving.current = false
          endedAt.current = performance.now()
          const q = queued.current
          queued.current = 0
          if (q) goToRef.current(current.current + q)
        },
      })
    },
    [count, pos, reduce],
  )
  useEffect(() => {
    goToRef.current = goTo
  }, [goTo])

  // The track is as tall as all sections; moving it by -pos screens shows one at a time.
  const y = useTransform(pos, (p) => `${(-p * 100) / count}%`)

  useEffect(() => {
    document.documentElement.classList.add('paged')
    const setHeight = () => {
      setVh(window.innerHeight)
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
    }
    setHeight()
    window.addEventListener('resize', setHeight)

    const gestures = new WheelGestures()
    let acc = 0
    let armed = false
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      const dir = e.deltaY > 0 ? 1 : -1
      if (canScroll(e.target, dir)) return
      e.preventDefault()
      const now = performance.now()
      if (gestures.push(now, e.deltaY, moving.current ? 0 : now - endedAt.current)) {
        armed = true
        acc = 0
      }
      if (!armed) return
      acc += e.deltaY
      if (Math.abs(acc) < WHEEL_THRESHOLD) return
      armed = false
      // A swipe made while a page is still turning plays as soon as it lands.
      if (moving.current) queued.current = dir
      else goTo(current.current + dir)
    }

    const onKey = (e: KeyboardEvent) => {
      const t = e.target
      if (t instanceof Element && t.closest('input, textarea, select, [contenteditable], [role="dialog"]')) return
      if (e.key === ' ' && t instanceof Element && t.closest('button, a')) return // let Space press buttons
      const next = ['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)
      const prev = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)
      let to: number | null = null
      if (next) to = current.current + 1
      else if (prev) to = current.current - 1
      else if (e.key === 'Home') to = 0
      else if (e.key === 'End') to = count - 1
      if (to === null) return
      e.preventDefault()
      if (!moving.current) goTo(to)
    }

    let touchY = 0
    let touchTarget: EventTarget | null = null
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
      touchTarget = e.target
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY
      if (Math.abs(dy) < SWIPE_THRESHOLD || moving.current) return
      const dir = dy > 0 ? 1 : -1
      if (canScroll(touchTarget, dir)) return
      goTo(current.current + dir)
    }

    // In-page links (#projects etc.) turn the page instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? (e.target.closest('a[href^="#"]') as HTMLAnchorElement | null) : null
      if (!a) return
      const i = ids.indexOf(a.getAttribute('href')!.slice(1))
      if (i < 0) return
      e.preventDefault()
      goTo(i)
    }

    // Back/forward and typed #hashes also turn the page.
    const onHash = () => {
      const i = ids.indexOf(window.location.hash.slice(1))
      if (i >= 0) goTo(i)
    }

    window.addEventListener('hashchange', onHash)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('click', onClick)
    return () => {
      document.documentElement.classList.remove('paged')
      window.removeEventListener('resize', setHeight)
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('click', onClick)
    }
  }, [count, goTo, ids, pos])

  const value = useMemo(() => ({ pos, index, count, vh, goTo }), [pos, index, count, vh, goTo])

  return (
    <PagerContext.Provider value={value}>
      <div className="pager">
        <motion.div className="track" style={{ y, height: `${count * 100}%` }}>
          {sections.map((s, i) => (
            <Page key={s.id} i={i} id={s.id} parallax={s.parallax}>
              {s.node}
            </Page>
          ))}
        </motion.div>
      </div>
      {children}
    </PagerContext.Provider>
  )
}
