import { createContext } from 'react'
import type { Product } from '../data/products'

export type CartLine = {
  key: string
  productId: string
  quantity: number
  size: string
  color: string
}

export type AddOptions = {
  quantity?: number
  size?: string
  color?: string
}

export type CartContextValue = {
  items: CartLine[]
  totalQuantity: number
  pulseToken: number
  addItem: (product: Product, options?: AddOptions) => void
  updateQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
