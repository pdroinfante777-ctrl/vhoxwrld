import { BrandMark } from '../components/BrandMark'
import { useLocale } from '../i18n/useLocale'

export function NotFoundPage() {
  const { t } = useLocale()

  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <BrandMark />
      <span>{t('notFound.label')}</span>
      <h1 id="not-found-title">404.</h1>
      <a className="button" href="/">{t('notFound.back')}</a>
    </section>
  )
}
