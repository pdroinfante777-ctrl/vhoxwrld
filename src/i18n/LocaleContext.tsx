import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { detectLocale, translate, type Locale } from './translations'
import { LocaleContext, resolveInitialLocale, type LocaleContextValue } from './localeState'

const storageKey = 'vhox-locale-v1'

function readInitialLocale() {
  try {
    return resolveInitialLocale(localStorage.getItem(storageKey), navigator.languages)
  } catch {
    return detectLocale(navigator.languages)
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    const title = translate(locale, 'meta.title')
    const description = translate(locale, 'meta.description')
    document.documentElement.lang = locale
    document.title = title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description)
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute('content', title)
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute('content', description)

    try {
      localStorage.setItem(storageKey, locale)
    } catch {
      // Locale remains available in memory when storage is restricted.
    }
  }, [locale])

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale,
    t: (key, variables) => translate(locale, key, variables),
  }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
