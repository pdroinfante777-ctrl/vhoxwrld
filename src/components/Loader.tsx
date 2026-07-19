import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'

const loaderSessionKey = 'vhox-loader-seen'

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
      // The loader still works when storage is unavailable.
    }

    if (reducedMotion) {
      const timeout = window.setTimeout(() => setVisible(false), 160)
      return () => window.clearTimeout(timeout)
    }

    const context = gsap.context(() => {
      gsap.timeline({ onComplete: () => setVisible(false) })
        .fromTo('.loader__letter', {
          autoAlpha: 0,
          y: 18,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.1,
          ease: 'power3.out',
        })
        .to('.loader__rule', { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
        .to('.loader__inner', { autoAlpha: 0, y: -10, duration: 0.28, delay: 0.2 })
        .to(containerRef.current, { autoAlpha: 0, duration: 0.32 }, '-=0.04')
    }, containerRef)

    return () => context.revert()
  }, [reducedMotion, visible])

  if (!visible) return null

  return (
    <div ref={containerRef} className="loader" role="status" aria-label="VHOX is loading">
      <div className="loader__inner" aria-hidden="true">
        <div className="loader__word">
          {'VHOX'.split('').map((letter) => (
            <span className="loader__letter" key={letter}>{letter}</span>
          ))}
        </div>
        <span className="loader__rule" />
        <span className="loader__meta">INITIALIZING / 001</span>
      </div>
    </div>
  )
}
