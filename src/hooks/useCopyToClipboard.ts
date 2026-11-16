import { useCallback, useEffect, useState } from 'react'

export function useCopyToClipboard(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timerId = setTimeout(() => setCopied(false), resetAfterMs)
    return () => clearTimeout(timerId)
  }, [copied, resetAfterMs])

  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) return false
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      return true
    } catch {
      return false
    }
  }, [])

  return { copied, copy }
}
