import { ArrowIcon } from '../components/ArrowIcon'
import { SectionHeading } from '../components/SectionHeading'
import { dropChapters } from '../data/editorial'
import { useLocale } from '../i18n/useLocale'

export function DropChapters() {
  const { t } = useLocale()

  return (
    <section id="drop-001" className="drop-chapters section" aria-labelledby="drop-title">
      <SectionHeading
        id="drop-title"
        index="02"
        label={t('drop.label')}
        title={t('drop.title')}
        description={t('drop.description')}
      />

      <div className="drop-chapters__grid">
        {dropChapters.map((chapter) => (
          <article key={chapter.id} className={`drop-chapter drop-chapter--${chapter.id}`} data-reveal>
            <div className="drop-chapter__visual" aria-hidden="true">
              {chapter.id === 'bat' && <img src="/brand/vhox-bat-particle-source.png" alt="" />}
              {chapter.id === 'rose' && <span className="drop-chapter__rose" />}
              {chapter.id === 'void' && <span className="drop-chapter__void" />}
              <span className="drop-chapter__scan" />
            </div>
            <div className="drop-chapter__copy">
              <span>{chapter.index} / {chapter.edition}</span>
              <h3>{chapter.title}</h3>
              <p>{t(chapter.copyKey)}</p>
              <a href={chapter.path} data-cursor="VIEW">{t('drop.explore')} <ArrowIcon /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
