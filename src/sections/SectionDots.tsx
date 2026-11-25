import { usePager } from '../lib/pager'

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'end', label: 'Campfire' },
]

// Fixed dots on the right edge: shows which section you're on and jumps between them.
export function SectionDots() {
  const { index, goTo } = usePager()
  return (
    <nav aria-label="Sections">
      <ul className="dots">
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <button aria-label={s.label} aria-current={index === i} onClick={() => goTo(i)}>
              <span className="dot" aria-current={index === i} />
              <span className="dot-label">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
