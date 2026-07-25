import { describe, expect, it } from 'vitest'
import {
  detectLocale,
  locales,
  translate,
  translations,
  type TranslationKey,
} from './translations'

describe('VHOX translations', () => {
  it('keeps every locale structurally complete', () => {
    const referenceKeys = Object.keys(translations.en).sort()

    for (const locale of locales) {
      expect(Object.keys(translations[locale]).sort()).toEqual(referenceKeys)
      expect(Object.values(translations[locale]).every(Boolean)).toBe(true)
    }
  })

  it('detects supported browser languages and falls back to English', () => {
    expect(detectLocale(['es-MX', 'en-US'])).toBe('es')
    expect(detectLocale(['pt-BR'])).toBe('pt')
    expect(detectLocale(['fr-FR'])).toBe('fr')
    expect(detectLocale(['de-DE'])).toBe('en')
  })

  it('interpolates variables without leaking placeholders', () => {
    const value = translate('es', 'bag.label' as TranslationKey, { count: 4 })
    expect(value).toContain('4')
    expect(value).not.toContain('{count}')
  })

  it('positions VHOX as an independent brand in every locale', () => {
    const forbiddenPositioning = /personaliz|custom garment|custom apparel|custom clothing|made by you|print-on-demand/i

    for (const locale of locales) {
      const visibleCopy = Object.values(translations[locale]).join(' ')
      expect(visibleCopy).not.toMatch(forbiddenPositioning)
    }

    expect(translate('en', 'brand.exclusiveMovement')).toBe('EXCLUSIVE MOVEMENT')
    expect(translate('es', 'brand.exclusiveMovement')).toBe('MOVIMIENTO EXCLUSIVO')
    expect(translate('pt', 'brand.exclusiveMovement')).toBe('MOVIMENTO EXCLUSIVO')
    expect(translate('fr', 'brand.exclusiveMovement')).toBe('MOUVEMENT EXCLUSIF')
  })
})
