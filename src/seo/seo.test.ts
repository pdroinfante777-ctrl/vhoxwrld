import { describe, expect, it } from 'vitest'
import { locales } from '../i18n/translations'
import { seoCopy } from './content'
import { canonicalUrl, normalizePath } from './metadata'
import { faqSchema } from './schema'

describe('SEO route policy', () => {
  it('keeps localized route titles and descriptions unique', () => {
    for (const locale of locales) {
      const routes = ['home', 'collections', 'journal', 'manifesto'] as const
      const titles = routes.map((route) => seoCopy[locale][route].title)
      const descriptions = routes.map((route) => seoCopy[locale][route].description)
      expect(new Set(titles).size).toBe(routes.length)
      expect(new Set(descriptions).size).toBe(routes.length)
      routes.forEach((route) => expect(seoCopy[locale][route].h1).not.toBe(seoCopy[locale][route].title))
    }
  })

  it('normalizes production canonicals with a stable trailing slash', () => {
    expect(normalizePath('/collections')).toBe('/collections/')
    expect(normalizePath('/')).toBe('/')
    expect(canonicalUrl('/journal')).toBe('https://vhoxwrld.com/journal/')
  })

  it('keeps FAQ schema identical to visible questions and answers', () => {
    const items = seoCopy.en.faq
    const schema = faqSchema(items)
    expect(schema.mainEntity).toHaveLength(items.length)
    expect(schema.mainEntity[0].name).toBe(items[0].question)
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(items[0].answer)
    expect(() => JSON.stringify(schema)).not.toThrow()
  })
})
