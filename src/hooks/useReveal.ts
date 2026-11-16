import { useEffect } from 'react'
import { prefersReducedMotion } from './media'

// Content stays visible unless the observer is available and motion is allowed.
// Blocks slide in when they enter the viewport and slide back out when they leave.
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return

    const root = document.documentElement
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )

    for (const element of elements) {
      const rect = element.getBoundingClientRect()
      // A zero-height box never intersects, so it must stay visible.
      if (rect.height === 0) {
        element.classList.add('is-visible')
        continue
      }
      if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add('is-visible')
      observer.observe(element)
    }

    root.classList.add('reveal-ready')

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
