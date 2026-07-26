import { instagramUrl, tiktokUrl, youtubeUrl } from '../config/social'
import type { TranslationKey } from '../i18n/translations'
import { useLocale } from '../i18n/useLocale'
import { BrandMark } from './BrandMark'
import { MarketControls } from './MarketControls'

const year = new Date().getFullYear()

const shopLinks = [
  { labelKey: 'footer.drop001' as TranslationKey, href: '/#drop-001' },
  { label: 'BAT', href: '/product/bat' },
  { label: 'ROSE', href: '/product/rose' },
  { label: 'VOID', href: '/product/void' },
] as const

const exploreLinks = [
  { labelKey: 'footer.beyondForm' as TranslationKey, href: '/#manifesto' },
  { labelKey: 'footer.details' as TranslationKey, href: '/#details' },
  { labelKey: 'footer.world' as TranslationKey, href: '/#vhox-world' },
  { labelKey: 'footer.journal' as TranslationKey, href: '/#journal' },
] as const

export function Footer() {
  const { t } = useLocale()

  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__masthead" data-reveal>
        <a href="/#top" aria-label={t('nav.homeLabel')}><BrandMark /></a>
        <p>JUST BE YOURSELF.</p>
        <span>{t('footer.movement')}</span>
      </div>

      <div className="site-footer__columns">
        <section className="site-footer__contact">
          <span>{t('footer.contact')}</span>
          <h2>{t('footer.talk')}</h2>
          <a href="mailto:contact@vhoxwrld.com">contact@vhoxwrld.com</a>
        </section>

        <nav aria-label={t('footer.shop')}>
          <span>{t('footer.shop')}</span>
          {shopLinks.map((item) => (
            <a key={item.href} href={item.href}>{'labelKey' in item ? t(item.labelKey) : item.label}</a>
          ))}
        </nav>

        <nav aria-label={t('footer.explore')}>
          <span>{t('footer.explore')}</span>
          {exploreLinks.map((item) => <a key={item.href} href={item.href}>{t(item.labelKey)}</a>)}
        </nav>

        <section className="site-footer__client">
          <span>{t('footer.client')}</span>
          <a href="/policies.html">{t('footer.policies')}</a>
          <a href="/terms.html">{t('footer.terms')}</a>
          <a href="mailto:contact@vhoxwrld.com?subject=VHOX%20Support">{t('footer.requestSupport')}</a>
          <MarketControls placement="footer" />
        </section>
      </div>

      <div className="site-footer__social">
        <span>{t('footer.social')}</span>
        <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
        <a href={tiktokUrl} target="_blank" rel="noreferrer">TikTok</a>
        <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube</a>
      </div>

      <div className="site-footer__monument" aria-hidden="true">BEYOND FORM.</div>

      <div className="site-footer__bottom">
        <span>{t('footer.copyright', { year })}</span>
        <span>VHOX WRLD / DROP 001</span>
        <a href="#top">{t('footer.back')}</a>
      </div>
    </footer>
  )
}
