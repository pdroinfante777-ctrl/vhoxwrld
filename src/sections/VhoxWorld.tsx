import { ArrowIcon } from '../components/ArrowIcon'
import { useLocale } from '../i18n/useLocale'

export function VhoxWorld() {
  const { t } = useLocale()

  return (
    <section id="vhox-world" className="vhox-world" aria-labelledby="vhox-world-title">
      <div className="vhox-world__signal" aria-hidden="true">
        <img src="/brand/vhox-bat-particle-source.png" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="vhox-world__axis" aria-hidden="true"><span /></div>
      <div className="vhox-world__content" data-reveal>
        <span>{t('world.label')}</span>
        <h2 id="vhox-world-title">{t('world.title')}</h2>
        <p>{t('world.description')}</p>
        <a className="button" href="#inner-circle">{t('world.cta')} <ArrowIcon /></a>
      </div>
      <div className="vhox-world__coordinates" aria-hidden="true">
        <span>VHX / 001</span>
        <span>BEYOND FORM</span>
      </div>
    </section>
  )
}
