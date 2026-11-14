import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Code2, Compass } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const handleScrollToContact = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const whatIBuild = [
    'Web Applications',
    'ERP Systems',
    'Job Portals',
    'Desktop Applications',
  ]

  const myApproach = [
    'Clean Code',
    'Problem Solving',
    'Maintainable Architecture',
    'User-Focused Development',
  ]

  return (
    <section id="about" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-[var(--bg)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

        {/* ── Asymmetrical Editorial Layout: Header & Focus on Left, Narrative on Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* LEFT COLUMN: Eyebrow, Large Statement & Context Card */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <FadeIn>
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-6 h-[2px] bg-brand inline-block shrink-0" aria-hidden="true" />
                <p className="text-xs font-bold tracking-widest text-brand uppercase">
                  ABOUT ME
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[var(--text)] tracking-tight leading-[1.2] mb-6 text-balance">
                Building software that solves real problems.
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              {/* Context Callout Box (Subtle & Editorial) */}
              <div className="rounded-[8px] bg-[var(--surface)] border border-[var(--border)] border-l-2 border-l-brand p-4 sm:p-5 shadow-[var(--card-shadow)] mb-6">
                <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-1">
                  Location & Focus
                </p>
                <p className="text-sm font-medium text-[var(--text)]">
                  Based in Quetta, Pakistan · Specializing in Full-Stack Web & Desktop Solutions
                </p>
              </div>

              {/* Direct Subtle Contact Link */}
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span>Let's connect and discuss your project</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-150" aria-hidden="true" />
              </a>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: 3 Narrative Paragraphs */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-1 lg:pt-2">
            <FadeIn delay={0.15}>
              <div className="space-y-4 text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
                <p>
                  I'm Hamza Mughal, a software developer based in Quetta, Pakistan. I enjoy turning ideas and complex requirements into practical, reliable software solutions.
                </p>
                <p>
                  My experience includes building web applications, ERP systems, job portals, and desktop applications. I work with technologies like React, Next.js, Node.js, Express, MongoDB, and PostgreSQL, focusing on clean code, maintainable architecture, and user-friendly experiences.
                </p>
                <p>
                  I'm continuously improving my problem-solving skills, exploring new technologies, and working towards becoming a stronger software engineer.
                </p>
              </div>
            </FadeIn>
          </div>

        </div>

        {/* ── Two Compact Feature Cards Below (What I Build & My Approach) ── */}
        <FadeIn delay={0.2} className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* What I Build */}
            <div className="rounded-[8px] bg-[var(--surface)] border border-[var(--border)] p-6 shadow-[var(--card-shadow)] hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_8px_24px_-4px_rgba(255,90,0,0.12)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[6px] bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                  <Code2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text)] leading-tight">
                    What I Build
                  </h3>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5">
                    Core solutions & systems
                  </p>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                {whatIBuild.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Approach */}
            <div className="rounded-[8px] bg-[var(--surface)] border border-[var(--border)] p-6 shadow-[var(--card-shadow)] hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_8px_24px_-4px_rgba(255,90,0,0.12)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[6px] bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                  <Compass size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text)] leading-tight">
                    My Approach
                  </h3>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5">
                    Engineering philosophy
                  </p>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                {myApproach.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  )
}
