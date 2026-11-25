// Secondary illustrations: canoe (About), project fish, lake-world map (Experience).
// The pictures are ChatGPT art made from the reference video's frames (src/assets/art);
// the code only places and animates them.

import { motion, useReducedMotion } from 'framer-motion'
import canoeArt from '../assets/art/canoe/canoe.webp'
import schoolFishArt from '../assets/art/canoe/fish.webp'
import oarArt from '../assets/art/canoe/oar.webp'
import padArt from '../assets/art/canoe/pad.webp'
import anglerArt from '../assets/art/fish/angler.webp'
import hoopArt from '../assets/art/fish/hoop.webp'
import pufferArt from '../assets/art/fish/puffer.webp'
import stripedArt from '../assets/art/fish/striped.webp'
import tangArt from '../assets/art/fish/tang.webp'
import mapArt from '../assets/art/map/map.webp'
import type { Creature, Job } from '../data'
import { rand } from './geometry'
import { MAP_SIZE, REGIONS } from './lake-map'

/* ---------------- About: canoe from above ---------------- */

function LilyPad({ cx, cy, r, rot, delay }: { cx: number; cy: number; r: number; rot: number; delay: number }) {
  return (
    <motion.image
      href={padArt}
      x={cx - r}
      y={cy - r}
      width={r * 2}
      height={r * 2}
      initial={{ rotate: rot }}
      animate={{ y: [0, -4, 0], rotate: [rot, rot + 6, rot] }}
      transition={{ duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  )
}

// One fish of the circling school, heading along +x before it is turned.
function SchoolFish({ x, y, angle, scale }: { x: number; y: number; angle: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <image href={schoolFishArt} x={-31} y={-14} width={62} height={28} />
    </g>
  )
}

// Canoe art: 380 x 107 units, centred on the origin; the paddler's hands are near x = -20.
const CANOE = { w: 380, h: 107 }
const OAR = { len: 150, thick: 22 }

export function KayakScene() {
  const reduce = useReducedMotion()
  const fish = Array.from({ length: 11 }, (_, i) => {
    const a = (i / 11) * 360 + rand(i) * 16
    const r = 180 + rand(i + 20) * 40
    const rad = (a * Math.PI) / 180
    return {
      x: 260 + Math.cos(rad) * r,
      y: 240 + Math.sin(rad) * r,
      angle: a + 90 + (rand(i + 40) - 0.5) * 24,
      scale: 0.8 + rand(i + 60) * 0.55,
    }
  })

  return (
    <svg viewBox="0 0 520 480" role="img" aria-label="Illustration of a canoe seen from above, with a paddler, a laptop, lily pads and a school of fish">
      <LilyPad cx={92} cy={74} r={40} rot={40} delay={0} />
      <LilyPad cx={150} cy={140} r={22} rot={200} delay={1.2} />
      <LilyPad cx={452} cy={392} r={40} rot={250} delay={0.6} />
      <LilyPad cx={394} cy={448} r={18} rot={10} delay={1.8} />
      <LilyPad cx={488} cy={60} r={13} rot={120} delay={2.4} />
      <LilyPad cx={44} cy={410} r={14} rot={300} delay={0.9} />
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '260px 240px' }}
      >
        {fish.map((f, i) => (
          <SchoolFish key={i} {...f} />
        ))}
      </motion.g>

      {/* canoe, slowly turning on the water */}
      <motion.g
        animate={reduce ? undefined : { rotate: [-42, -28, -42] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '260px 240px' }}
      >
        <g transform="translate(260 240)">
          {/* oars, rowing: handle at the paddler's hand, blade out and a little back */}
          {[-1, 1].map((side) => (
            <motion.g
              key={side}
              animate={reduce ? undefined : { rotate: [side * -10, side * 12, side * -10] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `-20px ${side * 34}px` }}
            >
              <g transform={`translate(-20 ${side * 34}) rotate(${side * -71})`}>
                <image href={oarArt} x={-OAR.len} y={-OAR.thick / 2} width={OAR.len} height={OAR.thick} />
              </g>
            </motion.g>
          ))}
          <image href={canoeArt} x={-CANOE.w / 2} y={-CANOE.h / 2} width={CANOE.w} height={CANOE.h} />
        </g>
      </motion.g>
    </svg>
  )
}

/* ---------------- Projects: fish ---------------- */

const FISH: Record<Creature, string> = {
  striped: stripedArt,
  angler: anglerArt,
  tang: tangArt,
  hoop: hoopArt,
  puffer: pufferArt,
}

// Every fish faces right; the swimmer flips it when it swims left.
export function Mascot({ kind }: { kind: Creature }) {
  return <img className="mascot" src={FISH[kind]} alt="" draggable={false} />
}

/* ---------------- Experience: map of the lake world ---------------- */

// Like the reference's US map: a flat map of our lake world, one region per job. The
// selected job's region fills red and lifts a little, with its short name on it.
export function LakeMap({ jobs, active, onSelect }: { jobs: Job[]; active: number; onSelect: (i: number) => void }) {
  return (
    <svg viewBox={`0 0 ${MAP_SIZE.w} ${MAP_SIZE.h}`} role="group" aria-label="Map of the lake world with one region per job">
      <image href={mapArt} x={0} y={0} width={MAP_SIZE.w} height={MAP_SIZE.h} />
      {jobs.map((job, i) => {
        const region = REGIONS[job.id]
        const on = i === active
        return (
          <g
            key={job.id}
            className={on ? 'region on' : 'region'}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${job.company}, ${job.dates}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(i)
              }
            }}
          >
            <path className="region-shape" d={region.d} />
            <text className="region-label" x={region.label[0]} y={region.label[1]} textAnchor="middle" dominantBaseline="central">
              {job.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
