import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

// A ring with a dot in its centre, both locked to the pointer. Over anything clickable
// the ring and dot change colour; on dark sections (data-cursor="light") they turn white.
// Mouse and trackpad only.
const INTERACTIVE = 'a, button, [role="button"], [role="tab"], input, label, select'

export function Cursor() {
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [light, setLight] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target instanceof Element ? e.target : null
      setHovering(!!t?.closest(INTERACTIVE))
      setLight(!!t?.closest('[data-cursor="light"]'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const state = hovering ? 'hover' : light ? 'light' : 'idle'
  return (
    <motion.div className="cursor" data-state={state} aria-hidden="true" style={{ x, y, opacity: visible ? 1 : 0 }}>
      <span className="cursor-ring" />
      <span className="cursor-dot" />
    </motion.div>
  )
}
