import { motion } from 'framer-motion'
import {
  Atom,
  BadgeCheck,
  Bot,
  Brain,
  Cable,
  Cloud,
  Code2,
  Database,
  Flame,
  FolderGit2,
  Gauge,
  GitBranch,
  Globe,
  Leaf,
  Palette,
  Server,
  Sparkles,
  Wind,
} from 'lucide-react'
import BlurText from './components/BlurText'
import HLSVideo from './components/HLSVideo'
import heroVideo from './assets/hero.mp4'

const navLinks = ['Home', 'Skills', 'Projects', 'Experience', 'Interests']

const technicalSkillRows = [
  {
    items: [
      { label: 'Java', icon: Code2 },
      { label: 'Python', icon: Code2 },
      { label: 'JavaScript', icon: Code2 },
      { label: 'SQL', icon: Database },
      { label: 'HTML/CSS', icon: Globe },
      { label: 'MongoDB', icon: Leaf },
    ],
  },
  {
    items: [
      { label: 'React', icon: Atom },
      { label: 'Node.js', icon: Server },
      { label: 'FastAPI', icon: Sparkles },
      { label: 'Express.js', icon: Cable },
      { label: 'Tailwind CSS', icon: Wind },
      { label: 'Vite', icon: Flame },
      { label: 'Gradle', icon: BadgeCheck },
    ],
  },
  {
    items: [
      { label: 'OpenGL', icon: Palette },
      { label: 'Matplotlib', icon: Gauge },
      { label: 'OpenAI API', icon: Bot },
      { label: 'Google Gemini API', icon: Sparkles },
      { label: 'Stable Diffusion', icon: Brain },
      { label: 'REST APIs', icon: Globe },
    ],
  },
  {
    items: [
      { label: 'Git', icon: GitBranch },
      { label: 'GitHub', icon: FolderGit2 },
      { label: 'Figma', icon: Palette },
      { label: 'VS Code', icon: Code2 },
      { label: 'IntelliJ', icon: Code2 },
      { label: 'Postman', icon: Cloud },
    ],
  },
]

const projects = [
  {
    title: 'Cinematic Portfolio System',
    detail: 'Designed and implemented a motion-rich portfolio with reusable UI components and responsive layout architecture.',
  },
  {
    title: 'AI-Enhanced Study Assistant',
    detail: 'Built a full-stack web app that integrates modern LLM APIs for personalized learning support and search workflows.',
  },
  {
    title: 'Realtime Team Dashboard',
    detail: 'Created a data dashboard with performant charts, robust API integration, and production-minded state management.',
  },
]

const experiences = [
  {
    title: 'Product Builds',
    detail:
      'Built and deployed full-stack applications focused on performance, accessibility, and clean UI systems.',
  },
  {
    title: 'Team Collaboration',
    detail:
      'Worked in student teams to scope features, deliver iterative milestones, and present technical decisions clearly.',
  },
  {
    title: 'Internship Readiness',
    detail:
      'Practicing production workflows with code reviews, version control, and maintainable component architecture.',
  },
]

const interests = [
  {
    title: 'Human-Centered Design',
    description: 'Designing interfaces that feel intuitive and enjoyable to use.',
  },
  {
    title: 'Performance Engineering',
    description: 'Profiling and optimizing web apps for speed across real devices.',
  },
  {
    title: 'Systems Thinking',
    description: 'Connecting frontend, backend, and data into coherent product systems.',
  },
  {
    title: 'AI and Developer Tools',
    description: 'Exploring ways intelligent tooling can amplify software craftsmanship.',
  },
]

const heroVideoSrc = heroVideo

function App() {
  return (
    <div className="overflow-x-clip bg-[radial-gradient(circle_at_18%_0%,#5d8f78_0%,#426d5a_34%,#345646_70%,#2a4639_100%)]">
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center">
          <nav className="liquid-glass rounded-full px-2 py-2">
            <ul className="flex items-center gap-1 md:gap-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="inline-flex rounded-full px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section id="home" className="relative min-h-[100svh] overflow-hidden">
        <HLSVideo
          src={heroVideoSrc}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          preload="auto"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 text-center md:px-12">

          <BlurText
            text="Ivan Xie"
            className="text-6xl md:text-7xl lg:text-8xl font-heading italic text-foreground leading-[0.86] tracking-[-3px]"
          />

          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-base text-white/80 font-body"
          >
            I build polished digital experiences with thoughtful design, strong
            engineering fundamentals, and a focus on user impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: 1.05 }}
            className="mt-4"
          >
            <p className="text-sm md:text-base text-white/70 font-body tracking-wide">
              Computer Science student at the University of Toronto
            </p>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="px-6 py-24 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight">
            My Skills
          </h2>

          <div className="skills-surface liquid-glass rounded-3xl p-6 md:p-10">
            <div className="space-y-4">
              {technicalSkillRows.map(({ items }, rowIndex) => (
              <div key={`skills-row-${rowIndex}`} className="skills-marquee rounded-2xl p-2">
                <div
                  className="skills-track"
                  style={{ animationDuration: `${28 + rowIndex * 4}s` }}
                >
                  {[...items, ...items].map(({ label, icon: Icon }, index) => (
                    <span key={`${label}-${index}`} className="skill-pill">
                      <Icon size={16} aria-hidden="true" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-24 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="liquid-glass rounded-2xl p-7">
                <h3 className="text-2xl font-heading italic text-white">{project.title}</h3>
                <p className="mt-4 text-white/80 font-body text-sm leading-relaxed">
                  {project.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-24 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight">
            Experience
          </h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {experiences.map((experience) => (
              <article key={experience.title} className="liquid-glass rounded-2xl p-7">
                <h3 className="text-2xl font-heading italic text-white">{experience.title}</h3>
                <p className="mt-4 text-white/75 font-body text-sm leading-relaxed">
                  {experience.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="interests" className="px-6 py-24 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight">
            Interests
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {interests.map(({ title, description }) => (
              <article key={title} className="liquid-glass rounded-2xl p-6">
                <h3 className="text-xl font-heading italic text-white">{title}</h3>
                <p className="mt-3 text-white/70 font-body text-sm leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-14 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl border-t border-white/10 pt-8 text-xs text-white/50 font-body">
          © 2026 Ivan Xie
        </div>
      </footer>
    </div>
  )
}

export default App
