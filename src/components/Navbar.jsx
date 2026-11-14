import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

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
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

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
      <div
        className={`w-full h-16 px-4 sm:px-6 rounded-[8px] transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? 'bg-[var(--nav-bg)] border-[var(--nav-border)] shadow-[var(--nav-shadow)]'
            : 'bg-[var(--nav-bg)] border-[var(--nav-border)] shadow-[var(--nav-shadow)]'
        }`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-semibold text-[20px] tracking-tight text-[var(--text)] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[6px]"
          aria-label="Hamza Home"
        >
          Hamza
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <LayoutGroup id="themeTopNav">
            <nav className="flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map(({ label, id }) => {
                const active = activeSection === id
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-3 lg:px-4 py-2 text-[15px] font-medium rounded-[6px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeThemeNavPill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[6px] bg-brand -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    {label}
                  </a>
                )
              })}
            </nav>
          </LayoutGroup>

          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="p-2 ml-2 rounded-[6px] text-[var(--text-muted)] hover:text-brand hover:bg-[var(--surface-2)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="p-2 rounded-[6px] text-[var(--text-muted)] hover:text-brand hover:bg-[var(--surface-2)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            className="p-2 rounded-[6px] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="md:hidden p-2.5 rounded-[8px] border border-[var(--border)] bg-[var(--nav-bg)] shadow-[var(--nav-shadow)] overflow-hidden mt-2"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-[6px] text-[15px] font-medium transition-colors duration-150 ${
                        active
                          ? 'bg-brand text-white font-semibold'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
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
