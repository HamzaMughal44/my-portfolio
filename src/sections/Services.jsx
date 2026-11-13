import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Server, Brain, BarChart3, Database, Monitor, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Layers,
    title: 'Full Stack Web Development',
    description:
      'Responsive, modern web applications built with React and Next.js on the frontend, backed by Node.js and Express.',
    points: ['React & Next.js', 'Node.js & Express', 'REST APIs', 'Auth & Session Handling'],
  },
  {
    icon: Server,
    title: 'API & Backend Development',
    description:
      'Structured backend services and REST APIs with data validation, JWT authentication, and secure database connections.',
    points: ['RESTful API Design', 'JWT Authentication', 'Validation & Middleware', 'Third-party Integrations'],
  },
  {
    icon: Brain,
    title: 'AI Integrations',
    description:
      'Connecting web apps with AI APIs (like OpenAI) for automated document parsing, resume analysis, and smart search.',
    points: ['OpenAI API Integration', 'Document Parsing', 'Workflow Automation', 'Prompt Handling'],
  },
  {
    icon: BarChart3,
    title: 'ERP & Business Systems',
    description:
      'Custom management software including HR modules, automated payroll calculations, attendance tracking, and reporting.',
    points: ['HR & Payroll Systems', 'QR Attendance', 'PDF Payslip Generation', 'Admin Dashboards'],
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description:
      'Relational and document database design, schema modeling, and query optimization for reliable data management.',
    points: ['MongoDB & Mongoose', 'PostgreSQL', 'Supabase', 'Prisma ORM'],
  },
  {
    icon: Monitor,
    title: 'Desktop Applications',
    description:
      'Cross-platform desktop tools built with Electron and React, featuring local SQLite storage and offline-first capabilities.',
    points: ['Electron & React', 'SQLite / Offline Support', 'Thermal Printer Setup', 'Windows & macOS'],
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

function ServiceCard({ icon: Icon, title, description, points, delay }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <article
        className="group bg-white rounded-2xl border border-zinc-200/90 p-5 md:p-6 h-full flex flex-col
          hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300
          transition-all duration-200 cursor-default"
      >
        <div
          className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/50 flex items-center justify-center mb-5 shrink-0 text-brand"
          aria-hidden="true"
        >
          <Icon size={20} />
        </div>

        <h3 className="font-bold text-zinc-900 text-base mb-2 leading-snug">
          {title}
        </h3>

        <p className="text-zinc-600 text-sm leading-relaxed mb-5 flex-1">
          {description}
        </p>

        <ul className="flex flex-col gap-2 pt-3 border-t border-zinc-100 mt-auto" role="list">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs text-zinc-600">
              <span
                className="w-1.5 h-1.5 bg-brand rounded-full shrink-0"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      </article>
    </FadeIn>
  )
}

export default function Services() {
  const handleScrollToContact = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <FadeIn>
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-dark uppercase mb-3">
              SERVICES
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              What I Do
            </h2>
            <p className="text-zinc-600 text-base max-w-[60ch] mb-12">
              From user interfaces to backend APIs and databases, here are the core services I provide.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, title, description, points }, i) => (
            <ServiceCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              points={points}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* CTA Row below services */}
        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 md:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                Have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-all shadow-sm shadow-brand/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand shrink-0"
            >
              <span>Get in touch</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
