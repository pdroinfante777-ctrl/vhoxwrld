import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/luxury.css'
import './styles/chromatic.css'
import './styles/seo.css'
import './styles/editorial.css'
import './styles/garments.css'
import App from './App'
import { CartProvider } from './cart/CartContext'
import { LocaleProvider } from './i18n/LocaleContext'
import { CurrencyProvider } from './commerce/CurrencyContext'
import { configureGoogleSiteVerification } from './seo/metadata'
import { legacyRedirect } from './seo/redirects'

configureGoogleSiteVerification()

const redirect = legacyRedirect(window.location.pathname)
if (redirect) window.location.replace(redirect)
else createRoot(document.getElementById('root')!).render(
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
