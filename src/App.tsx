import { lazy, Suspense, useEffect, useRef } from 'react'
import { Loader } from './components/Loader'
import { Navigation } from './components/Navigation'
import { DeferredMount } from './components/DeferredMount'
import { Footer } from './components/Footer'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { usePageMotion } from './animations/usePageMotion'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Categories } from './sections/Categories'
import { Collection } from './sections/Collection'
import { Process } from './sections/Process'
import { Community } from './sections/Community'
import { Testimonials } from './sections/Testimonials'
import { Closing } from './sections/Closing'
import { CartPage } from './pages/CartPage'
import { ProductPage } from './pages/ProductPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { getProductBySlug } from './data/products'

const Lookbook = lazy(() => import('./sections/Lookbook'))
const Research = lazy(() => import('./sections/Research'))
const FiberStudy = lazy(() => import('./three/FiberStudy'))

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
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const route = getRoute()
  const isHome = route.type === 'home'

  useLenis(reducedMotion)
  usePageMotion(rootRef, reducedMotion || !isHome)

  useEffect(() => {
    if (isHome) document.title = 'VHOX — Who Moves First'
  }, [isHome])

  return (
    <div ref={rootRef} className={`site-shell site-shell--${route.type}`}>
      <Loader reducedMotion={reducedMotion} />
      <Navigation reducedMotion={reducedMotion} />
      <main id="main-content">
        {route.type === 'home' && <HomePage reducedMotion={reducedMotion} />}
        {route.type === 'cart' && <CartPage />}
        {route.type === 'product' && (() => {
          const product = getProductBySlug(route.slug)
          return product ? <ProductPage product={product} /> : <NotFoundPage />
        })()}
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
      <Manifesto />
      <DeferredMount className="deferred-fiber-study" minHeight="360vh">
        <Suspense fallback={<SectionFallback label="Loading fiber study" />}>
          <FiberStudy />
        </Suspense>
      </DeferredMount>
      <Categories />
      <Collection />
      <DeferredMount id="lookbook" className="deferred-lookbook" minHeight="105vh">
        <Suspense fallback={<SectionFallback label="Loading editorial study" />}>
          <Lookbook />
        </Suspense>
      </DeferredMount>
      <DeferredMount id="research" className="deferred-research" minHeight="90vh">
        <Suspense fallback={<SectionFallback label="Loading research index" />}>
          <Research />
        </Suspense>
      </DeferredMount>
      <Process />
      <Community />
      <Testimonials />
      <Closing />
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
