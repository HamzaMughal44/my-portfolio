import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

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
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-zinc-200/80 shrink-0">
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-zinc-100/90 flex items-center justify-center p-4">
          <span className="text-xs font-mono font-semibold text-zinc-400 select-none">
            {type}
          </span>
        </div>
      )}

      {/* Small Category Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-white/95 text-zinc-800 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-zinc-200/90 shadow-2xs">
          {type}
        </span>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/95 text-brand-dark text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-zinc-200/90 shadow-2xs">
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
      <article className="group bg-white rounded-2xl border border-zinc-200/90 h-full flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300">
        {/* Project Thumbnail */}
        <ProjectMedia
          src={project.image}
          alt={project.name}
          type={project.type}
          featured={project.featured}
        />

        {/* Content Body */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <h3 className="font-bold text-zinc-900 text-base leading-snug mb-2">
            {project.name}
          </h3>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Stack Pills (Pinned towards bottom) */}
          <div className="mt-auto pt-2">
            <div className="flex flex-wrap items-center gap-1.5 mb-4" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links Footer (Pinned to card bottom) */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2 text-xs">
              {project.isPrivate ? (
                <span className="inline-flex items-center gap-1.5 text-zinc-400 font-medium text-xs">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-700 text-xs font-semibold hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
                  className="inline-flex items-center gap-1 text-brand-dark hover:text-brand hover:underline font-semibold text-xs ml-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
    <section id="projects" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-zinc-50/50 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <FadeIn>
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-dark uppercase mb-3">
              WORK
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              Selected projects
            </h2>
            <p className="text-zinc-600 text-base max-w-[60ch] mb-12">
              Web applications and desktop software I have built and contributed to.
            </p>
          </div>
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
