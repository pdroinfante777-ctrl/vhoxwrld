import { lazy, Suspense, useEffect, useRef } from 'react'
import { Loader } from './components/Loader'
import { Navigation } from './components/Navigation'
import { DeferredMount } from './components/DeferredMount'
import { Footer } from './components/Footer'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { usePageMotion } from './animations/usePageMotion'
import { Hero } from './sections/Hero'
import { HouseCodes } from './sections/HouseCodes'
import { Manifesto } from './sections/Manifesto'
import { DropChapters } from './sections/DropChapters'
import { MaterialDetails } from './sections/MaterialDetails'
import { Collection } from './sections/Collection'
import { VhoxWorld } from './sections/VhoxWorld'
import { Journal } from './sections/Journal'
import { InnerCircle } from './sections/InnerCircle'
import { CartPage } from './pages/CartPage'
import { ProductPage } from './pages/ProductPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { JournalPage } from './pages/JournalPage'
import { ManifestoPage } from './pages/ManifestoPage'
import { getProductBySlug, productDescription } from './data/products'
import { useLocale } from './i18n/useLocale'
import { VhoxCursor } from './components/VhoxCursor'
import { applyPageMetadata } from './seo/metadata'
import { seoCopy } from './seo/content'
import { useAnalyticsPage } from './analytics/ga4'

const loadFiberStudy = () => import('./three/FiberStudy')
const FiberStudy = lazy(loadFiberStudy)

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
  if (match) return { type: 'product', slug: decodeURIComponent(match[1]) }
  return { type: 'not-found' }
}

function App() {
  const { t, locale } = useLocale()
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const route = getRoute()
  const isHome = route.type === 'home'
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
    ? locale === 'en'
      ? {
          bat: 'BAT — Nocturnal Form Study | VHOX',
          rose: 'ROSE — Controlled Tension Study | VHOX',
          void: 'VOID — Near-Black Depth Study | VHOX',
        }[routedProduct.slug] ?? `${routedProduct.name} — VHOX / ${t('product.conceptStudy')}`
      : `${routedProduct.name} — VHOX / ${t('product.conceptStudy')}`
    : ''

  useLenis(reducedMotion)
  usePageMotion(rootRef, reducedMotion || !isHome)
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
        robots: 'index, follow',
        locale,
      })
      return
    }

    applyPageMetadata({ title: '404 — VHOX', description: t('meta.notFoundDescription'), path: window.location.pathname, robots: 'noindex, follow', locale })
  }, [copy, locale, productMetaTitle, route.type, routeSlug, routedProduct, t])

  return (
    <div ref={rootRef} className={`site-shell site-shell--${route.type}`}>
      <Loader reducedMotion={reducedMotion} />
      <VhoxCursor reducedMotion={reducedMotion} />
      <Navigation reducedMotion={reducedMotion} />
      <main id="main-content">
        {route.type === 'home' && <HomePage reducedMotion={reducedMotion} />}
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

function HomePage({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <Hero reducedMotion={reducedMotion} />
      <HouseCodes />
      <Manifesto />
      <DropChapters />
      <DeferredMount className="deferred-fiber-study" minHeight="460vh" rootMargin="900px 0px">
        <Suspense fallback={<SectionFallback label="Loading fiber study" />}>
          <FiberStudy />
        </Suspense>
      </DeferredMount>
      <MaterialDetails />
      <Collection />
      <VhoxWorld />
      <Journal />
      <InnerCircle />
    </>
  )
}

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="section-fallback" role="status" aria-live="polite">
      <span>{label}</span>
    </div>
  )
}

export default App
