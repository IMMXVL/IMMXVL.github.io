import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { prefersReducedMotion } from './media'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

// Dark is the default. The inline script in index.html sets the same value before first paint.
function readInitialTheme(): Theme {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage can be unavailable in private mode. The theme still works for this visit.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      setTheme(next)
    }

    if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
      apply()
      return
    }

    document.startViewTransition(() => {
      flushSync(apply)
    })
  }, [theme])

  return { theme, toggleTheme }
}
