import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    company: 'AddsMint',
    role: 'Full Stack MERN Developer Intern',
    type: 'Internship · On-site',
    period: '2026 · 3 Months',
    bullets: [
      'Built responsive frontend components and client interfaces with React and Next.js for web and desktop apps.',
      'Developed and structured backend REST APIs using Node.js and Express with secure validation and route handling.',
      'Integrated MongoDB and PostgreSQL databases for operational ERP and job portal systems with Electron support.',
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
    <section id="experience" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-zinc-50/50 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Header */}
        <FadeIn>
          <div className="mb-12">
            <p className="text-xs font-bold tracking-widest text-brand-dark uppercase mb-3">
              EXPERIENCE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              Work Experience
            </h2>
          </div>
        </FadeIn>

        {/* Timeline Container (Full Width) */}
        <div className="relative w-full">
          {/* Vertical Timeline Guide Line */}
          <div
            aria-hidden="true"
            className="absolute left-1.5 top-3 bottom-0 w-px bg-zinc-200"
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.role} delay={i * 0.1}>
                <div className="relative pl-8 sm:pl-9 pb-2">
                  {/* Timeline Node Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-brand ring-4 ring-brand-50"
                  />

                  {/* Experience Card (Full width inside container) */}
                  <article className="w-full rounded-2xl bg-white border border-zinc-200/90 p-5 md:p-6 shadow-xs">
                    {/* Header: Company, Role, Period */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b border-zinc-100">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-tight">
                          {exp.company}
                        </h3>
                        <p className="text-sm font-semibold text-brand-dark mt-0.5">
                          {exp.role}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1 shrink-0">
                        <span className="inline-block text-xs font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="py-4 space-y-2.5 text-sm text-zinc-600">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" aria-hidden="true" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack Badges */}
                    <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-1.5" aria-label="Applied technologies">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1.5">
                        Stack:
                      </span>
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                        >
                          {tech}
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
