import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

// ── Typed text ────────────────────────────────────────────────────────────────
function TypingText() {
  const el = useRef(null)
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Full Stack Developer',
        'MERN Stack Developer',
        'React & Node.js Dev',
      ],
      typeSpeed: 75,
      backSpeed: 45,
      backDelay: 2000,
      startDelay: 500,
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
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const photoEntrance = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-white"
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── LEFT COLUMN: Text & CTAs (7 Cols on desktop) ─────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.05}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-zinc-900 mb-6"
            >
              Hi, I'm{' '}
              <span className="text-brand">
                Hamza
              </span>
              <br />
              <span className="text-brand text-[0.82em] font-semibold">
                <TypingText />
              </span>
            </motion.h1>

            {/* Bio (Single concise sentence) */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.12}
              className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Full-stack developer building clean, high-performance web apps with React, Next.js, and Node.js.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.18}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full
                  bg-brand hover:bg-brand-dark
                  text-white font-semibold text-sm active:scale-[0.98] transition-all shadow-md shadow-brand/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-zinc-300
                  text-zinc-700 font-semibold text-sm hover:border-brand-200 hover:text-brand-dark hover:bg-brand-50
                  active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Contact Me
              </a>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Clean Arch Photo Container (5 Cols on desktop) ─── */}
          <motion.div
            variants={photoEntrance}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px]">

              {/* Arch container: larger presentation */}
              <div className="relative w-full aspect-[4/5] max-h-[470px] rounded-t-[150px] sm:rounded-t-[175px] lg:rounded-t-[190px] rounded-b-2xl bg-brand-50 overflow-hidden flex items-end justify-center">

                {/* Developer Photo with multiply blend mode so pure white background seamlessly merges */}
                <img
                  src="/hero.jpg"
                  alt="Hamza, MERN Stack Developer"
                  className="w-full h-full object-cover object-top mix-blend-multiply select-none"
                  loading="eager"
                />

                {/* Soft bottom edge softening */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-10 sm:h-12 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none"
                />

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
