export const EASE = [0.22, 1, 0.36, 1] as const

// Shared "fade up into view" props for scroll reveals.
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, delay, ease: EASE },
})
