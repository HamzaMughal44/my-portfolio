import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'

const socials = [
  {
    icon: FaGithub,
    href: 'https://github.com/HamzaMughal44',
    label: 'GitHub',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/hamza-mughal-web-developer/',
    label: 'LinkedIn',
  },
  {
    icon: FaFacebookF,
    href: 'https://www.facebook.com/profile.php?id=100088784993848',
    label: 'Facebook',
  },
  {
    icon: Mail,
    href: 'mailto:hamzakhankh416@gmail.com',
    label: 'Email',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-2xl mx-auto px-6 md:px-8 pt-12 pb-10 flex flex-col items-center text-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-[0.12em] mb-3">
          Find Me On
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-500 text-sm mb-8">
          Feel free to{' '}
          <span className="text-brand font-medium">connect</span>
          {' '}with me
        </p>

        {/* Social icon circles */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center
                text-zinc-500 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-dark hover:bg-brand-50
                transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="w-full border-t border-zinc-200 pt-6">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Hamza Mughal. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
