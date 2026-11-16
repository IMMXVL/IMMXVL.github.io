import { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { alpha } from '@mui/material/styles'
import type { Theme } from '../hooks/useTheme'

type HeaderProps = {
  name: string
  sections: readonly { id: string; label: string }[]
  activeId: string | null
  theme: Theme
  onToggleTheme: () => void
}

const NavLink = ({
  id,
  label,
  active,
  menu,
  onNavigate,
}: {
  id: string
  label: string
  active: boolean
  menu?: boolean
  onNavigate: () => void
}) => (
  <Button
    component="a"
    href={`#${id}`}
    color="inherit"
    aria-current={active ? 'true' : undefined}
    onClick={onNavigate}
    sx={(mui) =>
      menu
        ? {
            width: '100%',
            justifyContent: 'flex-start',
            px: 2,
            py: 1.25,
            '&.MuiButton-root': { borderRadius: 0, border: 'none', boxShadow: 'none' },
            color: active ? 'text.primary' : 'text.secondary',
            bgcolor: active ? alpha(mui.palette.primary.main, 0.16) : 'transparent',
          }
        : {
            color: active ? 'text.primary' : 'text.secondary',
            bgcolor: active ? 'action.hover' : 'transparent',
          }
    }
  >
    {label}
  </Button>
)

export const Header = ({ name, sections, activeId, theme, onToggleTheme }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: (mui) => alpha(mui.palette.background.default, 0.82),
        backdropFilter: 'blur(16px)',
        borderBottom: 1,
        borderColor: 'divider',
        color: 'text.primary',
        overflow: 'visible',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: 68 }}>
          <Button
            component="a"
            href="#top"
            color="inherit"
            sx={{ px: 1, fontWeight: 700, fontSize: '1rem' }}
          >
            <Box
              aria-hidden="true"
              sx={{
                mr: '0.65rem',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                background: (mui) =>
                  `linear-gradient(120deg, ${mui.palette.primary.main}, ${mui.palette.secondary.main})`,
                color: (mui) => (mui.palette.mode === 'dark' ? '#0a0b10' : '#ffffff'),
                fontFamily: "'Space Grotesk Variable', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              {initials}
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {name}
            </Box>
          </Button>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box component="nav" aria-label="Main" id="site-nav" className="site-nav">
              {sections.map((section) => (
                <NavLink
                  key={section.id}
                  id={section.id}
                  label={section.label}
                  active={activeId === section.id}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                color="inherit"
              >
                {theme === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
              <IconButton
                ref={menuButtonRef}
                className="menu-button"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                color="inherit"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <Box className="menu-icon" data-open={menuOpen ? 'true' : 'false'}>
                  <MenuIcon className="menu-icon__open" />
                  <CloseIcon className="menu-icon__close" />
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      <Collapse in={menuOpen} timeout={320} unmountOnExit className="mobile-nav">
        <Box
          component="nav"
          id="mobile-nav"
          aria-label="Main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.25,
            width: '100%',
            px: 0,
            pt: 1,
            pb: 1.5,
            bgcolor: 'background.default',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          {sections.map((section) => (
            <NavLink
              key={section.id}
              id={section.id}
              label={section.label}
              active={activeId === section.id}
              menu
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </Box>
      </Collapse>
    </AppBar>
  )
}
