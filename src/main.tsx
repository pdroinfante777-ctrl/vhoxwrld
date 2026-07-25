import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import App from './App'
import { CartProvider } from './cart/CartContext'
import { LocaleProvider } from './i18n/LocaleContext'
import { CurrencyProvider } from './commerce/CurrencyContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <CurrencyProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CurrencyProvider>
    </LocaleProvider>
  </StrictMode>,
)
