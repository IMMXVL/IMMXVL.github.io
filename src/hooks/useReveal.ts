import { useEffect } from 'react'
import { prefersReducedMotion } from './media'

// Content stays visible unless the observer is available and motion is allowed.
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return

    const root = document.documentElement
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
