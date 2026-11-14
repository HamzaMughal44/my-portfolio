import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import {
  Mail, Send, CheckCircle, AlertCircle, ArrowUpRight,
} from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import SectionHeader from '../components/SectionHeader'

// ── Helpers ───────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

// ── Data ──────────────────────────────────────────────────────────────────────

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hamzakhankh416@gmail.com',
    href: 'mailto:hamzakhankh416@gmail.com',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'hamza-mughal-web-developer',
    href: 'https://www.linkedin.com/in/hamza-mughal-web-developer/',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'HamzaMughal44',
    href: 'https://github.com/HamzaMughal44',
  },
]

// ── Input styling ─────────────────────────────────────────────────────────────

const inputBase =
  'w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[8px] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-dim)] outline-none transition-all focus:bg-[var(--surface)] focus:border-brand focus:ring-2 focus:ring-brand/25 hover:border-brand/40'
const inputError =
  'w-full bg-[var(--surface-2)] border border-red-500 rounded-[8px] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-dim)] outline-none transition-all focus:bg-[var(--surface)] focus:ring-2 focus:ring-red-500/25 focus:border-red-500'

const inputClass = (hasError) => (hasError ? inputError : inputBase)

// ── Merged Contact Card ───────────────────────────────────────────────────────

function UnifiedContactCard({ className = '' }) {
  return (
    <div className={`rounded-[8px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--card-shadow)] divide-y divide-[var(--border)] overflow-hidden flex flex-col ${className}`}>
      {contactLinks.map(({ icon: Icon, label, value, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={`${label}: ${value}`}
          className="group flex-1 flex items-center gap-3.5 sm:gap-4 p-4.5 sm:p-5 hover:bg-[var(--surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div
            aria-hidden="true"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-[6px] bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-150"
          >
            <Icon size={18} />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-0.5">
              {label}
            </p>
            <p className="text-sm font-semibold text-[var(--text)] truncate group-hover:text-brand transition-colors duration-150">
              {value}
            </p>
          </div>

          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="text-[var(--text-dim)] group-hover:text-brand shrink-0 transition-colors duration-150"
          />
        </a>
      ))}
    </div>
  )
}

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-12 text-center gap-4 h-full"
    >
      <div className="w-14 h-14 rounded-[8px] bg-brand/10 border border-brand/30 flex items-center justify-center">
        <CheckCircle size={28} className="text-brand" />
      </div>
      <div>
        <h3 className="font-bold text-[var(--text)] text-lg mb-1">Message sent!</h3>
        <p className="text-[var(--text-muted)] text-sm max-w-xs">
          Thanks for reaching out. I'll get back to you shortly.
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-xs font-semibold px-4 py-2 rounded-[6px] bg-[var(--surface-2)] hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] transition-colors mt-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        Send another message
      </button>
    </motion.div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 text-white"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

// ── Contact form ──────────────────────────────────────────────────────────────

function ContactForm() {
  const [submitState, setSubmitState] = useState('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (data._hp) { setSubmitState('success'); return } // honeypot spam guard
    setSubmitState('loading')
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: serverTimestamp(),
      })
      setSubmitState('success')
      reset()
    } catch (err) {
      console.error('Contact form submission error:', err)
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return <SuccessState onReset={() => setSubmitState('idle')} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col h-full gap-5">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
        {...register('_hp')}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5"
          >
            Name <span className="text-brand">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name', { required: 'Name is required' })}
            className={inputClass(errors.name)}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5"
          >
            Email <span className="text-brand">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col flex-1">
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5"
        >
          Message <span className="text-brand">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Write your message here..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Please write at least 10 characters' },
          })}
          className={`${inputClass(errors.message)} resize-none flex-1 min-h-[110px]`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error banner */}
      {submitState === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 rounded-[8px] bg-red-500/10 border border-red-500/30 text-red-500 text-xs"
        >
          <AlertCircle size={16} className="shrink-0 text-red-500" aria-hidden="true" />
          <span>Something went wrong with the submission. You can email me directly at <a href="mailto:hamzakhankh416@gmail.com" className="font-bold underline text-[var(--text)]">hamzakhankh416@gmail.com</a>.</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-1 mt-auto">
        <button
          type="submit"
          disabled={submitState === 'loading'}
          className="w-fit px-8 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-[6px]
            inline-flex items-center gap-2 shadow-sm
            disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
        >
          {submitState === 'loading' ? (
            <>
              <Spinner />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={15} aria-hidden="true" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-[var(--bg)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Header */}
        <FadeIn>
          <SectionHeader
            label="CONTACT"
            title="Get In Touch"
            description="Open to full-time opportunities. Feel free to reach out about a role, a project, or any questions."
          />
        </FadeIn>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* Left column */}
          <FadeIn delay={0.08} className="lg:col-span-2 h-full">
            <div className="h-full flex flex-col justify-between">
              <UnifiedContactCard className="flex-1" />
              <p className="text-xs text-[var(--text-dim)] font-medium px-1 pt-3.5 select-none">
                Quetta, Pakistan · PKT (UTC+5)
              </p>
            </div>
          </FadeIn>

          {/* Right column */}
          <FadeIn delay={0.14} className="lg:col-span-3 h-full">
            <div className="bg-[var(--surface)] rounded-[8px] border border-[var(--border)] shadow-[var(--card-shadow)] p-5 md:p-6 h-full flex flex-col">
              <ContactForm />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
