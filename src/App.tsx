import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import { profile } from './data'
import { useActiveSection } from './hooks/useActiveSection'
import { useReveal } from './hooks/useReveal'
import { useTheme } from './hooks/useTheme'

const currentYear = new Date().getFullYear()

const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Selected work' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

const sectionIds = sections.map((section) => section.id)

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(sectionIds)
  useReveal()

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        name={profile.name}
        sections={sections}
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="main">
        <Hero />
        <Experience />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>
            © {currentYear} {profile.name}
          </p>
          <p>Built with React, TypeScript and Vite</p>
        </div>
      </footer>
    </>
  )
}
