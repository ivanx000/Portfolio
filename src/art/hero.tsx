// The hero sky: ChatGPT art made from the reference video's sky (src/assets/art/sky).
// The plain sky and sun are one image; each wind streak is its own piece, cut to its
// own pixels only. Every streak stays whole and moves with the wind on its own timing:
// it drifts along, stretches a little from its tail and lifts slightly, then eases back.

import type { CSSProperties } from 'react'
import skyArt from '../assets/art/sky/sky.webp'
import streak1 from '../assets/art/sky/streak-1.webp'
import streak2 from '../assets/art/sky/streak-2.webp'
import streak3 from '../assets/art/sky/streak-3.webp'
import streak4 from '../assets/art/sky/streak-4.webp'
import streak5 from '../assets/art/sky/streak-5.webp'
import streak6 from '../assets/art/sky/streak-6.webp'
import streak7 from '../assets/art/sky/streak-7.webp'

type Streak = {
  src: string
  box: [left: number, top: number, width: number, height: number] // % of the sky canvas
  drift: number // px it travels each way
  period: number // seconds for one way
  delay: number
}

const STREAKS: Streak[] = [
  { src: streak1, box: [-24.74, 8.301, 86.784, 16.113], drift: 80, period: 7.5, delay: -1 },
  { src: streak2, box: [45.638, 10.645, 79.102, 12.5], drift: 64, period: 8.5, delay: -5 },
  { src: streak3, box: [-24.74, 28.906, 85.677, 25.488], drift: 90, period: 8, delay: -3 },
  { src: streak4, box: [26.497, 29.59, 98.242, 22.168], drift: 72, period: 9, delay: -6.5 },
  { src: streak5, box: [-24.74, 59.473, 59.831, 10.352], drift: 60, period: 6.5, delay: -2.5 },
  { src: streak6, box: [67.513, 64.941, 57.227, 9.863], drift: 64, period: 7, delay: -4 },
  { src: streak7, box: [40.885, 76.66, 47.786, 8.984], drift: 70, period: 7.8, delay: -0.5 },
]

export function SkyLayer() {
  return (
    <div className="hero-stage sky">
      <img className="hero-img" src={skyArt} alt="" draggable={false} />
      {STREAKS.map((s) => (
        <img
          key={s.src}
          className="sky-streak"
          src={s.src}
          alt=""
          draggable={false}
          style={
            {
              left: `${s.box[0]}%`,
              top: `${s.box[1]}%`,
              width: `${s.box[2]}%`,
              height: `${s.box[3]}%`,
              '--drift': `${s.drift}px`,
              animationDuration: `${s.period}s`,
              animationDelay: `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
