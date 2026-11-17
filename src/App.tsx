import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { CommandMenu } from './components/CommandMenu'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { profile } from './data'
import { useActiveSection } from './hooks/useActiveSection'
import { useCopyToClipboard } from './hooks/useCopyToClipboard'
import { useReveal } from './hooks/useReveal'
import { useTheme } from './hooks/useTheme'
import { createAppTheme, mono } from './theme'

const currentYear = new Date().getFullYear()

const sections = [
  { id: 'top', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

const sectionIds = sections.map((section) => section.id)

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const value = scrollable > 0 ? window.scrollY / scrollable : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${value})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        height: 2,
        pointerEvents: 'none',
      }}
    >
      <Box
        ref={barRef}
        sx={{
          height: '100%',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          bgcolor: 'primary.main',
        }}
      />
    </Box>
  )
}

const Toast = ({ show, children }: { show: boolean; children: string }) => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'fixed',
      left: '50%',
      bottom: 24,
      zIndex: 1600,
      px: 2,
      py: 1.25,
      borderRadius: 999,
      bgcolor: 'text.primary',
      color: 'background.default',
      fontFamily: mono,
      fontSize: '0.8rem',
      pointerEvents: 'none',
      transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 140%)',
      opacity: show ? 1 : 0,
      transition: 'transform .45s cubic-bezier(0.16, 1, 0.3, 1), opacity .3s',
    }}
  >
    {children}
  </Box>
)

const App = () => {
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(sectionIds)
  const muiTheme = useMemo(() => createAppTheme(theme), [theme])
  const { copied, copy } = useCopyToClipboard()
  const [commandOpen, setCommandOpen] = useState(false)
  useReveal()

  const copyEmail = useCallback(() => {
    void copy(profile.email)
  }, [copy])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ScrollProgress />
      <Box component="a" className="skip-link" href="#main">
        Skip to content
      </Box>

      <Header
        name={profile.name}
        sections={sections}
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <Box component="main" id="main">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact copied={copied} onCopy={copyEmail} />
      </Box>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 2.5 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1.5,
            fontFamily: mono,
            fontSize: '0.75rem',
            color: 'text.subtle',
          }}
        >
          <Typography component="span" sx={{ font: 'inherit' }}>
            © {currentYear} {profile.name}
          </Typography>
          <Typography component="span" sx={{ font: 'inherit' }}>
            Built with React, TypeScript and Material UI
          </Typography>
          <Link href="#top" underline="hover" sx={{ font: 'inherit', color: 'text.secondary' }}>
            Back to top ↑
          </Link>
        </Container>
      </Box>

      <CommandMenu
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        sections={sections}
        theme={theme}
        onToggleTheme={toggleTheme}
        onCopyEmail={copyEmail}
      />
      <Toast show={copied}>Email copied to clipboard</Toast>
    </ThemeProvider>
  )
}

export default App
