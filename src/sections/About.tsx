import { motion } from 'framer-motion'
import { KayakScene } from '../art/scenes'
import { ABOUT } from '../data'
import { EASE, reveal } from './motion'

export function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <motion.span className="tag" {...reveal()}>
            <span className="tag-icon" aria-hidden="true">
              <svg width="10" height="11" viewBox="0 0 10 11">
                <path d="M1 1 L9 5.5 L1 10 Z" fill="#fff" />
              </svg>
            </span>
            {ABOUT.tag}
          </motion.span>
          <motion.h2 id="about-title" {...reveal(0.08)}>
            {ABOUT.title}
          </motion.h2>
          {ABOUT.body.map((p, i) => (
            <motion.p key={i} {...reveal(0.16 + i * 0.08)}>
              {p}
            </motion.p>
          ))}
          <motion.ul className="skills" aria-label="Main tools" {...reveal(0.32)}>
            {ABOUT.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </motion.ul>
          <motion.a className="text-link" href={ABOUT.cta.href} {...reveal(0.4)}>
            {ABOUT.cta.label}
          </motion.a>
        </div>
        <motion.div
          className="kayak-art"
          initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <KayakScene />
        </motion.div>
      </div>
    </section>
  )
}
