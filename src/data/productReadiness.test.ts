import { describe, expect, it } from 'vitest'
import { isProductPurchasable, products, type Product } from './products'

function makeReadyProduct(overrides: Partial<Product> = {}): Product {
  return {
    ...products[0],
    code: 'CONFIRMED-TEST-CODE',
    availability: 'available',
    launchApproved: true,
    price: 120,
    media: [{
      type: 'image',
      src: '/products/approved.webp',
      alt: 'Approved product view',
      usage: 'product',
      approvedForCommerce: true,
    }],
    sizes: ['M'],
    colors: ['BLACK'],
    materials: 'Confirmed material',
    fabricWeight: "Confirmed weight",
    sizeGuide: "Confirmed size guide",
    construction: "Confirmed construction",
    fit: 'Confirmed fit',
    care: 'Confirmed care instructions',
    shipping: 'Confirmed delivery information',
    returns: 'Confirmed returns information',
    purchaseUrl: 'https://shop.example.test/products/confirmed',
    ...overrides,
  }
}

describe('product readiness', () => {
  it('keeps every planned SIGNAL piece out of commerce', () => {
    expect(products.every((product) => !isProductPurchasable(product))).toBe(true)
  })

  it('requires explicit launch approval, available status and confirmed price', () => {
    expect(isProductPurchasable(makeReadyProduct())).toBe(true)
    expect(isProductPurchasable(makeReadyProduct({ launchApproved: false }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ availability: 'coming-soon' }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ price: null }))).toBe(false)
  })

  it('rejects campaign studies and incomplete product data', () => {
    expect(isProductPurchasable(makeReadyProduct({ media: [{
      type: 'image',
      src: '/campaign/study.webp',
      alt: 'Campaign study',
      usage: 'campaign-study',
      approvedForCommerce: false,
    }] }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ sizes: [] }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ colors: [] }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ materials: null }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ fit: null }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ care: null }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ shipping: null }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ returns: null }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ code: null }))).toBe(false)
  })

  it('requires an internal or HTTPS purchase destination', () => {
    expect(isProductPurchasable(makeReadyProduct({ purchaseUrl: null }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ purchaseUrl: 'http://shop.example.test/product' }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ purchaseUrl: 'javascript:alert(1)' }))).toBe(false)
    expect(isProductPurchasable(makeReadyProduct({ purchaseUrl: '/checkout/signal-core-tee' }))).toBe(true)
  })
})
