import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import { ArrowIcon } from '../components/ArrowIcon'
import { heroCampaignMedia } from '../data/campaign'

type HeroProps = {
  reducedMotion: boolean
}

export function Hero({ reducedMotion }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    const precisePointer = window.matchMedia('(pointer: fine)').matches

    if (!section || !glow || reducedMotion || !precisePointer) return

    const moveX = gsap.quickTo(glow, 'x', { duration: 0.65, ease: 'power3.out' })
    const moveY = gsap.quickTo(glow, 'y', { duration: 0.65, ease: 'power3.out' })
    const moveGlow = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect()
      moveX(event.clientX - bounds.left - 260)
      moveY(event.clientY - bounds.top - 260)
    }

    section.addEventListener('pointermove', moveGlow)
    return () => section.removeEventListener('pointermove', moveGlow)
  }, [reducedMotion])

  return (
    <section id="top" ref={sectionRef} className={`hero ${heroCampaignMedia ? 'hero--campaign' : 'hero--fallback'}`} aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div ref={glowRef} className="hero__cursor-glow" aria-hidden="true" />

      {heroCampaignMedia ? (
        <div className="hero__campaign-media" data-parallax="2" aria-hidden="true">
          {heroCampaignMedia.type === 'image'
            ? <img src={heroCampaignMedia.src} alt="" />
            : <video src={heroCampaignMedia.src} poster={heroCampaignMedia.poster} muted autoPlay={!reducedMotion} loop playsInline />}
        </div>
      ) : (
        <div className="hero__industrial-field" aria-hidden="true">
          <span className="hero__monolith hero__monolith--one" data-parallax="4" />
          <span className="hero__monolith hero__monolith--two" data-parallax="7" />
          <span className="hero__axis" />
          <span className="hero__halo" />
          <div className="hero__garment-study" data-parallax="3">
            <span className="hero__garment-outline" />
            <span className="hero__garment-thread" />
            <span className="hero__garment-label">CAMPAIGN PHOTOGRAPHY PENDING</span>
          </div>
        </div>
      )}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content hero__content--centered">
        <div className="hero__eyebrow">
          <span>VHOX WRLD / MOVEMENT 001</span>
          <span>CUSTOM GARMENTS — GLOBAL MOVEMENT</span>
        </div>
        <h1 id="hero-title" className="hero__title" aria-label="Who move first.">
          <span className="hero__line"><span className="hero__line-inner">WHO MOVE</span></span>
          <span className="hero__line"><span className="hero__line-inner">FIRST.</span></span>
        </h1>
        <p className="hero__support">FOR THE ONES WHO CREATE THE MOVEMENT.</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#collection">VER COLECCIÓN <ArrowIcon /></a>
          <a className="text-link" href="#manifesto">LEER MANIFIESTO</a>
        </div>
      </div>

      <div className="hero__system" aria-hidden="true">
        <span>SCROLL TO INITIATE</span>
        <span className="hero__scroll-line" />
        <span>01 / 07</span>
      </div>
    </section>
  )
}
