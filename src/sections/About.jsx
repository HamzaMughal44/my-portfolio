import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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

function QuickFactsCard() {
  const facts = [
    { label: 'Role', value: 'Full Stack Developer (MERN)' },
    { label: 'Location', value: 'Quetta, Pakistan' },
    { label: 'Experience', value: 'Internship at AddsMint (2026)' },
    { label: 'Focus', value: 'React, Node.js, MongoDB, PostgreSQL' },
  ]

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-zinc-200/90 shadow-sm p-5 md:p-6">
      <div className="pb-4 mb-4 border-b border-zinc-100">
        <p className="text-xs font-bold tracking-widest text-brand-dark uppercase">
          Quick facts
        </p>
      </div>

      <div className="space-y-4">
        {facts.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-sm">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 sm:w-24 text-left">
              {label}
            </span>
            <span className="text-zinc-800 font-medium text-left sm:text-right leading-snug">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="text-xs font-bold tracking-widest text-brand-dark uppercase mb-3">
                ABOUT ME
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight mb-4 max-w-lg text-balance">
                Building web apps that work well and last.
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-4 text-zinc-600 text-base leading-relaxed">
                <p>
                  I'm Hamza Mughal, a full-stack developer from Quetta, Pakistan, focused on building scalable, high-performance web applications. I work across the entire stack with React, Next.js, and Node.js, turning complex requirements into clean, intuitive products.
                </p>
                <p>
                  My work includes ERP systems, job portals, an AI-powered recruitment platform, and cross-platform desktop applications. I care about maintainable code, thoughtful architecture, and user experiences that feel effortless. Open to full-time opportunities.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Quick Facts Card (Top aligned with text column) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <FadeIn delay={0.2} className="w-full flex justify-center lg:justify-end">
              <QuickFactsCard />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
