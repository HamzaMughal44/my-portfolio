import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'

const experiences = [
  {
    company: 'AddsMint',
    role: 'MERN Stack Developer Intern',
    type: 'Internship · On-site',
    period: '2026 · 3 Months',
    bullets: [
      'Built responsive frontend interfaces and reusable component libraries using React, Next.js, and Tailwind CSS for web and desktop platforms.',
      'Developed and structured backend RESTful APIs with Node.js and Express, implementing secure authentication, route handling, and input validation.',
      'Contributed to core functional modules for enterprise ERP software and full-stack job portal applications.',
      'Engineered desktop application features with Electron.js, incorporating local SQLite storage for offline-first reliability.',
      'Integrated MongoDB and PostgreSQL databases with optimized schemas, queries, and Supabase integration.',
    ],
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Supabase', 'Electron.js'],
  },
]

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

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-[var(--bg)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Header */}
        <FadeIn>
          <SectionHeader
            label="EXPERIENCE"
            title="Work Experience"
            className="mb-10"
          />
        </FadeIn>

        {/* Timeline Container (Full Width) */}
        <div className="relative w-full">
          {/* Vertical Timeline Guide Line */}
          <div
            aria-hidden="true"
            className="absolute left-1.5 top-3 bottom-0 w-px bg-[var(--border)]"
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.role} delay={i * 0.1}>
                <div className="relative pl-8 sm:pl-9 pb-2">
                  {/* Timeline Node Dot: Solid orange brand dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-brand ring-4 ring-brand/20"
                  />

                  {/* Experience Card */}
                  <article className="w-full rounded-[8px] bg-[var(--surface)] border border-[var(--border)] p-5 md:p-6 shadow-[var(--card-shadow)] hover:border-brand/60 hover:shadow-[0_8px_24px_-4px_rgba(255,90,0,0.10)] transition-all duration-300">
                    {/* Header: Company, Role, Period */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b border-[var(--border)]">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text)] leading-tight">
                          {exp.company}
                        </h3>
                        <p className="text-sm font-semibold text-brand mt-0.5">
                          {exp.role}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1 shrink-0">
                        <span className="inline-block text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-2)] border border-[var(--border)] px-3 py-1 rounded-[4px] whitespace-nowrap">
                          {exp.period}
                        </span>
                        <span className="text-[11px] text-[var(--text-dim)] font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="py-4 space-y-2.5 text-sm text-[var(--text-muted)]">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" aria-hidden="true" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack Chips */}
                    <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-1.5">
                      {exp.stack.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
