import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  // Clear any leftover hash (e.g., #skills) to ensure a clean landing page URL
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-brand selection:text-white">
      {/* Skip link — visible on focus for keyboard accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]
          focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand focus:text-white focus:text-sm focus:font-semibold
          focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}