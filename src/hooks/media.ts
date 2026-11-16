export function matchesMedia(query: string): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(query).matches
}

export function prefersReducedMotion(): boolean {
  return matchesMedia('(prefers-reduced-motion: reduce)')
}
