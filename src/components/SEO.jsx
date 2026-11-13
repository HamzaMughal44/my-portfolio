import { Helmet } from 'react-helmet-async'

export default function SEO() {
  const title = 'Hamza Portfolio'
  const description =
    'Hamza Mughal, Full Stack MERN Developer based in Quetta, Pakistan. React, Next.js, Node.js.'
  const url = typeof window !== 'undefined' ? window.location.origin : ''
  const image = `${url}/favicon.svg`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Hamza Mughal, MERN Stack Developer, Full Stack Developer, React, Next.js, Node.js, Express, MongoDB, Quetta, Pakistan" />
      <meta name="author" content="Hamza Mughal" />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Technical */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#7E22CE" />
    </Helmet>
  )
}
