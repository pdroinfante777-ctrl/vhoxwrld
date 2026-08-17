import { ArrowIcon } from '../components/ArrowIcon'
import { waitlistIsConfigured, waitlistUrl } from '../config/waitlist'
import { useLocale } from '../i18n/useLocale'
import { trackEvent } from '../analytics/ga4'

export function InnerCircle() {
  const { t } = useLocale()

  return (
    <section id="inner-circle" className="inner-circle section" aria-labelledby="inner-circle-title">
      <div className="inner-circle__meta" data-reveal>
        <span>{t('inner.label')}</span>
        <span>VHOX / PRIVATE SIGNAL</span>
      </div>
      <div className="inner-circle__body">
        <h2 id="inner-circle-title" data-reveal>{t('inner.title')}</h2>
        <div className="inner-circle__access" data-reveal>
          <p>{t('inner.description')}</p>
          {waitlistIsConfigured && waitlistUrl ? (
            <a className="button button--primary inner-circle__external" href={waitlistUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('generate_lead', { method: 'approved_waitlist', content_type: 'inner_circle' })}>
              {t('inner.registerExternal')} <ArrowIcon />
            </a>
          ) : (
            <p className="inner-circle__pending" role="status">{t('inner.registrationPending')}</p>
          )}
          <p className="inner-circle__note">{t('inner.note')}</p>
        </div>
      </div>
    </section>
  )
}
