import { describe, expect, it } from 'vitest'
import { parseStoredCart, sanitizeStoredCart } from './cartPersistence'

describe('cart persistence safety', () => {
  it('removes saved lines for concepts that are not purchasable', () => {
    expect(sanitizeStoredCart([{
      key: 'bat::M::BLACK',
      productId: 'bat',
      quantity: 2,
      size: 'M',
      color: 'BLACK',
    }])).toEqual([])
  })

  it('ignores unknown products and malformed storage', () => {
    expect(sanitizeStoredCart([{ productId: 'missing', quantity: 1 }])).toEqual([])
    expect(parseStoredCart('{not-json')).toEqual([])
    expect(parseStoredCart(null)).toEqual([])
  })
})
