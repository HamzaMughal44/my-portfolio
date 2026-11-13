import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiPrisma,
  SiGit, SiDocker, SiFirebase, SiElectron, SiRedux, SiSupabase,
} from 'react-icons/si'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React',        icon: SiReact,       color: '#61DAFB' },
      { name: 'Next.js',      icon: SiNextdotjs,   color: '#000000' },
      { name: 'TypeScript',   icon: SiTypescript,  color: '#3178C6' },
      { name: 'JavaScript',   icon: SiJavascript,  color: '#EAB308' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Redux',        icon: SiRedux,       color: '#764ABC' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress,   color: '#18181B' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Supabase',   icon: SiSupabase,   color: '#3ECF8E' },
      { name: 'Prisma',     icon: SiPrisma,     color: '#18181B' },
      { name: 'Firebase',   icon: SiFirebase,   color: '#F59E0B' },
    ],
  },
  {
    category: 'Tools & Other',
    skills: [
      { name: 'Git',      icon: SiGit,      color: '#F05032' },
      { name: 'Docker',   icon: SiDocker,   color: '#2496ED' },
      { name: 'Electron', icon: SiElectron, color: '#18181B' },
    ],
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

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <FadeIn>
          <div className="mb-12">
            <p className="text-xs font-bold tracking-widest text-brand-dark uppercase mb-3">
              SKILLS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              Tools I work with
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-6">
          {skillGroups.map(({ category, skills }, gi) => (
            <FadeIn key={category} delay={gi * 0.08}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                <div className="sm:w-36 shrink-0 pt-1">
                  <h3 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map(({ name, icon: Icon, color }) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-zinc-200
                        text-sm text-zinc-800 font-medium hover:border-zinc-300 hover:shadow-xs
                        transition-all duration-200 cursor-default shadow-2xs"
                    >
                      <Icon style={{ color }} className="w-4 h-4 shrink-0" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
