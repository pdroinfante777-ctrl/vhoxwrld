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
import { getProductBySlug, isProductPurchasable, productDescription } from './data/products'
import { useLocale } from './i18n/useLocale'
import { VhoxCursor } from './components/VhoxCursor'
import { applyPageMetadata } from './seo/metadata'

const loadFiberStudy = () => import('./three/FiberStudy')
const FiberStudy = lazy(loadFiberStudy)

type Route =
  | { type: 'home' }
  | { type: 'cart' }
  | { type: 'product'; slug: string }
  | { type: 'not-found' }

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/' || path === '/index.html') return { type: 'home' }
  if (path === '/cart') return { type: 'cart' }
  const match = path.match(/^\/product\/([^/]+)$/)
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

  useLenis(reducedMotion)
  usePageMotion(rootRef, reducedMotion || !isHome)

  useEffect(() => {
    if (route.type === 'home') {
      applyPageMetadata({ title: t('meta.title'), description: t('meta.description'), path: '/', robots: 'index, follow' })
      return
    }

    if (route.type === 'cart') {
      applyPageMetadata({ title: `${t('cart.title')} — VHOX`, description: t('meta.cartDescription'), path: '/cart', robots: 'noindex, follow' })
      return
    }

    if (route.type === 'product' && routedProduct) {
      const concept = !isProductPurchasable(routedProduct)
      applyPageMetadata({
        title: `${routedProduct.name} — VHOX${concept ? ` / ${t('product.conceptStudy')}` : ''}`,
        description: productDescription(routedProduct, locale),
        path: `/product/${routedProduct.slug}`,
        robots: concept ? 'noindex, follow' : 'index, follow',
      })
      return
    }

    applyPageMetadata({ title: '404 — VHOX', description: t('meta.notFoundDescription'), path: window.location.pathname, robots: 'noindex, follow' })
  }, [locale, route.type, routeSlug, routedProduct, t])

  return (
    <div ref={rootRef} className={`site-shell site-shell--${route.type}`}>
      <Loader reducedMotion={reducedMotion} />
      <VhoxCursor reducedMotion={reducedMotion} />
      <Navigation reducedMotion={reducedMotion} />
      <main id="main-content">
        {route.type === 'home' && <HomePage reducedMotion={reducedMotion} />}
        {route.type === 'cart' && <CartPage />}
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
