import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { BrandMark } from './BrandMark'

const loaderSessionKey = 'vhox-loader-seen-v2'

type LoaderProps = {
  reducedMotion: boolean
}

export function Loader({ reducedMotion }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(loaderSessionKey) !== 'true'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!visible) return

    try {
      sessionStorage.setItem(loaderSessionKey, 'true')
    } catch {
      // The loader remains usable when session storage is unavailable.
    }

    if (reducedMotion) {
      const timeout = window.setTimeout(() => setVisible(false), 160)
      return () => window.clearTimeout(timeout)
    }

    const context = gsap.context(() => {
      gsap.set('.loader__stitch-path', { strokeDasharray: 900, strokeDashoffset: 900 })
      gsap.set('.loader__brand', { clipPath: 'inset(100% 0 0 0)', autoAlpha: 0 })
      gsap.timeline({ onComplete: () => setVisible(false) })
        .to('.loader__stitch-path', { strokeDashoffset: 0, duration: 0.95, ease: 'power2.inOut' })
        .fromTo('.loader__needle', { x: -44, y: 28, rotate: -20 }, { x: 48, y: -34, rotate: 8, duration: 0.95, ease: 'power2.inOut' }, '<')
        .to('.loader__brand', { clipPath: 'inset(0% 0 0 0)', autoAlpha: 1, duration: 0.46, ease: 'power3.out' }, '-=0.38')
        .to('.loader__rule', { scaleX: 1, duration: 0.34, ease: 'power2.inOut' }, '-=0.25')
        .to('.loader__inner', { autoAlpha: 0, y: -12, duration: 0.25, delay: 0.14 })
        .to(containerRef.current, { autoAlpha: 0, duration: 0.28 }, '-=0.02')
    }, containerRef)

    return () => context.revert()
  }, [reducedMotion, visible])

  if (!visible) return null

  return (
    <div ref={containerRef} className="loader" role="status" aria-label="VHOX is loading">
      <div className="loader__inner" aria-hidden="true">
        <div className="loader__embroidery">
          <svg viewBox="0 0 260 190">
            <path className="loader__fabric" d="M88 34 58 54 25 45 7 86l39 18 13-17v87h142V87l13 17 39-18-18-41-33 9-30-20-18 17h-48Z" />
            <path className="loader__stitch-path" d="M88 34 58 54 25 45 7 86l39 18 13-17v87h142V87l13 17 39-18-18-41-33 9-30-20-18 17h-48Z" />
            <g className="loader__needle">
              <path d="M127 101 149 53" />
              <ellipse cx="150" cy="50" rx="2.5" ry="6" transform="rotate(25 150 50)" />
            </g>
          </svg>
          <BrandMark className="loader__brand" />
        </div>
        <span className="loader__rule" />
        <span className="loader__meta">THREAD / FORM / MOVEMENT</span>
      </div>
    </div>
  )
}
