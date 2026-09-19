import { ArrowIcon } from '../components/ArrowIcon'
import { chromaticBlackCopy } from '../data/chromaticBlack'
import { useLocale } from '../i18n/useLocale'

export function Hero() {
  const { locale, t } = useLocale()
  const copy = chromaticBlackCopy[locale]
  return (
    <section id="top" className="editorial-hero" aria-labelledby="hero-title">
      <div className="editorial-hero__copy">
        <h1 id="hero-title">From a distance,<br />black.</h1>
        <p className="editorial-hero__signature">Up close, VHOX.</p>
        <p className="editorial-hero__movement">Movimiento Exclusivo</p>
        <a className="editorial-link" href="/collections/">{copy.heroPrimary}<ArrowIcon /></a>
      </div>
      <figure className="editorial-hero__figure">
        <img src="/chromatic-black/vhox-campaign-brutalist.jpeg" width="1122" height="1402" alt={copy.heroAlt} fetchPriority="high" decoding="async" />
        <figcaption><span>VHOX / Chromatic Black</span><span>{t('product.campaignStudy')}</span></figcaption>
      </figure>
    </section>
  )
}
