import { SectionHeading } from '../components/SectionHeading'
import { useLocale } from '../i18n/useLocale'

const processSteps = [
  { index: 'P-01', titleKey: 'process.identity', detailKey: 'process.identityDetail' },
  { index: 'P-02', titleKey: 'process.form', detailKey: 'process.formDetail' },
  { index: 'P-03', titleKey: 'process.make', detailKey: 'process.makeDetail' },
] as const

export function Process() {
  const { t } = useLocale()

  return (
    <section id="process" className="process section" aria-labelledby="process-title">
      <SectionHeading
        id="process-title"
        index="07"
        label={t('process.label')}
        title={t('process.title')}
        description={t('process.description')}
      />
      <ol className="process__steps">
        {processSteps.map((step) => (
          <li key={step.index} data-reveal>
            <span>{step.index}</span>
            <h3>{t(step.titleKey)}</h3>
            <p>{t(step.detailKey)}</p>
          </li>
        ))}
      </ol>
      <div className="next-drop" data-reveal>
        <span>{t('process.next')}</span>
        <p>{t('process.nextDetail')}</p>
        <a href="mailto:contact@vhoxwrld.com?subject=VHOX%20drop%20updates">{t('process.updates')}</a>
      </div>
    </section>
  )
}
