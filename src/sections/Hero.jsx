import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

// ── Typed text (Rotating titles) ──────────────────────────────────────────────
function TypingText() {
  const el = useRef(null)
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'MERN Stack Developer',
        'Software Developer',
        'Building Digital Products',
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 2200,
      startDelay: 400,
      showCursor: true,
      cursorChar: '|',
      contentType: 'null',
      loop: true,
    })
    return () => typed.destroy()
  }, [])
  return <span ref={el} />
}

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const photoEntrance = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[var(--bg)] transition-colors duration-200"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* ── LEFT COLUMN: Text block ── */}
        <div className="lg:col-span-7 flex flex-col justify-center self-center py-4 sm:py-6 lg:py-8 z-20">

          {/* Accent Tag: Hello, I'm with downward triangle tail */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.02}
            className="relative inline-block mb-3.5 self-start"
          >
            <span className="inline-flex items-center px-3 py-1 bg-brand text-white text-xs font-semibold rounded-[4px] tracking-wide shadow-xs">
              Hello, I'm
            </span>
            <span
              className="absolute left-4 top-full w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-brand"
              aria-hidden="true"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.06}
            className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.12] tracking-tight text-[var(--text)] mb-2.5 text-left"
          >
            Hamza Mughal
          </motion.h1>

          {/* Typed Role Line */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.10}
            className="text-xl sm:text-3xl font-semibold text-brand mb-6 text-left min-h-[36px] flex items-center"
          >
            <TypingText />
          </motion.div>

          {/* Bio Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.14}
            className="text-[var(--text-muted)] text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-[500px] text-left"
          >
            I build scalable, high-performance web applications with React, Next.js, and Node.js.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.18}
            className="flex flex-wrap items-center gap-3 sm:gap-4 self-start"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-[6px]
                bg-brand hover:bg-brand-dark
                text-white font-semibold text-sm active:scale-[0.98] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-[6px] border border-[var(--border)]
                text-[var(--text)] font-semibold text-sm hover:border-brand hover:text-brand hover:bg-[var(--surface-2)]
                active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
            >
              Contact Me
            </a>
          </motion.div>

        </div>

        {/* ── RIGHT COLUMN: Anchored Photo with Multi-Directional Feather Mask ── */}
        <motion.div
          variants={photoEntrance}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex justify-center lg:justify-end self-center justify-self-end relative z-10 w-full mt-4 lg:mt-0"
        >
          <div className="relative flex flex-col items-center lg:items-end w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px]">

            <div
              className="relative z-[2] flex items-end justify-center lg:justify-end w-full overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                maskComposite: 'intersect',
              }}
            >
              <img
                src="/hamza-cutout.png"
                alt="Hamza Mughal, Software Developer"
                className="h-auto max-h-[320px] sm:max-h-[360px] md:max-h-[400px] lg:max-h-[460px] xl:max-h-[480px] w-auto max-w-full object-contain object-bottom select-none"
                loading="eager"
              />

              {/* Bottom ground fade seamlessly blending into page background */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent pointer-events-none"
              />
            </div>

          </div>
        </motion.div>

      </div>

      {/* Desktop Scroll Down Indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="hidden lg:flex flex-col items-center gap-1.5 absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-xs text-[var(--text-dim)] hover:text-brand transition-colors focus:outline-none cursor-pointer"
        aria-label="Scroll to About section"
      >
        <div className="w-5 h-8 rounded-full border border-brand/50 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-brand motion-reduce:transform-none"
          />
        </div>
      </a>
    </section>
  )
}
