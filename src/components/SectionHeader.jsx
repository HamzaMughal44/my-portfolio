export default function SectionHeader({ label, title, description, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[2px] bg-brand inline-block shrink-0" aria-hidden="true" />
          <p className="text-xs font-bold tracking-widest text-brand uppercase">
            {label}
          </p>
        </div>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight mb-4 text-balance">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-[var(--text-muted)] text-base max-w-[60ch] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
