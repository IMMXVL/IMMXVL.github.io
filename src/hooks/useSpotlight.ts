import { useEffect } from 'react'
import { matchesMedia, prefersReducedMotion } from './media'

// Moves the card glow with the cursor. Touch and reduced motion keep the static card.
export function useSpotlight() {
  useEffect(() => {
    if (prefersReducedMotion() || !matchesMedia('(pointer: fine)')) return

    const onMove = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const card = target.closest<HTMLElement>('.spot')
      if (!card) return

      const rect = card.getBoundingClientRect()
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    document.addEventListener('pointermove', onMove)
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}
