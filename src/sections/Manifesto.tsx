import { useLocale } from '../i18n/useLocale'

export function Manifesto() {
  const { t } = useLocale()
  const closingLines = t('manifesto.closing').split('\n')

  return (
    <section id="manifesto" className="manifesto section" aria-labelledby="manifesto-title">
      <div className="manifesto__meta" data-reveal>
        <span>{t('manifesto.label')}</span>
        <p>{t('manifesto.intro')}</p>
      </div>

      <h2 id="manifesto-title" className="manifesto__statement">
        <span className="manifesto__line"><span className="manifesto__line-inner">{t('manifesto.lineOne')}</span></span>
        <span className="manifesto__line manifesto__line--outline"><span className="manifesto__line-inner">{t('manifesto.lineTwo')}</span></span>
      </h2>

      <div className="manifesto__rule" aria-hidden="true"><span className="manifesto__rule-fill" /></div>
      <div className="manifesto__footer" data-reveal>
        <span>{t('manifesto.meta')}</span>
        <p>{closingLines.map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</p>
      </div>
    </section>
  )
}
