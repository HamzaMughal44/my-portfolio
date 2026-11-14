import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiPrisma,
  SiGit, SiDocker, SiFirebase, SiElectron, SiRedux, SiSupabase,
} from 'react-icons/si'
import SectionHeader from '../components/SectionHeader'
import { useTheme } from '../context/ThemeContext'

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
  const { theme } = useTheme()
  const darkOrLight = theme === 'dark' ? '#FFFFFF' : '#111827'

  const skillGroups = [
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React',        icon: SiReact,       color: '#61DAFB' },
        { name: 'Next.js',      icon: SiNextdotjs,   color: darkOrLight },
        { name: 'TypeScript',   icon: SiTypescript,  color: '#3178C6' },
        { name: 'JavaScript',   icon: SiJavascript,  color: '#F7DF1E' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Redux',        icon: SiRedux,       color: '#9353D3' },
      ],
    },
    {
      category: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
        { name: 'Express', icon: SiExpress,   color: darkOrLight },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'Supabase',   icon: SiSupabase,   color: '#3ECF8E' },
        { name: 'Prisma',     icon: SiPrisma,     color: darkOrLight },
        { name: 'Firebase',   icon: SiFirebase,   color: '#FFA611' },
      ],
    },
    {
      category: 'Tools & Technologies',
      skills: [
        { name: 'Git',      icon: SiGit,      color: '#F05032' },
        { name: 'Docker',   icon: SiDocker,   color: '#2496ED' },
        { name: 'Electron', icon: SiElectron, color: '#29B6F6' },
      ],
    },
  ]

  return (
    <section id="skills" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-[var(--bg)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="SKILLS"
            title="Tools I work with"
            className="mb-10"
          />
        </FadeIn>

        <div className="flex flex-col gap-6">
          {skillGroups.map(({ category, skills }, gi) => (
            <FadeIn key={category} delay={gi * 0.08}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                <div className="sm:w-48 shrink-0 pt-1.5">
                  <h3 className="text-xs font-semibold tracking-widest text-[var(--text-dim)] uppercase">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map(({ name, icon: Icon, color }) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border)]
                        text-sm text-[var(--text)] font-medium hover:-translate-y-0.5 hover:border-brand/60 hover:bg-[var(--surface-2)]
                        hover:shadow-[0_4px_12px_-2px_rgba(255,90,0,0.12)]
                        transition-all duration-200 cursor-default shadow-[var(--card-shadow)]"
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
