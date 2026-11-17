import { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
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
import { mono } from '../theme'

type HeaderProps = {
  name: string
  sections: readonly { id: string; label: string }[]
  activeId: string | null
  theme: Theme
  onToggleTheme: () => void
  onOpenCommand: () => void
}

const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export const Header = ({ name, sections, activeId, theme, onToggleTheme, onOpenCommand }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mac] = useState(isMac)
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
        bgcolor: (mui) => alpha(mui.palette.background.default, 0.78),
        backdropFilter: 'saturate(180%) blur(14px)',
        borderBottom: 1,
        borderColor: 'divider',
        color: 'text.primary',
        overflow: 'visible',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 60, sm: 64 } }}>
          <ButtonBase
            component="a"
            href="#top"
            sx={{ gap: 1.25, borderRadius: 1.5, py: 0.5, pr: 1, fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 28,
                height: 28,
                borderRadius: '8px',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'text.primary',
                color: 'background.default',
                fontFamily: mono,
                fontSize: '0.72rem',
                fontWeight: 600,
              }}
            >
              {initials}
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {name}
            </Box>
          </ButtonBase>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box component="nav" aria-label="Main" id="site-nav" className="site-nav">
              {sections.map((section) => {
                const active = activeId === section.id
                return (
                  <ButtonBase
                    key={section.id}
                    component="a"
                    href={`#${section.id}`}
                    aria-current={active ? 'true' : undefined}
                    sx={{
                      gap: 0.75,
                      px: 1.25,
                      py: 0.75,
                      borderRadius: 1.5,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: active ? 'text.primary' : 'text.secondary',
                      transition: 'color .2s',
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        transform: active ? 'scale(1)' : 'scale(0)',
                        transition: 'transform .3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    {section.label}
                  </ButtonBase>
                )
              })}
            </Box>

            <Button
              variant="outlined"
              onClick={onOpenCommand}
              aria-label="Open command menu"
              aria-keyshortcuts={mac ? 'Meta+K' : 'Control+K'}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                ml: 1,
                minHeight: 34,
                px: 1.25,
                gap: 1,
                color: 'text.secondary',
                fontSize: '0.8rem',
              }}
            >
              Search
              <Box
                component="kbd"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.7rem',
                  px: 0.75,
                  py: 0.15,
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider',
                  color: 'text.subtle',
                }}
              >
                {mac ? '⌘K' : 'Ctrl K'}
              </Box>
            </Button>

            <IconButton
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              color="inherit"
              size="small"
              sx={{ width: 36, height: 36 }}
            >
              {theme === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
            </IconButton>
            <IconButton
              ref={menuButtonRef}
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              color="inherit"
              sx={{ width: 40, height: 40 }}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Box className="menu-icon" data-open={menuOpen ? 'true' : 'false'}>
                <MenuIcon className="menu-icon__open" />
                <CloseIcon className="menu-icon__close" />
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Collapse in={menuOpen} timeout={350} unmountOnExit className="mobile-nav">
        <Box
          component="nav"
          id="mobile-nav"
          aria-label="Main"
          sx={{
            bgcolor: 'background.default',
            borderBottom: 1,
            borderColor: 'divider',
            boxShadow: '0 24px 48px rgb(0 0 0 / 0.25)',
            py: 1,
          }}
        >
          {sections.map((section, index) => {
            const active = activeId === section.id
            return (
              <ButtonBase
                key={section.id}
                component="a"
                href={`#${section.id}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  gap: 2,
                  px: 3,
                  py: 1.5,
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  color: active ? 'text.primary' : 'text.secondary',
                  borderLeft: '2px solid',
                  borderLeftColor: active ? 'primary.main' : 'transparent',
                }}
              >
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: 0,
                    color: active ? 'primary.main' : 'text.subtle',
                  }}
                >
                  {String(index).padStart(2, '0')}
                </Box>
                {section.label}
              </ButtonBase>
            )
          })}
        </Box>
      </Collapse>
    </AppBar>
  )
}
