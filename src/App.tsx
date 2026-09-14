import { useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Hero } from './sections/Hero'
import { EditorialSelection, EditorialStory, EditorialDetail, EditorialIdentity } from './sections/EditorialHome'
import { InnerCircle } from './sections/InnerCircle'
import { CartPage } from './pages/CartPage'
import { ProductPage } from './pages/ProductPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { JournalPage } from './pages/JournalPage'
import { ManifestoPage } from './pages/ManifestoPage'
import { getProductBySlug, productDescription } from './data/products'
import { useLocale } from './i18n/useLocale'
import { applyPageMetadata } from './seo/metadata'
import { seoCopy } from './seo/content'
import { useAnalyticsPage } from './analytics/ga4'

type Route =
  | { type: 'home' }
  | { type: 'cart' }
  | { type: 'collections' }
  | { type: 'journal' }
  | { type: 'manifesto' }
  | { type: 'product'; slug: string }
  | { type: 'not-found' }

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/' || path === '/index.html') return { type: 'home' }
  if (path === '/cart') return { type: 'cart' }
  if (path === '/collections') return { type: 'collections' }
  if (path === '/journal') return { type: 'journal' }
  if (path === '/manifesto') return { type: 'manifesto' }
  const match = path.match(/^\/(?:collections|product)\/([^/]+)$/)
  if (match) {
    try { return { type: 'product', slug: decodeURIComponent(match[1]) } }
    catch { return { type: 'not-found' } }
  }
  return { type: 'not-found' }
}

function App() {
  const { t, locale } = useLocale()
  const reducedMotion = useReducedMotion()
  const route = getRoute()
  const routeSlug = route.type === 'product' ? route.slug : ''
  const routedProduct = route.type === 'product' ? getProductBySlug(route.slug) : undefined
  const copy = seoCopy[locale]
  const analyticsPath = route.type === 'home' ? '/'
    : route.type === 'product' ? `/collections/${route.slug}/`
      : route.type === 'not-found' ? window.location.pathname
        : `/${route.type}/`
  const analyticsTitle = route.type === 'home' ? copy.home.title
    : route.type === 'collections' ? copy.collections.title
      : route.type === 'journal' ? copy.journal.title
        : route.type === 'manifesto' ? copy.manifesto.title
          : route.type === 'cart' ? `${t('cart.title')} — VHOX`
            : routedProduct ? `${routedProduct.name} — VHOX` : '404 — VHOX'

  const productMetaTitle = routedProduct
    ? `${routedProduct.name} — VHOX / ${t('product.conceptStudy')}`
    : ''

  useAnalyticsPage(analyticsPath, analyticsTitle)

  useEffect(() => {
    if (route.type === 'home') {
      applyPageMetadata({ ...copy.home, path: '/', robots: 'index, follow', locale })
      return
    }

    if (route.type === 'collections' || route.type === 'journal' || route.type === 'manifesto') {
      applyPageMetadata({ ...copy[route.type], path: `/${route.type}/`, robots: 'index, follow', locale, type: route.type === 'manifesto' ? 'article' : 'website' })
      return
    }

    if (route.type === 'cart') {
      applyPageMetadata({ title: `${t('cart.title')} — VHOX`, description: t('meta.cartDescription'), path: '/cart/', robots: 'noindex, follow', locale })
      return
    }

    if (route.type === 'product' && routedProduct) {
      applyPageMetadata({
        title: productMetaTitle,
        description: productDescription(routedProduct, locale),
        path: `/collections/${routedProduct.slug}/`,
        robots: 'noindex, follow',
        locale,
      })
      return
    }

    applyPageMetadata({ title: '404 — VHOX', description: t('meta.notFoundDescription'), path: window.location.pathname, robots: 'noindex, follow', locale })
  }, [copy, locale, productMetaTitle, route.type, routeSlug, routedProduct, t])

  return (
    <div className={`site-shell site-shell--${route.type}`}>
      <Navigation reducedMotion={reducedMotion} />
      <main id="main-content">
        {route.type === 'home' && <HomePage />}
        {route.type === 'cart' && <CartPage />}
        {route.type === 'collections' && <CollectionsPage />}
        {route.type === 'journal' && <JournalPage />}
        {route.type === 'manifesto' && <ManifestoPage />}
        {route.type === 'product' && (routedProduct ? <ProductPage product={routedProduct} /> : <NotFoundPage />)}
        {route.type === 'not-found' && <NotFoundPage />}
      </main>
      <Footer />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <EditorialSelection />
      <EditorialStory />
      <EditorialDetail />
      <EditorialIdentity />
      <InnerCircle />
    </>
  )
}

export default App
