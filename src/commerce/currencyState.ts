import { createContext } from 'react'
import type { CurrencyCode } from './currency'

export type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  formatFromUsd: (amount: number) => string
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null)
