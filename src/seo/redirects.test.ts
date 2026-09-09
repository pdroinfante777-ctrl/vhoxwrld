/// <reference types="node" />
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { legacyRedirect } from './redirects'

describe('SIGNAL route migration', () => {
  it('redirects every former concept to the collection without inventing product equivalence', () => {
    for (const prefix of ['product', 'collections']) {
      for (const slug of ['bat', 'rose', 'void']) {
        expect(legacyRedirect(`/${prefix}/${slug}/`)).toBe('/collections/')
        expect(legacyRedirect(`/${prefix}/${slug}`)).toBe('/collections/')
      }
    }
  })
  it('preserves approved product paths and leaves unknown paths to the 404 handler', () => {
    expect(legacyRedirect('/product/signal-core-tee')).toBe('/collections/signal-core-tee/')
    expect(legacyRedirect('/collections/signal-core-tee/')).toBeNull()
    expect(legacyRedirect('/product/unknown')).toBeNull()
  })
  it('removes legacy routes from published search discovery files', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    expect(sitemap).not.toMatch(/\/(bat|rose|void|signal-core-tee|night-bloom-tee|crystal-signal-tee)\//)
    expect(sitemap).toContain('https://vhoxwrld.com/collections/')
    expect(readFileSync('public/llms.txt', 'utf8')).not.toMatch(/\b(BAT|ROSE|VOID)\b/)
  })
})
