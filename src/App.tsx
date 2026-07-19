import { lazy, Suspense, useRef } from 'react'
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

const Lookbook = lazy(() => import('./sections/Lookbook'))
const Research = lazy(() => import('./sections/Research'))
const FiberStudy = lazy(() => import('./three/FiberStudy'))

function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useLenis(reducedMotion)
  usePageMotion(rootRef, reducedMotion)

  return (
    <div ref={rootRef} className="site-shell">
      <Loader reducedMotion={reducedMotion} />
      <Navigation reducedMotion={reducedMotion} />
      <main id="main-content">
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
      </main>
      <Footer />
    </div>
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
