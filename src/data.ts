// All site copy lives here so the sections stay presentational.
// Sources: resume (Nov 2026) and each project's own repo.

export const LINKS = {
  github: 'https://github.com/ivanx000',
  linkedin: 'https://www.linkedin.com/in/xieivan/',
  archive2025: '/2025/',
}

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#end' },
  { label: 'GitHub', href: LINKS.github, external: true },
]

export const ABOUT = {
  tag: 'About me',
  title: 'Computer Science at U of T',
  body: [
    "I'm a Computer Science student at the University of Toronto, graduating in 2028. I like work that ends up in someone's hands: a React Native app on a client's phone, an eval harness that catches a regression before it ships, a trading system that has to stay up all night.",
    "Right now I'm a Software Engineer Intern at Bellwoods Capital, and I'm joining TD Bank in January 2027.",
  ],
  skills: ['Python', 'TypeScript', 'Rust', 'React Native', 'FastAPI', 'AWS'],
  cta: { label: 'See my projects', href: '#projects' },
}

export type Creature = 'striped' | 'angler' | 'puffer' | 'tang' | 'hoop'

export type Project = {
  name: string
  blurb: string
  stack: string[]
  meta: string // one short highlight shown on the card
  creature: Creature
  links: { label: string; href: string }[]
  private?: boolean
}

// Blurbs stay short: five cards share one row on desktop.
export const PROJECTS: Project[] = [
  {
    name: 'Evals',
    blurb: 'A pytest-style CLI that benchmarks LLM outputs against YAML test suites, with regex, code and LLM-as-judge graders.',
    stack: ['TypeScript', 'Node.js', 'Vitest'],
    meta: '3 grader types',
    creature: 'striped',
    links: [{ label: 'view repo', href: 'https://github.com/ivanx000/evals' }],
  },
  {
    name: 'Polymarket Bot',
    blurb: 'An algorithmic trading bot I co-develop: Rust for execution, Python for research, deployed on AWS EC2 with Docker.',
    stack: ['Python', 'Rust', 'Docker'],
    meta: 'Runs on AWS EC2',
    creature: 'angler',
    links: [],
    private: true,
  },
  {
    name: 'Caden',
    blurb: 'A WebAuthn and passkey library in Rust, built to the W3C Level 3 spec with zero unsafe code and 297+ tests.',
    stack: ['Rust', 'ring', 'Axum'],
    meta: '297+ tests',
    creature: 'tang',
    links: [{ label: 'view repo', href: 'https://github.com/ivanx000/caden-rs' }],
  },
  {
    name: 'NBA Game Predictor',
    blurb: 'Pick tonight’s winner on a 3D court, then see the model’s odds and reasons. It beats Elo on log loss over 1,230 games.',
    stack: ['TypeScript', 'Python', 'Three.js'],
    meta: 'Live site',
    creature: 'hoop',
    links: [
      { label: 'view repo', href: 'https://github.com/ivanx000/NBA' },
      { label: 'live site', href: 'https://nba-alpha-olive.vercel.app' },
    ],
  },
  {
    name: 'ShopOut',
    blurb: 'Built at UofTHacks 13: describe who you want to become and AI assembles the cart, using FastAPI, Gemini and RAG.',
    stack: ['Next.js', 'FastAPI', 'Gemini'],
    meta: 'UofTHacks 13',
    creature: 'puffer',
    links: [
      { label: 'view repo', href: 'https://github.com/ivanx000/ShopOut' },
      { label: 'live demo', href: 'https://shopout.vercel.app' },
    ],
  },
]

export type Job = {
  id: string
  label: string
  company: string
  role: string
  dates: string
  year: string
  points: string[]
}

// Chronological: the order the map tours the regions in. Each id has a region in src/art/lake-map.ts.
export const JOBS: Job[] = [
  {
    id: 'phc',
    label: 'PHC',
    company: 'Project: Human City',
    role: 'Software Engineer Intern',
    dates: 'May – Aug 2025',
    year: '2025',
    points: [
      'Architected a Node.js backend on AWS EC2 with Auto Scaling and load balancing for 200+ users',
      'Built a cross-platform React Native UI that behaves the same on iOS and Android',
      'Fixed post-launch platform inconsistencies, contributing to a 23% rise in downloads',
    ],
  },
  {
    id: 'sw',
    label: 'SW',
    company: 'Swimingo',
    role: 'Software Engineer Intern',
    dates: 'Jul – Sep 2026',
    year: '2026',
    points: [
      'Built a Python harness benchmarking AI citations across 5 LLM platforms, 42 queries and 94 pages',
      'Found a content gap through retrieval analysis, lifting AI visibility for cost queries from 8% to 36%',
      'Shipped a notification pipeline with n8n, Resend and MySQL, closing a zero-notification gap',
    ],
  },
  {
    id: 'bc',
    label: 'BC',
    company: 'Bellwoods Capital',
    role: 'Software Engineer Intern',
    dates: 'Sep 2026 – Present',
    year: 'Now',
    points: [
      'Developing Thrive, a React Native and Django REST wellness app, on a 7-person Agile team',
      'Scoped 5 MVP user stories with the client and prototyped the flows in Figma',
      'Repaired the push-notification system 3 planned features depend on; ship a weekly Android build',
    ],
  },
  {
    id: 'td',
    label: 'TD',
    company: 'TD Bank',
    role: 'Incoming Software Engineer Intern',
    dates: 'Jan – Apr 2027',
    year: '2027',
    points: ['Joining in Toronto for the Winter 2027 term'],
  },
]

export const ENDING = {
  tag: 'End of the trail',
  title: 'Thanks for stopping by.',
  body: "That's the trail so far. If you want to see more, these are the best places to find me.",
  signs: [
    { label: 'Resume', note: 'PDF, one page', href: '/resume.pdf', icon: 'resume' },
    { label: 'GitHub', note: '@ivanx000', href: 'https://github.com/ivanx000', icon: 'github' },
    { label: 'LinkedIn', note: 'in/xieivan', href: 'https://www.linkedin.com/in/xieivan/', icon: 'linkedin' },
  ],
} as const
