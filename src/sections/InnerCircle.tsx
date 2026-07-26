import { FormEvent, useState } from 'react'
import { ArrowIcon } from '../components/ArrowIcon'
import { useLocale } from '../i18n/useLocale'

export function InnerCircle() {
  const { t } = useLocale()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSubmitted(true)
  }

  return (
    <section id="inner-circle" className="inner-circle section" aria-labelledby="inner-circle-title">
      <div className="inner-circle__meta" data-reveal>
        <span>{t('inner.label')}</span>
        <span>DROP 001 / PRIVATE SIGNAL</span>
      </div>
      <div className="inner-circle__body">
        <h2 id="inner-circle-title" data-reveal>{t('inner.title')}</h2>
        <div className="inner-circle__access" data-reveal>
          <p>{t('inner.description')}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="inner-circle-email">{t('inner.emailLabel')}</label>
            <div>
              <input
                id="inner-circle-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('inner.emailPlaceholder')}
                required
                disabled={submitted}
              />
              <button type="submit" aria-label={t('inner.submit')} disabled={submitted}>
                <span>{submitted ? t('inner.confirmed') : t('inner.submit')}</span>
                <ArrowIcon />
              </button>
            </div>
          </form>
          <p className="inner-circle__note" role="status" aria-live="polite">
            {submitted ? t('inner.localConfirmation') : t('inner.note')}
          </p>
        </div>
      </div>
    </section>
  )
}
