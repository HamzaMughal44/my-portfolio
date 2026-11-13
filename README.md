# Hamza Mughal — Portfolio

Personal developer portfolio built with React, Vite, and Tailwind CSS. Features a multi-page SPA with animated sections, a Firebase-powered contact form, and SEO metadata.

## Pages

| Route | Section |
|---|---|
| `/` | Hero |
| `/about` | About + Tech Stack |
| `/projects` | Selected Projects |
| `/experience` | Work Experience |
| `/services` | Services |
| `/contact` | Contact Form |

## Tech Stack

- **React 19** + **Vite 8** — SPA with fast HMR
- **React Router v7** — client-side multi-page routing
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion v13** — scroll-triggered animations
- **Firebase Firestore** — contact form backend
- **react-hook-form** — form state + validation
- **typed.js** — hero typing animation
- **react-helmet-async** — SEO meta tags
- **lucide-react** + **react-icons** — icons

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root with your Firebase config:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Project Structure

```
src/
├── components/       # Shared components (Navbar, Footer, Layout, SEO...)
├── sections/         # Page-level sections (Hero, About, Projects...)
├── styles/           # Global CSS
└── main.jsx
public/
└── resume.pdf        # Add your resume here
```

## Deployment

Build output goes to `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages).

For Vercel/Netlify, add a rewrite rule so all routes point to `index.html` (SPA routing).
