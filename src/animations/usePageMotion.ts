import { useLayoutEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger } from './gsap'

export function usePageMotion(rootRef: RefObject<HTMLElement | null>, reducedMotion: boolean) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (reducedMotion) {
      gsap.set(root.querySelectorAll('[data-reveal], .hero__line-inner, .manifesto__line-inner'), {
        clearProps: 'all',
        opacity: 1,
      })
      return
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })

      intro
        .from('.hero__eyebrow', { autoAlpha: 0, y: 14, duration: 0.6 })
        .from('.hero__line-inner', { yPercent: 112, duration: 1.05, stagger: 0.11 }, '-=0.25')
        .from('.hero__support, .hero__actions, .hero__system', {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          stagger: 0.09,
        }, '-=0.55')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 42,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const distance = Number(element.dataset.parallax ?? 8)
        gsap.fromTo(element, { yPercent: -distance }, {
          yPercent: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })

      gsap.from('.manifesto__line-inner', {
        yPercent: 108,
        rotate: 1.5,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.manifesto__statement',
          start: 'top 78%',
          once: true,
        },
      })

      gsap.to('.manifesto__rule-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto',
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      })

      gsap.to('.closing__orbit', {
        rotate: 32,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.closing',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, root)

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250)

    return () => {
      window.clearTimeout(refreshTimer)
      context.revert()
    }
  }, [rootRef, reducedMotion])
}
