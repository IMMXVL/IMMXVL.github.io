import { useEffect, useState } from 'react'

const format = (timeZone: string) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date())

export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => format(timeZone))

  useEffect(() => {
    const timerId = setInterval(() => setTime(format(timeZone)), 15_000)
    return () => clearInterval(timerId)
  }, [timeZone])

  return time
}
