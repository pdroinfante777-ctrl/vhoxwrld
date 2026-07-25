import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocale } from '../i18n/useLocale'
import {
  formatCurrency,
  resolveInitialCurrency,
  type CurrencyCode,
} from './currency'
import { CurrencyContext, type CurrencyContextValue } from './currencyState'

const storageKey = 'vhox-currency-v1'

function readInitialCurrency() {
  let timeZone = ''
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    // Time zone detection is an enhancement, not a requirement.
  }

  try {
    return resolveInitialCurrency(localStorage.getItem(storageKey), navigator.languages, timeZone)
  } catch {
    return resolveInitialCurrency(null, navigator.languages, timeZone)
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale()
  const [currency, setCurrency] = useState<CurrencyCode>(readInitialCurrency)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, currency)
    } catch {
      // Currency remains available in memory when storage is restricted.
    }
  }, [currency])

  const value = useMemo<CurrencyContextValue>(() => ({
    currency,
    setCurrency,
    formatFromUsd: (amount) => formatCurrency(amount, currency, locale),
  }), [currency, locale])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
