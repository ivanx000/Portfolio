import { MotionConfig } from 'framer-motion'
import { About } from './sections/About'
import { Cursor } from './sections/Cursor'
import { Ending } from './sections/Ending'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Pager } from './sections/Pager'
import { Projects } from './sections/Projects'
import { SectionDots } from './sections/SectionDots'
import { SoundDock } from './sections/SoundDock'

// One full-screen section at a time; the pager turns between them.
const SECTIONS = [
  { id: 'top', node: <Hero />, parallax: false },
  { id: 'about', node: <About /> },
  { id: 'projects', node: <Projects /> },
  { id: 'experience', node: <Experience /> },
  { id: 'end', node: <Ending />, parallax: false },
]

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Pager sections={SECTIONS}>
        <SectionDots />
        <SoundDock />
      </Pager>
      <Cursor />
    </MotionConfig>
  )
}
