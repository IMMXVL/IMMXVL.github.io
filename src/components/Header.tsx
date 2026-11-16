import { useEffect, useRef, useState } from 'react'
import type { Theme } from '../hooks/useTheme'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons'

type HeaderProps = {
  name: string
  sections: readonly { id: string; label: string }[]
  activeId: string | null
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ name, sections, activeId, theme, onToggleTheme }: HeaderProps) {
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
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true">
            {initials}
          </span>
          <span className="brand__name">{name}</span>
        </a>

        <nav aria-label="Main" className="site-nav" data-open={menuOpen}>
          <ul id="site-nav-list" className="site-nav__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={activeId === section.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-nav-list"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
