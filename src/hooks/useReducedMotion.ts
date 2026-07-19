import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updatePreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches)

    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return reducedMotion
}
