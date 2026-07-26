import { ArrowIcon } from '../components/ArrowIcon'
import { SectionHeading } from '../components/SectionHeading'
import { journalEntries } from '../data/editorial'
import { useLocale } from '../i18n/useLocale'

export function Journal() {
  const { t } = useLocale()

  return (
    <section id="journal" className="journal section" aria-labelledby="journal-title">
      <SectionHeading
        id="journal-title"
        index="07"
        label={t('journal.label')}
        title={t('journal.title')}
        description={t('journal.description')}
      />

      <div className="journal__grid">
        {journalEntries.map((entry) => (
          <article key={entry.id} className={`journal-card journal-card--${entry.id}`} data-reveal>
            <a href={entry.href}>
              <div className="journal-card__visual" aria-hidden="true">
                <span />
                {entry.id === 'origin' && <img src="/brand/vhox-bat-particle-source.png" alt="" loading="lazy" decoding="async" />}
              </div>
              <div className="journal-card__meta">
                <span>{entry.index} / VHOX JOURNAL</span>
                <h3>{t(entry.titleKey)}</h3>
                <p>{t(entry.copyKey)}</p>
                <b>{t('journal.read')} <ArrowIcon /></b>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
