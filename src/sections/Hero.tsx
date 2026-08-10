import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { ArrowIcon } from '../components/ArrowIcon'
import { BrandMark } from '../components/BrandMark'
import { heroScenes } from '../data/editorial'
import { useLocale } from '../i18n/useLocale'

type HeroProps = {
  reducedMotion: boolean
}

export function Hero({ reducedMotion }: HeroProps) {
  const { t } = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(reducedMotion)
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scene = heroScenes[activeIndex]

  useEffect(() => {
    if (reducedMotion || paused || document.hidden) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroScenes.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [activeIndex, paused, reducedMotion])

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    const precisePointer = window.matchMedia('(pointer: fine)').matches

    if (!section || !glow || reducedMotion || !precisePointer) return

    const moveX = gsap.quickTo(glow, 'x', { duration: 0.75, ease: 'power3.out' })
    const moveY = gsap.quickTo(glow, 'y', { duration: 0.75, ease: 'power3.out' })
    const moveGlow = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect()
      moveX(event.clientX - bounds.left - 260)
      moveY(event.clientY - bounds.top - 260)
    }

    section.addEventListener('pointermove', moveGlow)
    return () => section.removeEventListener('pointermove', moveGlow)
  }, [reducedMotion])

  const moveScene = (direction: number) => {
    setActiveIndex((current) => (current + direction + heroScenes.length) % heroScenes.length)
  }

  return (
    <section id="top" ref={sectionRef} className="hero hero--cinematic" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div ref={glowRef} className="hero__cursor-glow" aria-hidden="true" />

      <div className="hero-scenes" aria-hidden="true">
        {heroScenes.map((item, index) => (
          <div
            key={item.id}
            className={`hero-scene hero-scene--${item.visual} ${index === activeIndex ? 'is-active' : ''}`}
          >
            {item.visual === 'bat' && (
              <div className="hero-scene__bat">
                <img src="/brand/vhox-bat-particle-source.png" alt="" />
                <span />
              </div>
            )}
            {item.visual === 'rose' && (
              <div className="hero-scene__rose">
                <span className="hero-scene__rose-core" />
                <span className="hero-scene__rose-ring hero-scene__rose-ring--one" />
                <span className="hero-scene__rose-ring hero-scene__rose-ring--two" />
                <span className="hero-scene__rose-stem" />
              </div>
            )}
            {item.visual === 'void' && (
              <div className="hero-scene__void">
                <span className="hero-scene__void-plane hero-scene__void-plane--one" />
                <span className="hero-scene__void-plane hero-scene__void-plane--two" />
                <span className="hero-scene__void-axis" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__house-signal" aria-hidden="true">
        <BrandMark variant="bat" decorative />
      </div>

      <div className="hero__content hero__content--centered">
        <div className="hero__eyebrow">
          <span>{t('hero.eyebrowOne')}</span>
        </div>

        <div key={scene.id} className="hero__chapter">
          <span>{scene.index} / VHOX</span>
          <p>{t(scene.detailKey)}</p>
        </div>

        <h1 id="hero-title" className="hero__title" aria-label={t('hero.title')}>
          <span className="hero__line"><span className="hero__line-inner">{t('hero.lineOne')}</span></span>
          <span className="hero__line hero__line--accent"><span className="hero__line-inner">{t('hero.lineTwo')}</span></span>
        </h1>

        <p className="hero__support">{t('hero.support')}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#drop-001" data-cursor="EXPLORE">{t('hero.collection')} <ArrowIcon /></a>
          <a className="text-link" href="#manifesto">{t('hero.manifesto')}</a>
        </div>
      </div>

      <div className="hero__controls">
        <button type="button" onClick={() => moveScene(-1)} aria-label={t('hero.previous')}>
          <span aria-hidden="true">←</span>
        </button>
        <div className="hero__pagination" aria-label={t('hero.scenes')}>
          {heroScenes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`${t('hero.showScene')} ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          className="hero__autoplay"
          type="button"
          aria-label={paused ? t('hero.play') : t('hero.pause')}
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
        </button>
        <button type="button" onClick={() => moveScene(1)} aria-label={t('hero.next')}>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="hero__system" aria-hidden="true">
        <span>{t('hero.scroll')}</span>
        <span className="hero__scroll-line" />
        <span>{scene.index} / 03</span>
      </div>
    </section>
  )
}
