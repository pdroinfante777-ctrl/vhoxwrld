import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import App from './App'
import { CartProvider } from './cart/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
