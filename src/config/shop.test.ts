import { describe, expect, it } from 'vitest'
import { isExternalShopUrl, resolveShopUrl } from './shop'

describe('shop URL safety', () => {
  it('accepts same-site routes and anchors', () => {
    expect(resolveShopUrl('/collections/')).toBe('/collections/')
    expect(resolveShopUrl('#collection')).toBe('#collection')
  })

  it('accepts only HTTPS external destinations', () => {
    expect(resolveShopUrl('https://shop.example/path')).toBe('https://shop.example/path')
    expect(isExternalShopUrl('https://shop.example/path')).toBe(true)
  })

  it('rejects insecure and executable protocols', () => {
    expect(resolveShopUrl('http://shop.example')).toBe('#collection')
    expect(resolveShopUrl('javascript:alert(1)')).toBe('#collection')
    expect(resolveShopUrl('not a url')).toBe('#collection')
  })
})
