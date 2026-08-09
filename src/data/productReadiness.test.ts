import { describe, expect, it } from 'vitest'
import { isProductPurchasable, products, type Product } from './products'

function makeReadyProduct(overrides: Partial<Product> = {}): Product {
  return {
    ...products[0],
    availability: 'available',
    price: 120,
    media: [{ type: 'image', src: '/products/approved.webp', alt: 'Approved product view' }],
    sizes: ['M'],
    colors: ['BLACK'],
    materials: 'Confirmed cotton construction',
    ...overrides,
  }
}

describe('product readiness', () => {
  it('keeps every current concept out of commerce', () => {
    expect(products.every((product) => !isProductPurchasable(product))).toBe(true)
  })

  it('requires available status and a confirmed price', () => {
    expect(isProductPurchasable(makeReadyProduct())).toBe(true)
    expect(isProductPurchasable(makeReadyProduct({ availability: 'coming-soon' }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ price: null }))).toBe(false)
  })

  it('requires approved product media, variants and construction data', () => {
    expect(isProductPurchasable(makeReadyProduct({ media: [] }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ sizes: [] }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ colors: [] }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ materials: null }))).toBe(false)
  })
})
