import { describe, expect, it } from 'vitest'
import {
  convertFromUsd,
  currencyReference,
  detectCurrency,
  formatCurrency,
  resolveInitialCurrency,
} from './currency'

describe('VHOX currency market layer', () => {
  it('prioritizes a stored manual choice', () => {
    expect(resolveInitialCurrency('EUR', ['es-MX'], 'America/Mexico_City')).toBe('EUR')
  })

  it('detects Mexico, Eurozone and USD fallback markets', () => {
    expect(detectCurrency(['es-MX'], 'America/Mexico_City')).toBe('MXN')
    expect(detectCurrency(['fr-FR'], 'Europe/Paris')).toBe('EUR')
    expect(detectCurrency(['en-US'], 'America/Chicago')).toBe('USD')
  })

  it('converts from the documented USD base and formats the selected currency', () => {
    expect(convertFromUsd(100, 'MXN')).toBe(100 * currencyReference.rates.MXN)
    expect(formatCurrency(100, 'EUR', 'fr')).toContain('€')
    expect(currencyReference.provider).toContain('temporary')
  })
})
