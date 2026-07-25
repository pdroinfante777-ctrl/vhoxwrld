import { useRef } from 'react'
import { useSectionMotion } from '../animations/useSectionMotion'
import { SectionHeading } from '../components/SectionHeading'
import { researchPillars } from '../data/research'
import { useLocale } from '../i18n/useLocale'

function Research() {
  const { t } = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  useSectionMotion(sectionRef)

  return (
    <section ref={sectionRef} className="research section" aria-labelledby="research-title">
      <SectionHeading
        id="research-title"
        index="06"
        label={t('research.label')}
        title={t('research.title')}
        description={t('research.description')}
      />

      <div className="research__body">
        <div className="research__diagram" data-reveal aria-hidden="true">
          <span className="research__ring research__ring--one" />
          <span className="research__ring research__ring--two" />
          <span className="research__ring research__ring--three" />
          <span className="research__core">V</span>
          <span className="research__coordinate">THREAD / FORM<br />IDENTITY / 001</span>
        </div>

        <ol className="research__list">
          {researchPillars.map((pillar) => (
            <li key={pillar.index} data-reveal>
              <span>{pillar.index}</span>
              <h3>{t(pillar.titleKey)}</h3>
              <p>{t(pillar.detailKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Research
