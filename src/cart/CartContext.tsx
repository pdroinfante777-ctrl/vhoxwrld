import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '../data/products'
import { CartContext, type CartContextValue, type CartLine } from './cartState'

const storageKey = 'vhox-cart-v1'
const maximumQuantity = 10

function lineKey(productId: string, size = '', color = '') {
  return [productId, size, color].join('::')
}

function clampQuantity(value: number) {
  return Math.max(1, Math.min(maximumQuantity, Math.round(value)))
}

function readStoredCart(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '[]') as unknown
    if (!Array.isArray(parsed)) return []

    return parsed.flatMap((line) => {
      if (!line || typeof line !== 'object') return []
      const candidate = line as Partial<CartLine>
      if (typeof candidate.productId !== 'string' || !getProductById(candidate.productId)) return []
      const size = typeof candidate.size === 'string' ? candidate.size : ''
      const color = typeof candidate.color === 'string' ? candidate.color : ''
      const quantity = typeof candidate.quantity === 'number' ? clampQuantity(candidate.quantity) : 1
      return [{ key: lineKey(candidate.productId, size, color), productId: candidate.productId, quantity, size, color }]
    })
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(readStoredCart)
  const [pulseToken, setPulseToken] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items))
    } catch {
      // The in-memory cart remains available when storage is restricted.
    }
  }, [items])

  const value = useMemo<CartContextValue>(() => ({
    items,
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    pulseToken,
    addItem(product, options = {}) {
      const size = options.size ?? ''
      const color = options.color ?? ''
      const quantity = clampQuantity(options.quantity ?? 1)
      const key = lineKey(product.id, size, color)

      setItems((current) => {
        const existing = current.find((item) => item.key === key)
        if (!existing) return [...current, { key, productId: product.id, quantity, size, color }]
        return current.map((item) => item.key === key
          ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
          : item)
      })
      setPulseToken((current) => current + 1)
    },
    updateQuantity(key, quantity) {
      setItems((current) => current.map((item) => item.key === key
        ? { ...item, quantity: clampQuantity(quantity) }
        : item))
    },
    removeItem(key) {
      setItems((current) => current.filter((item) => item.key !== key))
    },
    clearCart() {
      setItems([])
    },
  }), [items, pulseToken])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
