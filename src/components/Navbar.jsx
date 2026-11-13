import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Services',   id: 'services' },
  { label: 'Contact',    id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Clear any lingering URL hash on load to keep URL clean (landing page)
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  // Scrollspy: track active section accurately
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact')
        return
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-6 md:px-8 pointer-events-auto">
      {/* ── Floating Rounded Glassy Pill Bar (Height: 64px, Top offset: 16px, 1152px grid) ── */}
      <div
        className={`w-full h-16 px-6 rounded-full transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? 'bg-white/85 border-zinc-300/80 shadow-[0_14px_40px_-5px_rgba(0,0,0,0.10),inset_0_1px_0_0_rgba(255,255,255,1)]'
            : 'bg-white/70 border-zinc-200/80 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)]'
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* Brand: 20px, font-semibold */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-semibold text-[20px] tracking-tight text-brand select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full"
          aria-label="Hamza Home"
        >
          Hamza
        </a>

        {/* Desktop Navigation Links: 15px, font-medium, 8px 14px padding, 4px gap */}
        <LayoutGroup id="glassyTopNav">
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map(({ label, id }) => {
              const active = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-2.5 lg:px-[14px] py-2 text-[15px] font-medium rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    active
                      ? 'text-brand-dark'
                      : 'text-zinc-600 hover:text-brand-dark hover:bg-zinc-100/60'
                  }`}
                >
                  {/* Glassy active indicator pill */}
                  {active && (
                    <motion.span
                      layoutId="activeGlassyNavPill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-brand-50 -z-10 border border-brand-200 shadow-2xs"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  {label}
                </a>
              )
            })}
          </nav>
        </LayoutGroup>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Glassy Dropdown Menu ────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden p-3 rounded-3xl border border-zinc-200/80 shadow-[0_12px_36px_0_rgba(0,0,0,0.12)] overflow-hidden mt-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ label, id }) => {
                const active = activeSection === id
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleNavClick(e, id)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-[15px] font-medium transition-colors duration-150 ${
                        active
                          ? 'bg-brand-50 text-brand-dark'
                          : 'text-zinc-600 hover:text-brand-dark hover:bg-zinc-100/70'
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-dark shrink-0" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
