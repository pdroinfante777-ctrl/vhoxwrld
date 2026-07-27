import { SectionHeading } from '../components/SectionHeading'
import { detailStudies } from '../data/editorial'
import { useLocale } from '../i18n/useLocale'

export function MaterialDetails() {
  const { t } = useLocale()

  return (
    <section id="details" className="material-details section" aria-labelledby="details-title">
      <SectionHeading
        id="details-title"
        index="04"
        label={t('details.label')}
        title={t('details.title')}
        description={t('details.description')}
      />

      <div className="material-details__grid">
        {detailStudies.map((study) => (
          <article key={study.id} className={`detail-study detail-study--${study.id}`} data-reveal>
            <div className="detail-study__visual" aria-hidden="true">
              <span className="detail-study__surface" />
              <span className="detail-study__measure">{study.index}</span>
            </div>
            <div className="detail-study__copy">
              <span>VHOX / {study.index}</span>
              <h3>{t(study.labelKey)}</h3>
              <p>{t(study.copyKey)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
