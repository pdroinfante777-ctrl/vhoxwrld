import { instagramUrl } from '../config/social'
import { useLocale } from '../i18n/useLocale'
import { BrandMark } from './BrandMark'
import { MarketControls } from './MarketControls'

const year = new Date().getFullYear()
const footerNavigation = [
  ['nav.home', '/#top'],
  ['nav.shop', '/#collection'],
  ['nav.lookbook', '/#lookbook'],
  ['nav.research', '/#research'],
  ['nav.testimonials', '/#testimonials'],
  ['nav.contact', '/#contact'],
] as const

export function Footer() {
  const { t } = useLocale()

  return (
    <footer id="contact" className="site-footer" data-reveal>
      <span className="site-footer__rule" aria-hidden="true" />
      <div className="site-footer__intro">
        <a href="/#top" aria-label={t('nav.homeLabel')}><BrandMark /></a>
        <p>JUST BE YOURSELF.</p>
      </div>
      <div className="site-footer__monument" aria-hidden="true">VHOX</div>

      <div className="site-footer__columns">
        <section>
          <span>{t('footer.contact')}</span>
          <h2>{t('footer.talk')}</h2>
          <a href="mailto:contact@vhoxwrld.com">contact@vhoxwrld.com</a>
        </section>
        <section>
          <span>{t('footer.support')}</span>
          <p>{t('footer.supportDetail')}</p>
          <a href="mailto:contact@vhoxwrld.com?subject=VHOX%20Support">{t('footer.requestSupport')}</a>
          <MarketControls placement="footer" />
        </section>
        <nav aria-label={t('footer.navigation')}>
          <span>{t('footer.navigation')}</span>
          {footerNavigation.map(([labelKey, href]) => <a key={labelKey} href={href}>{t(labelKey)}</a>)}
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>{t('footer.copyright', { year })}</span>
        <nav aria-label={t('footer.navigation')}>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a href="/policies.html">{t('footer.policies')}</a>
          <a href="/terms.html">{t('footer.terms')}</a>
        </nav>
        <a href="#top">{t('footer.back')}</a>
      </div>
    </footer>
  )
}
