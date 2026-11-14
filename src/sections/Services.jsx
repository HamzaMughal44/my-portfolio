import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Layout, Server, BarChart3, Monitor, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const services = [
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'End-to-end full stack web applications built with modern frameworks, tailored to business needs with high performance and reliability.',
    points: ['Full Stack Architecture', 'Responsive Design', 'API Integration', 'Performance & SEO'],
  },
  {
    icon: Layout,
    title: 'Frontend Development',
    description:
      'Clean, accessible, and high-performance user interfaces crafted with React, Next.js, and modern CSS tooling.',
    points: ['React & Next.js', 'Tailwind CSS', 'State Management', 'Component Architecture'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Robust backend services and REST APIs with secure authentication, request validation, and database operations.',
    points: ['Node.js & Express', 'RESTful API Design', 'JWT Authentication', 'Validation & Middleware'],
  },
  {
    icon: BarChart3,
    title: 'ERP & Business Applications',
    description:
      'Custom management software including HR workflows, payroll calculations, QR-based attendance, and automated reporting.',
    points: ['HR & Payroll Systems', 'QR-Code Attendance', 'PDF Report Generation', 'Role-Based Access'],
  },
  {
    icon: Monitor,
    title: 'Desktop Application Development',
    description:
      'Cross-platform desktop tools built with Electron and React, featuring local SQLite storage and offline-first capabilities.',
    points: ['Electron & React', 'SQLite / Offline Support', 'Thermal Printer Setup', 'Windows & Cross-Platform'],
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
        className="group bg-[var(--surface)] rounded-[8px] border border-[var(--border)] p-5 md:p-6 h-full flex flex-col
          hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_8px_24px_-4px_rgba(255,90,0,0.12)] shadow-[var(--card-shadow)]
          transition-all duration-300 cursor-default"
      >
        <div
          className="w-10 h-10 rounded-[6px] bg-brand/10 border border-brand/20 flex items-center justify-center mb-5 shrink-0 text-brand"
          aria-hidden="true"
        >
          <Icon size={20} />
        </div>

        <h3 className="font-bold text-[var(--text)] text-base mb-2 leading-snug group-hover:text-brand transition-colors">
          {title}
        </h3>

        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 flex-1">
          {description}
        </p>

        <ul className="flex flex-col gap-2 pt-3 border-t border-[var(--border)] mt-auto" role="list">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
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
    <section id="services" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-[var(--bg)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

        <FadeIn>
          <SectionHeader
            label="SERVICES"
            title="What I Do"
            description="From user interfaces to backend APIs and business applications, here are the core services I provide."
          />
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
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 md:p-6 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--card-shadow)]">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">
                Have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-brand hover:bg-brand-dark text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer shrink-0"
            >
              <span>Get in touch</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
