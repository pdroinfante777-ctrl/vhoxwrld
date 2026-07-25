import type { Locale } from '../i18n/translations'

export const currencies = ['USD', 'MXN', 'EUR'] as const
export type CurrencyCode = (typeof currencies)[number]

export const currencyReference = {
  base: 'USD' as const,
  updatedAt: '2026-07-25',
  provider: 'Local temporary reference rates',
  rates: {
    USD: 1,
    MXN: 17.8,
    EUR: 0.92,
  } satisfies Record<CurrencyCode, number>,
}

const localeTags: Record<Locale, Record<CurrencyCode, string>> = {
  en: { USD: 'en-US', MXN: 'en-MX', EUR: 'en-IE' },
  es: { USD: 'es-US', MXN: 'es-MX', EUR: 'es-ES' },
  pt: { USD: 'pt-US', MXN: 'pt-MX', EUR: 'pt-PT' },
  fr: { USD: 'fr-US', MXN: 'fr-MX', EUR: 'fr-FR' },
}

const euroRegions = new Set([
  'AT', 'BE', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES',
])

export function isCurrency(value: string | null | undefined): value is CurrencyCode {
  return currencies.includes(value as CurrencyCode)
}

export function detectCurrency(
  languages: readonly string[] = [],
  timeZone = '',
): CurrencyCode {
  const region = languages
    .map((language) => language.match(/[-_]([A-Z]{2})$/i)?.[1]?.toUpperCase())
    .find(Boolean)

  if (region === 'MX' || timeZone.startsWith('America/Mexico')) return 'MXN'
  if (region && euroRegions.has(region)) return 'EUR'
  if (/Europe\/(Paris|Berlin|Madrid|Rome|Amsterdam|Brussels|Lisbon|Vienna|Dublin)/.test(timeZone)) return 'EUR'
  return 'USD'
}

export function resolveInitialCurrency(
  storedCurrency?: string | null,
  languages: readonly string[] = [],
  timeZone = '',
): CurrencyCode {
  return isCurrency(storedCurrency) ? storedCurrency : detectCurrency(languages, timeZone)
}

export function convertFromUsd(amount: number, currency: CurrencyCode) {
  return amount * currencyReference.rates[currency]
}

export function formatCurrency(amountInUsd: number, currency: CurrencyCode, locale: Locale) {
  return new Intl.NumberFormat(localeTags[locale][currency], {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'MXN' ? 0 : 2,
  }).format(convertFromUsd(amountInUsd, currency))
}
