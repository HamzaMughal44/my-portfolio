import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import SectionHeader from '../components/SectionHeader'

const projects = [
  {
    type: 'AI · SaaS',
    name: 'HireAI — AI Recruitment Platform',
    image: '/projects/hireai.png',
    description:
      'AI-powered recruitment web app that parses resumes, scores candidates against job requirements, and provides an interview management pipeline for hiring teams.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
    github: null,
    demo: null,
    isPrivate: true,
    featured: true,
  },
  {
    type: 'ERP · Business',
    name: 'ERP System — HR & Payroll',
    image: '/projects/erp.png',
    description:
      'HR and payroll management system featuring QR-code attendance, role-based access control, and automated PDF salary slip generation.',
    stack: ['React', 'Node.js', 'MongoDB', 'Prisma', 'Puppeteer'],
    github: null,
    demo: null,
    isPrivate: true,
  },
  {
    type: 'Web App · Full Stack',
    name: 'Job Portal',
    image: '/projects/jobportal.png',
    description:
      'Full-stack job board with dedicated candidate and employer portals, full-text job search, and automated email notifications for application updates.',
    stack: ['React', 'Node.js', 'MongoDB', 'NodeMailer'],
    github: 'https://github.com/HamzaMughal44/job-portal',
    demo: null,
    isPrivate: false,
  },
  {
    type: 'Real-time · Web App',
    name: 'Attendance System',
    image: '/projects/attendance.png',
    description:
      'QR attendance tracker with auto-refreshing dynamic codes to prevent proxy check-ins, real-time Socket.io status updates, and Excel report exports.',
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/HamzaMughal44/attendance-system',
    demo: null,
    isPrivate: false,
  },
  {
    type: 'Desktop · Electron',
    name: 'RMS — Desktop POS',
    image: '/projects/rms.png',
    description:
      'Desktop point-of-sale software for restaurants. Built offline-first with SQLite, automatic cloud synchronization, and thermal receipt printer support.',
    stack: ['Electron', 'React', 'SQLite', 'PostgreSQL'],
    github: null,
    demo: null,
    isPrivate: true,
  },
]

function ProjectMedia({ src, alt, type, featured }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-2)] border-b border-[var(--border)] shrink-0">
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-[var(--surface-2)] flex items-center justify-center p-4">
          <span className="text-xs font-mono font-semibold text-[var(--text-dim)] select-none">
            {type}
          </span>
        </div>
      )}

      {/* Small Category Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-[var(--surface)]/95 text-brand border border-brand/30 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-[4px] shadow-sm backdrop-blur-xs">
          {type}
        </span>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-brand text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-[4px] shadow-sm">
            FEATURED
          </span>
        </div>
      )}
    </div>
  )
}

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

function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * 0.06} className="h-full">
      <article className="group bg-[var(--surface)] rounded-[8px] border border-[var(--border)] h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_8px_24px_-4px_rgba(255,90,0,0.14)] shadow-[var(--card-shadow)]">
        {/* Project Thumbnail */}
        <ProjectMedia
          src={project.image}
          alt={project.name}
          type={project.type}
          featured={project.featured}
        />

        {/* Content Body */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <h3 className="font-bold text-[var(--text)] text-base leading-snug mb-2 group-hover:text-brand transition-colors">
            {project.name}
          </h3>

          <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Stack Pills */}
          <div className="mt-auto pt-2">
            <div className="flex flex-wrap items-center gap-1.5 mb-4" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-150 hover:border-brand/40 hover:text-[var(--text)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links Footer */}
            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2 text-xs">
              {project.isPrivate ? (
                <span className="inline-flex items-center gap-1.5 text-[var(--text-dim)] font-medium text-xs">
                  <Lock size={12} aria-hidden="true" />
                  Private client project
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} source on GitHub`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[var(--text)] text-xs font-semibold hover:text-brand hover:bg-[var(--surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <FaGithub size={13} aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                </div>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} live demo`}
                  className="inline-flex items-center gap-1 text-brand hover:underline font-semibold text-xs ml-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-[var(--bg)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="WORK"
            title="Selected projects"
            description="Web applications and desktop software I have built and contributed to."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
