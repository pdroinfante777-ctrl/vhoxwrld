import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import { ArrowIcon } from '../components/ArrowIcon'
import { shopIsExternal, shopUrl } from '../config/shop'

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
    <section id="top" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div ref={glowRef} className="hero__cursor-glow" aria-hidden="true" />
      <div className="hero__industrial-field" aria-hidden="true">
        <span className="hero__monolith hero__monolith--one" data-parallax="4" />
        <span className="hero__monolith hero__monolith--two" data-parallax="7" />
        <span className="hero__axis" />
        <span className="hero__halo" />
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span>VHOX WRLD / SYSTEM 001</span>
          <span>CHICAGO — GLOBAL</span>
        </div>
        <h1 id="hero-title" className="hero__title" aria-label="Who moves first.">
          <span className="hero__line"><span className="hero__line-inner">WHO MOVES</span></span>
          <span className="hero__line hero__line--offset"><span className="hero__line-inner">FIRST.</span></span>
        </h1>
        <div className="hero__lower">
          <p className="hero__support">FOR THE ONES WHO<br />CREATE THE MOVEMENT.</p>
          <div className="hero__actions">
            <a
              className="button button--primary"
              href={shopUrl}
              target={shopIsExternal ? '_blank' : undefined}
              rel={shopIsExternal ? 'noreferrer' : undefined}
            >
              Enter the collection <ArrowIcon />
            </a>
            <a className="text-link" href="#manifesto">Read the manifesto</a>
          </div>
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
