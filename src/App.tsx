import { useEffect, useMemo, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
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
import { useSpotlight } from './hooks/useSpotlight'
import { useTheme } from './hooks/useTheme'
import { createAppTheme } from './theme'

const currentYear = new Date().getFullYear()

const sections = [
  { id: 'top', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Selected work' },
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
        height: 3,
        bgcolor: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={barRef}
        sx={{
          height: '100%',
          width: '100%',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          background: (theme) =>
            `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      />
    </Box>
  )
}

const App = () => {
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(sectionIds)
  const muiTheme = useMemo(() => createAppTheme(theme), [theme])
  useReveal()
  useSpotlight()

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ScrollProgress />
      <Box
        component="a"
        className="skip-link"
        href="#main"
      >
        Skip to content
      </Box>

      <Header
        name={profile.name}
        sections={sections}
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Box component="main" id="main">
        <Hero />
        <Experience />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </Box>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ justifyContent: 'space-between', gap: 1 }}
          >
            <Typography variant="body2" sx={{ color: 'text.subtle' }}>
              © {currentYear} {profile.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.subtle' }}>
              Built with React, TypeScript and Material UI
            </Typography>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
