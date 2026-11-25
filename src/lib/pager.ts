import { createContext, useContext } from 'react'
import type { MotionValue } from 'framer-motion'

// The page is a stack of full-screen sections. `pos` is the animated section index
// (0.5 = halfway between the first two), which sections use for their transitions.
export type Pager = {
  pos: MotionValue<number>
  index: number
  count: number
  vh: number
  goTo: (i: number) => void
}

export const PagerContext = createContext<Pager | null>(null)

export function usePager(): Pager {
  const p = useContext(PagerContext)
  if (!p) throw new Error('usePager must be used inside <Pager>')
  return p
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
