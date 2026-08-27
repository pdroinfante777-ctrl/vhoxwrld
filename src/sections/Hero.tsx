import { ArrowIcon } from '../components/ArrowIcon'
import { chromaticBlackCopy } from '../data/chromaticBlack'
import { useLocale } from '../i18n/useLocale'

type HeroProps = {
  reducedMotion: boolean
}

export function Hero({ reducedMotion }: HeroProps) {
  const { locale } = useLocale()
  const copy = chromaticBlackCopy[locale]

  return (
    <section id="top" className={`hero hero--chromatic ${reducedMotion ? 'hero--reduced-motion' : ''}`} aria-labelledby="hero-title">
      <img
        className="hero__campaign-image"
        src="/chromatic-black/vhox-campaign-brutalist.jpeg"
        width="1122"
        height="1402"
        alt={copy.heroAlt}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content hero__content--chromatic">
        <p className="hero__eyebrow">{copy.heroEyebrow}</p>
        <h1 id="hero-title" className="hero__title hero__title--chromatic">
          <span className="hero__line"><span className="hero__line-inner">{copy.heroLineOne}</span></span>
          <span className="hero__line hero__line--editorial"><span className="hero__line-inner">{copy.heroLineTwo}</span></span>
        </h1>
        <p className="hero__support">{copy.heroSupport}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#chromatic-black">{copy.heroPrimary} <ArrowIcon /></a>
          <a className="text-link" href="/collections/">{copy.heroSecondary}</a>
        </div>
      </div>

      <div className="hero__chromatic-footer" aria-hidden="true">
        <span>{copy.heroFooterOne}</span>
        <span>{copy.heroFooterTwo}</span>
      </div>
    </section>
  )
}
