import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { translations } from '../i18n/translations'

describe('VHOX editorial categories', () => {
  it('uses a distinct proprietary visual for every category', () => {
    expect(new Set(categories.map((category) => category.visual)).size).toBe(categories.length)
    expect(categories.map((category) => category.visual)).toEqual(['shirt', 'cap', 'shoe', 'future'])
  })

  it('connects every label and state to the translation system', () => {
    for (const category of categories) {
      expect(translations.en[category.nameKey]).toBeTruthy()
      expect(translations.es[category.stateKey]).toBeTruthy()
    }
  })
})
