import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { isProductPurchasable } from '../data/products'
import { CartContext, type CartContextValue, type CartLine } from './cartState'
import { cartStorageKey, clampCartQuantity, createCartLineKey, parseStoredCart } from './cartPersistence'

function readStoredCart(): CartLine[] {
  try {
    return parseStoredCart(localStorage.getItem(cartStorageKey))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(readStoredCart)
  const [pulseToken, setPulseToken] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(items))
    } catch {
      // The in-memory cart remains available when storage is restricted.
    }
  }, [items])

  const value = useMemo<CartContextValue>(() => ({
    items,
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    pulseToken,
    addItem(product, options = {}) {
      if (!isProductPurchasable(product)) return
      const size = options.size ?? ''
      const color = options.color ?? ''
      if (!product.sizes.includes(size) || !product.colors.includes(color)) return
      const quantity = clampCartQuantity(options.quantity ?? 1)
      const key = createCartLineKey(product.id, size, color)

      setItems((current) => {
        const existing = current.find((item) => item.key === key)
        if (!existing) return [...current, { key, productId: product.id, quantity, size, color }]
        return current.map((item) => item.key === key
          ? { ...item, quantity: clampCartQuantity(item.quantity + quantity) }
          : item)
      })
      setPulseToken((current) => current + 1)
    },
    updateQuantity(key, quantity) {
      setItems((current) => current.map((item) => item.key === key
        ? { ...item, quantity: clampCartQuantity(quantity) }
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
