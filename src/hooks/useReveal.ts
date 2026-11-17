import { useEffect } from 'react'
import { prefersReducedMotion } from './media'

// Content stays visible unless the observer is available and motion is allowed.
// Each block slides in once, when it first enters the viewport, and then stays.
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return

    const root = document.documentElement
    // React can rewrite className (for example on a theme change), so remember what was shown.
    const shown = new WeakSet<Element>()

    const show = (element: Element) => {
      shown.add(element)
      element.classList.add('is-visible')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
    )

    const register = (element: HTMLElement) => {
      if (shown.has(element)) {
        element.classList.add('is-visible')
        return
      }
      const rect = element.getBoundingClientRect()
      // A zero-height box never intersects, so it must stay visible.
      if (rect.height === 0 || rect.top < window.innerHeight) show(element)
      else observer.observe(element)
    }

    const scan = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach(register)
    }

    scan(document)
    root.classList.add('reveal-ready')

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes') {
          const target = record.target
          if (target instanceof HTMLElement && shown.has(target) && !target.classList.contains('is-visible')) {
            target.classList.add('is-visible')
          }
          continue
        }
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches('[data-reveal]')) register(node)
          scan(node)
        })
      }
    })
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
      mutations.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
