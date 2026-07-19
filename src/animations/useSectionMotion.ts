import { useLayoutEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger } from './gsap'

export function useSectionMotion(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 38,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const distance = Number(element.dataset.parallax ?? 6)
        gsap.fromTo(element, { yPercent: -distance }, {
          yPercent: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: element.parentElement ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })
    }, section)

    ScrollTrigger.refresh()
    return () => context.revert()
  }, [sectionRef])
}
