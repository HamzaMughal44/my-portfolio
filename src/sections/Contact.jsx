import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import {
  Mail, Send, CheckCircle, AlertCircle, ArrowUpRight,
} from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

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
  'w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-brand focus:border-brand hover:border-zinc-300'
const inputError =
  'w-full bg-zinc-50 border border-red-400 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-red-400 focus:border-transparent'

const inputClass = (hasError) => (hasError ? inputError : inputBase)

// ── Merged Contact Card (3 compact rows in 1 card) ───────────────────────────

function UnifiedContactCard({ className = '' }) {
  return (
    <div className={`rounded-2xl border border-zinc-200/90 bg-white shadow-xs divide-y divide-zinc-100 overflow-hidden flex flex-col ${className}`}>
      {contactLinks.map(({ icon: Icon, label, value, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={`${label}: ${value}`}
          className="group flex-1 flex items-center gap-3.5 sm:gap-4 p-4.5 sm:p-5 hover:bg-zinc-50/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div
            aria-hidden="true"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-50 border border-brand-200/50 flex items-center justify-center shrink-0 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-200"
          >
            <Icon size={18} />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
              {label}
            </p>
            <p className="text-sm font-semibold text-zinc-800 truncate group-hover:text-brand-dark transition-colors duration-200">
              {value}
            </p>
          </div>

          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="text-zinc-400 group-hover:text-brand shrink-0 transition-colors duration-200"
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
      <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center">
        <CheckCircle size={26} className="text-brand" />
      </div>
      <div>
        <h3 className="font-bold text-zinc-900 text-lg mb-1">Message sent!</h3>
        <p className="text-zinc-600 text-sm max-w-xs">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-xs font-semibold px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors mt-2"
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
  const [submitState, setSubmitState] = useState('idle') // idle | loading | success | error
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
      {/* Honeypot — hidden from real users */}
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
            className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
          >
            Name <span className="text-brand-dark">*</span>
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
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
          >
            Email <span className="text-brand-dark">*</span>
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
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Message (flex-1 to stretch vertically in equal-height container) */}
      <div className="flex flex-col flex-1">
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
        >
          Message <span className="text-brand-dark">*</span>
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
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error banner */}
      {submitState === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs"
        >
          <AlertCircle size={16} className="shrink-0 text-red-600" aria-hidden="true" />
          <span>Something went wrong with the submission. Your message has been retained. You can email me directly at <a href="mailto:hamzakhankh416@gmail.com" className="font-bold underline">hamzakhankh416@gmail.com</a>.</span>
        </div>
      )}

      {/* Submit Button (Pinned to bottom) */}
      <div className="pt-1 mt-auto">
        <button
          type="submit"
          disabled={submitState === 'loading'}
          className="w-fit px-8 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-full
            inline-flex items-center gap-2 shadow-sm shadow-brand/20
            disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
    <section id="contact" className="scroll-mt-[88px] py-16 md:py-20 lg:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Header */}
        <FadeIn>
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-dark uppercase mb-3">
              CONTACT
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              Get In Touch
            </h2>
            <p className="text-zinc-600 text-base max-w-[60ch] mb-12">
              Open to full-time opportunities. Feel free to reach out about a role, a project, or any questions.
            </p>
          </div>
        </FadeIn>

        {/* 2-column layout (32px gap between columns, items-stretch on desktop for equal height) */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* ── Left column: Links card first on mobile ─────────────────── */}
          <FadeIn delay={0.08} className="lg:col-span-2 h-full">
            <div className="h-full flex flex-col justify-between">
              <UnifiedContactCard className="flex-1" />
              <p className="text-xs text-zinc-400 font-medium px-1 pt-3.5 select-none">
                Quetta, Pakistan · PKT (UTC+5)
              </p>
            </div>
          </FadeIn>

          {/* ── Right column: Form card stretched to match height ──────── */}
          <FadeIn delay={0.14} className="lg:col-span-3 h-full">
            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-5 md:p-6 h-full flex flex-col">
              <ContactForm />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
