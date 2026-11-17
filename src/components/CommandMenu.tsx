import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import SearchIcon from '@mui/icons-material/Search'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { profile } from '../data'
import type { Theme } from '../hooks/useTheme'
import { mono } from '../theme'

type Command = {
  id: string
  group: 'Navigate' | 'Actions' | 'Links'
  label: string
  icon: ReactNode
  keywords?: string
  run: () => void
}

type CommandMenuProps = {
  open: boolean
  onClose: () => void
  sections: readonly { id: string; label: string }[]
  theme: Theme
  onToggleTheme: () => void
  onCopyEmail: () => void
}

const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

const goTo = (id: string) => {
  history.replaceState(null, '', `#${id}`)
  // The dialog still locks page scroll until it unmounts, so scroll on the next frame.
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
  })
}

export const CommandMenu = ({ open, onClose, sections, theme, onToggleTheme, onCopyEmail }: CommandMenuProps) => {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const pointer = useRef({ x: -1, y: -1 })

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((section) => ({
        id: `go-${section.id}`,
        group: 'Navigate' as const,
        label: section.label,
        icon: <SubdirectoryArrowRightIcon fontSize="small" />,
        keywords: 'section go',
        run: () => goTo(section.id),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        icon: <ContentCopyIcon fontSize="small" />,
        keywords: profile.email,
        run: onCopyEmail,
      },
      {
        id: 'write-email',
        group: 'Actions',
        label: 'Write an email',
        icon: <EmailOutlinedIcon fontSize="small" />,
        keywords: 'contact mail',
        run: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
      {
        id: 'toggle-theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        icon: theme === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />,
        keywords: 'theme dark light mode',
        run: onToggleTheme,
      },
      {
        id: 'cv',
        group: 'Links',
        label: 'Download CV (PDF)',
        icon: <DownloadOutlinedIcon fontSize="small" />,
        keywords: 'resume',
        run: () => openUrl(profile.cvPath),
      },
      {
        id: 'linkedin',
        group: 'Links',
        label: 'LinkedIn',
        icon: <NorthEastIcon fontSize="small" />,
        run: () => openUrl(profile.linkedin),
      },
      {
        id: 'github',
        group: 'Links',
        label: 'GitHub',
        icon: <NorthEastIcon fontSize="small" />,
        keywords: 'code',
        run: () => openUrl(profile.github),
      },
    ],
    [sections, theme, onToggleTheme, onCopyEmail],
  )

  const normalized = query.trim().toLowerCase()
  const results = normalized
    ? commands.filter((command) =>
        `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase().includes(normalized),
      )
    : commands
  const current = Math.min(activeIndex, Math.max(results.length - 1, 0))

  const close = () => {
    onClose()
    setQuery('')
    setActiveIndex(0)
  }

  const run = (command: Command | undefined) => {
    if (!command) return
    // Run inside the key event so window.open is not blocked as a popup.
    command.run()
    close()
  }

  const resultsRef = useRef(results)
  const currentRef = useRef(current)
  const runRef = useRef(run)
  useEffect(() => {
    resultsRef.current = results
    currentRef.current = current
    runRef.current = run
  })

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.isComposing) return
      const list = resultsRef.current
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()
        if (list.length === 0) return
        const step = event.key === 'ArrowDown' ? 1 : -1
        const next = (Math.min(currentRef.current, list.length - 1) + step + list.length) % list.length
        currentRef.current = next
        setActiveIndex(next)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        runRef.current(list[currentRef.current])
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const selected = results[current]
    if (!selected) return
    document.getElementById(`command-${selected.id}`)?.scrollIntoView?.({ block: 'nearest' })
  }, [open, current, results])

  let lastGroup: string | null = null

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      aria-label="Command menu"
      sx={{
        '& .MuiDialog-container': { alignItems: 'flex-start' },
        '& .MuiDialog-paper': { mt: { xs: 2, sm: '14vh' }, mx: 2, width: 'calc(100% - 32px)', overflow: 'hidden' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, borderBottom: 1, borderColor: 'divider' }}>
        <SearchIcon fontSize="small" sx={{ color: 'text.subtle' }} />
        <InputBase
          autoFocus
          fullWidth
          value={query}
          placeholder="Type a command or search…"
          inputRef={inputRef}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
            currentRef.current = 0
          }}
          inputProps={{
            role: 'combobox',
            'aria-expanded': true,
            'aria-controls': 'command-list',
            'aria-activedescendant': results[current] ? `command-${results[current].id}` : undefined,
            'aria-label': 'Search commands',
          }}
          sx={{ py: 2, fontSize: '1rem' }}
        />
        <Box
          component="kbd"
          sx={{ fontFamily: mono, fontSize: '0.7rem', color: 'text.subtle', border: 1, borderColor: 'divider', borderRadius: 1, px: 0.75 }}
        >
          ESC
        </Box>
      </Box>

      <Box
        component="ul"
        id="command-list"
        role="listbox"
        aria-label="Commands"
        sx={{ m: 0, p: 1, listStyle: 'none', maxHeight: 'min(60vh, 420px)', overflowY: 'auto' }}
      >
        {results.length === 0 && (
          <Typography component="li" sx={{ px: 1.5, py: 3, textAlign: 'center', color: 'text.subtle' }}>
            Nothing found for “{query}”
          </Typography>
        )}
        {results.map((command, index) => {
          const showGroup = command.group !== lastGroup
          lastGroup = command.group
          const selected = index === current
          return (
            <Box component="li" key={command.id} role="presentation">
              {showGroup && (
                <Typography
                  aria-hidden="true"
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'text.subtle',
                    px: 1.5,
                    pt: index === 0 ? 1 : 2,
                    pb: 1,
                  }}
                >
                  {command.group}
                </Typography>
              )}
              <Box
                id={`command-${command.id}`}
                role="option"
                aria-selected={selected}
                onMouseMove={(event) => {
                  const moved = Math.hypot(event.clientX - pointer.current.x, event.clientY - pointer.current.y)
                  pointer.current = { x: event.clientX, y: event.clientY }
                  if (moved < 3) return
                  currentRef.current = index
                  setActiveIndex(index)
                }}
                onClick={() => run(command)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 2,
                  cursor: 'pointer',
                  color: selected ? 'text.primary' : 'text.secondary',
                  bgcolor: (mui) => (selected ? alpha(mui.palette.text.primary, 0.07) : 'transparent'),
                  '& svg': { color: selected ? 'primary.main' : 'text.subtle' },
                }}
              >
                {command.icon}
                <Box component="span" sx={{ flex: 1, fontSize: '0.95rem' }}>
                  {command.label}
                </Box>
                {selected && (
                  <Box component="span" aria-hidden="true" sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'text.subtle' }}>
                    ↵
                  </Box>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>

      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          gap: 2.5,
          px: 2.5,
          py: 1.25,
          borderTop: 1,
          borderColor: 'divider',
          fontFamily: mono,
          fontSize: '0.7rem',
          color: 'text.subtle',
        }}
      >
        <span>↑↓ navigate</span>
        <span>↵ select</span>
        <span>esc close</span>
      </Box>
    </Dialog>
  )
}
