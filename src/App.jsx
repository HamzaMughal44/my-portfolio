import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import SEO from './components/SEO'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Services from './sections/Services'
import Contact from './sections/Contact'

export default function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Services />
        <Contact />
      </Layout>
    </HelmetProvider>
  )
}
