import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsap'

export function useLenis(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 0.82,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
    })

    const updateScroll = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', updateScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScroll)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [reducedMotion])
}
