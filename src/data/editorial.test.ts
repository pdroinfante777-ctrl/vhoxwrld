import { describe, expect, it } from 'vitest'
import { dropChapters, heroScenes, journalEntries } from './editorial'
import { products } from './products'
import { translations } from '../i18n/translations'

describe('VHOX Beyond Form editorial system', () => {
  it('keeps BAT, ROSE and VOID in one consistent sequence', () => {
    expect(heroScenes.map((scene) => scene.id)).toEqual(['bat', 'rose', 'void'])
    expect(dropChapters.map((chapter) => chapter.id)).toEqual(['bat', 'rose', 'void'])
    expect(products.map((product) => product.id)).toEqual(['bat', 'rose', 'void'])
  })

  it('connects every chapter to a real product route', () => {
    for (const chapter of dropChapters) {
      expect(products.some((product) => `/collections/${product.slug}/` === chapter.path)).toBe(true)
    }
  })

  it('keeps editorial copy inside the translation system', () => {
    const keys = [
      ...heroScenes.flatMap((scene) => [scene.titleKey, scene.detailKey]),
      ...dropChapters.map((chapter) => chapter.copyKey),
      ...journalEntries.flatMap((entry) => [entry.titleKey, entry.copyKey]),
    ]

    for (const key of keys) {
      expect(translations.en[key]).toBeTruthy()
      expect(translations.es[key]).toBeTruthy()
      expect(translations.pt[key]).toBeTruthy()
      expect(translations.fr[key]).toBeTruthy()
    }
  })
})
