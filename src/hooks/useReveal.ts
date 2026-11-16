import { useEffect } from 'react'
import { prefersReducedMotion } from './media'

// Content stays visible unless the observer is available and motion is allowed.
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return

    const root = document.documentElement
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const viewBottom = window.innerHeight

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
    )

    for (const element of elements) {
      const rect = element.getBoundingClientRect()
      // A zero-height box never intersects, so it must stay visible.
      if (rect.height === 0 || rect.top < viewBottom) element.classList.add('is-visible')
      else observer.observe(element)
    }

    root.classList.add('reveal-ready')

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
