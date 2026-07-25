import { ArrowIcon } from '../components/ArrowIcon'
import { shopIsExternal, shopUrl } from '../config/shop'
import { useLocale } from '../i18n/useLocale'

export function Closing() {
  const { t } = useLocale()

  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing__orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="closing__meta" data-reveal>
        <span>{t('closing.label')}</span>
        <span>VHOX WRLD / 2026</span>
      </div>
      <h2 id="closing-title" data-reveal>{t('closing.titleOne')}<br /><em>{t('closing.titleTwo')}</em></h2>
      <a
        className="button button--closing"
        href={shopUrl}
        target={shopIsExternal ? '_blank' : undefined}
        rel={shopIsExternal ? 'noreferrer' : undefined}
        data-reveal
      >
        {t('closing.cta')} <ArrowIcon />
      </a>
    </section>
  )
}
