import { ArrowIcon } from '../components/ArrowIcon'
import { instagramUrl } from '../config/social'
import { useLocale } from '../i18n/useLocale'

export function Community() {
  const { t } = useLocale()

  return (
    <section className="community section" aria-labelledby="community-title">
      <div className="community__copy" data-reveal>
        <span>{t('community.label')}</span>
        <h2 id="community-title">{t('community.titleOne')}<br /><em>{t('community.titleTwo')}</em></h2>
      </div>
      <div className="community__channels">
        <article data-reveal>
          <span>INSTAGRAM</span>
          <p>{t('community.instagramDetail')}</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer">{t('community.instagramOpen')} <ArrowIcon /></a>
        </article>
        <article data-reveal>
          <span>{t('community.letter')}</span>
          <p>{t('community.letterDetail')}</p>
          <a href="mailto:contact@vhoxwrld.com?subject=Join%20the%20VHOX%20drop%20letter">{t('community.join')} <ArrowIcon /></a>
        </article>
      </div>
    </section>
  )
}
