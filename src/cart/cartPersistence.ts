import { getProductById, isProductPurchasable } from '../data/products'
import type { CartLine } from './cartState'

export const cartStorageKey = 'vhox-cart-v1'
export const maximumCartQuantity = 10

export function createCartLineKey(productId: string, size = '', color = '') {
  return [productId, size, color].join('::')
}

export function clampCartQuantity(value: number) {
  return Math.max(1, Math.min(maximumCartQuantity, Math.round(value)))
}

export function sanitizeStoredCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return []

  return value.flatMap((line) => {
    if (!line || typeof line !== 'object') return []
    const candidate = line as Partial<CartLine>
    if (typeof candidate.productId !== 'string') return []

    const product = getProductById(candidate.productId)
    if (!product || !isProductPurchasable(product)) return []

    const size = typeof candidate.size === 'string' && product.sizes.includes(candidate.size) ? candidate.size : ''
    const color = typeof candidate.color === 'string' && product.colors.includes(candidate.color) ? candidate.color : ''
    if (!size || !color) return []

    const quantity = typeof candidate.quantity === 'number' ? clampCartQuantity(candidate.quantity) : 1
    return [{
      key: createCartLineKey(product.id, size, color),
      productId: product.id,
      quantity,
      size,
      color,
    }]
  })
}

export function parseStoredCart(serialized: string | null) {
  try {
    return sanitizeStoredCart(JSON.parse(serialized ?? '[]') as unknown)
  } catch {
    return []
  }
}
