import { useLocale } from '../i18n/useLocale'

const codes = [
  { index: '01', titleKey: 'house.hiddenTitle', copyKey: 'house.hiddenCopy' },
  { index: '02', titleKey: 'house.exactTitle', copyKey: 'house.exactCopy' },
  { index: '03', titleKey: 'house.privateTitle', copyKey: 'house.privateCopy' },
] as const

export function HouseCodes() {
  const { t } = useLocale()

  return (
    <section className="house-codes section" aria-labelledby="house-codes-title">
      <header className="house-codes__header" data-reveal>
        <span>{t('house.label')}</span>
        <h2 id="house-codes-title">{t('house.title')}</h2>
        <p>{t('house.intro')}</p>
      </header>

      <div className="house-codes__grid">
        {codes.map((code) => (
          <article key={code.index} className="house-code" data-reveal>
            <span>{code.index}</span>
            <h3>{t(code.titleKey)}</h3>
            <p>{t(code.copyKey)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
