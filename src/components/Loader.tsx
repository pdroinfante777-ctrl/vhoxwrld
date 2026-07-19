import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'

const loaderSessionKey = 'vhox-clean-loader-seen-v1'
const loaderMaximumDuration = 2100
const letters = ['V', 'H', 'O', 'X']

type LoaderProps = {
  reducedMotion: boolean
}

export function Loader({ reducedMotion }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
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
      // Keep the loader usable when session storage is unavailable.
    }

    if (reducedMotion) {
      const timeout = window.setTimeout(() => setVisible(false), 300)
      return () => window.clearTimeout(timeout)
    }

    let timeline: gsap.core.Timeline | undefined
    let maximumTimeout = 0

    const context = gsap.context(() => {
      const letterElements = wordRef.current?.querySelectorAll('.loader__letter') ?? []

      gsap.set(letterElements, { autoAlpha: 0, y: 12, filter: 'blur(10px)' })
      gsap.set(wordRef.current, { scale: 0.985, transformOrigin: '50% 50%' })

      timeline = gsap.timeline({ onComplete: () => setVisible(false) })
        .to(letterElements, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.38,
          stagger: 0.11,
          ease: 'power2.out',
        })
        .to(wordRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' }, '-=0.12')
        .to(innerRef.current, {
          autoAlpha: 0,
          y: -8,
          filter: 'blur(4px)',
          duration: 0.28,
          delay: 0.34,
          ease: 'power2.in',
        })
        .to(containerRef.current, { autoAlpha: 0, duration: 0.22 }, '-=0.08')

      if (document.readyState === 'complete') timeline.timeScale(1.08)
    }, containerRef)

    const accelerateWhenReady = () => {
      if (timeline) timeline.timeScale(Math.max(timeline.timeScale(), 1.12))
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
        <div ref={wordRef} className="loader__word">
          {letters.map((letter) => (
            <span key={letter} className="loader__letter">{letter}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
