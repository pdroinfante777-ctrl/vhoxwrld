import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { VHOX_BAT_PATH, VHOX_BAT_VIEWBOX } from '../assets/vhoxBat'

const loaderSessionKey = 'vhox-bat-loader-seen-v1'
const loaderMaximumDuration = 2400

type LoaderProps = {
  reducedMotion: boolean
}

export function Loader({ reducedMotion }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const batRef = useRef<SVGSVGElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const strokeRef = useRef<SVGPathElement>(null)
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
      const timeout = window.setTimeout(() => setVisible(false), 260)
      return () => window.clearTimeout(timeout)
    }

    let timeline: gsap.core.Timeline | undefined
    let maximumTimeout = 0

    const context = gsap.context(() => {
      const outlineLength = strokeRef.current?.getTotalLength() ?? 10000
      gsap.set(strokeRef.current, { strokeDasharray: outlineLength, strokeDashoffset: outlineLength })
      gsap.set(fillRef.current, { autoAlpha: 0 })
      gsap.set(batRef.current, { scale: 0.98, transformOrigin: '50% 50%' })

      timeline = gsap.timeline({ onComplete: () => setVisible(false) })
        .to(strokeRef.current, { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' })
        .to(fillRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, '-=0.08')
        .to(batRef.current, {
          scale: 1,
          filter: 'drop-shadow(0 0 12px rgba(124, 255, 0, 0.42))',
          duration: 0.16,
          ease: 'power2.out',
        })
        .to(batRef.current, { filter: 'drop-shadow(0 0 0 rgba(124, 255, 0, 0))', duration: 0.12 })
        .to(innerRef.current, { autoAlpha: 0, scale: 1.008, duration: 0.24, delay: 0.06, ease: 'power2.in' })
        .to(containerRef.current, { autoAlpha: 0, duration: 0.22 }, '-=0.08')

      if (document.readyState === 'complete') timeline.timeScale(1.15)
    }, containerRef)

    const accelerateWhenReady = () => {
      if (timeline) timeline.timeScale(Math.max(timeline.timeScale(), 1.25))
    }
    if (document.readyState !== 'complete') window.addEventListener('load', accelerateWhenReady, { once: true })

    maximumTimeout = window.setTimeout(() => {
      timeline?.progress(1)
      setVisible(false)
    }, loaderMaximumDuration)

    return () => {
      window.clearTimeout(maximumTimeout)
      window.removeEventListener('load', accelerateWhenReady)
      context.revert()
    }
  }, [reducedMotion, visible])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className={`loader ${reducedMotion ? 'loader--reduced-motion' : ''}`}
      role="status"
      aria-label="VHOX is loading"
    >
      <div ref={innerRef} className="loader__inner" aria-hidden="true">
        <svg ref={batRef} className="loader__bat" viewBox={VHOX_BAT_VIEWBOX}>
          <path ref={fillRef} className="loader__bat-fill" d={VHOX_BAT_PATH} />
          <path
            ref={strokeRef}
            className="loader__bat-stroke"
            d={VHOX_BAT_PATH}
            pathLength="1"
          />
        </svg>
      </div>
    </div>
  )
}
