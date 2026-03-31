import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  Palette,
  Play,
  Shield,
  Zap,
} from 'lucide-react'
import BlurText from './components/BlurText'
import HLSVideo from './components/HLSVideo'
import { Button } from './components/ui/button'

const navLinks = ['Home', 'Services', 'Work', 'Process', 'Pricing']

const partners = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma']

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Luminary',
    quote:
      'A complete rebuild in five days. The new experience feels cinematic, and our inbound leads doubled in the first month.',
  },
  {
    name: 'Marcus Webb',
    role: 'Head of Growth, Arcline',
    quote:
      'Conversions up 4x and bounce rate cut in half. It is the first site our sales team is genuinely proud to send.',
  },
  {
    name: 'Elena Voss',
    role: 'Brand Director, Helix',
    quote:
      "They didn't just design our site. They distilled our brand into an experience that finally feels as premium as the product.",
  },
]

const featureCards = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    description: 'Concept to launch at a pace that redefines fast.',
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    description: 'Every detail considered. Every element refined.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    description:
      'Layouts informed by data. Decisions backed by performance.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade protection comes standard.',
  },
]

const heroVideoSrc =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

const startVideoSrc =
  'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

const statsVideoSrc =
  'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

const footerVideoSrc =
  'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

function VideoFadeOverlays() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[200px] bg-gradient-to-t from-black to-transparent" />
    </>
  )
}

function App() {
  return (
    <div className="bg-black overflow-visible">
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <img src="/favicon.svg" alt="Studio logo" width={48} height={48} className="size-12" />

          <nav className="liquid-glass rounded-full px-2 py-2">
            <ul className="flex items-center gap-1 md:gap-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex rounded-full px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <Button variant="solid" size="sm" className="gap-1.5">
                  Get Started
                  <ArrowUpRight size={14} />
                </Button>
              </li>
            </ul>
          </nav>

          <div className="hidden w-12 md:block" aria-hidden="true" />
        </div>
      </header>

      <section className="relative h-[1000px] overflow-visible bg-black">
        <HLSVideo
          src={heroVideoSrc}
          poster="/images/hero_bg.jpeg"
          className="absolute top-[20%] z-0 h-auto w-full object-contain"
          preload="auto"
        />
        <div className="absolute inset-0 z-0 bg-black/5" />
        <div className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] bg-gradient-to-b from-transparent to-black" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center px-6 pt-[150px] text-center md:px-16">
          <div className="liquid-glass mb-6 inline-flex items-center gap-3 rounded-full px-3 py-2 text-left">
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black font-body">
              New
            </span>
            <span className="body-copy text-white/90">
              Introducing AI-powered web design.
            </span>
          </div>

          <BlurText
            text="The Website Your Brand Deserves"
            className="max-w-5xl text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.8] tracking-[-4px]"
          />

          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="mt-6 max-w-2xl body-copy"
          >
            Stunning design. Blazing performance. Built by AI, refined by
            experts. This is web design, wildly reimagined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: 1.1 }}
            className="mt-8 flex items-center gap-4"
          >
            <Button className="gap-2">
              Get Started
              <ArrowUpRight size={16} />
            </Button>
            <Button variant="ghost" className="gap-2 px-2">
              <Play size={16} />
              Watch the Film
            </Button>
          </motion.div>

        </div>
      </section>

      <section className="px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="liquid-glass section-badge">
            Trusted by the teams behind
          </span>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-2xl md:text-3xl font-heading italic text-white"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[700px] px-6 py-32 md:px-16 lg:px-24">
        <HLSVideo src={startVideoSrc} className="absolute inset-0 z-0 h-full w-full object-cover" />
        <VideoFadeOverlays />
        <div className="absolute inset-0 z-[1] bg-black/35" />

        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-4xl flex-col items-center justify-center text-center">
          <span className="liquid-glass section-badge">How It Works</span>
          <h2 className="section-heading">You dream it. We ship it.</h2>
          <p className="body-copy mt-5 max-w-2xl">
            Share your vision. Our AI handles the rest-wireframes, design, code,
            launch. All in days, not quarters.
          </p>
          <Button className="mt-8 gap-2">
            Get Started
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <span className="liquid-glass section-badge">Capabilities</span>
          <h2 className="section-heading mb-16">Pro features. Zero complexity.</h2>

          <div className="mb-12 flex flex-col items-center gap-10 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.95]">
                Designed to convert. Built to perform.
              </h3>
              <p className="body-copy mt-4 max-w-lg">
                Every pixel is intentional. Our AI studies what works across
                thousands of top sites-then builds yours to outperform them all.
              </p>
              <Button className="mt-6">Learn more</Button>
            </div>
            <div className="liquid-glass w-full overflow-hidden rounded-2xl lg:w-1/2">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2swa2lndGQxN2x6M2x0ZmNwOG1ja2l4dW9rM3BoY2szaDh2bWs0NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26ufdipQqU2lhNA4g/giphy.gif"
                alt="Analytics dashboard animation"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 lg:flex-row-reverse">
            <div className="w-full lg:w-1/2">
              <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.95]">
                It gets smarter. Automatically.
              </h3>
              <p className="body-copy mt-4 max-w-lg">
                Your site evolves on its own. AI monitors every click, scroll,
                and conversion-then optimizes in real time. No manual updates.
                Ever.
              </p>
              <Button className="mt-6">See how it works</Button>
            </div>
            <div className="liquid-glass w-full overflow-hidden rounded-2xl lg:w-1/2">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Bza3E3M2M3N3c2bXg0dzA5MGl5Nm5xMGM1N2g4d3M2dTR6aDdlbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif"
                alt="Optimization workflow animation"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <span className="liquid-glass section-badge">Why Us</span>
          <h2 className="section-heading mb-12">The difference is everything.</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <article key={title} className="liquid-glass rounded-2xl p-6">
                <div className="liquid-glass-strong mb-5 flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-heading italic text-white">{title}</h3>
                <p className="mt-3 text-white/60 font-body font-light text-sm">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 md:px-16 lg:px-24">
        <HLSVideo
          src={statsVideoSrc}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ filter: 'saturate(0)' }}
        />
        <VideoFadeOverlays />
        <div className="absolute inset-0 z-[1] bg-black/35" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="liquid-glass rounded-3xl p-12 md:p-16">
            <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
              {[
                ['200+', 'Sites launched'],
                ['98%', 'Client satisfaction'],
                ['3.2x', 'More conversions'],
                ['5 days', 'Average delivery'],
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white">
                    {value}
                  </p>
                  <p className="mt-2 text-white/60 font-body font-light text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <span className="liquid-glass section-badge">What They Say</span>
          <h2 className="section-heading mb-12">Don't take our word for it.</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="liquid-glass rounded-2xl p-8">
                <p className="text-white/80 font-body font-light text-sm italic">
                  {testimonial.quote}
                </p>
                <p className="mt-6 text-white font-body font-medium text-sm">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-white/50 font-body font-light text-xs">
                  {testimonial.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pt-24 pb-10 md:px-16 lg:px-24">
        <HLSVideo src={footerVideoSrc} className="absolute inset-0 z-0 h-full w-full object-cover" />
        <VideoFadeOverlays />
        <div className="absolute inset-0 z-[1] bg-black/35" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9]">
            Your next website starts here.
          </h2>
          <p className="body-copy mx-auto mt-5 max-w-xl">
            Book a free strategy call. See what AI-powered design can do.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button className="gap-2">
              Book a Call
              <ArrowUpRight size={16} />
            </Button>
            <Button variant="solid">View Pricing</Button>
          </div>

          <footer className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 font-body md:flex-row">
            <p>© 2026 Studio</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white/70 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white/70 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white/70 transition-colors">
                Contact
              </a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}

export default App
