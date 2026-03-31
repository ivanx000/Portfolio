import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

type BlurTextProps = {
  text: string
  className?: string
}

function BlurText({ text, className }: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const words = text.split(' ')

  useEffect(() => {
    const element = headingRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <h1 ref={headingRef} className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            isVisible
              ? { filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], opacity: [0, 0.5, 1], y: [50, -5, 0] }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={{
            duration: 1.05,
            ease: 'easeOut',
            delay: index * 0.1,
            times: [0, 0.5, 1],
          }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </h1>
  )
}

export default BlurText
