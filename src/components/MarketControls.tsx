import { currencies } from '../commerce/currency'
import { useCurrency } from '../commerce/useCurrency'
import { locales, type Locale } from '../i18n/translations'
import { useLocale } from '../i18n/useLocale'

type MarketControlsProps = {
  placement: 'desktop' | 'mobile' | 'footer'
  tabIndex?: number
}

export function MarketControls({ placement, tabIndex }: MarketControlsProps) {
  const { locale, setLocale, t } = useLocale()
  const { currency, setCurrency } = useCurrency()

  return (
    <div className={`market-controls market-controls--${placement}`}>
      <label>
        <span>{t('language.label')}</span>
        <select
          value={locale}
          tabIndex={tabIndex}
          aria-label={t('language.label')}
          onChange={(event) => setLocale(event.target.value as Locale)}
        >
          {locales.map((item) => (
            <option key={item} value={item}>{t(`language.${item}`)}</option>
          ))}
        </select>
      </label>
      <label>
        <span>{t('currency.label')}</span>
        <select
          value={currency}
          tabIndex={tabIndex}
          aria-label={t('currency.label')}
          onChange={(event) => setCurrency(event.target.value as typeof currency)}
        >
          {currencies.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
    </div>
  )
}
