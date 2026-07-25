import { createContext } from 'react'
import { detectLocale, isLocale, type Locale, type TranslationKey } from './translations'

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function resolveInitialLocale(
  storedLocale?: string | null,
  languages: readonly string[] = [],
): Locale {
  return isLocale(storedLocale) ? storedLocale : detectLocale(languages)
}
