import { useContext } from 'react'
import { CurrencyContext } from './currencyState'

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used inside CurrencyProvider')
  return context
}
