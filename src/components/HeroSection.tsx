import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import HLSVideo from './HLSVideo'
import './HeroSection.css'

const HERO_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

type BlurTextProps = {
  text: string
  className?: string
}

function BlurText({ text, className }: BlurTextProps) {
  const words = text.split(' ')

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, filter: 'blur(20px)', y: 22 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
          className="hero-blur-word"
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </h1>
  )
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <HLSVideo
          src={HERO_VIDEO_SRC}
          className="hero-video"
          preload="auto"
          disablePictureInPicture
        />
      </div>

      <div className="hero-bottom-gradient" aria-hidden="true" />

      <div className="hero-content">
        <span className="liquid-glass hero-badge">New</span>

        <BlurText
          text="The Website Your Brand Deserves"
          className="hero-title"
        />

        <p className="hero-subtext">
          High-conversion portfolio and brand sites with bold visuals, clear
          messaging, and motion that feels premium.
        </p>

        <div className="hero-actions">
          <button type="button" className="liquid-glass-strong hero-cta">
            Start a Project
            <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button type="button" className="liquid-glass-strong hero-cta">
            View My Work
            <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection